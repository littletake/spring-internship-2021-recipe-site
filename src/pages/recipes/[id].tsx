import type { GetServerSideProps, NextPage } from 'next'
import { getRecipe } from '../../lib/recipe'

import type { Recipe } from '../../types/recipe'
import { RecipePage } from 'src/components/templates/recipePage'
import Layout from 'src/components/templates/layout'

type Props = {
  recipe: Recipe
}

const EachPage: NextPage<Props> = (props) => {
  const { recipe } = props

  if (recipe === null) {
    return <div>loading...</div>
  }

  return (
    <Layout title="詳細ページ">
      <RecipePage recipe={recipe} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params?.id)
  if (id === 0 || isNaN(id)) {
    return {
      notFound: true,
    }
  } else {
    const recipe = await getRecipe(id)
    return {
      props: {
        recipe: recipe,
      },
    }
  }
}

export default EachPage
