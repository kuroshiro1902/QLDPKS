import { useState, useEffect } from "react";
import "./index.css";

const Toast = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <div className={`toast-message ${visible ? "visible" : ""}`}>
      <div className="toast-content">{message}</div>
      <button className="toast-close" onClick={handleClose}>
        X
      </button>
    </div>
  );
};

export default Toast;