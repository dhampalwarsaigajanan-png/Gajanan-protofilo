import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Linkedin, Mail } from 'lucide-react';

const PROFILE = {
  firstName: "Dhampalwar",
  lastName: "Sai Gajanan",
  tagline: "Aspiring AI & Machine Learning Professional",
  bio: "B.Tech in Artificial Intelligence & Machine Learning (2026). Specialized in Computer Vision and Deep Learning. Developer of autonomous surveillance systems using YOLOv7 and real-time biometric security protocols.",
  linkedin: "https://www.linkedin.com/in/sai-gajanan-dhampalwar-8aa44a248",
  email: "dhampalwarsaigajanan@gmail.com",
  skills: ["Computer Vision", "Deep Learning", "YOLOv7 Architecture", "TensorFlow / PyTorch"]
};

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-50 rounded-full blur-[120px] -z-10 opacity-60" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sky-600 mb-6 block bg-sky-50 px-4 py-2 rounded-full w-fit mx-auto border border-sky-100">
          {PROFILE.tagline}
        </span>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.95] text-neutral-950 uppercase">
          {PROFILE.firstName} <br />
          <span className="text-neutral-400">{PROFILE.lastName}</span>
        </h1>
        <p className="max-w-2xl mx-auto text-neutral-500 text-lg md:text-xl mb-12 leading-relaxed font-light">
          {PROFILE.bio}
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button 
          id="cta-projects" 
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-neutral-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-black transition-all group shadow-xl shadow-neutral-200"
        >
          Explore Research
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <div className="flex items-center gap-1 bg-white p-2 rounded-2xl border border-neutral-100 shadow-sm">
           <a href={PROFILE.linkedin} target="_blank" className="p-4 hover:bg-neutral-50 rounded-xl transition-colors text-neutral-600 hover:text-sky-600"><Linkedin className="w-5 h-5" /></a>
           <a href={`mailto:${PROFILE.email}`} className="p-4 hover:bg-neutral-50 rounded-xl transition-colors text-neutral-600 hover:text-rose-600"><Mail className="w-5 h-5" /></a>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-20 hidden xl:flex opacity-20">
        {PROFILE.skills?.map((s: string, idx: number) => (
          <div key={idx} className="rotate-90 text-[10px] tracking-[0.5em] uppercase font-bold text-neutral-400">{s}</div>
        ))}
      </div>
    </section>
  );
};
