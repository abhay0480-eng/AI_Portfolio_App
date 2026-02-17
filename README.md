<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/AI-Groq%20LLaMA-F55036?style=for-the-badge&logo=meta&logoColor=white" />
</p>

# 🖥️ AbhayOS — AI-Powered Terminal Portfolio

> A unique, terminal-style portfolio website powered by AI. Instead of a traditional portfolio page, visitors interact with a conversational chatbot that knows everything about Abhay Kumar — skills, experience, projects, and more.

<p align="center">
  <strong>🔗 <a href="https://portfolio2024-abhay0480engs-projects.vercel.app/">Live Demo</a></strong>
</p>

---

## ✨ Features

### 🤖 AI-Powered Chatbot
- Natural language conversations powered by **Groq API** (LLaMA 3.3 70B model)
- Contextual responses based on actual resume data
- Automatic **offline fallback** to keyword matching when AI is unavailable

### 🖥️ Terminal UI
- Authentic terminal look & feel with dark theme and monospace fonts
- Typewriter text animations for bot responses
- Typing indicators, glassmorphism, and background effects
- Fully responsive — works on desktop and mobile

### 🧩 Interactive Widgets
The AI triggers rich UI widgets based on conversation context:

| Command / Topic | Widget | Description |
|---|---|---|
| `projects` | 📁 Project Cards | Showcases portfolio projects with tech stack |
| `experience` | 📅 Experience Timeline | Work history with roles and achievements |
| `skills` | 🏷️ Skill Tags | Technical skills organized by category |
| `contact` | 📧 Contact Links | Email, LinkedIn, GitHub links |
| `about` | 👤 Profile Card | Summary and bio |
| `highlights` | 📊 Achievement Stats | Key career metrics |
| `resume` | 📄 Resume Download | One-click PDF download |
| `help` | ⚡ Quick Actions | Navigation buttons for common queries |

### 🔐 BYOK (Bring Your Own Key)
- Users can set their own API key via terminal commands
- Keys stored in `localStorage` (client-side only)
- `.env` support for default key injection

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **Icons** | Lucide React |
| **AI Backend** | Groq API (LLaMA 3.3 70B Versatile) |
| **State** | React Hooks (useState, useCallback, useRef) |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
AboutME/
├── public/
│   └── resume.pdf              # Downloadable resume
├── src/
│   ├── components/
│   │   ├── BackgroundDecor.jsx  # Animated background effects
│   │   ├── ChatInput.jsx       # Terminal input bar
│   │   ├── ChatMessage.jsx     # Message bubbles (user/bot)
│   │   ├── ExperienceCard.jsx  # Work experience timeline card
│   │   ├── ProjectCard.jsx     # Project showcase card
│   │   ├── SkillTag.jsx        # Individual skill badge
│   │   ├── TerminalHeader.jsx  # Terminal title bar with AI status
│   │   ├── TypewriterText.jsx  # Typewriter animation effect
│   │   ├── TypingIndicator.jsx # "Bot is typing..." animation
│   │   └── WidgetRenderer.jsx  # Maps widget types to components
│   ├── data/
│   │   └── resumeData.js       # 📌 Resume knowledge base (edit this!)
│   ├── hooks/
│   │   └── useChatbot.js       # Chat logic, commands, AI/offline modes
│   ├── services/
│   │   └── geminiService.js    # AI API integration (Groq)
│   ├── utils/
│   │   └── parseAiResponse.js  # Extracts [[ACTION_TAGS]] from AI text
│   ├── App.jsx                 # Main app layout
│   ├── App.css                 # App-level styles
│   ├── index.css               # Global styles
│   └── main.jsx                # React entry point
├── .env                        # 🔑 API key (gitignored)
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- A free **Groq API key** → [console.groq.com](https://console.groq.com)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/abhay0480-eng/AboutME.git
cd AboutME

# 2. Install dependencies
npm install

# 3. Set up your API key
cp .env.example .env
# Edit .env and paste your Groq API key:
# VITE_GROQ_API_KEY=gsk_your_key_here

# 4. Start development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_GROQ_API_KEY` | Your Groq API key for AI chatbot | Optional* |

> *If no key is set, the chatbot runs in **offline mode** using keyword matching.

### Terminal Commands

These commands work inside the chatbot terminal:

| Command | Action |
|---|---|
| `export AI_KEY=your_key` | Set API key and activate AI mode |
| `ai on` | Enable AI mode (requires key) |
| `ai off` | Switch to offline keyword mode |
| `ai status` | Show current AI engine status |
| `clear key` | Remove stored API key |
| `clear` | Clear the terminal screen |
| `help` | Show available commands |

---

## 🎨 Customization

### Update Your Resume Data

Edit `src/data/resumeData.js` to update the AI's knowledge:

```javascript
export const resumeData = {
    profile: {
        name: "Your Name",
        role: "Your Role",
        // ... update all fields
    },
    skills: { /* ... */ },
    experience: [ /* ... */ ],
    projects: [ /* ... */ ],
    education: { /* ... */ },
};
```

### Add/Modify Widgets

1. Create a new component in `src/components/`
2. Register it in `src/components/WidgetRenderer.jsx`
3. Add the action tag mapping in `src/utils/parseAiResponse.js`
4. Update the system prompt in `src/services/geminiService.js`

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add environment variable: `VITE_GROQ_API_KEY`
4. Deploy! 🚀

### Netlify

```bash
npm run build
# Deploy the `dist/` folder
```

> ⚠️ **Important:** Never commit your `.env` file. Add API keys as environment variables in your hosting platform's dashboard.

---

## 🧠 How It Works

```
User types a message
        │
        ▼
┌─ Special command? ──► Handle (export AI_KEY, ai on/off, clear)
│       │ No
│       ▼
│  AI mode ON + Key exists?
│       │
│  Yes  │  No
│       │
│       ▼              ▼
│  Groq API Call    Keyword Matching
│       │              (offline fallback)
│       ▼
│  Parse response
│  Extract [[ACTION_TAGS]]
│       │
│       ▼
│  Render text + widgets
└───────────────────────┘
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Abhay Kumar** — Senior React Developer

- 🌐 [Portfolio](https://portfolio2024-abhay0480engs-projects.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/abhay-kumar-587617155/)
- 🐙 [GitHub](https://github.com/abhay0480-eng)
- 🏆 [LeetCode](https://leetcode.com/u/abhay0480sharma/)

---

<p align="center">
  Built with ❤️ and ☕ using React + Vite + Groq AI
</p>
