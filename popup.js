// popup.js - Main popup logic
class ResumeAI {
  constructor() {
    this.masterResume = `\\documentclass[letterpaper,11pt]{article}

\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{ragged2e}
\\usepackage{xcolor}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.0in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Define a light gray color for the section line
\\definecolor{lightgray}{gray}{0.8}

% Sections formatting with a subtle line
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\vspace{1pt}\\color{lightgray}\\hrule\\vspace{3pt}]

% Ensure that generated PDF is machine readable/ATS parsable
\\pdfgentounicode=1

% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{2pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textbf{\\small #2}\\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={$\\bullet$}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

% HEADING
\\begin{center}
    \\textbf{\\Huge \\scshape Prudhvi Charan P} \\\\ \\vspace{1pt}
    816-762-8317 $|$ bunnycharanprudhvi@gmail.com $|$ linkedin.com/in/prudhvi-charan/ $|$ github.com/Prudhvicharan
\\end{center}

% Summary
\\section{Summary}
\\begin{justify}
    Innovative \\textbf{Full Stack AI Engineer} with over 3 years of experience architecting scalable enterprise applications and AI-powered solutions. Specialized in developing responsive, interactive web interfaces using \\textbf{React}, \\textbf{Angular}, and \\textbf{TypeScript}, while leveraging cutting-edge \\textbf{AI tools} and \\textbf{cloud services}. Successfully led cross-functional development teams in delivering high-performance applications that reduced technical debt by \\textbf{40\\%} and improved evaluation processes by \\textbf{40\\%}. Demonstrated expertise in integrating \\textbf{AWS services} and implementing secure authentication systems that enhanced user workflow efficiency by \\textbf{35\\%}. Proficient in UI/UX design with proven ability to create wireframes and prototypes that accelerate approval processes by \\textbf{30\\%}. Committed to engineering modular, reusable components that optimize code efficiency while maintaining a user-centric focus, resulting in applications that scale seamlessly across mobile, tablet, and desktop environments.
\\end{justify}

% Technical Skills
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0in, label={}]
\\vspace{-2pt}
    \\small{\\item
        \\textbf{Languages:} Python, JavaScript(ES6+), TypeScript, Java, C\\#, SQL, HTML, CSS, Sass/SCSS\\\\
        \\textbf{Developer Tools:} npm, Webpack, VS Code, Jira, Postman, CAST, PuTTY, SonarLint, SonarQube, Git, GitLab, CursorAI, Balsamiq, Miro\\\\
        \\textbf{Technologies/Frameworks:} Angular, Angular Material, AngularJS, RxJS, Express.js, Bootstrap, jQuery, React, React Router, Tailwind CSS, Vue.js, Microservices, GraphQL, Spring Boot\\\\
        \\textbf{Database Technologies:} MySQL, PostgreSQL, MongoDB\\\\
        \\textbf{APIs \\& Integration:} RESTful APIs, Google OAuth, Gmail API, Resume Parser API\\\\
        \\textbf{Cloud \\& Authentication:} AWS Cognito, AWS Services\\\\
        \\textbf{State Management:} React Context, localStorage\\\\
        \\textbf{Testing:} Jasmine, Karma, Jest, Test-driven development for Angular and React applications\\\\
        \\textbf{Performance:} Data caching, Lazy loading\\\\
        \\textbf{UX/UI:} Responsive layouts, Interactive dashboards, Data visualization, Wireframing, Prototyping\\\\
        \\textbf{Agile Methodologies:} Scrum, Agile Project Management\\\\
        \\textbf{AI Tools:} ChatGPT, Copilot, ClaudeAI, Gemini AI, GammaAI, CursorAI\\\\
        \\textbf{Other Expertise:} Software Development Life Cycle (SDLC), Design Patterns, Mobile Software Development, IoT, Product Management, CRM Integration\\\\
        \\textbf{Protocols and Formats:} JSON, Requests, sockets, multithreading
    }
\\end{itemize}

% Experience
\\section{Experience}
    \\resumeSubHeadingListStart
    \\resumeSubheading
    {\\textbf{Full-Stack AI Engineer}}{03/2025 - Present}
    {Akdene Technologies}{Morrisville, Charlotte}
    \\resumeItemListStart
    \\resumeItem{Designed and developed responsive UI components for \\textbf{5+ core screens} using \\textbf{React} and \\textbf{TypeScript}, ensuring cross-device compatibility and optimal user experience.}
    \\resumeItem{Implemented \\textbf{AWS Cognito authentication system}, establishing secure user management workflow that reduced login issues by \\textbf{35\\%}.}
    \\resumeItem{Developed and integrated \\textbf{chatbot functionality} with \\textbf{Resume Parser API}, enabling automated resume scoring and reducing candidate evaluation time by \\textbf{40\\%}.}
    \\resumeItem{Refactored legacy codebase, improving maintainability and reducing technical debt by \\textbf{40\\%}, resulting in enhanced development velocity.}
    \\resumeItem{Created comprehensive wireframes and interactive prototypes for \\textbf{6+ key application screens} using \\textbf{Balsamiq} and \\textbf{Miro}, accelerating design approval process by \\textbf{30\\%}.}
    \\resumeItem{Engineered modular, reusable components that reduced code redundancy by \\textbf{50\\%} and improved application scalability.}
    \\resumeItem{Conducted research across \\textbf{5+ AI platforms} (ChatGPT, Copilot, ClaudeAI, Gemini, GammaAI), identifying optimal solution for AI-driven presentation generation.}
    \\resumeItem{Led CRM integration initiative, improving client engagement tracking by \\textbf{35\\%} through automated workflow systems.}
    \\resumeItem{Facilitated knowledge-sharing sessions on advanced development tools like \\textbf{CursorAI}, increasing team productivity by \\textbf{25\\%}.}
    \\resumeItem{Collaborated with cross-functional teams including UI/UX, management, and API developers to ensure seamless project delivery within tight deadlines.}
    \\resumeItem{Decomposed complex application requirements into \\textbf{modular components}, ensuring a scalable and maintainable architecture across both projects.}
    \\resumeItemListEnd
    
    \\resumeSubheading
    {\\textbf{Software Engineer - Full Stack Developer}}{06/2021 - 12/2022}
    {Vitrana}{Bangalore, India}
    \\resumeItemListStart
    \\resumeItem{Led \\textbf{microfrontend interactions}, improving system performance by \\textbf{20\\%} across 5 enterprise applications.}
    \\resumeItem{Engineered UI and functionality for \\textbf{WHO Dictionaries}, reducing data entry time by \\textbf{30\\%} for 100+ users.}
    \\resumeItem{Developed a customizable \\textbf{Form Configuration screen} used across 8 projects.}
    \\resumeItem{Resolved critical issues affecting application performance, ensuring \\textbf{high availability} and maintainability of services.}
    \\resumeItem{Architected \\textbf{HiLIT}, a healthcare analytics platform with \\textbf{Spring Boot backend} and \\textbf{Angular frontend}, reducing adverse event management time by \\textbf{40\\%}.}
    \\resumeItem{Led the development of robust unit and integration tests using \\textbf{Jasmine} and \\textbf{Karma}, achieving \\textbf{96\\% code coverage} and reducing post-deployment bugs by \\textbf{25\\%}.}
    \\resumeItem{Developed scalable \\textbf{REST APIs} using Java, incorporating pagination, sorting, and filtering, improving search efficiency in distributed systems.}
    \\resumeItem{Enhanced performance and scalability of applications by implementing \\textbf{microservices architecture} and introducing \\textbf{logging/monitoring tools}.}
    \\resumeItem{Enhanced microservices logging and monitoring using \\textbf{SLF4J}, \\textbf{Log4J}, and \\textbf{Grafana}, reducing issue resolution time.}
    \\resumeItem{Managed \\textbf{CI/CD pipelines} using \\textbf{Jenkins} and \\textbf{Docker}, improving deployment efficiency by \\textbf{30\\%} and ensuring zero downtime.}
    \\resumeItem{Implemented \\textbf{AWS solutions} for scalable back-end services using \\textbf{EC2} and \\textbf{S3}, reducing infrastructure costs and increasing system availability.}
    \\resumeItem{Implemented optimizations using \\textbf{CAST tools}, increasing project efficiency by \\textbf{80\\%}.}
    \\resumeItem{Resolved \\textbf{75+ bugs} in 3 months, improving customer satisfaction and reducing issue turnaround time.}
    \\resumeItem{Followed \\textbf{Agile methodologies}, participated in daily scrums, sprint planning, and utilized \\textbf{Jira} to track tasks and resolve issues.}
    \\resumeItem{Designed and implemented \\textbf{scalable web services} to support high-traffic enterprise applications, enhancing system resilience.}
    \\resumeItem{Developed \\textbf{component libraries} using Angular, optimizing UI consistency and reducing development time by \\textbf{25\\%}.}
    \\resumeItem{Enhanced API security and compliance measures, ensuring adherence to industry standards and reducing vulnerabilities by \\textbf{35\\%}.}
    \\resumeItem{Developed an \\textbf{end-to-end} tracking system integrating \\textbf{cloud computing} services for real-time data synchronization.}
    \\resumeItemListEnd
    
    \\resumeSubheading
    {\\textbf{Associate Software Engineer - Frontend Developer}}{12/2019 - 05/2021}
    {Vitrana}{Bangalore, India}
    \\resumeItemListStart
    \\resumeItem{Built the \\textbf{HiLIT home screen} using \\textbf{Angular} and \\textbf{TypeScript}, integrating \\textbf{50+ screens} to streamline user navigation and improve maintainability.}
    \\resumeItem{\\textbf{Enhanced web development efficiency} by leveraging \\textbf{ES6 features} for cleaner and more maintainable code in \\textbf{Angular applications}.}
    \\resumeItem{\\textbf{Implemented ES6 features} such as \\textbf{arrow functions}, \\textbf{promises}, and \\textbf{async/await} across \\textbf{Angular} and \\textbf{Node.js} projects to improve \\textbf{readability} and \\textbf{efficiency}.}
    \\resumeItem{Designed and developed scalable and modular front-end web development solutions using \\textbf{Angular} and \\textbf{TypeScript}, enhancing \\textbf{code reusability} and \\textbf{performance}.}
    \\resumeItem{Implemented \\textbf{microfrontends} across \\textbf{7 projects}, enhancing code modularity and reuse.}
    \\resumeItem{Redesigned the \\textbf{MedDRA Dictionary}, managing over \\textbf{100,000 terms}, improving its usability for international healthcare users.}
    \\resumeItem{Built and deployed \\textbf{micro-applications} using \\textbf{Angular}, enabling independent UI deployment, improving code reuse, and boosting user engagement by \\textbf{40\\%}.}
    \\resumeItem{Converted monolithic \\textbf{Spring Boot} apps into \\textbf{microservices}, improving scalability and maintainability.}
    \\resumeItem{Developed scalable backend services using \\textbf{Spring Boot} for seamless front-end and back-end communication.}
    \\resumeItem{Streamlined \\textbf{CI/CD workflows} with \\textbf{GitLab}, raising test coverage by \\textbf{20\\%} using \\textbf{JUnit/Mockito} and \\textbf{Zephyr}.}
    \\resumeItem{Reduced code defects by \\textbf{35\\%} through reviews, debugging, and enforcing best practices with \\textbf{SonarQube} and \\textbf{SonarLint}.}
    \\resumeItem{Optimized \\textbf{full-stack development life cycle} workflows, streamlining processes and reducing deployment time by \\textbf{30\\%}.}
    \\resumeItem{Developed robust \\textbf{algorithm design} strategies for data processing, enhancing computational efficiency.}
    \\resumeItem{Led \\textbf{process improvement} initiatives, increasing code reusability and maintainability across multiple teams.}
    \\resumeItemListEnd
    \\resumeSubHeadingListEnd
  
% Projects

\\section{Projects}
    \\resumeSubHeadingListStart
        \\resumeProjectHeading
            {\\textbf{Portfolio} $|$ Angular, HTML5, SCSS, TypeScript}{\\href{https://prudhvicharan.github.io/portfolio}{prudhvicharan.github.io/portfolio}}
            \\resumeItemListStart
            \\resumeItem{Built a personal portfolio website using \\textbf{Angular}, HTML5, SCSS, and \\textbf{TypeScript}, showcasing projects and skills to potential employers.}
            \\resumeItem{Developed a fully responsive design, ensuring an optimal viewing experience across devices, improving accessibility.}
            \\resumeItem{Implemented a contact form using EmailJS, providing seamless communication for inquiries and collaborations.}
        \\resumeItemListEnd
    
        \\resumeProjectHeading
            {\\textbf{Deadline Tracker} $|$ Angular, RxJS, Node.js, MongoDB}{}
            \\resumeItemListStart
            \\resumeItem{Developed a real-time data tracking web app using \\textbf{Angular} and \\textbf{RxJS}, improving data responsiveness for 500+ users.}
            \\resumeItem{Used \\textbf{AG-Grid} and \\textbf{Highcharts} to display large datasets and advanced visualizations.}
            \\resumeItem{Implemented RESTful APIs with \\textbf{Node.js}, integrated with \\textbf{MongoDB}, and used JWT-based authentication for security.}
        \\resumeItemListEnd
    
        \\resumeProjectHeading
            {\\textbf{Career Axis} $|$ React, Tailwind CSS, JavaScript, Google OAuth, Gmail API}{}
            \\resumeItemListStart
            \\resumeItem{Built a centralized job application tracking platform using \\textbf{React} and \\textbf{Gmail API}, reducing tracking time by 65\\%.}
            \\resumeItem{Implemented responsive UI with \\textbf{Tailwind CSS} and glassmorphism components, boosting user engagement by 40\\%.}
            \\resumeItem{Integrated \\textbf{Google OAuth} for secure authentication and automated email classification with 98\\% accuracy.}
            \\resumeItem{Created interactive timeline and calendar visualizations, increasing interview preparation efficiency by 25\\%.}
            \\resumeItem{Optimized state management and implemented local caching, reducing load times by 75\\% and enabling offline functionality.}
        \\resumeItemListEnd
    \\resumeSubHeadingListEnd

% Education
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {University of Missouri-Kansas City}{01/2023 - 05/2024}
      {Master of Science in Computer Science}{Kansas City, Missouri}
    \\resumeSubheading
      {Vellore Institute of Technology}{06/2016 - 06/2021}
      {Bachelor of Technology in Software Engineering}{Vellore, Tamil Nadu, India}
  \\resumeSubHeadingListEnd

\\end{document}`;

    this.detectedJobDescription = "";
    this.generatedResume = "";
    this.init();
  }

