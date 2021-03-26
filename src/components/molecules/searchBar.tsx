import { useRouter } from 'next/router';
import React, { FormEvent } from 'react';
import { MyButton } from '../atoms/myButton';
import { MyInput } from '../atoms/myInput';

export type SearchBarPropType = {
  classNameForm: string;
  classNameInput: string;
  classNameButton: string;
};

export const SearchBar: React.VFC<SearchBarPropType> = ({
  classNameForm,
  classNameInput,
  classNameButton,
}) => {
  const router = useRouter();
  const [searchWord, setSearchWord] = React.useState<string>('');
  const handleSubmit = (e: FormEvent) => {
    if (searchWord != '') {
      e.preventDefault();
      router.push({
        pathname: '/search',
        query: { keyword: encodeURIComponent(searchWord) },
      });
      // }`/search?keyword=${encodeURIComponent(searchWord)}`);
    } else {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classNameForm}>
      <MyInput
        className={classNameInput}
        placeholder="Search..."
        value={searchWord}
        onChange={setSearchWord}
      />
      <MyButton className={classNameButton} title="検索" type="submit" />
    </form>
  );
};
