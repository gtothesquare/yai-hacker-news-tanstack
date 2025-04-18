import { RouterLink } from '../ui/RouterLink';

export const Header = () => {
  return (
    <header className="mb-2 py-1 w-full bg-stone-700">
      <div className="flex mx-auto w-full max-w-5xl px-4 py-2">
        <h1 className="text-3xl font-thin">
          <RouterLink href={'/'} className="text-slate-50">
            YHK - yet another hacker news clone
          </RouterLink>
        </h1>
      </div>
    </header>
  );
};
