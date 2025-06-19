// popup.js - Main application logic for Resume Tailor AI
class ResumeAI {
  constructor() {
    this.detectedJobDescription = "";
    this.generatedResume = "";
    this.currentTemplate = "";
    this.init();
  }

  // Initialize the application
  async init() {
    try {
      await this.loadSettings();
      this.bindEvents();
      await this.checkJobPage();
      console.log("✅ Resume Tailor AI initialized successfully");
    } catch (error) {
      console.error("❌ Error initializing Resume Tailor AI:", error);
      this.showStatus(
        "Error initializing extension. Please refresh.",
        "error",
        "jobStatus"
      );
    }
  }

  // Bind all event listeners
  bindEvents() {
    document
      .getElementById("detectJob")
      .addEventListener("click", () => this.detectJobDescription());
    document
      .getElementById("generateResume")
      .addEventListener("click", () => this.generateTailoredResume());
    document
      .getElementById("downloadLatex")
      .addEventListener("click", () => this.downloadLatex());
    document
      .getElementById("copyToClipboard")
      .addEventListener("click", () => this.copyToClipboard());
    document
      .getElementById("settingsToggle")
      .addEventListener("click", () => this.toggleSettings());
    document
      .getElementById("saveSettings")
      .addEventListener("click", () => this.saveSettings());
  }

  // Load settings and current template
  async loadSettings() {
    try {
      const settings = await chrome.storage.sync.get([
        "claudeApiKey",
        "outputFormat",
      ]);

      // Load API key
      if (settings.claudeApiKey) {
        document.getElementById("apiKey").value = settings.claudeApiKey;
      }

      // Load output format
      if (settings.outputFormat) {
        document.getElementById("outputFormat").value = settings.outputFormat;
      }

      // Load current resume template
      this.currentTemplate = await window.resumeTemplate.getCurrentTemplate();
      document.getElementById("masterResume").value = this.currentTemplate;

      console.log("✅ Settings and template loaded successfully");
    } catch (error) {
      console.error("❌ Error loading settings:", error);
      this.showStatus("Error loading settings", "error", "resumeStatus");
    }
  }

  // Save settings and template
  async saveSettings() {
    try {
      const apiKey = document.getElementById("apiKey").value;
      const outputFormat = document.getElementById("outputFormat").value;
      const masterResume = document.getElementById("masterResume").value;

      // Validate API key format
      if (apiKey && !apiKey.startsWith("sk-ant-")) {
        this.showStatus(
          'Invalid API key format. Claude keys should start with "sk-ant-"',
          "error",
          "resumeStatus"
        );
        return;
      }

      // Validate and save resume template
      if (masterResume) {
        if (!window.resumeTemplate.isValidLatexTemplate(masterResume)) {
          this.showStatus(
            "Please enter a valid LaTeX resume template",
            "error",
            "resumeStatus"
          );
          return;
        }

        await window.resumeTemplate.saveTemplate(masterResume);
        this.currentTemplate = masterResume;
      }

      // Test API key if provided
      if (apiKey) {
        this.showStatus("Testing API key...", "info", "resumeStatus");
        await this.testClaudeAPI(apiKey);
      }

      // Save settings to storage
      await chrome.storage.sync.set({ claudeApiKey: apiKey, outputFormat });

      this.showStatus(
        "Settings saved successfully!",
        "success",
        "resumeStatus"
      );
      console.log("✅ Settings saved and validated");
    } catch (error) {
      console.error("❌ Error saving settings:", error);
      this.showStatus(
        `Error saving settings: ${error.message}`,
        "error",
        "resumeStatus"
      );
    }
  }

