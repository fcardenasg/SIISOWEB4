import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "06be435a29fa4a8cad91cce7863cb560";
const token = "007eJxTYCheu329wONM3dsPb9XsSmJkTfxzs5RzfvP7uyWqz64USU5SYDAwS0o1MTZNNLJMSzRJtEhOTLE0TE5ONbcwM05OMjUzeMqak9wQyMgw748OKyMDBIL4rAzFmZnF+QwMABPUIgw=";

export const config = { mode: "rtc", codec: "h264", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "siiso";