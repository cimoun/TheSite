# Framer Motion Animation Utilities Package

A complete collection of pre-made animation objects for Framer Motion, ready to use in React applications.

## 📦 What's Included

### Animation Files
- **`animations.js`** - Main animation utilities file with 8 pre-made animations
- **`animations.d.ts`** - TypeScript type definitions
- **`animations.examples.jsx`** - Complete React component examples

### Documentation
- **`ANIMATIONS.md`** - Full documentation with detailed usage guide
- **`ANIMATIONS-QUICKREF.md`** - Quick reference for rapid lookup

### Utilities
- **`validate-animations.js`** - Validation script to verify animation structure
- **`check-requirements.js`** - Requirements verification script

## 🎯 Animations Included

1. **fadeInUp** - Fade in from below (tween)
2. **scaleIn** - Scale up from center (spring)
3. **slideFromLeft** - Slide in from left (spring)
4. **slideFromRight** - Slide in from right (spring)
5. **staggerContainer** - Parent container for staggered animations
6. **staggerItem** - Individual items in staggered lists (spring)
7. **bounceIn** - Bounce in animation (spring)
8. **shimmer** - Shimmer loading effect (tween)

## ✨ Features

### ✅ Complete Animation Objects
Each animation includes:
- `initial` - Starting state before animation
- `animate` - Target state for animation
- `exit` - Exit state for AnimatePresence
- `transition` - Complete transition configuration with type (spring/tween)

### ✅ Two Usage Patterns

**Pattern 1: Spread Operator**
```jsx
<motion.div {...fadeInUp}>
  Content here
</motion.div>
```

**Pattern 2: Variants**
```jsx
<motion.div variants={staggerContainer} initial="initial" animate="animate">
  <motion.div variants={staggerItem}>Item</motion.div>
</motion.div>
```

### ✅ AnimatePresence Compatible
All animations include exit states for smooth unmounting:
```jsx
<AnimatePresence>
  {show && <motion.div {...scaleIn}>Modal</motion.div>}
</AnimatePresence>
```

### ✅ Customizable
Use the `mergeAnimations` helper or inline overrides:
```jsx
const customFade = mergeAnimations(fadeInUp, { 
  transition: { duration: 1.5 } 
});
```

## 🚀 Quick Start

1. **Import animations:**
```javascript
import { fadeInUp, scaleIn, staggerContainer } from './animations.js';
import { motion, AnimatePresence } from 'framer-motion';
```

2. **Use in components:**
```jsx
function App() {
  return (
    <motion.div {...fadeInUp}>
      <h1>Animated Content</h1>
    </motion.div>
  );
}
```

3. **See examples:**
Check `animations.examples.jsx` for 9+ complete working examples.

## 📚 Documentation

- **Quick Start:** See [ANIMATIONS-QUICKREF.md](./ANIMATIONS-QUICKREF.md)
- **Full Guide:** See [ANIMATIONS.md](./ANIMATIONS.md)
- **Examples:** See [animations.examples.jsx](./animations.examples.jsx)

## 🔍 Validation

Run the validation script to verify all animations:
```bash
node validate-animations.js
```

Run requirements check:
```bash
node check-requirements.js
```

## 📋 Animation Details

| Animation | Initial | Animate | Transition |
|-----------|---------|---------|------------|
| fadeInUp | `opacity: 0, y: 60` | `opacity: 1, y: 0` | Tween (0.6s) |
| scaleIn | `opacity: 0, scale: 0.8` | `opacity: 1, scale: 1` | Spring (260/20) |
| slideFromLeft | `x: -100%, opacity: 0` | `x: 0, opacity: 1` | Spring (300/30) |
| slideFromRight | `x: 100%, opacity: 0` | `x: 0, opacity: 1` | Spring (300/30) |
| staggerContainer | `{}` | Stagger timing | Stagger (0.1s) |
| staggerItem | `opacity: 0, y: 20` | `opacity: 1, y: 0` | Spring (100/12) |
| bounceIn | `opacity: 0, scale: 0.3` | `opacity: 1, scale: 1` | Spring (400/10) |
| shimmer | `backgroundPosition: -200%` | `backgroundPosition: 200%` | Tween (2s ∞) |

## 🎨 Common Use Cases

- **Hero sections** → fadeInUp
- **Modals/Dialogs** → scaleIn
- **Sidebars/Drawers** → slideFromLeft / slideFromRight
- **Lists/Grids** → staggerContainer + staggerItem
- **Notifications** → bounceIn
- **Loading States** → shimmer

## 💡 Pro Tips

1. Use spring animations for interactive elements
2. Use tween for predictable, time-based animations
3. Combine with `whileHover` and `whileTap` for richer interactions
4. Respect user motion preferences (Framer Motion handles this automatically)
5. Keep animations fast (< 0.8s) for better UX

## 📦 Exports

```javascript
// Named exports
export {
  fadeInUp,
  scaleIn,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  bounceIn,
  shimmer,
  mergeAnimations,
};

// Default export
export default {
  fadeInUp,
  scaleIn,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  bounceIn,
  shimmer,
};
```

## 🎯 Requirements Met

✅ All 8 animations exported  
✅ Each includes initial, animate, exit, transition  
✅ Transition types specified (spring/tween)  
✅ Works with spread operator: `{...fadeInUp}`  
✅ Works with variants: `variants={{...staggerContainer}}`  
✅ Compatible with AnimatePresence  
✅ Fully documented with examples  
✅ TypeScript definitions included  
✅ Validation scripts provided  

## 🔗 Integration

These animations are ready to integrate into any React + Framer Motion project. Simply copy the `animations.js` file (and optionally `animations.d.ts` for TypeScript) into your project and start using them.

## 📄 License

These utilities are provided as-is for use in your projects.

---

**Ready to animate!** 🎉
