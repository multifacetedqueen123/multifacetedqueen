import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const tabs = [
  { path: "/hair", label: "Hair" },
  { path: "/crafting", label: "Crafting Projects" },
  { path: "/alterations", label: "Alterations" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || !isHome
            ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <Link href="/">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-wider text-white cursor-pointer select-none">
              Multifaceted <span className="text-secondary">Queen</span>
            </span>
          </Link>

          {/* Desktop tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const isActive = location === tab.path;
              return (
                <Link key={tab.path} href={tab.path}>
                  <span
                    data-testid={`nav-${tab.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`px-5 py-2 text-sm tracking-widest uppercase font-medium transition-all duration-200 border-b-2 cursor-pointer ${
                      isActive
                        ? "border-secondary text-secondary"
                        : "border-transparent text-white/80 hover:text-white hover:border-white/30"
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            data-testid="button-mobile-menu"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-background/98 backdrop-blur-lg border-t border-border/50 px-6 py-8 flex flex-col gap-6">
            <Link href="/">
              <span className="text-xl font-serif text-white hover:text-primary transition-colors cursor-pointer">
                Home
              </span>
            </Link>
            {tabs.map((tab) => (
              <Link key={tab.path} href={tab.path}>
                <span
                  className={`text-xl font-serif cursor-pointer transition-colors ${
                    location === tab.path ? "text-secondary" : "text-white hover:text-primary"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Sticky service tab bar — shown on service pages */}
      {!isHome && (
        <div className="fixed top-20 left-0 w-full z-40 bg-card/90 backdrop-blur-md border-b border-border/40">
          <div className="container mx-auto px-4 flex justify-center overflow-x-auto">
            {tabs.slice(0, 3).map((tab) => {
              const isActive = location === tab.path;
              return (
                <Link key={tab.path} href={tab.path}>
                  <span
                    className={`px-6 md:px-10 py-4 text-xs md:text-sm tracking-widest uppercase whitespace-nowrap font-medium transition-all duration-200 border-b-2 cursor-pointer ${
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-white/60 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
