import { SearchInput } from '../ui/SearchInput';
import { RouterLink } from '../ui/RouterLink';
import { Link } from '~/components/ui/Link';

export const Footer = () => {
  return (
    <footer className="flex justify-center mt-5 py-5 w-full border-t-4 border-stone-700">
      <div className="flex flex-col space-y-2">
        <div className="max-w-sm">
          <SearchInput />
        </div>
        <div className="text-xs">
          <Link href="https://gerieshandal.com" className="text-slate-50">
            by @gtothesquare
          </Link>
        </div>
      </div>
    </footer>
  );
};
