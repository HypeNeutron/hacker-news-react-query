import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useContext, useState } from "react";

import { useQueryHackerNews } from "../hooks/useQuery";
import { ContextTypes, HackerNewsAPI, Hits } from "./context.types";

const AppContext = React.createContext<ContextTypes | object>({});

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState<string>("nextJS");
  const [page, setPage] = useState<number>(0);

  const { news, error, isError, isLoading, isPaused, isPreviousData } =
    useQueryHackerNews(page, query);

  const queryClient = useQueryClient();
  const nbPages = news && news.nbPages;
  const hits =
    news &&
    news.hits
      ?.sort((a, b) => b.created_at_i - a.created_at_i)
      .filter((data) => data.url !== null);

  type TCacheData = HackerNewsAPI | undefined;

  const removeStory = useCallback(
    (id: string) => {
      queryClient.setQueryData(
        ["hacker news", page, query],
        (api: TCacheData): TCacheData => {
          if (api && api.hits)
            return {
              hits: api.hits.filter((story: Hits) => story.objectID !== id),
              page: api.page,
              nbPages: api.nbPages,
            };
        }
      );
    },
    [page, query, queryClient]
  );

  const handleSearch = useCallback((querySearch: string) => {
    setQuery(querySearch);
    setPage(0);
  }, []);

  const handlePage = useCallback(
    (value: "inc" | "dec") => {
      let nextPage;
      let prevPage;
      switch (value) {
        case "inc":
          nextPage = page + 1;
          if (news && nextPage > news.nbPages - 1) nextPage = 0;
          setPage(nextPage);
          break;
        case "dec":
          prevPage = page - 1;
          if (news && prevPage < 0) prevPage = news.nbPages - 1;
          setPage(prevPage);
          break;
        default:
          break;
      }
    },
    [news, page]
  );

  const valueMemo = React.useMemo(() => {
    return {
      hits,
      page,
      nbPages,
      isError,
      error,
      isLoading,
      isPaused,
      isPreviousData,
      handlePage,
      handleSearch,
      removeStory,
    };
  }, [
    hits,
    page,
    nbPages,
    isError,
    error,
    isLoading,
    isPaused,
    isPreviousData,
    handlePage,
    handleSearch,
    removeStory,
  ]);

  return (
    <AppContext.Provider value={valueMemo}>{children}</AppContext.Provider>
  );
}

const useGlobalContext = () => {
  return useContext(AppContext) as ContextTypes;
};

export { AppContextProvider, useGlobalContext };
