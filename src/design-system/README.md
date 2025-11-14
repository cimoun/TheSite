# Design System Documentation

This design system follows modern UI/UX best practices and accessibility guidelines.

## Color Palette

Our color palette follows the **60/30/10 rule**:

- **60% Primary**: Neutral backgrounds and base colors
- **30% Secondary**: Supporting colors for context and hierarchy
- **10% Accent**: Call-to-action and highlights

### Primary Colors (60%)
- Main backgrounds: `#FAF8F5`, `#F5F1E8`
- Text colors: `#2D3A35` (replaces pure black for reduced eye strain)
- Borders: `#E8DCC8`

### Secondary Colors (30%)
- Deep Green: `#5A7367` - Important UI elements
- Olive: `#8B956D` - Subtle accents
- Teal: `#6B9A9E` - Informational elements

### Accent Colors (10%)
- Terracotta: `#D4726F` - Primary accent for CTAs
- Variants: `#E09C9A` (light), `#B85E5B` (dark)

## Typography

Two-font system using **Inter** as primary font with system fallbacks.

### Font Sizes
- **Headers**: 32px (h1), 24px (h2), 20px (h3)
- **Subheaders**: 22px (large), 18px (regular)
- **Body**: 16px (primary), 14px (secondary), 12px (caption)

### Font Weights
- Light: 300
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Spacing

Consistent spacing scale based on 4px increments:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 96px

### Touch Targets
Minimum touch target size: **44px** (for mobile accessibility)

## Accessibility

All colors are verified for WCAG contrast compliance:
- Text on backgrounds: Minimum AA (4.5:1)
- Large text: Minimum AA (3:1)
- Interactive elements: Clear focus states

## Usage

```typescript
import { colors, typography, spacing } from '@/design-system';

// Using colors
const buttonStyle = {
  backgroundColor: colors.accent.terracotta,
  color: colors.primary.lightest,
};

// Using typography
const headingStyle = {
  ...typography.h1,
  color: colors.primary.text,
};

// Using spacing
const cardStyle = {
  padding: spacing.lg,
  gap: spacing.md,
};
```
