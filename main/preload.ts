import { contextBridge, ipcRenderer } from 'electron';

const api = {
  // Allowlist for request-response style communication
  invoke: (channel: string, ...data: any) => {
    const allowedChannels: Array<string> = [];
    if (allowedChannels.includes(channel)) {
      ipcRenderer.invoke(channel, ...data);
    }
  },
  // allowlist channels sending to MAIN
  send: (channel: string, ...data: any) => {
    const allowedChannels: Array<string> = ['greet'];
    if (allowedChannels.includes(channel)) {
      ipcRenderer.send(channel, ...data);
    }
  },
  on: (channel: string, cb: (...args: any) => any) => {
    // allowlist channels receiving in
    const allowedChannels: Array<string> = ['greet-back'];
    if (allowedChannels.includes(channel)) {
      ipcRenderer.on(channel, (_event, ...args) => cb(...args));
    }
  },
  removeAllListeners: (channel: string) => {
    const allowedChannels: Array<string> = [];
    if (allowedChannels.includes(channel)) {
      ipcRenderer.removeAllListeners(channel);
    }
  },
};

declare global {
  interface Window {
    electronRequire: NodeRequire;
    api: typeof api;
  }
}
// this is because we need to have context isolation to be false for spectron tests to run,
// but context bridge only runs if context isolation is true
// basically we are assigning certain node functionality (require, ipcRenderer) to the window object
// in an UN-isolated context only for testing
// security is reduced for testing, but remains sturdy otherwise
if (process.env.NODE_ENV === 'test') {
  window.electronRequire = require;
  window.api = api;
} else {
  contextBridge.exposeInMainWorld('api', api);
}
