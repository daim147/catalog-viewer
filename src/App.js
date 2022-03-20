import React, { Fragment, useState } from 'react';
import 'h8k-components';

import { image1, image2, image3, image4 } from './assets/images';
import { Thumbs, Viewer } from './components';

const title = 'Catalog Viewer';

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1,
    },
    {
      thumb: image2,
      image: image2,
    },
    {
      thumb: image3,
      image: image3,
    },
    {
      thumb: image4,
      image: image4,
    },
  ];

  const [catalogs] = useState([...catalogsList]);
  let [activeIndex, setActiveIndex] = useState(0);
  const [slideTimer, setSlideTimer] = useState(null);
  const [slideDuration] = useState(3000);
  const [slide, setSlide] = useState();
  let timer;
  const goNext = () => {
    console.log(activeIndex, 'fnc', catalogs.length);
    if (activeIndex >= catalogs.length - 1) {
      setActiveIndex(() => 0);
      return;
    }
    setActiveIndex(++activeIndex);
  };
  const goBack = (e) => {
    if (activeIndex <= 0) {
      setActiveIndex(catalogs.length - 1);
      return;
    }
    setActiveIndex(--activeIndex);
  };
  const toggleTimer = ({ target: { checked } }) => {
    if (checked) {
      timer = setInterval(() => {
        goNext();
      }, slideDuration);
    }
  };
  console.log(activeIndex, 'active re');
  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className='layout-row justify-content-center align-items-center mt-20'>
              <button
                className='icon-only outlined'
                data-testid='prev-slide-btn'
                onClick={goBack}
              >
                <i className='material-icons'>arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
                setIndex={setActiveIndex}
              />
              <button
                className='icon-only outlined'
                data-testid='next-slide-btn'
                onClick={goNext.bind(this, activeIndex)}
              >
                <i className='material-icons'>arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input
            type='checkbox'
            data-testid='toggle-slide-show-button'
            onChange={toggleTimer}
          />
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
