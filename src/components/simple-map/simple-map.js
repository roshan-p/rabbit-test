import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import * as S from "./simple-map.styled";


const SimpleMap = ({ locations, setSelectedLocation }) => {
  const [show, setShow] = useState(false);
  const [showLocationDetail, setShowLocationDetail] = useState([]);
  const center = {
    lat: 13.74294915904256,
    lng: 100.54996753998196,
  };
  const zoom = 13;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let listItem = [];
    for (let i = 0; i < locations.length; i++) {
      listItem.push(false);
    }
    setShowLocationDetail(listItem);
  }, []);

  const handleOnClickMarker = (i) => {
    let tmpShowLocationDetail = showLocationDetail;
    tmpShowLocationDetail[i] = !tmpShowLocationDetail[i];
    setShowLocationDetail([...tmpShowLocationDetail]);
  };
  return (
    <>
      <S.AddLocation variant="primary" onClick={handleShow}>
        Add
      </S.AddLocation>

      <S.ModalDialog
        show={show}
        onHide={handleClose}
        backdrop="static"
       // keyboard={false}
        size="xl"
      >
        <Modal.Header>
          <Modal.Title>Locations</Modal.Title>
        </Modal.Header>
        <S.ModalBody>
          <GoogleMapReact
            bootstrapURLKeys={{
              key:process.env.REACT_APP_GOOGLE_MAP_API_KEY,
            }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            {locations.map((item, i) => (
              <div lat={item?.lat} lng={item?.long}  key={i}>
                {showLocationDetail[i] === true && (
                  <S.MarkerBody>
                    <Row>
                      <Col xs={12}>{item?.name}</Col>
                      <Col xs={6}>Max Units: </Col>
                      <Col xs={6}>{item?.max_dist}</Col>
                      <Col xs={6}>Fee: </Col>
                      <Col xs={6}>{item?.fee}</Col>
                      <S.ButtonCol xs={11}>
                        <S.AddLocation disabled={item.isSelected} onClick={()=>{setSelectedLocation(item,i);setShow(false)}}>ADD</S.AddLocation>
                      </S.ButtonCol>
                    </Row>
                  </S.MarkerBody>
                )}

                <S.MarkerIcon
                  onClick={() => {
                    handleOnClickMarker(i);
                  }}
                />
              </div>
            ))}
          </GoogleMapReact>
        </S.ModalBody>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </S.ModalDialog>
    </>
  );
};
export default SimpleMap;
