import useSWRInfinite from "swr/infinite";

type ResponseBoby = {
  id: number;
  title: string;
};

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const PAGE_SIZE = 5;

const getUrl = (pageIndex: number) =>
  `https://api.github.com/repos/reactjs/react-a11y/issues?per_page=${PAGE_SIZE}&page=${
    pageIndex + 1
  }`;

const getKey = (pageIndex: number, previousPageData: ResponseBoby[]) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end

  return getUrl(pageIndex); // SWR key
};

export const useRepos = () => {
  const { data } = useSWRInfinite(getKey, fetcher);

  return data;
};
