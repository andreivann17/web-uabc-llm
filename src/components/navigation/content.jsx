import "../../assets/css/contenido.css";
import {Button,Card} from "react-bootstrap/";

function Content({icon,title,backgroundImage }) {
  const cardStyle = {
    backgroundImage: `url(${backgroundImage})`,
 
    backgroundSize: '100%', // Incrementa este valor para reducir el "zoom" de la imagen
    backgroundPosition: 'center', 
    backgroundPositionY:"-380px",
    color: 'white',
    height:270,
    borderRadius:0
  };
  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '35%', 
    background: 'linear-gradient(90deg, rgba(0, 114, 63, 0.9) 50%, rgba(0, 0, 0, 0) 100%)', // Utiliza un gradiente lineal
  };
  const contentStyle = {
    position: 'relative',  // Esto asegura que el texto esté por encima del fondo oscurecido
  };
  return (
    
  <>
   
  <div >
    <Card style={cardStyle} className="border-0">
    <div style={backgroundStyle}></div>
    <div style={contentStyle}>
      <Card.Body>
      <div className="d-flex flex-column align-items-start" style={{marginTop:80}}>
                <div className="d-flex">
                  <i style={{color:"#fff", fontSize:32}} className={icon + "  marginl-2 "}></i>
                  <h2 className="text-white">{title}</h2>
                </div>
                <div className=" marginl-2 ">
                  <small className="text-underline" style={{fontSize:10}}>Need a hand?</small>
                </div>
              </div>
      </Card.Body>
      </div>
    </Card>
    
</div>
</> 
  );
}
;
export default Content


