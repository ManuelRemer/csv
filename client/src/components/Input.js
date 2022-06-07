// import "./Input.css";

const Input = ({ label, type, value, handleInput }) => {
  return (
    <div>
      <label>
        <span>{label}:</span>
        <input
          type={type}
          required
          value={value}
          onChange={(e) => {
            handleInput(e.target.value);
          }}
        />
      </label>
    </div>
  );
};

export default Input;
