import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function Apply() {
  const [recruitments, setRecruitments] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ recruitmentId:'', studentName:'', studentEmail:'', studentId:'', faculty:'', whyJoin:'' });

  useEffect(() => { fetchRecruitments(); }, []);

  const fetchRecruitments = async () => {
    try {
      const res = await axios.get(`${API}/recruitments/getallrecruitments`);
      setRecruitments(res.data.filter(r => r.isOpen));
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/applications/apply`, form);
      setSuccess('Your application has been submitted successfully! Good luck! 🎉');
      setForm({ recruitmentId:'', studentName:'', studentEmail:'', studentId:'', faculty:'', whyJoin:'' });
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application.');
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  const faculties = ['Faculty of Computing', 'Faculty of Engineering', 'Faculty of Business', 'Faculty of Arts', 'Faculty of Science', 'Faculty of Medicine', 'Faculty of Law', 'Other'];

  return (
    <div>
      <div className="page-header">
        <h1>Apply to a <span>Club</span></h1>
        <p>Submit your application to join a university club</p>
      </div>

      {success && <div className="alert alert-success">✅ {success}</div>}
      {error && <div className="alert alert-error">❌ {error}</div>}

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', alignItems:'start' }}>
        <div className="form-container" style={{ maxWidth:'100%' }}>
          <h2 className="form-title">Application Form</h2>
          <p className="form-subtitle">Fill in your details carefully</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Select Recruitment</label>
              <select required value={form.recruitmentId} onChange={e => setForm({...form, recruitmentId: e.target.value})}>
                <option value="">Choose a recruitment notice</option>
                {recruitments.map(r => (
                  <option key={r._id} value={r._id}>
                    {r.clubId?.name} — {r.title}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your full name" required value={form.studentName} onChange={e => setForm({...form, studentName: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Student ID</label>
                <input type="text" placeholder="e.g. IT22100234" required value={form.studentId} onChange={e => setForm({...form, studentId: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="your@university.lk" required value={form.studentEmail} onChange={e => setForm({...form, studentEmail: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Faculty</label>
              <select required value={form.faculty} onChange={e => setForm({...form, faculty: e.target.value})}>
                <option value="">Select your faculty</option>
                {faculties.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Why do you want to join?</label>
              <textarea placeholder="Tell us why you want to join this club and what you can contribute..." required value={form.whyJoin} onChange={e => setForm({...form, whyJoin: e.target.value})} style={{ minHeight:'120px' }} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : '🚀 Submit Application'}
            </button>
          </form>
        </div>

        <div>
          <div className="card" style={{ marginBottom:'20px' }}>
            <h3 className="card-title">📋 Open Recruitments</h3>
            <p className="card-desc" style={{ marginBottom:'16px' }}>These clubs are currently accepting applications</p>
            {recruitments.length === 0 ? (
              <p style={{ color:'var(--text-muted)', fontSize:'14px' }}>No open recruitments at the moment.</p>
            ) : (
              recruitments.map(r => (
                <div key={r._id} style={{ padding:'12px', background:'var(--secondary)', borderRadius:'8px', marginBottom:'8px' }}>
                  <p style={{ fontWeight:'600', fontSize:'14px', marginBottom:'4px' }}>{r.title}</p>
                  <p style={{ color:'var(--accent)', fontSize:'12px', marginBottom:'4px' }}>🏛️ {r.clubId?.name}</p>
                  <p style={{ color:'var(--text-muted)', fontSize:'12px' }}>⏰ Deadline: {new Date(r.deadline).toLocaleDateString()} · {r.slots} slots</p>
                </div>
              ))
            )}
          </div>

          <div className="card">
            <h3 className="card-title">💡 Tips</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginTop:'12px' }}>
              {['Be specific about why you want to join', 'Mention your relevant skills or experience', 'Show enthusiasm and commitment', 'Use your university email address'].map((tip, i) => (
                <div key={i} style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                  <span style={{ color:'var(--accent)', fontWeight:'700', minWidth:'20px' }}>{i+1}.</span>
                  <span style={{ color:'var(--text-muted)', fontSize:'14px' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
