export const Select = ({ label, value, onChange, options, icon: Icon }) => (
  <div>
    {label && (
      <label className="form-label small text-muted mb-1">{label}</label>
    )}
    <div className="input-group">
      {Icon && (
        <span className="input-group-text bg-transparent">
          <Icon size={18} className="text-muted" />
        </span>
      )}
      <select
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);
