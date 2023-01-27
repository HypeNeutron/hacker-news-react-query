export type Hits = {
  objectID: string;
  created_at_i: number;
  created_at: string;
  title: string;
  num_comments: number;
  url: string;
  points: number;
  author: string;
};

export type HackerNewsAPI = {
  hits?: Hits[];
  nbPages: number;
  page: number;
};

export type HackerNewsStateTypes = {
  hits: Hits[];
  isError: boolean;
  error: Error;
  isPaused: boolean;
  isPreviousData: boolean;
  isLoading: boolean;
  query: string;
  page: number;
  nbPages: number;
};

type ContextFcTypes = {
  removeStory: (id: string) => void;
  handleSearch: (query: string) => void;
  handlePage: (value: "inc" | "dec") => void;
};

export type ContextTypes = HackerNewsStateTypes & ContextFcTypes;

export type TStoryCard = Omit<
  Hits,
  "created_at" | "num_comments" | "created_at_i"
> & {
  date: string;
  numComments: number;
  removeStory: (id: string) => void;
};
