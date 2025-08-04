import { differenceInDays, format, parseISO } from "date-fns";

export const formatTimestamp = (timestamp) => {
  const ts = parseISO(timestamp);
  const currentTime = Date.now();
  const formattedTs = format(ts, "hh:mm a");

  const timeDiff = differenceInDays(currentTime, ts);

  if (timeDiff < 1) return `Today ${formattedTs}`;
  if (timeDiff == 1) return `Yesterdat ${formattedTs}`;
  if (timeDiff > 1) return format(ts, "MMM d, hh:mm a");
};

export const formatLastMessageTs = (timestamp) => {
  const ts = parseISO(timestamp);
  const formattedTs = format(ts, "hh:mm a");
  return formattedTs;
};
