# Nixon Siagian — Portfolio

Premium personal portfolio built with React + Three.js (react-three-fiber).

## Tech Stack

- **React 18** + Vite
- **@react-three/fiber** + **@react-three/drei** — 3D glass bubbles
- **Framer Motion** — scroll animations, micro-interactions
- **Tailwind CSS** — utility styling
- **DM Sans** + **Syne** — typography (via Google Fonts)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Then open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── App.jsx              # Root layout, custom cursor, noise overlay
├── main.jsx             # Entry point
├── index.css            # Design tokens, glass utility, noise
├── components/
│   └── Navbar.jsx       # Fixed nav with NS logo + mobile menu
├── three/
│   └── BubbleScene.jsx  # react-three-fiber canvas with glass spheres
└── sections/
    ├── Hero.jsx         # Fullscreen hero with 3D background
    ├── About.jsx        # Glass card bio + stats
    ├── Skills.jsx       # Animated skill bars + tag pills
    ├── Work.jsx         # Asymmetric project card grid
    └── Contact.jsx      # Large heading + email copy + socials
```

## Customisation

- **Colors** — edit CSS variables in `src/index.css`
- **Projects** — edit `PROJECTS` array in `src/sections/Work.jsx`
- **Skills** — edit `SKILLS` array in `src/sections/Skills.jsx`
- **Email / socials** — edit `SOCIALS` in `src/sections/Contact.jsx`
- **Bubble colors** — edit `bubbles` array in `src/three/BubbleScene.jsx`

## Performance Notes

- 3D canvas is lazy-loaded via `React.lazy`
- Bubble count and scale reduce automatically on mobile
- `dpr` is capped at 1.5 on desktop, 1 on mobile
- `MeshTransmissionMaterial` resolution set to 256px for performance
