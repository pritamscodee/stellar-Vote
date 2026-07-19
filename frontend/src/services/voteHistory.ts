const STORAGE_KEY = "stellar_vote_history";

export interface VoteRecord {
  txHash: string;
  optionIndex: number;
  optionLabel: string;
  question: string;
  timestamp: number;
}

export function loadHistory(): VoteRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addVoteToHistory(record: VoteRecord) {
  const history = loadHistory();
  history.unshift(record);
  if (history.length > 50) history.length = 50;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearVoteHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
