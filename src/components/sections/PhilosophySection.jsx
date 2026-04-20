import React from 'react';
import FadeIn from '../ui/FadeIn';

const PhilosophySection = ({ data }) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-extrabold text-toast-900 tracking-tight">
            <span className="text-coral-500">Process.</span> How I solve problems.
          </h2>
        </FadeIn>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 100} className="p-8 rounded-[2rem] bg-white border border-cream-200 shadow-sm flex flex-col md:flex-row gap-6 items-start hover:border-coral-400/30 transition-colors">
              <div className="text-4xl font-extrabold text-cream-300">
                0{idx + 1}
              </div>
              <div>
                <h4 className="text-xl font-bold text-toast-900 mb-2">{item.step.split('. ')[1]}</h4>
                <p className="text-toast-600 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
