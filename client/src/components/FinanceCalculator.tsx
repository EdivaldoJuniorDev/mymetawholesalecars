import React, { useState, useEffect } from 'react';
import { ShieldCheck, MessageSquare, ChevronDown, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Hook for mobile detection (simple version)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

export const FinanceCalculator: React.FC = () => {
    const isMobile = useIsMobile();
    
    // State with Lazy Initialization from LocalStorage
    const [vehiclePrice, setVehiclePrice] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('fc_vehiclePrice');
            return saved ? Number(saved) : 25000;
        }
        return 25000;
    });
    const [downPayment, setDownPayment] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('fc_downPayment');
            return saved ? Number(saved) : 2500;
        }
        return 2500;
    });
    const [creditScore, setCreditScore] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('fc_creditScore') || 'good';
        }
        return 'good';
    });
    const [qualifications, setQualifications] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('fc_qualifications');
            return saved ? JSON.parse(saved) : { hasJob: true, hasIncome: true, hasLicense: true, hasBank: true };
        }
        return { hasJob: true, hasIncome: true, hasLicense: true, hasBank: true };
    });
    const [loanTerm, setLoanTerm] = useState(() => {
         if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('fc_loanTerm');
            return saved ? Number(saved) : 60;
        }
        return 60;
    });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Persistence Effect
    useEffect(() => {
        localStorage.setItem('fc_vehiclePrice', vehiclePrice.toString());
        localStorage.setItem('fc_downPayment', downPayment.toString());
        localStorage.setItem('fc_creditScore', creditScore);
        localStorage.setItem('fc_loanTerm', loanTerm.toString());
        localStorage.setItem('fc_qualifications', JSON.stringify(qualifications));
    }, [vehiclePrice, downPayment, creditScore, loanTerm, qualifications]);

    
    // Derived State / Constants
    // Simple mapping for demo purposes. Real app might fetch rates.
    const baseRate = 6.9; 
    const creditAdjustments: Record<string, number> = {
        excellent: 0,
        good: 2.0,
        fair: 5.0,
        poor: 10.0
    };
    const interestRate = baseRate + (creditAdjustments[creditScore] || 0);

    const [monthlyPayment, setMonthlyPayment] = useState(0);

    useEffect(() => {
        // Amortization Calculation
        const principal = vehiclePrice - downPayment;
        if (principal <= 0) {
            setMonthlyPayment(0);
            return;
        }
        
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm;
        
        let payment;
        if (monthlyRate === 0) {
            payment = principal / numberOfPayments;
        } else {
            // Formula: P * r * (1+r)^n / ((1+r)^n - 1)
            payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }
        
        setMonthlyPayment(isFinite(payment) ? payment : 0);
    }, [vehiclePrice, downPayment, interestRate, loanTerm]);

    // Qualification Logic (Derived State)
    const qualificationCount = Object.values(qualifications).filter(Boolean).length;
    const isHighCredit = ['excellent', 'good'].includes(creditScore);
    
    let qualificationStatus = {
        label: "Contact Specialist",
        color: "text-gray-400",
        bg: "bg-gray-400/10",
        border: "border-gray-400/20",
        message: "Complete 4/4 checks for instant pre-approval."
    };

    if (qualificationCount === 4 && isHighCredit) {
        qualificationStatus = {
            label: "INSTANT PRE-APPROVAL",
            color: "text-green-400",
            bg: "bg-green-400/10",
            border: "border-green-400/30",
            message: "Excellent! Your profile meets all instant criteria."
        };
    } else if (qualificationCount >= 3) {
        qualificationStatus = {
            label: "HIGHLY QUALIFIED",
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/30",
            message: "Strong profile. Minimal documentation required."
        };
    } else if (qualificationCount >= 1) {
        qualificationStatus = {
            label: "LIKELY QUALIFIED",
            color: "text-primary",
            bg: "bg-primary/10",
            border: "border-primary/30",
            message: "We have secondary lenders for your profile."
        };
    }

    // Formatters
    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    useEffect(() => {
        AOS.init();
    }, []);


  return (
    <section 
      id="finance-calculator" 
      className="calculator-section relative overflow-hidden" 
      itemScope 
      itemType="https://schema.org/FinancialProduct"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black z-0" />
      
      <div className="container relative z-10 mx-auto px-4 py-16">
        
        {/* FOMO Badge & Headline */}
        <div className="text-center mb-12" data-aos="fade-up">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-900/30 border border-red-500/30 text-red-400 font-bold text-sm mb-6 animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              ⚡ 87 people used this calculator today
           </div>

           <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-4 drop-shadow-xl" itemProp="name">
             SEE YOUR PAYMENT IN 30 SECONDS
           </h2>
           <p className="text-gray-400 text-lg md:text-xl font-light">
             No impact to your credit score. Instant estimate.
           </p>
        </div>

        {/* Main Grid: Inputs (Left) vs Results (Right/Drawer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          <TooltipProvider>
          {/* LEFT COLUMN - INPUTS (Glass Card) */}
          <div className="lg:col-span-7" data-aos="fade-right">
             <div className="calculator-card relative">
                {/* Decorative border gradient */}
                <div className="absolute inset-0 rounded-2xl p-px bg-linear-to-tr from-primary/50 to-transparent pointer-events-none" />
                

                    {/* INPUTS GROUP */}
                    <div className="space-y-6 p-6 md:p-8 bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-white/10">
                        
                        {/* Vehicle Price */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Label className="text-gray-300 font-bold text-lg">Vehicle Price</Label>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="w-4 h-4 text-gray-500 hover:text-white transition-colors" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-black border border-white/10 text-white">
                                            <p>The total price of the vehicle you want to purchase.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <div className="relative w-32">
                                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                     <Input 
                                        type="number" 
                                        value={vehiclePrice}
                                        onChange={(e) => setVehiclePrice(Number(e.target.value))}
                                        onBlur={() => {
                                            if (vehiclePrice < 5000) setVehiclePrice(5000);
                                            if (vehiclePrice > 150000) setVehiclePrice(150000);
                                        }}
                                        className="pl-6 bg-white/10 border-white/20 text-white font-bold"
                                     />
                                </div>
                            </div>
                            <Slider 
                                value={[vehiclePrice]} 
                                min={5000} 
                                max={150000} 
                                step={500} 
                                onValueChange={(val) => setVehiclePrice(val[0])}
                                className="py-4"
                            />
                        </div>

                        {/* Down Payment */}
                        <div className="space-y-3">
                             <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Label className="text-gray-300 font-bold text-lg">Down Payment</Label>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="w-4 h-4 text-gray-500 hover:text-white transition-colors" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-black border border-white/10 text-white">
                                            <p>Higher down payment reduces your monthly payment.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <div className="relative w-32">
                                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                     <Input 
                                        type="number" 
                                        value={downPayment} 
                                        onChange={(e) => setDownPayment(Number(e.target.value))}
                                        onBlur={() => {
                                            if (downPayment < 0) setDownPayment(0);
                                            if (downPayment > vehiclePrice * 0.9) setDownPayment(vehiclePrice * 0.9);
                                        }}
                                        className="pl-6 bg-white/10 border-white/20 text-white font-bold"
                                     />
                                </div>
                             </div>
                             <Slider 
                                value={[downPayment]} 
                                min={0} 
                                max={vehiclePrice * 0.8} // Max 80% down
                                step={100} 
                                onValueChange={(val) => setDownPayment(val[0])}
                                className="py-4"
                            />
                        </div>

                         {/* Credit Score & Term Grid */}
                         {/* Credit Score & Term Grid */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label className="text-gray-300 font-bold">Credit Score</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['excellent', 'good', 'fair', 'poor'].map((score) => (
                                        <button
                                            key={score}
                                            onClick={() => setCreditScore(score)}
                                            className={cn(
                                                "px-2 py-2 text-sm font-bold rounded-md border transition-all duration-200",
                                                creditScore === score 
                                                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                                                    : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/30"
                                            )}
                                        >
                                            {score.charAt(0).toUpperCase() + score.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                             <div className="space-y-3">
                                <Label className="text-gray-300 font-bold">Loan Term</Label>
                                <select 
                                    className="w-full h-[88px] bg-white/5 border border-white/10 rounded-md p-2 text-white font-bold focus:ring-primary focus:border-primary text-lg"
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                                >
                                    {[36, 48, 60, 72, 84].map(term => (
                                        <option key={term} value={term} className="bg-black">{term} Months</option>
                                    ))}
                                </select>
                            </div>
                         </div>

                         {/* Qualification Checkboxes */}
                         <div className="space-y-3 pt-4 border-t border-white/10">
                            <Label className="text-gray-300 font-bold mb-2 block">Do you have...</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    { key: 'hasJob', label: 'Steady Job' },
                                    { key: 'hasIncome', label: '$2k+ Monthly Income' },
                                    { key: 'hasLicense', label: 'Driver\'s License' },
                                    { key: 'hasBank', label: 'Bank Account' }
                                ].map((item) => (
                                    <div 
                                        key={item.key} 
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                                            qualifications[item.key as keyof typeof qualifications] 
                                                ? "bg-primary/10 border-primary text-primary" 
                                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                        )}
                                        onClick={() => setQualifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof qualifications] }))}
                                    >
                                        <div className={cn(
                                            "w-5 h-5 rounded flex items-center justify-center border",
                                            qualifications[item.key as keyof typeof qualifications] ? "bg-primary border-primary" : "border-gray-500"
                                        )}>
                                            {qualifications[item.key as keyof typeof qualifications] && <Check className="w-3 h-3 text-black font-bold" />}
                                        </div>
                                        <span className="font-medium text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                         </div>
                         
                         {/* Spacer for Mobile Sticky Footer */}
                         <div className="h-32 lg:hidden" />

                    </div>
             </div>
          </div>
          </TooltipProvider>

          {/* RIGHT COLUMN - RESULTS (Sticky Card or Mobile Drawer) */}
          <div className="lg:col-span-5 relative" data-aos="fade-left">
             
             {/* Desktop Sticky Card */}
             <div className="hidden lg:block sticky top-24">
               <div className="result-card shadow-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-linear-to-br from-primary via-yellow-500 to-yellow-600 opacity-90" />
                  
                  <div className="relative z-10 p-8 text-black">
                      {/* Qualification Badge */}
                      <div className={cn(
                          "inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 font-bold text-[10px] uppercase tracking-tighter shadow-sm",
                          // Desktop Override: Solid Black bg for contrast against Yellow card
                          "bg-black border-black/10",
                          qualificationStatus.color
                      )}>
                         <ShieldCheck className="w-3 h-3" />
                         {qualificationStatus.label}
                      </div>

                     <h3 className="text-xl font-bold opacity-80 mb-2 uppercase tracking-wider">Estimated Payment</h3>
                     <div className="text-7xl font-display font-black mb-1 leading-none">
                        ${Math.round(monthlyPayment)}<span className="text-3xl align-top text-black/60">/mo</span>
                     </div>
                     <p className="font-medium opacity-75 mb-6">for {loanTerm} months @ {interestRate.toFixed(1)}% APR</p>

                      <p className="text-xs font-bold mb-8 bg-black/5 p-3 rounded-lg border border-black/5 italic">
                        "{qualificationStatus.message}"
                      </p>

                     <div className="space-y-3 mb-8 border-t border-black/10 pt-6">
                        <div className="flex justify-between text-sm font-bold opacity-70">
                           <span>Vehicle Price</span>
                           <span>{formatCurrency(vehiclePrice)}</span>
                         </div>
                         <div className="flex justify-between text-sm font-bold opacity-70">
                           <span>Down Payment</span>
                           <span>-{formatCurrency(downPayment)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold opacity-70">
                           <span>Loan Amount</span>
                           <span>{formatCurrency(vehiclePrice - downPayment)}</span>
                        </div>
                     </div>

                     <Button className="w-full bg-black text-white hover:bg-gray-900 border-none h-14 text-lg font-bold shadow-lg transform transition-transform hover:scale-[1.02]">
                        GET PRE-APPROVED NOW
                     </Button>
                  </div>
               </div>
             </div>

             {/* Mobile Bottom Drawer Trigger (Sticky Footer) */}
             <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/90 backdrop-blur-lg border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] safe-area-bottom">
                 <div className="flex items-center justify-between gap-4">
                     <div>
                        <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Est. Payment</div>
                        <div className="text-2xl font-bold text-primary font-display">${Math.round(monthlyPayment)}<span className="text-sm text-gray-400">/mo</span></div>
                     </div>
                     <Button 
                        onClick={() => setIsDrawerOpen(true)}
                        className="bg-primary text-black font-bold whitespace-nowrap px-6"
                     >
                        See Details
                     </Button>
                 </div>
             </div>

             {/* Mobile Drawer Overlay */}
             {isDrawerOpen && (
                 <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
                     <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
                        onClick={() => setIsDrawerOpen(false)}
                     />
                     <div className="relative bg-zinc-900 border-t border-primary/30 rounded-t-3xl p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom duration-300">
                         <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" onClick={() => setIsDrawerOpen(false)} />
                         
                         <div className="space-y-6">
                             <div className="text-center">
                                 <div className={cn(
                                    "inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 font-bold text-[10px] uppercase tracking-tighter",
                                    qualificationStatus.bg,
                                    qualificationStatus.color,
                                    qualificationStatus.border
                                 )}>
                                    <ShieldCheck className="w-3 h-3" />
                                    {qualificationStatus.label}
                                 </div>
                                 <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Estimated Payment</h3>
                                 <div className="text-5xl font-display font-black text-primary">
                                    ${Math.round(monthlyPayment)}<span className="text-xl align-top text-gray-500">/mo</span>
                                 </div>
                                 <p className="text-gray-500 text-xs mt-2">for {loanTerm} months @ {interestRate.toFixed(1)}% APR</p>
                             </div>

                             <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
                                <div className="flex justify-between text-sm">
                                   <span className="text-gray-400">Vehicle Price</span>
                                   <span className="text-white font-bold">{formatCurrency(vehiclePrice)}</span>
                                </div>
                                 <div className="flex justify-between text-sm">
                                   <span className="text-gray-400">Down Payment</span>
                                   <span className="text-red-400 font-bold">-{formatCurrency(downPayment)}</span>
                                </div>
                                <div className="flex justify-between text-sm py-2 border-t border-white/5 mt-2">
                                   <span className="text-white font-bold">Loan Amount</span>
                                   <span className="text-primary font-bold">{formatCurrency(vehiclePrice - downPayment)}</span>
                                </div>
                             </div>

                             <Button className="w-full bg-primary text-black hover:bg-white border-none h-14 text-lg font-bold shadow-lg">
                                GET PRE-APPROVED NOW
                             </Button>
                             
                             <button 
                                onClick={() => setIsDrawerOpen(false)}
                                className="w-full text-gray-500 text-sm font-medium py-2"
                             >
                                Close
                             </button>
                         </div>
                     </div>
                 </div>
             )}

          </div>

        </div>
      </div>
    </section>
  );
};
