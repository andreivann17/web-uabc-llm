import React, { useState } from "react";
import { Card, Image, Modal } from "antd";
import { connect } from "react-redux";
import yolo from "../../../../assets/sam/yolo.jpg"
import meta from "../../../../assets/sam/logo-meta.png"
function CardBloodType({ loading, pathyolo, title, imageKey, valueImage, typeFolder }) {
  const [clickedIndex, setClickedIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = (index) => {
    setClickedIndex(index);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  console.log(valueImage)
  console.log(typeFolder)
  console.log(imageKey)
  console.log(clickedIndex)
  let steps =  [

  ]
  if(imageKey){
   steps = [
    { img: `http://${window.location.hostname}:8000/media/sam/image_${valueImage}/${typeFolder}/image_${imageKey[clickedIndex]}_with_box.png`, desc: <div className="margint-2"><h6>Select a fundus image to start the biomarker analysis</h6></div>},
    { img: yolo, desc:<div className="margint-2"><h6>The image is uploaded to the YOLO model to detect potential biomarkers</h6></div>  },
    { img: `http://${window.location.hostname}:8000/media/sam/image_${valueImage}/${typeFolder}/deteccion_${imageKey[clickedIndex]}.png`, desc: <div className="margint-2"><h6>The biomarker detection results are extracted for the next step</h6></div>  },
    { img: `http://${window.location.hostname}:8000/media/sam/image_${valueImage}/${typeFolder}/image_prep_${imageKey[clickedIndex]}.png`, desc: <div className="margint-2"><h6>Ben Graham's filter is applied to enhance the visibility of the biomarkers</h6></div>  },
    { img:meta, desc:<div className="margint-2"><h6>The preprocessed image is loaded into the SAM model to segment the biomarker</h6></div>   },
    { img: `http://${window.location.hostname}:8000/media/sam/image_${valueImage}/${typeFolder}/mascara_${imageKey[clickedIndex]}.png`, desc: <div className="margint-2"><h6>The pixels corresponding to the biomarkers are extracted according to the generated mask.    </h6></div>  },
    { img: `http://${window.location.hostname}:8000/media/sam/image_${valueImage}/${typeFolder}/best_imagenseg_${imageKey[clickedIndex]}.png`, desc: <div className="margint-2"><h6>Ben Graham's filter is removed to obtain the final image with highlighted biomarkers</h6></div>  },
  ]; 
}
console.log(steps)
  return (
    <div className="shadow" style={{ marginLeft: 15 }}>
      <Card
        loading={loading}
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <>{title}</>
          </div>
        }
        cover={
          <div className="d-flex justify-content-center" style={{ marginBottom: 0, flexWrap: 'wrap' }}>
            {!loading && pathyolo && pathyolo.map((imageBase64, index) => (
              <div key={index} className="image-container" onClick={() => handleClick(index)} style={{ margin: 5 }}>
                <Image
                  width={90}
                  preview={false}
                  style={{ marginBottom: 0 }}
                  alt={`Detection ${index}`}
                  src={`data:image/jpeg;base64,${imageBase64}`}
                />
                <div className="overlay"><h6>Details</h6></div>
              </div>
            ))}
            {!loading && pathyolo && pathyolo.length === 0 && (
              <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div className="text-center margint-3">
                  <h3 style={{ fontWeight: 600 }}>No information</h3>
                </div>
              </div>
            )}
          </div>
        }
        style={{ width: "100%", marginBottom: 0 }}
        bodyStyle={{ padding: "0px", paddingTop: 0, margin: 0 }}
      />
      <Modal
        visible={isModalVisible}
        footer={null}
      
        onCancel={handleCancel}
        width={"100vw"}
        className="custom-modal"
        style={{
          height: "calc(100vh -10px )",
          top: 10,
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: "transparent",
          overflowY: "hidden"
        }}
        bodyStyle={{
          overflowY: "auto",
          maxWidth: "100vw",
          
          borderTop: "transparent",
          backgroundColor: "transparent",
          color: "#fff",
      
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="d-flex justify-content-center" style={{marginTop:120}}>
          <h1>Biomarker Detection and Segmentation Process</h1>
        </div>
       <div className="d-flex justify-content-center align-items-center" style={{minHeight: "calc(100vh - 240px)"}}>

    
        <div className="steps-container w-100">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="step-item">
                <Image
                  width={140}
                  height={100}
                  src={step.img}
                  alt={`Step ${index + 1}`}
                  style={{ marginBottom: 10 }}
                />
                <p>{step.desc}</p>
              </div>
              {index < steps.length - 1 && (
                <span style={{fontSize:52}} className="step-arrow margint-2">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  valueImage: parseInt(state.diagnosisResult?.data[0]?.valueImage) + 1, 
});

export default connect(mapStateToProps)(CardBloodType);
