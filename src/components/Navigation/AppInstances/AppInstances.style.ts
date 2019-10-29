import styled from "styled-components";

const AppInstanceNew = styled.div`
  box-sizing: border-box;
  border: 2px solid #ffa500;
  background: white;
  border-radius: 5px;
  color: black;
  margin: 0 5px;
  display: flex;
  height: 80%;
  width: auto;
  padding: 11px;

  &:hover {
    background: #474747;
    cursor: pointer;
    color: white;
  }
`;

export const Styled = { AppInstanceNew};
