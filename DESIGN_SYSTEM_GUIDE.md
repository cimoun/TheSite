# Design System Usage Guide

This guide explains how to use the design system in the TheSite ToDo application.

## Importing Design Tokens

```typescript
import { colors, typography, spacing } from '@/design-system';
```

## Colors

### Using Color Tokens

```typescript
// In component styles
const buttonStyle = {
  backgroundColor: colors.accent.terracotta,
  color: colors.primary.lightest,
};

// In Tailwind classes
<div className="bg-primary-lightest text-primary-text">...</div>
<button className="bg-secondary-deepGreen hover:bg-secondary-deepGreen/90">...</button>
<span className="text-accent-terracotta">...</span>
```

### Color Categories

**Primary (60% - Backgrounds and neutrals)**
- `primary.lightest` - #FAF8F5 - Main background
- `primary.light` - #F5F1E8 - Secondary background
- `primary.base` - #E8DCC8 - Borders and dividers
- `primary.text` - #2D3A35 - Primary text (soft black)
- `primary.textSoft` - #4B5563 - Secondary text

**Secondary (30% - Supporting colors)**
- `secondary.deepGreen` - #5A7367 - Important UI elements
- `secondary.olive` - #8B956D - Subtle accents
- `secondary.teal` - #6B9A9E - Informational elements
- `secondary.graphiteLight` - #6B7280 - Muted text

**Accent (10% - CTAs and highlights)**
- `accent.terracotta` - #D4726F - Primary accent
- `accent.terracottaLight` - #E09C9A - Light variant
- `accent.terracottaDark` - #B85E5B - Dark variant

**Semantic**
- `semantic.success` - For success messages
- `semantic.warning` - For warnings
- `semantic.error` - For errors
- `semantic.info` - For informational messages

## Typography

### Using Typography Tokens

```typescript
// Apply typography preset
const headingStyle = {
  ...typography.h1,
  color: colors.primary.text,
};

// Individual properties
const textStyle = {
  fontSize: fontSizes.body,
  fontWeight: fontWeights.medium,
  lineHeight: lineHeights.relaxed,
  letterSpacing: letterSpacing.normal,
};
```

### Typography Scale

```typescript
// Font sizes
fontSizes.h1        // 32px - Main headers
fontSizes.h2        // 24px - Section headers
fontSizes.h3        // 20px - Subsection headers
fontSizes.subheader // 22px - Large subheader
fontSizes.subtitle  // 18px - Regular subheader
fontSizes.body      // 16px - Primary body text
fontSizes.bodySmall // 14px - Secondary body text
fontSizes.caption   // 12px - Captions and helper text

// Font weights
fontWeights.light    // 300
fontWeights.normal   // 400
fontWeights.medium   // 500
fontWeights.semibold // 600
fontWeights.bold     // 700

// Line heights
lineHeights.tight   // 1.2
lineHeights.normal  // 1.5
lineHeights.relaxed // 1.7
lineHeights.loose   // 1.8
```

### Tailwind Typography Classes

```jsx
<h1 className="text-3xl font-semibold">...</h1>  // 32px
<h2 className="text-2xl font-semibold">...</h2>  // 24px
<p className="text-lg">...</p>                    // 18px
<p className="text-base">...</p>                  // 16px - body
<small className="text-sm">...</small>            // 14px
```

## Spacing

### Using Spacing Tokens

```typescript
// Component spacing
const cardStyle = {
  padding: spacing.lg,
  gap: spacing.md,
  marginBottom: spacing.xl,
};

// Touch targets
const buttonStyle = {
  minHeight: spacing.touchTarget, // 44px minimum
};
```

### Spacing Scale

```typescript
spacing.xs    // 4px
spacing.sm    // 8px
spacing.md    // 16px
spacing.lg    // 24px
spacing.xl    // 32px
spacing['2xl'] // 48px
spacing['3xl'] // 64px
spacing['4xl'] // 96px

spacing.touchTarget // 44px - minimum for mobile
```

### Component-Specific Spacing

```typescript
// Button padding
spacing.component.padding.button // '12px 24px'

// Input padding
spacing.component.padding.input // '12px 16px'

// Card padding
spacing.component.padding.card // '24px'

// Gap variations
spacing.component.gap.tight    // 8px
spacing.component.gap.normal   // 16px
spacing.component.gap.relaxed  // 24px
spacing.component.gap.loose    // 32px
```

### Tailwind Spacing Classes

