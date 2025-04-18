import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

export const Skeleton = ({ className }: Props) => {
  return (
    <div
      className={twMerge('animate-pulse rounded-md bg-gray-700', className)}
    />
  );
};
