import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function SecondaryButton({ children, ...props }: SecondaryButtonProps) {
  return (
    <button className="secondary-button" {...props}>
      {children}
    </button>
  );
}