const StatusBadge = ({ status }) => {
  const colorMap = {
    Submitted: 'rgba(56, 189, 248, 0.12)',
    Approved: 'rgba(34, 197, 94, 0.14)',
    Rejected: 'rgba(239, 68, 68, 0.14)',
  };
  const borderMap = {
    Submitted: '#38bdf8',
    Approved: '#22c55e',
    Rejected: '#ef4444',
  };

  return (
    <span className="status-badge" style={{ background: colorMap[status], borderColor: borderMap[status] }}>
      {status}
    </span>
  );
};

export default StatusBadge;
