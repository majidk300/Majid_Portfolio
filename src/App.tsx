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
import { PROFILE } from "./data/portfolio";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 10 * 60 * 1000 } },
});

const SEO_TITLE       = "MD Majid Naseem — Full-Stack Software Engineer | Java, Spring Boot, React";
const SEO_DESC        = "MD Majid Naseem is a passionate Full-Stack Software Engineer from Aligarh, India, specializing in Java, Spring Boot, React.js, .NET, MySQL, REST APIs, and JWT authentication. Built PYQ Pedia serving 100+ users. Open to work.";
const SEO_KEYWORDS    = "MD Majid Naseem, Majid Naseem, majidk300, Full-Stack Developer, Software Engineer India, Java Developer, Spring Boot Developer, React Developer, .NET Developer, App Developer, API Developer, Aligarh Developer, Patliputra University, PYQ Pedia, Portfolio";
const SEO_URL         = "https://majidk300.github.io";
const SEO_IMAGE       = PROFILE.avatar!;
const STRUCTURED_DATA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "MD Majid Naseem",
  alternateName: "Majid Naseem",
  url: SEO_URL,
  image: SEO_IMAGE,
  jobTitle: "Full-Stack Software Engineer",
  description: SEO_DESC,
  email: PROFILE.email,
  telephone: PROFILE.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aligarh",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  sameAs: [PROFILE.github, PROFILE.linkedin],
  knowsAbout: ["Java", "Spring Boot", "React.js", ".NET", "MySQL", "REST API", "JWT", "Android Development", "Full-Stack Development"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Patliputra University",
    address: "Patna, Bihar, India",
  },
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
          <meta name="revisit-after"     content="7 days" />
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
          <meta name="twitter:creator"     content="@majidk300" />

          {/* ── Google / Search specific ── */}
          <meta name="google-site-verification" content="" />
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
