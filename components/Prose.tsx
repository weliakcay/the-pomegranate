import { ReactNode } from 'react';
import clsx from 'clsx';
import '@/styles/prose.css';

type ProseProps = {
  children: ReactNode;
  className?: string;
};

export default function Prose({ children, className }: ProseProps) {
  return (
    <div className={clsx('prose prose-lg text-[var(--ink)]', className)}>{children}</div>
  );
}
