import { Inbox } from "lucide-react";
export const EmptyState = ({
  message = "No found data",
  icon: Icon = Inbox,
  action = null,
}) => (
  <div className="text-center py-5 text-muted">
    <div
      className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
      style={{
        width: "80px",
        height: "80px",
        background: "rgba(var(--bs-primary-rgb), 0.1)",
      }}
    >
      <Icon size={32} className="text-primary opacity-50" />
    </div>
    <h5 className="mb-2">No data found</h5>
    <p className="mb-3">{message}</p>
    {action}
  </div>
);
