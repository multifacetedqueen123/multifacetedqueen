import { motion } from "framer-motion";
import { Link } from "wouter";
import { Scissors, Sparkles, ScissorsLineDashed, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7 } }),
};

const services = [
  {
    href: "/hair",
    label: "Hair",
    icon: Scissors,
    tagline: "Cuts, Color & Styling",
    desc: "Luxury hair care tailored to your unique beauty — precision cuts, transformative color, bridal styling, and more.",
    accent: "text-primary",
    border: "hover:border-primary/60",
    cta: "Explore Hair Services",
  },
  {
    href: "/crafting",
    label: "Crafting Projects",
    icon: Sparkles,
    tagline: "Custom & Bespoke Creations",
    desc: "Handcrafted personalized tumblers, gifts, apparel, and home decor — each piece made with obsessive care.",
    accent: "text-secondary",
    border: "hover:border-secondary/60",
    cta: "Explore Crafting",
  },
  {
    href: "/alterations",
    label: "Alterations",
    icon: ScissorsLineDashed,
    tagline: "Expert Tailoring & Fitting",
    desc: "From everyday hemming to bridal gown transformations — every garment made to fit you flawlessly.",
    accent: "text-secondary",
    border: "hover:border-secondary/60",
    cta: "Explore Alterations",
  },
];

const testimonials = [
  { name: "Sarah M.", service: "Hair", text: "The balayage completely transformed my look. I've never felt more confident walking out of a salon.", stars: 5 },
  { name: "Jessica T.", service: "Crafting", text: "She made the most beautiful personalized tumblers for my bridesmaids — quality that absolutely blew everyone away.", stars: 5 },
  { name: "Elena V.", service: "Alterations", text: "My wedding dress fit like a dream. The attention to detail and care she put into every stitch was remarkable.", stars: 5 },
];

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Multifaceted Queen"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-black/40" />
        </div>

        <div className="relative z-10 container px-4 md:px-8 text-center max-w-5xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-secondary text-xs tracking-[0.4em] uppercase mb-6">Beauty · Creativity · Precision</p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
              Multifaceted<br />
              <span className="text-secondary italic font-light">Queen</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-12 tracking-wide font-light max-w-2xl mx-auto">
              Beauty, Creativity, and Perfect Fit — All in One Place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/hair">
                <Button
                  data-testid="button-book-appointment"
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-none px-10 py-7 text-base tracking-widest uppercase w-full sm:w-auto"
                >
                  Book Appointment
                </Button>
              </Link>
              <Link href="/hair">
                <Button
                  data-testid="button-explore-services"
                  variant="outline"
                  size="lg"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-black rounded-none px-10 py-7 text-base tracking-widest uppercase w-full sm:w-auto"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-24 md:py-32 container mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">What We Offer</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Our Services</h2>
          <div className="w-16 h-px bg-secondary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                data-testid={`card-service-overview-${i}`}
              >
                <Link href={s.href}>
                  <div className={`bg-card border border-border/60 ${s.border} transition-all duration-300 p-10 h-full cursor-pointer group`}>
                    <Icon className={`${s.accent} w-8 h-8 mb-6 transition-transform duration-300 group-hover:scale-110`} />
                    <p className={`text-xs tracking-[0.25em] uppercase mb-2 ${s.accent}`}>{s.tagline}</p>
                    <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-secondary transition-colors">{s.label}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-8">{s.desc}</p>
                    <span className={`text-xs tracking-widest uppercase border-b pb-1 ${s.accent} border-current`}>
                      {s.cta} →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="py-20 bg-card border-y border-border/40">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-5">The Studio</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">Where Beauty Meets Craft</h2>
            <p className="text-white/55 leading-relaxed text-lg">
              We're a boutique studio offering premium hair services, bespoke handcrafted items, and expert tailoring — all under one roof.
              Every service is delivered with the care, precision, and artistry that our clients deserve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 container mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center mb-14"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">Client Love</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white">What Our Clients Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-card border border-border/60 p-8"
            >
              <div className="flex gap-1 text-secondary mb-5">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-xs tracking-widest uppercase text-primary mb-3">{t.service}</p>
              <p className="text-white/60 italic leading-relaxed mb-6">"{t.text}"</p>
              <p className="font-serif text-white text-sm tracking-widest uppercase">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 md:py-28 bg-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Ready to Get Started?</h2>
            <p className="text-white/55 mb-10 text-lg max-w-xl mx-auto">
              Choose your service and book a consultation or appointment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/hair">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none px-10 py-7 tracking-widest uppercase w-full sm:w-auto">
                  Hair Studio
                </Button>
              </Link>
              <Link href="/crafting">
                <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-black rounded-none px-10 py-7 tracking-widest uppercase w-full sm:w-auto">
                  Crafting Projects
                </Button>
              </Link>
              <Link href="/alterations">
                <Button size="lg" variant="outline" className="border-white/30 text-white/70 hover:bg-white/10 rounded-none px-10 py-7 tracking-widest uppercase w-full sm:w-auto">
                  Alterations
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
