import React, { useEffect, useState } from 'react';
import { getAllDeposits, approveDeposit, rejectDeposit } from '../api/adminDepositAPI';
import '../styles/global.css';

const ManageDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const data = await getAllDeposits();
      setDeposits(data);
    } catch (err) {
      setError('Failed to load deposits');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (depositId) => {
    try {
      await approveDeposit(depositId);
      setMessage('Deposit approved');
      fetchDeposits();
    } catch (err) {
      setError('Failed to approve deposit');
    }
  };

  const handleReject = async (depositId) => {
    try {
      await rejectDeposit(depositId);
      setMessage('Deposit rejected');
      fetchDeposits();
    } catch (err) {
      setError('Failed to reject deposit');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Deposits</h1>
      {error && <p style={{ color: '#FF3B3B' }}>{error}</p>}
      {message && <p style={{ color: '#1AFF00' }}>{message}</p>}
      {loading && <p>Loading deposits...</p>}
      {!loading && (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Amount</th>
              <th>Reference</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deposits.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No deposits</td>
              </tr>
            ) : (
              deposits.map((deposit) => (
                <tr key={deposit.id}>
                  <td>{deposit.userId}</td>
                  <td style={{ color: '#1AFF00' }}>${deposit.amount}</td>
                  <td>{deposit.reference}</td>
                  <td style={{
                    color: deposit.status === 'PENDING' ? '#FFD700' :
                      deposit.status === 'APPROVED' ? '#1AFF00' : '#FF3B3B'
                  }}>
                    {deposit.status}
                  </td>
                  <td>{new Date(deposit.createdAt).toLocaleDateString()}</td>
                  <td>
                    {deposit.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleApprove(deposit.id)}
                          style={{
                            backgroundColor: '#1AFF00',
                            color: '#0B0F14',
                            marginRight: '5px',
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(deposit.id)}
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

export default ManageDeposits;
