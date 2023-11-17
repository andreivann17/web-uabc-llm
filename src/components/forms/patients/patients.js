import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap/";
import {Select, DatePicker  } from "antd"; 
import { connect } from "react-redux";
import dataCountries from "../../utils/countries+states+cities.json"
console.log(dataCountries)
const { Option } = Select;
function Patients({
  data,
  setData,
  validated,
  all_genders,
  all_blood_types
}) {
  const [dataStates,setDataStates] = useState([])
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
  const onChangeCountry = (value) =>{
    const dataStates = dataCountries.find(row => row.id ===value);
    onStateData(value, "country")
    console.log(dataStates["states"])
    setDataStates(dataStates["states"])
  }
  const onChangeState = (value) =>{
    const dataCities = dataStates.find(row => row.id ===value);
    onStateData(value, "state")
    setDataCities(dataCities["cities"])
  }
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
            Ingrese correctamente el precio
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
         
          <DatePicker 
  style={{width:"100%"}}  

  onChange={onChangeDatePicker} 
/>

        </Form.Group>

      </Row>
      <Row className="mb-3 ">
      
      <Form.Group as={Col} md="4">
          <Form.Label>Country</Form.Label>
          <Select
          defaultValue={"Select the option"}
                  value={data.country}
                  style={{width:"100%"}}
                 
                  onChange={(value) => onChangeCountry(value)}
                >
                      {
              dataCountries.map(
                (item) =>
                <Option key={item.id} value={item.id} selected={item.id == data.country}>
                {item.name}
              </Option>
              )}
                
                </Select>
      
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>State</Form.Label>
          <Select
          defaultValue={"Select the option"}
                  value={data.state}
                  style={{width:"100%"}}
                 
                  onChange={(value) => onChangeState(value)}
                >
                      {
                        dataStates.length>0&&
              dataStates.map(
                (item) =>
                <Option key={item.id} value={item.id} selected={item.id == data.state}>
                {item.name}
              </Option>
              )}
                
                </Select>

         
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>City</Form.Label>
          <Select
          defaultValue={"Select the option"}
                  value={data.city}
                  style={{width:"100%"}}
                 
                  onChange={(value) => onChangeState(value)}
                >
                      {
                        dataCities.length>0&&
                        dataCities.map(
                (item) =>
                <Option key={item.id} value={item.id} selected={item.id == data.city}>
                {item.name}
              </Option>
              )}
                
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
