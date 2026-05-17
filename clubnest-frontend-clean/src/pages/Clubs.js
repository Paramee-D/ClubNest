import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ name: '', description: '', category: '', contactEmail: '' });

  useEffect(() => { fetchClubs(); }, []);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/clubs/getallclubs`);
      setClubs(res.data);
      setError('');
    } catch (err) {
      setError('No clubs found.');
      setClubs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/clubs/create`, form);
      setSuccess('Club created successfully!');
      setForm({ name: '', description: '', category: '', contactEmail: '' });
      setShowForm(false);
      fetchClubs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create club.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this club?')) return;
    try {
      await axios.delete(`${API}/clubs/delete/${id}`);
      setSuccess('Club deleted successfully!');
      fetchClubs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete club.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const categoryIcon = (cat) => {
    const icons = { Academic: '📚', Sports: '⚽', Arts: '🎨', Technology: '💻', Cultural: '🎭', Other: '🌟' };
    return icons[cat] || '🌟';
  };

  return (
    <div>
      <div className="page-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <h1>University <span>Clubs</span></h1>
          <p>Discover all clubs at your university</p>
        </div>
        <button className="btn btn-primary" style={{ width:'auto', padding:'12px 24px' }} onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Club'}
        </button>
      </div>

      {success && <div className="alert alert-success">✅ {success}</div>}
      {error && <div className="alert alert-error">❌ {error}</div>}

      {showForm && (
        <div className="form-container" style={{ marginBottom:'32px', maxWidth:'100%' }}>
          <h2 className="form-title">Add New Club</h2>
          <p className="form-subtitle">Fill in the details to register a new club</p>
          <form onSubmit={handleSubmit}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              <div className="form-group">
                <label>Club Name</label>
                <input type="text" placeholder="e.g. IEEE Student Branch" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  <option value="">Select category</option>
                  <option>Academic</option><option>Sports</option><option>Arts</option>
                  <option>Technology</option><option>Cultural</option><option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Describe the club..." required value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Contact Email</label>
              <input type="email" placeholder="club@university.lk" required value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary">Create Club</button>
          </form>
        </div>
      )}

      <div className="stats-bar">
        <div className="stat-box">
          <span className="stat-icon">🏛️</span>
          <div className="stat-info">
            <div className="stat-number">{clubs.length}</div>
            <div className="stat-label">Total Clubs</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading"><div className="loading-spinner"></div>Loading clubs...</div>
      ) : clubs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏛️</div>
          <h3>No clubs yet</h3>
          <p>Add the first club using the button above</p>
        </div>
      ) : (
        <div className="cards-grid">
          {clubs.map(club => (
            <div className="card" key={club._id}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px' }}>
                <span style={{ fontSize:'32px' }}>{categoryIcon(club.category)}</span>
                <span className="badge badge-category">{club.category}</span>
              </div>
              <h3 className="card-title">{club.name}</h3>
              <p className="card-desc">{club.description}</p>
              <div className="divider"></div>
              <div className="card-info">
                <div className="card-info-item"><span>✉️</span><span>{club.contactEmail}</span></div>
                <div className="card-info-item"><span>📅</span><span>Added {new Date(club.createdAt).toLocaleDateString()}</span></div>
              </div>
              <button onClick={() => handleDelete(club._id)}
                style={{ marginTop:'16px', width:'100%', padding:'10px', background:'rgba(231,76,60,0.1)', color:'#e74c3c', border:'1px solid rgba(231,76,60,0.3)', borderRadius:'8px', cursor:'pointer', fontFamily:'DM Sans', fontWeight:'600', fontSize:'13px' }}>
                🗑️ Delete Club
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
