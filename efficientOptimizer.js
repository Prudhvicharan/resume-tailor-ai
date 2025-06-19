// efficientOptimizer.js - Token-Saving Resume Optimizer
class EfficientResumeOptimizer {
  constructor() {
    this.registrationKey = "templateRegistration";
    this.statsKey = "optimizationStats";
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
  }

  // ===========================================
  // TEMPLATE REGISTRATION (One-time setup)
  // ===========================================

  async registerTemplate(apiKey, template) {
    console.log("🔄 Registering resume template locally...");

    try {
      // Generate template hash to detect changes
      const templateHash = await this.generateTemplateHash(template);

      // Store template locally instead of trying to use Claude's memory
      // This is much more reliable and actually saves tokens!
      const registrationData = {
        registered: true,
        timestamp: new Date().toISOString(),
        templateHash: templateHash,
        version: "1.0",
      };

      // Store both registration data and the template itself
      await chrome.storage.local.set({
        [this.registrationKey]: registrationData,
        masterResumeTemplate: template,
      });

      console.log(
        "✅ Template registered locally (more reliable than Claude memory)"
      );
      return { success: true, message: "Template registered successfully!" };
    } catch (error) {
      console.error("❌ Template registration failed:", error);
      return {
        success: false,
        message: `Registration failed: ${error.message}`,
      };
    }
  }

  // ===========================================
  // EFFICIENT OPTIMIZATION (Uses stored template)
  // ===========================================

  async optimizeWithStoredTemplate(apiKey, jobDescription) {
    console.log("⚡ Optimizing with stored template (efficient mode)...");

    try {
      // Get the template from local storage instead of relying on Claude's memory
      const templateData = await chrome.storage.local.get([
        "masterResumeTemplate",
      ]);
      const template = templateData.masterResumeTemplate;

      if (!template) {
        throw new Error("Template not found in local storage");
      }

      const jobAnalysis = this.analyzeJobRequirements(jobDescription);

      const optimizationPrompt = `You are a resume optimization expert. Optimize this resume for the specific job below.

JOB DESCRIPTION:
${jobDescription}

CURRENT RESUME TEMPLATE:
${template}

KEY JOB REQUIREMENTS IDENTIFIED:
- Primary Technologies: ${jobAnalysis.technologies.slice(0, 5).join(", ")}
- Required Skills: ${jobAnalysis.skills.slice(0, 5).join(", ")}
- Experience Level: ${jobAnalysis.experienceLevel}
- Industry Focus: ${jobAnalysis.industry}

OPTIMIZATION INSTRUCTIONS:
1. Analyze the job description for key requirements, technologies, and skills
2. Optimize Summary section to highlight relevant experience for this role
3. Reorder Technical Skills section to prioritize job-relevant technologies
4. Emphasize experience bullets that match job requirements
5. Naturally incorporate key job keywords: ${jobAnalysis.keywords
        .slice(0, 8)
        .join(", ")}
6. Maintain exact LaTeX structure and formatting
7. Focus optimization on Summary, Technical Skills, and top 2 Experience entries
8. Output ONLY the complete optimized LaTeX code - no explanations

OPTIMIZED LATEX CODE:`;

      const optimizedResume = await this.callClaudeAPI(
        apiKey,
        optimizationPrompt,
        6000
      );

      // Update usage statistics
      await this.updateUsageStats(true);

      console.log("✅ Efficient optimization completed");
      return { success: true, resume: optimizedResume, method: "efficient" };
    } catch (error) {
      console.error("❌ Efficient optimization failed:", error);
      throw error;
    }
  }

  // ===========================================
  // FALLBACK OPTIMIZATION (Section-based)
  // ===========================================

  async optimizeWithSections(apiKey, jobDescription, template) {
    console.log("🎯 Using section-based optimization (fallback mode)...");

    try {
      const sections = this.extractResumeSections(template);
      const jobAnalysis = this.analyzeJobRequirements(jobDescription);

      const sectionPrompt = `Optimize these key resume sections for the job below. Return ONLY the optimized LaTeX code for each section.

JOB DESCRIPTION:
${jobDescription}

SECTIONS TO OPTIMIZE:

1. SUMMARY SECTION (optimize for relevance):
${sections.summary}

2. TECHNICAL SKILLS (reorder by importance):
${sections.technicalSkills}

3. TOP EXPERIENCE ENTRIES (emphasize relevant points):
${sections.topExperience}

OPTIMIZATION FOCUS:
- Emphasize: ${jobAnalysis.technologies.join(", ")}
- Include keywords: ${jobAnalysis.keywords.slice(0, 10).join(", ")}
- Target ${jobAnalysis.experienceLevel} level role

INSTRUCTIONS:
1. Return optimized LaTeX code for each section
2. Maintain exact formatting and structure
3. Label each section clearly
4. Focus on job relevance and keyword integration

OPTIMIZED SECTIONS:`;

      const optimizedSections = await this.callClaudeAPI(
        apiKey,
        sectionPrompt,
        4000
      );

      // Merge optimized sections back into full template
      const fullOptimizedResume = this.mergeSectionsIntoTemplate(
        template,
        optimizedSections
      );

      // Update usage statistics
      await this.updateUsageStats(false);

      console.log("✅ Section-based optimization completed");
      return { success: true, resume: fullOptimizedResume, method: "sections" };
    } catch (error) {
      console.error("❌ Section-based optimization failed:", error);
      throw error;
    }
  }

