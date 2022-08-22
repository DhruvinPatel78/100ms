import React, { useState } from "react";
import { Button, useHMSActions } from "@100mslive/hms-video-react";
import { IoSend } from "react-icons/io5";
const Chat = ({ peer, allMessages }) => {
  const [message, setMessage] = useState("");
  console.log("peer - - - - >", peer);
  console.log("allMessages - - - - >", allMessages);
  const hmsActions = useHMSActions();
  const chatHandler = (msg) => {
    hmsActions.sendBroadcastMessage(msg);
    setMessage("");
  };
  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          background: "rgb(21,39,56)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          justifyContent: "space-between",
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "10px 0px",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
          }}
        >
          {allMessages.map((mes) => {
            return (
              <div
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "rgb(41,62,83)",
                  borderRadius:
                    mes.senderName === "You"
                      ? "20px  0px 20px 20px"
                      : "20px 20px 20px 0px",
                }}
                key={mes.id}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: mes.senderName === "You" ? "start" : "end",
                    flexDirection: "row",
                    fontWeight: "600",
                  }}
                >
                  <div>
                    {mes.senderName === "You"
                      ? mes.senderName
                      : formatAMPM(mes.time)}
                  </div>
                  <div>
                    {mes.senderName === "You"
                      ? formatAMPM(mes.time)
                      : mes.senderName}
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: mes.senderName === "You" ? "start" : "end",
                    flexDirection: "column",
                  }}
                >
                  {mes.message}
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: "10px",
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type={"text"}
            value={message}
            placeholder={"send message to everyone"}
            onChange={(e) => setMessage(e.target.value)}
            style={{ padding: "10px" }}
          />
          <Button
            style={{
              fontSize: "0.75rem",
              lineHeight: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              background: "white",
              padding: "10px",
              borderRadius: "40px",
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
              caretColor: "#6366f1",
              color: "#6366f1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "0.5rem",
              cursor: "pointer",
            }}
            onClick={() => chatHandler(message)}
          >
            <IoSend style={{ width: 20, height: "auto" }} />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
