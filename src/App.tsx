/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hero } from '@/src/components/portfolio/Hero';
import { Skills } from '@/src/components/portfolio/Skills';
import { Projects } from '@/src/components/portfolio/Projects';
import { Academic } from '@/src/components/portfolio/Academic';
import { AIAssistant } from '@/src/components/ai/AIAssistant';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FFF] text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Academic />
        
        {/* Simple AI Assistant access at the bottom */}
        <section className="max-w-7xl mx-auto p-6 md:p-12 border-t border-neutral-100">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-2 italic serif">AI Career Strategist</h2>
            <p className="text-neutral-500 text-sm">Interactive AI coach for resume optimization and interview prep.</p>
          </div>
          <AIAssistant />
        </section>

        <footer className="py-12 border-t border-neutral-100 text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
            &copy; 2024 Crafted by AI. Building the future.
          </p>
        </footer>
      </main>
    </div>
  );
}

