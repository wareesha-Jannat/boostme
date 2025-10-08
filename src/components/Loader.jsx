import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loader({ size = 24, color = "text-white" }) {
  return (
    <ArrowPathIcon
      className={`animate-spin ${color}inline-flex align-middle`}
      style={{ width: size, height: size }}
    />
  );
}
