const ActionButton = ({ onClick, icon, label }) => (
  <button className="btn btn-outline-secondary mb-2" onClick={onClick}>
    <span className="material-symbols-outlined">{icon}</span>
    {label && <span className="ml-2">{label}</span>}
  </button>
);

export default ActionButton;