  // Test Claude API key
  async testClaudeAPI(apiKey) {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 50,
          messages: [
            {
              role: "user",
              content: 'Test message. Please respond with "API working".',
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      if (!data.content?.[0]?.text) {
        throw new Error("Invalid API response format");
      }

      console.log("✅ API key test successful");
      return true;
    } catch (error) {
      console.error("❌ API key test failed:", error);
      throw error;
    }
  }

  // Toggle settings panel
  toggleSettings() {
    const panel = document.getElementById("settingsPanel");
    const toggle = document.getElementById("settingsToggle");

    if (panel.style.display === "none" || !panel.style.display) {
      panel.style.display = "block";
      toggle.textContent = "🔼 Hide Settings";
    } else {
      panel.style.display = "none";
      toggle.textContent = "⚙️ Settings";
    }
  }

  // Check if current page is a job board
  async checkJobPage() {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!tab?.url) return;

      const jobSites = [
        "linkedin.com/jobs",
        "indeed.com",
        "glassdoor.com",
        "monster.com",
        "ziprecruiter.com",
        "workday.com",
        "lever.co",
        "greenhouse.io",
        "ashbyhq.com",
        "careers.",
        "/jobs/",
        "/careers/",
      ];

      const isJobSite = jobSites.some((site) =>
        tab.url.toLowerCase().includes(site)
      );

      if (isJobSite) {
        this.showStatus(
          'Job board detected! Click "Detect Job Description" to analyze this page.',
          "info",
          "jobStatus"
        );
      } else {
        this.showStatus(
          "Navigate to a job posting to get started.",
          "info",
          "jobStatus"
        );
      }
    } catch (error) {
      console.error("Error checking job page:", error);
    }
  }

  // Detect job description from current page
  async detectJobDescription() {
    this.showLoading(true);
    this.showStatus("Analyzing page content...", "info", "jobStatus");

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      // Inject content script to extract job description
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: this.extractJobDescriptionFromPage,
      });

      const description = results?.[0]?.result;

      if (
        !description ||
        description.includes("Could not extract") ||
        description.includes("No job-related content")
      ) {
        this.showStatus(
          "Could not detect job description. Please try a different page or ensure this is a job posting.",
          "error",
          "jobStatus"
        );
        this.detectedJobDescription = "";
        document.getElementById("generateResume").disabled = true;
      } else {
        this.detectedJobDescription = description;
        this.showJobDescription(description);
        this.showStatus(
          "Job description detected successfully!",
          "success",
          "jobStatus"
        );
        document.getElementById("generateResume").disabled = false;
        console.log("✅ Job description extracted successfully");
      }
    } catch (error) {
      console.error("❌ Error detecting job description:", error);
      this.showStatus(
        "Error analyzing page. Please try again or refresh the page.",
        "error",
        "jobStatus"
      );
    } finally {
      this.showLoading(false);
    }
  }

  // Function to be injected into page for job description extraction
  extractJobDescriptionFromPage() {
    console.log("📄 Extracting job description from page...");

    const pageText = document.body.textContent.toLowerCase();

    // Check for job indicators
    const jobIndicators = [
      "job description",
      "job summary",
      "responsibilities",
      "requirements",
      "qualifications",
      "experience required",
      "skills needed",
      "job duties",
      "role description",
      "about the role",
      "position overview",
      "ideal candidate",
      "web developer",
      "software engineer",
      "developer",
      "engineer",
    ];

    const indicatorCount = jobIndicators.filter((indicator) =>
      pageText.includes(indicator)
    ).length;

    console.log(`📊 Found ${indicatorCount} job indicators`);

    if (indicatorCount < 1) {
      return "No job-related content detected on this page.";
    }

    // Try multiple extraction strategies
    let bestContent = "";
    let bestScore = 0;

    // Strategy 1: Known job selectors
    const selectors = [
      // Universal patterns
      '[class*="job"]',
      '[class*="position"]',
      '[class*="role"]',
      '[class*="description"]',
      '[class*="content"]',
      '[class*="details"]',
      '[id*="job"]',
      '[id*="description"]',
      '[id*="content"]',
      "main",
      "article",
      "section",
      ".content",
    ];

    for (const selector of selectors) {
      try {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          const content = this.extractCleanText(element);
          const score = this.scoreJobContent(content);

          if (score > bestScore && content.length > 100) {
            bestContent = content;
            bestScore = score;
          }
        }
      } catch (e) {
        continue;
      }
    }

    // Strategy 2: Full page analysis if needed
    if (bestScore < 2) {
      const fullContent = this.extractCleanText(document.body);
      const jobContent = this.extractJobSectionsFromText(fullContent);

      if (jobContent && jobContent.length > bestContent.length) {
        bestContent = jobContent;
        bestScore = 10;
      }
    }

    // Strategy 3: Fallback to any job-related content
    if (!bestContent || bestContent.length < 200) {
      const allText = document.body.textContent;
      const paragraphs = allText.split("\n").filter((p) => {
        const lower = p.toLowerCase();
        return (
          p.length > 50 &&
          jobIndicators.some((indicator) => lower.includes(indicator))
        );
      });

      if (paragraphs.length > 0) {
        bestContent = paragraphs.join("\n");
      }
    }

    return (
      bestContent ||
      "Could not extract meaningful job description from this page."
    );

    // Helper functions for extraction
    function extractCleanText(element) {
      if (!element) return "";

      const clone = element.cloneNode(true);
      const unwanted = ["script", "style", "nav", "header", "footer", "aside"];
      unwanted.forEach((tag) => {
        const elements = clone.querySelectorAll(tag);
        elements.forEach((el) => el.remove());
      });

      return (clone.textContent || "").replace(/\s+/g, " ").trim();
    }

    function scoreJobContent(content) {
      if (!content || content.length < 50) return 0;

      const text = content.toLowerCase();
      let score = 0;

      const highValue = [
        "responsibilities",
        "requirements",
        "qualifications",
        "job duties",
      ];
      const mediumValue = [
        "experience",
        "skills",
        "knowledge",
        "developer",
        "engineer",
      ];

      highValue.forEach((keyword) => {
        if (text.includes(keyword)) score += 3;
      });

      mediumValue.forEach((keyword) => {
        if (text.includes(keyword)) score += 1;
      });

      if (text.includes("•") || text.includes("-")) score += 2;
      if (text.match(/\d+\+?\s*years?/)) score += 2;

      return score;
    }

    function extractJobSectionsFromText(fullText) {
      const lines = fullText
        .split("\n")
        .filter((line) => line.trim().length > 10);
      const jobLines = lines.filter((line) => {
        const lower = line.toLowerCase();
        return jobIndicators.some((indicator) => lower.includes(indicator));
      });

      return jobLines.join("\n");
    }
  }

  // Show detected job description preview
  showJobDescription(description) {
    const detectedDiv = document.getElementById("detectedJob");
    const preview =
      description.length > 300
        ? description.substring(0, 300) + "..."
        : description;
    detectedDiv.innerHTML = `<strong>Detected:</strong><br>${preview}`;
    detectedDiv.style.display = "block";
  }

  // Generate tailored resume using Claude AI
  async generateTailoredResume() {
    if (!this.detectedJobDescription) {
      this.showStatus(
        "Please detect a job description first.",
        "error",
        "resumeStatus"
      );
      return;
    }

    const settings = await chrome.storage.sync.get(["claudeApiKey"]);
    if (!settings.claudeApiKey) {
      this.showStatus(
        "Please add your Claude API key in settings.",
        "error",
        "resumeStatus"
      );
      return;
    }

    this.showLoading(true);
    this.showStatus(
      "Tailoring resume with Claude AI...",
      "info",
      "resumeStatus"
    );

    try {
      // Get current template
      const currentTemplate = await window.resumeTemplate.getCurrentTemplate();

      // Generate tailored resume
      const tailoredResume = await this.callClaudeAPI(
        settings.claudeApiKey,
        currentTemplate
      );

      if (tailoredResume) {
        this.generatedResume = tailoredResume;
        this.showStatus(
          "Resume tailored successfully!",
          "success",
          "resumeStatus"
        );
        document.getElementById("downloadLatex").style.display = "block";
        document.getElementById("copyToClipboard").style.display = "block";
        console.log("✅ Resume generated successfully");
      } else {
        this.showStatus(
          "Failed to generate resume. Please try again.",
          "error",
          "resumeStatus"
        );
      }
    } catch (error) {
      console.error("❌ Error generating resume:", error);
      this.showStatus(
        `Error generating resume: ${error.message}`,
        "error",
        "resumeStatus"
      );
    } finally {
      this.showLoading(false);
    }
  }

  // Call Claude API to generate tailored resume
  async callClaudeAPI(apiKey, template) {
    const prompt = `You are a resume optimization expert. Tailor this resume to match the job description.

JOB DESCRIPTION:
${this.detectedJobDescription}

CURRENT RESUME TEMPLATE:
${template}

INSTRUCTIONS:
1. Analyze the job description for key requirements, technologies, and skills
2. Modify the resume to emphasize relevant experience and incorporate job keywords naturally
3. Maintain the exact LaTeX structure and formatting
4. Output ONLY the complete LaTeX code - no explanations
5. Ensure all sections are included and properly formatted

PROVIDE COMPLETE LATEX CODE:`;

    try {
      console.log("🤖 Calling Claude API...");

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 8000,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.2,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Claude API error (${response.status}): ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      const data = await response.json();

      if (!data.content?.[0]?.text) {
        throw new Error("Invalid response format from Claude API");
      }

      console.log("✅ Claude API call successful");
      return data.content[0].text;
    } catch (error) {
      console.error("❌ Claude API error:", error);

      if (error.message.includes("fetch")) {
        throw new Error(
          "Network error. Please check your internet connection."
        );
      }

      throw error;
    }
  }

  // Download generated resume as LaTeX file
  downloadLatex() {
    if (!this.generatedResume) {
      this.showStatus("No resume to download.", "error", "resumeStatus");
      return;
    }

    try {
      const blob = new Blob([this.generatedResume], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `tailored_resume_${
        new Date().toISOString().split("T")[0]
      }.tex`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.showStatus("LaTeX file downloaded!", "success", "resumeStatus");
      console.log("✅ Resume downloaded successfully");
    } catch (error) {
      console.error("❌ Error downloading resume:", error);
      this.showStatus("Error downloading file.", "error", "resumeStatus");
    }
  }

  // Copy generated resume to clipboard
  async copyToClipboard() {
    if (!this.generatedResume) {
      this.showStatus("No resume to copy.", "error", "resumeStatus");
      return;
    }

    try {
      await navigator.clipboard.writeText(this.generatedResume);
      this.showStatus("Resume copied to clipboard!", "success", "resumeStatus");
      console.log("✅ Resume copied to clipboard");
    } catch (error) {
      console.error("❌ Error copying to clipboard:", error);
      this.showStatus("Failed to copy to clipboard.", "error", "resumeStatus");
    }
  }

  // Show status message
  showStatus(message, type, elementId) {
    const statusEl = document.getElementById(elementId);
    if (!statusEl) return;

    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
    statusEl.style.display = "block";

    // Auto-hide success messages
    if (type === "success") {
      setTimeout(() => {
        statusEl.style.display = "none";
      }, 3000);
    }
  }

  // Show/hide loading state
  showLoading(show) {
    const loadingDiv = document.getElementById("loadingDiv");
    const container = document.querySelector(".container");

    if (loadingDiv && container) {
      if (show) {
        loadingDiv.style.display = "block";
        container.style.opacity = "0.5";
      } else {
        loadingDiv.style.display = "none";
        container.style.opacity = "1";
      }
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Ensure resumeTemplate is available before initializing
  if (window.resumeTemplate) {
    new ResumeAI();
  } else {
    console.error("❌ ResumeTemplate not available");
    setTimeout(() => new ResumeAI(), 100); // Retry after brief delay
  }
});
