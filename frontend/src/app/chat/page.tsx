"use client";
import { FormEvent, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function Chat() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socketInit();
  }, []);

  function socketInit() {
    socket = io("http://192.168.0.19:8000");
    socket.on("serverMessage", (data) => {
      setMessages(data);
    });
  }

  function HandleSubmit(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const value = e.currentTarget.children[0].value;
    e.currentTarget.children[0].value = "";
    socket.emit("clientMessage", value);
  }

  return (
    <main className="flex flex-col items-center justify-center max-w-screen-sm mx-auto h-screen">
      <div className="rounded-t-xl bg-zinc-300 max-h-[720px] h-screen w-full p-5 md:p-10 overflow-y-scroll">
        {messages.map((message, index) => (
          <div key={index}>
            <span className="font-bold capitalize md:text-lg">
              {message.userId}
            </span>
            <p className="text-left text-zinc-700">{message.text}</p>
          </div>
        ))}
      </div>
      <form className="flex w-full h-16" onSubmit={(e) => HandleSubmit(e)}>
        <input
          type="text"
          name="message"
          placeholder="Diga algo"
          className="w-full pl-5 rounded-bl-xl outline-none border h-full text-zinc-600"
          maxLength={150}
        />
        <button
          className="h-full w-56 bg-zinc-600 text-white font-bold uppercase rounded-br-xl transition hover:bg-zinc-400"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}
