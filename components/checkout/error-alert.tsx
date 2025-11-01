import React from 'react';

interface ErrorAlertProps {
  title?: string;
  description?: string;
  onClose?: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ title, description, onClose }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
      {title && <h3 className="font-medium text-lg mb-2">{title}</h3>}
      {description && <p className="text-sm">{description}</p>}
      {onClose && (
        <button
          className="absolute right-2 top-2 text-red-500 hover:text-red-700"
          onClick={onClose}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
