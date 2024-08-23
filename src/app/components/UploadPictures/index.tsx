import React, { useRef } from "react";

const UploadPictures = () => {
  const [files, setFiles] = React.useState<FileList | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files;
    console.log(fileUploaded)
    // handleFile(fileUploaded);
  };

  return (
    <div className="mx-auto w-3/4">
      <div className="lg:text-2xl text-md">
        <p className="text-center font-bold underline"> Snap It, Share It, Love It!!!</p>
        <p className="text-center">
        Capture the magic, whether it&apos;s a spontaneous moment <br /> or a goofy grin. <br /> Share your favorite wedding snapshots here and help us treasure the memories forever!
          {/* Whether it&apos;s a candid shot or a silly pose, We&apos;ll love to see it all.{" "}
          <br /> Upload the best wedding snapshots here and be a part of our
          forever memories */}
        </p>
        <div className="flex justify-center z-30">
          <button
            className="bg-white text-black px-8 py-2 lg:px-12 mt-4 rounded-md font-bold lg:py-4"
            onClick={handleClick}
          >
            Select Photos
          </button>
          <input
            type="file"
            onChange={handleChange}
            ref={hiddenFileInput}
            style={{ display: "none" }} // Make the file input element invisible
            multiple
          />
        </div>
      </div>
    </div>
  );
};

export default UploadPictures;
