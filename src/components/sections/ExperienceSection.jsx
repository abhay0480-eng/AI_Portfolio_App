import React from 'react';
import FadeIn from '../ui/FadeIn';
import Badge from '../ui/Badge';

const ExperienceSection = ({ data }) => {
  return (
    <section id="experience" className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-extrabold text-toast-900 tracking-tight">
            <span className="text-coral-500">The latest.</span> Take a look at my career.
          </h2>
        </FadeIn>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:pl-6 md:pr-0 lg:pr-6">
        <div className="flex flex-col md:flex-row md:overflow-x-auto md:snap-x md:snap-mandatory gap-6 md:pb-12 md:pr-6 no-scrollbar">
          {data.map((job, idx) => (
            <FadeIn key={job.id} delay={idx * 100} className="md:snap-start md:shrink-0 md:min-w-[480px]">
              <div className="group h-full flex flex-col p-6 md:p-8 rounded-2xl md:rounded-[2rem] bg-white shadow-sm border border-cream-200 hover:shadow-xl hover:shadow-coral-500/5 hover:border-coral-400/30 transition-all duration-300">
                <p className="text-sm font-bold text-toast-400 mb-2">{job.duration}</p>
                <h3 className="text-xl md:text-2xl font-bold text-toast-900 mb-1">{job.role}</h3>
                <p className="text-base md:text-lg font-semibold text-toast-600 mb-6 md:mb-8">{job.company}</p>

                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-10 flex-grow">
                  {job.impact.map((point, i) => (
                    <li key={i} className="text-toast-600 font-medium text-sm md:text-[15px] leading-relaxed flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cream-300 mt-2 shrink-0 group-hover:bg-coral-500 transition-colors" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {job.tech.map(tech => <Badge key={tech}>{tech}</Badge>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