```jsx
<div className="p-6">...</div>           // 24px padding
<div className="gap-4">...</div>         // 16px gap
<div className="space-y-8">...</div>     // 32px vertical spacing
<button className="min-h-touch">...</button> // 44px minimum height
```

## Border Radius

```typescript
borderRadius.sm   // 8px
borderRadius.md   // 12px
borderRadius.lg   // 16px
borderRadius.xl   // 20px
borderRadius['2xl'] // 24px
borderRadius.full // 9999px (fully rounded)
```

### Tailwind Classes

```jsx
<div className="rounded-xl">...</div>    // 16px
<div className="rounded-2xl">...</div>   // 24px
<button className="rounded-full">...</button>
```

## Shadows

```typescript
shadows.sm // Subtle shadow
shadows.md // Medium shadow
shadows.lg // Large shadow
shadows.xl // Extra large shadow

// Elevation shadows
shadows.elevation.low    // 0 2px 8px rgba(90, 115, 103, 0.08)
shadows.elevation.medium // 0 8px 24px rgba(90, 115, 103, 0.12)
shadows.elevation.high   // 0 16px 48px rgba(90, 115, 103, 0.16)
```

### Tailwind Classes

```jsx
<div className="shadow-elevation-low">...</div>
<div className="shadow-elevation-medium">...</div>
<div className="shadow-elevation-high">...</div>
```

## Best Practices

### 1. Use Design Tokens First

❌ **Don't:**
```typescript
const style = { color: '#5A7367', fontSize: '16px' };
```

✅ **Do:**
```typescript
const style = { 
  color: colors.secondary.deepGreen, 
  fontSize: fontSizes.body 
};
```

### 2. Maintain Visual Hierarchy

```jsx
<h1 className="text-3xl font-semibold">Main Title</h1>      // 32px
<h2 className="text-xl font-medium">Subheading</h2>         // 22px
<p className="text-base">Body content</p>                    // 16px
<small className="text-sm text-secondary-graphiteLight">Helper text</small> // 14px
```

### 3. Ensure Accessibility

- Minimum touch targets: 44px
- Text contrast: WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Focus visible: Use focus-visible classes

```jsx
<button 
  className="min-h-touch min-w-touch focus-visible:ring-2 focus-visible:ring-secondary-deepGreen"
>
  Accessible Button
</button>
```

### 4. Responsive Design

```jsx
<div className="p-4 sm:p-6 md:p-8">
  <h1 className="text-2xl sm:text-3xl">Responsive Title</h1>
  <div className="flex flex-col sm:flex-row gap-4">
    {/* Content */}
  </div>
</div>
```

### 5. Consistent Spacing

Use the spacing scale for all margins, padding, and gaps:

```jsx
<div className="space-y-8">         {/* 32px between children */}
  <section className="mb-6">        {/* 24px bottom margin */}
    <div className="p-4 gap-4">     {/* 16px padding and gap */}
      {/* Content */}
    </div>
  </section>
</div>
```

## Common Patterns

### Button Styles

```typescript
// Primary button
<button className="px-8 py-4 bg-secondary-deepGreen text-white rounded-xl font-semibold min-h-[56px]">
  Primary Action
</button>

// Secondary button
<button className="px-6 py-3 bg-white/70 text-secondary-deepGreen rounded-xl font-medium min-h-[48px]">
  Secondary Action
</button>
```

### Card Styles

```typescript
<div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-elevation-low">
  {/* Card content */}
</div>
```

### Input Styles

```typescript
<input 
  className="w-full px-5 py-4 rounded-xl border-2 border-transparent bg-white/60 focus:border-secondary-deepGreen/30 focus:ring-4 focus:ring-secondary-deepGreen/10 min-h-[56px]"
  style={{ fontSize: '16px' }}
/>
```

### Form Layout

```jsx
<form className="space-y-6">
  <div className="space-y-2">
    <label className="text-base font-medium">Label</label>
    <input className="..." />
  </div>
  <button className="..." type="submit">Submit</button>
</form>
```

## Migration Guide

If you need to update existing components:

1. Replace hardcoded colors with design tokens
2. Update font sizes to match typography scale
3. Ensure minimum touch targets (44px)
4. Add proper ARIA labels
5. Use consistent spacing from the scale

## Resources

- Design System Documentation: `src/design-system/README.md`
- Color Tokens: `src/design-system/colors/index.ts`
- Typography Tokens: `src/design-system/typography/index.ts`
- Spacing Tokens: `src/design-system/spacing/index.ts`
- Tailwind Config: `tailwind.config.js`
