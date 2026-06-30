import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sparkles, Star } from "lucide-react";
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
  phone: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  description: z.string().min(10, "Please describe your project in more detail"),
});

const projectTypes = [
  {
    title: "Custom Tumblers",
    desc: "Glitter, epoxy, vinyl, and personalized designs — perfect for gifts or everyday use.",
    icon: "✦",
  },
  {
    title: "Personalized Gifts",
    desc: "Unique keepsakes for weddings, birthdays, baby showers, and corporate events.",
    icon: "✦",
  },
  {
    title: "Custom Apparel",
    desc: "Embroidered, heat-pressed, and custom-printed clothing for individuals or groups.",
    icon: "✦",
  },
  {
    title: "Home Decor",
    desc: "Bespoke accent pieces, wall art, and decorative items crafted to complement your space.",
    icon: "✦",
  },
  {
    title: "Event Favors",
    desc: "Cohesive, branded, and thoughtful favor sets for any occasion.",
    icon: "✦",
  },
  {
    title: "Wholesale Orders",
    desc: "Bulk personalized items for businesses, boutiques, and brands.",
    icon: "✦",
  },
];

const process = [
  {
    step: "01",
    title: "Consultation",
    desc: "We discuss your vision, requirements, timeline, and budget to ensure the perfect outcome.",
  },
  {
    step: "02",
    title: "Design",
    desc: "We create a custom design concept and present it to you for approval before production begins.",
  },
  {
    step: "03",
    title: "Creation",
    desc: "Your piece is handcrafted with premium materials and obsessive attention to detail.",
  },
  {
    step: "04",
    title: "Delivery",
    desc: "Your finished project is carefully packaged and delivered or ready for pickup.",
  },
];

const gallery = [
  "/images/craft-1.png",
  "/images/craft-2.png",
  "/images/craft-3.png",
  "/images/craft-4.png",
  "/images/craft-5.png",
  "/images/craft-6.png",
];

const testimonials = [
  { name: "Jessica T.", text: "I ordered custom tumblers for my bridesmaids and they were absolutely stunning. The quality blew everyone away.", stars: 5 },
  { name: "Monica L.", text: "She made the most beautiful personalized gifts for my baby shower. Guests were obsessed with every piece.", stars: 5 },
  { name: "Tanya B.", text: "Ordered bulk custom apparel for our team event. The turnaround was fast and the quality exceeded expectations.", stars: 5 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function CraftingPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", projectType: "", budget: "", description: "" },
  });

  const onSubmit = () => {
    toast({
      title: "Project Inquiry Received",
      description: "Thank you! We'll review your project details and reach out within 1–2 business days.",
    });
    form.reset();
  };

  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Page Header */}
      <div className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-4">Bespoke Creations</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-5">Crafting Projects</h1>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-primary/60" />
            <Sparkles className="text-primary w-5 h-5" />
            <div className="h-px w-16 bg-primary/60" />
          </div>
          <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
            Custom, handcrafted items made with love — from personalized tumblers to bespoke gifts and everything in between.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-24 space-y-24">

        {/* Project Types */}
        <section>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-serif text-3xl text-white mb-10 text-center"
          >
            What We Create
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projectTypes.map((p, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                data-testid={`card-project-${i}`}
                className="bg-card border border-border/60 p-8 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="text-primary text-2xl mb-4">{p.icon}</div>
                <h3 className="font-serif text-xl text-white mb-3 group-hover:text-secondary transition-colors">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Guide */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3">Investment</p>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Pricing Guide</h2>
            </div>
            <div className="bg-card border border-border/60 p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
                <Sparkles className="text-secondary w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Custom Pricing for Every Project</h3>
              <p className="text-white/60 leading-relaxed max-w-xl mx-auto mb-8">
                Pricing depends on customization, materials, quantity, and project complexity.
                We believe every creation should be priced fairly — reach out for a personalized quote.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {[
                  { label: "Standard Tumblers", range: "$25–$65 each" },
                  { label: "Personalized Gifts", range: "$15–$150+" },
                  { label: "Bulk Orders", range: "Volume discounts available" },
                ].map((item, i) => (
                  <div key={i} className="bg-background/50 border border-border/40 p-4">
                    <p className="text-white/50 mb-1">{item.label}</p>
                    <p className="text-secondary font-semibold">{item.range}</p>
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-xs mt-6">
                A deposit is required to begin any custom project. Final pricing confirmed at consultation.
              </p>
            </div>
          </motion.div>
        </section>

        {/* The Process */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">How It Works</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">The Process</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                data-testid={`card-process-${i}`}
                className="relative text-center p-8 bg-card border border-border/60 hover:border-secondary/50 transition-colors"
              >
                <div className="font-serif text-5xl font-bold text-secondary/20 mb-4">{p.step}</div>
                <h3 className="font-serif text-xl text-white mb-3">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Booking / Inquiry Form */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3">Get Started</p>
              <h2 className="font-serif text-4xl text-white mb-6">Start Your Project</h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Tell us about your vision and we'll make it a reality. Fill out the form and we'll follow up with a consultation to discuss every detail.
              </p>
              <div className="space-y-4">
                {["Tell us your idea", "Receive a custom quote", "Approve the design", "We create & deliver"].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-white/70">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card border border-border/60 p-8 md:p-10"
            >
              <h3 className="font-serif text-2xl text-white mb-8">Project Inquiry</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input data-testid="input-name" placeholder="Full Name" className="bg-background rounded-none border-border/60 py-5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input data-testid="input-phone" placeholder="Phone (optional)" className="bg-background rounded-none border-border/60 py-5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input data-testid="input-email" placeholder="Email Address" type="email" className="bg-background rounded-none border-border/60 py-5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="projectType" render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-project-type" className="bg-background rounded-none border-border/60 text-white/60 py-5">
                            <SelectValue placeholder="Project Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border rounded-none">
                          <SelectItem value="tumblers">Custom Tumblers</SelectItem>
                          <SelectItem value="gifts">Personalized Gifts</SelectItem>
                          <SelectItem value="apparel">Custom Apparel</SelectItem>
                          <SelectItem value="decor">Home Decor</SelectItem>
                          <SelectItem value="favors">Event Favors</SelectItem>
                          <SelectItem value="bulk">Wholesale / Bulk</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="budget" render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-budget" className="bg-background rounded-none border-border/60 text-white/60 py-5">
                            <SelectValue placeholder="Estimated Budget" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border rounded-none">
                          <SelectItem value="under-50">Under $50</SelectItem>
                          <SelectItem value="50-150">$50 – $150</SelectItem>
                          <SelectItem value="150-300">$150 – $300</SelectItem>
                          <SelectItem value="300-plus">$300+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          data-testid="textarea-description"
                          placeholder="Describe your project idea, quantity needed, colors, and any inspiration..."
                          className="bg-background rounded-none border-border/60 resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button
                    data-testid="button-submit-crafting"
                    type="submit"
                    size="lg"
                    className="w-full bg-secondary hover:bg-secondary/90 text-black font-bold rounded-none py-6 tracking-widest uppercase text-sm"
                  >
                    Submit Project Inquiry
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
            <h2 className="font-serif text-3xl md:text-4xl text-white">Project Gallery</h2>
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
                className="aspect-square relative overflow-hidden group"
              >
                <img
                  data-testid={`img-craft-gallery-${i}`}
                  src={src}
                  alt={`Crafting project ${i + 1}`}
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
