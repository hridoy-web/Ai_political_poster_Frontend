import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqData } from "../home.service";


export function FaqSection() {
  return (
    <section className="max-w-3xl lg:max-w-4xl mx-auto py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-14">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-10 space-y-2">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          সাধারণ জিজ্ঞাসা (<span className="text-gradient-brand">FAQ</span>)
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
          আপনাদের যেকোনো প্রশ্ন বা উত্তর জানতে নিচে দেখতে পারেন
        </p>
      </div>

      {/* Accordion List */}
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full space-y-3.5"
      >
        {faqData.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={
              "border rounded-2xl px-5 py-0.5 shadow-sm transition-all duration-300 backdrop-blur-md " +
              /* ☀️ LIGHT THEME DESIGN: Glass White Card with Emerald Borders */
              "bg-white/80 border-brand-green/20 hover:border-brand-green/40 data-[state=open]:border-brand-green/60 data-[state=open]:shadow-md " +
              /* 🌙 DARK THEME DESIGN: #0c131d Glass Slate with Mint Glowing Borders */
              "dark:bg-(--card)/80 dark:border-white/10 dark:hover:border-brand-mint/40 dark:data-[state=open]:border-brand-mint/60 dark:data-[state=open]:bg-card/95 dark:data-[state=open]:shadow-[0_0_15px_rgba(16,185,129,0.12)]"
            }
          >
            <AccordionTrigger className="cursor-pointer font-semibold text-foreground hover:text-brand-green dark:hover:text-brand-mint transition-colors py-4 text-left text-sm sm:text-base no-underline hover:no-underline border-none">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-xs sm:text-sm leading-relaxed pb-4 pt-1 border-t border-border/40 mt-1">
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
