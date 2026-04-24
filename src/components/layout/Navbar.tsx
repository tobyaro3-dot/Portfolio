import { useEffect, useState } from "react";
import { navLinks } from "../../data/portfolio";
import { useScrollShadow } from "../../hooks/useScrollShadow";
import { SECTION_IDS } from "../../lib/constants";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function NavIcon({ name }: { name: "home" | "work" | "contact" }) {
  const common = {
    className: "h-4 w-4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (name === "home") {
    return (
      <svg {...common}>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5.5 10.5V20h13v-9.5" />
        <path d="M9.5 20v-5h5v5" />
      </svg>
    );
  }

  if (name === "work") {
    return (
      <svg {...common}>
        <path d="M4 7.5h16v12H4z" />
        <path d="M9 7.5V5h6v2.5" />
        <path d="M4 12h16" />
        <path d="M10 12v1.5h4V12" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M6.5 5.5h11v13h-11z" />
      <path d="M5 12h12" />
      <path d="m13 8 4 4-4 4" />
    </svg>
  );
}

export function Navbar() {
  const hasShadow = useScrollShadow();
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS.home);
  const [showHomeChrome, setShowHomeChrome] = useState(true);

  useEffect(() => {
    const tracked = [
      SECTION_IDS.home,
      SECTION_IDS.work,
      SECTION_IDS.contact,
    ];

    const updateActive = () => {
      const current = tracked
        .map((id) => ({
          id,
          top: Math.abs(
            (document.getElementById(id)?.getBoundingClientRect().top ?? 0) -
              120,
          ),
        }))
        .sort((a, b) => a.top - b.top)[0];

      if (current) {
        setActiveSection(current.id);
      }

      setShowHomeChrome(window.scrollY < window.innerHeight * 0.65);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  const renderLinks = () => (
    <>
      <div className="flex items-center">
        {navLinks.map((link) => (
          <button
            key={link.target}
            type="button"
            onClick={() => scrollToSection(link.target)}
            className={`front-nav-item rounded-full px-3 py-1.5 text-xs transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm ${
              activeSection === link.target
                ? "bg-stroke/50 text-text-primary"
                : "text-muted hover:bg-stroke/50 hover:text-text-primary"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
      <span className="front-nav-item mx-1 hidden h-5 w-px bg-stroke sm:block" />
      <button
        type="button"
        onClick={() => scrollToSection(SECTION_IDS.contact)}
        className="front-nav-item group relative rounded-full p-[2px]"
      >
        <span className="accent-gradient absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs text-text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
          Say hi <span aria-hidden="true">↗</span>
        </span>
      </button>
    </>
  );

  const iconLinks = [
    { label: "Home", target: SECTION_IDS.home, icon: "home" },
    { label: "Work", target: SECTION_IDS.work, icon: "work" },
    { label: "Say hi", target: SECTION_IDS.contact, icon: "contact" },
  ] as const;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-start justify-center px-4 pt-4 md:pt-6">
      <div
        className={`front-nav-logo absolute left-4 top-4 flex h-12 w-32 shrink-0 items-center justify-center transition duration-500 sm:w-36 md:left-6 md:top-6 ${
          showHomeChrome
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
        aria-label="Tobi Aro logo"
        aria-hidden={!showHomeChrome}
      >
        <img
          src="/taro-logo-mark.png"
          alt="Tobi Aro"
          className="h-9 w-full object-contain brightness-125 contrast-125 drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]"
        />
      </div>

      <div
        className={`front-nav-pill inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition duration-500 ease-out ${
          hasShadow ? "shadow-md shadow-black/10" : ""
        } ${
          showHomeChrome
            ? "translate-x-0 translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-x-24 -translate-y-4 scale-95 opacity-0"
        }`}
      >
        {renderLinks()}
      </div>

      <div
        className={`fixed right-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface/85 p-2 shadow-2xl shadow-black/20 backdrop-blur-md transition duration-700 ease-out md:right-6 md:top-6 ${
          showHomeChrome
            ? "pointer-events-none -translate-x-16 -translate-y-2 scale-95 opacity-0 blur-sm"
            : "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0"
        }`}
        aria-label="Section navigation"
      >
        {iconLinks.map((link, index) => (
          <button
            key={link.target}
            type="button"
            onClick={() => scrollToSection(link.target)}
            title={link.label}
            className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition duration-300 ${
              activeSection === link.target
                ? "bg-stroke/70 text-text-primary"
                : "text-muted hover:bg-stroke/50 hover:text-text-primary"
            }`}
            style={{
              transitionDelay: showHomeChrome ? "0ms" : `${index * 55}ms`,
            }}
            aria-label={link.label}
          >
            <NavIcon name={link.icon} />
            <span className="pointer-events-none absolute right-0 top-12 rounded-full border border-white/10 bg-surface px-3 py-1 text-xs text-text-primary opacity-0 shadow-lg shadow-black/20 transition-opacity duration-300 group-hover:opacity-100">
              {link.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
