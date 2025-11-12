import React, { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Modal,
  ToastProvider,
  useToast,
} from './components';

// Demo component that uses the toast hook
const ComponentsDemo: React.FC = () => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Basic validation example
    if (value.length > 0 && value.length < 3) {
      setInputError('Input must be at least 3 characters');
    } else {
      setInputError('');
    }
  };

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Action completed successfully!', 'success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React Component Library
          </h1>
          <p className="text-lg text-gray-600">
            Production-ready components with TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </div>

        <div className="space-y-12">
          {/* Button Section */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Button Variants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="primary" onClick={() => showToast('Primary button clicked!', 'info')}>
                Primary
              </Button>
              <Button variant="secondary" onClick={() => showToast('Secondary button clicked!', 'info')}>
                Secondary
              </Button>
              <Button variant="danger" onClick={() => showToast('Danger button clicked!', 'error')}>
                Danger
              </Button>
              <Button variant="ghost" onClick={() => showToast('Ghost button clicked!', 'info')}>
                Ghost
              </Button>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Loading State</h3>
              <Button
                variant="primary"
                isLoading={isLoading}
                loadingText="Processing..."
                onClick={handleLoadingDemo}
              >
                Simulate Loading
              </Button>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Disabled State</h3>
              <Button variant="primary" disabled>
                Disabled Button
              </Button>
            </div>
          </section>

          {/* Input Section */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Input Component</h2>
            <div className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                required
                helperText="We'll never share your email with anyone else."
              />
              <Input
                label="Username"
                type="text"
                placeholder="Enter username"
                value={inputValue}
                onChange={handleInputChange}
                error={inputError}
                isValid={inputValue.length >= 3}
              />
              <Input
                label="Disabled Input"
                type="text"
                placeholder="This input is disabled"
                disabled
              />
            </div>
          </section>

          {/* Textarea Section */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Textarea Component</h2>
            <div className="space-y-6">
              <Textarea
                label="Message"
                placeholder="Enter your message here..."
                rows={4}
                helperText="Maximum 500 characters"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                isValid={textareaValue.length > 0 && textareaValue.length <= 500}
                error={textareaValue.length > 500 ? 'Message is too long' : ''}
              />
              <Textarea
                label="Disabled Textarea"
                placeholder="This textarea is disabled"
                rows={3}
                disabled
              />
            </div>
          </section>

          {/* Modal Section */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Modal Component</h2>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Example Modal"
              closeOnBackdropClick={true}
              closeOnEsc={true}
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  This is a modal dialog with smooth spring animations (stiffness: 300, damping: 30).
                  It supports:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Keyboard navigation (ESC to close)</li>
                  <li>Click outside to close</li>
                  <li>Focus trap and accessibility features</li>
                  <li>Custom Tailwind CSS classes</li>
                </ul>
                <div className="flex gap-3 mt-6">
                  <Button
                    variant="primary"
                    onClick={() => {
                      showToast('Changes saved!', 'success');
                      setIsModalOpen(false);
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
          </section>

          {/* Toast Section */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Toast Notifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="primary" onClick={() => showToast('This is an info toast!', 'info')}>
                Show Info
              </Button>
              <Button
                variant="primary"
                onClick={() => showToast('Operation successful!', 'success')}
                className="bg-green-600 hover:bg-green-700"
              >
                Show Success
              </Button>
              <Button
                variant="primary"
                onClick={() => showToast('Warning: Check your input!', 'warning')}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                Show Warning
              </Button>
              <Button variant="danger" onClick={() => showToast('An error occurred!', 'error')}>
                Show Error
              </Button>
            </div>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 Toast notifications appear in the top-right corner with fade transitions (duration: 0.3s)
                and auto-dismiss after 3 seconds.
              </p>
            </div>
          </section>

          {/* Custom Classes Section */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Custom Tailwind Classes</h2>
            <p className="text-gray-700 mb-4">
              All components accept custom Tailwind CSS classes:
            </p>
            <div className="space-y-4">
              <Button variant="primary" className="w-full text-lg py-3">
                Full Width Large Button
              </Button>
              <Input
                label="Custom Styled Input"
                placeholder="Custom classes applied"
                className="bg-blue-50 border-blue-300"
              />
            </div>
          </section>
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Built with React, TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </footer>
      </div>
    </div>
  );
};

// Main App component with ToastProvider
function App() {
  return (
    <ToastProvider position="top-right">
      <ComponentsDemo />
    </ToastProvider>
  );
}

export default App;
