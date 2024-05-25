import React, { useState } from 'react';
// import * as s from "./RegisterTeam.css"

const RegisterLink = () => {
    const [formData, setFormData] = useState({
        team_name: '',
        linkName: '',
        link: ''
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
            const response = await fetch('http://localhost:8080/links/register', {
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
        <form onSubmit={handleSubmit} >
            <div>
                <label >Team Name: </label>
                <input
                    type="text"
                    name="team_name"
                    value={formData.team_name}
                    onChange={handleChange}
                />
                <br/>
                <label>Link Name: </label>
                <input
                    type="text"
                    name="linkName"
                    value={formData.linkName}
                    onChange={handleChange}
                />
                <br/>
                <label>Link: </label>
                <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default RegisterLink;