import { useEffect, useState } from "react";

export function Toast({ message = "This is a toast!", duration = 3000 }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer); // cleanup on unmount
  }, [duration]);

  if (!show) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex justify-center items-center">
      <div className="bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg">
        {message}
      </div>
    </div>
  );
}
