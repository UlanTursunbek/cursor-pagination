import { useRef, useEffect, ReactNode, FC } from "react";

type PropsInfiniteLoadingTrigger = {
  isLoading: boolean;
  isReachedEnd: boolean;
  callbackLoadMore: () => void;
  ComponentButton: FC;
  ComponentLoading: FC;
  ComponentEmpty: FC;
};

const options = {
  root: null,
  rootMargin: "100px",
  threshold: 0.5,
};

export const InfiniteLoadingTrigger = ({
  isLoading,
  isReachedEnd,
  callbackLoadMore,
  ComponentButton,
  ComponentLoading,
  ComponentEmpty,
}: PropsInfiniteLoadingTrigger) => {
  const refLoadMore = useRef(null);

  useEffect(() => {
    if (!refLoadMore.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callbackLoadMore();
      }
    }, options);

    observer.observe(refLoadMore.current);

    return () => {
      observer.disconnect();
    };
  }, [callbackLoadMore, refLoadMore]);

  return (
    <>
      {isLoading ? (
        <ComponentLoading />
      ) : isReachedEnd ? (
        <ComponentEmpty />
      ) : (
        <div ref={refLoadMore}>
          <ComponentButton />
        </div>
      )}
    </>
  );
};
