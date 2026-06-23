import type { BackendEvent } from "../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export function subscribeToEvents(
  onEvent: (event: BackendEvent) => void,
  onError?: (err: Event) => void
): () => void {
  const eventSource = new EventSource(`${BACKEND_URL}/api/events`);

  eventSource.onmessage = (msg) => {
    try {
      const data = JSON.parse(msg.data);

      if (data.type === "Vote") {
        onEvent({ type: "Vote", data: data.data });
      } else if (data.type === "PollCreated") {
        onEvent({ type: "PollCreated", data: data.data });
      }
    } catch {
      // ignore parse errors
    }
  };

  eventSource.onerror = (err) => {
    onError?.(err);
  };

  return () => {
    eventSource.close();
  };
}

export async function publishVoteEvent(
  pollId: string,
  voter: string,
  optionIndex: number,
  timestamp: number,
  txHash: string
) {
  const params = new URLSearchParams({
    event_type: "vote",
    poll_id: pollId,
    voter,
    option_index: optionIndex.toString(),
    timestamp: timestamp.toString(),
    tx_hash: txHash,
  });

  try {
    await fetch(`${BACKEND_URL}/api/publish?${params}`);
  } catch {
    // backend not available, ignore
  }
}

export async function publishPollCreatedEvent(
  pollId: string,
  question: string,
  creator: string,
  deadline: number,
  txHash: string
) {
  const params = new URLSearchParams({
    event_type: "poll_created",
    poll_id: pollId,
    question,
    creator,
    deadline: deadline.toString(),
    tx_hash: txHash,
  });

  try {
    await fetch(`${BACKEND_URL}/api/publish?${params}`);
  } catch {
    // backend not available, ignore
  }
}
