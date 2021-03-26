import { Response } from '../types/recipe';
import { fetchApi } from './util';

// request
export type QueryParameterSearch = {
  // 検索キーワード。マルチバイト文字列の場合は URL Encode が必用。
  keyword: string;

  // ページネーションする場合に指定するページ番号
  page?: number;
};

export const search = async (
  query: QueryParameterSearch,
): Promise<Response> => {
  const res = await fetchApi('GET', '/search', { parameter: query });
  const response: Response = await res.json();
  return response;
};
