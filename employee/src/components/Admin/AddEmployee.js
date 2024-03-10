import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Input, FormHelperText, Button, Card, CardContent, Snackbar, Alert } from '@mui/material';

const AddEmployee = ({ handleSnackbarOpen }) => {
  const [ID, setId] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [mail, setMail] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ID || !name || !department || !mobilenumber || !mail) {
      setError("All fields are required");
      return;
    }

    const data = {
      ID,
      name,
      department,
      mobilenumber,
      mail
    };

    try {
      const response = await axios.post('http://localhost:5000/addemployee', data);
      console.log("Server Response:", response.data);
      setId('');
      setName('');
      setDepartment('');
      setMobileNumber('');
      setMail('');
      setError('');
      setSnackbarOpen(true);
      handleSnackbarOpen("Employee added successfully");
    } catch (err) {
      console.error("Error in posting data: ", err.message);
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Failed to add employee. Please try again.");
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
            <FormControl style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="department">Department</InputLabel>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
              <Input
                id="mobileNumber"
                value={mobilenumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="mail">Mail</InputLabel>
              <Input
                id="mail"
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: 2 }}>
              Add Employee
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
          Employee added successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddEmployee;
