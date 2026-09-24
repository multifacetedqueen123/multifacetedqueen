import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Scissors, Star, CheckCircle2, AlertCircle, Phone, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Preferred date is required"),
  message: z.string().optional(),
});

interface HairSubService {
  name: string;
  price: string;
  note?: string;
}

interface HairCategory {
  title: string;
  price?: string;
  note?: string;
  includes?: string[];
  requirements?: string[];
  addons?: { name: string; price: string }[];
  styles?: string[];
  services?: HairSubService[];
}

// Official Hair Services Categories
const hairCategories: HairCategory[] = [
  {
    title: "Natural Hairstyles",
    price: "$85",
    includes: ["Hair trim", "Hair growth treatment"],
    styles: ["Bantu Knots", "Twist Outs", "Two Strand Twists"],
  },
  {
    title: "Braids & Twists",
    price: "$150",
    includes: ["Hair trim", "Hair growth treatment"],
    addons: [
      { name: "Hair Included", price: "$25" },
      { name: "Boho Style Hair", price: "$30" },
    ],
    styles: [
      "Passion Twists",
      "Senegalese Twists",
      "Marley Twists",
      "Two Strand Kinky Twists",
      "Box Braids",
      "Knotless Box Braids",
    ],
  },
  {
    title: "Protective Hairstyles",
    includes: ["Hair trim", "Hair growth treatment"],
    services: [
      { name: "Faux Locs", price: "$200" },
      { name: "Crochet Styles", price: "$100" },
      { name: "Quick Weaves", price: "$80" },
      { name: "Ponytails", price: "$60–$90", note: "depending on style" },
    ],
  },
  {
    title: "Wig Installs",
    price: "$100",
    requirements: [
      "Natural hair must be washed prior to appointment",
      "Wigs are not provided",
    ],
    includes: ["Hair oil treatment", "Braid down"],
  },
  {
    title: "Traditional Locs",
    note: "All retwists include Loc maintenance & Hair growth treatment",
    services: [
      { name: "Retwist (Kids)", price: "$45" },
      { name: "Retwist (Adults)", price: "$75" },
      { name: "Retwist & Style (Kids)", price: "$60" },
      { name: "Retwist & Style (Adults)", price: "$90" },
      { name: "ACV Detox", price: "$60" },
    ],
  },
];

const gallery = [
  "/images/hair-1.png",
  "/images/hair-2.png",
  "/images/hair-3.png",
  "/images/hair-4.png",
  "/images/hair-5.png",
  "/images/hair-6.png",
];

