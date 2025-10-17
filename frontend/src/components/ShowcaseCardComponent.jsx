import React, { useState, useEffect } from "react";
import image1 from "../assets/model1.jpg";
import image2 from "../assets/model2.png";
import image3 from "../assets/product1.png";

export default function ShowcaseCardComponent() {
  const images = [image1, image2, image3];
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random image different from the current one
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * images.length);
      } while (images[randomIndex] === currentImage);

      setCurrentImage(images[randomIndex]);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentImage, images]);

  return (
    <div className="flex justify-center py-10 bg-[#F7F3EC]">
      <div className="rounded-2xl shadow-lg overflow-hidden w-[320px] h-[420px] hover:scale-105 transition-transform duration-500 ease-in-out">
        <img
          src={currentImage}
          alt="Showcase"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
