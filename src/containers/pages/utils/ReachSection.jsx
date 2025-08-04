import React, { useEffect, useRef } from "react";
import "../../../assets/css/ReachSection.css";
import img1 from "../../../assets/img/object_detection.png";
import img2 from "../../../assets/img/vessels.png";
import img3 from "../../../assets/img/cycle_consistency.jpg";
import img4 from "../../../assets/img/209_right.jpg";
import img5 from "../../../assets/img/feature_map.png"; // Imagen sugerida para "Extracción de características"

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
      title: "Clasificación de enfermedades y sus etapas",
      desc: "El modelo analiza la imagen completa del fondo de ojo para identificar la presencia de enfermedades como glaucoma, retinopatía diabética, degeneración macular y otras patologías. Además, determina la etapa clínica de cada enfermedad.",
    },
    {
      img: img1,
      title: "Detección de biomarcadores",
      desc: "Localización precisa de estructuras patológicas en imágenes de retina mediante modelos avanzados. Se identifican biomarcadores como microaneurismas, hemorragias y exudados.",
    },
    {
      img: img2,
      title: "Segmentación de biomarcadores",
      desc: "Delimitación exacta de regiones como microaneurismas, exudados u otros signos relevantes.",
    },
    {
      img: img5,
      title: "Extracción de características",
      desc: "Generación y visualización de mapas de activación que reflejan las zonas más relevantes para la toma de decisiones del modelo.",
    },
    {
      img: img3,
      title: "Generación de imágenes sintéticas",
      desc: "Producción de ejemplos clínicos artificiales mediante modelos generativos, utilizados para incrementar la diversidad del set de entrenamiento y robustecer la capacidad generalizadora del sistema.",
    },
  ];

  return (
    <div className="reach-section">
      <style>{`
        .reach-section {
          padding-top: 50px;
          padding-bottom: 50px;
          padding-left: 60px;
          padding-right: 60px;
        }

        .reach-title {
          text-align: center;
          font-size: 32px;
          margin-bottom: 20px;
        }

        .reach-description {
          text-align: center;
          font-size: 18px;
          margin-bottom: 40px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .reach-vertical-container {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        /* Eliminar puntos verdes decorativos */
        .reach-vertical-container::before,
        .reach-vertical-container::after,
        .reach-row::before,
        .reach-row::after {
          display: none !important;
          content: none !important;
        }

        .reach-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .reach-row.reverse {
          flex-direction: row-reverse;
        }

        .reach-row.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reach-image {
          width: 100%;
          max-width: 300px;
          height: auto;
          border-radius: 12px;
          object-fit: cover;
        }

        .reach-text {
          width: 100%;
          max-width: 500px;
        }

        .reach-text h3 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .reach-text p {
          font-size: 16px;
          line-height: 1.6;
          text-align: justify;
        }

        @media (max-width: 1200px) {
          .reach-section {
            padding-left: 40px;
            padding-right: 40px;
          }
        }

        @media (max-width: 992px) {
          .reach-section {
            padding-left: 30px;
            padding-right: 30px;
          }

          .reach-row {
            flex-direction: column !important;
            text-align: center;
          }

          .reach-image,
          .reach-text {
            max-width: 100%;
          }

          .reach-text {
            text-align: center;
          }

          .reach-text h3 {
            font-size: 22px;
          }

          .reach-text p {
            font-size: 15px;
            text-align: justify;
          }
        }

        @media (max-width: 576px) {
          .reach-title {
            font-size: 26px;
          }

          .reach-description {
            font-size: 16px;
          }

          .reach-text h3 {
            font-size: 20px;
          }

          .reach-text p {
            font-size: 14px;
          }
        }
          @media (min-width: 768px) and (max-width: 991px) {
  .reach-image {
    max-width: 260px;
    max-height: 260px;
    object-fit: contain;
  }
}

      `}</style>

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
