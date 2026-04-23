import React, { useRef } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import FadeIn from '../ui/FadeIn';

const ProjectsSection = ({ data }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 flex justify-between items-end">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-extrabold text-toast-900 tracking-tight">
            <span className="text-coral-500">Projects.</span> See what's possible.
          </h2>
        </FadeIn>

        <div className="hidden md:flex gap-3">
          <button 
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-white border border-cream-200 text-toast-400 hover:text-coral-500 hover:border-coral-400/30 hover:shadow-md transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-white border border-cream-200 text-toast-400 hover:text-coral-500 hover:border-coral-400/30 hover:shadow-md transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:pl-6 md:pr-0 lg:pr-6">
        <div ref={scrollRef} className="flex flex-col md:flex-row md:overflow-x-auto md:snap-x md:snap-mandatory gap-6 md:pb-12 md:pr-6 no-scrollbar scroll-smooth">
          {data.map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 100} className="md:snap-start md:shrink-0 md:min-w-[480px]">
              <div className="group h-full flex flex-col p-6 md:p-8 rounded-2xl md:rounded-[2rem] bg-white shadow-sm border border-cream-200 hover:shadow-xl hover:shadow-coral-500/5 hover:border-coral-400/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-toast-900 tracking-tight">{project.name}</h3>
                  <div className="flex gap-3 text-toast-300">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-coral-500 transition-colors" aria-label="GitHub"><Github size={20} /></a>
                    )}
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-coral-500 transition-colors" aria-label="Live Demo"><ExternalLink size={20} /></a>
                  </div>
                </div>

                <p className="text-toast-600 font-medium mb-6 md:mb-8 text-sm md:text-base leading-relaxed flex-grow">{project.description}</p>

                <div className="space-y-4 md:space-y-6 mb-6 md:mb-10 p-4 md:p-6 rounded-xl md:rounded-2xl bg-cream-100 border border-cream-200">
                  <div>
                    <strong className="text-toast-900 text-sm block mb-1">The Problem</strong>
                    <p className="text-sm text-toast-600 font-medium">{project.problem}</p>
                  </div>
                  <div>
                    <strong className="text-toast-900 text-sm block mb-1">The Solution</strong>
                    <p className="text-sm text-toast-600 font-medium">{project.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(tech => (
                    <span key={tech} className="text-xs font-bold text-coral-600 bg-coral-400/10 border border-coral-400/20 px-3 py-1.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
