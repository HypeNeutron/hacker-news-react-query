import { format } from "date-fns";
import styled from "styled-components";

import { useGlobalContext } from "../context";
import { getError } from "../utils/helper";
import NavigateBtn from "./NavigateBtn";
import ShowError from "./ShowError";
import StoryCard from "./StoryCard";

export default function Stories() {
  const { isLoading, isPaused, hits, removeStory, error, isError } =
    useGlobalContext();

  if (isError)
    return <ShowError type="error" message={getError({ err: error })} />;
  if (isPaused) return <ShowError type="offline" />;
  if (isLoading) return <div className="loading" />;

  return (
    <>
      <NavigateBtn />
      <StoriesSection>
        {hits &&
          hits.map((story) => {
            const {
              objectID,
              title,
              num_comments: numComments,
              url,
              points,
              author,
              created_at: createAt,
            } = story;

            const date = format(new Date(createAt), "MMM d, yyyy KK:mm aa");

            return (
              <StoryCard
                key={objectID}
                {...{
                  title,
                  numComments,
                  removeStory,
                  url,
                  points,
                  author,
                  date,
                  objectID,
                }}
              />
            );
          })}
      </StoriesSection>
    </>
  );
}

const StoriesSection = styled.section`
  width: 90vw;
  max-width: 1170px;
  margin: 0 auto;
  margin-bottom: 5rem;
  display: grid;
  gap: 2rem;

  @media screen and (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
