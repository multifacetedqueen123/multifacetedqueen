import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ScissorsLineDashed, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string().min(1, "Please select a service type"),
  garment: z.string().min(5, "Please describe the garment"),
  date: z.string().min(1, "Preferred date is required"),
  notes: z.string().optional(),
});

const services = [
  { title: "Hemming", desc: "Pants, dresses, and skirts to your perfect length.", price: "From $20", detail: "Jeans, trousers, formal wear, dresses — all hemmed with precision." },
  { title: "Resizing", desc: "Taking in or letting out for a custom fit.", price: "From $45", detail: "Whether you've gained or lost weight, we'll make it fit beautifully." },
  { title: "Bridal Alterations", desc: "Complex structural work for your most important day.", price: "Consultation", detail: "Bustle additions, bodice adjustments, length changes, and more." },
  { title: "Zipper Repair", desc: "Replacement or fixing of broken and stuck zippers.", price: "From $25", detail: "Invisible, standard, or heavy-duty zippers replaced expertly." },
  { title: "Sleeve Adjustments", desc: "Shortening, lengthening, or tapering sleeves.", price: "From $30", detail: "Suit jackets, blouses, formal and casual wear." },
  { title: "Custom Fitting", desc: "Full garment restructuring for a bespoke fit.", price: "Consultation", detail: "Complete take-in or let-out across multiple seams." },
];

const pricing = [
  { service: "Pants Hem (no cuff)", price: "$20–$35" },
  { service: "Pants Hem (with cuff)", price: "$30–$45" },
  { service: "Dress / Skirt Hem", price: "$25–$60" },
  { service: "Side Seam Take-In/Let Out", price: "$45–$85" },
  { service: "Zipper Replacement", price: "$25–$65" },
  { service: "Sleeve Shortening", price: "$30–$55" },
  { service: "Jacket / Blazer Alterations", price: "$50–$120" },
  { service: "Bridal Gown Alterations", price: "Consultation" },
  { service: "Rush Service", price: "+ $25–$50 fee" },
];

const gallery = [
  "/images/alt-1.png",
  "/images/alt-2.png",
  "/images/alt-3.png",
  "/images/alt-4.png",
  "/images/alt-5.png",
  "/images/alt-6.png",
];

