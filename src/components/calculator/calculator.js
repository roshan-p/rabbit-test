import React, { useEffect, useState } from "react";
import { Col, Row, DropdownButton, Dropdown } from "react-bootstrap";
import moment from "moment";
import { FaTimes } from "react-icons/fa";
import getLocations from "../../actions/get-locations";
import getProducts from "../../actions/get-products";
import postCart from "../../actions/post-cart";
import * as S from "./calculator.styled";
import DatePickerComponent from "../date-picker/date-picker";
import SimpleMap from "../simple-map/simple-map";
// import * as S from "./listBlog.styled";

const Calculator = () => {
  const [productsData, setProductsData] = useState([]);
  const [locationsData, setLocationsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(new Date());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [maxProduction, setMaxProduction] = useState(null);
  const [selectedLocationList, setselectedLocationList] = useState([]);
  const [selected, setSelected] = useState(false);
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(async () => {
    setProductsData(await getProducts());
    setLocationsData(await getLocations());
  }, []);

  useEffect(() => {
   
    const tmpLocationsData = locationsData.map((item) => ({
      ...item,
      isSelected: false,
    }));
    setSelected(true);
    setLocationsData([...tmpLocationsData]);
  }, [locationsData.length === 0 && !selected]);

  const onProdctSelect = (index) => {
    setSelectedProduct(productsData[index]);
  };

  const onSelectDate = (date, tomorrow, dayAfter) => {
    if (!selectedProduct) {
      alert("Please select product before select date");
      return;
    }
    let maxIndex = 1;
    const currentDate = new Date(date);
    const tmrDate = new Date(tomorrow);
    const dayAfterDate = new Date(dayAfter);

    if (currentDate.getDate() === tmrDate.getDate()) {
      maxIndex = 1;
    } else if (currentDate.getDate() === dayAfterDate.getDate()) {
      maxIndex = 2;
    } else {
      maxIndex = 3;
    }
    setMaxProduction(selectedProduct.max_production[maxIndex]);

    setSelectedDate(date);
    setFormattedDate(moment(date).format("YYYY-MM-DD"));
  };
  const onSelectLocations = (data, index) => {
    if (!selectedProduct || !maxProduction || !selectedDate) {
      alert("Please select product & date before add locations");
      return;
    }
    let tmpTotalUnits = data.max_dist;
    let tmpTotalCost = data.fee;
    for (let i = 0; i < selectedLocationList.length; i++) {
      tmpTotalUnits = tmpTotalUnits + selectedLocationList[i].max_dist;
      tmpTotalCost = tmpTotalCost + selectedLocationList[i].fee;
    }

    if (tmpTotalUnits > maxProduction) {
      alert(
        "Total Units can not more than maximum number of production which is " +
          maxProduction
      );
      return;
    }

    setTotalUnits(tmpTotalUnits);
    setTotalCost(tmpTotalCost);

    let tmpSelectedLocationList = selectedLocationList;
    tmpSelectedLocationList.push({ ...data });
    setselectedLocationList([...tmpSelectedLocationList]);

    let tmpLocationsData = locationsData;
    tmpLocationsData[index].isSelected = true;
    setLocationsData([...tmpLocationsData]);
  };

  const onDeleteLocations = (index) => {
    let tmpLocationsData = locationsData;
    tmpLocationsData[index].isSelected = false;
    setLocationsData([...tmpLocationsData]);

    let tmpSelectedLocationList = selectedLocationList;
    tmpSelectedLocationList.splice(index, 1);
    setselectedLocationList([...tmpSelectedLocationList]);
  };

  const onAddCart = () => {
    const locationsData = selectedLocationList.map((item) => ({
      id: item.id,
      quantity: item.max_dist,
    }));
    let data = {
      date: formattedDate,
      product: selectedProduct.id,
      locations: locationsData,
    };

    postCart(data);

    setFormattedDate(new Date());
    setFormattedDate(new Date());
    setSelectedProduct(null);
    setMaxProduction(null);
    setselectedLocationList([]);
    setSelected(false);
    setTotalUnits(0);
    setTotalCost(0);
  };
  return (
    <div>
      <S.CalulatorContainer>
        {productsData && locationsData && (
          <React.Fragment>
            <S.ProductRow>
              <Row>
                <Col xs={3}>Product</Col>
                <Col xs={3}>
                  <DropdownButton
                    onSelect={onProdctSelect}
                    id="dropdown-basic-button"
                    title={selectedProduct?.name || "Products"}
                    variant="primary"
                  >
                    {productsData.map((item, i) => (
                      <Dropdown.Item eventKey={i} key={i}>
                        {item.name}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Col>
              </Row>
            </S.ProductRow>
            <S.DatePickerRow>
              <Row>
                <Col xs={3}>Date</Col>
                <Col xs={3}>
                  {" "}
                  <DatePickerComponent
                    onSelectDate={onSelectDate}
                    selectedDate={selectedDate}
                  />
                </Col>
              </Row>
            </S.DatePickerRow>
            <S.LocationRow>
              <Row>
                <Col xs={3}>Locations</Col>
                <Col xs={2}>Place</Col>
                <Col xs={2}>Units</Col>
                <Col xs={2}>Cost</Col>
                <Col xs={3}>
                  {" "}
                  <SimpleMap
                    setSelectedLocation={onSelectLocations}
                    locations={locationsData}
                  />
                </Col>
              </Row>
            </S.LocationRow>
            {selectedLocationList.map((item, i) => (
              <S.LocationRow key={i}>
                <Row>
                  <Col xs={3}></Col>
                  <Col xs={2}>{item?.name}</Col>
                  <Col xs={2}>{item?.max_dist}</Col>
                  <Col xs={2}>{item?.fee}</Col>
                  <Col xs={3}>
                    <S.RemoveButton
                      onClick={() => {
                        onDeleteLocations(i);
                      }}
                    >
                      <FaTimes />
                    </S.RemoveButton>
                  </Col>
                </Row>
              </S.LocationRow>
            ))}
            <S.ResultRow>
              <Row>
                <Col xs={3}>Total Units</Col>
                <Col xs={3}>{totalUnits}</Col>
              </Row>
            </S.ResultRow>
            <S.ResultRow>
              <Row>
                <Col xs={3}>Total Cost</Col>
                <Col xs={3}>{totalCost}</Col>
              </Row>
            </S.ResultRow>
            <S.SubmitRow>
              <Row>
                <Col xs={5}>
                  <S.SubmitButton
                    onClick={() => {
                      onAddCart();
                    }}
                  >
                    Submit
                  </S.SubmitButton>
                </Col>
              </Row>
            </S.SubmitRow>
          </React.Fragment>
        )}
      </S.CalulatorContainer>
    </div>
  );
};

export default Calculator;
