import React from 'react';
import { ArrowRight, Linkedin } from 'lucide-react';
import FadeIn from '../ui/FadeIn';

const ContactSection = ({ data }) => {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="p-12 md:p-20 rounded-[3rem] bg-white border border-cream-200 shadow-sm text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-toast-900 tracking-tight mb-6">Let's connect.</h2>
          <p className="text-xl text-toast-500 font-semibold mb-12 max-w-2xl mx-auto">{data.cta}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${data.email}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-bold text-white bg-toast-900 rounded-full transition-all hover:scale-105 active:scale-95 hover:bg-coral-500"
            >
              Say Hello <ArrowRight size={18} />
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-bold text-toast-800 bg-cream-100 rounded-full transition-colors hover:bg-cream-200 hover:text-coral-600"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
