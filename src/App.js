import React, { Fragment, useState, useEffect } from 'react';
import 'h8k-components';

import { image1, image2, image3, image4 } from './assets/images';
import { Thumbs, Viewer } from './components';

const title = 'Catalog Viewer';
let timer;
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
  const [slideDuration] = useState(2000);
  const [slide, setSlide] = useState();
  const goNext = () => {
    clearTimer();
    if (activeIndex >= catalogs.length - 1) {
      activeIndex = 0;
      setActiveIndex(activeIndex);
      setTimer();
      return;
    }
    setActiveIndex(++activeIndex);
    setTimer();
  };
  const goBack = () => {
    clearTimer();
    if (activeIndex <= 0) {
      activeIndex = catalogs.length - 1;
      setActiveIndex(activeIndex);
      return;
    }
    setActiveIndex(--activeIndex);
    setTimer();
  };
  const setIndex = (index) => {
    clearTimer();
    activeIndex = index;
    setActiveIndex(activeIndex);
    setTimer();
  };
  const setTimer = () => {
    timer = setInterval(() => {
      goNext();
    }, slideDuration);
  };
  const clearTimer = () => {
    clearInterval(timer);
    timer = undefined;
  };
  useEffect(() => {
    if (slide) {
      setTimer();
    } else {
      clearTimer();
    }
  }, [slide]);
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
                setIndex={setIndex}
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
            onChange={(e) => setSlide(e.target.checked)}
          />
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
