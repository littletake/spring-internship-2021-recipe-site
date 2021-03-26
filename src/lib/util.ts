type HttpMethod = 'GET' | 'POST' | 'DELETE';

const API_ENDPOINT = 'https://internship-recipe-api.ckpd.co';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchApi = async (
  method: HttpMethod,
  endpoint: string,
  { parameter, body }: { parameter?: any; body?: any },
): Promise<Response> => {
  if (!API_KEY) throw new Error('No API KEY');

  const parameterString = parameter
    ? '?' + new URLSearchParams(parameter).toString()
    : '';
  const url = API_ENDPOINT + endpoint + parameterString;
  return await fetch(url, {
    method: method,
    headers: { 'X-Api-Key': API_KEY },
    body: JSON.stringify(body),
  });
};
