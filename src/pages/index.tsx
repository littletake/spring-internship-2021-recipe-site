import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { getRecipeList, QueryParameterGetRecipe } from '../lib/recipe';

import type { PagingLinks, Recipe } from '../types/recipe';
import { ListPage } from 'src/components/templates/listPage';
import Layout from 'src/components/templates/layout';

type TopPageProps = {
  recipeList: Recipe[];
  pagingLink: PagingLinks;
};

const TopPage: NextPage<TopPageProps> = ({ recipeList, pagingLink }) => {
  if (recipeList === null || pagingLink == null) {
    return <div>loading...</div>;
  }

  return (
    <Layout title="トップページ">
      <ListPage recipeList={recipeList} pagingLink={pagingLink} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query?.page;
  if (page === undefined || String(page) === '') {
    const queryParameterGet: QueryParameterGetRecipe = {};
    const response = await getRecipeList(queryParameterGet);
    return {
      props: {
        recipeList: response.recipes,
        pagingLink: response.links,
      },
    };
  } else {
    const queryParameterGet: QueryParameterGetRecipe = {
      page: Number(page),
    };
    const response = await getRecipeList(queryParameterGet);
    return {
      props: {
        recipeList: response.recipes,
        pagingLink: response.links,
      },
    };
  }
};
export default TopPage;
