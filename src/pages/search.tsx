import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Layout from 'src/components/templates/layout';
import { ListPage } from 'src/components/templates/listPage';
import { QueryParameterSearch, search } from 'src/lib/search';
import { PagingLinks, Recipe } from 'src/types/recipe';

type SearchProps = {
  searchWord: string;
  recipeList: Recipe[];
  pagingLink: PagingLinks;
};

const Search: NextPage<SearchProps> = ({
  searchWord,
  recipeList,
  pagingLink,
}) => {
  const subtitle: string = '検索結果：' + searchWord;

  if (recipeList === null || pagingLink === null) {
    return <div>loading...</div>;
  }

  return (
    <Layout title={subtitle}>
      <ListPage recipeList={recipeList} pagingLink={pagingLink} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const keyword = decodeURIComponent(String(context.query?.keyword));
  if (keyword === 'undefined' || keyword === '') {
    // 検索する際は必ずクエリに検索ワードがある
    return {
      notFound: true,
    };
  } else {
    if (context.query.page === undefined || String(context.query.page) == '') {
      const queryParameterSearch: QueryParameterSearch = {
        keyword: keyword,
      };
      const response = await search(queryParameterSearch);
      return {
        props: {
          searchWord: keyword,
          recipeList: response.recipes,
          pagingLink: response.links,
        },
      };
    } else {
      const queryParameterSearch: QueryParameterSearch = {
        keyword: keyword,
        page: Number(context.query.page),
      };
      const response = await search(queryParameterSearch);
      return {
        props: {
          searchWord: keyword,
          recipeList: response.recipes,
          pagingLink: response.links,
        },
      };
    }
  }
};

export default Search;
