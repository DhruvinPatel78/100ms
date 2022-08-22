import React, { useEffect, useState } from "react";
import {
  useHMSStore,
  selectLocalPeer,
  selectPeers,
  useHMSActions,
  selectIsSomeoneScreenSharing,
  useHMSNotifications,
  HMSNotificationTypes,
  selectPeerScreenSharing,
  selectHMSMessages,
  selectLocalPeerRole,
} from "@100mslive/hms-video-react";
import VideoTile from "./VideoTile";
import ControlBar from "./ControlBar";
import ListOfPeer from "./ListOfPeer";
import Screen from "./Screen";
import Chat from "./Chat";
const Room = () => {
  const localPeer = useHMSStore(selectLocalPeer);
  const peers = useHMSStore(selectPeers);
  const roles = useHMSStore(selectLocalPeerRole);
  const hmsActions = useHMSActions();
  const isLocalScreenShared = useHMSStore(selectIsSomeoneScreenSharing);
  const whoIsScreenSharing = useHMSStore(selectPeerScreenSharing);
  const allMessages = useHMSStore(selectHMSMessages);
  const [tab, setTab] = useState("people");
  const notification = useHMSNotifications();
  const toggleScreen = async () => {
    await hmsActions.setScreenShareEnabled(!isLocalScreenShared);
  };
  useEffect(() => {
    if (!notification) {
      return;
    }
    switch (notification.type) {
      case HMSNotificationTypes.PEER_JOINED:
        console.log(`${notification.data.name} joined`);
        break;
      case HMSNotificationTypes.PEER_LEFT:
        console.log(`${notification.data.name} left`);
        break;
      case HMSNotificationTypes.NEW_MESSAGE:
        break;
      case HMSNotificationTypes.ERROR:
        console.log("[Error]", notification.data);
        // console.log('[Error Code]', notfication.data.code);
        break;
      case HMSNotificationTypes.TRACK_DEGRADED:
        break;
      case HMSNotificationTypes.TRACK_RESTORED:
        break;
      case HMSNotificationTypes.ROOM_ENDED:
        break;
      case HMSNotificationTypes.REMOVED_FROM_ROOM:
        break;
      case HMSNotificationTypes.DEVICE_CHANGE_UPDATE:
        break;
      case HMSNotificationTypes.CHANGE_TRACK_STATE_REQUEST:
        break;
      default:
        break;
    }
  }, [notification]);
  console.log("roles - - >", roles);
  console.log("tabs - - >", tab);
  console.log("Peers - - >", peers);
  console.log("Peers  - - > Local", localPeer);
  console.log("Peers  - - > Sharing", whoIsScreenSharing);
  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {whoIsScreenSharing ? (
          whoIsScreenSharing.id !== localPeer.id ? (
            peers ? (
              <Screen
                peer={peers
                  .filter((peer) => !peer.isLocal)
                  .find((p) => p.id === whoIsScreenSharing.id)}
                isLocal={false}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            ) : null
          ) : null
        ) : null}
        <div
          style={{
            display: "flex",
            background: "rgb(17 24 39)",
            width: "100%",
            height: "100%",
            padding: "0.5rem",
            flexWrap: whoIsScreenSharing ? "nowrap" : "wrap",
            overflowX: whoIsScreenSharing ? "scroll" : "unset",
          }}
        >
          {localPeer && (
            <VideoTile
              peer={{ ...localPeer, name: localPeer.name + "(You)" }}
              isLocal={true}
            />
          )}
          {peers &&
            peers
              .filter((peer) => !peer.isLocal)
              .map((peer, i) => {
                return (
                  <div key={i}>
                    <VideoTile
                      isLocal={false}
                      peer={peer}
                      isLocalScreenShared={isLocalScreenShared}
                    />
                  </div>
                );
              })}
        </div>
        <ControlBar
          toggleScreen={toggleScreen}
          isLocalScreenShared={isLocalScreenShared}
          peers={peers}
          localPeer={localPeer}
          allMessages={allMessages}
        />
      </div>
      <div style={{ width: "350px" }}>
        <div
          style={{
            background: "rgb(21,39,56)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            rowGap: "10px",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <div
              style={{
                fontSize: 21,
                fontWeight: "600",
                cursor: "pointer",
                background: tab === "people" ? "rgb(29,49,70)" : "",
                padding: "4px 10px",
              }}
              onClick={() => setTab("people")}
            >
              People
            </div>
            <div
              style={{
                fontSize: 21,
                fontWeight: "600",
                cursor: "pointer",
                background: tab === "chat" ? "rgb(29,49,70)" : "",
                padding: "4px",
              }}
              onClick={() => setTab("chat")}
            >
              Chat
            </div>
          </div>
          {tab === "people" ? (
            peers
              .filter((item) => item.id !== localPeer.id)
              .map((user) => {
                console.log("user  - - -->", user);
                return (
                  <div key={user.id}>
                    <ListOfPeer user={user} localPeer={localPeer} />
                  </div>
                );
              })
          ) : (
            <Chat peer={localPeer} allMessages={allMessages} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Room;
