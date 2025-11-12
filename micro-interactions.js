/**
 * MICRO-INTERACTIONS LIBRARY - JavaScript Module
 * Framer Motion-style animation configurations and utilities
 * 
 * This module provides reusable animation configurations that mimic
 * Framer Motion's API (whileHover, whileTap, transition props)
 * but implemented with vanilla JavaScript and CSS.
 */

const MicroInteractions = {
    /**
     * Animation configurations (Framer Motion style)
     */
    animations: {
        // Button hover effects
        buttonHover: {
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
        },

        // Button lift effect
        buttonLift: {
            whileHover: {
                y: -2,
                scale: 1.02,
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
            },
            whileTap: {
                y: 0,
                scale: 0.98,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            },
            transition: {
                duration: 0.2,
                ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
            }
        },

        // Checkbox completion
        checkboxComplete: {
            whileTap: {
                rotate: 360,
                scale: [1, 0.95, 1]
            },
            transition: {
                duration: 0.5,
                ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
            }
        },

        // Task deletion
        taskDelete: {
            exit: {
                x: '100%',
                opacity: 0
            },
            transition: {
                duration: 0.4,
                ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
            }
        },

        // Task addition
        taskAddFromLeft: {
            initial: {
                x: '-100%',
                opacity: 0
            },
            animate: {
                x: 0,
                opacity: 1
            },
            transition: {
                duration: 0.4,
                ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
            }
        },

        taskAddFromTop: {
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
        },

        // Stagger children
        taskStagger: {
            animate: {
                transition: {
                    staggerChildren: 0.05
                }
            }
        },

        // Reveal actions on hover
        revealActions: {
            initial: {
                opacity: 0
            },
            whileHover: {
                opacity: 1
            },
            transition: {
                duration: 0.3,
                ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
            }
        },

        revealSlideRight: {
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
        },

        // Focus ring animations
        focusRing: {
            whileFocus: {
                boxShadow: '0 0 0 3px rgba(111, 160, 143, 0.5)'
            },
            transition: {
                duration: 0.2,
                ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
            }
        },

        // Dark mode transition
        themeTransition: {
            transition: {
                duration: 0.5,
                ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
            }
        }
    },

    /**
     * Apply hover animation to element
     */
    applyHoverAnimation(element, config) {
        if (!element || !config) return;

        const originalStyles = {
            transform: element.style.transform,
            boxShadow: element.style.boxShadow
        };

        element.addEventListener('mouseenter', () => {
            if (config.whileHover) {
                this.applyStyles(element, config.whileHover, config.transition);
            }
        });

        element.addEventListener('mouseleave', () => {
            this.applyStyles(element, originalStyles, config.transition);
        });

        if (config.whileTap) {
            element.addEventListener('mousedown', () => {
                this.applyStyles(element, config.whileTap, config.transition);
            });

            element.addEventListener('mouseup', () => {
                if (element.matches(':hover')) {
                    this.applyStyles(element, config.whileHover, config.transition);
                } else {
                    this.applyStyles(element, originalStyles, config.transition);
                }
            });
        }
    },

    /**
     * Apply focus animation to element
     */
    applyFocusAnimation(element, config) {
        if (!element || !config) return;

        const originalStyles = {
            boxShadow: element.style.boxShadow,
            outline: element.style.outline
        };

        element.addEventListener('focus', () => {
            if (config.whileFocus) {
                this.applyStyles(element, config.whileFocus, config.transition);
            }
        });

        element.addEventListener('blur', () => {
            this.applyStyles(element, originalStyles, config.transition);
        });
    },

    /**
     * Animate element entry
     */
    animateEntry(element, config) {
        if (!element || !config) return;

        // Set initial state
        if (config.initial) {
            this.applyStyles(element, config.initial, { duration: 0 });
        }

        // Trigger animation on next frame
        requestAnimationFrame(() => {
            if (config.animate) {
                this.applyStyles(element, config.animate, config.transition);
            }
        });
    },

    /**
     * Animate element exit
     */
    animateExit(element, config, callback) {
        if (!element || !config) {
            if (callback) callback();
            return;
        }

        if (config.exit) {
            this.applyStyles(element, config.exit, config.transition);
            const duration = (config.transition?.duration || 0.3) * 1000;
            setTimeout(() => {
                if (callback) callback();
            }, duration);
        } else {
            if (callback) callback();
        }
    },

    /**
     * Apply checkbox completion animation
     */
    animateCheckbox(element, isChecked) {
        if (!element) return;

        const config = this.animations.checkboxComplete;
        
        if (isChecked) {
            element.style.transition = `all ${config.transition.duration}s ${config.transition.ease}`;
            element.style.transform = 'rotate(360deg) scale(0.95)';
            
            setTimeout(() => {
                element.style.transform = 'rotate(360deg) scale(1)';
            }, config.transition.duration * 500);
            
            setTimeout(() => {
                element.style.transform = '';
            }, config.transition.duration * 1000);
        }
    },

    /**
     * Apply stagger animation to children
     */
    applyStagger(container, childSelector, config, delay = 50) {
        if (!container) return;

        const children = container.querySelectorAll(childSelector);
        children.forEach((child, index) => {
            setTimeout(() => {
                this.animateEntry(child, config);
            }, index * delay);
        });
    },

    /**
     * Apply reveal on hover to container
     */
    applyRevealOnHover(container, targetSelector, config) {
        if (!container) return;

        const targets = container.querySelectorAll(targetSelector);
        
        // Set initial state
        targets.forEach(target => {
            if (config.initial) {
                this.applyStyles(target, config.initial, { duration: 0 });
            }
            target.style.pointerEvents = 'none';
        });

        container.addEventListener('mouseenter', () => {
            targets.forEach(target => {
                if (config.whileHover) {
                    this.applyStyles(target, config.whileHover, config.transition);
                    target.style.pointerEvents = 'auto';
                }
            });
        });

        container.addEventListener('mouseleave', () => {
            targets.forEach(target => {
                if (config.initial) {
                    this.applyStyles(target, config.initial, config.transition);
                    target.style.pointerEvents = 'none';
                }
            });
        });
    },

    /**
     * Toggle dark mode with smooth transition
     */
    toggleDarkMode(enable) {
        const root = document.documentElement;
        const body = document.body;
        
        // Add transition class
        body.classList.add('theme-transition');
        
        if (enable) {
            root.classList.add('dark-mode');
        } else {
            root.classList.remove('dark-mode');
        }
        
        // Remove transition class after animation
        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 500);
    },

    /**
     * Helper: Apply styles to element with transition
     */
    applyStyles(element, styles, transition) {
        if (!element || !styles) return;

        // Apply transition
        if (transition) {
            const duration = transition.duration || 0.3;
            const ease = transition.ease || 'ease';
            element.style.transition = `all ${duration}s ${ease}`;
        }

        // Apply transform styles
        const transforms = [];
        if (styles.x !== undefined) {
            const xValue = typeof styles.x === 'string' ? styles.x : `${styles.x}px`;
            transforms.push(`translateX(${xValue})`);
        }
        if (styles.y !== undefined) {
            const yValue = typeof styles.y === 'string' ? styles.y : `${styles.y}px`;
            transforms.push(`translateY(${yValue})`);
        }
        if (styles.scale !== undefined) {
            const scale = Array.isArray(styles.scale) ? styles.scale[0] : styles.scale;
            transforms.push(`scale(${scale})`);
        }
        if (styles.rotate !== undefined) {
            transforms.push(`rotate(${styles.rotate}deg)`);
        }
        
        if (transforms.length > 0) {
            element.style.transform = transforms.join(' ');
        }

        // Apply other styles
        if (styles.opacity !== undefined) {
            element.style.opacity = styles.opacity;
        }
        if (styles.boxShadow !== undefined) {
            element.style.boxShadow = styles.boxShadow;
        }
    },

    /**
     * Initialize all micro-interactions on the page
     */
    init() {
        // Apply button hover animations
        document.querySelectorAll('.btn-hover-scale').forEach(btn => {
            this.applyHoverAnimation(btn, this.animations.buttonHover);
        });

        document.querySelectorAll('.btn-hover-lift').forEach(btn => {
            this.applyHoverAnimation(btn, this.animations.buttonLift);
        });

        // Apply focus animations
        document.querySelectorAll('.focus-ring-animate, .focus-ring-solid').forEach(el => {
            this.applyFocusAnimation(el, this.animations.focusRing);
        });

        // Apply reveal on hover
        document.querySelectorAll('.reveal-on-hover-container').forEach(container => {
            this.applyRevealOnHover(container, '.reveal-on-hover, .reveal-slide-right', 
                this.animations.revealSlideRight);
        });
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MicroInteractions;
}

// Auto-initialize on DOM ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => MicroInteractions.init());
    } else {
        MicroInteractions.init();
    }
}
