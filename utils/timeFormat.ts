// utils/timeFormat.ts
import {
  differenceInDays,
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
} from "date-fns";

export const formatRelativeTime = (timestamp: string | Date): string => {
  if (!timestamp) return "";

  const messageTime = new Date(timestamp);
  const now = new Date();
  const daysDifference = differenceInDays(now, messageTime);

  // Just now, minutes ago, hours ago (within today)
  if (isToday(messageTime)) {
    const distance = formatDistanceToNow(messageTime, { addSuffix: true });

    // Replace "about" and "less than" for cleaner display
    return distance
      .replace("about ", "")
      .replace("less than a minute ago", "Just now")
      .replace("1 minute ago", "1 minute ago")
      .replace(/(\d+) minutes ago/, "$1 minutes ago")
      .replace("1 hour ago", "1 hour ago")
      .replace(/(\d+) hours ago/, "$1 hours ago");
  }

  // Yesterday
  if (isYesterday(messageTime)) {
    return "Yesterday";
  }

  // Days ago (2-6 days)
  if (daysDifference < 7) {
    return `${daysDifference} days ago`;
  }

  // For older messages, show full date (26 August, 2025)
  return format(messageTime, "d MMMM, yyyy");
};
