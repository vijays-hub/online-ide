import { useState } from "react";

function App() {
  const [excerpt, setExcerpt] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("");

  const [requestLoading, setRequestLoading] = useState(false);

  const handleCodeSubmit = async () => {
    setOutput("");
    setError("");
    setRequestLoading(true);
    try {
      // TODO: Convert it to axios and wrap try-catch.
      const res = await fetch("http://localhost:8000/run", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          language,
          excerpt,
        }),
      }).then((response) => response.json());

      // Use message for alerts.
      // if (res.status === "error") return setError(res.message);
      if (res.status === "error")
        return setError(res.error.stderr);
      setOutput(res.data);
    } catch (error) {
      console.error("Error running the script", error);
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "2.5rem 1.25rem",
      }}
    >
      <h1>New Shizzz!</h1>
      <p>
        Add types, introduce axios, add proper styling, clean structureing of
        code.. etc... Figure out converting /n to new line.
      </p>

      <br />
      <br />
      <label htmlFor="language_picker">Language </label>
      <select
        name="language-selector"
        id="language_picker"
        onChange={({ target: { value: language } }) => setLanguage(language)}
      >
        <option value="cpp">C++</option>
        <option value="py">Python</option>
        <option value="java">Java</option>
        <option value="js">JavaScript</option>
      </select>
      <br />
      <br />
      <textarea
        name="code-area"
        id="code_excerpt"
        cols={30}
        rows={10}
        style={{
          width: "85%",
        }}
        placeholder="Jot your code down"
        value={excerpt}
        onChange={({ target: { value: excerpt } }) => setExcerpt(excerpt)}
      ></textarea>
      <br />
      <br />
      <button onClick={handleCodeSubmit}>Run</button>
      <br />
      <br />
      {requestLoading && "Laoding"}
      <br />
      <br />

      {output && <p>{output}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
