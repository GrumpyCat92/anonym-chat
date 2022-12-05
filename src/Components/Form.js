export default function Form({ sendMessage, text, setText }) {
  const changeText = ({ target }) => {
    setText(target.value);
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <textarea value={text} onChange={changeText}></textarea>
        <br />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