const testimonials = [
  { name: "Elena V.", text: "She altered my wedding dress beautifully. It fit like it was made just for me. Couldn't have asked for better work.", stars: 5 },
  { name: "Courtney H.", text: "Had three pairs of pants hemmed and they all came out perfectly. The attention to detail is unreal.", stars: 5 },
  { name: "Marisol G.", text: "Got my blazer taken in and it's transformed my whole look. She understood exactly what I wanted.", stars: 5 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function AlterationsPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", service: "", garment: "", date: "", notes: "" },
  });

  const onSubmit = () => {
    toast({
      title: "Fitting Scheduled",
      description: "Thank you! We'll confirm your alteration appointment within 24 hours.",
    });
    form.reset();
  };

  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Page Header */}
      <div className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-4">Atelier Tailoring</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-5">Alterations</h1>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-secondary/60" />
            <ScissorsLineDashed className="text-secondary w-5 h-5" />
            <div className="h-px w-16 bg-secondary/60" />
          </div>
          <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
            Expert tailoring to ensure your garments fit flawlessly — from everyday wear to bridal gowns.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-24 space-y-24">

        {/* Services */}
        <section>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-serif text-3xl text-white mb-10 text-center"
          >
            Tailoring Services
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                data-testid={`card-alteration-${i}`}
                className="bg-card border border-border/60 p-8 hover:border-secondary/50 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl text-white group-hover:text-secondary transition-colors">{s.title}</h3>
                  <span className="text-secondary text-sm font-semibold ml-4 shrink-0">{s.price}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-3">{s.desc}</p>
                <p className="text-white/30 text-xs leading-relaxed">{s.detail}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Guide */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3">Transparent Pricing</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">Pricing Guide</h2>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="max-w-2xl mx-auto bg-card border border-border/60"
          >
            {pricing.map((item, i) => (
              <div
                key={i}
                className={`flex justify-between items-center px-8 py-4 ${
                  i < pricing.length - 1 ? "border-b border-border/30" : ""
                } hover:bg-white/5 transition-colors`}
              >
                <span className="text-white/80 font-medium">{item.service}</span>
                <span className="text-secondary font-semibold text-sm">{item.price}</span>
              </div>
            ))}
            <div className="px-8 py-5 bg-secondary/5 border-t border-secondary/20">
              <p className="text-white/40 text-xs leading-relaxed">
                Prices are estimates. Final pricing confirmed at consultation. Bridal and formal gowns require in-person assessment.
                Standard turnaround: 1–2 weeks. Rush available for an additional fee.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Booking / Scheduler */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3">Schedule a Fitting</p>
              <h2 className="font-serif text-4xl text-white mb-6">Book Your Fitting</h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Bring your garment in for a professional fitting and consultation. We'll assess the alterations needed and give you an exact quote and timeline.
              </p>

              <div className="space-y-5 mb-10">
                <div className="bg-secondary/10 border-l-4 border-secondary p-5">
                  <h4 className="font-serif text-secondary mb-1">Turnaround Times</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Standard alterations: 1–2 weeks. Bridal and formal wear: 4–8 weeks. Rush service available.
                  </p>
                </div>
                <div className="bg-primary/10 border-l-4 border-primary p-5">
                  <h4 className="font-serif text-primary mb-1">What to Bring</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Bring the garment and the shoes or undergarments you'll wear with it for the most accurate fitting.
                  </p>
                </div>
              </div>

              {/* Turnaround visual */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Standard Alterations", time: "1–2 Weeks" },
                  { label: "Bridal & Formal", time: "4–8 Weeks" },
                  { label: "Rush Service", time: "3–5 Days" },
                  { label: "Consultation", time: "Free" },
                ].map((item, i) => (
                  <div key={i} className="bg-card border border-border/40 p-4 text-center">
                    <p className="text-white/40 text-xs mb-1">{item.label}</p>
                    <p className="text-secondary font-serif text-lg font-bold">{item.time}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card border border-border/60 p-8 md:p-10"
            >
              <h3 className="font-serif text-2xl text-white mb-8">Schedule a Fitting</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input data-testid="input-name" placeholder="Full Name" className="bg-background rounded-none border-border/60 py-5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input data-testid="input-email" placeholder="Email" type="email" className="bg-background rounded-none border-border/60 py-5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input data-testid="input-phone" placeholder="Phone" className="bg-background rounded-none border-border/60 py-5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="service" render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-service" className="bg-background rounded-none border-border/60 text-white/60 py-5">
                            <SelectValue placeholder="Service Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border rounded-none">
                          <SelectItem value="hemming">Hemming</SelectItem>
                          <SelectItem value="resizing">Resizing</SelectItem>
                          <SelectItem value="bridal">Bridal Alterations</SelectItem>
                          <SelectItem value="zipper">Zipper Repair</SelectItem>
                          <SelectItem value="sleeves">Sleeve Adjustments</SelectItem>
                          <SelectItem value="fitting">Custom Fitting</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input data-testid="input-date" type="date" className="bg-background rounded-none border-border/60 text-white/60 py-5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="garment" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          data-testid="textarea-garment"
                          placeholder="Describe the garment and what alterations are needed..."
                          className="bg-background rounded-none border-border/60 resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button
                    data-testid="button-submit-alterations"
                    type="submit"
                    size="lg"
                    className="w-full bg-secondary hover:bg-secondary/90 text-black font-bold rounded-none py-6 tracking-widest uppercase text-sm"
                  >
                    Schedule My Fitting
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3">Our Work</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">Alteration Gallery</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {gallery.map((src, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="aspect-[3/4] relative overflow-hidden group"
              >
                <img
                  data-testid={`img-alt-gallery-${i}`}
                  src={src}
                  alt={`Alteration work ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3">Happy Clients</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">What They're Saying</h2>
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
                <p className="text-white/60 italic leading-relaxed mb-6">"{t.text}"</p>
                <p className="font-serif text-white text-sm tracking-widest uppercase">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
