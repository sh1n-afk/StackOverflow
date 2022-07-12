import React, { useState, useEffect } from "react";
import { Launcher, TestArea } from "popup-chat-react";
import io from "socket.io-client";
import STRINGS from "../../constant";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
const socket = io("http://54.183.182.209:3001");

export default function Demo() {
  const { username } = useParams();
  const user = useSelector((state) => state.LoggedInUser);
  const isLogin = useSelector((state) => state.isLoggedIn);

  const [state, setState] = useState({
    messageList: [],
    newMessagesCount: 0,
    isOpen: false,
  });

  useEffect(() => {
    socket.on("notify", (msg) => {
      console.log(msg);
      if (msg.user !== user.username && msg && msg.data.text.length > 0) {
        const newMessagesCount = state.isOpen
          ? state.newMessagesCount
          : state.newMessagesCount + 1;

        setState((state) => ({
          ...state,
          newMessagesCount: newMessagesCount,
          messageList: [
            ...state.messageList,
            {
              author: "them",
              type: "text",
              data: { text: msg.data.text },
            },
          ],
        }));
      }
    });
  }, []);

  function onMessageWasSent(message) {
    message = { ...message, user: user.username };
    setState((state) => ({
      ...state,
      messageList: [...state.messageList, message],
    }));
    socket.emit("message", message);
  }

  function onClick() {
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
      newMessagesCount: 0,
    }));
  }

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: "Connect To The Talent",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        onMessageWasSent={onMessageWasSent}
        messageList={state.messageList}
        newMessagesCount={state.newMessagesCount}
        onClick={onClick}
        isOpen={true}
        showEmoji
        mute={true}
        pinMessage={{
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          title: username,
          text: "",
        }}
        placeholder="placeholder"
      />
    </div>
  );
}
