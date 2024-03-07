import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import "../styles/Dropdown.css";

// *옵션 주기
// const test = ["apple", "banana", "grape", "orange"];
// <Dropdown options={test} />

function Dropdown(props) {
  const { options, disabled, onChange, value } = props;

  // const [selected, setSelected] = useState(value);
  const handleChange = (e) => {
    // setSelected(e.target.value);
    onChange(e.target.value);
  };

  return (
    <select
      className="dropdown"
      disabled={disabled}
      value={value}
      onChange={handleChange}
    >
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
