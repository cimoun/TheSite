import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

// Omit event handlers that conflict with Framer Motion
type OmitMotionConflicts<T> = Omit<T, 
  | 'onDrag' 
  | 'onDragStart' 
  | 'onDragEnd' 
  | 'onAnimationStart' 
  | 'onAnimationEnd'
>;

// Button component types
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export interface ButtonProps extends OmitMotionConflicts<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
}

// Input component types
export interface InputProps extends OmitMotionConflicts<InputHTMLAttributes<HTMLInputElement>> {
  label?: string;
  error?: string;
  helperText?: string;
  isValid?: boolean;
}

// Textarea component types
export interface TextareaProps extends OmitMotionConflicts<TextareaHTMLAttributes<HTMLTextAreaElement>> {
  label?: string;
  error?: string;
  helperText?: string;
  isValid?: boolean;
}

// Modal component types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
}

// Toast notification types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export interface ToastContainerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}
