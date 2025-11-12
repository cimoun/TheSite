# Framer Motion Animation Utilities - Quick Reference

## 📦 Available Animations

| Animation | Use Case | Transition Type | Key Properties |
|-----------|----------|----------------|----------------|
| **fadeInUp** | Appearing elements, cards, content sections | Tween (0.6s) | `y: 60 → 0`, `opacity: 0 → 1` |
| **scaleIn** | Modals, popups, dialogs, overlays | Spring (stiffness: 260) | `scale: 0.8 → 1`, `opacity: 0 → 1` |
| **slideFromLeft** | Left drawer, sidebar, off-canvas menu | Spring (stiffness: 300) | `x: -100% → 0`, `opacity: 0 → 1` |
| **slideFromRight** | Right drawer, sidebar, off-canvas menu | Spring (stiffness: 300) | `x: 100% → 0`, `opacity: 0 → 1` |
| **staggerContainer** | Parent container for lists | Stagger timing | `staggerChildren: 0.1s` |
| **staggerItem** | Individual list items | Spring (stiffness: 100) | `y: 20 → 0`, `opacity: 0 → 1` |
| **bounceIn** | Notifications, badges, important elements | Spring (stiffness: 400) | `scale: 0.3 → 1`, `opacity: 0 → 1` |
| **shimmer** | Loading skeletons, placeholder content | Tween (2s, infinite) | `backgroundPosition: -200% → 200%` |

## 🚀 Quick Start

### 1. Import animations
```javascript
import { fadeInUp, scaleIn } from './animations.js';
import { motion } from 'framer-motion';
```

### 2. Use with spread operator
```jsx
<motion.div {...fadeInUp}>
  Content here
</motion.div>
```

### 3. Use with variants (for stagger)
```jsx
<motion.ul variants={staggerContainer} initial="initial" animate="animate">
  <motion.li variants={staggerItem}>Item 1</motion.li>
  <motion.li variants={staggerItem}>Item 2</motion.li>
</motion.ul>
```

### 4. Use with AnimatePresence (for exit)
```jsx
<AnimatePresence>
  {show && <motion.div {...scaleIn}>Modal</motion.div>}
</AnimatePresence>
```

## 📋 Animation Properties Structure

Each animation includes:
- ✅ **initial**: Starting state (before animation)
- ✅ **animate**: Target state (animation end)
- ✅ **exit**: Exit state (for AnimatePresence)
- ✅ **transition**: Timing and easing configuration

## 🎯 Common Use Cases

### Hero Section
```jsx
<motion.section {...fadeInUp}>
  <h1>Welcome</h1>
</motion.section>
```

### Modal Dialog
```jsx
<AnimatePresence>
  {isOpen && <motion.div {...scaleIn}>Modal content</motion.div>}
</AnimatePresence>
```

### Navigation Drawer
```jsx
<motion.nav {...slideFromLeft}>
  <ul>Menu items</ul>
</motion.nav>
```

### Todo List
```jsx
<motion.ul variants={staggerContainer} initial="initial" animate="animate">
  {todos.map(todo => (
    <motion.li key={todo.id} variants={staggerItem}>{todo.text}</motion.li>
  ))}
</motion.ul>
```

### Notification
```jsx
<motion.div {...bounceIn}>
  Success message!
</motion.div>
```

### Loading State
```jsx
<motion.div 
  {...shimmer}
  style={{
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%'
  }}
/>
```

## 🔧 Customization

Use the `mergeAnimations` helper:

```javascript
import { fadeInUp, mergeAnimations } from './animations.js';

const slowFadeIn = mergeAnimations(fadeInUp, {
  transition: { duration: 1.5 }
});
```

Or override inline:

```jsx
<motion.div 
  {...fadeInUp}
  transition={{ ...fadeInUp.transition, delay: 0.5 }}
/>
```

## 📚 Full Documentation

See [ANIMATIONS.md](./ANIMATIONS.md) for complete documentation and examples.

## 🔍 Validation

Run the validation script to verify all animations:

```bash
node validate-animations.js
```

## 📦 All Available Exports

```javascript
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
  animations, // default export with all animations
};
```
