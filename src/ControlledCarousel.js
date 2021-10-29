import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel'


/** ControlledCarousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photoUrls: array of photo source strings
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * Listing --> ControlledCarousel
 */

function ControlledCarousel({ photoUrls }) {

  const [currCardIdx, setCardIdx] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setCardIdx(selectedIndex);
  };

  return (
    <div className="container w-75">
      <Carousel fade activeIndex={currCardIdx} onSelect={handleSelect}>
        {photoUrls.map(photo => (
          <Carousel.Item key={photo}>
            <img
              className="d-block w-100"
              src={photo}
              alt="listing"
            />
          </Carousel.Item>
        ))}

      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
