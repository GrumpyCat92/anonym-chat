import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Message from "./Message";
import { url, secret } from "../Constants";
import Form from "./Form";
import Loading from "./Loading";
import cryptoJs from "crypto-js";

export default function Chat() {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isUpdated, setIsUpdated] = useState(true);
  const [colors, setColors] = useState({});

  useEffect(() => {
    const userID = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : cryptoJs.AES.encrypt(nanoid(), secret);
    localStorage.setItem("userId", userID);
    setId(cryptoJs.AES.decrypt(userID, secret).toString(cryptoJs.enc.Utf8));

    const interval = setInterval(() => {
      setIsUpdated(true);
      fetch(`${url}?from=0`)
        .then((resp) => resp.json())
        .then((json) => {
          setMessages([...json]);
        });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    setIsUpdated(false);
    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 0,
        userId: id,
        content: text,
      }),
    });

    setText("");
  };

  const stringToColorCode = (str) => {
    return str in colors
      ? colors[str]
      : setColors({
          ...colors,
          [str]:
            "#" +
            ("000000" + ((Math.random() * 0xffffff) << 0).toString(16)).slice(
              -6
            ),
        });
  };

  return (
    <div>
      {messages.map((m) => (
        <Message
          key={m.id}
          isOwner={id === m.userId ? true : false}
          text={m.content}
          color={stringToColorCode(m.userId)}
        />
      ))}
      {!isUpdated && <Loading />}
      <br />
      <br />
      <Form text={text} setText={setText} sendMessage={sendMessage} />
    </div>
  );
}
