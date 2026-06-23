export type WalletId = string;

export interface WalletInfo {
  id: WalletId;
  name: string;
  icon: string;
  isAvailable: boolean;
  url: string;
}

export interface PollInfo {
  question: string;
  options: string[];
  deadline: number;
  owner: string;
  totalVotes: number;
}

export interface PollResults {
  votes: number[];
}

export interface TxStatus {
  status: "idle" | "pending" | "success" | "fail";
  hash?: string;
  error?: string;
}

export type FeedbackType = "success" | "error" | "info";

export interface Feedback {
  type: FeedbackType;
  message: string;
  txHash?: string;
}

export interface VoteEvent {
  pollId: string;
  voter: string;
  optionIndex: number;
  timestamp: number;
  txHash: string;
}

export interface BackendEvent {
  type: "Vote" | "PollCreated";
  data: VoteEvent | { pollId: string; question: string; creator: string; deadline: number; txHash: string };
}
