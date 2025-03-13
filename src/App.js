import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [disasters, setDisasters] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/disasters")
            .then(response => setDisasters(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>Disaster Management System</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Severity</th>
                        <th>Timestamp</th>
                        <th>Reported By</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {disasters.map(disaster => (
                        <tr key={disaster.Disaster_ID}>
                            <td>{disaster.Disaster_ID}</td>
                            <td>{disaster.Type}</td>
                            <td>{disaster.Location}</td>
                            <td>{disaster.Severity}</td>
                            <td>{disaster.Timestamp}</td>
                            <td>{disaster.Reported_By}</td>
                            <td>{disaster.Status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
