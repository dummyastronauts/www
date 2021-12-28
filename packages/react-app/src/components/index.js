import styled from "styled-components";

export const Header = styled.header`
  background-color: #70B0CF;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;
`;

export const Body = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 70px);
`;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #C73649;
  margin-top: 10px;
`;

export const Button = styled.button`
  background-color: #808080;
  border: none;
  border-radius: 8px;
  color: #fff;
  text-shadow:1px 1px 10px #fff, 1px 1px 10px #ccc;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 10px 10px;
  padding: 12px 24px;

  ${props => props.disabled && "disabled"} {
    background-color: #C73649;
    cursor: pointer;
  }

  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }
`;
