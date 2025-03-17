
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  variant?: 'default' | 'dark' | 'accent';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverable = false,
  variant = 'default'
}) => {
  return (
    <div
      className={cn(
        'rounded-xl border p-4 backdrop-blur-md transition-all duration-300',
        variant === 'default' && 'bg-white/5 border-white/10',
        variant === 'dark' && 'bg-black/30 border-white/10',
        variant === 'accent' && 'bg-sportiq-blue/10 border-sportiq-blue/30',
        hoverable && 'hover:bg-white/10 hover:scale-[1.02] cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
