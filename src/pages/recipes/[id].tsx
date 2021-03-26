import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getRecipe, QueryParameterGetRecipe } from '../../lib/recipe';

import type { Recipe } from '../../types/recipe';
import { RecipePage } from 'src/components/templates/recipePage';
import Layout from 'src/components/templates/layout';

type Props = {
  hostname: string;
  recipe: Recipe;
};

const EachPage: NextPage<Props> = (props) => {
  const { hostname, recipe } = props;
  const router = useRouter();
  const url = hostname + router.asPath;
  if (recipe === null) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Head>
        <meta property="og:title" content={recipe.title} />
        {recipe.image_url && (
          <meta property="og:image" content={recipe.image_url} />
        )}
        <meta property="og:url" content={url} />
      </Head>
      <Layout title="詳細ページ">
        <RecipePage recipe={recipe} />
      </Layout>
    </>
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
        hostname: context.req.headers.host,
        recipe: response.recipes[0],
      },
    };
  }
};

export default EachPage;
