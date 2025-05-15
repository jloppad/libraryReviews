import React from "react";

const InputField = ({ label, type, value, onChange, className }) => (
  <div className={`${className}-input-container`}>
    <label className={`${className}-label`}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required
      className={`${className}-input`}
    />
  </div>
);

export default InputField;
