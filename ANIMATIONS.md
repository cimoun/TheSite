# Framer Motion Animation Utilities

Pre-made animation objects for use with Framer Motion in React applications.

## Installation

First, ensure you have Framer Motion installed in your React project:

```bash
npm install framer-motion
```

## Usage

Import the animation objects you need:

```javascript
import { fadeInUp, scaleIn, staggerContainer, staggerItem } from './animations.js';
import { motion, AnimatePresence } from 'framer-motion';
```

### Basic Usage - Spread Operator

The simplest way to use these animations is with the spread operator:

```jsx
<motion.div {...fadeInUp}>
  This content will fade in from below
</motion.div>
```

### Using with Variants

For more control and staggered animations, use the `variants` prop:

```jsx
<motion.ul variants={staggerContainer} initial="initial" animate="animate">
  <motion.li variants={staggerItem}>Item 1</motion.li>
  <motion.li variants={staggerItem}>Item 2</motion.li>
  <motion.li variants={staggerItem}>Item 3</motion.li>
</motion.ul>
```

### Using with AnimatePresence

For exit animations when components unmount:

```jsx
<AnimatePresence>
  {isVisible && (
    <motion.div {...scaleIn}>
      This modal will scale in and out
    </motion.div>
  )}
</AnimatePresence>
```

## Available Animations

### fadeInUp

Fades in from below. Perfect for appearing elements, cards, and content sections.

```jsx
<motion.div {...fadeInUp}>
  Content appears from below
</motion.div>
```

**Properties:**
- Initial: `opacity: 0, y: 60`
- Animate: `opacity: 1, y: 0`
- Transition: Tween with custom easing (0.6s)

---

### scaleIn

Scales up from the center. Ideal for modals, popups, dialogs, and overlays.

```jsx
<motion.div {...scaleIn}>
  Modal content
</motion.div>
```

**Properties:**
- Initial: `opacity: 0, scale: 0.8`
- Animate: `opacity: 1, scale: 1`
- Transition: Spring (stiffness: 260, damping: 20)

---

### slideFromLeft

Slides in from the left side. Perfect for drawers and sidebars.

```jsx
<motion.aside {...slideFromLeft}>
  Sidebar content
</motion.aside>
```

**Properties:**
- Initial: `x: -100%, opacity: 0`
- Animate: `x: 0, opacity: 1`
- Transition: Spring (stiffness: 300, damping: 30)

---

### slideFromRight

Slides in from the right side. Perfect for drawers and sidebars.

```jsx
<motion.aside {...slideFromRight}>
  Sidebar content
</motion.aside>
```

**Properties:**
- Initial: `x: 100%, opacity: 0`
- Animate: `x: 0, opacity: 1`
- Transition: Spring (stiffness: 300, damping: 30)

---

### staggerContainer & staggerItem

Animates children with a stagger effect. Perfect for lists and grids.

```jsx
<motion.ul 
  variants={staggerContainer} 
  initial="initial" 
  animate="animate"
>
  {items.map(item => (
    <motion.li key={item.id} variants={staggerItem}>
      {item.text}
    </motion.li>
  ))}
</motion.ul>
```

**staggerContainer Properties:**
- Staggers children by 0.1s
- Delays start by 0.1s

**staggerItem Properties:**
- Initial: `opacity: 0, y: 20`
- Animate: `opacity: 1, y: 0`
- Transition: Spring (stiffness: 100, damping: 12)

---

### bounceIn

Bounces in with a spring effect. Great for important elements, notifications, and badges.

```jsx
<motion.div {...bounceIn}>
  Important notification!
</motion.div>
```

**Properties:**
- Initial: `opacity: 0, scale: 0.3`
- Animate: `opacity: 1, scale: 1`
- Transition: Spring (stiffness: 400, damping: 10, mass: 0.8)

---

### shimmer

Creates a shimmer effect for loading states. Use with skeleton loaders.

```jsx
<motion.div 
  {...shimmer}
  style={{
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
  }}
>
  Loading...
</motion.div>
```

**Properties:**
- Animates background position from -200% to 200%
- Transition: Linear, 2s duration, infinite repeat

---

## Advanced Usage

### Customizing Animations

Use the `mergeAnimations` helper to customize base animations:

```javascript
import { fadeInUp, mergeAnimations } from './animations.js';

const slowFadeIn = mergeAnimations(fadeInUp, {
  transition: { duration: 1.5 }
});

<motion.div {...slowFadeIn}>
  This fades in slowly
</motion.div>
```

### Custom Transition Overrides

Override specific properties inline:

```jsx
<motion.div 
  {...fadeInUp}
  transition={{ ...fadeInUp.transition, delay: 0.5 }}
>
  This appears after a delay
</motion.div>
```

### Combining with whileHover and whileTap

```jsx
<motion.button
  {...fadeInUp}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Animated Button
</motion.button>
```

## Complete Example

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  fadeInUp, 
  scaleIn, 
  staggerContainer, 
  staggerItem,
  slideFromRight 
} from './animations.js';

function App() {
  const [showModal, setShowModal] = useState(false);
  const items = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <div>
      {/* Fade in header */}
      <motion.h1 {...fadeInUp}>
        Welcome to My App
      </motion.h1>

      {/* Staggered list */}
      <motion.ul 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {items.map((item, i) => (
          <motion.li key={i} variants={staggerItem}>
            {item}
          </motion.li>
        ))}
      </motion.ul>

      {/* Button to show modal */}
      <button onClick={() => setShowModal(!showModal)}>
        Toggle Modal
      </button>

      {/* Modal with scale animation */}
      <AnimatePresence>
        {showModal && (
          <motion.div {...scaleIn}>
            <h2>Modal Title</h2>
            <p>Modal content here</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside {...slideFromRight}>
        Sidebar content
      </motion.aside>
    </div>
  );
}

export default App;
```

## Animation Types

The utilities use two main transition types:

1. **Spring**: Physics-based, natural-feeling animations
   - Used in: `scaleIn`, `slideFromLeft`, `slideFromRight`, `bounceIn`, `staggerItem`
   - Parameters: stiffness, damping, mass

2. **Tween**: Time-based, predictable animations
   - Used in: `fadeInUp`, `shimmer`
   - Parameters: duration, ease

## Tips

1. **Performance**: Use `AnimatePresence` for exit animations
2. **Accessibility**: Respect user's motion preferences with `framer-motion`'s built-in `reducedMotion` support
3. **Consistency**: Use the same animation family throughout your app for cohesive UX
4. **Timing**: Faster animations (< 0.3s) for small elements, slower (0.5-0.8s) for larger sections

## Browser Support

These animations work in all modern browsers that support Framer Motion. For best performance, ensure GPU acceleration is enabled for transform and opacity properties.

## License

These animation utilities are provided as-is for use in your projects.
