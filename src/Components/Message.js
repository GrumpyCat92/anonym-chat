export default function Message({ text, isOwner, color }) {
  return (
    <div
      style={{ backgroundColor: color }}
      className={isOwner ? "message owner" : "message"}
    >
      {text}
    </div>
  );
}
