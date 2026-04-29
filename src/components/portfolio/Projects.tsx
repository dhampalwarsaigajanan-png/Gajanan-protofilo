import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, CheckCircle2, ChevronRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 'yolo-plate',
    title: "Real-Time Number Plate Detection",
    category: "Computer Vision",
    description: "Developed a real-time number plate detection system achieving high accuracy across diverse traffic conditions.",
    longDescription: "This project focused on the end-to-end implementation of an object detection pipeline for surveillance systems. We leveraged the YOLOv7 (You Only Look Once) architecture for its superior speed and accuracy balance.",
    challenges: [
      "Handling extreme lighting conditions and blurred frames at high speeds.",
      "Optimizing the inference time for real-time edge deployment.",
      "Accurate localized plate extraction from low-resolution outdoor cameras."
    ],
    solutions: [
      "Implemented custom data augmentation strategies to simulate night and rain conditions.",
      "Optimized model weights using quantization and TensorRT.",
      "Applied image enhancement algorithms using OpenCV before OCR processing."
    ],
    keyLearnings: [
      "Mastered the trade-off between model depth and inference speed for real-time applications.",
      "Gained deep understanding of how environmental factors affect computer vision accuracy.",
      "Learned the importance of data quality over quantity in object detection."
    ],
    tags: ["YOLOv7", "Python", "OpenCV"],
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 'crypto-gesture',
    title: "Cryptographic Key Sharing",
    category: "Security & AI",
    description: "Designed a secure key exchange mechanism using hand gesture recognition with OpenCV and deep learning.",
    longDescription: "A novel approach to cybersecurity that uses biometric gestures to facilitate secure key exchange between local and remote clients, reducing the reliance on vulnerable text-based passwords.",
    challenges: [
      "Consistent recognition of gestures across different skin tones and backgrounds.",
      "Creating a high-entropy key generation algorithm from gesture input.",
      "Preventing 'replay attacks' where recorded gestures could be spoofed."
    ],
    solutions: [
      "Used MediaPipe for robust hand landmark detection.",
      "Developed a custom hashing function mapped to gesture coordinates.",
      "Integrated a liveness detection layer to ensure physical presence."
    ],
    keyLearnings: [
      "Understood the integration of computer vision with cryptographic protocols.",
      "Explored the complexities of biometric entropy and user interface accessibility.",
      "Learned to implement security-by-design in experimental AI systems."
    ],
    tags: ["Deep Learning", "OpenCV", "Security"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 'suicide-nlp',
    title: "Suicidal Ideation Detection",
    category: "NLP Research",
    description: "Analyzed ML and deep learning-based suicidal ideation detection techniques using clinical and social-media text datasets.",
    longDescription: "A comprehensive research project aiming to develop early-warning systems for mental health crises by analyzing semantics and sentiment in digital footprints.",
    challenges: [
      "Dealing with highly imbalanced datasets from clinical sources.",
      "Contextual sensitivity: distinguishing between clinical discussion and actual risk.",
      "Privacy and ethical considerations in processing sensitive user data."
    ],
    solutions: [
      "Compared BERT, LSTM, and Random Forest architectures for performance benchmarks.",
      "Utilized SMOTE and oversampling techniques to address data imbalance.",
      "Implemented a 'Human-in-the-loop' verification requirement for high-risk flags."
    ],
    keyLearnings: [
      "Gained expertise in handling sensitive datasets with strict ethical guidelines.",
      "Advanced knowledge in NLP transformer architectures and sentiment analysis.",
      "Recognized the vital role of cross-disciplinary collaboration in AI for social good."
    ],
    tags: ["NLP", "Machine Learning", "Research"],
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  }
];

export const Projects = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <section id="projects" className="py-24 px-6 bg-neutral-50/50 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight uppercase text-neutral-900 leading-none">Research &<br />Implementation</h2>
          </div>
          <div className="hidden md:block text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Selected Works ({PROJECTS.length.toString().padStart(2, '0')})</div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.id}
                layout
                layoutId={`card-${project.id}`}
                onClick={() => setSelectedId(project.id)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-2 rounded-[2rem] border border-neutral-100 group transition-all cursor-pointer hover:border-sky-200 shadow-sm hover:shadow-xl relative"
              >
              <motion.div className="aspect-[4/3] relative overflow-hidden rounded-[1.8rem]">
                <motion.img 
                  layoutId={`img-${project.id}`}
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                   <span className="text-white text-xs font-bold uppercase tracking-widest bg-white/20 px-6 py-3 rounded-full border border-white/30">View Details</span>
                </div>
              </motion.div>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags?.map((tag: string, tidx: number) => (
                    <span key={`${tag}-${tidx}`} className="text-[9px] font-mono font-bold uppercase tracking-widest text-neutral-400 bg-neutral-50 px-2 py-1 rounded-sm border border-neutral-100">{tag}</span>
                  ))}
                </div>
                <motion.h3 layoutId={`title-${project.id}`} className="text-xl font-bold mb-4 uppercase leading-tight group-hover:text-sky-600 transition-colors">{project.title}</motion.h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">{project.description}</p>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm shadow-2xl"
            />
            <motion.div 
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 relative bg-neutral-900 shrink-0">
                <motion.img 
                  layoutId={`img-${selectedId}`}
                  src={selectedProject.image}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                  <div className="flex gap-2 mb-4">
                     {selectedProject.tags?.map((tag: string, tidx: number) => (
                       <span key={`${tag}-${tidx}`} className="text-[10px] font-mono font-bold uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full">{tag}</span>
                     ))}
                  </div>
                  <motion.h2 layoutId={`title-${selectedId}`} className="text-4xl font-bold uppercase tracking-tighter leading-none mb-6">
                    {selectedProject.title}
                  </motion.h2>
                  <div className="flex gap-4">
                    {selectedProject.link && <a href={selectedProject.link} className="p-3 bg-white text-black rounded-xl hover:scale-105 transition-transform shadow-lg"><ExternalLink className="w-5 h-5" /></a>}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-8 md:p-12 bg-white">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-neutral-400 mb-4">Overview</h4>
                    <p className="text-neutral-600 leading-relaxed font-light">{selectedProject.longDescription}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-rose-500 mb-4">Challenges</h4>
                        <ul className="space-y-3">
                           {selectedProject.challenges?.map((c: string, i: number) => (
                             <li key={i} className="flex gap-3 text-sm text-neutral-500 font-light">
                               <ChevronRight className="w-4 h-4 shrink-0 text-rose-300 mt-0.5" />
                               {c}
                             </li>
                           ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-sky-600 mb-4">Solutions</h4>
                        <ul className="space-y-3">
                           {selectedProject.solutions?.map((s: string, i: number) => (
                             <li key={i} className="flex gap-3 text-sm text-neutral-500 font-light">
                               <CheckCircle2 className="w-4 h-4 shrink-0 text-sky-300 mt-0.5" />
                               {s}
                             </li>
                           ))}
                        </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-neutral-400 mb-4">Key Learnings</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {selectedProject.keyLearnings?.map((l: string, i: number) => (
                        <div key={i} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 flex items-start gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                           <p className="text-[11px] text-neutral-500 font-medium leading-relaxed">{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
