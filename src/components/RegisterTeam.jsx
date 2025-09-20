import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './RegisterTeam.module.css'

const RegisterTeam = () => {
    const [formData, setFormData] = useState({
        name: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear any previous messages when user starts typing
        if (message.text) {
            setMessage({ type: '', text: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setMessage({ type: 'error', text: 'Please enter a team name.' });
            return;
        }

        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        const ip_address = process.env.REACT_APP_IP_ADDRESS;
        
        try {
            const response = await fetch(`http://${ip_address}:8080/teams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                setMessage({ type: 'success', text: 'Team registered successfully! You can now register links for your team.' });
                setFormData({ name: '' }); // Clear the form
            } else {
                const errorData = await response.json().catch(() => ({}));
                setMessage({ 
                    type: 'error', 
                    text: errorData.message || 'Registration failed. Please try again.' 
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage({ 
                type: 'error', 
                text: 'Network error. Please check your connection and try again.' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Register Team</h1>
                    <p className={styles.subtitle}>
                        Create a new team to organize your website monitoring
                    </p>
                </div>

                {message.text && (
                    <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                        {message.type === 'success' ? '✅' : '❌'} {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                            Team Name *
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Enter your team name"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isSubmitting || !formData.name.trim()}
                    >
                        {isSubmitting ? 'Registering...' : 'Register Team'}
                    </button>
                </form>

                <div className={styles.navigation}>
                    <p className={styles.navText}>
                        Already have a team? Register your website links:
                    </p>
                    <Link to="/registerLink" className={styles.navLink}>
                        🔗 Register Link
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default RegisterTeam;