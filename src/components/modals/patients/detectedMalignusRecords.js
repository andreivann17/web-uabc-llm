import React, { useEffect, useRef, useState } from "react";
import { Modal, Card, Radio, Space, Tabs, Button } from "antd";
import { connect, useDispatch } from "react-redux";
import PatientsForm from "../../forms/patients/patients";
import PatientsImage from "../../forms/patients/patientsImage";
import { actionPatientPatch } from "../../../redux/actions/patients/patients";
import Notification from "../../notifications/notification";
import CardRecords from "../../cards/cardRecords"
const { Meta } = Card;
const MSG_SUCCESS = "Changes saved successfully!"
const App = ({ isModalOpen, setIsModalOpen, detailID, data,dataRecords }) => {
  const [modalWidth, setModalWidth] = useState(1000); // Set the width of the modal
  const NotiRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(null);
  const [dataEdit, setDataEdit] = useState([]);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(dataRecords)
  useEffect(() => {
    setDataEdit(data);
  }, [data]);
  return (
    <>
    <Notification ref={NotiRef}/>
      <Modal
        title={
          <>
            <i style={{color:"var(--bs-danger)"}} className="fas fa-circle marginr-1"></i>
            Detected Malignant Results
          </>
        }
        visible={isModalOpen}
        onCancel={handleCancel}
        width={modalWidth}
        footer={null}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <CardRecords data={dataRecords}/>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.patients.data,
  dataRecords: state.patients.dataMalignus,
});

export default connect(mapStateToProps)(App);
