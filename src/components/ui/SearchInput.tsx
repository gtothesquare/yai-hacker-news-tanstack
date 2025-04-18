import { TextInput } from '~/components/ui/TextInput';

interface Props {
  currentQuery?: string;
}

export const SearchInput = ({ currentQuery }: Props) => {
  return (
    <form
      className="flex space-x-2 align-middle w-full"
      action="/search"
      method="get"
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
