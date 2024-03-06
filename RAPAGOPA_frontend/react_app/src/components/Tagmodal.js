import React, { useState } from "react";

import "../styles/styles.css";
import "../styles/Tagmodal.css";

const Tagmodal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Tagmodal;
