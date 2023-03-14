import { useRef, useEffect, createElement, FunctionComponent } from "react";

type PropsUseInfiniteTrigger = {
  isLoading: boolean;
  isReachedEnd: boolean;
  callbackLoadMore: () => void;
  ComponentButton: FunctionComponent;
  ComponentLoading: FunctionComponent;
  ComponentEmpty: FunctionComponent;
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
}: PropsUseInfiniteTrigger) => {
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
        createElement(ComponentLoading)
      ) : isReachedEnd ? (
        createElement(ComponentEmpty)
      ) : (
        <div ref={refLoadMore}>{createElement(ComponentButton)}</div>
      )}
    </>
  );
};
