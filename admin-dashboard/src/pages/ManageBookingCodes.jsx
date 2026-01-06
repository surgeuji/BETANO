import React, { useState, useEffect } from 'react';
import { getAllBookingCodes, createBookingCode, deactivateCode, deleteBookingCode } from '../../api/codesAPI';
import '../styles/admin.css';

const ManageBookingCodes = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    type: 'BONUS',
    value: 100,
    maxUses: 1,
    expiresAt: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCodes();
  }, []);

  const loadCodes = async () => {
    try {
      setLoading(true);
      const data = await getAllBookingCodes();
      setCodes(data);
    } catch (e) {
      console.error('Failed to load codes:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCode = async (e) => {
    e.preventDefault();
    try {
      const codeData = {
        ...formData,
        code: formData.code.toUpperCase(),
        value: parseFloat(formData.value),
        maxUses: parseInt(formData.maxUses)
      };

      await createBookingCode(codeData);
      setMessage('✅ Code created successfully');
      setFormData({
        code: '',
        type: 'BONUS',
        value: 100,
        maxUses: 1,
        expiresAt: ''
      });
      setShowForm(false);
      await loadCodes();

      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.error || 'Failed to create code'}`);
    }
  };

  const handleDeactivate = async (codeId) => {
    try {
      await deactivateCode(codeId);
      setMessage('✅ Code deactivated');
      await loadCodes();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(`❌ Failed to deactivate`);
    }
  };

  const handleDelete = async (codeId) => {
    if (window.confirm('Are you sure you want to delete this code?')) {
      try {
        await deleteBookingCode(codeId);
        setMessage('✅ Code deleted');
        await loadCodes();
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        setMessage(`❌ Failed to delete`);
      }
    }
  };

  const getCodeIcon = (type) => {
    const icons = {
      'BONUS': '🎁',
      'CASHBACK': '💰',
      'FREESPIN': '🎡',
      'DISCOUNT': '🏷️'
    };
    return icons[type] || '🎟️';
  };

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>📋 Manage Booking Codes</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#00FF7F',
              color: '#000',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            + Create Code
          </button>
        </div>

        {message && (
          <div style={{
            padding: '12px',
            backgroundColor: message.includes('✅') ? '#1a3a1a' : '#3a1a1a',
            border: `1px solid ${message.includes('✅') ? '#00FF7F' : '#FF3B3B'}`,
            color: message.includes('✅') ? '#00FF7F' : '#FF3B3B',
            borderRadius: '6px',
            marginBottom: '15px'
          }}>
            {message}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleCreateCode} style={{
            padding: '20px',
            backgroundColor: '#1a1f2e',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'grid',
            gap: '12px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aaa' }}>Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., WELCOME100"
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #2a2f3e',
                  backgroundColor: '#0B0F14',
                  color: '#fff'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aaa' }}>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #2a2f3e',
                    backgroundColor: '#0B0F14',
                    color: '#fff'
                  }}
                >
                  <option value="BONUS">BONUS</option>
                  <option value="CASHBACK">CASHBACK</option>
                  <option value="FREESPIN">FREESPIN</option>
                  <option value="DISCOUNT">DISCOUNT</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aaa' }}>Value (₦)</label>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  min="1"
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #2a2f3e',
                    backgroundColor: '#0B0F14',
                    color: '#fff'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aaa' }}>Max Uses</label>
                <input
                  type="number"
                  value={formData.maxUses}
                  onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                  min="1"
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #2a2f3e',
                    backgroundColor: '#0B0F14',
                    color: '#fff'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aaa' }}>Expires At</label>
                <input
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #2a2f3e',
                    backgroundColor: '#0B0F14',
                    color: '#fff'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#00FF7F',
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Create Code
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#2a2f3e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* CODES LIST */}
        {loading ? (
          <p>Loading codes...</p>
        ) : codes.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '20px' }}>No codes yet. Create one to get started!</p>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {codes.map(code => (
              <div
                key={code.id}
                style={{
                  padding: '15px',
                  backgroundColor: '#1a1f2e',
                  borderRadius: '8px',
                  border: '1px solid #2a2f3e',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
                    {getCodeIcon(code.type)} {code.code}
                  </div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>
                    {code.type} • ₦{code.value} • Uses: {code.currentUses}/{code.maxUses} • Expires: {new Date(code.expiresAt).toLocaleDateString()} • Status: {code.isActive ? '✅ Active' : '❌ Inactive'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleDeactivate(code.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#FF9500',
                      color: '#000',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    Deactivate
                  </button>
                  <button
                    onClick={() => handleDelete(code.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#FF3B3B',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookingCodes;
