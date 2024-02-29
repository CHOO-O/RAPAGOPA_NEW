import React, { useState, useEffect } from "react";
import "../styles/styles.css";

// *옵션 주기
// const test = ["apple", "banana", "grape", "orange"];
// <Dropdown options={test} />

function Dropdown(props) {
  const { options, disabled, onChange } = props;

  const [selected, setSelected] = useState("");
  const handleChange = (e) => {
    setSelected(e.target.value);
    onChange(e.target.value);
  };

  return (
    <select disabled={disabled} value={selected} onChange={handleChange}>
      {options &&
        options.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
    </select>
  );
}

export default Dropdown;
