import "./Input.css";

const Input = ({ label, type, value, handleInput }) => {
  return (
    <div>
      <form className="file-upload">
        <label>
          <span>{label}:</span>
          <input
            type={type}
            name="csv"
            required
            value={value}
            onChange={(e) => {
              const fd = new FormData();
              fd.append("file", e.target.files[0]);
              handleInput(fd);
            }}
          />
          <button type="submit">to DB</button>
        </label>
      </form>
    </div>
  );
};

export default Input;
