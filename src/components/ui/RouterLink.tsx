import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';
import { Link, LinkProps } from '@tanstack/react-router';

interface Props extends LinkProps {
  children: ReactNode;
  target?: string;
  className?: string;
}

export const RouterLink = ({ children, ...props }: Props) => {
  return (
    <Link className={twMerge('hover:underline', props.className)} {...props}>
      {children}
    </Link>
  );
};
