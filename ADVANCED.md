# Advanced Customization Guide

This guide shows how to extend the 3D Product Configurator with advanced features.

## Table of Contents

1. [Loading External GLTF Models](#loading-external-gltf-models)
2. [Custom Shaders & Effects](#custom-shaders--effects)
3. [Animations & Interactions](#animations--interactions)
4. [Backend Integration](#backend-integration)
5. [Performance Optimization](#performance-optimization)

---

## Loading External GLTF Models

### Using GLTFLoader

Replace the `createProcduralProduct()` method in `index.html`:

```javascript
createProcduralProduct() {
  if (this.productMesh) {
    this.scene.remove(this.productMesh);
  }

  // Import GLTFLoader
  const loader = new THREE.GLTFLoader();
  
  loader.load(
    this.config.model.path,
    (gltf) => {
      this.productMesh = gltf.scene;
      this.productMesh.scale.set(
        this.config.model.scale,
        this.config.model.scale,
        this.config.model.scale
      );
      
      // Apply materials to loaded model
      this.productMesh.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(this.currentSelections.color),
            metalness: this.getColorMetalness(),
            roughness: this.getMaterialRoughness()
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
      this.scene.add(this.productMesh);
      document.getElementById('loader').style.display = 'none';
    },
    (progress) => {
      // Loading progress
      const percent = (progress.loaded / progress.total * 100).toFixed(0);
      console.log(`Loading: ${percent}%`);
    },
    (error) => {
      console.error('Model load error:', error);
      document.getElementById('loader').innerHTML = 
        '<p>Error loading model</p>';
    }
  );
}
```

Add the loader script to the `<head>`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/loaders/GLTFLoader.js"></script>
```

---

## Custom Shaders & Effects

### Add Glow Effect

```javascript
// In setupScene(), after creating the product

const glowGeometry = new THREE.IcosahedronGeometry(1.05, 15);
const glowMaterial = new THREE.MeshBasicMaterial({
  color: 0x667eea,
  transparent: true,
  opacity: 0.2
});
const glow = new THREE.Mesh(glowGeometry, glowMaterial);
this.scene.add(glow);
```

### Custom Water Surface

```javascript
// Create a water-like reflection effect
const waterGeometry = new THREE.PlaneGeometry(10, 10);
const waterMaterial = new THREE.MeshStandardMaterial({
  color: 0x0077be,
  metalness: 0.9,
  roughness: 0.1,
  transparent: true,
  opacity: 0.3
});
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI / 2;
water.position.y = -1;
this.scene.add(water);
```

### Particle System

```javascript
// Add floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 100;
const posArray = new Float32Array(particlesCnt * 3);

for (let i = 0; i < particlesCnt * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  color: 0xffffff,
  transparent: true,
  opacity: 0.7
});

this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
this.scene.add(this.particles);
```

Then update them in the `animate()` method:
```javascript
if (this.particles) {
  this.particles.rotation.x += 0.0001;
}
```

---

## Animations & Interactions

### Rotate on Hover

```javascript
document.getElementById('viewer').addEventListener('mouseenter', () => {
  this.controls.autoRotate = false;
});

document.getElementById('viewer').addEventListener('mouseleave', () => {
  this.controls.autoRotate = true;
});
```

### Pop Effect on Color Change

```javascript
selectColor(colorName) {
  this.currentSelections.color = colorName;
  
  // Pop animation
  if (this.productMesh) {
    const scale = this.productMesh.scale.x;
    const duration = 0.3;
    const startTime = Date.now();
    
    const animatePop = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        const bounce = 1 + Math.sin(progress * Math.PI) * 0.2;
        this.productMesh.scale.set(
          scale * bounce,
          scale * bounce,
          scale * bounce
        );
        requestAnimationFrame(animatePop);
      } else {
        this.productMesh.scale.set(scale, scale, scale);
      }
    };
    
    animatePop();
  }
  
  this.updateProduct();
  this.renderColors();
  this.updatePrice();
}
```

### Spin to Front View

```javascript
// Add button to reset camera
const resetBtn = document.createElement('button');
resetBtn.textContent = '↻ Reset View';
resetBtn.style.cssText = `
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 12px;
  background: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
document.getElementById('viewer').appendChild(resetBtn);

resetBtn.addEventListener('click', () => {
  const startPos = this.camera.position.clone();
  const endPos = new THREE.Vector3(0, 0, 3);
  const duration = 0.5;
  const startTime = Date.now();
  
  const animateCamera = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    const progress = Math.min(elapsed / duration, 1);
    
    this.camera.position.lerpVectors(startPos, endPos, progress);
    
    if (progress < 1) {
      requestAnimationFrame(animateCamera);
    }
  };
  
  animateCamera();
});
```

---

## Backend Integration

### Save Configuration

```javascript
async saveConfiguration() {
  const response = await fetch('/api/configurations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: this.config.name,
      config: this.currentSelections,
      price: this.calculatePrice()
    })
  });
  
  if (response.ok) {
    const data = await response.json();
    console.log('Saved:', data.configId);
  }
}
```

### Load Configuration

```javascript
async loadConfiguration(configId) {
  const response = await fetch(`/api/configurations/${configId}`);
  const data = await response.json();
  
  this.currentSelections = data.config;
  this.renderColors();
  this.renderMaterials();
  this.renderVariants();
  this.updateProduct();
  this.updatePrice();
}
```

### Track Analytics

```javascript
trackEvent(eventName, data) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, data);
  }
  
  // Also send to custom backend
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: eventName,
      data,
      timestamp: new Date().toISOString()
    })
  });
}

// Usage:
selectColor(colorName) {
  this.currentSelections.color = colorName;
  this.trackEvent('color_changed', { 
    color: colorName,
    price: this.calculatePrice()
  });
  // ... rest of method
}
```

---

## Performance Optimization

### Lazy Load on Scroll

```javascript
// In setupScene(), replace canvas creation with lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !this.sceneReady) {
      this.createScene();
      this.sceneReady = true;
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

observer.observe(document.getElementById('viewer'));
```

### Reduce Geometry Complexity

```javascript
// Simplify loaded GLTF models
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js';

const modifier = new SimplifyModifier();
const simplified = modifier.modify(geometry, Math.floor(geometry.attributes.position.count * 0.5));
```

### Use LOD (Level of Detail)

```javascript
import { LOD } from 'three';

const lod = new LOD();
const geometry = new THREE.TorusGeometry(1, 0.4, 32, 100);

// High detail
const highDetail = new THREE.Mesh(geometry, material);
lod.addLevel(highDetail, 0);

// Medium detail
const medGeom = new THREE.TorusGeometry(1, 0.4, 16, 50);
const medDetail = new THREE.Mesh(medGeom, material);
lod.addLevel(medDetail, 5);

// Low detail
const lowGeom = new THREE.TorusGeometry(1, 0.4, 8, 20);
const lowDetail = new THREE.Mesh(lowGeom, material);
lod.addLevel(lowDetail, 10);

this.scene.add(lod);
```

### Texture Optimization

```javascript
// Compress textures
const textureLoader = new THREE.TextureLoader();
textureLoader.setPath('/textures/');

const texture = textureLoader.load('metal.jpg');
texture.magFilter = THREE.LinearFilter;
texture.minFilter = THREE.LinearMipMapLinearFilter;
texture.encoding = THREE.sRGBEncoding;

// For WebP support
const textureWebP = textureLoader.load('metal.webp');
```

---

## Testing Performance

```javascript
// Add FPS counter
class FPSCounter {
  constructor() {
    this.fps = 0;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.display = document.createElement('div');
    this.display.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background: rgba(0,0,0,0.7);
      color: #0f0;
      padding: 10px;
      font-family: monospace;
      font-size: 12px;
      z-index: 999;
    `;
    document.body.appendChild(this.display);
  }
  
  update() {
    this.frameCount++;
    const now = performance.now();
    if (now >= this.lastTime + 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = now;
      this.display.textContent = `FPS: ${this.fps}`;
    }
  }
}

const fpsCounter = new FPSCounter();

// In animate loop:
animate() {
  fpsCounter.update();
  // ... rest of animation
}
```

---

## Advanced Configuration Options

Extend `config.js`:

```javascript
const PRODUCT_CONFIG = {
  // ... existing config
  
  advanced: {
    enableParticles: true,
    particleCount: 100,
    enableGlow: false,
    enableWater: false,
    cameraDistance: 3,
    lightIntensity: 0.8,
    autoRotateSpeed: 2,
    enableBloom: false,
    bloomStrength: 1.5,
    enableSSAO: false
  }
};
```

Then use these in your scenes for maximum flexibility!

---

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [Babylon.js for comparison](https://www.babylonjs-playground.com/)
- [WebGL Performance Tips](https://webgl2fundamentals.org/)
