// Product Configuration - Easily customizable for any product
const PRODUCT_CONFIG = {
  // Basic product info
  name: "Diamond Ring",
  description: "Elegant gemstone ring with customizable settings",
  basePrice: 299.99,

  // Model scale (applies to all variants)
  modelScale: 1,

  // Variant selector - each option has its own model file
  // Replace model paths with your actual variant models as you create them
  variants: [
    {
      category: "Stone Type",
      options: [
        { name: "Princess", modelPath: "models/princess.glb", priceAdjust: 0 },
        { name: "Round", modelPath: "models/round.glb", priceAdjust: 150 },
        { name: "Cathedral", modelPath: "models/ring3.glb", priceAdjust: 200 }
      ]
    },
    {
      category: "Ring Size",
      options: [
        { name: "Size 5", modelPath: "models/scene.glb", priceAdjust: -20 },
        { name: "Size 7", modelPath: "models/scene.glb", priceAdjust: 0 },
        { name: "Size 9", modelPath: "models/scene.glb", priceAdjust: 20 }
      ]
    },
    {
      category: "Band Style",
      options: [
        { name: "Classic", modelPath: "models/scene.glb", priceAdjust: 0 },
        { name: "Twisted", modelPath: "models/scene.glb", priceAdjust: 50 },
        { name: "Vintage", modelPath: "models/scene.glb", priceAdjust: 75 }
      ]
    }
  ],

  // Default selections (must match option names above)
  defaults: {
    variant: {
      "Stone Type": "Princess",
      "Ring Size": "Size 7",
      "Band Style": "Classic"
    }
  }
};
