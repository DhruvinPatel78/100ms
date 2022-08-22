import React, { useRef, useEffect } from "react";
import {
  HMSNotificationTypes,
  selectAudioTrackByPeerID,
  selectCameraStreamByPeerID,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  useHMSActions,
  useHMSNotifications,
  useHMSStore,
} from "@100mslive/hms-video-react";
import user from "./user.svg";
const VideoTile = ({ peer, isLocal, isLocalScreenShared }) => {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  const audioTrack = useHMSStore(selectAudioTrackByPeerID(peer.id));
  const videoOn = useHMSStore(selectIsPeerVideoEnabled(peer.id));
  const notification = useHMSNotifications();
  console.log("notification - - - ->", notification);
  console.log("audioTrack - - - ->", audioTrack);
  console.log("videoRef - - - >", videoRef.current);
  useEffect(() => {
    (async () => {
      console.log("videoTrack from videoTile - - - ", videoTrack);
      if (videoRef.current && videoTrack) {
        if (videoTrack.enabled) {
          await hmsActions.attachVideo(videoTrack.id, videoRef.current);
        } else {
          await hmsActions.detachVideo(videoTrack.id, videoRef.current);
        }
      }
    })();
  });
  return (
    <div style={{ display: "flex", margin: "0.25rem" }}>
      <div style={{ position: "relative" }}>
        {videoOn ? (
          <video
            ref={videoRef}
            autoPlay={true}
            playsInline
            muted={true}
            style={{
              objectFit: "cover",
              height: "16rem",
              width: "16rem",
              borderRadius: "0.5rem",
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              minWidth: "16rem",
              minHeight: "16rem",
            }}
          />
        ) : (
          <img
            src={user}
            style={{
              minWidth: "16rem",
              minHeight: "16rem",
              height: "16rem",
              width: "16rem",
            }}
            alt={"user"}
          />
        )}
        <div
          style={{
            top: "0px",
            width: "100%",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
              background: "rgb(75 85 99)",
              fontSize: " 0.875rem",
              lineHeight: "1.25rem",
              color: "white",
              marginTop: " 0.5rem",
              marginLeft: "0.25rem",
              borderRadius: "0.5rem",
            }}
          >
            {`${peer.name}`}
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoTile;
