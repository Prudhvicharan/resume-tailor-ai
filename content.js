// content.js - Content script for job description detection and floating button
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

    // Step 1: Check URL patterns (quick check)
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
    ];

    const hasJobUrl = jobUrlPatterns.some((pattern) => url.includes(pattern));

    // Step 2: Advanced content analysis - LOWERED THRESHOLD
    const jobKeywords = [
      "job description",
      "job summary",
      "responsibilities",
      "requirements",
      "qualifications",
      "experience required",
      "skills needed",
      "apply now",
      "submit application",
      "job duties",
      "role description",
      "position overview",
      "what you'll do",
      "what we're looking for",
      "ideal candidate",
      "minimum requirements",
      "preferred qualifications",
      "years of experience",
      "education required",
      "technical skills",
      "about the role",
      "job summary",
      "web developer",
      "software engineer",
      "developer",
      "engineer",
    ];

    // Count how many job keywords appear
    const keywordMatches = jobKeywords.filter(
      (keyword) => content.includes(keyword) || title.includes(keyword)
    ).length;

    console.log(
      `📊 Keyword matches: ${keywordMatches}, URL patterns: ${hasJobUrl}`
    );

    // Step 3: Check for job-specific elements and patterns
    const hasJobElements = this.checkJobElements();
    const hasJobStructure = this.analyzePageStructure();

    console.log(`🔍 Analysis details:`);
    console.log(`   - URL patterns: ${hasJobUrl}`);
    console.log(`   - Keyword matches: ${keywordMatches}`);
    console.log(`   - Job elements: ${hasJobElements}`);
    console.log(`   - Job structure: ${hasJobStructure}`);

    // Step 4: Make decision - MUCH MORE LENIENT
    const isJobPage =
      hasJobUrl || // ANY URL with job-related words
      keywordMatches >= 2 || // Just 2+ job keywords (was 4)
      hasJobElements || // ANY job elements found
      hasJobStructure || // ANY job structure found
      title.includes("job") ||
      title.includes("position") ||
      title.includes("career") ||
      content.includes("job summary") ||
      content.includes("responsibilities") ||
      content.includes("requirements");

    console.log(`🎯 Final decision: ${isJobPage ? "IS" : "NOT"} a job page`);

    this.isJobPage = isJobPage;
    return isJobPage;
  }

  checkJobElements() {
    // Look for common job page elements
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

    return elementCount >= 3;
  }

  analyzePageStructure() {
    const content = document.body.textContent;

    // Look for structured job content patterns
    const structurePatterns = [
      /responsibilities?[\s\S]{0,50}[:\-]/i,
      /requirements?[\s\S]{0,50}[:\-]/i,
      /qualifications?[\s\S]{0,50}[:\-]/i,
      /experience[\s\S]{0,50}[:\-]/i,
      /skills[\s\S]{0,50}[:\-]/i,
      /education[\s\S]{0,50}[:\-]/i,
      /\d+\+?\s*years?\s+of\s+experience/i,
      /bachelor'?s?\s+degree/i,
      /master'?s?\s+degree/i,
    ];

    const patternMatches = structurePatterns.filter((pattern) =>
      pattern.test(content)
    ).length;

    return patternMatches >= 2;
  }

  createFloatingButton() {
    // Create floating button
    this.floatingButton = document.createElement("div");
    this.floatingButton.id = "resume-tailor-floating-btn";
    this.floatingButton.innerHTML = `
            <div class="floating-btn-content">
                <span class="btn-icon">🎯</span>
                <span class="btn-text">Tailor Resume</span>
            </div>
        `;

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
            #resume-tailor-floating-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50px;
                padding: 12px 20px;
                box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                color: white;
                font-size: 14px;
                font-weight: 500;
                border: none;
                backdrop-filter: blur(10px);
            }

            #resume-tailor-floating-btn:hover {
                transform: translateY(-2px) scale(1.05);
                box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
                background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
            }

            .floating-btn-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .btn-icon {
                font-size: 16px;
            }

            .btn-text {
                white-space: nowrap;
            }

            @media (max-width: 768px) {
                #resume-tailor-floating-btn {
                    padding: 10px 15px;
                    font-size: 13px;
                }
                
                .btn-text {
                    display: none;
                }
            }

            /* Pulse animation for attention */
            @keyframes pulse {
                0% { box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3); }
                50% { box-shadow: 0 4px 30px rgba(102, 126, 234, 0.6); }
                100% { box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3); }
            }

            #resume-tailor-floating-btn.pulse {
                animation: pulse 2s infinite;
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
  }

  openExtensionPopup() {
    // Send message to background script to open popup
    chrome.runtime.sendMessage({ action: "openPopup" });
  }

  // Enhanced job description extraction
  extractJobDescription() {
    console.log("🔍 Starting enhanced job extraction...");

    // Use the same intelligent extraction as in popup
    return this.intelligentJobExtraction();
  }

  intelligentJobExtraction() {
    const pageText = document.body.textContent.toLowerCase();

    // Check if this page contains job-related content
    const jobIndicators = [
      "job description",
      "job summary",
      "job details",
      "position summary",
      "responsibilities",
      "requirements",
      "qualifications",
      "skills required",
      "experience required",
      "job requirements",
      "role description",
      "what you'll do",
      "what we're looking for",
      "ideal candidate",
      "key responsibilities",
      "essential skills",
      "preferred qualifications",
      "about the role",
      "position overview",
      "job posting",
      "job opening",
      "apply now",
      "submit application",
      "job duties",
      "role responsibilities",
      "minimum requirements",
      "education required",
      "years of experience",
    ];

    const indicatorCount = jobIndicators.filter((indicator) =>
      pageText.includes(indicator)
    ).length;

    console.log(`📊 Found ${indicatorCount} job indicators`);

    if (indicatorCount < 2) {
      console.log("❌ Not enough job indicators found");
      return "";
    }

    let bestContent = "";
    let bestScore = 0;

    // Strategy 1: Try known selectors first
    const selectors = [
      // LinkedIn
      ".jobs-description-content__text",
      ".jobs-box__html-content",
      '[data-automation-id="jobPostingDescription"]',
      ".jobs-description__container",

      // Indeed
      ".jobsearch-jobDescriptionText",
      "#jobDescriptionText",
      ".jobsearch-JobComponent-description",
      ".icl-u-lg-mr--sm",

      // Glassdoor
      ".jobDescriptionContent",
      ".desc",
      '[data-test="jobDescriptionContainer"]',

      // Universal patterns
      '[class*="job-description"]',
      '[class*="job-content"]',
      '[class*="job-details"]',
      '[class*="position-description"]',
      '[class*="role-description"]',
      '[id*="job-description"]',
      '[id*="job-content"]',
      '[id*="description"]',
      ".job-summary",
      ".role-summary",
      ".position-summary",
    ];

    // Try each selector
    for (const selector of selectors) {
      try {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          const content = this.extractCleanText(element);
          const score = this.scoreJobContent(content);

          if (score > bestScore && content.length > 200) {
            bestContent = content;
            bestScore = score;
          }
        }
      } catch (e) {
        continue;
      }
    }

    // Strategy 2: Intelligent content analysis
    if (bestScore < 5) {
      console.log("🧠 Using intelligent analysis...");
      const sections = this.findJobContentSections();

      for (const section of sections.slice(0, 10)) {
        // Check top 10 sections
        const content = this.extractCleanText(section);
        const score = this.scoreJobContent(content);

        if (score > bestScore) {
          bestContent = content;
          bestScore = score;
        }
      }
    }

    // Strategy 3: Full page analysis
    if (bestScore < 3) {
      console.log("🌐 Analyzing full page...");
      const fullContent = this.extractCleanText(document.body);
      const jobSections = this.extractJobSectionsFromText(fullContent);

      if (jobSections && jobSections.length > 300) {
        const score = this.scoreJobContent(jobSections);
        if (score > bestScore) {
          bestContent = jobSections;
          bestScore = score;
        }
      }
    }

    console.log(
      `🎯 Extraction complete. Score: ${bestScore}, Length: ${bestContent.length}`
    );
    return bestContent;
  }

  extractCleanText(element) {
    if (!element) return "";

    const clone = element.cloneNode(true);

    // Remove unwanted elements
    const unwanted = ["script", "style", "nav", "header", "footer", "aside"];
    unwanted.forEach((tag) => {
      const elements = clone.querySelectorAll(tag);
      elements.forEach((el) => el.remove());
    });

    let text = clone.textContent || clone.innerText || "";
    return text.replace(/\s+/g, " ").trim();
  }

  scoreJobContent(content) {
    if (!content || content.length < 100) return 0;

    const text = content.toLowerCase();
    let score = 0;

    // High-value keywords
    const highValue = [
      "responsibilities",
      "requirements",
      "qualifications",
      "experience required",
      "skills needed",
      "job duties",
      "role responsibilities",
    ];

    const mediumValue = [
      "about the role",
      "position",
      "candidate",
      "team",
      "work",
      "development",
      "experience",
      "skills",
      "knowledge",
    ];

    highValue.forEach((keyword) => {
      if (text.includes(keyword)) score += 3;
    });

    mediumValue.forEach((keyword) => {
      if (text.includes(keyword)) score += 1;
    });

    // Bonus for structure
    if (text.includes("•") || text.includes("-")) score += 2;
    if (text.match(/\d+\+?\s*years?/)) score += 2;

    return score;
  }

  findJobContentSections() {
    const sections = [];
    const elements = document.querySelectorAll(
      "div, section, article, main, p"
    );

    for (const element of elements) {
      const text = element.textContent.trim();
      if (text.length >= 300 && text.length <= 8000) {
        const jobWordCount = this.countJobWords(text);
        if (jobWordCount >= 3) {
          sections.push(element);
        }
      }
    }

    return sections.sort((a, b) => {
      const scoreA = this.scoreJobContent(a.textContent);
      const scoreB = this.scoreJobContent(b.textContent);
      return scoreB - scoreA;
    });
  }

  countJobWords(text) {
    const jobWords = [
      "responsibilities",
      "requirements",
      "qualifications",
      "experience",
      "skills",
      "duties",
      "role",
      "position",
      "candidate",
      "work",
    ];

    const lowerText = text.toLowerCase();
    return jobWords.filter((word) => lowerText.includes(word)).length;
  }

  extractJobSectionsFromText(fullText) {
    const lines = fullText.split("\n").filter((line) => line.trim().length > 0);
    let jobLines = [];
    let foundJobSection = false;

    for (const line of lines) {
      const lowerLine = line.toLowerCase();

      if (
        lowerLine.includes("responsibilities") ||
        lowerLine.includes("requirements") ||
        lowerLine.includes("qualifications") ||
        lowerLine.includes("job description")
      ) {
        foundJobSection = true;
        jobLines = [line];
        continue;
      }

      if (foundJobSection) {
        if (
          this.countJobWords(line) > 0 ||
          line.includes("•") ||
          line.includes("-") ||
          line.match(/^\d+\./)
        ) {
          jobLines.push(line);
        } else if (jobLines.length > 10) {
          break;
        }
      }
    }

    return jobLines.join("\n");
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new JobPageDetector();
  });
} else {
  new JobPageDetector();
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractJobDescription") {
    const detector = new JobPageDetector();
    const description = detector.extractJobDescription();
    sendResponse({ description });
  }
});

// Re-run detection on URL changes (for SPAs)
let currentUrl = window.location.href;
const observer = new MutationObserver(() => {
  if (currentUrl !== window.location.href) {
    currentUrl = window.location.href;
    setTimeout(() => {
      // Remove existing button if any
      const existingBtn = document.getElementById("resume-tailor-floating-btn");
      if (existingBtn) {
        existingBtn.remove();
      }

      // Re-initialize
      new JobPageDetector();
    }, 2000); // Wait for page to load
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
