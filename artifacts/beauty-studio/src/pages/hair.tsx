import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Scissors, Star } from "lucide-react";
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

const services = [
  { title: "Precision Haircuts", desc: "Tailored to your face shape and lifestyle.", price: "From $85" },
  { title: "Custom Coloring", desc: "Balayage, highlights, and all-over color.", price: "From $150" },
  { title: "Luxury Styling", desc: "Blowouts, silk presses, and elegant waves.", price: "From $65" },
  { title: "Nourishing Treatments", desc: "Deep conditioning and restorative care.", price: "From $45" },
  { title: "Bridal & Events", desc: "Flawless updos and styling for special days.", price: "From $120" },
  { title: "Extensions", desc: "Premium volume and length additions.", price: "Consultation" },
];

const pricing = [
  { service: "Shampoo & Blowout", price: "$55–$85" },
  { service: "Women's Haircut", price: "$85–$120" },
  { service: "Men's Haircut", price: "$45–$65" },
  { service: "Single Process Color", price: "$100–$145" },
  { service: "Balayage / Highlights", price: "$150–$250+" },
  { service: "Silk Press", price: "$75–$110" },
  { service: "Keratin Treatment", price: "$200–$350" },
  { service: "Deep Conditioning", price: "$45–$65" },
  { service: "Bridal Hair", price: "From $120" },
  { service: "Extensions (install)", price: "Consultation" },
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
  { name: "Sarah M.", text: "The balayage completely transformed my look. I've never felt more confident walking out of a salon.", stars: 5 },
  { name: "Priya K.", text: "My bridal hair was absolutely perfect. Every curl stayed in place all night long.", stars: 5 },
  { name: "Danielle R.", text: "The silk press was flawless. She really understood my hair texture and what it needed.", stars: 5 },
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

  const onSubmit = () => {
    toast({
      title: "Appointment Requested",
      description: "Thank you! We'll be in touch shortly to confirm your hair appointment.",
    });
    form.reset();
  };

  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Page Header */}
      <div className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">The Studio</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-5">Hair Studio</h1>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-secondary/60" />
            <Scissors className="text-secondary w-5 h-5" />
            <div className="h-px w-16 bg-secondary/60" />
          </div>
          <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
            Luxury hair care tailored to your unique style — from precision cuts to transformative color.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-24 space-y-24">

        {/* Services Grid */}
        <section>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-serif text-3xl text-white mb-10 text-center"
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card
                  data-testid={`card-service-${i}`}
                  className="bg-card border-border/60 hover:border-secondary/70 transition-all duration-300 h-full rounded-none group"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-xl text-white group-hover:text-secondary transition-colors">
                      {s.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/50 text-sm mb-4 leading-relaxed">{s.desc}</p>
                    <span className="text-secondary font-semibold text-sm tracking-wide">{s.price}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Guide */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Transparent Pricing</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">Pricing Guide</h2>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="max-w-2xl mx-auto bg-card border border-border/60 rounded-none"
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
            <div className="px-8 py-5 bg-primary/10 border-t border-primary/30">
              <p className="text-white/50 text-xs leading-relaxed">
                Prices are estimates and may vary based on hair length, density, and condition. Consultation required for extensions and color corrections.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Booking / Scheduler */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Schedule Your Visit</p>
              <h2 className="font-serif text-4xl text-white mb-6">Book an Appointment</h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Reserve your spot today. A security deposit secures your booking. We'll confirm your appointment within 24 hours.
              </p>
              <div className="bg-secondary/10 border-l-4 border-secondary p-6 mb-8">
                <h4 className="font-serif text-secondary mb-2">Security Deposit</h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  All hair appointments require a deposit to confirm your booking. Deposits are applied to your service total.
                </p>
              </div>
              <Button
                data-testid="button-deposit"
                variant="outline"
                size="lg"
                className="border-secondary text-secondary hover:bg-secondary hover:text-black rounded-none px-10 py-6 text-base tracking-widest uppercase w-full sm:w-auto"
              >
                Pay Security Deposit
              </Button>
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
                            <SelectValue placeholder="Select Service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border rounded-none">
                          <SelectItem value="haircut">Precision Haircut</SelectItem>
                          <SelectItem value="color">Custom Coloring</SelectItem>
                          <SelectItem value="styling">Luxury Styling</SelectItem>
                          <SelectItem value="bridal">Bridal & Events</SelectItem>
                          <SelectItem value="treatment">Treatment</SelectItem>
                          <SelectItem value="extensions">Extensions</SelectItem>
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
                          className="bg-background rounded-none border-border/60 focus-visible:ring-primary text-white/60 py-5"
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
                          placeholder="Any specific requests or notes?"
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
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-none py-6 tracking-widest uppercase text-sm mt-2"
                  >
                    Request Appointment
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Our Work</p>
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
                    alt={`Hair style ${i + 1}`}
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