const testimonials = [
  { name: "Sarah M.", text: "Styled by B is incredible! My knotless box braids were neat, lightweight, and lasted so long.", stars: 5 },
  { name: "Priya K.", text: "The hair growth treatment and loc maintenance left my locs feeling healthy, refreshed, and perfectly styled.", stars: 5 },
  { name: "Danielle R.", text: "Best wig install experience ever! The braid down was firm yet comfortable and the oil treatment was amazing.", stars: 5 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function HairPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", service: "", date: "", message: "" },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const response = await fetch("https://formspree.io/f/xkjgbako", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: "Styled by B Hair Request",
          formType: "Styled by B — Hair Request",
          name: values.name,
          email: values.email,
          phone: values.phone,
          service: values.service,
          date: values.date,
          message: values.message || "",
        }),
      });

      if (response.ok) {
        toast({
          title: "Appointment Requested",
          description: "Thank you! We'll be in touch shortly to confirm your hair appointment with Styled by B.",
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Submission Error",
          description: "Unable to send your request. Please try again or call 706-347-8273.",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Unable to send your request. Please try again or call 706-347-8273.",
      });
    }
  };

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Page Header */}
      <div className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">Styled by B</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-5">Hair Studio</h1>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-secondary/60" />
            <Scissors className="text-secondary w-5 h-5" />
            <div className="h-px w-16 bg-secondary/60" />
          </div>
          <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
            Luxury natural hair styling, custom braids, protective styles, wig installs, and loc maintenance.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-24 space-y-24">

        {/* BOOKING POLICY HIGHLIGHTS BANNER */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="bg-card border border-secondary/40 p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
              <div className="mb-6 border-b border-border/40 pb-4">
                <span className="text-secondary text-xs tracking-[0.3em] uppercase block mb-1">Styled by B Policy</span>
                <h2 className="font-serif text-2xl md:text-3xl text-white">Booking Policy & Preparation</h2>
              </div>
              
              {/* Highlighted Policy Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-primary/10 border-l-4 border-primary p-4">
                  <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>$25 Non-Refundable Deposit</span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">
                    A $25 non-refundable deposit is required to secure your appointment spot.
                  </p>
                </div>
                <div className="bg-secondary/10 border-l-4 border-secondary p-4">
                  <div className="flex items-center gap-2 text-secondary font-semibold mb-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>4 Inches Minimum Length</span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Hair must be at least 4 inches in length for all braiding and styling services.
                  </p>
                </div>
                <div className="bg-white/5 border-l-4 border-white/40 p-4">
                  <div className="flex items-center gap-2 text-white font-semibold mb-1">
                    <Scissors className="w-4 h-4 shrink-0" />
                    <span>Hairstyle Locked Upon Booking</span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Once an appointment is booked, the requested hairstyle cannot be changed.
                  </p>
                </div>
              </div>

              {/* Deposit Accepted Through & Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background/60 p-6 border border-border/50">
                <div>
                  <h4 className="font-serif text-lg text-white mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-secondary" />
                    Deposit Accepted Through:
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between border-b border-border/30 pb-2">
                      <span className="text-white/70 font-medium">Cash App:</span>
                      <span className="text-secondary font-mono font-bold">$brandydd314</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/30 pb-2">
                      <span className="text-white/70 font-medium">Zelle:</span>
                      <a href="tel:7063478273" className="text-secondary font-mono font-bold hover:underline">
                        706-347-8273
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-3">
                  <div className="bg-secondary/10 p-3 text-secondary text-xs font-medium border border-secondary/20">
                    💡 <span className="font-semibold">Instruction:</span> "Please include your hairstyle and any add-ons in the payment note."
                  </div>
                  <p className="text-white/60 text-xs italic leading-relaxed">
                    "If you have any questions about services, pricing, or preparation, please reach out and ask before booking."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Services & Pricing Cards */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Styled by B Services</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">Services & Pricing Guide</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hairCategories.map((cat, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card data-testid={`card-hair-category-${i}`} className="bg-card border-border/60 hover:border-secondary/60 transition-all duration-300 h-full rounded-none flex flex-col justify-between">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="font-serif text-xl text-white">{cat.title}</CardTitle>
                      {cat.price && <span className="text-secondary font-bold text-lg">{cat.price}</span>}
                    </div>
                    {cat.note && <p className="text-secondary/80 text-xs italic mt-1">{cat.note}</p>}
                  </CardHeader>
                  <CardContent className="pt-4 flex-grow space-y-4">
                    
                    {/* Includes */}
                    {cat.includes && cat.includes.length > 0 && (
                      <div>
                        <span className="text-xs uppercase tracking-widest text-primary font-semibold block mb-2">Includes:</span>
                        <ul className="space-y-1">
                          {cat.includes.map((inc, idx) => (
                            <li key={idx} className="text-white/70 text-xs flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Requirements */}
                    {cat.requirements && cat.requirements.length > 0 && (
                      <div className="bg-primary/10 p-3 border-l-2 border-primary">
                        <span className="text-xs uppercase tracking-widest text-primary font-semibold block mb-1">Requirements:</span>
                        <ul className="space-y-1">
                          {cat.requirements.map((req, idx) => (
                            <li key={idx} className="text-white/80 text-xs italic">
                              • {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Add-ons */}
                    {cat.addons && cat.addons.length > 0 && (
                      <div>
                        <span className="text-xs uppercase tracking-widest text-secondary font-semibold block mb-2">Add-ons:</span>
                        <div className="space-y-1">
                          {cat.addons.map((addon, idx) => (
                            <div key={idx} className="flex justify-between text-xs bg-white/5 px-2.5 py-1.5 border border-border/30">
                              <span className="text-white/80">{addon.name}</span>
                              <span className="text-secondary font-semibold">{addon.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Services list (for protective hairstyles & locs) */}
                    {cat.services && cat.services.length > 0 && (
                      <div>
                        <span className="text-xs uppercase tracking-widest text-white/50 font-semibold block mb-2">Options & Rates:</span>
                        <div className="space-y-1.5">
                          {cat.services.map((srv, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-border/30">
                              <div>
                                <span className="text-white/90 font-medium">{srv.name}</span>
                                {srv.note && <span className="text-white/40 text-[10px] block">{srv.note}</span>}
                              </div>
                              <span className="text-secondary font-bold">{srv.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Available Styles */}
                    {cat.styles && cat.styles.length > 0 && (
                      <div>
                        <span className="text-xs uppercase tracking-widest text-white/50 font-semibold block mb-2">Available Styles:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.styles.map((st, idx) => (
                            <span key={idx} className="text-[11px] bg-white/5 text-white/80 px-2.5 py-1 border border-border/40">
                              {st}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Booking / Scheduler Form */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Appointments by Appointment Only</p>
              <h2 className="font-serif text-4xl text-white mb-6">Book with Styled by B</h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Ready for your hair transformation? Submit your appointment request below. Remember that a $25 non-refundable deposit is required to lock in your appointment time.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                  <span>By Appointment Only</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Phone className="w-5 h-5 text-secondary shrink-0" />
                  <span>Call / Text: <a href="tel:7063478273" className="text-secondary font-semibold hover:underline">706-347-8273</a></span>
                </div>
              </div>

              <div className="bg-secondary/10 border-l-4 border-secondary p-6">
                <h4 className="font-serif text-secondary mb-2 font-bold">Deposit Payment Quick Reference</h4>
                <p className="text-white/70 text-sm mb-3">
                  Cash App: <span className="text-secondary font-mono font-bold">$brandydd314</span> | Zelle: <a href="tel:7063478273" className="text-secondary font-mono font-bold hover:underline">706-347-8273</a>
                </p>
                <p className="text-white/50 text-xs italic">
                  Note: Please state your hairstyle and add-ons in the payment memo.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card border border-border/60 p-8 md:p-10"
            >
              <h3 className="font-serif text-2xl text-white mb-8">Request Appointment</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            data-testid="input-name"
                            placeholder="Full Name"
                            className="bg-background rounded-none border-border/60 focus-visible:ring-primary py-5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            data-testid="input-phone"
                            placeholder="Phone Number"
                            className="bg-background rounded-none border-border/60 focus-visible:ring-primary py-5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          data-testid="input-email"
                          placeholder="Email Address"
                          type="email"
                          className="bg-background rounded-none border-border/60 focus-visible:ring-primary py-5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="service" render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-service" className="bg-background rounded-none border-border/60 focus:ring-primary text-white/60 py-5">
                            <SelectValue placeholder="Select Desired Service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border rounded-none">
                          <SelectItem value="natural">Natural Hairstyles ($85)</SelectItem>
                          <SelectItem value="braids">Braids & Twists ($150)</SelectItem>
                          <SelectItem value="protective">Protective Hairstyles ($60–$200)</SelectItem>
                          <SelectItem value="wig">Wig Installs ($100)</SelectItem>
                          <SelectItem value="locs">Traditional Locs ($45–$90)</SelectItem>
                          <SelectItem value="detox">ACV Detox ($60)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          data-testid="input-date"
                          type="date"
                          min={minDate}
                          onClick={(e) => e.currentTarget.showPicker?.()}
                          className="bg-background rounded-none border-border/60 focus-visible:ring-primary text-white py-5 [color-scheme:dark] cursor-pointer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          data-testid="textarea-message"
                          placeholder="Specify hairstyle, add-ons, hair length, or questions..."
                          className="bg-background rounded-none border-border/60 focus-visible:ring-primary resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button
                    data-testid="button-submit-hair"
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-none py-6 tracking-widest uppercase text-sm mt-2 disabled:opacity-50"
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Request Appointment"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Styled by B Portfolio</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">Hair Gallery</h2>
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
                className={`relative overflow-hidden group ${i === 0 ? "row-span-2" : ""}`}
              >
                <div className={`w-full ${i === 0 ? "h-full min-h-[400px]" : "aspect-square"} overflow-hidden`}>
                  <img
                    data-testid={`img-hair-gallery-${i}`}
                    src={src}
                    alt={`Styled by B Hair style ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Happy Clients</p>
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

