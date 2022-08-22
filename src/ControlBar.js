import React, { useEffect } from "react";
import {
  HMSNotificationTypes,
  selectIsConnectedToRoom,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectPermissions,
  useHMSActions,
  useHMSNotifications,
  useHMSStore,
} from "@100mslive/hms-video-react";
import {
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from "react-icons/bs";
import {
  MdCallEnd,
  MdPresentToAll,
  MdOutlineCancelPresentation,
} from "react-icons/md";
const ControlBar = ({ toggleScreen, isLocalScreenShared, localPeer }) => {
  const hmsActions = useHMSActions();
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const permissions = useHMSStore(selectPermissions);
  const notification = useHMSNotifications();
  console.log("permissions  - - -  - ->", permissions);
  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };
  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };
  const leave = () => {
    if (isConnected) {
      hmsActions.leave();
    }
  };
  const endRoom = async () => {
    try {
      const lock = false; // set to true to disallow rejoins
      const reason = "meeting is over";
      await hmsActions.endRoom(lock, reason);
      await hmsActions.leave();
    } catch (error) {
      // Permission denied or not connected to room
      console.error(error);
    }
  };
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0px",
        height: "3.5rem",
        // background: "rgb(156 163 175)",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          fontSize: "0.75rem",
          lineHeight: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          background: isLocalAudioEnabled ? "white" : "red",
          padding: "10px",
          borderRadius: "40px",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          caretColor: isLocalAudioEnabled ? "#6366f1" : "white",
          color: isLocalAudioEnabled ? "#6366f1" : "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "0.5rem",
          cursor: "pointer",
        }}
        onClick={toggleAudio}
      >
        {isLocalAudioEnabled ? (
          <BsFillMicFill style={{ width: 20, height: "auto" }} />
        ) : (
          <BsFillMicMuteFill style={{ width: 20, height: "auto" }} />
        )}
      </button>
      <button
        onClick={toggleVideo}
        style={{
          fontSize: "0.75rem",
          lineHeight: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          background: isLocalVideoEnabled ? "white" : "red",
          padding: "10px",
          borderRadius: "40px",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          caretColor: isLocalVideoEnabled ? "#6366f1" : "white",
          color: isLocalVideoEnabled ? "#6366f1" : "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "0.5rem",
          cursor: "pointer",
        }}
      >
        {isLocalVideoEnabled ? (
          <BsCameraVideoFill style={{ width: 20, height: "auto" }} />
        ) : (
          <BsCameraVideoOffFill style={{ width: 20, height: "auto" }} />
        )}
      </button>
      {localPeer.roleName === "host" && (
        <button
          style={{
            fontSize: "0.75rem",
            lineHeight: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            background: !isLocalScreenShared ? "white" : "red",
            padding: "10px",
            borderRadius: "40px",
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            caretColor: "white",
            color: !isLocalScreenShared ? "#6366f1" : "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            marginRight: "0.5rem",
          }}
          onClick={toggleScreen}
        >
          {isLocalScreenShared ? (
            <MdOutlineCancelPresentation
              style={{ width: 20, height: "auto" }}
            />
          ) : (
            <MdPresentToAll style={{ width: 20, height: "auto" }} />
          )}
        </button>
      )}
      <button
        style={{
          fontSize: "0.75rem",
          lineHeight: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          background: "red",
          padding: "10px",
          borderRadius: "40px",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          caretColor: "white",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => (permissions.endRoom ? endRoom() : leave())}
      >
        <MdCallEnd style={{ width: 20, height: "auto" }} />
      </button>
    </div>
  );
};
export default ControlBar;