  init() {
    this.loadSettings();
    this.bindEvents();
    this.checkJobPage();
  }

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

  async loadSettings() {
    const settings = await chrome.storage.sync.get([
      "openaiApiKey",
      "outputFormat",
    ]);
    if (settings.openaiApiKey) {
      document.getElementById("apiKey").value = settings.openaiApiKey;
    }
    if (settings.outputFormat) {
      document.getElementById("outputFormat").value = settings.outputFormat;
    }
  }

  async saveSettings() {
    const apiKey = document.getElementById("apiKey").value;
    const outputFormat = document.getElementById("outputFormat").value;

    await chrome.storage.sync.set({ openaiApiKey: apiKey, outputFormat });
    this.showStatus("Settings saved successfully!", "success", "resumeStatus");
  }

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
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      const url = tab.url;

      // Check if we're on a job board
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
      ];

      const isJobSite = jobSites.some((site) => url.includes(site));

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

  async detectJobDescription() {
    this.showLoading(true);
    this.showStatus("Analyzing page content...", "info", "jobStatus");

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      console.log("🔍 Detecting job description on:", tab.url);

      // Inject content script and extract job description
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          console.log("📄 Extracting job description...");

          // Create a temporary detector instance
          class TempJobDetector {
            extractJobDescription() {
              return this.intelligentJobExtraction();
            }

            intelligentJobExtraction() {
              console.log("🔍 Starting intelligent job extraction...");

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
                "web developer",
                "software engineer",
                "developer",
                "engineer",
              ];

              const indicatorCount = jobIndicators.filter((indicator) =>
                pageText.includes(indicator)
              ).length;

              console.log(`📊 Found ${indicatorCount} job indicators`);

              // Be more lenient - if we find ANY job indicators, proceed
              if (indicatorCount < 1) {
                console.log("❌ No job indicators found");
                return "No job-related content detected on this page.";
              }

              let bestContent = "";
              let bestScore = 0;

              // Strategy 1: Try known selectors first
              const selectors = [
                // Universal job selectors
                '[class*="job"]',
                '[class*="position"]',
                '[class*="role"]',
                '[class*="description"]',
                '[class*="content"]',
                '[class*="details"]',
                '[id*="job"]',
                '[id*="description"]',
                '[id*="content"]',

                // Common patterns
                ".job-summary",
                ".job-description",
                ".position-summary",
                ".role-description",
                ".posting-description",
                ".content",
                "main",
                "article",
                "section",
              ];

              // Try each selector
              for (const selector of selectors) {
                try {
                  const elements = document.querySelectorAll(selector);
                  for (const element of elements) {
                    const content = this.extractCleanText(element);
                    const score = this.scoreJobContent(content);

                    if (score > bestScore && content.length > 100) {
                      bestContent = content;
                      bestScore = score;
                      console.log(
                        `✅ Found content with selector ${selector}, score: ${score}`
                      );
                    }
                  }
                } catch (e) {
                  continue;
                }
              }

              // Strategy 2: If nothing good found, try full page
              if (bestScore < 2) {
                console.log("🌐 Using full page content...");
                const fullContent = this.extractCleanText(document.body);

                // Extract job-related sections from full content
                const jobContent = this.extractJobSectionsFromText(fullContent);

                if (jobContent && jobContent.length > bestContent.length) {
                  bestContent = jobContent;
                  bestScore = 10; // Give it a good score
                  console.log("✅ Using extracted job sections from full page");
                }
              }

              // Strategy 3: Fallback - return any substantial content with job keywords
              if (!bestContent || bestContent.length < 200) {
                console.log(
                  "🆘 Fallback strategy - looking for any job content..."
                );
                const allText = document.body.textContent;

                // Find paragraphs or sections that mention job-related terms
                const paragraphs = allText.split("\n").filter((p) => {
                  const lower = p.toLowerCase();
                  return (
                    p.length > 50 &&
                    (lower.includes("responsibilities") ||
                      lower.includes("requirements") ||
                      lower.includes("qualifications") ||
                      lower.includes("experience") ||
                      lower.includes("skills") ||
                      lower.includes("developer") ||
                      lower.includes("engineer") ||
                      lower.includes("job summary"))
                  );
                });

                if (paragraphs.length > 0) {
                  bestContent = paragraphs.join("\n");
                  console.log("✅ Found job content using fallback strategy");
                }
              }

              console.log(
                `🎯 Final extraction - Score: ${bestScore}, Length: ${bestContent.length}`
              );

              if (!bestContent || bestContent.length < 50) {
                return "Could not extract meaningful job description from this page. The page may not contain a detailed job posting.";
              }

              return bestContent;
            }

            extractCleanText(element) {
              if (!element) return "";

              const clone = element.cloneNode(true);

              // Remove unwanted elements
              const unwanted = [
                "script",
                "style",
                "nav",
                "header",
                "footer",
                "aside",
              ];
              unwanted.forEach((tag) => {
                const elements = clone.querySelectorAll(tag);
                elements.forEach((el) => el.remove());
              });

              let text = clone.textContent || clone.innerText || "";
              return text.replace(/\s+/g, " ").trim();
            }

            scoreJobContent(content) {
              if (!content || content.length < 50) return 0;

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
                "job summary",
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
                "developer",
                "engineer",
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

            extractJobSectionsFromText(fullText) {
              const lines = fullText
                .split("\n")
                .filter((line) => line.trim().length > 10);
              let jobLines = [];

              for (const line of lines) {
                const lowerLine = line.toLowerCase();

                // Check if line contains job-related content
                if (
                  lowerLine.includes("responsibilities") ||
                  lowerLine.includes("requirements") ||
                  lowerLine.includes("qualifications") ||
                  lowerLine.includes("job summary") ||
                  lowerLine.includes("about the role") ||
                  lowerLine.includes("experience") ||
                  lowerLine.includes("skills") ||
                  lowerLine.includes("developer") ||
                  lowerLine.includes("engineer")
                ) {
                  jobLines.push(line);
                }
              }

              return jobLines.join("\n");
            }
          }

          const detector = new TempJobDetector();
          return detector.extractJobDescription();
        },
      });

      if (results && results[0] && results[0].result) {
        const description = results[0].result;

        if (
          description.includes("Could not extract") ||
          description.includes("No job-related content")
        ) {
          this.showStatus(description, "error", "jobStatus");
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
        }
      } else {
        this.showStatus(
          "Could not access page content. Please try refreshing the page.",
          "error",
          "jobStatus"
        );
      }
    } catch (error) {
      console.error("Error detecting job description:", error);
      this.showStatus(
        "Error analyzing page. Please try again or refresh the page.",
        "error",
        "jobStatus"
      );
    } finally {
      this.showLoading(false);
    }
  }

  extractJobDescription() {
    // AI-powered universal job description extraction
    return this.intelligentJobExtraction();
  }

  intelligentJobExtraction() {
    console.log("🔍 Starting intelligent job extraction...");

    // Step 1: Get all text content from the page
    const pageText = document.body.textContent.toLowerCase();

    // Step 2: Check if this page contains job-related content
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
      "technical skills",
      "soft skills",
      "work experience",
      "career opportunity",
    ];

    const indicatorCount = jobIndicators.filter((indicator) =>
      pageText.includes(indicator)
    ).length;

    console.log(`📊 Found ${indicatorCount} job indicators on page`);

    if (indicatorCount < 3) {
      console.log("❌ Not enough job indicators found");
      return "";
    }

    // Step 3: Extract job content using multiple strategies
    let bestContent = "";
    let bestScore = 0;

    // Strategy 1: Known job description selectors
    const jobSelectors = [
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

      // Workday
      '[data-automation-id="jobPostingDescription"]',
      ".css-1t92pv",

      // Lever
      ".section-wrapper .section",
      ".posting-requirements",
      ".posting-description",

      // Greenhouse
      "#job_description",
      ".job-post-description",

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
      ".job-posting",
      ".job-ad",
      ".vacancy-description",
    ];

    for (const selector of jobSelectors) {
      try {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          const content = this.extractCleanText(element);
          const score = this.scoreJobContent(content);

          if (score > bestScore && content.length > 200) {
            bestContent = content;
            bestScore = score;
            console.log(
              `✅ Found content with selector ${selector}, score: ${score}`
            );
          }
        }
      } catch (e) {
        console.log(`⚠️ Error with selector ${selector}:`, e);
      }
    }

    // Strategy 2: Intelligent content analysis
    if (bestScore < 5) {
      console.log("🧠 Using intelligent content analysis...");
      const contentSections = this.findJobContentSections();

      for (const section of contentSections) {
        const content = this.extractCleanText(section);
        const score = this.scoreJobContent(content);

        if (score > bestScore) {
          bestContent = content;
          bestScore = score;
          console.log(
            `✅ Found content via intelligent analysis, score: ${score}`
          );
        }
      }
    }

    // Strategy 3: Full page analysis as fallback
    if (bestScore < 3) {
      console.log("🌐 Analyzing full page content...");
      const fullPageContent = this.extractCleanText(document.body);
      const jobContent = this.extractJobSectionsFromText(fullPageContent);

      if (jobContent && jobContent.length > 300) {
        const score = this.scoreJobContent(jobContent);
        if (score > bestScore) {
          bestContent = jobContent;
          bestScore = score;
          console.log(`✅ Extracted from full page, score: ${score}`);
        }
      }
    }

    console.log(
      `🎯 Final extraction score: ${bestScore}, content length: ${bestContent.length}`
    );
    return bestContent;
  }

  extractCleanText(element) {
    if (!element) return "";

    // Clone element to avoid modifying original
    const clone = element.cloneNode(true);

    // Remove unwanted elements
    const unwantedSelectors = [
      "script",
      "style",
      "nav",
      "header",
      "footer",
      "aside",
      ".advertisement",
      ".ad",
      ".sidebar",
      ".navigation",
      '[class*="share"]',
      '[class*="social"]',
      '[class*="comment"]',
    ];

    unwantedSelectors.forEach((selector) => {
      const elements = clone.querySelectorAll(selector);
      elements.forEach((el) => el.remove());
    });

    let text = clone.textContent || clone.innerText || "";

    // Clean up text
    text = text
      .replace(/\s+/g, " ") // Normalize whitespace
      .replace(/\n\s*\n/g, "\n") // Remove empty lines
      .trim();

    return text;
  }

  scoreJobContent(content) {
    if (!content || content.length < 100) return 0;

    const text = content.toLowerCase();
    let score = 0;

    // High-value job keywords
    const highValueKeywords = [
      "responsibilities",
      "requirements",
      "qualifications",
      "experience required",
      "skills needed",
      "job duties",
      "role responsibilities",
      "key requirements",
      "minimum qualifications",
      "preferred qualifications",
      "essential skills",
    ];

    const mediumValueKeywords = [
      "about the role",
      "position",
      "candidate",
      "team",
      "company",
      "work",
      "development",
      "experience",
      "skills",
      "knowledge",
      "education",
      "degree",
      "years",
      "technology",
      "software",
    ];

    const lowValueKeywords = [
      "apply",
      "application",
      "job",
      "career",
      "opportunity",
      "hiring",
      "recruitment",
      "interview",
      "salary",
      "benefits",
    ];

    // Score based on keyword presence
    highValueKeywords.forEach((keyword) => {
      if (text.includes(keyword)) score += 3;
    });

    mediumValueKeywords.forEach((keyword) => {
      if (text.includes(keyword)) score += 1;
    });

    lowValueKeywords.forEach((keyword) => {
      if (text.includes(keyword)) score += 0.5;
    });

    // Bonus for structured content
    if (text.includes("•") || text.includes("*") || text.includes("-"))
      score += 2;
    if (text.match(/\d+\+?\s*years?/)) score += 2;
    if (
      text.includes("bachelor") ||
      text.includes("master") ||
      text.includes("degree")
    )
      score += 2;

    // Penalty for very short or very long content
    if (content.length < 500) score *= 0.7;
    if (content.length > 10000) score *= 0.8;

    return score;
  }

  findJobContentSections() {
    const sections = [];
    const allElements = document.querySelectorAll(
      "div, section, article, main, p"
    );

    for (const element of allElements) {
      const text = element.textContent.trim();

      // Skip if too short or too long
      if (text.length < 300 || text.length > 8000) continue;

      // Check if this element contains job-related content
      const jobWords = this.countJobWords(text);

      if (jobWords >= 5) {
        sections.push(element);
      }
    }

    // Sort by job content score
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
      "team",
      "work",
      "development",
      "knowledge",
      "education",
      "degree",
      "years",
      "technology",
      "software",
      "tools",
      "frameworks",
    ];

    const lowerText = text.toLowerCase();
    return jobWords.filter((word) => lowerText.includes(word)).length;
  }

  extractJobSectionsFromText(fullText) {
    const lines = fullText.split("\n").filter((line) => line.trim().length > 0);
    let jobContent = "";
    let isInJobSection = false;
    let jobSectionLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const lowerLine = line.toLowerCase();

      // Check if this line starts a job section
      if (
        lowerLine.includes("responsibilities") ||
        lowerLine.includes("requirements") ||
        lowerLine.includes("qualifications") ||
        lowerLine.includes("job description") ||
        lowerLine.includes("about the role")
      ) {
        isInJobSection = true;
        jobSectionLines = [line];
        continue;
      }

      if (isInJobSection) {
        // Add lines that seem to be part of job description
        if (
          this.countJobWords(line) > 0 ||
          line.startsWith("•") ||
          line.startsWith("-") ||
          line.startsWith("*") ||
          line.match(/^\d+\./)
        ) {
          jobSectionLines.push(line);
        } else if (jobSectionLines.length > 10) {
          // We have enough content, stop here
          break;
        }
      }
    }

    return jobSectionLines.join("\n");
  }

  showJobDescription(description) {
    const detectedDiv = document.getElementById("detectedJob");
    const preview =
      description.length > 300
        ? description.substring(0, 300) + "..."
        : description;
    detectedDiv.innerHTML = `<strong>Detected:</strong><br>${preview}`;
    detectedDiv.style.display = "block";
  }

  async generateTailoredResume() {
    if (!this.detectedJobDescription) {
      this.showStatus(
        "Please detect a job description first.",
        "error",
        "resumeStatus"
      );
      return;
    }

    const settings = await chrome.storage.sync.get(["openaiApiKey"]);
    if (!settings.openaiApiKey) {
      this.showStatus(
        "Please add your OpenAI API key in settings.",
        "error",
        "resumeStatus"
      );
      return;
    }

    this.showLoading(true);
    this.showStatus("Tailoring resume with AI...", "info", "resumeStatus");

    try {
      const tailoredResume = await this.callOpenAIAPI(settings.openaiApiKey);

      if (tailoredResume) {
        this.generatedResume = tailoredResume;
        this.showStatus(
          "Resume tailored successfully!",
          "success",
          "resumeStatus"
        );
        document.getElementById("downloadLatex").style.display = "block";
        document.getElementById("copyToClipboard").style.display = "block";
      } else {
        this.showStatus(
          "Failed to generate resume. Please try again.",
          "error",
          "resumeStatus"
        );
      }
    } catch (error) {
      console.error("Error generating resume:", error);
      this.showStatus(
        "Error generating resume. Check your API key and try again.",
        "error",
        "resumeStatus"
      );
    } finally {
      this.showLoading(false);
    }
  }

  async callOpenAIAPI(apiKey) {
    const prompt = `I am providing my **resume content** and a **specific job description** for a role I am targeting.
Your task is to:
1. **Thoroughly analyze** the job description to extract all relevant keywords, required technologies, responsibilities, and qualifications.
2. **Compare** my resume content against the job description and:
   * Identify **gaps** in skills, keywords, or responsibilities.
   * Spot any **mismatches** in tech stack or phrasing that may hinder alignment.
3. **Modify my resume** so that it:
   * Incorporates all relevant keywords from the job description in a **natural and believable way**
   * Emphasizes my **matching experience, transferable skills, and relevant projects**
   * **Deletes, rewrites, or rephrases** content that's not aligned with the target role or stack
   * **Only replaces or alters technologies or responsibilities when absolutely necessary**, and **only when the experience is realistically transferable**
4. Ensure the revised resume is:
   * **ATS-friendly** with clean formatting, consistent section headers, and bullet-point achievements
   * Optimized for both **AI screening systems and human recruiters**
   * Written at the appropriate level and tone for the job

⚠️ You are allowed to make structural or content changes — including modifying technologies or reframing roles — **only when needed to align with the job description**, and as long as all changes are believable.
✅ Output the **updated LaTeX resume code**, ready for direct submission for this job.

**My Resume:**
${this.masterResume}

**Target Job Description:**
${this.detectedJobDescription}

Please provide only the updated LaTeX code for the tailored resume.`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o", // Using GPT-4o for best results
            messages: [
              {
                role: "system",
                content:
                  "You are an expert resume optimization assistant. You specialize in tailoring resumes to specific job descriptions while maintaining authenticity and ATS compatibility. Always output clean, professional LaTeX code.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 4000,
            temperature: 0.3, // Lower temperature for more consistent, professional output
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `OpenAI API error: ${response.status} - ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      const data = await response.json();

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("Invalid response format from OpenAI API");
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
    }
  }

  downloadLatex() {
    if (!this.generatedResume) {
      this.showStatus("No resume to download.", "error", "resumeStatus");
      return;
    }

    const blob = new Blob([this.generatedResume], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tailored_resume.tex";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showStatus("LaTeX file downloaded!", "success", "resumeStatus");
  }

  async copyToClipboard() {
    if (!this.generatedResume) {
      this.showStatus("No resume to copy.", "error", "resumeStatus");
      return;
    }

    try {
      await navigator.clipboard.writeText(this.generatedResume);
      this.showStatus("Resume copied to clipboard!", "success", "resumeStatus");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      this.showStatus("Failed to copy to clipboard.", "error", "resumeStatus");
    }
  }

  showStatus(message, type, elementId) {
    const statusEl = document.getElementById(elementId);
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
    statusEl.style.display = "block";

    if (type === "success") {
      setTimeout(() => {
        statusEl.style.display = "none";
      }, 3000);
    }
  }

  showLoading(show) {
    const loadingDiv = document.getElementById("loadingDiv");
    const container = document.querySelector(".container");

    if (show) {
      loadingDiv.style.display = "block";
      container.style.opacity = "0.5";
    } else {
      loadingDiv.style.display = "none";
      container.style.opacity = "1";
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ResumeAI();
});
