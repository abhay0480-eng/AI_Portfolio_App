import React, { useState, useMemo } from 'react';
import { Briefcase, FolderOpen } from 'lucide-react';
import FadeIn from '../ui/FadeIn';

const LEVEL_CONFIG = {
  advanced: { label: 'Advanced', color: '#E25B45', bg: 'bg-coral-400/10', text: 'text-coral-600', border: 'border-coral-400/20' },
  intermediate: { label: 'Intermediate', color: '#D97706', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  basic: { label: 'Basic', color: '#7A5530', bg: 'bg-cream-200', text: 'text-toast-600', border: 'border-cream-300' },
  learning: { label: 'Learning', color: '#10B981', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
};

// Fuzzy match skill name against tech arrays
const matchesSkill = (skillName, techItem) => {
  const s = skillName.toLowerCase().replace(/[.\s/]/g, '');
  const t = techItem.toLowerCase().replace(/[.\s/]/g, '');
  return s.includes(t) || t.includes(s);
};

const SkillRing = ({ percent, color, size = 56, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#FFECD2" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
};

const SkillsSection = ({ data, experience = [], projects = [] }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Build a map: skillName → { companies: [...], projects: [...] }
  const skillUsageMap = useMemo(() => {
    const map = {};
    data.forEach(skill => {
      const companies = experience
        .filter(exp => exp.tech.some(t => matchesSkill(skill.name, t)))
        .map(exp => exp.company);
      const projs = projects
        .filter(prj => prj.tech.some(t => matchesSkill(skill.name, t)))
        .map(prj => prj.name);
      map[skill.name] = { companies, projects: projs };
    });
    return map;
  }, [data, experience, projects]);

  return (
    <div>
      <FadeIn>
        <h2 className="text-2xl md:text-3xl font-extrabold text-toast-900 tracking-tight mb-6">
          <span className="text-coral-500">Skills.</span> What I bring to the table.
        </h2>
      </FadeIn>

      {/* Legend */}
      <FadeIn delay={50} className="flex flex-wrap gap-2 mb-6">
        {Object.entries(LEVEL_CONFIG).map(([key, cfg]) => (
          <span key={key} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
            {cfg.label}
          </span>
        ))}
      </FadeIn>

      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {data.map((skill, idx) => {
          const cfg = LEVEL_CONFIG[skill.level];
          const usage = skillUsageMap[skill.name];
          const hasUsage = usage && (usage.companies.length > 0 || usage.projects.length > 0);

          return (
            <FadeIn key={skill.name} delay={idx * 60}>
              <div
                className="group relative flex flex-col items-center p-4 rounded-2xl bg-white border border-cream-200 hover:border-coral-400/30 hover:shadow-lg hover:shadow-coral-500/5 transition-all duration-300 cursor-default"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Donut */}
                <div className="relative mb-2">
                  <SkillRing percent={skill.percent} color={cfg.color} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-extrabold text-toast-900">{skill.percent}%</span>
                  </div>
                </div>

                <p className="text-xs font-bold text-toast-800 text-center leading-tight mb-1">{skill.name}</p>

                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                  {cfg.label}
                </span>

                {/* Hover tooltip */}
                {hoveredSkill === skill.name && hasUsage && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 w-52 animate-in fade-in">
                    <div className="bg-toast-900 text-white rounded-xl p-3 shadow-xl shadow-toast-900/20 text-left">
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-toast-900" />

                      <p className="text-[10px] font-bold text-toast-300 uppercase tracking-wider mb-2">Used at</p>

                      {usage.companies.length > 0 && (
                        <div className="mb-2">
                          {usage.companies.map(c => (
                            <div key={c} className="flex items-center gap-1.5 mb-1 last:mb-0">
                              <Briefcase size={10} className="text-coral-400 shrink-0" />
                              <span className="text-[11px] font-semibold">{c}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {usage.projects.length > 0 && (
                        <div>
                          {usage.companies.length > 0 && <div className="h-px bg-toast-700 mb-2" />}
                          {usage.projects.map(p => (
                            <div key={p} className="flex items-center gap-1.5 mb-1 last:mb-0">
                              <FolderOpen size={10} className="text-amber-400 shrink-0" />
                              <span className="text-[11px] font-semibold">{p}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsSection;
