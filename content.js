// content.js - Enhanced Content script for job description detection and floating button
class JobPageDetector {
  constructor() {
    this.isJobPage = false;
    this.floatingButton = null;
    this.init();
  }

  init() {
    this.detectJobPage();
    if (this.isJobPage) {
      this.createFloatingButton();
    }
  }

  detectJobPage() {
    console.log("🔍 Detecting if this is a job page...");

    const url = window.location.href.toLowerCase();
    const title = document.title.toLowerCase();
    const content = document.body.textContent.toLowerCase();

    // Step 1: Check URL patterns (much more comprehensive)
    const jobUrlPatterns = [
      "job",
      "career",
      "position",
      "vacancy",
      "opening",
      "hiring",
      "employment",
      "work",
      "recruit",
      "apply",
      "posting",
      "opportunity",
      "/jobs/",
      "/careers/",
      "talent",
      "role",
    ];

    const hasJobUrl = jobUrlPatterns.some((pattern) => url.includes(pattern));

    // Step 2: Check title for job indicators
    const jobTitleWords = [
      "job",
      "career",
      "position",
      "role",
      "opening",
      "vacancy",
      "hiring",
      "employment",
      "opportunity",
      "engineer",
      "developer",
      "analyst",
      "manager",
      "coordinator",
      "specialist",
      "intern",
    ];

    const hasJobTitle = jobTitleWords.some((word) => title.includes(word));

    // Step 3: MUCH more lenient content analysis
    const jobKeywords = [
      "job description",
      "job summary",
      "responsibilities",
      "requirements",
      "qualifications",
      "experience",
      "skills",
      "apply",
      "position",
      "role",
      "candidate",
      "hiring",
      "work",
      "employment",
      "salary",
      "benefits",
      "team",
      "company",
      "department",
      "years",
      "degree",
      "education",
      "developer",
      "engineer",
      "analyst",
      "manager",
    ];

    // Count keyword matches - LOWERED threshold significantly
    const keywordMatches = jobKeywords.filter(
      (keyword) => content.includes(keyword) || title.includes(keyword)
    ).length;

    console.log(`📊 Analysis results:`);
    console.log(`   - URL patterns: ${hasJobUrl}`);
    console.log(`   - Title patterns: ${hasJobTitle}`);
    console.log(`   - Keyword matches: ${keywordMatches}`);

    // Step 4: Check for job-specific elements
    const hasJobElements = this.checkJobElements();
    const hasJobStructure = this.analyzePageStructure();

    console.log(`   - Job elements: ${hasJobElements}`);
    console.log(`   - Job structure: ${hasJobStructure}`);

    // Step 5: VERY lenient decision - if ANY indicator is true, consider it a job page
    const isJobPage =
      hasJobUrl || // ANY URL with job-related words
      hasJobTitle || // ANY title with job words
      keywordMatches >= 1 || // Just 1+ job keywords (was 2+)
      hasJobElements || // ANY job elements found
      hasJobStructure || // ANY job structure found
      this.checkKnownJobSites(); // Check known job sites

    console.log(`🎯 Final decision: ${isJobPage ? "IS" : "NOT"} a job page`);

    this.isJobPage = isJobPage;
    return isJobPage;
  }

  checkKnownJobSites() {
    const url = window.location.href.toLowerCase();
    const knownJobSites = [
      "linkedin.com",
      "indeed.com",
      "glassdoor.com",
      "monster.com",
      "ziprecruiter.com",
      "workday.com",
      "lever.co",
      "greenhouse.io",
      "ashbyhq.com",
      "angellist.com",
      "dice.com",
      "simplyhired.com",
      "careerbuilder.com",
      "usajobs.gov",
      "stackoverflow.com/jobs",
    ];

    return knownJobSites.some((site) => url.includes(site));
  }

