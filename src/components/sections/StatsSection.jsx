import React, { useState, useEffect } from 'react';
import { Github, Code2, ExternalLink, Flame, Trophy } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { ActivityCalendar } from 'react-activity-calendar';

const StatsSection = ({ data }) => {
  const [lcData, setLcData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [lcRes, ghRes] = await Promise.allSettled([
          fetch(`https://leetcode-api-faisalshohag.vercel.app/${data.leetcode}`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${data.github}?y=last`)
        ]);

        let lcParsed = null;
        if (lcRes.status === 'fulfilled' && lcRes.value.ok) {
          lcParsed = JSON.parse(await lcRes.value.text());
        }

        let ghParsed = null;
        if (ghRes.status === 'fulfilled' && ghRes.value.ok) {
           ghParsed = await ghRes.value.json();
        }

        let streak = 0;
        let maxStreak = 0;
        let lcCalendarObj = {};

        if (lcParsed && lcParsed.totalSolved !== undefined) {
          if (lcParsed.submissionCalendar) {
            lcCalendarObj = typeof lcParsed.submissionCalendar === 'string'
              ? JSON.parse(lcParsed.submissionCalendar)
              : lcParsed.submissionCalendar;

            const timestamps = Object.keys(lcCalendarObj).map(Number).sort((a, b) => a - b);
            let currentTempStreak = 0;
            let prevTs = 0;

            for (const ts of timestamps) {
              if (prevTs === 0) {
                currentTempStreak = 1;
              } else {
                const diffDays = Math.round((ts - prevTs) / 86400);
                if (diffDays === 1) {
                  currentTempStreak++;
                } else if (diffDays > 1) {
                  currentTempStreak = 1;
                }
              }
              maxStreak = Math.max(maxStreak, currentTempStreak);
              prevTs = ts;
            }

            const now = new Date();
            const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let checkDate = new Date(todayMidnight);
            const todayTs = Math.floor(todayMidnight.getTime() / 1000).toString();
            if (!lcCalendarObj[todayTs]) {
              checkDate.setDate(checkDate.getDate() - 1);
            }
            while (true) {
              const ts = Math.floor(checkDate.getTime() / 1000).toString();
              if (lcCalendarObj[ts] && lcCalendarObj[ts] > 0) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
              } else {
                break;
              }
            }
          }
          setLcData({ ...lcParsed, streak, maxStreak });
        } else {
          setLcData({
            totalSolved: 485, totalQuestions: 3054,
            easySolved: 150, totalEasy: 760,
            mediumSolved: 250, totalMedium: 1600,
            hardSolved: 85, totalHard: 694,
            streak: 0,
            maxStreak: 0
          });
        }

        const lcDateCounts = {};
        Object.keys(lcCalendarObj).forEach(ts => {
           const dateObj = new Date(parseInt(ts) * 1000);
           const y = dateObj.getFullYear();
           const m = String(dateObj.getMonth() + 1).padStart(2, '0');
           const d = String(dateObj.getDate()).padStart(2, '0');
           lcDateCounts[`${y}-${m}-${d}`] = lcCalendarObj[ts];
        });

        if (ghParsed && ghParsed.contributions) {
           const combined = ghParsed.contributions.map(day => {
              const date = day.date;
              const ghCount = day.count || 0;
              const lcCount = lcDateCounts[date] || 0;
              const totalCount = ghCount + lcCount;
              
              let level = 0;
              if (totalCount > 0 && totalCount <= 3) level = 1;
              else if (totalCount > 3 && totalCount <= 6) level = 2;
              else if (totalCount > 6 && totalCount <= 9) level = 3;
              else if (totalCount > 9) level = 4;

              return {
                 date,
                 count: totalCount,
                 level
              };
           });
           setCalendarData(combined);
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch coding data", err);
        setLoading(false);
      }
    };

    fetchStats();
  }, [data.leetcode, data.github]);

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

          {/* Combined Heatmap Card */}
          <FadeIn delay={100} className="lg:col-span-2 p-8 rounded-[2rem] bg-cream-100 border border-cream-200 shadow-sm hover:border-coral-400/30 transition-colors flex flex-col">
            <div className="flex items-center justify-between mb-8 group/link">
               <div className="flex items-center gap-3">
                 <div className="flex -space-x-3">
                   <div className="w-10 h-10 rounded-full bg-toast-900 border-[3px] border-cream-100 flex items-center justify-center shrink-0 z-10 shadow-sm">
                     <Github size={18} className="text-white" />
                   </div>
                   <div className="w-10 h-10 rounded-full bg-white border-[3px] border-cream-100 flex items-center justify-center shrink-0 z-0 shadow-sm">
                     <Code2 size={18} className="text-coral-500" />
                   </div>
                 </div>
                 <div className="flex-1 ml-2">
                   <h3 className="text-lg font-bold text-toast-900 leading-tight">Combined Coding Activity</h3>
                   <p className="text-sm text-toast-500 font-medium">GitHub • LeetCode</p>
                 </div>
               </div>
            </div>

            <div className="flex-grow flex flex-col justify-center overflow-x-auto no-scrollbar bg-white p-6 rounded-2xl border border-cream-200 min-h-[220px]">
              {loading ? (
                 <div className="animate-pulse flex items-center justify-center gap-2 h-full w-full">
                     <div className="h-28 w-8 bg-cream-200 rounded-sm"></div>
                     <div className="h-28 w-8 bg-cream-200 rounded-sm"></div>
                     <div className="h-28 w-8 bg-cream-200 rounded-sm"></div>
                     <div className="h-28 w-8 bg-cream-200 rounded-sm"></div>
                     <div className="h-28 w-8 bg-cream-200 rounded-sm"></div>
                 </div>
              ) : calendarData.length > 0 ? (
                 <div className="min-w-fit pr-4 w-full flex justify-center">
                  <ActivityCalendar
                    data={calendarData}
                    theme={{
                      light: ['#f1f5f9', '#fca5a5', '#f87171', '#ef4444', '#b91c1c'],
                      dark: ['#f1f5f9', '#fca5a5', '#f87171', '#ef4444', '#b91c1c']
                    }}
                    colorScheme="light"
                    labels={{
                      totalCount: `{{count}} combined contributions in the last year`
                    }}
                    renderBlock={(block, activity) => React.cloneElement(block, {
                      title: `${activity.count} contributions on ${activity.date}`
                    })}
                  />
                 </div>
              ) : (
                 <div className="text-toast-500 font-medium text-sm text-center">Unable to load heatmap.</div>
              )}
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
              {loading ? (
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
                    <div className="flex flex-col gap-2 items-end">
                      {lcData.streak > 0 && (
                        <div title="Current Streak" className="flex items-center gap-1.5 px-3 py-1.5 bg-coral-400/10 border border-coral-400/20 rounded-full">
                          <Flame size={14} className="text-coral-500" />
                          <span className="text-sm font-bold text-coral-600">{lcData.streak}</span>
                          <span className="text-xs text-coral-500 font-medium">day{lcData.streak !== 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {lcData.maxStreak > 0 && (
                        <div title="Max Streak" className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full">
                          <Trophy size={14} className="text-amber-500" />
                          <span className="text-sm font-bold text-amber-600">{lcData.maxStreak}</span>
                          <span className="text-xs text-amber-500 font-medium">max streak</span>
                        </div>
                      )}
                    </div>
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
