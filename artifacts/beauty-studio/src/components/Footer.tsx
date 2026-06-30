import { Link } from "wouter";
import { Instagram, Facebook } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#050505] py-12 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          <div className="text-center md:text-left">
            <div className="font-serif text-2xl font-bold tracking-wider text-white mb-2">
              <span className="text-primary">C</span>reative{" "}
              <span className="text-secondary">&amp;</span> Studio
            </div>
            <p className="text-sm text-white/40 tracking-wide">
              Beauty, Creativity, and Perfect Fit — All in One Place
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <Link href="/"><span className="hover:text-white transition-colors cursor-pointer">Home</span></Link>
            <Link href="/hair"><span className="hover:text-white transition-colors cursor-pointer">Hair</span></Link>
            <Link href="/crafting"><span className="hover:text-white transition-colors cursor-pointer">Crafting Projects</span></Link>
            <Link href="/alterations"><span className="hover:text-white transition-colors cursor-pointer">Alterations</span></Link>
            <Link href="/contact"><span className="hover:text-white transition-colors cursor-pointer">Contact</span></Link>
          </nav>

          <div className="flex gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-white/60 hover:bg-primary hover:border-primary hover:text-white transition-all"
            >
              <Instagram size={17} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-white/60 hover:bg-primary hover:border-primary hover:text-white transition-all"
            >
              <Facebook size={17} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-white/60 hover:bg-primary hover:border-primary hover:text-white transition-all"
            >
              <SiTiktok size={17} />
            </a>
          </div>
        </div>

        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} Multifaceted Queen. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
