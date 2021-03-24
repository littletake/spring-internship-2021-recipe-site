import React from 'react'
import type { NextPage } from 'next'
import { getRecipeList } from '../lib/recipe'

import type { PagingLinks, Recipe } from '../types/recipe'
import { SearchPage } from 'src/components/templates/searchPage'

const TopPage: NextPage = () => {
  const [recipeList, setRecipeList] = React.useState<Recipe[] | null>(null)
  const [pagingLink, setPagingLink] = React.useState<PagingLinks | null>(null)

  const handleOnClickNext = async () => {
    if (pagingLink && pagingLink.next) {
      const response = await getRecipeList(pagingLink.next)
      setRecipeList(response.recipes)
      setPagingLink(response.links)
      window.scrollTo(0, 0)
    } else {
      return null
    }
  }

  const handleOnClickPrev = async () => {
    if (pagingLink && pagingLink.prev) {
      const response = await getRecipeList(pagingLink.prev)
      setRecipeList(response.recipes)
      setPagingLink(response.links)
      window.scrollTo(0, 0)
    } else {
      return null
    }
  }

  // 初期処理
  const init = async () => {
    const response = await getRecipeList(null)
    setRecipeList(response.recipes)
    setPagingLink(response.links)
  }
  React.useEffect(() => {
    init()
  }, [])
  if (recipeList === null) {
    return <div>loading...</div>
  }

  return (
    <SearchPage
      recipeList={recipeList}
      onClickNext={handleOnClickNext}
      onClickPrev={handleOnClickPrev}
    />
  )
}

export default TopPage
