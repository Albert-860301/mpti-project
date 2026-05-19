# MPTI - Money Personality Type Indicator

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open:
- **Quiz**: http://localhost:3000
- **Admin**: http://localhost:3000/admin (password: `mpti2024`)

## 📁 Project Structure

```
mpti-project/
├── index.html              # Entry HTML with Thai fonts
├── package.json
├── vite.config.js
├── public/
│   └── images/types/       # Put 16 poster images here (production)
│       ├── SUCKER.png
│       ├── ADDICT.png
│       └── ... (1080×1920px, 9:16 ratio)
└── src/
    ├── main.jsx             # Router: / = quiz, /admin = admin panel
    ├── data/
    │   └── store.js         # Shared data layer (questions, types, scoring, storage)
    ├── components/
    │   └── MPTIApp.jsx      # Quiz frontend (start → quiz → calc → result → plan)
    └── admin/
        └── AdminApp.jsx     # Admin panel (6 modules)
```

## 🔧 Admin Panel Modules

| Module | Description |
|--------|-------------|
| 📊 Dashboard | Stats overview, type distribution chart, user records table |
| ❓ Questions | Edit all 20 quiz questions (Thai + English + scoring dimension) |
| 🎭 Types | Edit 16 personality types (names, amounts, colors, taglines) |
| 🖼 Images | Upload poster images for each type (base64 in dev, CDN in prod) |
| 💳 Cards | Edit 4 recovery plan cards (Redfinger cloud phone features) |
| 📦 Data | Export JSON/CSV, clear user data, production deployment notes |

## 🔄 Data Flow

```
User answers 20 questions
    ↓
Score 4 dimensions (A/P, H/L, S/K, M/C)
    ↓
Map 4-letter combo (e.g. AHSM) → personality type (ADDICT)
    ↓
Dynamic ฿ calculation based on actual answers
    ↓
Show result → Share → Recovery Plan → Redfinger CTA
```

## 🌐 Deployment Options

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Static hosting (Nginx / Apache)
```bash
npm run build
# Copy dist/ to your web server
```

### Docker
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

## ⚠️ Production Checklist

- [ ] Change admin password in `src/admin/AdminApp.jsx` (ADMIN_PASS)
- [ ] Replace localStorage with Firebase/Supabase for persistent data
- [ ] Move images to CDN (Cloudflare R2 / AWS S3)
- [ ] Add real LINE Login OAuth
- [ ] Configure Meta Pixel + TikTok Pixel for retargeting
- [ ] Add GA4 analytics events
- [ ] Set up OG image for social sharing
- [ ] Test on Thai mobile devices (LINE in-app browser, Chrome Android)
