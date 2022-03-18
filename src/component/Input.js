import React from "react";

const Input = ({ help, id, label, onChange, type }) => {
   let inputClass = "form-control";
   if (help) {
      inputClass += " is-invalid";
   }

   return (
      <div className="mb-3">
         <label htmlFor={id}>{label}</label>
         <input
            className={inputClass}
            onChange={onChange}
            id={id}
            data-testid="input"
            type={type || "text"}
         />
         <span className="invalid-feedback">{help}</span>
      </div>
   );
};

export default Input;
