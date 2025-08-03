import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap/";
import {Select, DatePicker  } from "antd"; 
import { connect } from "react-redux";
import statesAndCities  from "../../utils/estados-municipios.json"
import moment from 'moment';
const { Option } = Select;
function Patients({
  data,
  setData,
  validated,
  all_genders,
  all_blood_types
}) {
  const [dataStates,setDataStates] = useState(Object.keys(statesAndCities))
  const [dataCities,setDataCities] = useState([])
  const onStateData = (value, key) => {
    
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const onChangeDatePicker = (date, dateString) => {
    console.log(date);
    console.log(dateString)
    onStateData(dateString,"birth_date")
  };

 const onChangeState = (value) => {
  const cities = statesAndCities[value] || []; // Get cities for the selected state
  setDataCities(cities); // Update cities dropdown
  onStateData(value, "state"); // Update state in data

  // Set the city to the first city in the new state or an empty string if there are no cities
  const firstCity = cities.length > 0 ? cities[0] : "";
  onStateData(firstCity, "city"); // Update city in data
};

  useEffect(() => {
    // If a state is already selected (in case of edit), load its cities
    if (data.state) {
      const cities = statesAndCities[data.state];

      setDataCities(cities || []);

    }
  }, [data.state]); // This effect runs when 'data.state' changes

  const onChangeCity = (value) => {
    onStateData(value, "city"); // Update city in data
  };
  return (
    <>
      <Row className="marginb-3">
     
        <Form.Group as={Col} md="4">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            value={data.first_name}
            onChange={(ev) => onStateData(ev.target.value, "first_name")}
            placeholder="Ingrese el nombre del producto"
            maxLength={50}
          />
          <h6
            className="text-errorform text-danger"
            style={{ display: validated.first_name }}
          >
            Ingrese correctamente su nombre
          </h6>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            required
            value={data.last_name}
            onChange={(ev) => onStateData(ev.target.value, "last_name")}
            placeholder="Ingrese el nombre del precio"
            maxLength={15}
          />
          <h6
            className="text-errorform text-danger"
            style={{ display: validated.last_name }}
          >
            Ingrese correctamente el apellido
          </h6>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={data.email}
            onChange={(ev) => onStateData(ev.target.value, "email")}
            placeholder="Ingrese el nombre del precio"
            maxLength={15}
          />
          <h6
            className="text-errorform text-danger"
            style={{ display: validated.email }}
          >
            Ingrese correctamente el precio
          </h6>
        </Form.Group>
      </Row>
      <Row className="mb-3 ">
      
      <Form.Group as={Col} md="4">
          <Form.Label>Gender</Form.Label>
          <Select
                  value={data.gender_name}
                  style={{width:"100%"}}
                 
                  onChange={(value) => onStateData(value, "gender_id")}
                >
                      {all_genders != null &&
              all_genders.map(
                (item) =>
                <Option key={item.id} value={item.id} selected={item.id == data.gender_id}>
                {item.name}
              </Option>
              )}
                
                </Select>
      
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Blood Type</Form.Label>
          <Select
    value={data.blood_type_name} // Asigna el valor actualmente seleccionado
    style={{width:"100%"}}
    onChange={(value) => onStateData(value, "blood_type_id")}
>
    {all_blood_types != null &&
        all_blood_types.map(
            (item) =>
            <Option selected={item.id == data.blood_type_id} value={item.id} key={item.id}>
                {item.type}
            </Option>
        )
    }
</Select>

         
        </Form.Group>
        <Form.Group as={Col} md="4">
  <Form.Label>Birthdate</Form.Label>
  <Form.Control
    type="date"
    value={data.birth_date} // Ensure this is in 'YYYY-MM-DD' format
    onChange={(ev) => onStateData(ev.target.value, "birth_date")}
    style={{ width: "100%" }}
  />
</Form.Group>

      </Row>
      <Row className="mb-3 ">
      <Form.Group as={Col} md="4">
    <Form.Label>State</Form.Label>
    <Select
      value={data.state}
      style={{ width: "100%" }}
      onChange={onChangeState}
    >
      {dataStates.map((state) => (
        <Option key={state} value={state} selected={state === data.state}>
          {state}
        </Option>
      ))}
    </Select>
  </Form.Group>
  <Form.Group as={Col} md="4">
    <Form.Label>City</Form.Label>
    <Select
      value={data.city}
      style={{ width: "100%" }}
      onChange={onChangeCity}
    >
      {dataCities.length > 0 &&
        dataCities.map((city) => (
          <Option key={city} value={city} selected={city === data.city}>
            {city}
          </Option>
        ))}
    </Select>
  </Form.Group>

      </Row>
    </>
  );
}

const mapStateToProps = (state) => ({
    all_genders: state.patients.data.all_genders,
    all_blood_types: state.patients.data.all_blood_types,
});

export default connect(mapStateToProps)(Patients);
