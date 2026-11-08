'use client';

import { io, type Socket } from 'socket.io-client';

import type { ClientToServerEvents, ServerToClientEvents } from '@/features/live/types';

type LiveSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socketInstance: LiveSocket | null = null;

function getSocketUrl(): string {
  const rawUrl =
    process.env.NEXT_PUBLIC_LIVE_SOCKET_URL?.trim() || process.env.NEXT_PUBLIC_GAME_API_BASE_URL?.trim();

  if (!rawUrl) {
    throw new Error('请在 .env.local 中配置 NEXT_PUBLIC_LIVE_SOCKET_URL，然后重启应用。');
  }

  try {
    const parsed = new URL(rawUrl);
    if (/^(https?|wss?):$/.test(parsed.protocol) && parsed.host) {
      return `${parsed.protocol}//${parsed.host}`;
    }
  } catch {
    // Report malformed URLs and unsupported protocols with the same message.
  }

  throw new Error('联机服务地址格式有误，请检查 .env.local。');
}

function getSocketPath(): string {
  return process.env.NEXT_PUBLIC_LIVE_SOCKET_PATH ?? '/live/socket.io';
}

export async function getLiveSocket(): Promise<LiveSocket> {
  if (socketInstance) {
    return socketInstance;
  }

  const socketUrl = getSocketUrl();
  const socketPath = getSocketPath();

  socketInstance = io(socketUrl, {
    path: socketPath,
    transports: ['websocket', 'polling'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 500,
    reconnectionDelayMax: 2000,
    withCredentials: true,
  });

  return socketInstance;
}

export function getLiveSocketIfReady(): LiveSocket | null {
  return socketInstance;
}
