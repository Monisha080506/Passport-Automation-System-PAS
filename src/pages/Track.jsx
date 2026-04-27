import { useEffect, useState } from 'react';
import { getMyApplications } from '../api/api';
import StatusBadge from '../components/StatusBadge';

const Track = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getMyApplications().then((res) => setApplications(res.data.applications)).catch(() => setApplications([]));
  }, []);

  return (
    <div className="page-card track-card">
      <div className="card-header">
        <h2>Track Application Status</h2>
        <p>Monitor your passport progress from submission to final decision.</p>
      </div>
      <div className="track-grid">
        {applications.length === 0 && <p className="empty-state">No application records found. Submit an application first.</p>}
        {applications.map((app) => (
          <div key={app._id} className="track-item">
            <div>
              <h4>{app.fullName}</h4>
              <p>{app.idProofType} • Applied {new Date(app.appliedAt).toLocaleDateString()}</p>
            </div>
            <div className="track-status">
              <StatusBadge status={app.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Track;
