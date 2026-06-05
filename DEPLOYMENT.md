# Deployment Guide

## Deploy to Vercel (Recommended)

The fastest way to deploy—takes 2 minutes, no build step needed.

### Option 1: Vercel CLI (Easiest)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. From the project folder, deploy:
```bash
vercel
```

3. Follow the prompts and your app is live!

### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repo
5. Deploy

Your app is now live at `project-name.vercel.app`

---

## Deploy to Other Platforms

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=.
```

### GitHub Pages

1. Create a `gh-pages` branch
2. Push files to `gh-pages`
3. Go to Settings → Pages
4. Enable GitHub Pages
5. Site is live at `username.github.io/repo-name`

### Any Static Host (AWS S3, Cloudflare Pages, etc.)

Just upload these files:
- `index.html`
- `config.js`
- `models/` (if using external models)

---

## Performance & CDN

Once deployed, your 3D configurator will:
- ✅ Auto-cache on Vercel's CDN
- ✅ Serve from the nearest server globally
- ✅ Load in ~1-2 seconds

### Optimize 3D Models for Fast Loading

If using external GLTF models:

1. **Compress with gltf-pipeline:**
```bash
npm i -g @gltf-transform/cli
gltf-transform compress model.glb model-compressed.glb
```

2. **Use .glb format** (binary is smaller than .gltf + .bin)

3. **Draco compression** (reduces file size by 80%):
```bash
gltf-transform draco model.glb model-draco.glb
```

---

## Environment Variables (Optional)

For backend API calls, create `.env.local`:

```
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=G-XXXXXXXXXX
```

Then in `index.html`:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Custom Domain

### On Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records (Vercel provides instructions)

### On Netlify

1. Go to Domain settings
2. Add custom domain
3. Update DNS

---

## Analytics & Monitoring

Add Google Analytics to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Track add-to-cart events:
```javascript
gtag('event', 'add_to_cart', {
  product: this.config.name,
  price: this.calculatePrice()
});
```

---

## Troubleshooting Deployment

**Model not loading?**
- Verify model path is absolute (full URL)
- Check CORS headers on CDN
- Use browser DevTools → Network tab to debug

**Slow loading?**
- Compress 3D model
- Enable Gzip on server
- Use CDN for model hosting

**Not deploying?**
- Ensure `index.html` and `config.js` are at root
- Check for console errors
- Verify file paths are correct

---

## Production Checklist

- [ ] Models optimized and compressed
- [ ] Custom domain configured
- [ ] Analytics enabled
- [ ] API endpoints configured
- [ ] Mobile tested
- [ ] SSL certificate active (auto on Vercel)
- [ ] Environment variables set
- [ ] Add to cart → real backend connected

---

## Next Steps

1. **Test live:** Share your Vercel link with team
2. **Iterate:** Update `config.js` as needed
3. **Scale:** Connect to e-commerce backend for orders
4. **Monitor:** Track analytics and performance

Your 3D product configurator is production-ready! 🚀
