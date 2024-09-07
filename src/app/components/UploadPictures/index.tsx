import React, { SetStateAction, useRef } from "react";
import { storage } from "@/config/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";
interface UploadProgress {
  file: File;
  progress: number;
  url?: string;
  error?: string;
}

const UploadPictures = ({
  setStart,
}: {
  setStart: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [overallProgress, setOverallProgress] = React.useState<
    Record<string, number>
  >({});
  const [uploadedPictures, setUploadedPictures] = React.useState(0);
  const [allPicturesCount, setAllPicturesCount] = React.useState(0);
  const [showProgress, setShowProgress] = React.useState(false);

  console.log(`Overall Progress:`, overallProgress);
  console.log(`Uploaded Pictures: ${uploadedPictures} / ${allPicturesCount}`);

  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };

  const maxFileSizeInBytes = 200 * 1024 * 1024;

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const allFiles = Array.from(files);
      setAllPicturesCount(allFiles.length);

      const uploadProgressArray = new Array(allFiles.length).fill(0); // Track progress of each file

      const uploadPromises: Promise<UploadProgress>[] = allFiles
        .filter((file) => file.size <= maxFileSizeInBytes)
        .map((file, index) => {
          const storageRef = ref(storage, `the-lawal-union/${nanoid()}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          return new Promise<UploadProgress>((res, rej) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                console.log({ snapshot: snapshot.ref.fullPath });
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                // Update the progress of this file in the array
                uploadProgressArray[index] = progress;

                setOverallProgress((prevState) => {
                  return { ...prevState, [snapshot.ref.fullPath]: progress };
                });

                if (progress === 100) {
                  setUploadedPictures((prevState) => {
                    const updatedCount = prevState + 1;
                    if (updatedCount === allFiles.length) {
                      setTimeout(() => {
                        setStart(false);
                      }, 3000);
                    }
                    return updatedCount;
                  });
                }
              },
              (error) => {
                rej({ file, progress: 0, error: error.message });
              },
              () => {
                res({ file, progress: 100 });
              }
            );
          });
        });

      setShowProgress(true);
      await Promise.allSettled(uploadPromises);
    }
  };

  const currentProgress = Object.values(overallProgress).reduce(
    (prev, curr) => prev + curr,
    0
  );

  if (showProgress) {
    return (
      <div className="w-[80vw] lg:w-[50vw]">
        {uploadedPictures ? (
          <p className="text-sm lg:text-xl text-center font-sans mb-4">
            Uploaded {uploadedPictures} / {allPicturesCount} of{" "}
            {allPicturesCount} Photos (
            {Math.floor((currentProgress / (allPicturesCount * 100)) * 100)}%)
          </p>
        ) : (
          ""
        )}
        <div
          className="flex w-full h-1.5 bg-gray-100 rounded-full overflow-hidden dark:bg-neutral-700"
          role="progressbar"
          aria-valuenow={(currentProgress / (allPicturesCount * 100)) * 100}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
            style={{
              width: `${(currentProgress / (allPicturesCount * 100)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-3/4">
      <div className="lg:text-2xl text-md">
        <p className="text-center font-bold underline">
          Snap It, Share It, Love It!!!
        </p>
        <p className="text-center">
          Capture the magic, whether it&apos;s a spontaneous moment <br /> or a
          goofy grin. <br /> Share your favorite wedding snapshots here and help
          us treasure the memories forever
        </p>
        <div className="flex justify-center z-30">
          <button
            className="bg-white text-black px-8 py-2 lg:px-12 mt-4 rounded-md font-bold lg:py-4"
            onClick={handleClick}
          >
            Select Photos / videos
          </button>
          <input
            type="file"
            onChange={handleChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
            multiple
            accept="image/* video/* .HEIC .heic"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadPictures;
