import { useState } from "react";
import "./App.css";
import Home from "./components/Home";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const themeStyles = {
    light: {
      backgroundColor: "#ffffff",
      color: "#333333",
    },
    dark: {
      backgroundColor: "#333333",
      color: "#ffffff",
    },
  };

  return (
    <div style={{ ...themeStyles[theme], minHeight: "100vh", padding: "20px" }}>

      <h1 style={{textAlign:"center"}}>QuoteSage – A Daily Quote Generator</h1>
      <Home
        theme={theme}
        toggleTheme={toggleTheme}
        themeColor={themeStyles[theme].color}
      />
    </div>
  );
}

export default App;