  checkJobElements() {
    // Look for common job page elements with broader selectors
    const jobSelectors = [
      '[class*="job"]',
      '[class*="position"]',
      '[class*="career"]',
      '[class*="vacancy"]',
      '[class*="opening"]',
      '[class*="posting"]',
      '[class*="apply"]',
      '[class*="recruit"]',
      '[class*="hiring"]',
      '[id*="job"]',
      '[id*="position"]',
      '[id*="apply"]',
      'button[class*="apply"]',
      'a[class*="apply"]',
      ".salary",
      ".benefits",
      ".requirements",
      ".qualifications",
      ".description",
      ".summary",
      ".details",
    ];

    let elementCount = 0;
    jobSelectors.forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector);
        elementCount += elements.length;
      } catch (e) {
        // Ignore selector errors
      }
    });

    return elementCount >= 1; // Lowered from 3 to 1
  }

  analyzePageStructure() {
    const content = document.body.textContent;

    // Look for structured job content patterns
    const structurePatterns = [
      /responsibilities?[\s\S]{0,100}[:\-•]/i,
      /requirements?[\s\S]{0,100}[:\-•]/i,
      /qualifications?[\s\S]{0,100}[:\-•]/i,
      /experience[\s\S]{0,100}[:\-•]/i,
      /skills[\s\S]{0,100}[:\-•]/i,
      /\d+\+?\s*years?\s+of\s+experience/i,
      /bachelor'?s?\s+degree/i,
      /master'?s?\s+degree/i,
      /apply\s+now/i,
      /join\s+our\s+team/i,
    ];

    const patternMatches = structurePatterns.filter((pattern) =>
      pattern.test(content)
    ).length;

    return patternMatches >= 1; // Lowered from 2 to 1
  }

  createFloatingButton() {
    // Remove any existing button first
    const existingBtn = document.getElementById("resume-tailor-floating-btn");
    if (existingBtn) {
      existingBtn.remove();
    }

    // Create floating button
    this.floatingButton = document.createElement("div");
    this.floatingButton.id = "resume-tailor-floating-btn";
    this.floatingButton.innerHTML = `
        <div class="floating-btn-content">
          <span class="btn-icon">🎯</span>
          <span class="btn-text">Tailor Resume</span>
        </div>
      `;

    // Add styles directly to avoid CSS loading issues
    const style = document.createElement("style");
    style.textContent = `
        #resume-tailor-floating-btn {
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          z-index: 2147483647 !important;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          border-radius: 50px !important;
          padding: 12px 20px !important;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3) !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          color: white !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          border: none !important;
          backdrop-filter: blur(10px) !important;
          user-select: none !important;
        }
  
        #resume-tailor-floating-btn:hover {
          transform: translateY(-2px) scale(1.05) !important;
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4) !important;
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%) !important;
        }
  
        .floating-btn-content {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
  
        .btn-icon {
          font-size: 16px !important;
        }
  
        .btn-text {
          white-space: nowrap !important;
        }
  
        @media (max-width: 768px) {
          #resume-tailor-floating-btn {
            padding: 10px 15px !important;
            font-size: 13px !important;
          }
          
          .btn-text {
            display: none !important;
          }
        }
  
        @keyframes pulse {
          0% { box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3) !important; }
          50% { box-shadow: 0 4px 30px rgba(102, 126, 234, 0.6) !important; }
          100% { box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3) !important; }
        }
  
        #resume-tailor-floating-btn.pulse {
          animation: pulse 2s infinite !important;
        }
      `;

    document.head.appendChild(style);
    document.body.appendChild(this.floatingButton);

    // Add click handler
    this.floatingButton.addEventListener("click", () => {
      this.openExtensionPopup();
    });

    // Add pulse animation initially
    setTimeout(() => {
      this.floatingButton.classList.add("pulse");
    }, 1000);

    // Remove pulse after 10 seconds
    setTimeout(() => {
      this.floatingButton.classList.remove("pulse");
    }, 11000);

    console.log("✅ Floating button created successfully");
  }

  openExtensionPopup() {
    // Send message to background script to open popup
    chrome.runtime.sendMessage({ action: "openPopup" }, (response) => {
      if (chrome.runtime.lastError) {
        console.log("Could not open popup:", chrome.runtime.lastError.message);
      }
    });
  }

  // COMPLETELY REWRITTEN job description extraction
  extractJobDescription() {
    console.log("🔍 Starting ENHANCED job extraction...");

    const pageText = document.body.textContent.toLowerCase();

    // Much more lenient check
    const jobIndicators = [
      "job",
      "position",
      "role",
      "career",
      "work",
      "hiring",
      "apply",
      "responsibilities",
      "requirements",
      "qualifications",
      "experience",
      "skills",
      "developer",
      "engineer",
      "analyst",
      "manager",
      "team",
    ];

    const indicatorCount = jobIndicators.filter((indicator) =>
      pageText.includes(indicator)
    ).length;

    console.log(`📊 Found ${indicatorCount} job indicators`);

    // Much lower threshold
    if (indicatorCount < 1) {
      console.log("❌ Not enough job indicators found");
      return "This page doesn't appear to contain job-related content.";
    }

    let bestContent = "";
    let bestScore = 0;

    // Strategy 1: Try MANY more selectors
    const selectors = [
      // Specific job board selectors
      ".jobs-description-content__text",
      ".jobs-box__html-content",
      ".jobsearch-jobDescriptionText",
      "#jobDescriptionText",
      ".jobDescriptionContent",
      ".desc",
      ".job-description",

      // Generic content selectors
      '[class*="job"]',
      '[class*="position"]',
      '[class*="role"]',
      '[class*="description"]',
      '[class*="content"]',
      '[class*="details"]',
      '[id*="job"]',
      '[id*="description"]',
      '[id*="content"]',

      // Broader selectors
      "main",
      "article",
      "section",
      ".content",
      ".main-content",
      ".page-content",
      ".post-content",
      ".entry-content",

      // Fallback selectors
      "div",
      "p",
    ];

    // Try each selector and score the content
    for (const selector of selectors) {
      try {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          const content = this.extractCleanText(element);
          const score = this.scoreJobContent(content);

          console.log(
            `Selector: ${selector}, Score: ${score}, Length: ${content.length}`
          );

          if (score > bestScore && content.length > 50) {
            // Lowered from 200 to 50
            bestContent = content;
            bestScore = score;
          }
        }
      } catch (e) {
        continue;
      }
    }

    // Strategy 2: If still no good content, try full page
    if (bestScore < 1) {
      // Lowered threshold
      console.log("🌐 Using full page content...");
      const fullContent = this.extractCleanText(document.body);
      if (fullContent.length > 100) {
        bestContent = fullContent;
        bestScore = 1;
      }
    }

    console.log(
      `🎯 Extraction complete. Score: ${bestScore}, Length: ${bestContent.length}`
    );

    if (!bestContent || bestContent.length < 50) {
      return "Could not extract meaningful content from this page. Please ensure you're on a job posting page.";
    }

    return bestContent;
  }

  extractCleanText(element) {
    if (!element) return "";

    // Clone to avoid modifying original
    const clone = element.cloneNode(true);

    // Remove unwanted elements
    const unwanted = [
      "script",
      "style",
      "nav",
      "header",
      "footer",
      "aside",
      "iframe",
    ];
    unwanted.forEach((tag) => {
      const elements = clone.querySelectorAll(tag);
      elements.forEach((el) => el.remove());
    });

    let text = clone.textContent || clone.innerText || "";

    // Clean up whitespace but preserve structure
    text = text.replace(/\s+/g, " ").trim();

    return text;
  }

  scoreJobContent(content) {
    if (!content || content.length < 20) return 0;

    const text = content.toLowerCase();
    let score = 0;

    // Much more inclusive scoring
    const highValue = [
      "responsibilities",
      "requirements",
      "qualifications",
      "job description",
      "about the role",
      "what you'll do",
    ];

    const mediumValue = [
      "experience",
      "skills",
      "team",
      "work",
      "position",
      "role",
      "developer",
      "engineer",
      "analyst",
      "manager",
      "apply",
    ];

    const lowValue = ["job", "career", "company", "hiring", "opportunity"];

    // Score based on keyword presence
    highValue.forEach((keyword) => {
      if (text.includes(keyword)) score += 3;
    });

    mediumValue.forEach((keyword) => {
      if (text.includes(keyword)) score += 2;
    });

    lowValue.forEach((keyword) => {
      if (text.includes(keyword)) score += 1;
    });

    // Bonus for structure
    if (text.includes("•") || text.includes("-") || text.includes("*"))
      score += 2;
    if (text.match(/\d+\s*years?/)) score += 2;
    if (text.includes("bachelor") || text.includes("master")) score += 1;

    return score;
  }
}

