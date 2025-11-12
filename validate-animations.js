/**
 * Validation script for Framer Motion animation utilities
 * 
 * This script verifies that all animations have the required properties:
 * - initial state
 * - animate state
 * - exit state
 * - transition config
 */

const animations = require('./animations.js');

const requiredAnimations = [
  'fadeInUp',
  'scaleIn',
  'slideFromLeft',
  'slideFromRight',
  'staggerContainer',
  'staggerItem',
  'bounceIn',
  'shimmer',
];

const requiredProperties = ['initial', 'animate', 'exit', 'transition'];

console.log('🔍 Validating Framer Motion Animation Utilities...\n');

let allValid = true;
const results = [];

requiredAnimations.forEach((animName) => {
  const anim = animations[animName];
  const issues = [];

  if (!anim) {
    issues.push(`❌ Animation "${animName}" not found`);
    allValid = false;
  } else {
    console.log(`\n📦 Checking ${animName}...`);

    // Check for required properties
    requiredProperties.forEach((prop) => {
      if (anim[prop] === undefined) {
        issues.push(`  ❌ Missing "${prop}" property`);
        allValid = false;
      } else {
        console.log(`  ✅ Has "${prop}" property`);
      }
    });

    // Check transition type
    if (anim.transition) {
      const transitionType = anim.transition.type;
      if (transitionType === 'spring' || transitionType === 'tween') {
        console.log(`  ✅ Transition type: "${transitionType}"`);
      } else {
        issues.push(`  ⚠️  Unknown transition type: "${transitionType}"`);
      }

      // Check spring-specific properties
      if (transitionType === 'spring') {
        if (anim.transition.stiffness !== undefined) {
          console.log(`  ✅ Spring stiffness: ${anim.transition.stiffness}`);
        }
        if (anim.transition.damping !== undefined) {
          console.log(`  ✅ Spring damping: ${anim.transition.damping}`);
        }
      }

      // Check tween-specific properties
      if (transitionType === 'tween') {
        if (anim.transition.duration !== undefined) {
          console.log(`  ✅ Tween duration: ${anim.transition.duration}s`);
        }
      }
    }
  }

  if (issues.length > 0) {
    console.log('\n  Issues found:');
    issues.forEach((issue) => console.log(issue));
  }

  results.push({
    name: animName,
    valid: issues.length === 0,
    issues,
  });
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 VALIDATION SUMMARY\n');
console.log(`Total animations: ${requiredAnimations.length}`);
console.log(`Valid: ${results.filter((r) => r.valid).length}`);
console.log(`Invalid: ${results.filter((r) => !r.valid).length}`);

if (allValid) {
  console.log('\n✅ All animations are properly structured!');
  console.log('\n✨ Animations ready to use with Framer Motion');
  process.exit(0);
} else {
  console.log('\n❌ Some animations have issues that need to be fixed');
  process.exit(1);
}
