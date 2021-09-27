export interface UserPayload {
  email: string;
  password: string;
  id?: string;
}

export interface DatabaseItem {
  id?: number;
  userId?: string;
  originUrl: string;
  shortUrl: string;
  hash: string
}
