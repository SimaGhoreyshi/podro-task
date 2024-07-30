import React, { useState } from "react";

const HomePage = () => {
  const [ip, setIp] = useState("");

  const handleSearch = (e) => {
    // e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          required
        />
        <button type="submit">search icon</button>
      </form>
    </div>
  );
};

export default HomePage;
