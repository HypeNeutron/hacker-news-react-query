import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";

import { useGlobalContext } from "../context";

function SearchForm() {
  const { handleSearch, isLoading, isPaused, query } = useGlobalContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.select();
  }, [inputRef]);

  const handleSearchDebounce = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value),
    1000
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const { search } = Object.fromEntries(form.entries());
    handleSearch(search as string);
  };

  if (isLoading || isPaused) return <></>;

  return (
    <Form onSubmit={handleSubmit}>
      <h2>search hacker news</h2>
      <input
        type="text"
        name="search"
        ref={inputRef}
        className="formInput"
        value={query}
        onChange={handleSearchDebounce}
      />
    </Form>
  );
}

export default SearchForm;

const Form = styled.form`
  width: 90vw;
  max-width: 1170px;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 3rem;

  .formInput {
    font-size: 1rem;
    max-width: 600px;
    width: 100%;
    padding: 1em;
    border: none;
    border-bottom: 3px solid var(--clr-grey-8);
    margin-top: 1em;
    background: transparent;
    color: var(--clr-grey-3);
    text-transform: uppercase;
    letter-spacing: var(--spacing);
  }
`;
