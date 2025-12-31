'use client';

import Link from 'next/link';

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'transparent' | 'header';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function CTAButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  disabled = false,
}: CTAButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-colors duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    transparent: 'btn-transparent',
    header: 'btn-primary text-lg font-bold',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
