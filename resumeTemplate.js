// resumeTemplate.js - Resume data and template management
class ResumeTemplate {
  constructor() {
    this.defaultTemplate = this.getDefaultTemplate();
  }

  // Get the default LaTeX resume template
  getDefaultTemplate() {
    return `\\documentclass[letterpaper,11pt]{article}

\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{ragged2e}
\\usepackage{xcolor}
\\usepackage{fontawesome}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins for maximum space utilization
\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.6in}
\\addtolength{\\textwidth}{1.2in}
\\addtolength{\\topmargin}{-.7in}
\\addtolength{\\textheight}{1.4in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Define a light gray color for the section line
\\definecolor{lightgray}{gray}{0.8}

% Sections formatting with minimal spacing
\\titleformat{\\section}{
  \\vspace{-6pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\vspace{-2pt}\\color{lightgray}\\hrule\\vspace{1pt}]

% Ensure that generated PDF is machine readable/ATS parsable
\\pdfgentounicode=1

% Custom commands with tighter spacing
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-3pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{1pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-8pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
\\vspace{-2pt}
    \\item
    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textbf{\\small #2}\\\\
    \\end{tabular*}\\vspace{-8pt}
}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={$\\bullet$}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-6pt}}

\\begin{document}

% HEADING
\\begin{center}
    \\textbf{\\Huge \\scshape Prudhvi Charan P} \\\\ \\vspace{2pt}
    {\\faPhone}  816-762-8317 ~ 
    \\href{mailto:bunnycharanprudhvi@gmail.com}{\\raisebox{-0.1\\height}{\\faEnvelope}  \\underline{bunnycharanprudhvi@gmail.com}} ~ 
    \\href{https://www.linkedin.com/in/prudhvi-charan/}{\\raisebox{-0.1\\height}{\\faLinkedin} \\underline{prudhvi-charan}}  ~
    \\href{https://github.com/Prudhvicharan}{\\raisebox{-0.1\\height}{\\faGithub} \\underline{Prudhvicharan}} ~ {\\faMapMarker} Kansas City, MO  \\\\ 
\\end{center}

% Summary
\\begin{justify}
    \\textbf{Innovative Full Stack Developer} with \\textbf{3+ years} of experience building scalable \\textbf{web} and \\textbf{AI-powered applications}. Skilled in \\textbf{React}, \\textbf{Angular}, \\textbf{TypeScript}, and \\textbf{AWS}, with a strong focus on \\textbf{performance}, \\textbf{modular design}, and \\textbf{secure authentication}. Proven ability to \\textbf{lead cross-functional teams}, \\textbf{reduce technical debt}, and \\textbf{enhance workflows}. Adept at integrating \\textbf{AI tools}, designing \\textbf{responsive UIs}, and creating \\textbf{reusable components} for seamless \\textbf{cross-device experiences}.
\\end{justify}

% Technical Skills
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0in, label={}]
\\vspace{-2pt}
    \\small{\\item
        \\textbf{Languages:} Python, JavaScript(ES6+), TypeScript, Java, C\\#, SQL, HTML, CSS, Sass/SCSS\\\\
        \\textbf{Developer Tools:} npm, Webpack, VS Code, Jira, Postman, CAST, PuTTY, SonarLint, SonarQube, Git, GitLab, CursorAI, Balsamiq, Miro\\\\
        \\textbf{Technologies/Frameworks:} Angular, Angular Material, AngularJS, RxJS, Express.js, Bootstrap, jQuery, React, React Router, Tailwind CSS, Vue.js, Microservices, GraphQL, Spring Boot\\\\
        \\textbf{Database Technologies:} MySQL, PostgreSQL, MongoDB, AWS Cognito\\\\
        \\textbf{APIs \\& Integration:} RESTful APIs, Google OAuth, Gmail API, Resume Parser API\\\\
        \\textbf{Testing:} Jasmine, Karma, Jest, Test-driven development for Angular and React applications\\\\
        \\textbf{UX/UI:} Responsive layouts, Interactive dashboards, Data visualization, Wireframing, Prototyping\\\\
        \\textbf{Agile Methodologies:} Scrum, Agile Project Management\\\\
    }
\\end{itemize}

% Experience
\\section{Experience}
    \\resumeSubHeadingListStart
    \\resumeSubheading
    {\\textbf{Full-Stack AI Engineer}}{03/2025 - Present}
    {Akdene Technologies}{Morrisville, Charlotte}
    \\resumeItemListStart
    \\resumeItem{Architected and engineered \\textbf{5+ responsive React/TypeScript applications} with AWS Cognito authentication, reducing login issues by \\textbf{35\\%} and enhancing cross-platform user experience}
    \\resumeItem{Integrated AI-powered chatbot functionality with \\textbf{Resume Parser API} and machine learning algorithms, automating candidate evaluation and reducing screening time by \\textbf{40\\%}}
    \\resumeItem{Refactored legacy monolithic codebase into \\textbf{microservices architecture}, eliminating technical debt by \\textbf{40\\%} and improving system scalability across cloud environments}
    \\resumeItem{Implemented comprehensive CI/CD pipelines using \\textbf{Jenkins} and \\textbf{Docker}, establishing automated testing frameworks that reduced deployment time by \\textbf{50\\%} and ensured zero-downtime releases}
    \\resumeItem{Designed responsive UI/UX components with \\textbf{modern CSS frameworks} and state management solutions, improving user engagement metrics by \\textbf{45\\%} across mobile and desktop platforms}
    \\resumeItem{Orchestrated database optimization strategies for \\textbf{PostgreSQL} and \\textbf{MongoDB}, enhancing query performance by \\textbf{35\\%} and implementing efficient data modeling techniques}
    \\resumeItem{Established secure RESTful APIs with \\textbf{JWT authentication} and OAuth integration, ensuring GDPR compliance and reducing security vulnerabilities by \\textbf{50\\%}}
    \\resumeItem{Mentored development teams on advanced AI tools (\\textbf{ChatGPT, CursorAI}) and modern frameworks, increasing team productivity and code quality standards by \\textbf{30\\%}}
    \\resumeItem{Optimized application performance through advanced caching strategies, lazy loading, and CDN implementation, reducing page load times by \\textbf{40\\%} and improving Core Web Vitals scores}
    \\resumeItemListEnd
    
    \\resumeSubheading
    {\\textbf{Software Engineer - Full Stack Developer}}{06/2021 - 12/2022}
    {Vitrana}{Bangalore, India}
    \\resumeItemListStart
    \\resumeItem{Developed \\textbf{HiLIT healthcare analytics platform} using \\textbf{Spring Boot} backend and \\textbf{Angular} frontend, reducing adverse event management time by \\textbf{40\\%} for 100+ healthcare professionals}
    \\resumeItem{Constructed scalable REST APIs with advanced pagination, filtering, and search capabilities, improving data retrieval efficiency by \\textbf{25\\%} across distributed enterprise systems}
    \\resumeItem{Led implementation of \\textbf{microfrontend architecture} across 5 applications, enhancing code modularity and enabling independent deployment cycles with \\textbf{20\\%} performance improvement}
    \\resumeItem{Managed comprehensive testing strategies using \\textbf{Jasmine}, \\textbf{Karma}, and \\textbf{JUnit}, achieving \\textbf{96\\% code coverage} and reducing post-deployment bugs by \\textbf{25\\%}}
    \\resumeItem{Deployed AWS cloud infrastructure leveraging \\textbf{EC2}, \\textbf{S3}, and \\textbf{Lambda} services, reducing operational costs by \\textbf{30\\%} while ensuring high availability and disaster recovery}
    \\resumeItem{Enhanced system monitoring and logging using \\textbf{Grafana}, \\textbf{ELK Stack}, and custom dashboards, reducing mean time to resolution (MTTR) for critical issues by \\textbf{35\\%}}
    \\resumeItem{Streamlined Agile development processes with \\textbf{Scrum} methodologies and \\textbf{Jira} integration, improving sprint velocity by \\textbf{25\\%} and ensuring consistent project delivery}
    \\resumeItem{Resolved \\textbf{75+ critical production issues} through systematic debugging and root cause analysis, improving system reliability and customer satisfaction ratings by \\textbf{20\\%}}
    \\resumeItem{Collaborated with DevOps teams to implement \\textbf{Infrastructure as Code (IaC)} using Terraform, automating environment provisioning and reducing setup time by \\textbf{60\\%}}
    \\resumeItemListEnd
    
    \\resumeSubheading
    {\\textbf{Associate Software Engineer - Frontend Developer}}{12/2019 - 05/2021}
    {Vitrana}{Bangalore, India}
    \\resumeItemListStart
    \\resumeItem{Built comprehensive \\textbf{Angular/TypeScript} dashboard integrating \\textbf{50+ screens} with complex routing and state management, improving user navigation efficiency by \\textbf{40\\%}}
    \\resumeItem{Redesigned \\textbf{MedDRA Dictionary interface} managing \\textbf{100,000+ medical terms} with advanced search algorithms, enhancing data accessibility for international healthcare users by \\textbf{35\\%}}
    \\resumeItem{Modernized JavaScript applications using \\textbf{ES6+ features}, async/await patterns, and module bundling with \\textbf{Webpack}, improving code maintainability and performance by \\textbf{30\\%}}
    \\resumeItem{Created reusable component libraries with \\textbf{Angular Material} and custom CSS frameworks, standardizing UI patterns and reducing development time by \\textbf{25\\%} across teams}
    \\resumeItem{Migrated monolithic \\textbf{Spring Boot} applications to containerized microservices using \\textbf{Docker}, improving system scalability and enabling faster deployment cycles}
    \\resumeItem{Managed GitLab CI/CD pipelines with automated quality gates and code analysis tools, reducing deployment failures by \\textbf{30\\%} and ensuring consistent code quality standards}
    \\resumeItem{Facilitated cross-browser compatibility testing and performance optimization, ensuring consistent user experience across different platforms and reducing bounce rates by \\textbf{15\\%}}
    \\resumeItemListEnd
    \\resumeSubHeadingListEnd

% Projects
\\section{Projects}
    \\resumeSubHeadingListStart
        \\resumeProjectHeading
            {\\textbf{Career Axis - Job Application Tracker} $|$ React, Tailwind CSS, Google OAuth, Gmail API}{}
            \\resumeItemListStart
            \\resumeItem{Launched job tracking platform with \\textbf{Gmail API integration} and ML classification, reducing manual tracking time by \\textbf{65\\%}}
            \\resumeItem{Crafted responsive UI using \\textbf{Tailwind CSS} with glassmorphism design patterns, boosting user engagement by \\textbf{40\\%}}
            \\resumeItem{Integrated \\textbf{Google OAuth 2.0} with automated email parsing, achieving \\textbf{98\\% accuracy} in application status detection}
            \\resumeItem{Pioneered interactive timeline visualizations using \\textbf{Chart.js}, increasing interview preparation efficiency by \\textbf{25\\%}}
            \\resumeItem{Delivered advanced \\textbf{Redux} state management with local caching, reducing load times by \\textbf{75\\%} and enabling offline functionality}
            \\resumeItemListEnd
    
        \\resumeProjectHeading
            {\\textbf{Deadline Tracker - Real-Time Analytics} $|$ Angular, RxJS, Node.js, MongoDB, Socket.io}{}
            \\resumeItemListStart
            \\resumeItem{Designed real-time task management app serving \\textbf{500+ concurrent users} with \\textbf{WebSocket} connections and \\textbf{RxJS} patterns}
            \\resumeItem{Executed data visualization dashboards with \\textbf{AG-Grid} and \\textbf{Highcharts} for complex filtering and real-time updates}
            \\resumeItem{Secured RESTful APIs with \\textbf{JWT authentication} and \\textbf{MongoDB} aggregation pipelines for optimized performance}
            \\resumeItem{Automated notification systems with push alerts, improving task completion rates by \\textbf{35\\%} and reducing missed deadlines}
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
  }

  // Validate if a template is valid LaTeX
  isValidLatexTemplate(template) {
    if (!template || typeof template !== "string") {
      return false;
    }

    // Check for essential LaTeX elements
    const requiredElements = [
      "\\documentclass",
      "\\begin{document}",
      "\\end{document}",
    ];

    return requiredElements.every((element) => template.includes(element));
  }

  // Get current template (from storage or default)
  async getCurrentTemplate() {
    try {
      const settings = await chrome.storage.sync.get(["masterResume"]);

      if (
        settings.masterResume &&
        this.isValidLatexTemplate(settings.masterResume)
      ) {
        return settings.masterResume;
      }

      // Return default if no stored template or invalid
      return this.defaultTemplate;
    } catch (error) {
      console.error("Error loading template from storage:", error);
      return this.defaultTemplate;
    }
  }

  // Save template to storage
  async saveTemplate(template) {
    if (!this.isValidLatexTemplate(template)) {
      throw new Error("Invalid LaTeX template format");
    }

    try {
      await chrome.storage.sync.set({ masterResume: template });
      return true;
    } catch (error) {
      console.error("Error saving template to storage:", error);
      throw error;
    }
  }

  // Reset to default template
  async resetToDefault() {
    try {
      await chrome.storage.sync.set({ masterResume: this.defaultTemplate });
      return this.defaultTemplate;
    } catch (error) {
      console.error("Error resetting template:", error);
      throw error;
    }
  }

  // Extract sections from template for analysis
  extractSections(template) {
    const sections = {};

    try {
      // Extract header section
      const headerMatch = template.match(/% HEADING([\s\S]*?)% Summary/);
      if (headerMatch) sections.header = headerMatch[1].trim();

      // Extract summary section
      const summaryMatch = template.match(
        /% Summary([\s\S]*?)% Technical Skills/
      );
      if (summaryMatch) sections.summary = summaryMatch[1].trim();

      // Extract technical skills
      const skillsMatch = template.match(
        /% Technical Skills([\s\S]*?)% Experience/
      );
      if (skillsMatch) sections.skills = skillsMatch[1].trim();

      // Extract experience
      const experienceMatch = template.match(
        /% Experience([\s\S]*?)% Projects/
      );
      if (experienceMatch) sections.experience = experienceMatch[1].trim();

      // Extract projects
      const projectsMatch = template.match(/% Projects([\s\S]*?)% Education/);
      if (projectsMatch) sections.projects = projectsMatch[1].trim();

      // Extract education
      const educationMatch = template.match(
        /% Education([\s\S]*?)\\\\end{document}/
      );
      if (educationMatch) sections.education = educationMatch[1].trim();
    } catch (error) {
      console.error("Error extracting sections:", error);
    }

    return sections;
  }

  // Get template metadata
  getTemplateInfo(template = null) {
    const templateToAnalyze = template || this.defaultTemplate;

    return {
      name: "Prudhvi Charan P",
      sections: [
        "Header",
        "Summary",
        "Technical Skills",
        "Experience",
        "Projects",
        "Education",
      ],
      wordCount: templateToAnalyze.split(" ").length,
      characterCount: templateToAnalyze.length,
      isValid: this.isValidLatexTemplate(templateToAnalyze),
      lastModified: new Date().toISOString(),
    };
  }
}

// Create global instance
window.resumeTemplate = new ResumeTemplate();
