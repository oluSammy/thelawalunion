"use client";

import { useState } from "react";
import UploadPictures from "./components/UploadPictures";

export default function Home() {
  const [start, setStart] = useState(false);

  return (
    <main className="main">
      <div className="z-10">
        <div className="text-white">
          {start ? (
            <UploadPictures setStart={setStart} />
          ) : (
            <>
              <button
                className="text-white text-xl lg:text-2xl border w-20 h-20 lg:w-28 lg:h-28 font-normal rounded-full hover:scale-110 transform transition duration-500 ease-in-out"
                onClick={() => setStart(true)}
              >
                Start
              </button>
              <p className="text-center text-md lg:text-xl mt-2">Tap To Start..</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
