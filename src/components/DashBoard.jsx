import React, { useState } from 'react';
// import DashBoard from "./DashBoard.css"

const DashBoard = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/fetchData');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={fetchData}>Fetch Data</button>
            <table border="1">
                <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Link Name</th>
                        <th>Link</th>
                        <th>Status</th>
                        <th>Status Code</th>
                        <th>Last Updated Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.teamName}</td>
                            <td>{item.name_of_url}</td>
                            <td>{item.url}</td>
                            <td>{item.status}</td>
                            <td>{item.status_code}</td>
                            <td>{item.lastUpdatedTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DashBoard;