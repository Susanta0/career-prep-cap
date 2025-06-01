const ThemeToggle = ({ toggleTheme, theme }) => {
  return (
    <div style={{ textAlign: "end" }}>
      <button
        onClick={toggleTheme}
        style={{
          marginBottom: "20px",
          borderRadius: "5px",
          padding: "10px",
          fontWeight: "bold",
        }}
      >
        Toggle to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default ThemeToggle;
