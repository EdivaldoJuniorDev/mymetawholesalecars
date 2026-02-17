import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { Phone, MapPin, Clock, MessageSquare, ChevronRight, Star, Menu, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Import assets
import heroBg from "../assets/hero-bg.png";
import cargoVan from "../assets/cargo-van.png";
import luxurySedan from "../assets/luxury-sedan.png";
import suv from "../assets/suv.png";
import showroom from "../assets/showroom.png";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-out-cubic",
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-body selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md py-4 border-b border-white/5 shadow-lg" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-display font-bold text-white tracking-wider cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            POMPANO<span className="text-primary">WHOLESALE</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["Inventory", "Why Us", "Fleet", "Financing", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                className="text-sm font-semibold uppercase tracking-widest hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
            <Button className="bg-primary text-black font-bold hover:bg-primary/90 hover:scale-105 transition-all duration-300 gold-glow rounded-none px-6">
              <Phone className="w-4 h-4 mr-2" /> (555) 123-4567
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5 shadow-2xl">
            {["Inventory", "Why Us", "Fleet", "Financing", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                className="text-left text-lg font-display uppercase tracking-wider py-3 border-b border-white/5 hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
            <Button className="w-full bg-primary text-black font-bold mt-4 rounded-none py-6 text-lg">
              CALL NOW
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Fallback image if video fails or loads slow */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 px-4 text-center mt-16">
          <div 
            data-aos="fade-up" 
            className="inline-block mb-6 px-4 py-2 border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.2em]"
          >
            ⭐ Pompano Beach's #1 Wholesale Dealer
          </div>
          
          <h1 
            data-aos="fade-up" 
            data-aos-delay="100"
            className="text-5xl md:text-7xl lg:text-9xl font-display font-black text-white mb-6 leading-[0.9] drop-shadow-2xl"
          >
            PREMIUM VEHICLES.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">WHOLESALE PRICES.</span><br />
            <span className="text-primary">NO GAMES.</span>
          </h1>
          
          <p 
            data-aos="fade-up" 
            data-aos-delay="200"
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-md"
          >
            Cargo vans, lease returns and luxury cars for individuals and businesses across South Florida. 
            Financing available. Drive today.
          </p>
          
          <div 
            data-aos="fade-up" 
            data-aos-delay="300"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={() => scrollToSection('inventory')}
              className="bg-primary text-black font-bold text-lg px-10 py-7 hover:bg-primary/90 hover:scale-105 transition-all duration-300 gold-glow rounded-none shadow-xl"
            >
              BROWSE INVENTORY
            </Button>
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 font-bold text-lg px-10 py-7 rounded-none backdrop-blur-sm transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5 mr-2" /> CHAT ON WHATSAPP
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-primary/70 cursor-pointer" onClick={() => scrollToSection('inventory')}>
          <ChevronRight className="w-10 h-10 rotate-90" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-card border-y border-white/5 relative z-20 -mt-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Vehicles Sold", value: 500, suffix: "+" },
              { label: "Years in Biz", value: 12, suffix: "+" },
              { label: "Satisfaction", value: 98, suffix: "%" },
              { label: "Hidden Fees", value: 0, prefix: "$" },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="text-center md:border-r border-primary/20 last:border-0"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="text-4xl md:text-6xl font-display font-bold text-white mb-2">
                  {stat.prefix}
                  <CountUp end={stat.value} duration={3} enableScrollSpy scrollSpyOnce />
                  {stat.suffix}
                </div>
                <div className="text-gray-500 text-sm uppercase tracking-widest font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <section id="inventory" className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-3">Our Inventory</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">HANDPICKED VEHICLES</h3>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Every unit is thoroughly inspected, serviced, and priced to move fast.</p>
          </div>

          <Tabs defaultValue="all" className="w-full mb-12" data-aos="fade-up">
            <div className="flex justify-center mb-10 overflow-x-auto pb-4 md:pb-0">
              <TabsList className="bg-card/50 border border-white/5 rounded-none p-1 h-auto flex-wrap justify-center">
                {["all", "cargo-vans", "luxury", "suvs"].map((tab) => (
                  <TabsTrigger 
                    key={tab} 
                    value={tab}
                    className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-black text-gray-400 px-6 py-3 font-display uppercase tracking-wider text-sm md:text-base flex-shrink-0"
                  >
                    {tab.replace("-", " ")}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "2023 Ford Transit 250", price: "$42,900", img: cargoVan, type: "Cargo Van", miles: "12k" },
                  { title: "2022 Mercedes S580", price: "$89,500", img: luxurySedan, type: "Luxury", miles: "18k" },
                  { title: "2024 BMW X5 M-Sport", price: "$76,200", img: suv, type: "SUV", miles: "5k" },
                  { title: "2021 Ram ProMaster", price: "$38,500", img: cargoVan, type: "Cargo Van", miles: "45k" },
                  { title: "2023 Audi Q8", price: "$68,900", img: suv, type: "SUV", miles: "22k" },
                  { title: "2022 Porsche Panamera", price: "$92,000", img: luxurySedan, type: "Luxury", miles: "15k" },
                ].map((car, i) => (
                  <Card 
                    key={i} 
                    className="bg-card border-white/5 rounded-none overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/10"
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                  >
                    <div className="relative aspect-video overflow-hidden bg-black/50">
                      <Badge className="absolute top-4 left-4 z-10 bg-primary text-black font-bold rounded-none hover:bg-primary shadow-lg">
                        AVAILABLE
                      </Badge>
                      <img 
                        src={car.img} 
                        alt={car.title} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold rounded-none py-6">
                          VIEW DETAILS
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-display font-bold text-2xl text-white mb-1 group-hover:text-primary transition-colors">{car.title}</h4>
                          <div className="flex gap-4 text-xs text-gray-500 font-mono uppercase tracking-wide">
                            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> POMPANO</span>
                            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {car.miles}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-3xl font-display font-bold text-primary mb-4">{car.price}</div>
                      <div className="pt-4 border-t border-white/5 flex gap-2 flex-wrap">
                        <Badge variant="outline" className="border-white/10 text-gray-400 rounded-none font-normal px-2 py-1">Clean Title</Badge>
                        <Badge variant="outline" className="border-white/10 text-gray-400 rounded-none font-normal px-2 py-1">One Owner</Badge>
                        <Badge variant="outline" className="border-white/10 text-gray-400 rounded-none font-normal px-2 py-1">Warranty</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {/* Duplicate content for demo purposes as requested */}
            <TabsContent value="cargo-vans" className="mt-0">
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { title: "2023 Ford Transit 250", price: "$42,900", img: cargoVan, type: "Cargo Van", miles: "12k" },
                    { title: "2021 Ram ProMaster", price: "$38,500", img: cargoVan, type: "Cargo Van", miles: "45k" },
                  ].map((car, i) => (
                    <Card key={i} className="bg-card border-white/5 rounded-none overflow-hidden group hover:border-primary/50 transition-all duration-300">
                      <div className="relative aspect-video overflow-hidden bg-black/50">
                        <Badge className="absolute top-4 left-4 z-10 bg-primary text-black font-bold rounded-none hover:bg-primary">AVAILABLE</Badge>
                        <img src={car.img} alt={car.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold rounded-none py-6">VIEW DETAILS</Button>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h4 className="font-display font-bold text-2xl text-white mb-1">{car.title}</h4>
                        <div className="text-3xl font-display font-bold text-primary">{car.price}</div>
                      </CardContent>
                    </Card>
                  ))}
               </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 font-display text-xl uppercase tracking-wider px-12 py-7 rounded-none transition-all hover:border-primary hover:text-primary">
              See Full Inventory <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-24 bg-card border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group" data-aos="fade-right">
              <div className="absolute -inset-4 bg-primary/20 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <img src={showroom} alt="Showroom" loading="lazy" className="relative w-full grayscale contrast-125 border border-white/10 shadow-2xl z-10" />
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 border border-white/10 z-20 shadow-lg">
                <div className="text-black font-display font-bold text-3xl uppercase leading-none text-center">
                  Licensed &<br/>Bonded<br/>Dealer FL
                </div>
              </div>
            </div>
            
            <div data-aos="fade-left">
              <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-3">Why Choose Us</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">THE SMART WAY TO BUY YOUR NEXT VEHICLE</h3>
              
              <div className="space-y-8">
                {[
                  { title: "Wholesale Pricing", desc: "Direct dealer prices, zero pressure sales environment. No haggle necessary." },
                  { title: "Cargo Van Specialists", desc: "Largest selection of commercial units in Broward County. We understand business needs." },
                  { title: "Flexible Financing", desc: "All credit types welcome. We work with 20+ lenders to get you approved." },
                  { title: "Every Vehicle Inspected", desc: "Clean title guarantee on every single unit sold. Buy with absolute confidence." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-14 h-14 bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                      <Check className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xl text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at center, #333 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6" data-aos="fade-up">
            <div className="max-w-2xl">
              <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-3">Business Owners & Contractors</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">NEED A WORK VAN?<br/>WE'VE GOT FLEET PRICING.</h3>
              <p className="text-gray-400 text-lg">Ford Transit, Ram ProMaster, Mercedes Sprinter. Ready to work immediately.</p>
            </div>
            <Button className="bg-primary text-black font-bold text-lg px-10 py-7 hover:bg-primary/90 rounded-none whitespace-nowrap shadow-lg gold-glow">
              GET FLEET PRICING
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Fleet Discounts", desc: "Buy 2+ units and unlock wholesale fleet pricing tiers immediately." },
              { title: "Clean Titles", desc: "Ready for commercial registration and insurance. No salvage nonsense." },
              { title: "Quick Turnaround", desc: "Most units ready same-day. We respect your time and business needs." }
            ].map((card, i) => (
              <Card key={i} className="bg-white/5 border-white/10 rounded-none p-10 hover:bg-white/10 transition-colors group" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="mb-6 w-16 h-1 bg-primary group-hover:w-full transition-all duration-500"></div>
                <h4 className="font-display font-bold text-2xl text-white mb-4">{card.title}</h4>
                <p className="text-gray-400 leading-relaxed">{card.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-3">What Our Customers Say</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-16">REAL PEOPLE. REAL DEALS.</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Bought my Transit here and couldn't be happier. The process was fast, no hidden fees, and the van runs perfectly. Will be back for another one soon.", name: "Carlos M.", role: "Contractor, Miami FL" },
              { text: "Honest dealership. They showed me the Carfax upfront and let me take the car to my mechanic. Price was exactly as advertised.", name: "Sarah J.", role: "Business Owner, Boca Raton" },
              { text: "Best car buying experience I've ever had. No pressure, great selection of luxury cars. Got me approved when others said no.", name: "David R.", role: "Fort Lauderdale" }
            ].map((review, i) => (
              <Card key={i} className="glass-card rounded-none p-8 text-left border-t-4 border-t-primary" data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="flex text-primary mb-6">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-300 italic mb-8 leading-relaxed text-lg">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-xl text-primary border border-white/5">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{review.name}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-bold">{review.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-2 text-gray-400">
            <Star className="w-5 h-5 text-primary fill-current" />
            <span className="font-bold text-white">4.8/5</span>
            <span>Based on 87 Google Reviews</span>
          </div>
        </div>
      </section>

      {/* Financing Band */}
      <section id="financing" className="py-24 bg-primary text-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="text-center md:text-left max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-display font-black mb-4 tracking-tight">DON'T LET CREDIT STOP YOU.</h2>
            <p className="text-xl md:text-2xl font-bold opacity-80">Get pre-approved in minutes — no commitment required.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
            <Button className="bg-black text-white font-bold text-xl px-12 py-8 hover:bg-black/80 rounded-none shadow-2xl border-2 border-black w-full md:w-auto hover:scale-105 transition-transform duration-300">
              APPLY FOR FINANCING <ChevronRight className="ml-2" />
            </Button>
            <div className="flex gap-3 text-xs md:text-sm font-bold opacity-70 uppercase tracking-wider flex-wrap justify-center">
              <span className="flex items-center"><Check className="w-4 h-4 mr-1" /> Quick Application</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center"><Check className="w-4 h-4 mr-1" /> Soft Credit Check</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center"><Check className="w-4 h-4 mr-1" /> Same-day Decision</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div data-aos="fade-right">
              <h3 className="text-4xl font-display font-bold text-white mb-8">SEND US A MESSAGE</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Name</label>
                    <Input className="bg-card border-white/10 rounded-none h-14 focus:border-primary text-white text-lg px-4" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone</label>
                    <Input className="bg-card border-white/10 rounded-none h-14 focus:border-primary text-white text-lg px-4" placeholder="(555) 555-5555" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email</label>
                  <Input className="bg-card border-white/10 rounded-none h-14 focus:border-primary text-white text-lg px-4" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Interested In</label>
                  <Select>
                    <SelectTrigger className="bg-card border-white/10 rounded-none h-14 focus:border-primary text-white text-lg px-4">
                      <SelectValue placeholder="Select Vehicle Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cargo">Cargo Van</SelectItem>
                      <SelectItem value="luxury">Luxury Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="fleet">Fleet Purchase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Message</label>
                  <Textarea className="bg-card border-white/10 rounded-none min-h-[150px] focus:border-primary text-white text-lg p-4" placeholder="I'm interested in..." />
                </div>
                <Button className="w-full bg-primary text-black font-bold h-16 text-xl hover:bg-primary/90 rounded-none shadow-lg mt-4">
                  SEND MESSAGE
                </Button>
              </form>
            </div>

            <div data-aos="fade-left">
              <h3 className="text-4xl font-display font-bold text-white mb-8">VISIT OUR SHOWROOM</h3>
              <div className="space-y-8 mb-12">
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-card flex items-center justify-center shrink-0 border border-white/10 text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl text-white mb-1">LOCATION</h4>
                    <p className="text-gray-400 text-lg">1234 N Federal Hwy<br/>Pompano Beach, FL 33062</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-card flex items-center justify-center shrink-0 border border-white/10 text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl text-white mb-1">CONTACT</h4>
                    <p className="text-gray-400 text-lg">(555) 123-4567<br/>sales@pompanowholesale.com</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-card flex items-center justify-center shrink-0 border border-white/10 text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl text-white mb-1">HOURS</h4>
                    <p className="text-gray-400 text-lg">Mon–Sat: 9AM – 7PM<br/>Sunday: 10AM – 5PM</p>
                  </div>
                </div>
              </div>
              
              <div className="h-[350px] bg-card border border-white/10 relative grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden group">
                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                  <span className="text-gray-600 font-display text-2xl uppercase tracking-widest z-10 relative">Google Maps Embed</span>
                  <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Pompano_Beach_FL_map.png')] bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-bounce">
                    <MapPin className="w-12 h-12 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="text-3xl font-display font-bold text-white tracking-wider mb-6">
                POMPANO<span className="text-primary">WHOLESALE</span>
              </div>
              <p className="text-gray-500 leading-relaxed max-w-md text-lg">
                South Florida's premier wholesale automotive dealer. We specialize in clean title lease returns, commercial fleets, and luxury imports. No games, just great prices.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-4 text-gray-500">
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => scrollToSection('inventory')}>Browse Inventory</li>
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => scrollToSection('financing')}>Apply for Financing</li>
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => scrollToSection('fleet')}>Fleet Program</li>
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => scrollToSection('why-us')}>About Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-lg mb-6 uppercase tracking-wider">Stay Updated</h4>
              <p className="text-gray-500 mb-4">Join our VIP list for new arrivals.</p>
              <div className="flex">
                <Input placeholder="Enter your email" className="bg-white/5 border-white/10 rounded-none focus:border-primary text-white border-r-0" />
                <Button className="bg-primary text-black font-bold rounded-none hover:bg-primary/90 px-6">JOIN</Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between text-gray-600 text-sm items-center">
            <p className="mb-4 md:mb-0">© 2026 Pompano Wholesale Auto. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-white cursor-pointer transition-colors">Sitemap</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
