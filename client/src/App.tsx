import { useEffect, useState } from "react";

function App() {
  const [reactivities, setReactivities] = useState<Reactivity[]>([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/reactivity")
      .then((response) => response.json())
      .then((data) => setReactivities(data));

    // cleanup function
    return () => {};
  }, []);

  return (
    <div>
      <h3 className="app" style={{ color: "red" }}>
        Dotnet-9
      </h3>
      <ul>
        {reactivities.map((reactivity) => (
          <li key={reactivity.reactivityId}>{reactivity.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
