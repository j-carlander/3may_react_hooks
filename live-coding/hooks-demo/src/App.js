import { useEffect, useState } from "react";
import { CharacterComponent } from "./CharacterComponent";

function useQuerySwapi(path) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = await fetch(
        `https://swapi.dev/api/people/?search=${path}`
      ).then((resp) => resp.json());

      if (data.count > 0) {
        setData(data.results);
      }
      setIsLoading(false);
    };

    const resultTimeoutId = setTimeout(fetchData, 2000);

    return () => {
      clearTimeout(resultTimeoutId);
    };
  }, [path]);

  return { isLoading, error, data };
}

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, error, data } = useQuerySwapi(query);

  /** Create random prefix to easier see the different rerenders of the element */
  const randomPrefix = Math.floor(Math.random() * 900) + 100;

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
        {!isLoading ? (
          data.map((res) => (
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
