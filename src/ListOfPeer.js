import React from "react";
import {
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from "react-icons/bs";
import {
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  useHMSActions,
  useHMSStore,
} from "@100mslive/hms-video-react";

const ListOfPeer = ({ user, localPeer }) => {
  const hmsActions = useHMSActions();
  const audioOn = useHMSStore(selectIsPeerAudioEnabled(user.id));
  const videoOn = useHMSStore(selectIsPeerVideoEnabled(user.id));
  const Audio = async (peer) => {
    try {
      await hmsActions.setRemoteTrackEnabled(peer.audioTrack, !audioOn);
    } catch (error) {
      console.error(error);
    }
  };
  const video = async (peer) => {
    try {
      await hmsActions.setRemoteTrackEnabled(peer.videoTrack, !videoOn);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      style={{
        background: "rgb(41,62,83)",
        width: "100%",
        paddingTop: "8px",
        paddingLeft: "4px",
        paddingBottom: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: "2rem",
        borderRadius: "4px",
        justifyContent: "space-between",
      }}
      key={user.id}
    >
      <div style={{ paddingLeft: "10px" }}>{user.name}</div>
      {localPeer.roleName === "host" && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: "1rem",
            paddingRight: "10px",
          }}
        >
          {audioOn ? (
            <BsFillMicFill
              style={{
                width: 20,
                height: "auto",
                cursor: "pointer",
              }}
              onClick={() => Audio(user)}
            />
          ) : (
            <BsFillMicMuteFill
              style={{
                width: 20,
                height: "auto",
                cursor: "pointer",
              }}
              onClick={() => Audio(user)}
            />
          )}
          {videoOn ? (
            <BsCameraVideoFill
              style={{
                width: 20,
                height: "auto",
                cursor: "pointer",
              }}
              onClick={() => video(user)}
            />
          ) : (
            <BsCameraVideoOffFill
              style={{
                width: 20,
                height: "auto",
                cursor: "pointer",
              }}
              onClick={() => video(user)}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default ListOfPeer;
