import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/toasts/toast.jsx";
import HeaderNavbar from "../../components/navigation/header_navbar.jsx";
import ReachSection from "./utils/ReachSection.jsx";
import logo from "../../assets/img/logo.png";
import mosaico from  "../../assets/img/uabc/mosaico.png"
import retina from "./../../assets/img/green_vessels_circular_bordered.png";

function Home() {
  const canvasRef = useRef(null);
  const neurons = useRef([]);
  const reachSectionRef = useRef(null);
  const navigate = useNavigate();

  const [fadeClass, setFadeClass] = useState("fade-in");
  const [showInfoIndex, setShowInfoIndex] = useState(0);
  const [showtoast, setShowToast] = useState(false);
  const [msg] = useState("Welcome");

const infoMessages = [
  "SIMON detects risks before visible symptoms appear.",
  "Retina-specialized models trained with real clinical images.",
  "Your vision, empowered by artificial intelligence."
];


  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setShowInfoIndex((prev) => (prev + 1) % infoMessages.length);
        setFadeClass("fade-in");
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    function randomNeuron() {
      const radius = 5 + Math.random() * 3;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        dx: (Math.random() - 0.5) * 5,
        dy: (Math.random() - 0.5) * 5,
        r: radius,
        id: Date.now() + Math.random(),
      };
    }

    for (let i = 0; i < 10; i++) neurons.current.push(randomNeuron());

    function animate() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < neurons.current.length; i++) {
        for (let j = i + 1; j < neurons.current.length; j++) {
          const a = neurons.current[i];
          const b = neurons.current[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(0,114,63," + (1 - dist / 100) + ")";
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      neurons.current.forEach(n => {
        ctx.beginPath();
        ctx.fillStyle = "#00723F";
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        n.x += n.dx;
        n.y += n.dy;

        if (n.x < -20 || n.x > W + 20 || n.y < -20 || n.y > H + 20) {
          Object.assign(n, randomNeuron());
          n.x = Math.random() < 0.5 ? -10 : W + 10;
          n.y = Math.random() * H;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const scrollToSection = () => {
    reachSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background-color: white;
          overflow-x: hidden;
        }

        canvas.neuron-canvas {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 0;
        }

        .hero-section {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .center-content {
          text-align: center;
          z-index: 10;
        }

        .center-content img {
          width: 120px;
          margin-bottom: 10px;
        }

        .title {
          font-size: 26px;
          font-weight: 650;
          color: #00723F;
          margin-bottom: 10px;
        }

        .promo-text {
          font-size: 18px;
          color: #444;
          transition: opacity 0.6s ease, transform 0.6s ease;
          margin-bottom: 20px;
        }

        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-out {
          opacity: 0;
          transform: translateY(20px);
        }

        .start-button {
          background-color: #00723F;
          border: none;
          color: white;
          padding: 12px 28px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(0,114,63,0.4);
        }

        .start-button:hover {
          background-color: #00994C;
          transform: scale(1.05);
        }

        .reach-section {
          background: #f0f0f0;
          padding: 50px 20px;
          z-index: 1;
        }
      `}</style>
<div className="login-button-container">
<button className="login-button marginr-1" onClick={() => navigate("/login")}>
  Log In
</button>
<button className="login-button" onClick={() => navigate("/signup")}>
  Create Account
</button>

</div>


      <canvas ref={canvasRef} className="neuron-canvas"></canvas>

      {/* Sección principal 100vh */}
      <section className="hero-section">
        <div className="center-content">
        <div className="d-flex justify-content-center align-items-center">
         <img style={{ width: "120px"}} alt="" src={logo} />
          <img style={{ width: "100px",height:"100px",marginLeft:"12px" }} alt="" src={retina} />
       </div>
          <div className="title">UABC Retina</div>
          <div className={`promo-text ${fadeClass}`}>
            {infoMessages[showInfoIndex]}
          </div>
          <button className="start-button" onClick={() => navigate("/retina")}>
            Explore Artificial Intelligence
          </button>
        </div>
      </section>

      {/* Sección inferior */}
      <section className="reach-section" ref={reachSectionRef}>
        <ReachSection />
      </section>
<section className="reach-final-section">
 <h2>Timely diagnosis saves vision.</h2>
<p>
  SIMON helps detect eye diseases in their early stages, when it’s still possible to prevent major damage.
</p>

  <button className="final-cta-button">Probar el sistema</button>

  <div className="social-icons">
    <a href="#" aria-label="Facebook">
      <i className="fab fa-facebook-f"></i>
    </a>
    <a href="#" aria-label="Instagram">
      <i className="fab fa-instagram"></i>
    </a>
    <a href="#" aria-label="TikTok">
      <i className="fab fa-tiktok"></i>
    </a>
    <a href="#" aria-label="LinkedIn">
      <i className="fab fa-linkedin-in"></i>
    </a>
  </div>
</section>


      <Toast msg={msg} setShow={setShowToast} show={showtoast} />
    </>
  );
}

export default Home;
