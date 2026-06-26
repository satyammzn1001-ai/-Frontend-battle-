# Frontend Battle — Starter Kit

## 🚀 Quick Start (jab PS drop ho jaye)

```bash
npm install
npm run dev
```
Browser me `http://localhost:5173` khulega.

## 📁 Kahan kya daalna hai

| Kaam | File |
|---|---|
| ZIP ke images/icons | `src/assets/` |
| Brand colors | `tailwind.config.js` → `theme.colors` |
| Title, meta description, OG tags | `index.html` (saare `{{ }}` placeholders replace karo) |
| Navbar links/logo | `src/components/Navbar.jsx` |
| Headline + hero image | `src/components/Hero.jsx` |
| Feature cards | `src/components/Features.jsx` |
| Footer info | `src/components/Footer.jsx` |
| Naya section chahiye? | `src/components/` me nayi file banao, `App.jsx` me import karo |

## ✅ Last 30-min Checklist (submit se pehle)

- [ ] Saare `{{ placeholder }}` replace ho gaye `index.html` me?
- [ ] Dono mandatory features (PS wale) poori tarah implement + test kiye?
- [ ] Mobile view check kiya (Chrome DevTools → 375px width)?
- [ ] Har image me `alt` text hai?
- [ ] Sirf ek `<h1>` page pe hai (Hero me)?
- [ ] Console me koi error nahi (F12 → Console tab)?
- [ ] Broken links/images check kiye?
- [ ] `npm run build` successfully chal raha hai (production build test)?
- [ ] Deploy kiya (Vercel/Netlify) aur live link test kiya?
- [ ] Lighthouse score check kiya (DevTools → Lighthouse tab) — SEO + Performance 90+ target?

## 🌐 Fast Deploy (2 min)

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify (drag & drop):**
```bash
npm run build
```
Phir `dist/` folder ko https://app.netlify.com/drop pe drag-drop karo.

## 💡 Polish Tips (jo tumhe top 5000 se alag karega)

- Hover effects + smooth transitions (already Tailwind `transition` classes lagi hain)
- Consistent spacing — Tailwind ke default scale (4, 8, 12, 16, 20, 24) use karo, random values mat daalo
- Scroll-triggered animations chahiye to: `Intersection Observer` ya simple CSS `@keyframes` use karo
- Images optimize karo (compress karo agar bade hain — page load fast rehna chahiye, ye SEO/performance score me count hota hai)
