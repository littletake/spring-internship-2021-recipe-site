import type { GetServerSideProps, NextPage } from 'next';
import { getRecipe, QueryParameterGetRecipe } from '../../lib/recipe';

import type { Recipe } from '../../types/recipe';
import { RecipePage } from 'src/components/templates/recipePage';
import Layout from 'src/components/templates/layout';

type Props = {
  recipe: Recipe;
};

const EachPage: NextPage<Props> = (props) => {
  const { recipe } = props;

  if (recipe === null) {
    return <div>loading...</div>;
  }

  return (
    <Layout title="詳細ページ">
      <RecipePage recipe={recipe} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params?.id);
  if (id === 0 || isNaN(id)) {
    return {
      notFound: true,
    };
  } else {
    const queryParameter: QueryParameterGetRecipe = {
      id: String(id),
    };
    const response = await getRecipe(queryParameter);
    return {
      props: {
        recipe: response.recipes[0],
      },
    };
  }
};

export default EachPage;
