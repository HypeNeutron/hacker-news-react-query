import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect } from "react";

import { HackerNewsAPI } from "../context/context.types";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

export function useQueryHackerNews(page: number, queryParams: string) {
  const queryClient = useQueryClient();

  const fetchHackerNewsPage = useCallback(
    async (pageQuery: number) => {
      // # timestamps unix >2022 https://www.epochconverter.com/
      const { data } = await axios(
        `${API_ENDPOINT}query=${queryParams}&tags=story&numericFilters=created_at_i>=1640995200&page=${pageQuery}`
      );
      return data;
    },
    [queryParams]
  );

  const {
    isLoading,
    isError,
    isPaused,
    error,
    data: news,
    isPreviousData,
  } = useQuery<HackerNewsAPI, Error>(
    ["hacker news", page, queryParams],
    () => fetchHackerNewsPage(page),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (!isPreviousData && news && page !== news.nbPages) {
      queryClient.prefetchQuery(["hacker news", page + 1, queryParams], () =>
        fetchHackerNewsPage(page + 1)
      );
    }
  }, [
    fetchHackerNewsPage,
    isPreviousData,
    news,
    page,
    queryClient,
    queryParams,
  ]);

  return { isLoading, isError, isPaused, error, news, isPreviousData };
}
