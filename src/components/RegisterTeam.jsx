import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './RegisterTeam.module.css'

const RegisterTeam = () => {
    const [formData, setFormData] = useState({
        name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://3.110.188.7:8080/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Handle successful registration
                console.log('Registration successful!');
                alert('Registration successful!');
            } else {
                // Handle errors
                console.error('Registration failed.');
                alert('Registration failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Register</button>
            <nav>
              <Link to="/registerLink">Register Link</Link>
            </nav>
        </form>
    );
}

export default RegisterTeam;