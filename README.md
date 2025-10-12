# 🌍 TerraPulse

> AI-powered land regeneration platform using satellite imagery and machine learning to combat land degradation.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](your-demo-url) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 What is TerraPulse?

TerraPulse helps farmers, NGOs, and governments monitor and restore degraded lands using:
- **Satellite imagery** to detect land health issues
- **AI recommendations** for restoration strategies  
- **Impact tracking** to measure improvements over time
- **Gamification** to engage communities in conservation

**Built for:** LandReGen Hackathon 2025

---

## ⚡ Key Features

### 🗺️ Interactive Degradation Map
- Real-time satellite monitoring with color-coded risk zones
- Polygon overlays showing exact degradation areas
- Detailed popups: NDVI values, soil health, erosion rates
- Live data updates every few days

### 🤖 AI Chat Assistant
- Ask questions: "Which parts of my farm show erosion?"
- Get tailored recommendations for your soil type
- Crop suggestions and restoration strategies
- Carbon credit potential estimates

### 📊 Degradation Detection
- Automatic scanning using satellite data
- Shows detected issues with confidence scores
- Severity classification (high/moderate/low risk)
- One-click PDF reports

### 🔮 Impact Simulator
- Predict outcomes before implementing solutions
- Compare different restoration strategies
- Calculate ROI and carbon sequestration
- Timeline projections (6 months to 10 years)

### 🏆 Gamified Impact Tracker
- Earn eco-points for restoration activities
- Unlock badges (25+ achievements)
- Animated leaderboard with rankings
- Progress bars and level-up celebrations
- Community challenges and quests

### 📈 Data Analytics
- NDVI trends over 12+ months
- Heatmap visualizations
- Chart/table views with export (CSV/PDF)
- Upload your own data for analysis

---

## 🛠️ Tech Stack

**Frontend:** React (Next.js 14), TypeScript, TailwindCSS, Framer Motion  
**Backend:** Supabase (PostgreSQL, Auth, Storage)  
**Maps:** React-Leaflet  
**Charts:** Recharts  
**Deployment:** Netlify  
**Development:** Lovable.dev → Bolt.new → GitHub

---

## 🚀 Quick Start

```bash
# Clone repo
git clone https://github.com/Nomize/Terrapulse-platform.git
cd terrapulse

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase credentials

# Run development server
npm run dev
```

Visit `http://localhost:3000`

### Required Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

---

## 📁 Project Structure

```
terrapulse/
├── app/                 # Next.js pages
│   ├── dashboard/       # Main dashboard
│   ├── chat/           # AI assistant
│   ├── impact-tracker/ # Gamification
│   └── profile/        # User settings
├── components/         # React components
├── lib/               # Utilities & Supabase
└── supabase/          # Database migrations
```

---

## 🎨 Design System

**Theme:** Black & Green (cyber/tech aesthetic)
Color Philosophy
Black & Green Theme representing:

Black: Earth, satellite view of night, seriousness of climate crisis
Green: Life, growth, vegetation, hope for restoration
Neon accents: Technology, AI, cutting-edge solutions

- **Black (#000000)** - Main background
- **Charcoal (#0F1419)** - Cards
- **Neon Green (#00FF41)** - Primary actions/accents
- **Orange (#FF8C00)** - Warnings
- **Red (#FF3B3B)** - High risk

**Key Patterns:**
- Glowing green buttons with hover effects
- Animated point gains with floating "+X" text
- Smooth transitions (300ms)
- Pulsing indicators for live data

---

## 🔧 Core Functionality

### How Degradation Detection Works
1. Fetch Sentinel-2 satellite imagery (every 5 days)
2. Calculate NDVI: `(NIR - Red) / (NIR + Red)`
3. Compare with baseline → Detect changes
4. Alert if degradation threshold exceeded

### NDVI Values
- **0.0-0.2**: Bare soil (degraded)
- **0.2-0.5**: Sparse vegetation
- **0.5-0.7**: Moderate vegetation
- **0.7-1.0**: Dense, healthy vegetation

### Carbon Credit Calculation
```
Carbon = (trees × biomass × 0.5) + (soil improvement)
Value = Carbon tons × $15/ton market price
```

---

## 🗺️ Development Journey

1. **Day 1**: Ideation - Researched existing solutions, identified gap
2. **Day 2**: Prototyping on Lovable.dev - Built core UI
3. **Day 3**: Enhanced on Bolt.new - Added animations, fixed map
4. **Day 4**: Deployed to Netlify - Final testing & documentation

**Key Challenge:** Badge system showing wrong badges (work in progress)

---

## 🗺️ Roadmap
✅ Completed (v1.0)

1.  Landing page with animated hero
2. User authentication (email + Google OAuth)
3. Interactive degradation map with polygon zones
4. AI chat assistant
5. Degradation detection panel
6. Gamification system (points, badges, leaderboard)
7. Impact simulation engine
8.  Data insights & visualization
9.  Profile management
10.  Responsive design (mobile/tablet/desktop)

## 🚧 In Progress (v1.1)

1.  Fix badge assignment logic (currently shows wrong badge)
2.  Add more satellite data layers (soil moisture, temperature)
3. Implement notification system
4. Create onboarding tutorial
5. Add sample datasets for demo users

## 🔮 Planned (v2.0 - Q1 2025)

1.  Mobile app (React Native)
2.  Offline mode for field data collection
3.  Multi-language support (French, Portuguese, Swahili)
4. Real-time collaboration (teams can work on same project)
5. Carbon credit marketplace integration
6. Blockchain verification for restoration claims
7. IoT sensor integration (soil moisture, weather stations)
8.  WhatsApp/SMS alerts for critical degradation
9.  API for third-party integrations
10. Machine learning model training on user data

## 🌟 Future Vision (v3.0 - 2026)

 1. Drone imagery integration
 2.  Predictive AI (forecast degradation before it happens)
 3.  Global land health index
 4. Regenerative agriculture certification
 5.Community land trusts
 6.Impact investing platform
 7. Educational courses & certifications


## 🤝 Contributing
   We welcome contributions! Here's how you can help:
   Ways to Contribute

1. Report bugs: Open an issue with detailed steps to reproduce
2. Suggest features: Share ideas in GitHub Discussions
3. Improve docs: Fix typos, add examples, clarify instructions
4. Submit code: Fork, make changes, submit pull request
5. Test: Help us test on different devices/browsers
6. Spread the word: Share TerraPulse with your network

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file

---

## 🙏 Acknowledgments

- **LandReGen Hackathon** - For the opportunity
- **Lovable.dev & Bolt.new** - Development platforms
- **Supabase** - Backend infrastructure
- **ESA Sentinel** - Satellite imagery
- **Claude AI** - Development assistance

---

## 📞 Contact

**Email:** hello@terrapulse.io  
**GitHub:** [github.com/username/terrapulse](https://github.com/Nomize/TerraPulse-platform)  
**Demo:** [terrapulse.netlify.app](https://terrapulsee.netlify.app)

---

**Built with 💚 for a greener planet**
