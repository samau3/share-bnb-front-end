import { useState } from "react";
import "./Carousel.css";
// import Card from "./Card";


/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */

function Carousel({ photoUrls }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photoUrls[currCardIdx];
  const total = photoUrls.length;

  const leftIconHidden = (currCardIdx === 0) ? "hidden" : "";
  const rightIconHidden = (currCardIdx === total - 1) ? "hidden" : "";

  //Increments currCardIdx state by 1
  function goForward() {
    setCurrCardIdx(currCardIdx + 1);
  }

  //Decrements currCardIdx state by 1
  function goBack() {
    setCurrCardIdx(currCardIdx - 1);
  }

  return (
    <div className="Carousel">
      {/* <h1>{title}</h1> */}
      <div className="Carousel-main">
        <i
          className={`fas fa-chevron-circle-left fa-2x ${leftIconHidden}`}
          onClick={goBack}
        />
        {/* <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        /> */}
        {photoUrls[0] && <div className="carousel-item active" ><img className="d-block w-100" src={photoUrls[0]} alt="listing" /></div>}
        {photoUrls[1] && <div className="carousel-item" ><img className="d-block w-100" src={photoUrls[1]} alt="listing" /></div>}
        {photoUrls[2] && <div className="carousel-item" ><img className="d-block w-100" src={photoUrls[2]} alt="listing" /></div>}
        {/* <div className="Card">
          <img className="Card-image" src={photoUrls} alt="listing" />
          <small className="Card-small">
            Image {currNum} of {totalNum}.
          </small>
        </div> */}
        <i
          className={`fas fa-chevron-circle-right fa-2x ${rightIconHidden}`}
          onClick={goForward}
        />
      </div>
    </div>
  );
}

export default Carousel;
