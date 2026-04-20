import React, { useState, useEffect } from 'react';
import { Github, Code2, ExternalLink, Flame } from 'lucide-react';
import FadeIn from '../ui/FadeIn';

const StatsSection = ({ data }) => {
  const [lcData, setLcData] = useState(null);
  const [loadingLc, setLoadingLc] = useState(true);

  useEffect(() => {
    fetch(`https://leetcode-api-faisalshohag.vercel.app/${data.leetcode}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error("Invalid JSON response");
        }
      })
      .then(resData => {
        if (resData && resData.totalSolved !== undefined) {
          let streak = 0;
          if (resData.submissionCalendar) {
            const calendar = typeof resData.submissionCalendar === 'string'
              ? JSON.parse(resData.submissionCalendar)
              : resData.submissionCalendar;
            const now = new Date();
            const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let checkDate = new Date(todayMidnight);
            const todayTs = Math.floor(todayMidnight.getTime() / 1000).toString();
            if (!calendar[todayTs]) {
              checkDate.setDate(checkDate.getDate() - 1);
            }
            while (true) {
              const ts = Math.floor(checkDate.getTime() / 1000).toString();
              if (calendar[ts] && calendar[ts] > 0) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
              } else {
                break;
              }
            }
          }
          setLcData({ ...resData, streak });
        } else {
          throw new Error("Invalid data format");
        }
        setLoadingLc(false);
      })
      .catch((err) => {
        console.error("Failed to fetch live LeetCode data, using fallback.", err);
        setLcData({
          totalSolved: 485, totalQuestions: 3054,
          easySolved: 150, totalEasy: 760,
          mediumSolved: 250, totalMedium: 1600,
          hardSolved: 85, totalHard: 694,
          streak: 0
        });
        setLoadingLc(false);
      });
  }, [data.leetcode]);

  return (
    <section id="activity" className="py-16 overflow-hidden bg-cream-50 border-y border-cream-200">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-extrabold text-toast-900 tracking-tight">
            <span className="text-coral-500">Activity.</span> Consistently shipping and solving.
          </h2>
        </FadeIn>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* GitHub Heatmap Card */}
          <FadeIn delay={100} className="lg:col-span-2 p-8 rounded-[2rem] bg-cream-100 border border-cream-200 shadow-sm hover:border-coral-400/30 transition-colors flex flex-col">
            <a href={`https://github.com/${data.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-8 group/link">
              <div className="w-10 h-10 rounded-full bg-white border border-cream-200 flex items-center justify-center shrink-0">
                <Github size={20} className="text-toast-900" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-toast-900 leading-tight">GitHub Contributions</h3>
                <p className="text-sm text-toast-500 font-medium">@{data.github}</p>
              </div>
              <ExternalLink size={16} className="text-toast-300 group-hover/link:text-coral-500 transition-colors" />
            </a>

            <div className="flex-grow flex items-center justify-center overflow-x-auto no-scrollbar bg-white p-6 rounded-2xl border border-cream-200">
              <img
                src={`https://ghchart.rshah.org/E25B45/${data.github}`}
                alt={`${data.github}'s GitHub Heatmap`}
                className="w-full min-w-[600px] opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </FadeIn>

          {/* LeetCode Stats Card */}
          <FadeIn delay={200} className="p-8 rounded-[2rem] bg-cream-100 border border-cream-200 shadow-sm hover:border-coral-400/30 transition-colors flex flex-col">
            <a href={`https://leetcode.com/u/${data.leetcode}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-8 group/link">
              <div className="w-10 h-10 rounded-full bg-white border border-cream-200 flex items-center justify-center shrink-0">
                <Code2 size={20} className="text-coral-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-toast-900 leading-tight">LeetCode Progress</h3>
                <p className="text-sm text-toast-500 font-medium">@{data.leetcode}</p>
              </div>
              <ExternalLink size={16} className="text-toast-300 group-hover/link:text-coral-500 transition-colors" />
            </a>

            <div className="bg-white p-6 rounded-2xl border border-cream-200 flex-grow flex flex-col justify-center">
              {loadingLc ? (
                <div className="animate-pulse flex flex-col gap-4">
                  <div className="h-10 w-24 bg-cream-200 rounded-lg"></div>
                  <div className="h-4 w-full bg-cream-200 rounded-full mt-4"></div>
                  <div className="h-4 w-full bg-cream-200 rounded-full"></div>
                  <div className="h-4 w-full bg-cream-200 rounded-full"></div>
                </div>
              ) : lcData ? (
                <div className="flex flex-col gap-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-5xl font-extrabold text-toast-900 tracking-tight">{lcData.totalSolved}</span>
                      <span className="text-toast-400 font-semibold ml-2">/ {lcData.totalQuestions}</span>
                      <p className="text-sm text-toast-500 font-medium mt-1">Problems Solved</p>
                    </div>
                    {lcData.streak > 0 && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-coral-400/10 border border-coral-400/20 rounded-full">
                        <Flame size={14} className="text-coral-500" />
                        <span className="text-sm font-bold text-coral-600">{lcData.streak}</span>
                        <span className="text-xs text-coral-400 font-medium">day{lcData.streak !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-semibold text-emerald-600">Easy</span>
                        <span className="text-toast-600 font-medium">{lcData.easySolved} <span className="text-toast-400">/ {lcData.totalEasy}</span></span>
                      </div>
                      <div className="h-2.5 w-full bg-emerald-50 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(lcData.easySolved / lcData.totalEasy) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-semibold text-amber-500">Medium</span>
                        <span className="text-toast-600 font-medium">{lcData.mediumSolved} <span className="text-toast-400">/ {lcData.totalMedium}</span></span>
                      </div>
                      <div className="h-2.5 w-full bg-amber-50 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(lcData.mediumSolved / lcData.totalMedium) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-semibold text-coral-500">Hard</span>
                        <span className="text-toast-600 font-medium">{lcData.hardSolved} <span className="text-toast-400">/ {lcData.totalHard}</span></span>
                      </div>
                      <div className="h-2.5 w-full bg-coral-400/10 rounded-full overflow-hidden">
                        <div className="h-full bg-coral-500 rounded-full" style={{ width: `${(lcData.hardSolved / lcData.totalHard) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-toast-500 font-medium text-sm text-center">Unable to load statistics.</div>
              )}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;
