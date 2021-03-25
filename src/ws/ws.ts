import { Conversation, Status } from '../entities';

/** Map of event name and callback argument */
export interface EventTypeMap {
  /** Status posted */
  update: [Status];
  /** Status deleted */
  delete: [Status['id']];
  /** User's notification */
  notification: [Notification];
  /** User's filter changed */
  filters_changed: [];
  /** Status added to a conversation */
  conversation: [Conversation];
  /** for RxJS' `fromEvent` compatibility */
  [K: string]: unknown[];
}

/** Supported event names */
export type EventType =
  | 'update'
  | 'delete'
  | 'notification'
  | 'filters_changed'
  | 'conversation';

/** Mastodon event */
export interface Event {
  event: EventType;
  payload: string;
}

export interface WsEvents {
  // readonly connect: () => Promise<WsEvents>;
  readonly disconnect: () => void;
  readonly on: <T extends EventType>(
    name: T,
    cb: (...data: EventTypeMap[T]) => void,
  ) => void;
}

export interface Ws {
  stream(path: string, params: unknown): Promise<WsEvents>;
}
