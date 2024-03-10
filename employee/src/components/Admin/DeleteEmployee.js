import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Input, FormHelperText, Button, Card, CardContent, Snackbar, Alert } from '@mui/material';

const DeleteEmployee = ({ handleSnackbarOpen }) => {
  const [ID, setId] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ID) {
      setError('ID is required');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/deleteemployee/${ID}`);
      console.log('Server Response:', response.data);
      setId('');
      setError('');
      setSnackbarOpen(true);
      handleSnackbarOpen("Employee deleted successfully");
    } catch (err) {
      console.error('Error in deleting employee: ', err.message);
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Failed to delete employee. Please try again.');
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card style={{ minWidth: 275, backgroundColor: '#e0f2f1', boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 4px 2px rgba(0, 0, 0, 0.14), 0px 8px 3px rgba(0, 0, 0, 0.12)' }}>
        <CardContent style={{ padding: 24 }}>
          <form onSubmit={handleSubmit}>
            <FormControl style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="id">ID</InputLabel>
              <Input
                id="id"
                value={ID}
                onChange={(e) => setId(e.target.value)}
                required
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: 2 }}>
              Delete Employee
            </Button>
            {error && (
              <FormHelperText error style={{ marginTop: 2 }}>
                {error}
              </FormHelperText>
            )}
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Employee deleted successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteEmployee;
