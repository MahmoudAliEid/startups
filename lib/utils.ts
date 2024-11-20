import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(date: string) {
  return new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const Notify = ({
  message,
  type,
}: {
  message: string;
  type: string;
}) => {
  const config = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  } as const;
  if (type === "warn") toast.warn(message, config);
  else if (type === "success") toast.success(message, config);
  else if (type === "error") toast.error(message, config);
};

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}
