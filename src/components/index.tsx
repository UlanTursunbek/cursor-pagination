import { InfiniteLoadingTrigger } from "../lib/InfiniteLoadingTrigger";
import { useRepos } from "../lib/useRepos";
import { Item } from "./item";

import classes from "./index.module.css";

export const Home = () => {
  const { repos, isValidating, isLoading, isReady, loadMore, isReachedEnd } =
    useRepos();

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          ComponentButton={() => (
            <button type="button" onClick={loadMore}>
              Load more
            </button>
          )}
          ComponentLoading={() => <span>Loading...</span>}
          ComponentEmpty={() => <span>No more items</span>}
        />
      )}
    </div>
  );
};
