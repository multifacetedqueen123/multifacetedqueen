import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Clock, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { SiTiktok } from "react-icons/si";
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
  interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", interest: "", message: "" },
  });

  const onSubmit = () => {
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out! We'll get back to you within 1–2 business days.",
    });
    form.reset();
  };

  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Page Header */}
      <div className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-4">Get in Touch</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-5">Contact Us</h1>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-primary/60" />
            <Mail className="text-primary w-5 h-5" />
            <div className="h-px w-16 bg-primary/60" />
          </div>
          <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
            We'd love to hear from you. Reach out to schedule a consultation or ask any questions about our services.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info column */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center shrink-0">
                  <MapPin className="text-secondary w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-white mb-2">Location</h4>
                  <p className="text-white/55 leading-relaxed">123 Luxury Lane, Suite 100<br />Beverly Hills, CA 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Phone className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-white mb-2">Phone</h4>
                  <p className="text-white/55">(555) 000-0000</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center shrink-0">
                  <Mail className="text-secondary w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-white mb-2">Email</h4>
                  <p className="text-white/55">info@creativestudio.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Clock className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-white mb-3">Business Hours</h4>
                  <table className="text-white/55 text-sm w-full max-w-[220px]">
                    <tbody>
                      <tr>
                        <td className="py-1.5 pr-8">Monday – Friday</td>
                        <td className="text-right text-secondary">9:00 AM – 7:00 PM</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 pr-8">Saturday</td>
                        <td className="text-right text-secondary">9:00 AM – 5:00 PM</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 pr-8">Sunday</td>
                        <td className="text-right text-white/35">By Appointment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Follow Along</p>
              <div className="flex gap-3">
                <a
                  href="#"
                  data-testid="link-instagram"
                  className="w-11 h-11 rounded-full border border-border/50 flex items-center justify-center text-white/50 hover:bg-primary hover:border-primary hover:text-white transition-all"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  data-testid="link-facebook"
                  className="w-11 h-11 rounded-full border border-border/50 flex items-center justify-center text-white/50 hover:bg-primary hover:border-primary hover:text-white transition-all"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  data-testid="link-tiktok"
                  className="w-11 h-11 rounded-full border border-border/50 flex items-center justify-center text-white/50 hover:bg-primary hover:border-primary hover:text-white transition-all"
                >
                  <SiTiktok size={18} />
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-10 bg-card border border-border/60 h-56 flex flex-col items-center justify-center gap-3 text-white/30">
              <MapPin className="w-8 h-8 text-secondary/40" />
              <span className="text-sm tracking-widest uppercase">Map Coming Soon</span>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-card border border-border/60 p-8 md:p-10 h-fit"
          >
            <h3 className="font-serif text-2xl text-white mb-2">Send a Message</h3>
            <p className="text-white/40 text-sm mb-8">We'll respond within 1–2 business days.</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input data-testid="input-name" placeholder="Your Name" className="bg-background rounded-none border-border/60 py-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input data-testid="input-email" placeholder="Your Email" type="email" className="bg-background rounded-none border-border/60 py-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input data-testid="input-phone" placeholder="Your Phone (optional)" className="bg-background rounded-none border-border/60 py-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="interest" render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-interest" className="bg-background rounded-none border-border/60 text-white/60 py-6">
                            <SelectValue placeholder="Area of Interest" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border rounded-none">
                          <SelectItem value="hair">Hair Services</SelectItem>
                          <SelectItem value="crafting">Crafting / Custom Items</SelectItem>
                          <SelectItem value="alterations">Alterations</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        data-testid="textarea-message"
                        placeholder="How can we help you?"
                        className="bg-background rounded-none border-border/60 resize-none"
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button
                  data-testid="button-submit-contact"
                  type="submit"
                  size="lg"
                  className="w-full bg-secondary hover:bg-secondary/90 text-black font-bold rounded-none py-7 tracking-widest uppercase text-sm"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
