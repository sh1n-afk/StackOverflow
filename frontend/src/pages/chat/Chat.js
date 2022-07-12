import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Grid, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import STRINGS from "../../constant";

const socket = io(STRINGS.url);

export default function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  socket.on("notify", (msg) => {
    setMessages([...messages, ...msg]);
    scrollToBottom();
  });

  // useEffect(() => {
  //     setNewMessage("");
  //   }, [messages]);

  const scrollToBottom = () => {
    const chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
  };

  const handleSubmit = () => {
    // Send the new message to the server.
    socket.emit("message", {
      text: newMessage,
      //   id: selectedMessageId,
      //   sender: memberId,
    });

    document.getElementById("outlined-basic").value = "";
    // setNewMessage("");
  };

  return (
    <ChatContainer>
      <SelectedFeed>
        <InputWrapper id="chat">
          {messages.map((message) => (
            <MessageContainer>
              <Message>
                <div> {message.text}</div>
                <p>{message.createdAt}</p>
              </Message>
            </MessageContainer>
          ))}
        </InputWrapper>
        <TextBox>
          <div style={{ gridColumn: 1 }}>
            {/* <CustomInput
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        sx={{ width: "100%" }}
                    /> */}
            <TextField
              id="outlined-basic"
              label="Send Message"
              variant="outlined"
              onChange={(event) => setNewMessage(event.target.value)}
              sx={{ width: "100%" }}
            />
          </div>
          <div style={{ gridColumn: 2 }}>
            <IconButton color="primary" onClick={() => handleSubmit()}>
              <SendIcon />
            </IconButton>
          </div>
        </TextBox>
      </SelectedFeed>
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 30% 68%;
  padding: 2rem 2rem 0;
  background: rgb(246, 246, 246);
  grid-gap: 2rem;
`;
const ChatFeeds = styled.div`
  grid-column: 1;
  background: white;
  border-radius: 2%;
  border: solid 1px #c7c8c9;
  overflow-y: visible;
`;
const ChatFeed = styled.div`
  height: 70px;
  border: rgb(246, 246, 246);
  border: solid 1px #c7c8c9;
  padding: 10px;
  cursor: pointer;
`;
const SelectedFeed = styled.div`
  grid-column: 2;
  background: white;
  border-radius: 2%;
  border: solid 1px #c7c8c9;
  overflow-y: visible;
  display: inline-grid;
  grid-template-rows: 1fr 10%;
`;
const TextBox = styled.div`
  display: inline-grid;
  grid-template-columns: 93% 7%;
  width: 100%;
  align-items: center;
  grid-row: 2;
`;

const InputWrapper = styled.div`
  height: 30rem;
  overflow-y: auto;
`;

const Message = styled.div`
  display: inline-grid;
  grid-template-columns: 70% 30%;
  width: 83%;
  padding: 3%;
  border: 1px solid #c7c8c9;
  border-radius: 10px;
  background-color: rgb(246, 246, 246);
`;

const MessageContainer = styled.div`
  padding: 2%;
`;
