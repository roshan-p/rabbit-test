import { Modal, Col } from "react-bootstrap";
import styled from "styled-components";
import { FaMapMarkerAlt } from "react-icons/fa";

export const ModalDialog = styled(Modal)`
  width: 100vw;
  max-width: 100vw;
  margin: 0px !important;
`;

export const ModalBody = styled(Modal.Body)`
  width: 100%;
  height: 70vh;
  margin: auto;
`;

export const MarkerBody = styled.div`
  width: 150px;
  height: 100px;
  background-color: white;
  padding: 5px;
  line-height: 1.8;
  position: absolute;
  bottom: 15px;
  right: -109px;
  :after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: white;
    border-bottom: black;
    border-left: white;
    margin-left: -10px;
    margin-bottom: -20px;
  }
`;

export const ButtonCol = styled(Col)`
  text-align: end;
`;
export const MarkerIcon = styled(FaMapMarkerAlt)`
  width: 28px;
  height: 28px;
  color: red;
`;
export const AddLocation = styled.button`
 border-radius:5px;
 border: 1px solid black;
 background-color:white;
 width: 50px;
 :hover{
  background-color:#f6f6f6;
 }
`;


