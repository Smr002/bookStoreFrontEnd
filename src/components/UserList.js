// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        // Transform data to match DataGrid's row structure
        const formattedUsers = data.map((user, index) => ({
          id: user._id || index,  // Ensure each row has a unique 'id' for DataGrid
          name: user.name,
          email: user.email,
        }));
        setUsers(formattedUsers);
      } catch (error) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Typography style={styles.loading}>Loading users...</Typography>;
  if (error) return <Typography style={styles.error}>{error}</Typography>;

  // Define the columns for DataGrid
  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Full viewport height
        backgroundColor: '#f0f0f0',
      }}
    >
      <Paper sx={{ height: 400, width: '65%', padding: 2 }}>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: { paginationModel },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
};

const styles = {
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#888',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: 'red',
  },
};

export default UserList;
