import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "06be435a29fa4a8cad91cce7863cb560";
const token = "007eJxTYJi0JGXWbsNFjkv+JrI0NDyZ5Zv/f36AQkLLV44FMh/f8KcpMBiYJaWaGJsmGlmmJZokWiQnplgaJienmluYGScnmZoZGEzLTW4IZGQQWfCbkZEBAkF8VobizMzifAYGALMrILk=";

export const config = { mode: "rtc", codec: "h264", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "siiso";