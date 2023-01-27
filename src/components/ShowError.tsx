import styled from "styled-components";

import NotFound from "../images/404.png";
import NetWorkError from "../images/500.png";

type TErrorMsg = { type: "error" | "offline"; message?: string };

export default function ShowError({ type, message }: TErrorMsg) {
  return (
    <ErrorDiv>
      {type === "offline" ? (
        <img src={NetWorkError} alt="Network or Server Error" />
      ) : (
        type === "error" && <img src={NotFound} alt="404 Not Found" />
      )}
      <h3>{message || "Your is offline please check your network"}</h3>
    </ErrorDiv>
  );
}

const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 100px auto;
  width: 500px;
  img {
    margin: 0 auto;
  }
  @media screen and (max-width: 540px), only screen and (hover: none) {
    width: 100vw;
    img {
      margin: 0 auto;
      width: 55vw;
    }
  }

  h3 {
    margin: 0 10px;

    line-height: 1.2;
    color: hsl(240, 1%, 37%);
  }
`;
