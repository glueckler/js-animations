let isAnimating = false;
let farOffsetLeftL;
let farOffsetLeftR;

window.addEventListener('load', () => {
  // apply initial styles to carousel
  const animContainer = zQ('#animation-container');
  const {
    clientWidth: animContWidth,
    clientHeight: animContHeight,
  } = animContainer;
  const animFrames = zQA('.anim-frame');
  // style each anim frame
  animFrames.forEach((animFrame, index, arr) => {
    const length = arr.length;
    const right = index * animContWidth + animContWidth;
    const left = index * animContWidth;
    
    const applyStyles = {
      width: animContWidth,
      position: 'absolute',
      top: '0px',
      right: `${right}px`,
      bottom: '0px',
      left: `${left}px`,
    };

    // the last element begins on the left
    if (index === length - 1) {
      applyStyles.left = `-${animContWidth}px`;
      applyStyles.right = '0px';

      farOffsetLeftL = -animContWidth;
      farOffsetLeftR = animContWidth * (length - 2);
    }

    Object.keys(applyStyles).forEach(styleProp => {
      animFrame.style[styleProp] = applyStyles[styleProp];
    });
  });

  // there will always be one element that needs to move
  // it's either on the far left or the far right
  // find it and replace it
  const repositionFrames = () => {
    animFrames.forEach(frame => {
      const { offsetLeft } = frame;
      // reset element to far right if it's two positions left
      if (offsetLeft < farOffsetLeftL) {
        frame.style.left = `${farOffsetLeftR}px`;
        frame.style.right = `${farOffsetLeftR + animContWidth}px`;
      }
      // reset el left if it's far right
      if (offsetLeft > farOffsetLeftR) {
        frame.style.left = `${farOffsetLeftL}px`;
        frame.style.right = '0px';
      }
    });
  };

  const animeOptions = {
    targets: '.anim-frame',
    duration: 200,
    easing: 'easeInOutExpo',
    begin() {
      isAnimating = true;
    },
    complete() {
      isAnimating = false;
      repositionFrames();
    },
  };
  
  const animeR = () => window.anime({
    ...animeOptions,
    left: `-=${animContWidth}`,
    right: `-=${animContWidth}`,
  });

  const animeL = () => window.anime({
    ...animeOptions,
    left: `+=${animContWidth}`,
    right: `+=${animContWidth}`,
  });

  const createEventFn = direction => () => {
    if (isAnimating) return null;
    if (direction === 'left') {
      animeL();
    }
    if (direction === 'right') {
      animeR();
    }
  };
  
  // add event listeners to chevrons
  zBindEvent(zQ('.anim-chev__right'), 'click', createEventFn('right'));
  zBindEvent(zQ('.anim-chev__left'), 'click', createEventFn('left'));


});