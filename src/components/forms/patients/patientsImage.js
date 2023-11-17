import React, { useState, useRef } from 'react';
import { Image, Button } from 'antd';

const ImageUpload = ({setImageUrl,id}) => {
  const [image, setImage] = useState(`http://${window.location.hostname}:8000/media/patients/${id}.jpg?${Date.now()}`);
  
  const inputRef = useRef();

  const onButtonClick = () => {
    // En el clic del botón, dispara el clic del input de archivo.
    inputRef.current.click();
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
      convertToBase64(img);
    }
  };

  const convertToBase64 = (img) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageUrl(reader.result);
    
    });
    reader.readAsDataURL(img);
  };

  return (
    <div >
      {/* Ocultamos el input de archivo real */}
      <input 
        type="file" 
        style={{display: 'none'}} 
        ref={inputRef} 
        onChange={onImageChange} 
      />
      {/* Creamos un botón que simula el comportamiento del input de archivo */}
   
      <Button
                        className="custom-button marginr-1 marginb-2"
                        type="primary"
                        onClick={onButtonClick}
                      >
                        <i className="fas fa-upload marginr-1" ></i>Upload Image
                      </Button>
      <div>
        {image && (
          <Image
            width={400}
            src={image}
          />
        )}
      </div>

    </div>
  );
};

export default ImageUpload;
