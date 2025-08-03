import React, { useEffect, useRef } from "react";
import "../../../assets/css/ReachSection.css";
import img1 from "../../../assets/img/209_right.jpg";
import img2 from "../../../assets/img/209_right.jpg";
import img3 from "../../../assets/img/209_right.jpg";
import img4 from "../../../assets/img/209_right.jpg";
import img5 from "../../../assets/img/209_right.jpg";

const ReachSection = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const data = [
    {
      img: img4,
      title: "Clasificación de enfermedades",
      desc: "El modelo analiza la imagen completa del fondo de ojo para identificar la presencia de enfermedades como glaucoma, retinopatía diabética, degeneración macular y otras patologías.",
    },
    {
      img: img5,
      title: "Clasificación de etapas",
      desc: "Una vez detectada una enfermedad, el modelo evalúa la progresión de la misma. Por ejemplo, en retinopatía diabética, determina si se encuentra en estado leve, moderado, severo o proliferativo.",
    },
    {
      img: img1,
      title: "Detección de objetos",
      desc: "Localización precisa de estructuras patológicas en imágenes de retina mediante modelos avanzados.",
    },
    {
      img: img2,
      title: "Segmentación de biomarcadores",
      desc: "Delimitación exacta de regiones como microaneurismas, exudados u otros signos relevantes.",
    },
    {
      img: img3,
      title: "Generación de imágenes sintéticas",
      desc: "Producción de ejemplos clínicos artificiales mediante modelos generativos, utilizados para incrementar la diversidad del set de entrenamiento y robustecer la capacidad generalizadora del sistema.",
    },
  ];

  return (
    <div className="reach-section" style={{paddingLeft:200,paddingRight:200}}>
      <h2 className="reach-title">Alcance del sistema</h2>
      <p className="reach-description">
        Estas funcionalidades representan los principales módulos del sistema, una plataforma de análisis inteligente que asiste en el diagnóstico y seguimiento de enfermedades oculares a partir de imágenes del fondo de ojo. Cada módulo tiene un rol específico que, en conjunto, fortalece la precisión y utilidad clínica del sistema.
      </p>

      <div className="reach-vertical-container">
        {data.map((item, index) => (
          <div
            className={`reach-row ${index % 2 !== 0 ? "reverse" : ""}`}
            ref={(el) => (cardsRef.current[index] = el)}
            key={index}
          >
            <img className="reach-image" src={item.img} alt={item.title} />
            <div className="reach-text">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReachSection;
