# React Component Library

A production-ready React component library built with **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Features

- ✅ **TypeScript** - Full type safety with comprehensive interfaces
- ✅ **Tailwind CSS** - Utility-first styling with custom class support
- ✅ **Framer Motion** - Smooth, professional animations
- ✅ **Accessibility** - ARIA labels, keyboard navigation, and screen reader support
- ✅ **Responsive** - Mobile-first design approach
- ✅ **Production-Ready** - Optimized and tested components

## 📦 Components

### Button Component

Four variants with loading states and smooth hover effects.

**Variants:**
- `primary` - Blue primary button
- `secondary` - Gray secondary button
- `danger` - Red danger button
- `ghost` - Transparent ghost button

**Features:**
- Loading state with spinner
- Disabled state
- Smooth hover animations (0.2s duration)
- Custom Tailwind classes support

**Usage:**
```tsx
import { Button } from './components';

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

<Button variant="danger" isLoading loadingText="Processing...">
  Submit
</Button>
```

### Input Component

Controlled input with validation and error states.

**Features:**
- Label support with required indicator
- Error state with icon and message
- Valid state with checkmark icon
- Helper text support
- Smooth focus animations (0.2s duration)
- Custom Tailwind classes support

**Usage:**
```tsx
import { Input } from './components';

<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  required
  error={emailError}
  isValid={isEmailValid}
  helperText="We'll never share your email."
/>
```

### Textarea Component

Multi-line text input with validation.

**Features:**
- Same features as Input component
- Resizable (vertical only)
- Error and valid states
- Custom Tailwind classes support

**Usage:**
```tsx
import { Textarea } from './components';

<Textarea
  label="Message"
  placeholder="Enter your message..."
  rows={4}
  error={messageError}
  isValid={isMessageValid}
  helperText="Maximum 500 characters"
/>
```

### Modal Component

Dialog component with spring animations.

**Features:**
- Spring animations (stiffness: 300, damping: 30)
- Backdrop with opacity transition
- ESC key to close
- Click outside to close (configurable)
- Body scroll lock when open
- Focus management
- Custom Tailwind classes support

**Usage:**
```tsx
import { Modal } from './components';

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Example Modal"
  closeOnBackdropClick={true}
  closeOnEsc={true}
>
  <div>Modal content goes here</div>
</Modal>
```

### Toast Notification System

Global notification system with fade transitions.

**Features:**
- Four types: `info`, `success`, `warning`, `error`
- Fade transitions (0.3s duration)
- Auto-dismiss after 3 seconds (configurable)
- Positioned in top-right corner (configurable)
- Manual dismiss option
- Icon support for each type

**Usage:**
```tsx
import { ToastProvider, useToast } from './components';

// Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider position="top-right">
      <YourComponent />
    </ToastProvider>
  );
}

// Use the toast hook in your components
function YourComponent() {
  const { showToast } = useToast();
  
  return (
    <Button onClick={() => showToast('Success!', 'success')}>
      Show Toast
    </Button>
  );
}
```

## 🎨 Animation Specifications

All animations follow the requirements:

- **Modal**: Spring animations with stiffness: 300, damping: 30
- **Toast**: Fade transitions with 0.3s duration
- **Buttons**: Smooth hover effects with 0.2s duration
- **Inputs**: Smooth focus effects with 0.2s duration

## ♿ Accessibility

All components include:

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader support
- Required field indicators
- Error announcements

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Opens at `http://localhost:5173/`

### Build

```bash
npm run build
```

Generates optimized production build in `dist/` folder.

### Type Checking

```bash
npm run lint
```

## 📝 TypeScript Types

All components are fully typed. Import types from the components:

```tsx
import { ButtonProps, InputProps, TextareaProps, ModalProps, ToastType } from './components';
```

## 🎯 Custom Styling

All components accept custom Tailwind CSS classes via the `className` prop:

```tsx
<Button variant="primary" className="w-full text-lg py-3">
  Custom Styled Button
</Button>

<Input className="bg-blue-50 border-blue-300" />
```

## 📸 Screenshots

### Component Library Overview
![Component Library](https://github.com/user-attachments/assets/d393865a-936f-4afe-aba3-8d14e095ab6d)

### Modal with Spring Animation
![Modal Component](https://github.com/user-attachments/assets/e9d07306-f676-4cac-b708-0c16c5b06db6)

### Toast Notification
![Toast Notification](https://github.com/user-attachments/assets/d39491eb-f546-4562-b077-d3e80346e637)

### Input Validation (Error State)
![Input Error](https://github.com/user-attachments/assets/b08534f4-c46d-457e-8501-5f6127771918)

### Input Validation (Success State)
![Input Success](https://github.com/user-attachments/assets/5c603cd7-97a0-4a04-8d97-7da54c52614a)

## 🔒 Security

- No security vulnerabilities detected
- All dependencies checked via GitHub Advisory Database
- CodeQL security analysis passed

## 📄 License

ISC

## 🤝 Contributing

Contributions welcome! Please follow the existing code style and include tests for new features.

## 🏗️ Tech Stack

- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Vite 5** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion 11** - Animation library
- **PostCSS & Autoprefixer** - CSS processing

---

Built with ❤️ using modern web technologies
