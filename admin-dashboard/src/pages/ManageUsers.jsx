import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm) ||
    user.id.includes(searchTerm)
  );

  return (
    <div className="admin-section">
      <h2>👥 Manage Users</h2>
      
      <div className="admin-search">
        <input 
          type="text"
          placeholder="Search by email, phone, or user ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-input"
        />
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Wallet Balance</th>
                <th>Open Bets</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>{user.role || 'USER'}</td>
                  <td>${user.wallet?.balance || 0}</td>
                  <td>{user.openBets || 0}</td>
                  <td>
                    <button 
                      className="admin-btn-small"
                      onClick={() => setSelectedUser(user)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedUser && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h3>User Details: {selectedUser.email}</h3>
            <p><strong>User ID:</strong> {selectedUser.id}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Wallet:</strong> ${selectedUser.wallet?.balance || 0}</p>
            <p><strong>Account Created:</strong> {selectedUser.createdAt}</p>
            
            <button className="admin-btn-close" onClick={() => setSelectedUser(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
