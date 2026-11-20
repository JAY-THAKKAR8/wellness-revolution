# The Wellness Revolution — Next.js

Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion + Lenis.
UI from the Google Stitch design, fully animated.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
Deploy: push to GitHub → import in Vercel.

## Edit
- `src/data/site.ts` — WhatsApp number, prices, coaches, schedule, hours.
- Photos are in `public/collection/*.jpg` (part of the project, from your Stitch designs; hero/statement/trial/coaches AI-upscaled to 2400px). Swap any file with a real photo, same name.
- `src/app/globals.css` — Apple-style type scale + color tokens from Stitch.

⚠️ Coach names, credentials and prices are placeholders from the Stitch mock-up. Replace before launch.

## Animations
Intro loader · hero zoom + parallax + word reveal · floating trial badge · magnetic CTA ·
scroll-spy nav pill · scroll progress bar · marquee (pauses on hover) · count-up stats ·
cursor spotlight cards · 3D tilt program cards · image clip reveals · method line draws on scroll ·
statement parallax + scale · live BMI number/bar/colour · pricing toggle with rolling prices ·
schedule day/filter with animated list · WhatsApp form success state · footer wordmark reveal + shimmer.
Respects "reduce motion".
