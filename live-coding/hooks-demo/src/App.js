import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");

  return (
    <>
      <h2>Amazing website</h2>
      <p>Username: {username}</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </>
  );
}

export default App;
