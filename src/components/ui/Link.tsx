import { twMerge } from 'tailwind-merge';
import { MouseEventHandler, ReactNode } from 'react';

interface Props {
  href?: string;
  className?: string;
  target?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  disabled?: boolean;
  children?: ReactNode;
}

export const Link = (props: Props) => {
  return (
    <a
      className={twMerge('hover:underline', 'cursor-pointer', props.className)}
      href={props.href}
      target={props.target}
      onClick={props.onClick}
    >
      {props.children}
    </a>
  );
};
