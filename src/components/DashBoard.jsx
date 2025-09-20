import React, { useState, useEffect } from 'react';
import styles from './DashBoard.module.css';

const DashBoard = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [lastFetch, setLastFetch] = useState(null);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState(30); // seconds
    const [showUpdateNotification, setShowUpdateNotification] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        setError('');

        const ip_address = process.env.REACT_APP_IP_ADDRESS;

        try {
            const response = await fetch(`http://${ip_address}:8080/fetchData`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();
            const newData = Array.isArray(jsonData) ? jsonData : [];
            
            // Show update notification if data changed
            if (data.length > 0 && JSON.stringify(newData) !== JSON.stringify(data)) {
                setShowUpdateNotification(true);
                setTimeout(() => setShowUpdateNotification(false), 3000);
            }
            
            setData(newData);
            setLastFetch(new Date());
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusBadgeClass = (status) => {
        if (!status) return 'unknown';
        const statusLower = status.toLowerCase();
        if (statusLower.includes('online') || statusLower.includes('up') || statusLower === 'ok') {
            return 'online';
        } else if (statusLower.includes('offline') || statusLower.includes('down') || statusLower === 'error') {
            return 'offline';
        }
        return 'unknown';
    };

    const getStatusCodeClass = (code) => {
        if (!code) return 'unknown';
        const codeNum = parseInt(code);
        if (codeNum >= 200 && codeNum < 300) return 'success';
        if (codeNum >= 400) return 'error';
        return 'unknown';
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'Never';
        try {
            const date = new Date(timestamp);
            return date.toLocaleString();
        } catch {
            return timestamp;
        }
    };

    const getStats = () => {
        const total = data.length;
        const online = data.filter(item => 
            item.status && item.status.toLowerCase().includes('online') || 
            item.status && item.status.toLowerCase().includes('up') ||
            item.status === 'ok'
        ).length;
        const offline = total - online;
        return { total, online, offline };
    };

    const stats = getStats();

    // Auto-refresh functionality
    useEffect(() => {
        let intervalId;
        
        if (autoRefresh && refreshInterval > 0) {
            intervalId = setInterval(() => {
                fetchData();
            }, refreshInterval * 1000);
        }
        
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [autoRefresh, refreshInterval]);

    // Initial data load when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    const toggleAutoRefresh = () => {
        setAutoRefresh(!autoRefresh);
    };

    const handleIntervalChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 5 && value <= 300) { // 5 seconds to 5 minutes
            setRefreshInterval(value);
        }
    };

    return (
        <main className={styles.container}>
            {showUpdateNotification && (
                <div className={styles.updateNotification}>
                    ✅ Data updated successfully!
                </div>
            )}
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <h1 className={styles.title}>Dashboard</h1>
                        <div className={styles.controls}>
                            <button 
                                onClick={fetchData} 
                                className={styles.fetchButton}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className={styles.loadingSpinner}></span>
                                        Fetching...
                                    </>
                                ) : (
                                    'Fetch Data'
                                )}
                            </button>
                            
                            <div className={styles.autoRefreshControls}>
                                <label className={styles.toggleLabel}>
                                    <input
                                        type="checkbox"
                                        checked={autoRefresh}
                                        onChange={toggleAutoRefresh}
                                        className={styles.toggleInput}
                                    />
                                    <span className={styles.toggleText}>
                                        Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
                                    </span>
                                </label>
                                
                                {autoRefresh && (
                                    <div className={styles.intervalControl}>
                                        <label className={styles.intervalLabel}>
                                            Every
                                            <input
                                                type="number"
                                                min="5"
                                                max="300"
                                                value={refreshInterval}
                                                onChange={handleIntervalChange}
                                                className={styles.intervalInput}
                                            />
                                            seconds
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className={styles.subtitle}>
                        Monitor the health and status of your registered websites
                        {lastFetch && (
                            <span> • Last updated: {lastFetch.toLocaleTimeString()}</span>
                        )}
                        {autoRefresh && !isLoading && (
                            <span className={styles.autoRefreshIndicator}>
                                • Auto-refreshing every {refreshInterval}s
                            </span>
                        )}
                    </p>
                </div>

                {data.length > 0 && (
                    <div className={styles.statsGrid}>
                        <div className={`${styles.statCard} ${styles.total}`}>
                            <div className={styles.statValue}>{stats.total}</div>
                            <div className={styles.statLabel}>Total Links</div>
                        </div>
                        <div className={`${styles.statCard} ${styles.online}`}>
                            <div className={styles.statValue}>{stats.online}</div>
                            <div className={styles.statLabel}>Online</div>
                        </div>
                        <div className={`${styles.statCard} ${styles.offline}`}>
                            <div className={styles.statValue}>{stats.offline}</div>
                            <div className={styles.statLabel}>Offline</div>
                        </div>
                    </div>
                )}

                <div className={styles.tableWrapper}>
                    <div className={styles.tableHeader}>
                        <h2 className={styles.tableTitle}>Monitored Links</h2>
                    </div>
                    
                    {error && (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyStateIcon}>❌</div>
                            <h3 className={styles.emptyStateTitle}>Error Loading Data</h3>
                            <p className={styles.emptyStateText}>{error}</p>
                        </div>
                    )}

                    {!error && data.length === 0 && !isLoading && (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyStateIcon}>📋</div>
                            <h3 className={styles.emptyStateTitle}>No Data Available</h3>
                            <p className={styles.emptyStateText}>
                                Click "Fetch Data" to load your monitored links, or register some links first.
                            </p>
                        </div>
                    )}

                    {data.length > 0 && (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>Link Name</th>
                                    <th>URL</th>
                                    <th>Status</th>
                                    <th>Status Code</th>
                                    <th>Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <strong>{item.teamName || 'Unknown Team'}</strong>
                                        </td>
                                        <td>{item.name_of_url || 'Unnamed Link'}</td>
                                        <td>
                                            {item.url ? (
                                                <a 
                                                    href={item.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className={styles.urlLink}
                                                >
                                                    {item.url}
                                                </a>
                                            ) : (
                                                'No URL'
                                            )}
                                        </td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${styles[getStatusBadgeClass(item.status)]}`}>
                                                {item.status || 'Unknown'}
                                            </span>
                                        </td>
                                        <td>
                                            {item.status_code ? (
                                                <span className={`${styles.statusCode} ${styles[getStatusCodeClass(item.status_code)]}`}>
                                                    {item.status_code}
                                                </span>
                                            ) : (
                                                <span className={`${styles.statusCode} ${styles.unknown}`}>
                                                    N/A
                                                </span>
                                            )}
                                        </td>
                                        <td className={styles.timestamp}>
                                            {formatTimestamp(item.lastUpdatedTime)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </main>
    );
}

export default DashBoard;