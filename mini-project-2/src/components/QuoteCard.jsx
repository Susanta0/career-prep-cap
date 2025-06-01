import QuoteButton from "./QuoteButton";

const QuoteCard = ({
  quote,
  author,
  fontSize,
  themeColor,
  liked,
  onLike,
  onNewQuote,
}) => {
  return (
    <div
      style={{
        border: `2px solid ${themeColor}`,
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px",
      }}
    >
      <p style={{ fontSize, fontStyle: "italic" }}>Quote: "{quote}"</p>
      <p style={{ fontWeight: "bold", marginTop: "10px" }}>Author: {author}</p>

      <div style={{ marginTop: "20px" }}>
        <QuoteButton
          onClick={onNewQuote}
          label="New Quote"
          themeColor={themeColor}
        />
        <QuoteButton
          onClick={onLike}
          label={liked ? "❤️ Liked" : "🤍 Like"}
          themeColor={themeColor}
        />
      </div>
    </div>
  );
};

export default QuoteCard;
