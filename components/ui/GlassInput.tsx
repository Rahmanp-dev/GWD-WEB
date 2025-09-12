import React, { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

// Define a type that can handle props for both input and textarea
type GlassInputProps = (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>) & {
  as?: 'input' | 'textarea';
  label?: string;
  type?: string;
};

export const GlassInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, GlassInputProps>(({ as: Component = 'input', className, type, label, ...props }, ref) => {

  // Base class for the input/textarea
  const baseClass = "input-glass";

  if (type === 'checkbox') {
    const checkboxId = props.id || `checkbox-${props.name}`;
    return (
      <div className="flex items-center gap-3">
        <input 
          ref={ref as React.Ref<HTMLInputElement>} 
          type="checkbox" 
          id={checkboxId}
          className={`custom-checkbox ${className || ''}`.trim()} 
          {...(props as InputHTMLAttributes<HTMLInputElement>)} 
        />
        {label && <label htmlFor={checkboxId} className="text-sm font-medium text-white cursor-pointer">{label}</label>}
      </div>
    );
  }

  const combinedClassName = `${baseClass} ${className || ''}`.trim();

  if (Component === 'textarea') {
    return <textarea 
              ref={ref as React.Ref<HTMLTextAreaElement>} 
              className={combinedClassName} 
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} 
            />;
  }
  
  return <input 
            ref={ref as React.Ref<HTMLInputElement>} 
            type={type}
            className={combinedClassName} 
            {...(props as InputHTMLAttributes<HTMLInputElement>)} 
          />;
});

GlassInput.displayName = 'GlassInput';
