import styles from './Home.module.css'

const Home = () => {
    return <div className={styles.center}>
        <h1>Welcome to Wolters Kluwer Health Monitor</h1>
        <h2>Instructions</h2>
        <ul>
            <li>Register Team</li>
            <br />
            <li>Register the links</li>
            <br />
            <li>Open the dashboard and click on 'fetch' to see the STATUS of links</li>
        </ul>
    </div>
}

export default Home;