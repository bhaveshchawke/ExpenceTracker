import React, { useEffect, useState } from "react";
import { UseMessage } from "../Hooks/UseMessage";

export const MessageBox = () => {
  const { messageData } = UseMessage();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth transition control
  useEffect(() => {
    if (messageData.text) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [messageData.text]);

  if (!messageData.text && !isVisible) return null;

  const isError = messageData.type === "error";

  const styles = {
    container: {
      position: "fixed",
      top: "24px",
      right: "24px",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 24px",
      borderRadius: "12px",
      // Modern Glassmorphism effect
      background: isError 
        ? "rgba(255, 77, 79, 0.85)" 
        : "rgba(34, 197, 94, 0.85)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "white",
      fontWeight: "500",
      fontSize: "15px",
      fontFamily: "'Inter', system-ui, sans-serif",
      letterSpacing: "0.5px",
      // Bouncy entry animation
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      transform: isVisible && messageData.text ? "translateX(0) scale(1)" : "translateX(100px) scale(0.9)",
      opacity: isVisible && messageData.text ? 1 : 0,
      pointerEvents: isVisible && messageData.text ? "auto" : "none",
    },
    iconBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255, 255, 255, 0.2)",
      borderRadius: "50%",
      width: "28px",
      height: "28px",
      fontSize: "14px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.iconBox}>
        {isError ? "🚨" : "✅"}
      </div>
      <div>{messageData.text}</div>
    </div>
  );
};
