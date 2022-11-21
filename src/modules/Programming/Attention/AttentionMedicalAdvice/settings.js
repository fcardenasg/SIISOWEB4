import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "06be435a29fa4a8cad91cce7863cb560";
const token = "007eJxTYOiNcDUt2Lj/YV3gkcb51+c+6n0bZ9nD2cEe/1VhW0eLQrgCg4FZUqqJsWmikWVaokmiRXJiiqVhcnKquYWZcXKSqZlB1Jzq5IZARoaru3YzMjJAIIjPylCcmVmcz8AAAL96IV0=";

export const config = { mode: "rtc", codec: "h264", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "siiso";