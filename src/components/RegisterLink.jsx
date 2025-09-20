import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RegisterLink.module.css';

const RegisterLink = () => {
    const [formData, setFormData] = useState({
        team_name: '',
        linkName: '',
        link: ''
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

    const validateUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.team_name.trim()) {
            setMessage({ type: 'error', text: 'Please enter a team name.' });
            return;
        }
        if (!formData.linkName.trim()) {
            setMessage({ type: 'error', text: 'Please enter a link name.' });
            return;
        }
        if (!formData.link.trim()) {
            setMessage({ type: 'error', text: 'Please enter a URL.' });
            return;
        }
        
        // Add protocol if missing
        let url = formData.link.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        if (!validateUrl(url)) {
            setMessage({ type: 'error', text: 'Please enter a valid URL.' });
            return;
        }

        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        const ip_address = process.env.REACT_APP_IP_ADDRESS;
        
        try {
            const response = await fetch(`http://${ip_address}:8080/links/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    link: url
                })
            });
            
            if (response.ok) {
                setMessage({ 
                    type: 'success', 
                    text: 'Link registered successfully! You can now monitor it from the dashboard.' 
                });
                setFormData({ team_name: '', linkName: '', link: '' }); // Clear the form
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
                    <h1 className={styles.title}>Register Link</h1>
                    <p className={styles.subtitle}>
                        Add a new website or URL to monitor for your team
                    </p>
                </div>

                {message.text && (
                    <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                        {message.type === 'success' ? '✅' : '❌'} {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="team_name" className={styles.label}>
                            Team Name *
                        </label>
                        <input
                            id="team_name"
                            type="text"
                            name="team_name"
                            value={formData.team_name}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Enter the team name"
                            required
                            disabled={isSubmitting}
                        />
                        <div className={styles.helpText}>
                            The team that this link belongs to
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="linkName" className={styles.label}>
                            Link Name *
                        </label>
                        <input
                            id="linkName"
                            type="text"
                            name="linkName"
                            value={formData.linkName}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="e.g., Main Website, API Server, Admin Panel"
                            required
                            disabled={isSubmitting}
                        />
                        <div className={styles.helpText}>
                            A descriptive name for this link
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="link" className={styles.label}>
                            URL *
                        </label>
                        <input
                            id="link"
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            className={`${styles.input} ${styles.urlInput}`}
                            placeholder="https://example.com or example.com"
                            required
                            disabled={isSubmitting}
                        />
                        <div className={styles.helpText}>
                            The URL to monitor (protocol will be added automatically if missing)
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isSubmitting || !formData.team_name.trim() || !formData.linkName.trim() || !formData.link.trim()}
                    >
                        {isSubmitting ? 'Registering...' : 'Register Link'}
                    </button>
                </form>

                <div className={styles.navigation}>
                    <Link to="/registerTeam" className={styles.navLink}>
                        👥 Register Team
                    </Link>
                    <Link to="/dashBoard" className={styles.navLink}>
                        📊 View Dashboard
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default RegisterLink;