import useSWRInfinite from "swr/infinite";
import { last } from "lodash";

type CollectionOutput<T> = {
  repos: T[];
  isValidating: boolean;
  isLoading: boolean;
  loadMore: () => void;
  isReachedEnd: boolean;
  isReady: boolean;
  isEmpty: boolean;
};

type ResponseBody = {
  id: number;
  title: string;
};

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const PAGE_SIZE = 5;

const getUrl = (pageIndex: number) =>
  `https://api.github.com/repos/vercel/next.js/issues?per_page=${PAGE_SIZE}&page=${
    pageIndex + 1
  }`;

const getKey = (pageIndex: number, previousPageData: ResponseBody[]) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end

  return getUrl(pageIndex); // SWR key
};

export const useRepos = (): CollectionOutput<ResponseBody> => {
  const { data, setSize, isValidating, isLoading, error } = useSWRInfinite(
    getKey,
    fetcher
  );

  return {
    isReady: Boolean(data || error),
    loadMore: () => setSize((size) => size + 1),
    repos: data ? [].concat(...data) : [],
    isReachedEnd: Boolean(error) || last(data)?.length === 0,
    isEmpty: data?.length === 0,
    isValidating,
    isLoading,
  };
};
