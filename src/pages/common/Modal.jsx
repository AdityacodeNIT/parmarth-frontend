import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';

const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  className,
  closeOnOverlayClick = true,
  showCloseButton = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl animate-slide-in-right',
          sizeClasses[size],
          className
        )}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const ModalHeader = ({ children, className }) => (
  <div className={cn('px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700', className)}>
    {children}
  </div>
);

const ModalTitle = ({ children, className }) => (
  <h2 className={cn('text-2xl font-semibold text-gray-900 dark:text-white', className)}>
    {children}
  </h2>
);

const ModalBody = ({ children, className }) => (
  <div className={cn('px-6 py-4', className)}>
    {children}
  </div>
);

const ModalFooter = ({ children, className }) => (
  <div className={cn('px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3', className)}>
    {children}
  </div>
);

export { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter };
