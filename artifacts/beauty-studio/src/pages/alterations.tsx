import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ScissorsLineDashed, Star, Phone, Clock, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// Official Handy Brandy Pricing Data Structure
const alterationCategories = [
  {
    category: "Pants & Jeans",
    items: [
      { service: "Basic Hem", price: "$10–$20" },
      { service: "Original Finish Hem", price: "$15–$25" },
      { service: "Waist Take In/Out", price: "$20–$40" },
      { service: "Seat Adjustment", price: "$15–$30" },
      { service: "Taper Legs", price: "$20–$45" },
      { service: "Zipper Replacement", price: "$15–$35" },
    ],
  },
  {
    category: "Shirts & Blouses",
    items: [
      { service: "Shorten Sleeves (No Cuff)", price: "$10–$20" },
      { service: "Shorten Sleeves (With Cuffs)", price: "$15–$30" },
      { service: "Take In Sides", price: "$15–$30" },
      { service: "Collar Adjustment", price: "$20–$40" },
    ],
  },
  {
    category: "Suits & Jackets",
    items: [
      { service: "Sleeve Shortening (No Buttons)", price: "$25–$50" },
      { service: "Sleeve Shortening (With Buttons)", price: "$40–$80" },
      { service: "Take In Sides", price: "$30–$70" },
      { service: "Jacket Length Shortening", price: "$50–$120" },
    ],
  },
  {
    category: "Dresses",
    items: [
      { service: "Simple Hem", price: "$20–$50" },
      { service: "Layered/Formal Hem", price: "$40–$100" },
      { service: "Take In Sides", price: "$25–$60" },
      { service: "Strap Adjustment", price: "$10–$25" },
      { service: "Add Darts/Shape", price: "$15–$40" },
      { service: "Zipper Replacement", price: "$25–$60" },
    ],
  },
  {
    category: "Repairs & Miscellaneous",
    items: [
      { service: "Patch/Repair Tears", price: "$10–$30" },
      { service: "Replace Buttons", price: "$2–$5 each" },
      { service: "Seam Repair", price: "$10–$15" },
      { service: "Elastic Replacement", price: "$15–$30" },
    ],
  },
  {
    category: "Add-On Fees",
    items: [
      { service: "Rush Service (24–48 Hours)", price: "+$10–$30" },
      { service: "Specialty Fabric", price: "$10–$50" },
    ],
    note: "Rush availability must be discussed and paid for before the garment is accepted.",
  },
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
  { name: "Elena V.", text: "Handy Brandy transformed my formal dress! The fit was absolutely precise and turned around so quickly.", stars: 5 },
  { name: "Courtney H.", text: "Had multiple pants and jackets altered by Handy Brandy. Exceptional quality, clean seams, fair pricing.", stars: 5 },
  { name: "Marisol G.", text: "Got my blazer taken in and sleeve length adjusted perfectly. Truly professional tailoring!", stars: 5 },
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
      description: "Thank you! We'll confirm your alteration appointment with Handy Brandy within 24 hours.",
    });
    form.reset();
  };

  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Page Header */}
      <div className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-4">Handy Brandy</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-5">Alterations</h1>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-secondary/60" />
            <ScissorsLineDashed className="text-secondary w-5 h-5" />
            <div className="h-px w-16 bg-secondary/60" />
          </div>
          <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed mb-6">
            Expert tailoring and custom garment alterations — precision fitting for pants, shirts, suits, dresses, and repairs.
          </p>
          
          {/* Business Phone & Hours Quick Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
            <a
              href="tel:7063478273"
              className="flex items-center gap-2 bg-secondary/10 border border-secondary/30 px-4 py-2 hover:bg-secondary/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-secondary" />
              <span>Call / Text: <strong className="text-secondary">706-347-8273</strong></span>
            </a>
            <div className="flex items-center gap-2 bg-white/5 border border-border/40 px-4 py-2">
              <Clock className="w-4 h-4 text-secondary" />
              <span>Mon–Fri: 12 PM–7 PM | Sat–Sun: Appointment Only</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-24 space-y-24">

        {/* POLICY HIGHLIGHT BOX */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="bg-card border border-secondary/40 p-6 md:p-8">
              <div className="flex items-center gap-3 border-b border-border/40 pb-4 mb-6">
                <ScissorsLineDashed className="w-6 h-6 text-secondary" />
                <h2 className="font-serif text-2xl md:text-3xl text-white">Handy Brandy Alteration Policies</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary/10 border-l-4 border-secondary p-5">
                  <h4 className="font-serif text-secondary text-lg font-semibold mb-2">Standard Turnaround</h4>
                  <p className="text-white/90 text-sm font-medium leading-relaxed">
                    "Standard alterations typically take approximately 1–2 weeks."
                  </p>
                </div>

                <div className="bg-primary/10 border-l-4 border-primary p-5">
                  <h4 className="font-serif text-primary text-lg font-semibold mb-2">Rush Orders Policy</h4>
                  <p className="text-white/90 text-sm font-medium leading-relaxed">
                    "Rush orders must be discussed and paid for before garments are accepted."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ALTERATION PRICING IMAGE SECTION */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-8">
            <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3">Official Guide</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">Alteration Pricing Guide</h2>
            <p className="text-white/50 text-sm max-w-xl mx-auto">
              View the Handy Brandy official pricing chart below. Complete itemized text pricing is also detailed below.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex justify-center"
          >
            <div className="w-full max-w-3xl bg-card border border-border/60 p-3 md:p-4 shadow-2xl">
              <img
                data-testid="img-alteration-pricing"
                src="/images/handy-brandy-alteration-pricing.jpg"
                alt="Handy Brandy alteration pricing guide"
                className="w-full h-auto max-w-full rounded-none object-contain block"
              />
            </div>
          </motion.div>
        </section>

        {/* ITEMIZED PRICING CARDS */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3">Full Itemized Rates</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">Alteration Pricing Breakdown</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {alterationCategories.map((cat, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card data-testid={`card-alteration-category-${i}`} className="bg-card border-border/60 hover:border-secondary/60 transition-all duration-300 h-full rounded-none flex flex-col justify-between">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <CardTitle className="font-serif text-xl text-white">{cat.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 flex-grow space-y-3">
                    {cat.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm py-1.5 border-b border-border/30">
                        <span className="text-white/80 font-medium">{item.service}</span>
                        <span className="text-secondary font-bold text-sm shrink-0 ml-3">{item.price}</span>
                      </div>
                    ))}
                    {cat.note && (
                      <div className="mt-3 bg-secondary/10 p-3 border-l-2 border-secondary text-xs text-white/80 italic">
                        ⚠️ {cat.note}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Booking / Scheduler */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3">Schedule a Fitting</p>
              <h2 className="font-serif text-4xl text-white mb-6">Book Your Fitting with Handy Brandy</h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Bring your garments in for precision measurement and tailoring. For rush service requests, availability must be discussed and paid before garments are accepted.
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-card border border-border/50 p-4">
                  <h4 className="font-serif text-white font-semibold mb-1 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-secondary" />
                    Contact Handy Brandy
                  </h4>
                  <p className="text-white/70 text-sm">
                    Phone: <a href="tel:7063478273" className="text-secondary font-bold hover:underline">706-347-8273</a>
                  </p>
                </div>

                <div className="bg-card border border-border/50 p-4">
                  <h4 className="font-serif text-white font-semibold mb-1 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    Operating Hours
                  </h4>
                  <p className="text-white/70 text-sm">
                    Monday–Friday: 12 PM–7 PM<br />
                    Saturday–Sunday: Appointment Only
                  </p>
                </div>
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
                            <SelectValue placeholder="Garment / Service Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border rounded-none">
                          <SelectItem value="pants">Pants & Jeans ($10–$45)</SelectItem>
                          <SelectItem value="shirts">Shirts & Blouses ($10–$40)</SelectItem>
                          <SelectItem value="suits">Suits & Jackets ($25–$120)</SelectItem>
                          <SelectItem value="dresses">Dresses ($10–$100)</SelectItem>
                          <SelectItem value="repairs">Repairs & Misc ($2–$30)</SelectItem>
                          <SelectItem value="rush">Rush Service (+ $10–$30)</SelectItem>
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
                          placeholder="Describe the garment(s), requested alterations, or rush order details..."
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
            <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3">Handy Brandy Work</p>
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
                  alt={`Handy Brandy alteration work ${i + 1}`}
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

