import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "06be435a29fa4a8cad91cce7863cb560";
const token = "007eJxTYDh3K+JDSzQL684NATeYXzvF3NRj+Lb4b07az0Vc3as/NL5XYDAwS0o1MTZNNLJMSzRJtEhOTLE0TE5ONbcwM05OMjUzsLRKTW4IZGTYmMbKysgAgSA+K0NxZmZxPgMDAPv5IS4=";

export const config = { mode: "rtc", codec: "h264", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "siiso";