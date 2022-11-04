import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "06be435a29fa4a8cad91cce7863cb560";
const token = "007eJxTYKh9eqRjqeDP8ElvjwtqnQ5ZUy80Y0GbC+OKOP8DK1Nd3mYpMBiYJaWaGJsmGlmmJZokWiQnplgaJienmluYGScnmZoZPHyYnNwQyMjgeMGXiZEBAkF8VobizMzifAYGANiKIW0=";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "siiso";