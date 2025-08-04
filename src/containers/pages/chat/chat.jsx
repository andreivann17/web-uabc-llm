import React, { useState, useRef, useEffect } from "react";
import { actionChatAsk } from "../../../redux/actions/detection/detection";
import { Card, Image, Button,Tag } from "antd";
import { connect } from "react-redux";
import "../../../assets/css/pelotas_style.css"
function Content({ diagnosis, selectedImageFile, selectedImage,mode,isMobileOrTablet }) {
    console.log(diagnosis)
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
const [showActions, setShowActions] = useState(false);

  /* ───── helpers ──────────────────────────────────────────────── */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ───── envío de pregunta ────────────────────────────────────── */
  const sendQuestion = async () => {
    const question = inputMessage.trim();
    if (!question || isSending) return;

    setHasStartedChat(true);
    setIsSending(true);


    // 1. Agrega mensaje del usuario
    const newUserEntry = { role: "user", text: question };
    const initialHistory = [...chatHistory, newUserEntry];
        
    setChatHistory(initialHistory);
    
    setInputMessage("");
    
    //setTimeout(scrollToBottom, 100);
  
    // 2. Crea mensaje vacío del bot (posición botIndex)
    const botIndex = initialHistory.length;
    setChatHistory((prev) => [...prev, { role: "bot", text: "" }]);

    try {
      // 3. Recibe tokens por streaming y los concatena
      await actionChatAsk(
        diagnosis?.results?.diagnostic,
        question,
        (token) => {
          setChatHistory((prev) => {
            const updated = [...prev];
            if (updated[botIndex]) updated[botIndex].text += token;
            return updated;
          });
        },
        () => {
          // Error callback
          setChatHistory((prev) => {
            const updated = [...prev];
            updated[botIndex] = { role: "bot", text: "❌ Error al responder." };
            return updated;
          });
        }
      );

     // setTimeout(scrollToBottom, 100);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }

  };

  /* ───── burbuja de mensaje ───────────────────────────────────── */
  function MessageBubble({ role, text }) {
    const isUser = role === "user";
return (
  <div
    style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      paddingRight: isUser ? 10 : 0,
   
    }}
  >
    <div
      style={{
        position: "relative",
        display: "inline-block",
        maxWidth: "80%",
      }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setTimeout(() => setShowActions(false), 200)}
    >
      {/* 🟩 MENSAJE */}
      <div
        style={{
          backgroundColor: isUser ? "#00723F" : "#e5e5ea",
          color: isUser ? "#fff" : "#000",
          padding: "12px 16px",
          borderRadius: 16,
          margin: "12px 0",
          fontSize: 17,
          fontFamily: "'Segoe UI', sans-serif",
          lineHeight: 1.4,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </div>

      {/* 🟦 BOTONES CON ANIMACIÓN */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          display: "flex",
          gap: "10px",
          marginTop: "4px",
          padding: "4px 0",
          zIndex: 10,
          opacity: showActions ? 1 : 0,
          transform: showActions ? "translateY(0px)" : "translateY(-5px)",
          pointerEvents: showActions ? "auto" : "none",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <Button
          type="text"
          size="middle"
          icon={<span role="img" aria-label="copy">📋</span>}
          onClick={() => navigator.clipboard.writeText(text)}
          style={{
            padding: "6px 14px",
            fontSize: "15px",
            color: "#333",
            borderRadius: 8,
            backgroundColor: "#f5f5f5",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          
        </Button>
        <Button
          type="text"
          size="middle"
          icon={<span role="img" aria-label="retry">🔄</span>}
          onClick={() => {
            setInputMessage(text);
            sendQuestion();
          }}
          style={{
            padding: "6px 14px",
            fontSize: "15px",
            color: "#333",
            borderRadius: 8,
            backgroundColor: "#f5f5f5",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          
        </Button>
      </div>
    </div>
  </div>
);




  }
console.log("Modo:", mode);
console.log("Es móvil o tableta:", isMobileOrTablet);

  /* ───── render ──────────────────────────────────────────────── */
  return (
    <>
    <div
  className="fade-transition-in"
  style={{
    display: "flex",
    width: "100%",
    height: "calc(100vh - 80px)",
    gap: isMobileOrTablet ? "16px" : "40px",
    boxSizing: "border-box",

    padding: isMobileOrTablet ? "8px 12px" : "20px 40px", // ✅ menor padding en móviles
    background: "#f0f4f8",
flexDirection: isMobileOrTablet ? "column" : "row",
  }}
>

        {/* Columna izquierda: imagen + diagnóstico */}
{((isMobileOrTablet && mode === "diagnosis") || !isMobileOrTablet) && (
<div
  style={{
    flex: 2,
    height: "100%",
    minHeight: "100%",
    position: "sticky",
    top: "80px",
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "60%",
    backgroundColor: "#f7f9fa",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  }}
>
  {/* 📝 Título y Fecha en fila */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      fontWeight: 500,
      boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
      fontFamily: "'Segoe UI', sans-serif",
    }}
  >
    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
      🧪 Result of the Analysis
    </span>
    <span style={{ display: "flex", alignItems: "center", fontSize: "15px" }}>
      📅 <span style={{ marginLeft: 6 }}>Date of Analysis:<strong>{new Date().toLocaleDateString()}</strong></span>
    </span>
  </div>

  {/* 📷 Imagen + Diagnóstico en fila (con marginTop como en mockup) */}
  <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginTop: "10px" }}>
    {/* Imagen */}
    <Card
      style={{
        padding: 0,
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        width: "55%",
        height: "440px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <Image.PreviewGroup>
          <Image
            src={selectedImage}
            alt="selected"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          />
        </Image.PreviewGroup>
      </div>
    </Card>

    {/* Diagnóstico */}
    <Card
      style={{
        flex: 1,
        height: "440px",
        padding: 24,
        borderRadius: 12,
        fontSize: 17,
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#ffffff",
        color: "#333",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        borderLeft: "5px solid #00723F",
        overflowY: "auto",
      }}
    >
      <p style={{ marginBottom: 12, fontWeight: "bold", fontSize: 18 }}>
        🩺 Clinical Diagnosis:
      </p>
      <p style={{ whiteSpace: "pre-wrap", marginBottom: 16 }}>
        {diagnosis?.results?.diagnostic || "Not available"}
      </p>

      {diagnosis?.results?.summary_biomarkers?.length > 0 && (
        <>
          <p style={{ marginBottom: 8, fontWeight: "bold" }}>
            🧬 Detected Biomarkers:
          </p>
         <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
  {Object.entries(diagnosis.results.labels_biomarkers)
    .filter(([id, label]) => diagnosis.results.summary_biomarkers[parseInt(id)] === "1")
    .map(([id, name], idx) => (
      <Tag key={idx} color="processing" style={{ fontSize: 15 }}>
        {name}
      </Tag>
    ))}
</div>

        </>
      )}
    </Card>
  </div>
</div>

  )}

        {/* Columna derecha: chat */}
{((isMobileOrTablet && mode === "chat") || !isMobileOrTablet) && (

<div
  style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: isMobileOrTablet ? "100%" : "40%",
  }}
>

          <Card
          style={{
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0, // ⬅️ este es el truco para evitar que se empuje
    overflow: "hidden", // evitar que el scroll interno rompa layout
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    padding: 12,
  }}
  bodyStyle={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  }}

          >
            {!hasStartedChat && (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  animation: "fadeIn 1.5s ease",
                }}
              >
                <h2
                  style={{
                    color: "#00723F",
                    fontWeight: 600,
                    fontSize: 22,
                    marginBottom: 24,
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  }}
                >
                  Your retina, analyzed by artificial intelligence
                </h2>

               
              </div>
            )}

            {/* 🌀 Loader al enviar */}
            <div style={{ marginBottom: 20, textAlign: "center", visibility: isSending ? "visible" : "hidden" }}>
              <div className="spinner-waiting">
                <div className="spinner-dot green-dot"></div>
                <div className="spinner-dot gold-dot"></div>
                <div className="spinner-dot green-dot"></div>
                <div className="spinner-dot gold-dot"></div>
              </div>
              <div className="waiting-text">Analyzing...</div>
            </div>

            {/* 💬 Chat */}
            <div style={{
  flex: 1,
  minHeight: 0, // ⬅️ asegura que el input no sea empujado
  overflowY: "auto",
  paddingBottom: 12,
}}>
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    marginBottom: 12,
                    paddingRight: msg.role === "user" ? 10 : 0,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      maxWidth: "80%",
                      display: "inline-block",
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                      lineHeight: 1.5,
                      letterSpacing: "normal",
                      fontFamily: "'Segoe UI', sans-serif",
                      fontSize: 16,
                    }}
                    onMouseEnter={() => setShowActions(true)}
                    onMouseLeave={() => setTimeout(() => setShowActions(false), 200)}
                  >
                    {/* Avatar + Mensaje */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      {msg.role !== "user" && (
                        <span style={{ fontSize: 22 }}>🩺</span>
                      )}
                      <div
                        style={{
                          backgroundColor: msg.role === "user" ? "#00723F" : "#f5f7fa",
                          color: msg.role === "user" ? "#fff" : "#000",
                          padding: "10px 14px",
                          borderRadius: 16,
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>

                    {/* Acciones (copiar/reenviar) */}
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        display: "flex",
                        gap: "10px",
                        marginTop: "4px",
                        padding: "4px 0",
                        zIndex: 10,
                        opacity: showActions ? 1 : 0,
                        transform: showActions ? "translateY(0px)" : "translateY(-5px)",
                        pointerEvents: showActions ? "auto" : "none",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                      }}
                    >
                      <Button
                        type="text"
                        size="middle"
                        icon={<span role="img" aria-label="copy">📋</span>}
                        onClick={() => navigator.clipboard.writeText(msg.text)}
                        style={{
                          padding: "6px 14px",
                          fontSize: "15px",
                          color: "#333",
                          borderRadius: 8,
                          backgroundColor: "#f5f5f5",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Button
                        type="text"
                        size="middle"
                        icon={<span role="img" aria-label="retry">🔄</span>}
                        onClick={() => {
                          setInputMessage(msg.text);
                          sendQuestion();
                        }}
                        style={{
                          padding: "6px 14px",
                          fontSize: "15px",
                          color: "#333",
                          borderRadius: 8,
                          backgroundColor: "#f5f5f5",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* ✍ Input */}
         <div
  style={{
    display: "flex",
    flexDirection: isMobileOrTablet ? "column" : "row", // ✅ en móvil en columna
    gap: "8px",
    flexShrink: 0,
    marginTop: "8px",
    borderTop: "1px solid #eee",
    paddingTop: "10px"
  }}
>
  <textarea
    placeholder="Enter your question..."
    value={inputMessage}
    onChange={(e) => setInputMessage(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendQuestion();
      }
    }}
    className="chat-textarea"
    style={{
      width: "100%",
      resize: "none",
      minHeight: "38px",
    }}
  />

  <Button
    type="primary"
    onClick={sendQuestion}
    disabled={isSending || !inputMessage.trim()}
    style={{
      width: isMobileOrTablet ? "100%" : "auto", // ✅ full width en móvil
      backgroundColor: "#00723F",
      borderColor: "#00723F",
      height: 38,
      fontWeight: "bold",
    }}
  >
    {isSending ? "Sending..." : "Send"}
  </Button>
</div>

          </Card>
        </div>
   )}

      </div>
     
    </>
  );
}

const mapStateToProps = (state) => ({
  diagnosis: state.detections?.data ?? [],
});

export default connect(mapStateToProps)(Content);