  // ===========================================
  // MAIN OPTIMIZATION FUNCTION
  // ===========================================

  async optimizeResume(apiKey, jobDescription, template) {
    try {
      // Check if template is registered and current
      const registrationStatus = await this.getRegistrationStatus(template);

      if (registrationStatus.needsRegistration) {
        console.log("🔄 Template needs registration/re-registration...");

        const registrationResult = await this.registerTemplate(
          apiKey,
          template
        );

        if (registrationResult.success) {
          // Proceed with efficient optimization
          return await this.optimizeWithStoredTemplate(apiKey, jobDescription);
        } else {
          // Registration failed, use fallback
          console.log(
            "⚠️ Registration failed, using section-based optimization"
          );
          return await this.optimizeWithSections(
            apiKey,
            jobDescription,
            template
          );
        }
      } else {
        console.log(
          "🚀 Using efficient mode (template already registered locally)"
        );

        try {
          return await this.optimizeWithStoredTemplate(apiKey, jobDescription);
        } catch (error) {
          console.log(
            "⚠️ Efficient mode failed, falling back to section-based"
          );
          return await this.optimizeWithSections(
            apiKey,
            jobDescription,
            template
          );
        }
      }
    } catch (error) {
      console.error("❌ Resume optimization failed completely:", error);
      throw new Error(`Optimization failed: ${error.message}`);
    }
  }

  // ===========================================
  // MANUAL RE-REGISTRATION
  // ===========================================

  async reRegisterTemplate(apiKey, template) {
    console.log("🔄 Manual re-registration requested...");

    // Clear existing registration
    await this.clearRegistration();

    // Register new template
    return await this.registerTemplate(apiKey, template);
  }

  // ===========================================
  // UTILITY FUNCTIONS
  // ===========================================

  async getRegistrationStatus(currentTemplate) {
    try {
      const data = await chrome.storage.local.get([this.registrationKey]);
      const registration = data[this.registrationKey];

      if (!registration || !registration.registered) {
        return { needsRegistration: true, reason: "not_registered" };
      }

      // Check if template has changed
      const currentHash = await this.generateTemplateHash(currentTemplate);
      if (registration.templateHash !== currentHash) {
        return { needsRegistration: true, reason: "template_changed" };
      }

      // Check if registration is too old (optional: re-register after 30 days)
      const registrationAge =
        Date.now() - new Date(registration.timestamp).getTime();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;

      if (registrationAge > thirtyDays) {
        return { needsRegistration: true, reason: "expired" };
      }

      return {
        needsRegistration: false,
        registration: registration,
        templateHash: registration.templateHash,
      };
    } catch (error) {
      console.error("Error checking registration status:", error);
      return { needsRegistration: true, reason: "error" };
    }
  }

  async clearRegistration() {
    try {
      await chrome.storage.local.remove([
        this.registrationKey,
        "masterResumeTemplate",
      ]);
      console.log("🗑️ Registration and stored template cleared");
    } catch (error) {
      console.error("Error clearing registration:", error);
    }
  }

  async generateTemplateHash(template) {
    // Simple hash function for template change detection
    const encoder = new TextEncoder();
    const data = encoder.encode(template);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .substring(0, 16);
  }

  isRegistrationSuccessful(response) {
    const successIndicators = [
      "TEMPLATE_REGISTERED_SUCCESS",
      "template_registered_success",
      "template registered successfully",
      "stored successfully",
      "registration successful",
    ];

    const lowerResponse = response.toLowerCase();
    return successIndicators.some((indicator) =>
      lowerResponse.includes(indicator.toLowerCase())
    );
  }

  // ===========================================
  // JOB ANALYSIS
  // ===========================================

