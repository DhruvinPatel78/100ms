import React, { useRef, useEffect } from "react";
import {
  selectScreenShareByPeerID,
  useHMSActions,
  useHMSStore,
} from "@100mslive/hms-video-react";
const Screen = ({ peer, isLocal, style = {} }) => {
  const hmsActions = useHMSActions();
  const screenRef = useRef(null);
  const screenTrack = useHMSStore(selectScreenShareByPeerID(peer.id));
  console.log("screenTrack from Screen  = = =>", screenTrack);
  console.log("peer from Screen  = = =>", peer);
  useEffect(() => {
    (async () => {
      console.log(screenRef.current);
      // console.log(screenTrack);
      if (screenRef.current && screenTrack) {
        if (screenTrack.enabled) {
          await hmsActions.attachVideo(screenTrack.id, screenRef.current);
        } else {
          await hmsActions.detachVideo(screenTrack.id, screenRef.current);
        }
      }
    })();
  }, [screenTrack]);
  return (
    <>
      <div style={style}>
        <video
          ref={screenRef}
          autoPlay={true}
          playsInline
          muted={false}
          className={` ${isLocal ? "You are sharing your screen" : ""}`}
        />
      </div>
    </>
  );
};
export default Screen;