// Initialize when DOM is ready
function initializeDetector() {
  console.log("🚀 Initializing JobPageDetector...");
  try {
    new JobPageDetector();
  } catch (error) {
    console.error("❌ Error initializing detector:", error);
  }
}

// Multiple initialization strategies
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeDetector);
} else {
  initializeDetector();
}

// Also try after a short delay to handle dynamic content
setTimeout(initializeDetector, 2000);

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("📨 Received message:", request);

  if (request.action === "extractJobDescription") {
    try {
      const detector = new JobPageDetector();
      const description = detector.extractJobDescription();
      console.log("📄 Extracted description length:", description.length);
      sendResponse({ description });
    } catch (error) {
      console.error("❌ Error in message handler:", error);
      sendResponse({ description: "Error extracting job description." });
    }
  }

  return true; // Keep message channel open
});

// Re-run detection on URL changes (for SPAs)
let currentUrl = window.location.href;
const observer = new MutationObserver(() => {
  if (currentUrl !== window.location.href) {
    currentUrl = window.location.href;
    console.log("🔄 URL changed, re-initializing...");

    setTimeout(() => {
      // Remove existing button if any
      const existingBtn = document.getElementById("resume-tailor-floating-btn");
      if (existingBtn) {
        existingBtn.remove();
      }

      // Re-initialize
      initializeDetector();
    }, 2000); // Wait for page to load
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

console.log("✅ Content script loaded successfully");
