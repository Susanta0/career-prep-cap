import React, { useEffect, useState } from "react";
import axios from "axios";
import ThemeToggle from "./ThemeToggel";
import QuoteCard from "./QuoteCard";

const Home = ({ theme, toggleTheme, themeColor }) => {
  const [quoteData, setQuoteData] = useState({ q: "", a: "" });
  const [liked, setLiked] = useState(false);
  const [fontSize, setFontSize] = useState("16px");

  const fetchQuote = async () => {
    try {
      const res = await axios.get("https://zenquotes.io/api/random");
      console.log(res.data[0]);
      setQuoteData(res.data[0]);
      setLiked(false);
    } catch (error) {
      console.log("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div>
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />

      <div style={{ marginTop: "20px" }}>
        <label>Font Size: </label>
        <select onChange={(e) => setFontSize(e.target.value)} value={fontSize}>
          <option value="16px">Small</option>
          <option value="20px">Medium</option>
          <option value="24px">Large</option>
        </select>
      </div>

      <QuoteCard
        quote={quoteData.q}
        author={quoteData.a}
        fontSize={fontSize}
        themeColor={themeColor}
        liked={liked}
        onLike={() => setLiked(!liked)}
        onNewQuote={fetchQuote}
      />
    </div>
  );
};
export default Home;
