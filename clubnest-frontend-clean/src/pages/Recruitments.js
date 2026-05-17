import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function Recruitments() {
  const [recruitments, setRecruitments] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clubId:'', title:'', description:'', requirements:'', deadline:'', slots:'' });

  useEffect(() => { fetchRecruitments(); fetchClubs(); }, []);

  const fetchRecruitments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/recruitments/getallrecruitments`);
      setRecruitments(res.data);
      setError('');
    } catch (err) {
      setRecruitments([]);
      setError('No recruitment notices found.');
    } finally {
      setLoading(false);
    }
  };

  const fetchClubs = async () => {
    try {
      const res = await axios.get(`${API}/clubs/getallclubs`);
      setClubs(res.data);
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/recruitments/create`, form);
      setSuccess('Recruitment notice posted successfully!');
      setForm({ clubId:'', title:'', description:'', requirements:'', deadline:'', slots:'' });
      setShowForm(false);
      fetchRecruitments();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post recruitment.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this recruitment notice?')) return;
    try {
      await axios.delete(`${API}/recruitments/delete/${id}`);
      setSuccess('Recruitment deleted successfully!');
      fetchRecruitments();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete recruitment.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleToggle = async (id, current) => {
    try {
      await axios.put(`${API}/recruitments/update/${id}`, { isOpen: !current });
      fetchRecruitments();
    } catch (err) {}
  };

  return (
    <div>
      <div className="page-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <h1>Club <span>Recruitments</span></h1>
          <p>View all open recruitment notices from clubs</p>
        </div>
        <button className="btn btn-primary" style={{ width:'auto', padding:'12px 24px' }} onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Post Notice'}
        </button>
      </div>

      {success && <div className="alert alert-success">✅ {success}</div>}
      {error && <div className="alert alert-error">❌ {error}</div>}

      {showForm && (
        <div className="form-container" style={{ marginBottom:'32px', maxWidth:'100%' }}>
          <h2 className="form-title">Post Recruitment Notice</h2>
          <p className="form-subtitle">Fill in the recruitment details</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Select Club</label>
              <select required value={form.clubId} onChange={e => setForm({...form, clubId: e.target.value})}>
                <option value="">Choose a club</option>
                {clubs.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Title</label>
              <input type="text" placeholder="e.g. New Member Recruitment 2025" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Describe what you are looking for..." required value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Requirements</label>
              <textarea placeholder="List the requirements..." required value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})} />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              <div className="form-group">
                <label>Deadline</label>
                <input type="date" required value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Available Slots</label>
                <input type="number" placeholder="e.g. 10" required value={form.slots} onChange={e => setForm({...form, slots: e.target.value})} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Post Recruitment Notice</button>
          </form>
        </div>
      )}

      <div className="stats-bar">
        <div className="stat-box">
          <span className="stat-icon">📋</span>
          <div className="stat-info">
            <div className="stat-number">{recruitments.length}</div>
            <div className="stat-label">Total Notices</div>
          </div>
        </div>
        <div className="stat-box">
          <span className="stat-icon">🟢</span>
          <div className="stat-info">
            <div className="stat-number">{recruitments.filter(r => r.isOpen).length}</div>
            <div className="stat-label">Open</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading"><div className="loading-spinner"></div>Loading recruitments...</div>
      ) : recruitments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No recruitment notices yet</h3>
          <p>Post the first recruitment notice using the button above</p>
        </div>
      ) : (
        <div className="cards-grid">
          {recruitments.map(r => (
            <div className="card" key={r._id}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
                <span className={`badge ${r.isOpen ? 'badge-open' : 'badge-closed'}`}>
                  {r.isOpen ? '🟢 Open' : '🔴 Closed'}
                </span>
                <span style={{ fontSize:'12px', color:'var(--text-muted)' }}>
                  {r.slots} slots
                </span>
              </div>
              <h3 className="card-title">{r.title}</h3>
              {r.clubId && <p style={{ color:'var(--accent)', fontSize:'13px', fontWeight:'600', marginBottom:'8px' }}>🏛️ {r.clubId.name}</p>}
              <p className="card-desc">{r.description}</p>
              <div className="divider"></div>
              <div className="card-info">
                <div className="card-info-item"><span>📌</span><span>{r.requirements}</span></div>
                <div className="card-info-item"><span>⏰</span><span>Deadline: {new Date(r.deadline).toLocaleDateString()}</span></div>
              </div>
              <div style={{ display:'flex', gap:'8px', marginTop:'16px' }}>
                <button onClick={() => handleToggle(r._id, r.isOpen)}
                  style={{ flex:1, padding:'10px', background: r.isOpen ? 'rgba(243,156,18,0.1)' : 'rgba(46,204,113,0.1)', color: r.isOpen ? '#f39c12' : '#2ecc71', border: `1px solid ${r.isOpen ? 'rgba(243,156,18,0.3)' : 'rgba(46,204,113,0.3)'}`, borderRadius:'8px', cursor:'pointer', fontFamily:'DM Sans', fontWeight:'600', fontSize:'13px' }}>
                  {r.isOpen ? '🔒 Close' : '🔓 Open'}
                </button>
                <button onClick={() => handleDelete(r._id)}
                  style={{ flex:1, padding:'10px', background:'rgba(231,76,60,0.1)', color:'#e74c3c', border:'1px solid rgba(231,76,60,0.3)', borderRadius:'8px', cursor:'pointer', fontFamily:'DM Sans', fontWeight:'600', fontSize:'13px' }}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
