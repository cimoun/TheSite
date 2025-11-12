# Quick Start Guide

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Visit http://localhost:5173/

# Build for production
npm run build

# Type check
npm run lint
```

## Import Components

```tsx
import {
  Button,
  Input,
  Textarea,
  Modal,
  ToastProvider,
  useToast,
} from './components';
```

## Quick Examples

### 1. Button

```tsx
// Basic usage
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

// With loading state
<Button variant="danger" isLoading loadingText="Saving...">
  Save
</Button>

// All variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>
```

### 2. Input

```tsx
const [value, setValue] = useState('');
const [error, setError] = useState('');

<Input
  label="Email"
  type="email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error={error}
  isValid={value.length > 0 && !error}
  required
  helperText="Enter a valid email address"
/>
```

### 3. Textarea

```tsx
const [message, setMessage] = useState('');

<Textarea
  label="Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  rows={4}
  placeholder="Enter your message..."
  helperText="Maximum 500 characters"
  error={message.length > 500 ? 'Too long' : ''}
  isValid={message.length > 0 && message.length <= 500}
/>
```

### 4. Modal

```tsx
const [isOpen, setIsOpen] = useState(false);

<>
  <Button onClick={() => setIsOpen(true)}>
    Open Modal
  </Button>

  <Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="My Modal"
    closeOnBackdropClick
    closeOnEsc
  >
    <p>Modal content here</p>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </Modal>
</>
```

### 5. Toast Notifications

```tsx
// 1. Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider position="top-right">
      <YourComponent />
    </ToastProvider>
  );
}

// 2. Use the toast hook
function YourComponent() {
  const { showToast } = useToast();

  return (
    <>
      <Button onClick={() => showToast('Success!', 'success')}>
        Show Success
      </Button>
      <Button onClick={() => showToast('Error occurred', 'error')}>
        Show Error
      </Button>
      <Button onClick={() => showToast('Warning!', 'warning')}>
        Show Warning
      </Button>
      <Button onClick={() => showToast('Info message', 'info')}>
        Show Info
      </Button>
    </>
  );
}
```

## Custom Styling

All components support custom Tailwind classes:

```tsx
// Full-width button
<Button className="w-full">Full Width</Button>

// Custom input styling
<Input className="bg-blue-50 border-2 border-blue-300" />

// Large modal
<Modal className="max-w-4xl">
  Large modal content
</Modal>
```

## TypeScript Types

```tsx
import type {
  ButtonVariant,
  ButtonProps,
  InputProps,
  TextareaProps,
  ModalProps,
  ToastType,
  Toast,
} from './components';

// Type-safe button variant
const variant: ButtonVariant = 'primary';

// Type-safe toast
const handleSuccess = () => {
  showToast('Operation successful', 'success', 5000);
};
```

## Accessibility Features

All components include:

- **Keyboard Navigation**: Tab, Enter, Escape keys
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Visible focus indicators
- **Required Fields**: Visual and semantic indicators
- **Error Announcements**: Screen reader announcements for errors

Example:
```tsx
<Input
  label="Email"
  id="email-input"
  required
  aria-describedby="email-helper"
  error="Invalid email format"
/>
```

## Animation Specifications

- **Buttons**: Hover scale (1.02) and tap scale (0.98) - 0.2s
- **Inputs**: Focus scale (1.01) - 0.2s
- **Modal**: Spring animation (stiffness: 300, damping: 30)
- **Toast**: Fade in/out - 0.3s

## Tips & Best Practices

1. **Always provide labels** for inputs and textareas for accessibility
2. **Use error states** to provide clear feedback to users
3. **Wrap your app** with ToastProvider at the root level
4. **Handle modal closing** properly with both ESC and backdrop clicks
5. **Use loading states** on buttons for async operations
6. **Validate inputs** before showing success states
7. **Keep toast messages** short and actionable

## Common Patterns

### Form with Validation

```tsx
function MyForm() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitForm(formData);
      showToast('Form submitted successfully!', 'success');
    } catch (error) {
      showToast('Submission failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        required
      />
      
      <Textarea
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        error={errors.message}
        required
      />
      
      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        loadingText="Submitting..."
      >
        Submit
      </Button>
    </form>
  );
}
```

## Troubleshooting

### Issue: Toast not appearing
**Solution**: Make sure your component is wrapped with `ToastProvider`

### Issue: TypeScript errors with motion props
**Solution**: Our types already exclude conflicting props (onDrag, onAnimationStart, etc.)

### Issue: Modal not closing with ESC
**Solution**: Ensure `closeOnEsc={true}` is set and modal is properly mounted

### Issue: Styles not applying
**Solution**: Make sure Tailwind CSS is properly configured and the CSS file is imported

For more details, see [COMPONENTS.md](./COMPONENTS.md)
