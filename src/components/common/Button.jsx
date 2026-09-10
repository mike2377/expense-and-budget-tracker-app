export const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  ...props
}) => (
  <button
    className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`}
    {...props}
  >
    {Icon && <Icon size={16} className="me-2" />}
    {children}
  </button>
);
