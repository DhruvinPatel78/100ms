import "./App.css";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/hms-video-react";
import PreviewScreen from "./PreviewScreen";
import Room from "./Room";
const endPoint =
  "https://prod-in2.100ms.live/hmsapi/dhruvin-demo.app.100ms.live/";
const getToken = async (user_id, role) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id,
      role: role,
      type: "app",
      room_id: "62fc8de3c16640065697603d",
    }),
  };
  const res = await fetch(`${endPoint}api/token`, requestOptions);
  const { token } = await res.json();
  return token;
};
const App = () => {
  const hmsActions = useHMSActions();
  const isConnect = useHMSStore(selectIsConnectedToRoom);
  const submitHandler = async (userName, role) => {
    const token = await getToken(userName, role);
    hmsActions.join({ authToken: token, userName });
  };
  console.log("hmsActions - - - >", hmsActions);
  console.log("hmsActions hmsSDKPeers - - - >", hmsActions?.hmsSDKPeers?.role);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      {isConnect ? <Room /> : <PreviewScreen submitHandler={submitHandler} />}
    </div>
  );
};

export default App;
