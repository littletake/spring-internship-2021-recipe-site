import router from 'next/router'
import React, { FormEvent } from 'react'
import { MyButton } from '../atoms/myButton'
import { MyInput } from '../atoms/myInput'

export type SearchBarPropType = {
  classNameForm: string
  classNameInput: string
  classNameButton: string
}

export const SearchBar: React.VFC<SearchBarPropType> = ({
  classNameForm,
  classNameInput,
  classNameButton,
}) => {
  const [searchWord, setSearchWord] = React.useState<string>('')
  const [hidden, setHidden] = React.useState<boolean>(false)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push(`/search/?keyword=${encodeURIComponent(searchWord)}`)
  }

  const handleOnChange = (text: string) => {
    setSearchWord(text)
    if (searchWord != '') {
      setHidden(true)
    } else {
      setHidden(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classNameForm}>
      <MyInput
        className={classNameInput}
        placeholder="Search..."
        value={searchWord}
        onChange={handleOnChange}
      />

      {hidden ? (
        <MyButton className={classNameButton} title="検索" type="submit" />
      ) : (
        <MyButton className={classNameButton} title="検索" type="button" />
      )}
    </form>
  )
}
