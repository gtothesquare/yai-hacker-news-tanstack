import { TextInput } from '~/components/ui/TextInput';

interface Props {
  currentQuery?: string;
  url: string;
  encType?: string;
  method: string;
}

export const SearchInput = ({ currentQuery, encType, method, url }: Props) => {
  return (
    <form
      className="flex space-x-2 align-middle w-full"
      action={url}
      method={method}
      encType={encType}
    >
      <TextInput
        label="Search"
        placeholder="Search..."
        id="searchField"
        name="q"
        type="search"
        autoCorrect="off"
        spellCheck={false}
        autoCapitalize="none"
        defaultValue={currentQuery}
      />
    </form>
  );
};
