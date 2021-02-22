import { useState, useEffect } from "react";
import galleryUrls from "../gallery.json";
import React from "react";

export default function Gallery() {
  const [pics, setPics] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setPics(
      galleryUrls.map((e, i) => {
        return (
          <div>
            <p>{i}</p>
            <img className="gallery-img" src={`${e}`} key={i} alt="gallery" />
          </div>
        );
      })
    );
  }, []);

  return (
    <div className="gallery-container">
      <div className="gallery">
        {index === 0 ? pics[pics.length - 1] : pics[index - 1]}
        {pics[index]}
        {index === pics.length - 1 ? pics[0] : pics[index + 1]}
      </div>
      <div className="button-container">
        <button
          onClick={() => setIndex(index === 0 ? pics.length - 1 : index - 1)}
        >
          Last
        </button>
        <button
          onClick={() => setIndex(index === pics.length - 1 ? 0 : index + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
