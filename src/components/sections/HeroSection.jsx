import React from 'react';
import FadeIn from '../ui/FadeIn';

const HeroSection = ({ data }) => {
  return (
    <section className="pt-28 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-extrabold text-toast-900 tracking-tight leading-tight max-w-3xl">
            Frontend Engineer
          </h1>
          <p className="text-lg text-toast-400 font-semibold mt-2">
            Currently at <span className="text-toast-700">GlobalLogic</span> · 4+ years of experience
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
