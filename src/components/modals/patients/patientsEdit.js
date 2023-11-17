import React, { useEffect, useRef, useState } from "react";
import { Modal, Card, Radio, Space, Tabs, Button } from "antd";
import { connect, useDispatch } from "react-redux";
import PatientsForm from "../../forms/patients/patients";
import PatientsImage from "../../forms/patients/patientsImage";
import { actionPatientPatch } from "../../../redux/actions/patients/patients";
import Notification from "../../notifications/notification";
const { Meta } = Card;
const MSG_SUCCESS = "Changes saved successfully!"
const App = ({ isModalOpen, setIsModalOpen, detailID, data }) => {
  const [modalWidth, setModalWidth] = useState(1000); // Set the width of the modal
  const NotiRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(null);
  const [dataEdit, setDataEdit] = useState([]);
  const dispatch = useDispatch();
  const [validated, setValidated] = useState({
    first_name: "none",
    last_name: "none",
    email: "none",
  });
  const callback = () => {
    NotiRef.current.openNotification("topRight",MSG_SUCCESS,"success")
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSave = () => {
    dispatch(actionPatientPatch(dataEdit, imageUrl,callback));
  };

  useEffect(() => {
    setDataEdit(data);
  }, [data]);
  return (
    <>
    <Notification ref={NotiRef}/>
      <Modal
        title={
          <>
            <i className="fas fa-edit marginr-1"></i>
            Edit Information
          </>
        }
        visible={isModalOpen}
        onCancel={handleCancel}
        width={modalWidth}
        footer={null}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="margint-4 d-flex justify-content-end">
          <Button
            className="custom-button marginr-1"
            type="primary"
            onClick={handleSave}
          >
            <i className="fas fa-save marginr-1"></i>Save
          </Button>
        </div>
        <div className="margint-2">
          <Tabs
            tabPosition={"left"}
            className="custom-tabs"
            items={[
              {
                label: (
                  <>
                    <i className="fas fa-info-circle marginr-1"></i>Info
                  </>
                ),
                key: "1",
                children: (
                  <PatientsForm
                    setData={setDataEdit}
                    validated={validated}
                    data={dataEdit}
                  />
                ),
              },
              {
                label: (
                  <>
                    <i className="fas fa-image marginr-1"></i>Image
                  </>
                ),
                key: "2",
                children: (
                  <PatientsImage setImageUrl={setImageUrl} id={dataEdit.id} />
                ),
              },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.patients.data,
});

export default connect(mapStateToProps)(App);
