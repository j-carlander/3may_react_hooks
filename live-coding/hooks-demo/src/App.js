import { useEffect, useState } from "react";
import { CharacterComponent } from "./CharacterComponent";

function App() {
  // const [username, setUsername] = useState("");

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  // const [httpQuery, setHttpQuery] = useState("");

  /** Create random prefix to easier see the different rerenders of the element */
  const randomPrefix = Math.floor(Math.random() * 900) + 100;

  useEffect(() => {
    let isAborted = false;

    const getResult = async () => {
      const data = await fetch(
        `https://swapi.dev/api/people/?search=${query}`
      ).then((resp) => resp.json());

      if (!isAborted && data.count > 0) {
        // if (data.count > 0) {
        setResult(data.results);
        setResultCount(data.count);
      }
    };

    const timeOutID = setTimeout(getResult, 1000);

    return () => {
      isAborted = true;
      setResult([]);
      setResultCount(0);
      clearTimeout(timeOutID);
    };
  }, [query]);

  return (
    <>
      <h2>Amazing website</h2>
      <p>
        Query: #{randomPrefix} - {query}
      </p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <article>
        <p>Results: {resultCount}</p>
        {result.length > 0 ? (
          result.map((res) => (
            <CharacterComponent
              key={res.name}
              name={res.name}
              height={res.height}
              mass={res.mass}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </article>
    </>
  );
}

export default App;
