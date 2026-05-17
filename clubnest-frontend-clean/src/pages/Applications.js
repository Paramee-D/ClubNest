import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/applications/getallapplications`);
      setApplications(res.data);
      setError('');
    } catch (err) {
      setApplications([]);
      setError('No applications found.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await axios.put(`${API}/applications/update/${id}`, { status });
      setSuccess(`Application marked as ${status}!`);
      fetchApplications();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update status.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await axios.delete(`${API}/applications/delete/${id}`);
      setSuccess('Application deleted!');
      fetchApplications();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const filtered = filter === 'All' ? applications : applications.filter(a => a.status === filter);
  const counts = { All: applications.length, Pending: applications.filter(a => a.status==='Pending').length, Accepted: applications.filter(a => a.status==='Accepted').length, Rejected: applications.filter(a => a.status==='Rejected').length };

  return (
    <div>
      <div className="page-header">
        <h1>Manage <span>Applications</span></h1>
        <p>Review and manage all student applications</p>
      </div>

      {success && <div className="alert alert-success">✅ {success}</div>}
      {error && <div className="alert alert-error">❌ {error}</div>}

      <div className="stats-bar">
        {Object.entries(counts).map(([label, count]) => (
          <div className="stat-box" key={label} onClick={() => setFilter(label)}
            style={{ cursor:'pointer', border: filter===label ? '1px solid var(--accent)' : '1px solid var(--card-border)' }}>
            <span className="stat-icon">{label==='All'?'📊':label==='Pending'?'⏳':label==='Accepted'?'✅':'❌'}</span>
            <div className="stat-info">
              <div className="stat-number">{count}</div>
              <div className="stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="loading"><div className="loading-spinner"></div>Loading applications...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No applications found</h3>
          <p>No {filter !== 'All' ? filter.toLowerCase() : ''} applications yet</p>
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map(app => (
            <div className="card" key={app._id}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'14px' }}>
                <span className={`badge badge-${app.status.toLowerCase()}`}>{app.status}</span>
                <span style={{ fontSize:'12px', color:'var(--text-muted)' }}>{new Date(app.appliedAt).toLocaleDateString()}</span>
              </div>
              <h3 className="card-title">{app.studentName}</h3>
              <p style={{ color:'var(--accent)', fontSize:'13px', fontWeight:'600', marginBottom:'6px' }}>
                🏛️ {app.recruitmentId?.clubId?.name || 'Club'}
              </p>
              <p style={{ color:'var(--text-muted)', fontSize:'13px', marginBottom:'12px' }}>
                📋 {app.recruitmentId?.title || 'Recruitment'}
              </p>
              <div className="divider"></div>
              <div className="card-info" style={{ marginBottom:'12px' }}>
                <div className="card-info-item"><span>🎓</span><span>{app.studentId}</span></div>
                <div className="card-info-item"><span>✉️</span><span>{app.studentEmail}</span></div>
                <div className="card-info-item"><span>🏫</span><span>{app.faculty}</span></div>
              </div>
              <div style={{ background:'var(--secondary)', borderRadius:'8px', padding:'10px', marginBottom:'14px' }}>
                <p style={{ fontSize:'12px', color:'var(--text-muted)', marginBottom:'4px', fontWeight:'600' }}>WHY JOIN</p>
                <p style={{ fontSize:'13px', color:'var(--text)', lineHeight:'1.5' }}>{app.whyJoin}</p>
              </div>
              {app.status === 'Pending' && (
                <div style={{ display:'flex', gap:'8px', marginBottom:'8px' }}>
                  <button onClick={() => handleStatus(app._id, 'Accepted')}
                    style={{ flex:1, padding:'10px', background:'rgba(46,204,113,0.1)', color:'#2ecc71', border:'1px solid rgba(46,204,113,0.3)', borderRadius:'8px', cursor:'pointer', fontFamily:'DM Sans', fontWeight:'600', fontSize:'13px' }}>
                    ✅ Accept
                  </button>
                  <button onClick={() => handleStatus(app._id, 'Rejected')}
                    style={{ flex:1, padding:'10px', background:'rgba(231,76,60,0.1)', color:'#e74c3c', border:'1px solid rgba(231,76,60,0.3)', borderRadius:'8px', cursor:'pointer', fontFamily:'DM Sans', fontWeight:'600', fontSize:'13px' }}>
                    ❌ Reject
                  </button>
                </div>
              )}
              <button onClick={() => handleDelete(app._id)}
                style={{ width:'100%', padding:'10px', background:'transparent', color:'var(--text-muted)', border:'1px solid var(--card-border)', borderRadius:'8px', cursor:'pointer', fontFamily:'DM Sans', fontWeight:'600', fontSize:'13px' }}>
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
