import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/viewemployees');
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees: ", err.message);
        setError("Failed to fetch employees. Please try again.");
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Employees
      </Typography>
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      {employees.map(employee => (
        <Card key={employee.ID} style={{ marginTop: 16 }}>
          <CardContent>
            <Typography variant="h6">
              ID: {employee.ID}
            </Typography>
            <Typography variant="body1">
              Name: {employee.name}
            </Typography>
            <Typography variant="body1">
              Department: {employee.department}
            </Typography>
            <Typography variant="body1">
              Mobile Number: {employee.mobilenumber}
            </Typography>
            <Typography variant="body1">
              Mail: {employee.mail}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ViewEmployee;
