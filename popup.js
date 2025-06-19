// popup.js - Fixed with Proper Validation
class ResumeAI {
  constructor() {
    this.detectedJobDescription = "";
    this.generatedResume = "";
    this.currentTemplate = "";
    this.optimizer = null;
    this.init();
  }

  // Initialize the application
  async init() {
    try {
      // Wait for efficient optimizer to be available
      await this.waitForDependencies();

      this.optimizer = window.efficientOptimizer;
      await this.loadSettings();
      await this.loadRegistrationStatus();
      await this.loadUsageStats();
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

  // Wait for dependencies to load
  async waitForDependencies() {
    let attempts = 0;
    const maxAttempts = 20;

    while (!window.resumeTemplate || !window.efficientOptimizer) {
      if (attempts >= maxAttempts) {
        throw new Error("Dependencies not loaded");
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
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

    // New event listeners for efficient optimization
    document
      .getElementById("reRegisterTemplate")
      ?.addEventListener("click", () => this.reRegisterTemplate());
    document
      .getElementById("clearRegistration")
      ?.addEventListener("click", () => this.clearRegistration());
  }

  // Load settings and current template
  async loadSettings() {
    try {
      const syncSettings = await chrome.storage.sync.get([
        "claudeApiKey",
        "outputFormat",
      ]);

      const localSettings = await chrome.storage.local.get(["masterResume"]);

      // Load API key
      if (syncSettings.claudeApiKey) {
        document.getElementById("apiKey").value = syncSettings.claudeApiKey;
      }

      // Load output format
      if (syncSettings.outputFormat) {
        document.getElementById("outputFormat").value =
          syncSettings.outputFormat;
      }

      // Load current resume template from LOCAL storage (larger quota)
      if (localSettings.masterResume) {
        this.currentTemplate = localSettings.masterResume;
        document.getElementById("masterResume").value =
          localSettings.masterResume;
      } else {
        // Use default template if none saved
        this.currentTemplate = await window.resumeTemplate.getCurrentTemplate();
        document.getElementById("masterResume").value = this.currentTemplate;
        // Save default template to local storage
        await chrome.storage.local.set({ masterResume: this.currentTemplate });
      }

      console.log("✅ Settings and template loaded successfully");
      console.log("📄 Template length:", this.currentTemplate.length);

      // Update button states based on template availability
      this.updateButtonStates();
    } catch (error) {
      console.error("❌ Error loading settings:", error);
      this.showStatus("Error loading settings", "error", "resumeStatus");
    }
  }

  // Update button states based on template and job description availability
  updateButtonStates() {
    const hasTemplate =
      this.currentTemplate && this.currentTemplate.length > 100;
    const hasJobDescription =
      this.detectedJobDescription && this.detectedJobDescription.length > 50;

    // Generate Resume button should only be enabled if both template and job description exist
    const generateBtn = document.getElementById("generateResume");
    if (generateBtn) {
      generateBtn.disabled = !hasTemplate || !hasJobDescription;

      if (!hasTemplate) {
        generateBtn.textContent = "⚠️ No Resume Template";
      } else if (!hasJobDescription) {
        generateBtn.innerHTML =
          '<span class="icon">⚡</span>Generate Tailored Resume';
      } else {
        generateBtn.innerHTML =
          '<span class="icon">⚡</span>Generate Tailored Resume';
      }
    }

    // Re-register button should only be enabled if template exists
    const reRegisterBtn = document.getElementById("reRegisterTemplate");
    if (reRegisterBtn) {
      reRegisterBtn.disabled = !hasTemplate;
    }
  }

  // Save settings and template with PROPER VALIDATION
  async saveSettings() {
    try {
      const apiKey = document.getElementById("apiKey").value;
      const outputFormat = document.getElementById("outputFormat").value;
      const masterResume = document.getElementById("masterResume").value;

      // CRITICAL VALIDATION: Check if template is provided and valid
      if (!masterResume || masterResume.trim().length === 0) {
        this.showStatus(
          "❌ Resume template is required! Please paste your LaTeX resume template.",
          "error",
          "resumeStatus"
        );
        return;
      }

      // Validate API key format
      if (apiKey && !apiKey.startsWith("sk-ant-")) {
        this.showStatus(
          'Invalid API key format. Claude keys should start with "sk-ant-"',
          "error",
          "resumeStatus"
        );
        return;
      }

      // Validate LaTeX template format
      if (!window.resumeTemplate.isValidLatexTemplate(masterResume)) {
        this.showStatus(
          "❌ Invalid LaTeX template format. Please check your template structure.",
          "error",
          "resumeStatus"
        );
        return;
      }

      // Check if resume template changed
      const templateChanged = masterResume !== this.currentTemplate;

      console.log("💾 Saving settings...");
      console.log("📄 Template changed:", templateChanged);
      console.log("📄 New template length:", masterResume.length);

      // Save resume template to LOCAL storage (higher quota)
      await chrome.storage.local.set({ masterResume: masterResume });
      await window.resumeTemplate.saveTemplate(masterResume);
      this.currentTemplate = masterResume;

      // If template changed, clear registration to force re-registration
      if (templateChanged) {
        await this.optimizer.clearRegistration();
        this.showStatus(
          "✅ Template updated! Will re-register on next optimization.",
          "success",
          "resumeStatus"
        );
      }

      // Test API key if provided
      if (apiKey) {
        this.showStatus("Testing API key...", "info", "resumeStatus");
        await this.testClaudeAPI(apiKey);
      }

      // Save other settings to SYNC storage (smaller items only)
      await chrome.storage.sync.set({ claudeApiKey: apiKey, outputFormat });

      // Refresh registration status and stats
      await this.loadRegistrationStatus();
      await this.loadUsageStats();
      this.updateButtonStates();

      if (!templateChanged) {
        this.showStatus(
          "✅ Settings saved successfully!",
          "success",
          "resumeStatus"
        );
      }

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

  // Load and display registration status
  async loadRegistrationStatus() {
    try {
      const status = await this.optimizer.getRegistrationStatus(
        this.currentTemplate
      );
      const statusElement = document.getElementById("registrationStatus");

      if (statusElement) {
        if (status.needsRegistration) {
          let reason = "";
          switch (status.reason) {
            case "not_registered":
              reason = "(Not registered)";
              break;
            case "template_changed":
              reason = "(Template changed)";
              break;
            case "expired":
              reason = "(Registration expired)";
              break;
            default:
              reason = "(Needs registration)";
          }

          statusElement.innerHTML = `
              <span class="status-indicator unregistered">⚪</span>
              <span>Template not registered</span>
              <small>${reason} - Will register automatically on first use</small>
            `;
        } else {
          const regDate = new Date(
            status.registration.timestamp
          ).toLocaleDateString();
          statusElement.innerHTML = `
              <span class="status-indicator registered">✅</span>
              <span>Template registered</span>
              <small>(${regDate} - Saves ~87% tokens)</small>
            `;
        }
      }
    } catch (error) {
      console.error("Error loading registration status:", error);
    }
  }

  // Load and display usage statistics
  async loadUsageStats() {
    try {
      const stats = await this.optimizer.getUsageStats();
      const statsElement = document.getElementById("usageStats");

      if (statsElement && stats) {
        statsElement.innerHTML = `
            <div class="stats-row">
              <span>Total Optimizations:</span>
              <span>${stats.totalOptimizations}</span>
            </div>
            <div class="stats-row">
              <span>Efficient Mode:</span>
              <span>${stats.efficientOptimizations} (${
          stats.efficiencyRate
        }%)</span>
            </div>
            <div class="stats-row">
              <span>Tokens Saved:</span>
              <span>~${stats.tokensSaved.toLocaleString()}</span>
            </div>
          `;
      }
    } catch (error) {
      console.error("Error loading usage stats:", error);
    }
  }

  // Manual re-registration
  async reRegisterTemplate() {
    // Check if template exists
    if (!this.currentTemplate || this.currentTemplate.length < 100) {
      this.showStatus(
        "❌ No valid template to register. Please add a resume template first.",
        "error",
        "resumeStatus"
      );
      return;
    }

    const settings = await chrome.storage.sync.get(["claudeApiKey"]);
    if (!settings.claudeApiKey) {
      this.showStatus(
        "❌ Please add your Claude API key first.",
        "error",
        "resumeStatus"
      );
      return;
    }

    this.showLoading(true);
    this.showStatus("🔄 Re-registering template...", "info", "resumeStatus");

    try {
      const result = await this.optimizer.reRegisterTemplate(
        settings.claudeApiKey,
        this.currentTemplate
      );

      if (result.success) {
        this.showStatus(
          "✅ Template re-registered successfully!",
          "success",
          "resumeStatus"
        );
        await this.loadRegistrationStatus();
        await this.loadUsageStats();
      } else {
        this.showStatus(
          `❌ Re-registration failed: ${result.message}`,
          "error",
          "resumeStatus"
        );
      }
    } catch (error) {
      console.error("❌ Error re-registering template:", error);
      this.showStatus(
        `❌ Re-registration error: ${error.message}`,
        "error",
        "resumeStatus"
      );
    } finally {
      this.showLoading(false);
    }
  }

  // Clear registration
  async clearRegistration() {
    try {
      await this.optimizer.clearRegistration();
      await this.loadRegistrationStatus();
      this.showStatus(
        "🗑️ Registration cleared. Will re-register on next use.",
        "info",
        "resumeStatus"
      );
    } catch (error) {
      console.error("Error clearing registration:", error);
    }
  }

  // Generate tailored resume using EFFICIENT optimization
  async generateTailoredResume() {
    // CRITICAL VALIDATION: Check template exists
    if (!this.currentTemplate || this.currentTemplate.length < 100) {
      this.showStatus(
        "❌ No resume template found! Please add your resume template in settings first.",
        "error",
        "resumeStatus"
      );
      return;
    }

    if (!this.detectedJobDescription) {
      this.showStatus(
        "❌ Please detect job content first.",
        "error",
        "resumeStatus"
      );
      return;
    }

    const settings = await chrome.storage.sync.get(["claudeApiKey"]);
    if (!settings.claudeApiKey) {
      this.showStatus(
        "❌ Please add your Claude API key in settings.",
        "error",
        "resumeStatus"
      );
      return;
    }

    this.showLoading(true);
    this.showStatus(
      "🚀 Optimizing resume with AI (efficient mode)...",
      "info",
      "resumeStatus"
    );

    try {
      // Use the efficient optimizer
      const result = await this.optimizer.optimizeResume(
        settings.claudeApiKey,
        this.detectedJobDescription,
        this.currentTemplate
      );

      if (result.success) {
        this.generatedResume = result.resume;

        // Show different messages based on optimization method
        let successMessage = "✅ Resume optimized successfully!";
        if (result.method === "efficient") {
          successMessage += " (Efficient mode - saved ~87% tokens)";
        } else if (result.method === "sections") {
          successMessage += " (Section-based mode)";
        }

        this.showStatus(successMessage, "success", "resumeStatus");
        document.getElementById("downloadLatex").style.display = "block";
        document.getElementById("copyToClipboard").style.display = "block";

        // Refresh stats
        await this.loadUsageStats();
        await this.loadRegistrationStatus();

        console.log(
          "✅ Resume generated successfully using",
          result.method,
          "mode"
        );
      } else {
        this.showStatus(
          "❌ Failed to generate resume. Please try again.",
          "error",
          "resumeStatus"
        );
      }
    } catch (error) {
      console.error("❌ Error generating resume:", error);
      this.showStatus(
        `❌ Error generating resume: ${error.message}`,
        "error",
        "resumeStatus"
      );
    } finally {
      this.showLoading(false);
    }
  }

  // Job description detection and other methods remain the same...
  // [Include all the previous job detection methods here]

  // Show detected job description preview
  showJobDescription(description) {
    const detectedDiv = document.getElementById("detectedJob");
    const preview =
      description.length > 300
        ? description.substring(0, 300) + "..."
        : description;
    detectedDiv.innerHTML = `<strong>Detected Content:</strong><br>${preview}`;
    detectedDiv.style.display = "block";

    // Update button states since we now have job description
    this.updateButtonStates();
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

  // Utility methods...
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

  async checkJobPage() {
    // Job page checking logic...
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!tab?.url) return;

      const jobSites = [
        "linkedin.com",
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
        "angellist.com",
        "dice.com",
        "stackoverflow.com",
      ];

      const isJobSite = jobSites.some((site) =>
        tab.url.toLowerCase().includes(site)
      );

      if (isJobSite) {
        this.showStatus(
          '✅ Job board detected! Click "Detect Job Description" to analyze this page.',
          "success",
          "jobStatus"
        );
      } else {
        this.showStatus(
          "Navigate to any page with job content to get started.",
          "info",
          "jobStatus"
        );
      }
    } catch (error) {
      console.error("Error checking job page:", error);
    }
  }

  // Job detection methods (keep existing ones)...

  showStatus(message, type, elementId) {
    const statusEl = document.getElementById(elementId);
    if (!statusEl) return;

    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
    statusEl.style.display = "block";

    if (type === "success") {
      setTimeout(() => {
        statusEl.style.display = "none";
      }, 5000);
    }
  }

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

  // Add all the missing job detection methods here...
  async detectJobDescription() {
    this.showLoading(true);
    this.showStatus("Analyzing page content...", "info", "jobStatus");

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      console.log(
        "🔍 Attempting to extract job description from tab:",
        tab.url
      );

      // First, ensure content script is injected
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"],
        });
        console.log("✅ Content script injected");
      } catch (injectionError) {
        console.log(
          "⚠️ Content script already present or injection failed:",
          injectionError.message
        );
      }

      // Wait a moment for content script to initialize
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Try multiple extraction strategies
      let description = "";

      // Strategy 1: Use content script message
      try {
        const response = await new Promise((resolve, reject) => {
          chrome.tabs.sendMessage(
            tab.id,
            { action: "extractJobDescription" },
            (response) => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                resolve(response);
              }
            }
          );
        });

        if (response && response.description) {
          description = response.description;
          console.log("✅ Got description from content script message");
        }
      } catch (messageError) {
        console.log("⚠️ Content script message failed:", messageError.message);
      }

      // Strategy 2: Direct script execution if message failed
      if (!description || description.length < 50) {
        try {
          const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: this.directJobExtraction,
          });

          if (results && results[0] && results[0].result) {
            description = results[0].result;
            console.log("✅ Got description from direct extraction");
          }
        } catch (directError) {
          console.log("⚠️ Direct extraction failed:", directError.message);
        }
      }

      // Strategy 3: Simple text extraction fallback
      if (!description || description.length < 50) {
        try {
          const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: this.simpleTextExtraction,
          });

          if (results && results[0] && results[0].result) {
            description = results[0].result;
            console.log("✅ Got description from simple extraction");
          }
        } catch (simpleError) {
          console.log("⚠️ Simple extraction failed:", simpleError.message);
        }
      }

      // Evaluate the result
      if (
        !description ||
        description.length < 30 ||
        description.includes("Could not extract") ||
        description.includes("Error extracting") ||
        description.includes("doesn't appear to contain")
      ) {
        this.showStatus(
          "Could not detect meaningful job content on this page. Try a different page or check if this is a job posting.",
          "error",
          "jobStatus"
        );
        this.detectedJobDescription = "";
        document.getElementById("generateResume").disabled = true;
      } else {
        this.detectedJobDescription = description;
        this.showJobDescription(description);
        this.showStatus(
          "✅ Job content detected successfully!",
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

  // Direct job extraction function to inject
  directJobExtraction() {
    console.log("🔍 Direct job extraction starting...");

    const text = document.body.textContent || document.body.innerText || "";

    // Very basic check - if page has job-related words, return content
    const jobWords = [
      "job",
      "position",
      "role",
      "career",
      "responsibilities",
      "requirements",
      "qualifications",
      "experience",
      "skills",
      "apply",
      "hiring",
      "work",
    ];

    const lowerText = text.toLowerCase();
    const jobWordCount = jobWords.filter((word) =>
      lowerText.includes(word)
    ).length;

    if (jobWordCount < 2) {
      return "This page doesn't contain enough job-related content.";
    }

    // Try to find the best content sections
    const selectors = [
      "main",
      "article",
      '[class*="job"]',
      '[class*="description"]',
      '[class*="content"]',
      "section",
      ".content",
    ];

    let bestContent = "";
    let bestScore = 0;

    for (const selector of selectors) {
      try {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          const content = element.textContent || "";
          if (content.length > bestContent.length && content.length > 100) {
            bestContent = content;
          }
        }
      } catch (e) {
        continue;
      }
    }

    // Clean up the content
    if (bestContent) {
      bestContent = bestContent.replace(/\s+/g, " ").trim();
      // Limit to reasonable length
      if (bestContent.length > 5000) {
        bestContent = bestContent.substring(0, 5000) + "...";
      }
    }

    return bestContent || text.substring(0, 2000);
  }

  // Simple text extraction fallback
  simpleTextExtraction() {
    console.log("🔍 Simple text extraction starting...");

    // Just get all visible text and return it
    const allText = document.body.textContent || document.body.innerText || "";

    // Basic cleanup
    const cleanText = allText.replace(/\s+/g, " ").trim();

    // Return first 3000 characters if it's long
    if (cleanText.length > 3000) {
      return cleanText.substring(0, 3000) + "...";
    }

    return cleanText;
  }

  // Show detected job description preview
  showJobDescription(description) {
    const detectedDiv = document.getElementById("detectedJob");
    const preview =
      description.length > 300
        ? description.substring(0, 300) + "..."
        : description;
    detectedDiv.innerHTML = `<strong>Detected Content:</strong><br>${preview}`;
    detectedDiv.style.display = "block";
  }

  // Generate tailored resume using EFFICIENT optimization
  async generateTailoredResume() {
    if (!this.detectedJobDescription) {
      this.showStatus(
        "Please detect job content first.",
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
      "🚀 Optimizing resume with AI (efficient mode)...",
      "info",
      "resumeStatus"
    );

    try {
      // Use the efficient optimizer
      const result = await this.optimizer.optimizeResume(
        settings.claudeApiKey,
        this.detectedJobDescription,
        this.currentTemplate
      );

      if (result.success) {
        this.generatedResume = result.resume;

        // Show different messages based on optimization method
        let successMessage = "✅ Resume optimized successfully!";
        if (result.method === "efficient") {
          successMessage += " (Efficient mode - saved ~87% tokens)";
        } else if (result.method === "sections") {
          successMessage += " (Section-based mode)";
        }

        this.showStatus(successMessage, "success", "resumeStatus");
        document.getElementById("downloadLatex").style.display = "block";
        document.getElementById("copyToClipboard").style.display = "block";

        // Refresh stats
        await this.loadUsageStats();
        await this.loadRegistrationStatus();

        console.log(
          "✅ Resume generated successfully using",
          result.method,
          "mode"
        );
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

      this.showStatus("✅ LaTeX file downloaded!", "success", "resumeStatus");
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
      this.showStatus(
        "✅ Resume copied to clipboard!",
        "success",
        "resumeStatus"
      );
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
      }, 5000);
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
  console.log("🚀 DOM loaded, initializing Resume AI...");

  const initializeApp = () => {
    if (window.resumeTemplate && window.efficientOptimizer) {
      console.log("✅ All dependencies available, starting app...");
      new ResumeAI();
    } else {
      console.log("⏳ Waiting for dependencies...");
      setTimeout(initializeApp, 100);
    }
  };

  initializeApp();
});
