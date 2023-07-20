const Checkbox = ({ title, state, onChange }) => {
  return (
    <div>
      <input type="checkbox" checked={state} onChange={onChange} />
      <label>{title}</label>
    </div>
  );
};

export default Checkbox;
