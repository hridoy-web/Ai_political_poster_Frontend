"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  ArrowLeft, 
  Sparkles, 
  Target, 
  Zap, 
  ShieldCheck, 
  Users, 
  HeartHandshake, 
  Code2, 
  Palette,
  CheckCircle2
} from "lucide-react";

// Animation Variants (Strongly Typed for TypeScript)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background text-foreground">
      
      {/* Background Animated Gradient Blurs */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" 
      />
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="pointer-events-none absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-primary/15 blur-3xl" 
      />

      <div className="relative max-w-6xl mx-auto space-y-16">
        
        {/* Navigation / Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-card/60 backdrop-blur-md border border-border/80 px-4 py-2 rounded-full shadow-sm hover:border-primary/50 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            হোম পেজে ফিরুন
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-secondary text-secondary-foreground border border-primary/20 shadow-sm animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            AI Powered Poster Maker
          </span>
        </motion.div>

        {/* Hero Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            রাজনীতির ডিজিটাল প্রচারণায় <br />
            <span className="text-gradient-brand">স্মার্ট ও যুগান্তকারী পদক্ষেপ</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-xl leading-relaxed">
            রাজনৈতিক দল, সংগঠন এবং অনুমোদিত কর্মীদের জন্য বাংলা-সমর্থিত আধুনিক ডিজিটাল পোস্টার তৈরির একটি নিরাপদ ও স্বয়ংসম্পূর্ণ প্ল্যাটফর্ম।
          </p>
        </motion.div>

        {/* Mission & Vision Section (Interactive Hover Cards) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Mission Card */}
          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card/50 p-8 backdrop-blur-xl shadow-lg hover:border-primary/50 hover:shadow-primary/10 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-primary/10 transition-all duration-500 group-hover:scale-150" />
            <div className="relative space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">আমাদের মূল লক্ষ্য</h2>
              <p className="text-muted-foreground leading-relaxed">
                বাংলাদেশের রাজনৈতিক কর্মী ও সাধারণ মানুষের প্রচারণাকে অতি সহজে, দ্রুত ও দৃষ্টিনন্দন করে তোলা। কোনো জটিল ফটোশপ বা অভিজ্ঞ ডিজাইনারের সাহায্য ছাড়াই যেন নিখুঁত বাংলা ফন্টে যেকোনো পোস্টার বানিয়ে নেওয়া যায়—তা নিশ্চিত করাই আমাদের অঙ্গীকার।
              </p>
            </div>
          </motion.div>

          {/* Technology Card */}
          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card/50 p-8 backdrop-blur-xl shadow-lg hover:border-primary/50 hover:shadow-primary/10 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-primary/10 transition-all duration-500 group-hover:scale-150" />
            <div className="relative space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                <Zap className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">আমাদের প্রযুক্তি ও সুবিধা</h2>
              <p className="text-muted-foreground leading-relaxed">
                বাংলা যুক্তবর্ণ, কারচিহ্ন এবং নিখুঁত দলীয় প্রতীক রেন্ডারিং নিশ্চিত করতে আমাদের রয়েছে অটোমেটেড HTML/CSS ও Puppeteer ইঞ্জিন। মাত্র ৫ মিনিটে পছন্দের টেমপ্লেট বাছাই করে তথ্য দিয়ে হাই-কোয়ালিটি PNG ছবি তৈরি ও ডাউনলোড করতে পারবেন।
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Highlights Grid */}
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              প্ল্যাটফর্মের মূল বৈশিষ্ট্যসমূহ
            </h2>
            <p className="text-muted-foreground">নিরাপত্তা, গতি ও অভিজ্ঞতার এক অনন্য সমন্বয়</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <motion.div 
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-md shadow-sm hover:border-primary/40 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">উচ্চ নিরাপত্তা ও ডেটা সুরক্ষা</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                ব্যক্তিগত ছবি ও পোস্টার ইতিহাস সম্পূর্ণ সুরক্ষিত। অন্যের ডেটা বা অপ্রকাশিত ছবি দেখার কোনো সুযোগ নেই।
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-md shadow-sm hover:border-primary/40 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">অনুমোদিত রাজনৈতিক টেমপ্লেট</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                রাজনৈতিক দল, কাউন্সিল, সভা, ইশতেহার ও জাতীয় দিবসের জন্য নিবেদিত শতশত আধুনিক প্রি-ডিজাইনড লেআউট।
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-md shadow-sm hover:border-primary/40 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">মোবাইল ফ্রেন্ডলি ইউজার এক্সপেরিয়েন্স</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                মোবাইল কিংবা ডেক্সটপ যেকোনো ডিভাইস থেকে মাত্র ৩টি সহজ ধাপে মুহূর্তের মধ্যে পোস্টার প্রস্তুত করা যায়।
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Developer Team Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-border/80 bg-linear-to-br from-card/80 to-card/30 p-8 sm:p-12 backdrop-blur-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Code2 className="w-4 h-4" />
                Engineering & Design
              </div>
              <h2 className="text-3xl font-bold tracking-tight">আমাদের দক্ষ ডেভেলপমেন্ট টিম</h2>
              <p className="text-muted-foreground leading-relaxed">
                এই প্ল্যাটফর্মটি একটি নিবেদিত টিম দ্বারা নিয়মিত আপডেট ও রক্ষণাবেক্ষণ করা হয়। সর্বাধুনিক AI টুলস, রেসপন্সিভ ডিজাইন ও সুরক্ষিত ব্যাকএন্ড আর্কিটেকচার ব্যবহার করে প্ল্যাটফর্মটিকে প্রতিনিয়ত সমৃদ্ধ করা হচ্ছে।
              </p>
              
              <div className="pt-2 grid grid-cols-2 gap-3 text-sm font-medium">
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Next.js & React Engine
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Express & Prisma Backend
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Puppeteer Image Renderer
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  AI Slogan & BG Helper
                </div>
              </div>
            </div>

            {/* CTA Box inside Developer Section */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-brand text-white text-center space-y-4 shadow-lg"
            >
              <Users className="w-10 h-10 opacity-90" />
              <h3 className="text-xl font-bold">এখনই পোস্টার বানান!</h3>
              <p className="text-xs opacity-90">কোনো চার্জ ছাড়াই প্রথম ৩টি পোস্টার বিনামূল্যে তৈরি করুন</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-emerald-900 hover:bg-slate-100 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-xl"
              >
                টেমপ্লেটগুলো দেখুন
              </Link>
            </motion.div>

          </div>
        </motion.div>

        {/* Bottom Back Button Bar */}
        <div className="flex justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            হোম পেজে ফিরে গিয়ে আপনার পোস্টার তৈরি শুরু করুন
          </Link>
        </div>

      </div>
    </div>
  );
}