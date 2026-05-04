import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import FadeIn from '../ui/FadeIn';

const ProjectsSection = ({ data }) => {
  return (
    <section id="projects" className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-20 md:mb-32">
        <FadeIn>
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-toast-900 tracking-tight">
              <span className="text-coral-500">Selected Works.</span> Built with purpose.
            </h2>
            <p className="text-lg md:text-xl text-toast-600 max-w-2xl leading-relaxed">
              A showcase of applications I've engineered from the ground up, focusing on clean architecture, performance, and intuitive user experiences.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-24 md:space-y-40">
        {data.map((project, idx) => (
          <FadeIn key={project.id} delay={100} className="relative">
            <div className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-20 items-center`}>
              
              {/* Image Container */}
              <div className="w-full lg:w-[55%] relative group mb-8 lg:mb-0">
                {/* Desktop Image */}
                <div className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-coral-500/5 bg-cream-100 aspect-[16/10] border border-cream-200 transition-all duration-500 group-hover:shadow-coral-500/10 group-hover:border-coral-300/50">
                  {project.images?.desktop ? (
                    <img 
                      src={project.images.desktop} 
                      alt={`${project.name} Desktop`} 
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-toast-400 bg-cream-100/50">
                      <div className="w-16 h-16 mb-4 rounded-full bg-cream-200 flex items-center justify-center">
                         <span className="text-2xl opacity-50">💻</span>
                      </div>
                      <span className="font-medium">Coming Soon</span>
                    </div>
                  )}
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-toast-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* Mobile Image Overlay */}
                {project.images?.mobile && (
                  <div 
                    className={`absolute -bottom-6 md:-bottom-12 ${idx % 2 !== 0 ? '-left-4 md:-left-8' : '-right-4 md:-right-8'} w-[35%] md:w-[28%] max-w-[200px] aspect-[9/19] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-[4px] md:border-[8px] border-white shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-3 ${idx % 2 !== 0 ? 'group-hover:translate-x-3' : 'group-hover:-translate-x-3'} bg-white z-10`}
                  >
                    <img 
                      src={project.images.mobile} 
                      alt={`${project.name} Mobile`} 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
              </div>

              {/* Content Container */}
              <div className="w-full lg:w-[45%] flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-toast-900 tracking-tight">{project.name}</h3>
                  <div className="flex gap-3 text-toast-400">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-coral-500 hover:-translate-y-1 transition-all bg-cream-50 p-3 rounded-full border border-cream-200 hover:border-coral-300 hover:shadow-lg hover:shadow-coral-500/10" aria-label="GitHub Source Code">
                        <Github size={22} />
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-coral-500 hover:-translate-y-1 transition-all bg-cream-50 p-3 rounded-full border border-cream-200 hover:border-coral-300 hover:shadow-lg hover:shadow-coral-500/10" aria-label="Live Demo">
                        <ExternalLink size={22} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-toast-600 text-lg md:text-xl leading-relaxed mb-10">
                  {project.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="bg-cream-50 p-6 rounded-2xl border border-cream-200 hover:border-coral-200 transition-colors">
                    <h4 className="text-toast-900 font-bold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-coral-500"></span>
                      The Challenge
                    </h4>
                    <p className="text-toast-600 text-sm md:text-base leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="bg-cream-50 p-6 rounded-2xl border border-cream-200 hover:border-coral-200 transition-colors">
                    <h4 className="text-toast-900 font-bold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-coral-500"></span>
                      The Solution
                    </h4>
                    <p className="text-toast-600 text-sm md:text-base leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(tech => (
                    <span key={tech} className="text-sm font-bold text-coral-600 bg-coral-50/50 border border-coral-200/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
