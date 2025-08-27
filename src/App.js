import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [persons, setPersons] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const fetchPersons = async () => {
    console.log("Fetching persons...");
    const res = await fetch(`${API_URL}/api/persons`);
    const data = await res.json();
    setPersons(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/persons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchPersons();
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Person App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>

      <h3>Saved Persons:</h3>
      <ul>
        {persons.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
