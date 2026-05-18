type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function StarRating({
  value,
  onChange,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        fontSize: 32,
        cursor: "pointer",
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
        >
          {star <= value ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}