import React, { useRef, useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import clamp from 'lodash-es/clamp';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import './carousel.css';

import { CardBanner } from '../';

const SWIPE_THRESHOLD = 4;

function useWindowWidth() {
  if (typeof window === 'undefined') return;
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return width;
}

function useMax(initial) {
  const [max, set] = useState(initial);

  const setMax = v => (v !== max ? set(max => Math.max(max, v)) : null);

  return [max, setMax];
}

const Slide = ({ registerWidth, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      registerWidth(rect.width);
    }
  }, []);

  return <div ref={ref}>{children}</div>;
};
Slide.propTypes = {
  registerWidth: Proptypes.func,
  children: Proptypes.node,
};

const Page = ({ setHeight, registerMaxSlideWidth, children }) => {
  const [maxSlideWidth, setWidth] = useMax(0);
  const pageRef = useRef(null);
  const width = useWindowWidth();

  useEffect(() => {
    if (pageRef.current) {
      const rect = pageRef.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [width, children]);

  useEffect(() => {
    registerMaxSlideWidth(maxSlideWidth);
  }, [maxSlideWidth]);

  return (
    <section ref={pageRef} className="carousel__page">
      {React.Children.map(children, child => (
        <Slide registerWidth={setWidth}>{child}</Slide>
      ))}
    </section>
  );
};
Page.propTypes = {
  children: Proptypes.node,
  setHeight: Proptypes.func,
  registerMaxSlideWidth: Proptypes.func,
};

const arrayChunks = (array, chunkSize) =>
  Array(Math.ceil(array.length / chunkSize))
    .fill()
    .map((_, index) => index * chunkSize)
    .map(begin => array.slice(begin, begin + chunkSize));

function Carousel({ children, maxPages = Infinity, slidesToShow = 3 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [derivedSlidesToShow, setSlidesToShow] = useState(slidesToShow);
  const [pageHeight, setPageHeight] = useMax(0);
  const [slideWidth, setSlideWidth] = useMax(0);
  const screenWidth = useWindowWidth();

  const childArray = React.Children.toArray(children);
  const pages = arrayChunks(childArray, derivedSlidesToShow);

  const index = useRef(0);

  const [springProps, set] = useSprings(pages.length, i => {
    return {
      x: i * screenWidth,
      sc: 1,
      display: i === index.current ? 'block' : 'none',
    };
  });

  const [bind, gestureState] = useGesture();

  const handleGesture = (
    { down, delta: [xDelta], direction: [xDir], distance, cancel },
    length
  ) => {
    if (down && distance > screenWidth / SWIPE_THRESHOLD) {
      cancel(
        (index.current = clamp(
          index.current + (xDir > 0 ? -1 : 1),
          0,
          length - 1
        ))
      );
    }
    set(i => {
      if (i < index.current - 1 || i > index.current + 1)
        return { display: 'none' };
      const x = (i - index.current) * screenWidth + (down ? xDelta : 0);
      const sc = down ? 1 - distance / screenWidth / 2 : 1;
      return { x, sc, display: 'block' };
    });
    setActiveIndex(index.current);
  };

  const moveToSlide = n => {
    index.current = clamp(n, 0, pages.length - 1);
    set(i => {
      const x = (i - index.current) * screenWidth;
      const sc = 1;
      return { x, sc, display: 'block' };
    });
    setActiveIndex(index.current);
  };

  useEffect(() => {
    if (slideWidth > 0) {
      const maxSlidesInnerWidth = Math.floor(screenWidth / slideWidth);
      handleGesture({ ...gestureState }, pages.length);
      moveToSlide(0);

      if (maxSlidesInnerWidth <= slidesToShow) {
        setSlidesToShow(maxSlidesInnerWidth || 1);
      } else if (maxSlidesInnerWidth > slidesToShow) {
        setSlidesToShow(slidesToShow);
      }
    }
  }, [slideWidth, screenWidth]);

  React.useMemo(() => handleGesture(gestureState, pages.length), [
    gestureState,
    pages.length,
  ]);

  return pages.length <= maxPages ? (
    <>
      <div
        style={{
          height: `${pageHeight}px`,
          overflow: 'hidden',
          position: 'relative',
        }}
        className="carousel"
      >
        {springProps.map(({ x, display, sc }, i) => (
          <animated.div
            {...bind()}
            key={`${i}`}
            style={{
              display,
              transform: x.interpolate(x => `translate3d(${x}px,0,0)`),
            }}
            className="carousel__animated"
          >
            <animated.div
              style={{
                transform: sc.interpolate(s => `scale(${s})`),
              }}
              className="carousel__animated-slide"
            >
              <Page
                setHeight={setPageHeight}
                registerMaxSlideWidth={setSlideWidth}
              >
                {pages[i]}
              </Page>
            </animated.div>
          </animated.div>
        ))}
      </div>
      <div className="carousel__controls">
        {pages.map((p, i) => (
          <button
            className="carousel__controls-button"
            name={`slide ${i + 1}`}
            aria-label={`slide ${i + 1}`}
            key={i}
            style={{
              background: `${activeIndex !== i ? '#dcdbdc' : '#11ae82'}`,
            }}
            onClick={() => moveToSlide(i)}
          />
        ))}
      </div>
    </>
  ) : (
    <CardBanner>{children}</CardBanner>
  );
}
Carousel.propTypes = {
  children: Proptypes.node,
  slidesToShow: Proptypes.number,
  maxPages: Proptypes.number,
};

export default Carousel;
