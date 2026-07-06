# 3D Models Directory

Place your 3D models here:

- `.glb` files (GLTF binary format - recommended)
- `.gltf` files (GLTF ASCII format with separate .bin files)
- `.obj` files (Wavefront OBJ format)

## Example

```
models/
├── ring.glb
├── ring-compressed.glb
└── watch.gltf
```

## In config.js

```javascript
model: {
  type: "gltf",
  path: "/models/ring.glb",
  scale: 1
}
```

## Size Recommendations

- Keep models under 5MB for fast loading
- Use compression tools like gltf-transform
- Draco compression can reduce file size by 80%

## Tools for Model Conversion/Optimization

- **Blender** - Free 3D editor with GLTF export
- **Online Converter** - https://products.aspose.app/3d/conversion/gltf
- **gltf-transform** - Command-line compression tool
- **Babylon.js Inspector** - Online model viewer

## Creating Models

Download free models from:
- [Sketchfab](https://sketchfab.com)
- [TurboSquid](https://www.turbosquid.com)
- [CGTrader](https://www.cgtrader.com)
- [Free3D](https://free3d.com)
- [Poly Haven](https://polyhaven.com)

Remember to respect model licenses!
