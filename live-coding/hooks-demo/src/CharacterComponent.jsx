export function CharacterComponent({ name, height, mass }) {
  return (
    <section>
      <h3>{name}</h3>
      <p>Height: {height}</p>
      <p>Weight: {mass}</p>
    </section>
  );
}