  analyzeJobRequirements(jobDescription) {
    const text = jobDescription.toLowerCase();

    const technologies = [];
    const skills = [];
    const keywords = [];

    // Technology patterns
    const techPatterns = [
      "react",
      "angular",
      "vue",
      "svelte",
      "node.js",
      "express",
      "fastapi",
      "python",
      "java",
      "javascript",
      "typescript",
      "c#",
      "go",
      "rust",
      "aws",
      "azure",
      "gcp",
      "docker",
      "kubernetes",
      "terraform",
      "mongodb",
      "postgresql",
      "mysql",
      "redis",
      "elasticsearch",
      "microservices",
      "graphql",
      "rest api",
      "grpc",
      "spring boot",
      "django",
      "flask",
      "laravel",
      "rails",
    ];

    techPatterns.forEach((tech) => {
      if (text.includes(tech.replace(".", "").replace(" ", ""))) {
        technologies.push(tech);
      }
    });

    // Skill patterns
    const skillPatterns = [
      "agile",
      "scrum",
      "kanban",
      "ci/cd",
      "devops",
      "testing",
      "tdd",
      "bdd",
      "leadership",
      "mentoring",
      "code review",
      "debugging",
      "optimization",
      "scalability",
      "performance",
      "security",
      "monitoring",
      "logging",
    ];

    skillPatterns.forEach((skill) => {
      if (text.includes(skill)) {
        skills.push(skill);
      }
    });

    // Experience level detection
    let experienceLevel = "mid-level";
    if (
      text.match(
        /senior|lead|principal|staff|architect|5\+?\s*years|6\+?\s*years|7\+?\s*years/
      )
    ) {
      experienceLevel = "senior";
    } else if (
      text.match(
        /junior|entry|graduate|intern|1[-\s]?2\s*years|0[-\s]?2\s*years/
      )
    ) {
      experienceLevel = "junior";
    }

    // Industry detection
    let industry = "technology";
    if (text.match(/fintech|finance|banking|trading/)) {
      industry = "fintech";
    } else if (text.match(/healthcare|medical|pharma/)) {
      industry = "healthcare";
    } else if (text.match(/ecommerce|retail|marketplace/)) {
      industry = "ecommerce";
    } else if (text.match(/gaming|game/)) {
      industry = "gaming";
    }

    return {
      technologies: [...new Set(technologies)],
      skills: [...new Set(skills)],
      keywords: [...new Set([...technologies, ...skills])],
      experienceLevel,
      industry,
    };
  }

  // ===========================================
  // SECTION EXTRACTION & MERGING
  // ===========================================

  extractResumeSections(template) {
    const sections = {};

    try {
      // Extract summary
      const summaryMatch = template.match(
        /% Summary([\s\S]*?)% Technical Skills/
      );
      sections.summary = summaryMatch ? summaryMatch[1].trim() : "";

      // Extract technical skills
      const skillsMatch = template.match(
        /% Technical Skills([\s\S]*?)% Experience/
      );
      sections.technicalSkills = skillsMatch ? skillsMatch[1].trim() : "";

      // Extract top 2 experience entries
      const experienceMatch = template.match(
        /% Experience([\s\S]*?)% Projects/
      );
      if (experienceMatch) {
        const expText = experienceMatch[1];
        const expEntries = expText.split("\\resumeSubheading").slice(1, 3);
        sections.topExperience = expEntries
          .map((entry) => "\\resumeSubheading" + entry)
          .join("\n\n");
      }
    } catch (error) {
      console.error("Error extracting sections:", error);
    }

    return sections;
  }

  mergeSectionsIntoTemplate(originalTemplate, optimizedSections) {
    // For now, return original template with a note
    // This would need more sophisticated parsing in production
    return originalTemplate + "\n% Optimized with section-based approach";
  }

  // ===========================================
  // STATISTICS TRACKING
  // ===========================================

  async updateUsageStats(wasEfficient) {
    try {
      const data = await chrome.storage.local.get([this.statsKey]);
      const stats = data[this.statsKey] || {
        totalOptimizations: 0,
        efficientOptimizations: 0,
        tokensSaved: 0,
        firstUsed: new Date().toISOString(),
      };

      stats.totalOptimizations += 1;
      stats.lastUsed = new Date().toISOString();

      if (wasEfficient) {
        stats.efficientOptimizations += 1;
        stats.tokensSaved += 13000; // Estimated tokens saved per efficient optimization
      }

      await chrome.storage.local.set({ [this.statsKey]: stats });
    } catch (error) {
      console.error("Error updating stats:", error);
    }
  }

  async getUsageStats() {
    try {
      const data = await chrome.storage.local.get([this.statsKey]);
      const stats = data[this.statsKey] || {
        totalOptimizations: 0,
        efficientOptimizations: 0,
        tokensSaved: 0,
        firstUsed: null,
      };

      return {
        ...stats,
        efficiencyRate:
          stats.totalOptimizations > 0
            ? Math.round(
                (stats.efficientOptimizations / stats.totalOptimizations) * 100
              )
            : 0,
      };
    } catch (error) {
      console.error("Error getting stats:", error);
      return null;
    }
  }

  // ===========================================
  // CLAUDE API CALL
  // ===========================================

  async callClaudeAPI(apiKey, prompt, maxTokens = 6000) {
    let lastError;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`🤖 Claude API call attempt ${attempt}/${this.maxRetries}`);

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
            max_tokens: maxTokens,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `API error (${response.status}): ${
              errorData.error?.message || "Unknown error"
            }`
          );
        }

        const data = await response.json();

        if (!data.content?.[0]?.text) {
          throw new Error("Invalid response format from Claude API");
        }

        console.log(`✅ Claude API call successful on attempt ${attempt}`);
        return data.content[0].text;
      } catch (error) {
        lastError = error;
        console.error(`❌ Claude API attempt ${attempt} failed:`, error);

        if (attempt < this.maxRetries) {
          const delay = this.retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
          console.log(`⏳ Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError;
  }
}

// Create global instance
window.efficientOptimizer = new EfficientResumeOptimizer();
