import { InfiniteLoadingTrigger } from "../lib/InfiniteLoadingTrigger";
import { useRepos } from "../lib/useRepos";
import { Item } from "./item";

import classes from "./index.module.css";

export const Home = () => {
  const { repos, isValidating, isReady, loadMore, isReachedEnd } = useRepos();

  return (
    <div className={classes.wrapper}>
      {repos?.map((item) => (
        <Item key={item.id} title={item.title} />
      ))}

      {isReady && (
        <InfiniteLoadingTrigger
          callbackLoadMore={loadMore}
          isLoading={isValidating}
          isReachedEnd={isReachedEnd}
          ComponentButton={() => <LoadMoreButton onClick={loadMore} />}
          ComponentLoading={Loader}
          ComponentEmpty={Empty}
        />
      )}
    </div>
  );
};

function Loader() {
  return <span>Loading...</span>;
}

function LoadMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}>
      Load more
    </button>
  );
}

function Empty() {
  return <span>Empty</span>;
}
