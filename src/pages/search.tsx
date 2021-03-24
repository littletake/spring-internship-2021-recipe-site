import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from 'src/components/templates/layout'
import { SearchPage } from 'src/components/templates/searchPage'
import { getRecipeList } from 'src/lib/recipe'
import { search } from 'src/lib/search'
import { PagingLinks, Recipe } from 'src/types/recipe'

// type SearchProps = {
//   response: Response
// }

const Search: NextPage = () => {
  const router = useRouter()
  const keyword = String(router.query.keyword)
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
  const init = async () => {
    const response = await search(keyword)
    setRecipeList(response.recipes)
    setPagingLink(response.links)
  }

  React.useEffect(() => {
    init()
  }, [keyword])
  if (recipeList === null) {
    return <div>loading...</div>
  }

  return (
    <Layout title={keyword}>
      <SearchPage
        recipeList={recipeList}
        onClickPrev={handleOnClickPrev}
        onClickNext={handleOnClickNext}
      />
    </Layout>
  )
}

// export const getServerSideProp: GetServerSideProps = async (context) => {
//   const word = String(context.params?.keyword)
//   console.log(word)
// }

export default Search
