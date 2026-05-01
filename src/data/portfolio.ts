export const PROFILE = {
  name: "MD Majid Naseem",
  shortName: "Majid",
  role: "Full-Stack Software Engineer",
  tagline: "Building scalable systems with elegant code",
  summary:
    "Full-Stack Software Engineer from Aligarh, India with hands-on experience in Java, Spring Boot, React.js, .NET, C#, MySQL, REST APIs, JWT authentication and production-ready web applications. I build secure backend systems, responsive frontends, payment-enabled platforms and enterprise-grade software.",
  location: "Aligarh, Uttar Pradesh, India",
  email: "majidnaseem726@gmail.com",
  phone: "+91 7644918223",
  github: "https://github.com/majidk300",
  githubUsername: "majidk300",
  linkedin: "https://www.linkedin.com/in/md-majid-naseem-b8a579281",
  avatar: "https://avatars.githubusercontent.com/u/59910150?v=4",
};

export const SKILLS = {
  languages: [
    { name: "Java", icon: "☕", level: 90 },
    { name: "JavaScript", icon: "⚡", level: 85 },
    { name: "C#", icon: "◆", level: 75 },
    { name: "TypeScript", icon: "🔷", level: 70 },
    { name: "SQL", icon: "🗄️", level: 80 },
  ],
  frameworks: [
    { name: "Spring Boot", icon: "🍃", level: 88 },
    { name: "Flutter", icon: "💙", level: 72 },
    { name: ".NET Core", icon: "◈", level: 72 },
    { name: "React.js", icon: "⚛️", level: 85 },
    { name: "Hibernate/JPA", icon: "🔗", level: 80 },
    { name: "Tailwind CSS", icon: "🎨", level: 85 },
    { name: "Bootstrap", icon: "🅱", level: 80 },
    { name: "Thymeleaf", icon: "🌿", level: 78 },
    { name: "Material UI", icon: "📐", level: 75 },
  ],
  tools: [
    { name: "MySQL", icon: "🐬", level: 85 },
    { name: "Git", icon: "🔀", level: 88 },
    { name: "GitHub", icon: "🐙", level: 90 },
    { name: "RESTful APIs", icon: "🔌", level: 90 },
    { name: "JWT Auth", icon: "🔐", level: 85 },
    { name: "OOP", icon: "🧱", level: 88 },
  ],
};

export const EXPERIENCE = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Softential Solutions LLP",
    location: "Aligarh, UP, India",
    period: "Dec 2025 – Feb 2026",
    type: "Internship",
    color: "#00d4ff",
    description: [
      "Focused on C# and .NET development, building a strong foundation in enterprise software patterns.",
      "Gained deep understanding of application architecture, code structure, and real-world .NET engineering practices.",
      "Contributed to the design and improvement of the MMP website, applying frontend and backend skills.",
      "Worked with MySQL for database design, query optimization, and data modeling tasks.",
    ],
    tech: ["C#", ".NET Core", "MySQL", "ASP.NET", "Git"],
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "PYQ Pedia",
    subtitle: "Academic Resource Platform",
    description:
      "A production-grade web application serving 100+ active users with previous year exam questions. Features 15+ REST APIs, secure JWT authentication, and Razorpay payment integration.",
    tech: ["Java", "Spring Boot", "React.js", "MySQL", "JWT", "Razorpay"],
    features: [
      "15+ RESTful APIs",
      "JWT Authentication",
      "Razorpay Payment Gateway",
      "100+ Active Users",
    ],
    liveUrl: "https://www.pyqpedia.org/",
    githubUrl: null,
    color: "#00d4ff",
    accentColor: "#0066ff",
    status: "Live",
  },
  {
    id: 2,
    title: "Smart Contact Manager",
    subtitle: "Full-Stack Contact Application",
    description:
      "A feature-rich contact management system with secure OAuth and local authentication, full CRUD operations, search functionality, and a clean, intuitive UI.",
    tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "Spring Security"],
    features: [
      "Secure Authentication",
      "Full CRUD Operations",
      "OAuth Integration",
      "Search & Filter",
    ],
    liveUrl: null,
    githubUrl: "https://github.com/majidk300/Smart-Contact-Manager",
    color: "#7b2fff",
    accentColor: "#00ff88",
    status: "GitHub",
  },
  {
    id: 3,
    title: "E-Commerce Web App",
    subtitle: "Full-Stack Shopping Platform",
    description:
      "A complete e-commerce solution with product management, shopping cart system, order processing, and secure user authentication — built on a robust Spring Boot backend.",
    tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "Bootstrap"],
    features: [
      "Product Management",
      "Cart System",
      "Secure Auth",
      "Order Processing",
    ],
    liveUrl: null,
    githubUrl: "https://github.com/majidk300/Java-E-Commerce-Web-Application.github.io",
    color: "#00ff88",
    accentColor: "#00d4ff",
    status: "GitHub",
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Patliputra University",
    location: "Patna, Bihar, India",
    period: "Aug 2021 – Jul 2024",
    subjects: ["Data Structures", "OOP", "DBMS", "Software Engineering", "Web Development"],
    color: "#00d4ff",
  },
  {
    degree: "Intermediate (12th Grade) – PCM",
    institution: "Iqra Public School",
    location: "Aligarh, UP, India",
    period: "Mar 2020 – May 2021",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    color: "#7b2fff",
  },
];

export const TECH_BADGES = [
  "Java", "Spring Boot", "React", ".NET", "MySQL", "GitHub", "JWT", "REST API", "App Dev",
];

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];
