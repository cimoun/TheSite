# Micro-Interactions Library

A comprehensive collection of reusable micro-interaction components for enhanced user experience. Includes both CSS and Framer Motion-style JavaScript implementations.

## Table of Contents

1. [Installation](#installation)
2. [CSS Approach](#css-approach)
3. [Framer Motion Approach](#framer-motion-approach)
4. [Component Examples](#component-examples)
5. [Accessibility](#accessibility)
6. [Browser Support](#browser-support)

## Installation

### Include in HTML

```html
<!-- CSS Micro-interactions -->
<link rel="stylesheet" href="micro-interactions.css">

<!-- JavaScript Module (optional, for Framer Motion-style API) -->
<script src="micro-interactions.js"></script>
```

### CSS Variables Required

Ensure these CSS variables are defined in your root styles:

```css
:root {
    --duration-fast: 200ms;
    --duration-base: 300ms;
    --ease: cubic-bezier(0.4, 0.0, 0.2, 1);
    --leaf-2: #6FA08F;
}
```

## CSS Approach

### 1. Button Hover Effects

**Scale and Shadow Increase**

```html
<button class="btn-hover-scale">Click Me</button>
```

```css
/* Already included in micro-interactions.css */
.btn-hover-scale {
    transition: transform var(--duration-fast) var(--ease),
                box-shadow var(--duration-fast) var(--ease);
}

.btn-hover-scale:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-hover-scale:active {
    transform: scale(0.98);
}
```

**Lift Effect**

```html
<button class="btn-hover-lift">Hover to Lift</button>
```

### 2. Checkbox Completion Animation

**360° Spin with Scale**

```html
<input type="checkbox" class="checkbox-animate">
```

```css
/* Automatic animation on check */
.checkbox-animate:checked {
    animation: checkbox-spin 0.5s var(--ease);
}

@keyframes checkbox-spin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(0.95); }
    100% { transform: rotate(360deg) scale(1); }
}
```

### 3. Task Deletion Slide-Out

**Translate Right and Fade**

```html
<div class="task-item task-delete-animation">Deleting task...</div>
```

```javascript
// Trigger deletion animation
element.classList.add('task-delete-animation');
setTimeout(() => {
    element.remove();
}, 400); // Match animation duration
```

### 4. Task Addition Slide-In

**From Left**

```html
<div class="task-item task-add-animation-left">New Task</div>
```

**From Top**

```html
<div class="task-item task-add-animation-top">New Task</div>
```

**With Stagger Effect**

```html
<ul class="task-list">
    <li class="task-stagger">Task 1</li>
    <li class="task-stagger">Task 2</li>
    <li class="task-stagger">Task 3</li>
</ul>
```

### 5. Dark Mode Transition

**Smooth Background Color Transition**

```html
<body class="theme-transition">
    <!-- Your content -->
</body>
```

```javascript
// Toggle dark mode
document.body.classList.add('theme-transition');
document.documentElement.classList.toggle('dark-mode');
```

### 6. Hover to Reveal Actions

**Fade In**

```html
<div class="reveal-on-hover-container">
    <div class="content">Hover over me</div>
    <div class="actions reveal-on-hover">
        <button>Edit</button>
        <button>Delete</button>
    </div>
</div>
```

**Slide In from Right**

```html
<div class="reveal-on-hover-container">
    <div class="content">Hover over me</div>
    <div class="actions reveal-slide-right">
        <button>Action</button>
    </div>
</div>
```

### 7. Focus Ring Animations

**Animated Pulse**

```html
<button class="focus-ring-animate">Focus Me</button>
```

**Solid Ring**

```html
<input type="text" class="focus-ring-solid">
```

**Border Highlight**

```html
<input type="text" class="focus-ring-border">
```

**Focus Visible Only (Keyboard Navigation)**

```html
<button class="focus-visible-ring">Keyboard Accessible</button>
```

## Framer Motion Approach

### JavaScript API (Framer Motion-style)

The JavaScript module provides a Framer Motion-like API with `whileHover`, `whileTap`, and `transition` props.

### 1. Button Hover Effects

```javascript
// Get animation config
const buttonConfig = MicroInteractions.animations.buttonHover;

// Apply to element
const button = document.querySelector('#myButton');
MicroInteractions.applyHoverAnimation(button, buttonConfig);
```

**Configuration Object:**

```javascript
{
    whileHover: {
        scale: 1.02,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    },
    whileTap: {
        scale: 0.98
    },
    transition: {
        duration: 0.2,
        ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
    }
}
```

### 2. Checkbox Completion Animation

```javascript
const checkbox = document.querySelector('#taskCheckbox');

checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        MicroInteractions.animateCheckbox(checkbox, true);
    }
});
```

**Configuration:**

```javascript
{
    whileTap: {
        rotate: 360,
        scale: [1, 0.95, 1]
    },
    transition: {
        duration: 0.5,
        ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
    }
}
```

### 3. Task Deletion Animation

```javascript
const taskElement = document.querySelector('.task-item');

MicroInteractions.animateExit(
    taskElement,
    MicroInteractions.animations.taskDelete,
    () => {
        taskElement.remove(); // Callback after animation
    }
);
```

**Configuration:**

```javascript
{
    exit: {
        x: '100%',
        opacity: 0
    },
    transition: {
        duration: 0.4,
        ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
    }
}
```

### 4. Task Addition Animation

```javascript
const newTask = document.createElement('li');
newTask.textContent = 'New Task';
taskList.appendChild(newTask);

// Animate entry
MicroInteractions.animateEntry(
    newTask,
    MicroInteractions.animations.taskAddFromTop
);
```

**Configuration:**

```javascript
{
    initial: {
        y: -20,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1
    },
    transition: {
        duration: 0.4,
        ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
    }
}
```

**With Stagger:**

```javascript
const container = document.querySelector('.task-list');
MicroInteractions.applyStagger(
    container,
    '.task-item',
    MicroInteractions.animations.taskAddFromTop,
    50 // delay between each item in ms
);
```

### 5. Dark Mode Transition

```javascript
// Toggle dark mode with smooth transition
const darkModeToggle = document.querySelector('#darkModeToggle');

darkModeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark-mode');
    MicroInteractions.toggleDarkMode(!isDark);
});
```

### 6. Reveal Actions on Hover

```javascript
const taskItem = document.querySelector('.task-item');

MicroInteractions.applyRevealOnHover(
    taskItem,
    '.task-actions',
    MicroInteractions.animations.revealSlideRight
);
```

**Configuration:**

```javascript
{
    initial: {
        opacity: 0,
        x: 10
    },
    whileHover: {
        opacity: 1,
        x: 0
    },
    transition: {
        duration: 0.3,
        ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
    }
}
```

### 7. Focus Ring Animation

```javascript
const input = document.querySelector('#todoInput');

MicroInteractions.applyFocusAnimation(
    input,
    MicroInteractions.animations.focusRing
);
```

**Configuration:**

```javascript
{
    whileFocus: {
        boxShadow: '0 0 0 3px rgba(111, 160, 143, 0.5)'
    },
    transition: {
        duration: 0.2,
        ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
    }
}
```

## Component Examples

### Complete Todo Item with Micro-Interactions

```html
<li class="todo-item reveal-on-hover-container task-add-animation-top">
    <input type="checkbox" class="checkbox-animate todo-checkbox">
    <span class="todo-text">Complete the project</span>
    <div class="todo-actions reveal-slide-right">
        <button class="btn-hover-scale focus-ring-solid">Edit</button>
        <button class="btn-hover-scale focus-ring-solid">Delete</button>
    </div>
</li>
```

### Complete Form with Focus Rings

```html
<form class="todo-form">
    <input 
        type="text" 
        class="focus-ring-border" 
        placeholder="Add new task..."
    >
    <button 
        type="submit" 
        class="btn-hover-lift focus-visible-ring"
    >
        Add Task
    </button>
</form>
```

### Interactive Card

```html
<div class="card interactive-card">
    <h3>Card Title</h3>
    <p>Card content here</p>
</div>
```

## Advanced Usage

### Custom Animation Configuration

```javascript
// Create custom animation
const customAnimation = {
    whileHover: {
        scale: 1.05,
        y: -5,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    },
    whileTap: {
        scale: 0.95
    },
    transition: {
        duration: 0.25,
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)' // Spring-like easing
    }
};

// Apply to multiple elements
document.querySelectorAll('.custom-button').forEach(btn => {
    MicroInteractions.applyHoverAnimation(btn, customAnimation);
});
```

### Combining Multiple Effects

```javascript
const element = document.querySelector('.special-element');

// Apply hover animation
MicroInteractions.applyHoverAnimation(
    element, 
    MicroInteractions.animations.buttonLift
);

// Apply focus animation
MicroInteractions.applyFocusAnimation(
    element, 
    MicroInteractions.animations.focusRing
);

// Animate entry
MicroInteractions.animateEntry(
    element,
    MicroInteractions.animations.taskAddFromTop
);
```

## Accessibility

### Focus Management

All focus ring animations respect keyboard navigation:

- Use `focus-visible-ring` for keyboard-only focus indicators
- All animations respect `prefers-reduced-motion`
- ARIA attributes are preserved

### Reduced Motion Support

All animations automatically disable for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
    /* All animations are disabled */
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

### Manual Disable

```javascript
// Check user preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Skip animations
    console.log('Animations disabled for accessibility');
}
```

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Fallbacks

For older browsers, animations gracefully degrade:

```css
/* Fallback without animations */
@supports not (animation: none) {
    .task-add-animation-top {
        opacity: 1;
        transform: none;
    }
}
```

## Performance Tips

1. **Use GPU Acceleration:**
   ```css
   .gpu-accelerate {
       transform: translateZ(0);
       will-change: transform;
   }
   ```

2. **Limit Simultaneous Animations:**
   - Maximum 3-5 elements animating at once
   - Use stagger delays for lists

3. **Cleanup:**
   ```javascript
   // Remove will-change after animation
   element.addEventListener('transitionend', () => {
       element.style.willChange = 'auto';
   });
   ```

## License

MIT License - Free to use in personal and commercial projects.
