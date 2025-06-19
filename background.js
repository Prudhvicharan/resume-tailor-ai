// background.js - Service worker for the extension
class BackgroundService {
  constructor() {
    this.init();
  }

  init() {
    // Listen for extension installation
    chrome.runtime.onInstalled.addListener((details) => {
      if (details.reason === "install") {
        this.onInstall();
      } else if (details.reason === "update") {
        this.onUpdate();
      }
    });

    // Listen for messages from content scripts and popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true; // Keep message channel open for async responses
    });

    // Listen for tab updates to detect job pages
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === "complete" && tab.url) {
        this.checkJobPage(tab);
      }
    });

    // Listen for extension icon click
    chrome.action.onClicked.addListener((tab) => {
      this.openPopup(tab);
    });
  }

  onInstall() {
    console.log("Resume Tailor AI Extension installed");

    // Set default settings
    chrome.storage.sync.set({
      outputFormat: "latex",
      autoDetect: true,
      showFloatingButton: true,
    });

    // Show welcome notification
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "Resume Tailor AI Installed!",
      message:
        "Navigate to any job posting and click the extension to get started.",
    });
  }

  onUpdate() {
    console.log("Resume Tailor AI Extension updated");

    // Clear cache if needed
    chrome.storage.local.clear();
  }

  async handleMessage(request, sender, sendResponse) {
    try {
      switch (request.action) {
        case "openPopup":
          await this.openPopup();
          sendResponse({ success: true });
          break;

        case "extractJobDescription":
          const description = await this.extractJobDescriptionFromTab(
            sender.tab.id
          );
          sendResponse({ description });
          break;

        case "generateResume":
          const resume = await this.generateResume(
            request.jobDescription,
            request.apiKey
          );
          sendResponse({ resume });
          break;

        case "saveSettings":
          await chrome.storage.sync.set(request.settings);
          sendResponse({ success: true });
          break;

        case "getSettings":
          const settings = await chrome.storage.sync.get();
          sendResponse({ settings });
          break;

        case "checkJobPage":
          const isJobPage = await this.isJobPage(sender.tab);
          sendResponse({ isJobPage });
          break;

        default:
          sendResponse({ error: "Unknown action" });
      }
    } catch (error) {
      console.error("Background script error:", error);
      sendResponse({ error: error.message });
    }
  }

  async openPopup(tab) {
    try {
      // Get current active tab if not provided
      if (!tab) {
        const [activeTab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        tab = activeTab;
      }

      // Open the popup by triggering the browser action
      chrome.action.openPopup();
    } catch (error) {
      console.error("Error opening popup:", error);

      // Fallback: create a new popup window
      chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        width: 400,
        height: 600,
        focused: true,
      });
    }
  }

  async extractJobDescriptionFromTab(tabId) {
    try {
      const results = await chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          // Use the extraction function from content script
          const detector = new JobPageDetector();
          return detector.extractJobDescription();
        },
      });

      return results[0]?.result || "";
    } catch (error) {
      console.error("Error extracting job description:", error);
      return "";
    }
  }

  async generateResume(jobDescription, apiKey) {
    try {
      // This would typically call your AI service
      // For now, return a placeholder
      return "Generated resume content...";
    } catch (error) {
      console.error("Error generating resume:", error);
      throw error;
    }
  }

  async isJobPage(tab) {
    if (!tab || !tab.url) return false;

    const jobSitePatterns = [
      "linkedin.com/jobs",
      "indeed.com",
      "glassdoor.com",
      "monster.com",
      "ziprecruiter.com",
      "workday.com",
      "lever.co",
      "greenhouse.io",
      "ashbyhq.com",
      "boards.greenhouse.io",
    ];

    return jobSitePatterns.some((pattern) => tab.url.includes(pattern));
  }

  async checkJobPage(tab) {
    const isJob = await this.isJobPage(tab);

    if (isJob) {
      // Update badge to indicate job page detected
      chrome.action.setBadgeText({
        text: "!",
        tabId: tab.id,
      });

      chrome.action.setBadgeBackgroundColor({
        color: "#4CAF50",
        tabId: tab.id,
      });

      // Inject content script if not already present
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"],
        });
      } catch (error) {
        // Content script might already be injected
        console.log("Content script already present or injection failed");
      }
    } else {
      // Clear badge
      chrome.action.setBadgeText({
        text: "",
        tabId: tab.id,
      });
    }
  }

  // Analytics and error tracking
  trackEvent(eventName, properties = {}) {
    // Implement analytics tracking here
    console.log("Event tracked:", eventName, properties);
  }

  trackError(error, context = "") {
    // Implement error tracking here
    console.error("Error tracked:", error, context);
  }
}

// Initialize background service
new BackgroundService();

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
  console.log("Resume Tailor AI Extension starting up");
});

// Handle extension shutdown
chrome.runtime.onSuspend.addListener(() => {
  console.log("Resume Tailor AI Extension suspending");
});

// Context menu setup
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "tailorResume",
    title: "Tailor Resume for this Job",
    contexts: ["page"],
    documentUrlPatterns: [
      "*://*.linkedin.com/jobs/*",
      "*://*.indeed.com/*",
      "*://*.glassdoor.com/*",
      "*://*.monster.com/*",
      "*://*.ziprecruiter.com/*",
      "*://*.workday.com/*",
      "*://*.lever.co/*",
      "*://*.greenhouse.io/*",
      "*://*.ashbyhq.com/*",
    ],
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "tailorResume") {
    chrome.action.openPopup();
  }
});

// Keyboard shortcut handler
chrome.commands.onCommand.addListener((command) => {
  if (command === "open-resume-tailor") {
    chrome.action.openPopup();
  }
});
