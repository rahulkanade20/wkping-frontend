import styles from './Home.module.css'

const Home = () => {
    return (
        <main className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Welcome to WebHealth Monitor</h1>
                <p className={styles.heroSubtitle}>
                    Professional website monitoring solution for teams. Monitor your web applications, 
                    track uptime, and get instant insights into your website's health.
                </p>
                
                <div className={styles.instructionsCard}>
                    <h2 className={styles.instructionsTitle}>Getting Started</h2>
                    <ol className={styles.stepsList}>
                        <li className={styles.stepItem}>
                            <div className={styles.stepNumber}>1</div>
                            <div className={styles.stepContent}>
                                <div className={styles.stepTitle}>Register Your Team</div>
                                <p className={styles.stepDescription}>
                                    Create a team profile to organize your monitoring activities
                                </p>
                            </div>
                        </li>
                        <li className={styles.stepItem}>
                            <div className={styles.stepNumber}>2</div>
                            <div className={styles.stepContent}>
                                <div className={styles.stepTitle}>Add Your Links</div>
                                <p className={styles.stepDescription}>
                                    Register the websites and URLs you want to monitor
                                </p>
                            </div>
                        </li>
                        <li className={styles.stepItem}>
                            <div className={styles.stepNumber}>3</div>
                            <div className={styles.stepContent}>
                                <div className={styles.stepTitle}>Monitor Dashboard</div>
                                <p className={styles.stepDescription}>
                                    Access your dashboard and click 'Fetch' to see real-time status updates
                                </p>
                            </div>
                        </li>
                    </ol>
                </div>

                <div className={styles.features}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🔍</div>
                        <h3 className={styles.featureTitle}>Real-time Monitoring</h3>
                        <p className={styles.featureDescription}>
                            Get instant status updates and response times for all your monitored URLs
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>📊</div>
                        <h3 className={styles.featureTitle}>Team Management</h3>
                        <p className={styles.featureDescription}>
                            Organize monitoring activities by teams for better collaboration
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>⚡</div>
                        <h3 className={styles.featureTitle}>Quick Setup</h3>
                        <p className={styles.featureDescription}>
                            Easy 3-step process to get your monitoring dashboard up and running
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;