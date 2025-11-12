/**
 * Example Usage of Framer Motion Animation Utilities
 * 
 * This file demonstrates how to use the animation utilities in a React component.
 * Copy these examples into your React components as needed.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fadeInUp,
  scaleIn,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  bounceIn,
  shimmer,
  mergeAnimations,
} from './animations.js';

// Example 1: Simple fade in component
export function FadeInExample() {
  return (
    <motion.div {...fadeInUp}>
      <h1>This content fades in from below</h1>
      <p>Perfect for hero sections and landing page content</p>
    </motion.div>
  );
}

// Example 2: Modal with scale animation
export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal content */}
            <motion.div
              {...scaleIn}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '8px',
              }}
            >
              <h2>Modal Title</h2>
              <p>This modal scales in and out smoothly</p>
              <button onClick={() => setIsOpen(false)}>Close</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Example 3: Sidebar drawer
export function SidebarExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Sidebar</button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            {...slideFromLeft}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '250px',
              backgroundColor: '#333',
              color: 'white',
              padding: '1rem',
            }}
          >
            <h3>Sidebar Menu</h3>
            <ul>
              <li>Menu Item 1</li>
              <li>Menu Item 2</li>
              <li>Menu Item 3</li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

// Example 4: Staggered list animation
export function StaggeredListExample() {
  const items = [
    { id: 1, text: 'First item' },
    { id: 2, text: 'Second item' },
    { id: 3, text: 'Third item' },
    { id: 4, text: 'Fourth item' },
    { id: 5, text: 'Fifth item' },
  ];

  return (
    <motion.ul
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      style={{ listStyle: 'none', padding: 0 }}
    >
      {items.map((item) => (
        <motion.li
          key={item.id}
          variants={staggerItem}
          style={{
            padding: '1rem',
            margin: '0.5rem 0',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
          }}
        >
          {item.text}
        </motion.li>
      ))}
    </motion.ul>
  );
}

// Example 5: Notification with bounce
export function NotificationExample() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)}>Show Notification</button>
      
      <AnimatePresence>
        {show && (
          <motion.div
            {...bounceIn}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <p>Success! Your action was completed.</p>
            <button onClick={() => setShow(false)}>Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Example 6: Shimmer loading skeleton
export function LoadingSkeletonExample() {
  return (
    <div style={{ padding: '2rem' }}>
      <motion.div
        {...shimmer}
        style={{
          height: '20px',
          marginBottom: '1rem',
          borderRadius: '4px',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
        }}
      />
      <motion.div
        {...shimmer}
        style={{
          height: '20px',
          marginBottom: '1rem',
          borderRadius: '4px',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          width: '80%',
        }}
      />
      <motion.div
        {...shimmer}
        style={{
          height: '20px',
          borderRadius: '4px',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          width: '60%',
        }}
      />
    </div>
  );
}

// Example 7: Custom animation using mergeAnimations
export function CustomAnimationExample() {
  // Create a slower fade-in animation
  const slowFadeIn = mergeAnimations(fadeInUp, {
    transition: { duration: 1.5 },
  });

  return (
    <motion.div {...slowFadeIn}>
      <h2>This content fades in slowly</h2>
      <p>Using the mergeAnimations helper to customize the base animation</p>
    </motion.div>
  );
}

// Example 8: Combining animations with other Framer Motion features
export function CombinedAnimationExample() {
  return (
    <motion.button
      {...fadeInUp}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        padding: '1rem 2rem',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Interactive Button
    </motion.button>
  );
}

// Example 9: Complete page with multiple animations
export function CompletePage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn Framer Motion', completed: false },
    { id: 2, text: 'Build animations', completed: true },
    { id: 3, text: 'Ship to production', completed: false },
  ]);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header with fade in */}
      <motion.header {...fadeInUp}>
        <h1>My Animated Todo App</h1>
        <p>Powered by Framer Motion</p>
      </motion.header>

      {/* Staggered task list */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        style={{ marginTop: '2rem' }}
      >
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            variants={staggerItem}
            style={{
              padding: '1rem',
              marginBottom: '0.5rem',
              backgroundColor: task.completed ? '#e8f5e9' : '#f5f5f5',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                setTasks(tasks.map(t =>
                  t.id === task.id ? { ...t, completed: !t.completed } : t
                ));
              }}
            />
            <span style={{
              textDecoration: task.completed ? 'line-through' : 'none',
            }}>
              {task.text}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Export all examples
export default {
  FadeInExample,
  ModalExample,
  SidebarExample,
  StaggeredListExample,
  NotificationExample,
  LoadingSkeletonExample,
  CustomAnimationExample,
  CombinedAnimationExample,
  CompletePage,
};
