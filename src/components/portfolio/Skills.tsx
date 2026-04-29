import React from 'react';
import { motion } from 'motion/react';

const SKILLS = [
  { name: 'Python', category: 'Programming', level: 95 },
  { name: 'Java', category: 'Programming', level: 82 },
  { name: 'C / C++', category: 'Programming', level: 78 },
  { name: 'TensorFlow', category: 'ML/DL', level: 90 },
  { name: 'PyTorch', category: 'ML/DL', level: 85 },
  { name: 'OpenCV', category: 'Computer Vision', level: 92 },
  { name: 'YOLOv7', category: 'Object Detection', level: 94 },
  { name: 'MediaPipe', category: 'Computer Vision', level: 88 },
  { name: 'Scikit-learn', category: 'ML/DL', level: 88 },
  { name: 'Keras', category: 'ML/DL', level: 90 },
  { name: 'NLP (BERT)', category: 'Deep Learning', level: 82 },
  { name: 'LSTMs/RNNs', category: 'Deep Learning', level: 80 },
  { name: 'SQL', category: 'Database', level: 75 },
  { name: 'Git / AWS', category: 'DevOps', level: 70 },
];

const SOFT_SKILLS = [
  'Analytical Thinking', 'Problem Solving', 'Team Collaboration', 'Adaptability', 'Technical Communication', 'Research Methodology'
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-24 gap-8">
          <div className="md:max-w-sm">
            <h2 className="text-4xl font-bold tracking-tight mb-4 uppercase text-neutral-900 leading-none">
              Technical <br />Core
            </h2>
            <p className="text-neutral-500 font-light mb-8">My expertise spans from low-level systems programming in C to high-level neural architecture design with TensorFlow and Keras.</p>
            
            <div className="space-y-4 pt-8 border-t border-neutral-100 mt-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Core Focus</h4>
              <div className="grid grid-cols-1 gap-4">
                 {[
                   { label: 'Neural Architecture', value: 'CNN, Transformers, LSTM' },
                   { label: 'Computer Vision', value: 'YOLOv7, OpenCV, MediaPipe' },
                   { label: 'Data Science', value: 'NumPy, Pandas, Scikit-learn' }
                 ].map(item => (
                   <div key={item.label}>
                       <span className="block text-[11px] font-bold uppercase text-neutral-900">{item.label}</span>
                       <span className="text-[11px] text-neutral-500 font-light">{item.value}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Soft Skills Matrix</h4>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILLS.map(skill => (
                   <span key={skill} className="px-3 py-1 bg-white border border-neutral-100 rounded-full text-[10px] font-bold uppercase text-neutral-600">{skill}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 flex-1 relative">
             {SKILLS.map((skill, idx) => (
               <motion.div 
                 key={`${skill.name}-${idx}`}
                 initial={{ opacity: 0, x: -10 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.05 }}
                 className="group"
               >
                 <div className="flex items-center justify-between mb-3">
                   <h3 className="font-bold text-lg tracking-tight group-hover:text-sky-600 transition-colors uppercase">{skill.name}</h3>
                   <span className="text-[10px] font-mono font-bold text-neutral-300">[{skill.level}%]</span>
                 </div>
                 <div className="h-[2px] bg-neutral-100 w-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: `${skill.level}%` }}
                     transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                     viewport={{ once: true }}
                     className="h-full bg-neutral-900 group-hover:bg-sky-500 transition-colors"
                   />
                 </div>
                 <span className="text-[9px] uppercase tracking-widest text-neutral-400 mt-2 block font-bold">{skill.category}</span>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};
