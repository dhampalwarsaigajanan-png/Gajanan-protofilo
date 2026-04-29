import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Send, FileText, Bot, User, Loader2, PenTool, ArrowLeft, Target, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/src/lib/utils';

export const AIAssistant = () => {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; content: string }[]>([
    { role: 'ai', content: "# AI Career Strategist Active\nHow can I help you optimize your career path today? I can perform ATS audits, simulate technical interviews, or draft high-impact documents." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [isInterviewMode, setIsInterviewMode] = useState(false);
  const [isInterviewSetup, setIsInterviewSetup] = useState(false);
  const [isCoverLetterMode, setIsCoverLetterMode] = useState(false);
  const [isATSMode, setIsATSMode] = useState(false);
  const [isATSSetup, setIsATSSetup] = useState(false);
  const [isTemplatesMode, setIsTemplatesMode] = useState(false);
  const [targetRole, setTargetRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const toggleInterviewMode = () => {
    setIsCoverLetterMode(false);
    setIsATSMode(false);
    setIsATSSetup(false);
    if (!isInterviewMode) {
      setIsInterviewSetup(true);
    } else {
      setIsInterviewMode(false);
      setIsInterviewSetup(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "Switching back to Coaching Mode. How else can I help with your job search?"
      }]);
    }
  };

  const toggleATSMode = () => {
    setIsInterviewMode(false);
    setIsInterviewSetup(false);
    setIsCoverLetterMode(false);
    if (!isATSMode) {
      setIsATSSetup(true);
    } else {
      setIsATSMode(false);
      setIsATSSetup(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "ATS Checker deactivated. Back to standard coach mode."
      }]);
    }
  };

  const startATSAnalysis = () => {
    setIsATSSetup(false);
    setIsATSMode(true);
    setMessages(prev => [...prev, { 
      role: 'ai', 
      content: `ATS Scan Initiated. Analyzing your resume structure, keyword density, and impact metrics for an overall quality score...` 
    }]);
    handleSend(`Perform a comprehensive ATS audit on my resume. ${targetRole ? 'Evaluate against the role of ' + targetRole + '.' : ''} ${jobDescription ? 'Job Description: ' + jobDescription : ''} Provide a standalone quality score out of 100.`);
  };

  const startInterview = () => {
    setIsInterviewSetup(false);
    setIsInterviewMode(true);
    setMessages(prev => [...prev, { 
      role: 'ai', 
      content: "Interview Prep Mode Activated. I've analyzed your profile against the job description. Ready for your first question?" 
    }]);
    handleSend("Let's start the interview. Introduce yourself briefly as the recruiter and ask the first question based on my profile.");
  };

  const toggleCoverLetterMode = () => {
    setIsInterviewMode(false);
    setIsInterviewSetup(false);
    setIsATSMode(false);
    setIsATSSetup(false);
    setIsTemplatesMode(false);
    setIsCoverLetterMode(!isCoverLetterMode);
  };

  const templates = [
    {
      role: "Computer Vision Engineer",
      content: "Subject: Application for Computer Vision Engineer - [Company Name]\n\nDear [Hiring Manager's Name],\n\nAs a Computer Vision specialist with deep expertise in YOLOv7 and real-time object detection, I was thrilled to see the opening at [Company Name]. My background in developing autonomous surveillance systems and biometric security protocols aligns perfectly with your mission to [Company Mission].\n\nDuring my project on Real-Time Number Plate Detection, I achieved a 98% accuracy rate under varying lighting conditions by optimizing preprocessing pipelines. I am confident that my technical skills in OpenCV and TensorFlow, combined with my passion for AI, will make me a valuable asset to your team.\n\nThank you for your time and consideration.\n\nBest regards,\nDhampalwar Sai Gajanan"
    },
    {
      role: "ML Ops Specialist",
      content: "Subject: ML Ops Specialist Application - [Company Name]\n\nDear [Hiring Manager's Name],\n\nI am writing to express my interest in the ML Ops Specialist position at [Company Name]. With a strong foundation in AI & ML and experience in deploying robust surveillance architectures, I am eager to help [Company Name] scale its AI infrastructure.\n\nMy experience with MLOps principles, combined with technical proficiency in Python and deep learning frameworks, allows me to bridge the gap between research and production. I am particularly impressed by [Company Name]'s recent work in [mention a company project].\n\nI look forward to discussing how my skills can contribute to your production excellence.\n\nSincerely,\nDhampalwar Sai Gajanan"
    },
    {
      role: "Deep Learning Engineer",
      content: "Subject: Deep Learning Engineer Application - [Company Name]\n\nDear [Hiring Manager's Name],\n\nAs a dedicated researcher in Deep Learning and Neural Network architectures, I am highly interested in the Deep Learning Engineer role at [Company Name]. My work with YOLOv7 and complex biometric security suggests a strong fit for your technical challenges.\n\nI have spent my undergraduate career at Marri Laxman Reddy Institute focusing on the mathematical foundations of AI. I am excited about the possibility of applying my knowledge to [mention a specific company product or problem].\n\nWarm regards,\nDhampalwar Sai Gajanan"
    },
    {
      role: "AI Research Assistant",
      content: "Subject: Application for AI Research Assistant - [Lab/Company Name]\n\nDear [Professor/Hiring Manager Name],\n\nI am writing to express my strong interest in the AI Research Assistant position. As a B.Tech student specializing in AI & ML, I have developed a deep fascination with [specific field, e.g., Generative Models or Vision Transformers].\n\nMy projects, including cryptographic key sharing via hand gestures and real-time object detection, demonstrate my ability to translate complex theoretical concepts into functional prototypes. I am eager to contribute to the innovative research being conducted at [Lab Name].\n\nBest,\nDhampalwar Sai Gajanan"
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `I've received your resume (${file.name}). I'm now tailoring my advice based on your AI & ML background at Marri Laxman Reddy Institute.` 
      }]);
    }
  };

  const handleSend = async (overrideMessage?: string | any) => {
    const userMessage = (typeof overrideMessage === 'string' ? overrideMessage : null) || input;
    if (!userMessage || !userMessage.trim() || isLoading) return;

    if (!overrideMessage) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: isATSMode
            ? `You are an elite ATS Strategy Engine.
               
               Directives:
               - NO conversational filler. Provide logic and data.
               - Format: Use standard Markdown document styles.
               - Scoring: Always provide a clear [X/100] score at the start.
               - Formatting: Identify fonts, layouts, or structures that block parsers.
               - Updates: When fixing a resume, provide a clear "REPLACE [Original Text]" with "WITH [Improved Text]" block.
               
               Output Structure:
               # RESUME QUALITY SCORE: [Score]
               ## Parse Diagnostic
               ## Keyword Alignment (Comparison Table)
               ## Actionable Resume Updates (Text blocks for sections like Summary, Experience, Projects)
               ## Strategic Next Steps`
            : isCoverLetterMode 
            ? `You are a Direct Career Document Specialist. 
               
               Task: Provide a high-conversion, copy-ready cover letter.
               - Format: Full business letter markdown.
               - Tone: Analytical, technical, and confident.
               - Emphasis: Match YOLOv7/OpenCV depth to the job description requirements.
               - Length: Max 250 words. Just the document, no intro/outro filler.`
            : isInterviewMode 
            ? `You are a Senior Technical Recruiter. Conduct a high-intensity AI/ML interview.
               
               Protocol:
               - Ask ONE question at a time.
               - After the user responds, provide:
                 1. # FEEDBACK: [Concise critique of accuracy/clarity/depth]
                 2. # NEXT QUESTION: [The following prompt]
               - Focus on: YOLO architectures, real-time CV pipelines, and neural network optimization.`
            : `You are a Direct Technical Career Strategist.
               
               Persona: Professional, data-driven, and extremely high-signal.
               Goal: Optimize Dhampalwar Sai Gajanan's trajectory toward Senior AI/ML roles.
               
               Interaction Model:
               - Respond with Markdown.
               - Use tables for complex data or comparisons.
               - Provide clear, bold headers.
               - If asked to update a resume, provide the specific improved text blocks with bullet points.
               - Focus on: YOLO architectures, real-time CV pipelines, MLOps, and Quantified Results.`
        }
      });

      const aiResponse = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      if (isCoverLetterMode) setIsCoverLetterMode(false);
      if (isATSMode) setIsATSMode(false);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: "I encountered an error connecting to my neural core. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col bg-white rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden">
      <div className="p-6 bg-neutral-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-xl transition-colors",
            isInterviewMode ? "bg-rose-500/20" : "bg-white/10"
          )}>
             <Sparkles className={cn("w-5 h-5", isInterviewMode ? "text-rose-400" : "text-amber-400")} />
          </div>
          <div>
            <h2 className="font-bold">{isInterviewMode ? 'Interview Prep' : 'Career Assistant'}</h2>
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono">
              {resumeName ? `Resume: ${resumeName}` : 'Powered by Gemini AI'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleATSMode}
            className={cn(
              "text-xs px-4 py-2 rounded-full transition-all flex items-center gap-2 border",
              isATSMode || isATSSetup 
                ? "bg-sky-500 text-white border-sky-400" 
                : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
            )}
          >
            <Target className="w-3 h-3" />
            {isATSMode || isATSSetup ? 'Exit ATS Check' : 'ATS Checker'}
          </button>
          <button 
            onClick={toggleCoverLetterMode}
            className={cn(
              "text-xs px-4 py-2 rounded-full transition-all flex items-center gap-2 border",
              isCoverLetterMode 
                ? "bg-amber-500 text-white border-amber-400" 
                : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
            )}
          >
            <PenTool className="w-3 h-3" />
            {isCoverLetterMode ? 'Exit Cover Letter' : 'Cover Letter'}
          </button>
          <button 
            onClick={() => {
              setIsInterviewMode(false);
              setIsATSMode(false);
              setIsCoverLetterMode(false);
              setIsTemplatesMode(!isTemplatesMode);
            }}
            className={cn(
              "text-xs px-4 py-2 rounded-full transition-all flex items-center gap-2 border",
              isTemplatesMode 
                ? "bg-emerald-500 text-white border-emerald-400" 
                : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
            )}
          >
            <FileText className="w-3 h-3" />
            Templates
          </button>
          <button 
            onClick={toggleInterviewMode}
            className={cn(
              "text-xs px-4 py-2 rounded-full transition-all flex items-center gap-2 border",
              isInterviewMode 
                ? "bg-rose-500 text-white border-rose-400" 
                : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
            )}
          >
            <Bot className="w-3 h-3" />
            {isInterviewMode ? 'Exit Interview' : 'Start Interview Prep'}
          </button>
          <label className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors flex items-center gap-2 cursor-pointer border border-white/5">
            <FileText className="w-3 h-3" />
            {resumeName ? 'Update' : 'Upload Resume'}
            <input type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8 space-y-6 bg-neutral-50/30">
        <AnimatePresence mode="wait">
          {isCoverLetterMode ? (
            <motion.div 
              key="cover-letter-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col justify-center items-center text-center space-y-8 max-w-lg mx-auto"
            >
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center">
                <PenTool className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Generate Cover Letter</h3>
                <p className="text-sm text-neutral-500">Paste the job description below, and I'll use your AI/ML expertise to draft a winning letter.</p>
              </div>
              <textarea 
                className="w-full h-48 p-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all text-sm leading-relaxed"
                placeholder="Paste the target job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setIsCoverLetterMode(false)}
                  className="flex-1 py-4 bg-neutral-100 text-neutral-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  disabled={!jobDescription.trim() || isLoading}
                  onClick={() => handleSend("Generate a cover letter for this job description.")}
                  className="flex-[2] py-4 bg-neutral-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl disabled:opacity-50"
                >
                  {isLoading ? 'Drafting...' : 'Generate with Gemini'}
                </button>
              </div>
            </motion.div>
          ) : isATSSetup ? (
            <motion.div 
              key="ats-setup-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col justify-center items-center text-center space-y-8 max-w-lg mx-auto"
            >
              <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-sky-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">ATS Resume Checker</h3>
                <p className="text-sm text-neutral-500">I'll evaluate your resume against a specific target role or job description to identify gaps and boost your score.</p>
              </div>
              <div className="w-full space-y-4">
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                      <FileText className="w-5 h-5 text-sky-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none mb-1">Target Document</p>
                      <p className="text-sm font-bold text-neutral-900">{resumeName || 'Missing Resume'}</p>
                    </div>
                  </div>
                  <label className="px-4 py-2 bg-white text-neutral-900 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-neutral-200 cursor-pointer hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all">
                    {resumeName ? 'Replace' : 'Upload Now'}
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} />
                  </label>
                </div>
                <input 
                  className="w-full p-4 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all text-sm"
                  placeholder="Target Role (e.g. Machine Learning Engineer)"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
                <textarea 
                  className="w-full h-32 p-4 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all text-sm leading-relaxed"
                  placeholder="Paste Job Description (Optional but recommended for precision)..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setIsATSSetup(false)}
                  className="flex-1 py-4 bg-neutral-100 text-neutral-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  disabled={!targetRole.trim() || isLoading}
                  onClick={startATSAnalysis}
                  className="flex-[2] py-4 bg-neutral-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl disabled:opacity-50"
                >
                  {isLoading ? 'Analyzing...' : 'Run ATS Scan'}
                </button>
              </div>
            </motion.div>
          ) : isInterviewSetup ? (
            <motion.div 
              key="interview-setup-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col justify-center items-center text-center space-y-8 max-w-lg mx-auto"
            >
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center">
                <Bot className="w-8 h-8 text-rose-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Simulate Technical Interview</h3>
                <p className="text-sm text-neutral-500">Paste the job description or role details to start a targeted simulation with real-time feedback.</p>
              </div>
              <textarea 
                className="w-full h-48 p-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all text-sm leading-relaxed"
                placeholder="Paste the job description (optional)..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setIsInterviewSetup(false)}
                  className="flex-1 py-4 bg-neutral-100 text-neutral-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={startInterview}
                  className="flex-[2] py-4 bg-neutral-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl"
                >
                  Start Round 1
                </button>
              </div>
            </motion.div>
          ) : isTemplatesMode ? (
            <motion.div 
              key="templates-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="col-span-full mb-4 text-center">
                <h3 className="text-xl font-bold uppercase tracking-tight">AI Role Templates</h3>
                <p className="text-sm text-neutral-500">Select a specialized template to copy or adapt.</p>
              </div>
              {templates.map((tpl, i) => (
                <div key={i} className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                  <h4 className="font-bold text-neutral-900 mb-2">{tpl.role}</h4>
                  <p className="text-[10px] text-neutral-400 font-mono mb-4 h-20 overflow-hidden text-ellipsis line-clamp-4">
                    {tpl.content}
                  </p>
                  <button 
                    onClick={() => {
                      setInput(tpl.content);
                      setIsTemplatesMode(false);
                      setMessages(prev => [...prev, { role: 'ai', content: `I've loaded the ${tpl.role} template. You can now edit it or ask me to tailor it further!` }]);
                    }}
                    className="w-full py-2 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
                  >
                    Load & Edit
                  </button>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="chat-messages" className="space-y-6">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    "flex gap-4 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    msg.role === 'ai' ? "bg-neutral-900" : "bg-neutral-200"
                  )}>
                    {msg.role === 'ai' ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-neutral-600" />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'ai' ? "bg-white border border-neutral-100 shadow-sm" : "bg-neutral-900 text-white"
                  )}>
                    {msg.role === 'ai' ? (
                      <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-neutral-50 prose-pre:p-4 prose-pre:rounded-xl prose-table:border prose-table:border-neutral-100 [&>h1]:text-lg [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-base [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-2 [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:mb-4 [&>table]:w-full [&>table]:mb-4 [&>table]:text-xs [&>th]:bg-neutral-50 [&>th]:p-2 [&>th]:text-left [&>td]:p-2 [&>td]:border-t [&>td]:border-neutral-50">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center shrink-0">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="flex gap-1">
                       <div className="w-1 h-1 bg-neutral-300 rounded-full animate-bounce" />
                       <div className="w-1 h-1 bg-neutral-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                       <div className="w-1 h-1 bg-neutral-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 border-t border-neutral-100 bg-white">
        <div className="flex flex-wrap gap-2 mb-4">
          {isInterviewMode ? (
             [
              "Next question please",
              "How was my last answer?",
              "Give me a harder question",
              "End interview simulation"
            ].map(chip => (
              <button 
                key={chip}
                onClick={() => { 
                  if (chip === "End interview simulation") {
                    toggleInterviewMode();
                  } else {
                    handleSend(chip);
                  }
                }}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-rose-50 text-rose-600 rounded-full border border-rose-100 hover:bg-rose-900 hover:text-white hover:border-rose-900 transition-all"
              >
                {chip}
              </button>
            ))
          ) : (
            [
              "Global ATS Audit",
              "Targeted ATS Match",
              "Draft Cover Letter",
              "AI Interview Simulation",
              "AI/ML Career Dos & Don'ts"
            ].map(chip => (
              <button 
                key={chip}
                onClick={() => { 
                  if (chip === "Draft Cover Letter") {
                    toggleCoverLetterMode();
                  } else if (chip === "AI Interview Simulation") {
                    toggleInterviewMode();
                  } else if (chip === "Targeted ATS Match") {
                    toggleATSMode();
                  } else if (chip === "Global ATS Audit") {
                    setIsATSMode(true);
                    setMessages(prev => [...prev, { 
                      role: 'ai', 
                      content: `Global ATS Core Audit Initiated. Scanning for standalone resume quality, formatting compliance, and impact density...` 
                    }]);
                    handleSend("Perform a comprehensive GLOBAL ATS audit on my resume for overall quality score (standalone).");
                  } else if (chip === "AI/ML Career Dos & Don'ts") {
                    handleSend("Provide a list of critical Dos and Don'ts for an AI/ML Engineer applicant in 2024.");
                  } else {
                    setInput(chip); 
                  }
                }}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-neutral-50 text-neutral-500 rounded-full border border-neutral-100 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all"
              >
                {chip}
              </button>
            ))
          )}
        </div>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Ask anything about your career..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full pl-6 pr-14 py-4 bg-neutral-50 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
