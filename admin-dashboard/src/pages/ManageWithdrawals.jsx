import React, { useEffect, useState } from 'react';
import { getAllWithdrawals, completeWithdrawal, rejectWithdrawal } from '../api/adminWithdrawalAPI';
import '../styles/global.css';

const ManageWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const data = await getAllWithdrawals();
      setWithdrawals(data);
    } catch (err) {
      setError('Failed to load withdrawals');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (withdrawalId) => {
    try {
      await completeWithdrawal(withdrawalId);
      setMessage('Withdrawal completed');
      fetchWithdrawals();
    } catch (err) {
      setError('Failed to complete withdrawal');
    }
  };

  const handleReject = async (withdrawalId) => {
    try {
      await rejectWithdrawal(withdrawalId);
      setMessage('Withdrawal rejected');
      fetchWithdrawals();
    } catch (err) {
      setError('Failed to reject withdrawal');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Withdrawals</h1>
      {error && <p style={{ color: '#FF3B3B' }}>{error}</p>}
      {message && <p style={{ color: '#1AFF00' }}>{message}</p>}
      {loading && <p>Loading withdrawals...</p>}
      {!loading && (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No withdrawals</td>
              </tr>
            ) : (
              withdrawals.map((withdrawal) => (
                <tr key={withdrawal.id}>
                  <td>{withdrawal.userId}</td>
                  <td style={{ color: '#1AFF00' }}>${withdrawal.amount}</td>
                  <td style={{
                    color: withdrawal.status === 'PENDING' ? '#FFD700' :
                      withdrawal.status === 'COMPLETED' ? '#1AFF00' : '#FF3B3B'
                  }}>
                    {withdrawal.status}
                  </td>
                  <td>{new Date(withdrawal.createdAt).toLocaleDateString()}</td>
                  <td>
                    {withdrawal.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleComplete(withdrawal.id)}
                          style={{
                            backgroundColor: '#1AFF00',
                            color: '#0B0F14',
                            marginRight: '5px',
                          }}
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleReject(withdrawal.id)}
                          style={{
                            backgroundColor: '#FF3B3B',
                            color: '#FFFFFF',
                          }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageWithdrawals;
