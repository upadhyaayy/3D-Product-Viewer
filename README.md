# 3D Product Configurator — Diamond Ring

A fully responsive, Nike-inspired 3D product configurator built with Three.js. Features two pages: a product showcase page and an interactive 3D customization interface.

## Features

✅ **Two-Page Design**
- Product page with image gallery and customization options
- Full-screen 3D configurator with stepped configuration
- Nike-inspired minimalist design language
- Seamless page switching with price sync

✅ **3D Rendering**
- Three.js powered 3D viewer
- OrbitControls for rotate, zoom, pan
- Auto-rotating product showcase
- GLTF/GLB model loading

✅ **Configuration System**
- Separate models for each variant combination
- Stepped configuration UI (one section at a time)
- Real-time price calculation
- All customization driven by `config.js`

✅ **Mobile Responsive**
- Adapts to tablet and mobile screens
- Touch-friendly controls
- Responsive grid layouts

---

## Quick Start

### Prerequisites
- **Python 3** (for local server)
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Model files in `models/` folder (ring-diamond.glb, ring-sapphire.glb, etc.)

### Option 1: Using the Batch File (Windows)

1. Double-click **`start-server.bat`** in this folder
2. The server will start and show: `Serving HTTP on port 8000`
3. Open your browser and go to: **http://localhost:8000**
4. Press `Ctrl+C` in the command window to stop the server

### Option 2: Using PowerShell

1. Right-click in the folder and select "Open PowerShell here"
2. Run: 
   ```powershell
   python -m http.server 8000
   ```
3. Open: **http://localhost:8000**

### Option 3: Using Terminal (Mac/Linux)

1. Navigate to this folder in Terminal
2. Run:
   ```bash
   python3 -m http.server 8000
   ```
3. Open: **http://localhost:8000**

---

## Project Structure

```
3dconfig/
├── index.html              # Main application (product + configurator pages)
├── config.js               # Product configuration (easily customizable)
├── start-server.bat        # Windows batch server launcher
├── start-server.ps1        # PowerShell server launcher
├── models/                 # GLTF/GLB model files
│   ├── ring-diamond.glb    # Diamond stone model
│   ├── ring-sapphire.glb   # Sapphire stone model
│   ├── ring-emerald.glb    # Emerald stone model
│   ├── ring-size5.glb      # Size 5 model
│   ├── ring-size7.glb      # Size 7 model (default)
│   ├── ring-size9.glb      # Size 9 model
│   ├── ring-classic.glb    # Classic band style
│   ├── ring-twisted.glb    # Twisted band style
│   └── ring-vintage.glb    # Vintage band style
├── README.md               # This file
└── DEPLOYMENT.md           # Deployment guides
```

---

## Configuration

### Customizing the Product

Edit **`config.js`** to change:

- **Product name** and **description**
- **Base price**
- **Variant categories** and options
- **Model paths** for each variant
- **Price adjustments** per variant

Example:
```javascript
const PRODUCT_CONFIG = {
  name: "Diamond Ring",
  basePrice: 299.99,
  variants: [
    {
      category: "Stone Type",
      options: [
        { name: "Diamond", modelPath: "models/ring-diamond.glb", priceAdjust: 0 },
        { name: "Sapphire", modelPath: "models/ring-sapphire.glb", priceAdjust: 150 },
      ]
    }
  ],
  defaults: {
    variant: {
      "Stone Type": "Diamond",
      "Ring Size": "Size 7",
      "Band Style": "Classic"
    }
  }
};
```

**Key Points:**
- Each variant option **must have a unique model file**
- `priceAdjust` is added to `basePrice` in real-time
- `defaults` determine what loads on page load
- Add/remove categories and options as needed

---

## Pages Overview

### Page 1: Product Page
- Left: Image gallery with large main product display
- Right: Product details, tabs, customization options, price, and checkout buttons
- **Customize button** (top-left overlay) → switches to Page 2

### Page 2: Configurator
- Left: 3D viewer (65% width) with auto-rotating model
- Right: Stepped configuration panel (35% width)
- **Done button** (top-right) → returns to Page 1
- Configuration progresses through Stone Type → Ring Size → Band Style

---

## Important Notes

### Why Do I Need a Server?

Browsers block loading files from the `file://` protocol for security reasons (CORS policy). A local server serves files via `http://` which is allowed.

### Common Issues

**Error: "Tracking Prevention blocked access to storage"**
- This is a Firefox warning; it's safe to ignore
- Files are still loading correctly

**Error: "Failed to fetch" or "CORS policy"**
- You must be running a local server
- Do NOT open `index.html` directly in the browser
- Use one of the server startup methods above

**Model not loading**
- Check that model files exist in the `models/` folder
- Verify file names in `config.js` match actual file names
- Check browser console (F12) for detailed errors

---

## Deployment

### Deploy to Vercel

1. Push your folder to a GitHub repository
2. Import the repo into Vercel (https://vercel.com)
3. Vercel automatically serves it at a public URL
4. No build step needed — it's a static site

### Deploy to Netlify

1. Create a Netlify account
2. Drag and drop this folder into Netlify
3. It's live immediately

### Deploy Anywhere Else

Since this is a static site with no backend:
- Works on any web server (Apache, Nginx, IIS, etc.)
- Works on GitHub Pages (just push to a repo)
- Works on any static hosting service

---

## Customization Examples

### Change Product Name
In `config.js`:
```javascript
name: "Custom Bracelet",
description: "Create your perfect bracelet",
```

### Add More Stone Options
```javascript
options: [
  { name: "Diamond", modelPath: "models/bracelet-diamond.glb", priceAdjust: 0 },
  { name: "Sapphire", modelPath: "models/bracelet-sapphire.glb", priceAdjust: 150 },
  { name: "Ruby", modelPath: "models/bracelet-ruby.glb", priceAdjust: 200 },
  { name: "Emerald", modelPath: "models/bracelet-emerald.glb", priceAdjust: 175 },
]
```

### Adjust Pricing
```javascript
basePrice: 499.99,  // Base price
// Variant price adjustments (added to base)
{ name: "Small", priceAdjust: -50 },   // $449.99
{ name: "Large", priceAdjust: 50 },    // $549.99
```

---

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

---

## Technical Stack

- **Three.js r145** — 3D rendering
- **OrbitControls** — Camera interaction
- **GLTFLoader** — Model loading
- **Vanilla JavaScript** — No frameworks
- **CSS Grid** — Responsive layouts
- **System sans-serif** — Fast, native fonts

---

## License

Created for demonstration and customization. Feel free to modify and deploy.

---

## Support

For issues:
1. Check browser console (F12 → Console tab)
2. Verify you're using a local server (http://localhost:8000, not file://)
3. Ensure all model files exist in `models/` folder
4. Verify `config.js` syntax is correct

Happy customizing! 🎉
