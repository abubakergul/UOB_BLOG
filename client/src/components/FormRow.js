const FormRow = ({ type, handleChange, value, name, labelText, disabled }) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText || name}
      </label>
      <input
        className="form-input"
        type={type}
        value={value}
        onChange={handleChange}
        name={name}
        disabled={disabled}
      />
    </div>
  );
};
export default FormRow;
