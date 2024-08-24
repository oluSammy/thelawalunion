import React from "react";
import toast from "react-hot-toast";

const ToastComponent = ({ t, msg }: { t: any; msg: string }) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } w-full bg-black shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black`}
    >
      <div className="flex-1 w-0 p-4 text-center text-white">{msg}</div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full rounded-none p-4 flex items-center justify-center text-sm font-medium text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ToastComponent;
