import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

const EDUCATION = [
  {
    degree: "B.Tech — Artificial Intelligence & Machine Learning",
    institution: "Marri Laxman Reddy Institute of Technology and Management",
    location: "Hyderabad",
    period: "2022 – 2026 (Expected)",
    score: "Score: 79%"
  },
  {
    degree: "Intermediate — MPC",
    institution: "Sri Chaitanya Junior College",
    location: "Hyderabad",
    period: "2020 – 2022",
    score: "Score: 85%"
  }
];

const CERTIFICATIONS = [
  { name: "Java Programming", issuer: "HackerRank", year: "2025" },
  { name: "Deep Learning", issuer: "Simplilearn SkillUp", year: "2025" },
  { name: "Software Engineer Role Certification", issuer: "HackerRank", year: "2025" },
  { name: "Introduction to Modern AI", issuer: "Cisco Networking Academy", year: "2025" },
];

export const Academic = () => {
  return (
    <section id="academic" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-tighter mb-12 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-sky-600" />
            Education
          </h2>
          <div className="space-y-12 border-l border-neutral-100 pl-8 ml-4">
            {EDUCATION.map((edu, idx) => (
              <motion.div 
                key={edu.degree}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-0 w-4 h-4 bg-white border-2 border-neutral-900 rounded-full" />
                <h3 className="text-xl font-bold uppercase mb-2">{edu.degree}</h3>
                <p className="text-neutral-900 font-medium mb-1">{edu.institution}</p>
                <div className="flex flex-wrap gap-4 text-xs text-neutral-400 font-mono uppercase mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {edu.period}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {edu.location}</span>
                  <span className="text-sky-600 font-bold">{edu.score}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold uppercase tracking-tighter mb-12 flex items-center gap-3">
            <Award className="w-8 h-8 text-sky-600" />
            Certifications
          </h2>
          <div className="grid gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div 
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-sky-200 hover:bg-sky-50/20 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold uppercase text-sm mb-1 group-hover:text-sky-600 transition-colors">{cert.name}</h4>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest">{cert.issuer}</p>
                </div>
                <span className="text-[10px] font-mono text-neutral-300 font-bold">[{cert.year}]</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
