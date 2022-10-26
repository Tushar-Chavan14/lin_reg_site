import "./css/dropdown.css";

const Dropdown = ({ options, value, label, onChange }) => {
  return (
    <>
      <label>choose {label}</label>
      <select
        className="selct"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name="item"
      >
        <option value="null">select {label}</option>
        {options.map((option, index) => (
          <option className="opt" value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
export default Dropdown;
