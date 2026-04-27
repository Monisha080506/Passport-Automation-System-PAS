import { useEffect, useState } from 'react';
import { getAdminApplications, updateApplication } from '../api/api';
import StatusBadge from '../components/StatusBadge';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getAdminApplications().then((res) => setApplications(res.data.applications)).catch(() => setApplications([]));
  }, []);

  const handleUpdate = async (id, status) => {
    await updateApplication(id, { status });
    setApplications((prev) => prev.map((item) => (item._id === id ? { ...item, status } : item)));
    if (selected?._id === id) setSelected({ ...selected, status });
  };

  return (
    <div className="page-card admin-grid">
      <div className="admin-panel">
        <h2>Admin Control Center</h2>
        <p>Review passport applications and update approval status.</p>
        <div className="stats-grid">
          <div className="stat-card">
            <p>Applications</p>
            <strong>{applications.length}</strong>
          </div>
          <div className="stat-card">
            <p>Pending Review</p>
            <strong>{applications.filter((item) => item.status === 'Submitted').length}</strong>
          </div>
        </div>
      </div>
      <div className="admin-list">
        {applications.map((application) => (
          <div key={application._id} className="application-card admin-item" onClick={() => setSelected(application)}>
            <div>
              <h4>{application.fullName}</h4>
              <p>{application.email}</p>
            </div>
            <div className="application-meta">
              <StatusBadge status={application.status} />
              <span>{new Date(application.appliedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="admin-detail-card">
          <h3>{selected.fullName}</h3>
          <p><strong>Email:</strong> {selected.email}</p>
          <p><strong>ID Proof:</strong> {selected.idProofType} ({selected.idProofNumber})</p>
          <p><strong>Nationality:</strong> {selected.nationality}</p>
          <p><strong>Address:</strong> {selected.address}</p>
          <div className="admin-actions">
            <button className="button success" onClick={() => handleUpdate(selected._id, 'Approved')}>Approve</button>
            <button className="button danger" onClick={() => handleUpdate(selected._id, 'Rejected')}>Reject</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
