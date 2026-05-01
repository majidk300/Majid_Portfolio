import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Lenis from "lenis";
import LoadingScreen from "./components/ui/LoadingScreen";
import CursorGlow from "./components/ui/CursorGlow";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/Hero";
import AboutSection from "./components/sections/About";
import SkillsSection from "./components/sections/Skills";
import ExperienceSection from "./components/sections/Experience";
import ProjectsSection from "./components/sections/Projects";
import GitHubSection from "./components/sections/GitHub";
import ContactSection from "./components/sections/Contact";
import { PROFILE, PROJECTS } from "./data/portfolio";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 10 * 60 * 1000 } },
});

const SEO_TITLE       = "MD Majid Naseem (Majid) | Full-Stack Software Engineer Portfolio";
const SEO_DESC        = "Official portfolio of MD Majid Naseem, also known as Majid or Naseem, a Full-Stack Software Engineer from Aligarh, Uttar Pradesh, India. Java, Spring Boot, React.js, .NET, C#, MySQL, REST APIs, JWT authentication, Flutter, cloud, PYQ Pedia, Smart Contact Manager and e-commerce projects.";
const SEO_KEYWORDS    = "MD Majid Naseem, Majid Naseem, Majid, Naseem, MD Majid, majidk300, Majid portfolio, Naseem portfolio, MD Majid Naseem portfolio, Full-Stack Software Engineer, Full-Stack Developer, Java Developer, Spring Boot Developer, React Developer, React.js Developer, .NET Developer, C# Developer, MySQL Developer, REST API Developer, JWT Authentication, Flutter Developer, Cloud Engineer, AWS, Azure, Software Engineer India, Software Developer India, Aligarh Developer, Uttar Pradesh Developer, Patliputra University, Softential Solutions LLP, PYQ Pedia, Smart Contact Manager, E-Commerce Web App, portfolio, resume";
const SEO_URL         = "https://majidk300.github.io/";
const SEO_IMAGE       = PROFILE.avatar!;
const STRUCTURED_DATA = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SEO_URL}#person`,
      name: PROFILE.name,
      givenName: "Majid",
      familyName: "Naseem",
      alternateName: ["Majid", "Naseem", "MD Majid", "Majid Naseem", "majidk300"],
      url: SEO_URL,
      image: SEO_IMAGE,
      jobTitle: PROFILE.role,
      description: SEO_DESC,
      email: PROFILE.email,
      telephone: "+917644918223",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Aligarh",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      sameAs: [PROFILE.github, PROFILE.linkedin],
      knowsAbout: [
        "Java", "Spring Boot", "React.js", ".NET", "C#", "MySQL", "SQL",
        "REST APIs", "JWT Authentication", "Flutter", "AWS", "Azure",
        "Full-Stack Development", "Backend Development", "Frontend Development",
        "Responsive Web Design", "Payment Integration", "Razorpay",
        "Software Engineering", "Web Application Development"
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Patliputra University",
        address: "Patna, Bihar, India",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SEO_URL}#profile`,
      url: SEO_URL,
      name: "MD Majid Naseem Portfolio",
      headline: SEO_TITLE,
      description: SEO_DESC,
      image: SEO_IMAGE,
      inLanguage: "en-IN",
      mainEntity: { "@id": `${SEO_URL}#person` },
    },
    {
      "@type": "WebSite",
      "@id": `${SEO_URL}#website`,
      url: SEO_URL,
      name: "MD Majid Naseem Portfolio",
      alternateName: ["Majid Portfolio", "Naseem Portfolio", "majidk300 Portfolio"],
      description: SEO_DESC,
      publisher: { "@id": `${SEO_URL}#person` },
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      "@id": `${SEO_URL}#projects`,
      name: "Featured Projects by MD Majid Naseem",
      itemListElement: PROJECTS.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.description,
          applicationCategory: "WebApplication",
          programmingLanguage: project.tech,
          url: project.liveUrl || project.githubUrl || SEO_URL,
          author: { "@id": `${SEO_URL}#person` },
        },
      })),
    },
  ],
});

function Portfolio() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    const id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  return (
    <>
      <CursorGlow />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <GitHubSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Helmet>
          {/* ── Primary SEO ── */}
          <title>{SEO_TITLE}</title>
          <meta name="description"       content={SEO_DESC} />
          <meta name="keywords"          content={SEO_KEYWORDS} />
          <meta name="author"            content="MD Majid Naseem" />
          <meta name="robots"            content="index, follow" />
          <meta name="language"          content="English" />
          <link rel="canonical"          href={SEO_URL} />

          {/* ── Open Graph (Facebook / WhatsApp / LinkedIn preview) ── */}
          <meta property="og:type"        content="website" />
          <meta property="og:url"         content={SEO_URL} />
          <meta property="og:title"       content={SEO_TITLE} />
          <meta property="og:description" content={SEO_DESC} />
          <meta property="og:image"       content={SEO_IMAGE} />
          <meta property="og:image:width"  content="460" />
          <meta property="og:image:height" content="460" />
          <meta property="og:locale"      content="en_IN" />
          <meta property="og:site_name"   content="MD Majid Naseem Portfolio" />

          {/* ── Twitter / X card ── */}
          <meta name="twitter:card"        content="summary_large_image" />
          <meta name="twitter:title"       content={SEO_TITLE} />
          <meta name="twitter:description" content={SEO_DESC} />
          <meta name="twitter:image"       content={SEO_IMAGE} />

          {/* ── Google / Search specific ── */}
          <meta itemProp="name"        content="MD Majid Naseem" />
          <meta itemProp="description" content={SEO_DESC} />
          <meta itemProp="image"       content={SEO_IMAGE} />

          {/* ── Mobile / PWA ── */}
          <meta name="viewport"            content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color"         content="#00d4ff" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Majid Naseem" />

          {/* ── JSON-LD Structured Data for Google ── */}
          <script type="application/ld+json">{STRUCTURED_DATA}</script>
        </Helmet>

        {loading && <LoadingScreen />}
        {!loading && <Portfolio />}
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
