// --- Action Tag Parser ---
// Extracts [[TAG_NAME]] from AI response text and maps to widget types.

const TAG_TO_WIDGET = {
    PROJECTS: 'projects',
    EXPERIENCE: 'experience',
    SKILLS: 'skills',
    CONTACT: 'contact',
    PROFILE: 'profile',
    HIGHLIGHTS: 'highlights',
    RESUME_DOWNLOAD: 'resume-download',
    QUICK_ACTIONS: 'quick-actions',
    // HR-specific tags
    HR_PROFILE: 'hr-profile',
    SKILL_RADAR: 'skill-radar',
    TIMELINE: 'timeline',
    CANDIDATE_SNAPSHOT: 'candidate-snapshot',
    FULL_RESUME: 'full-resume',
};

const TAG_REGEX = /\[\[([A-Z_]+)\]\]/g;

/**
 * Parses AI response text, extracting action tags and cleaning the text.
 * @param {string} rawText — Raw AI response, possibly containing [[TAGS]]
 * @returns {{ text: string, widgets: string[] }}
 */
export function parseAiResponse(rawText) {
    const widgets = [];
    let match;

    // Extract all action tags
    while ((match = TAG_REGEX.exec(rawText)) !== null) {
        const tagName = match[1];
        const widgetType = TAG_TO_WIDGET[tagName];
        if (widgetType && !widgets.includes(widgetType)) {
            widgets.push(widgetType);
        }
    }

    // Remove action tags from text and clean up extra blank lines
    const text = rawText
        .replace(TAG_REGEX, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    return { text, widgets };
}
