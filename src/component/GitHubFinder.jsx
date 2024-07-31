import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./GitHub.css";

const GitHubFinder = () => {
  const [user, setUser] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    if (user.trim() === "") {
      setData({});
      setError("");
      return;
    }
    const timeout = setTimeout(() => {
      axios
        .get(`https://api.github.com/users/${user}`)
        .then((response) => {
          setData(response.data);
          setError("");
        })
        .catch((error) => {
          setData({});
          setError("User not found");
        });
    }, 1000);

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [user]);

  return (
    <div className="App">
      <h1>GitHub Account Finder</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <div>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          Object.keys(data).length > 0 && (
            <div>
              <p>Username: {data.login}</p>
              <p>Name: {data.name}</p>
              <p>Location: {data.location}</p>
              <p>Followers: {data.followers}</p>
              <p>Following: {data.following}</p>
              <p>{data.bio}</p>
              <img src={data.avatar_url} alt={data.login} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GitHubFinder;
