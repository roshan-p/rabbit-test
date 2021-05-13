import styled from "styled-components";
import { Container } from "react-bootstrap";

export const CalulatorContainer = styled(Container)`
  margin: 50px;
  margin-left: 10px;
  text-align: left;
`;

export const ProductRow = styled.div`
  margin-bottom: 20px;
`;
export const DatePickerRow = styled.div`
  margin-bottom: 20px;
`;
export const LocationRow = styled.div`
  margin-bottom: 20px;
`;
export const ResultRow = styled.div`
  margin-bottom: 20px;
`;
export const SubmitRow = styled.div`
  margin-bottom: 20px;
  text-align: end;
`;

export const RemoveButton = styled.button`
  border-radius: 5px;
  border: 1px solid black;
  background-color: red;
  width: 50px;
  color: white;
  :hover {
    background-color: orange;
  }
`;

export const SubmitButton = styled.button`
  border-radius: 5px;
  border: 1px solid black;
  background-color: green;
  width: 100px;
  color: white;
  :hover {
    background-color: yellow;
  }
`;
