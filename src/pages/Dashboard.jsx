import { useEffect, useState } from 'react';
import { getMyApplications } from '../api/api';
import StatusBadge from '../components/StatusBadge';

const Dashboard = ({ user }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getMyApplications().then((res) => setApplications(res.data.applications)).catch(() => setApplications([]));
  }, []);

  return (
    <div className="page-card dashboard-grid">
      <div className="dashboard-panel">
        <h2>Welcome, {user?.name || 'Applicant'}</h2>
        <p>Use your personal dashboard to track your application and submit additional requests.</p>
        <div className="stats-grid">
          <div className="stat-card">
            <p>Total Applications</p>
            <strong>{applications.length}</strong>
          </div>
          <div className="stat-card">
            <p>Most Recent Status</p>
            <strong>{applications[0]?.status || 'No submissions'}</strong>
          </div>
        </div>
      </div>
      <div className="dashboard-list">
        <h3>Recent Applications</h3>
        {applications.length === 0 && <p className="empty-state">No passport applications yet. Apply now to get started.</p>}
        {applications.map((item) => (
          <div key={item._id} className="application-card">
            <div>
              <h4>{item.fullName}</h4>
              <p>{item.idProofType}</p>
            </div>
            <div className="application-meta">
              <span>{new Date(item.appliedAt).toLocaleDateString()}</span>
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
