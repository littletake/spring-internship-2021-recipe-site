import { Response } from '../types/recipe';
import { fetchApi } from './util';

// request
export type QueryParameterGetRecipe = {
  // ページネーションする場合に指定するページ番号。
  page?: number;

  // レシピIDをカンマで区切って複数指定でる。指定できるIDの数の上限は10。
  // idを指定した場合はページネーションはできないのでidとpageは同時に指定できない。
  id?: string;
};

export const getRecipeList = async (
  query: QueryParameterGetRecipe,
): Promise<Response> => {
  const res = await fetchApi('GET', '/recipes', { parameter: query });
  const response: Response = await res.json();
  return response;
};

export const getRecipe = async (
  query: QueryParameterGetRecipe,
): Promise<Response> => {
  const res = await fetchApi('GET', '/recipes', { parameter: query });
  const response: Response = await res.json();
  return response;
};
