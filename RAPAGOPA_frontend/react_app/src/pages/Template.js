import React, { useState } from "react";
import Header from "../components/Header";

import "../styles/styles.css";

function Template() {
  return (
    <div className="header-padding">
      <Header />
      <div>내용</div>
    </div>
  );
}

export default Template;
