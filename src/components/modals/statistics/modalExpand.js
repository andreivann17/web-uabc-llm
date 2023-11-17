import React, { useRef } from "react";
import { Modal } from "antd";

const App = ({ isModalOpen, setIsModalOpen, Chart,title }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={
        <>
          <i

            className="fas fa-file marginr-1"
          ></i>
          {title}
        </>
      }
      visible={isModalOpen}
      onCancel={handleCancel}
      width={10000}
      style={{ top: 20 }} // you can adjust this value to move the modal up or down
      bodyStyle={{ height: 'calc(100vh - 110px)', overflow: 'auto' }} 
      footer={null}
      cancelButtonProps={{ style: { display: "none", height: "80vh" } }}
    >
      <Chart />
    </Modal>
  );
};

export default App;
