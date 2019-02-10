const loginForm = zQ('.login-form');

const MAX_VALUE = 8;

const loginFailAnim = anime.timeline({
  targets: '.login-form',
});

const ERR_COLOR = 'rgba(224, 130, 131, 1)';

loginFailAnim
  .add({
    translateX: [
      { value: `${MAX_VALUE}` },
      { value: `${-MAX_VALUE}` },
      { value: `${MAX_VALUE / 2}` },
      { value: `${-MAX_VALUE / 2}` },
      { value: `${0}` },
    ],
    duration: 550,
    easing: 'easeInOutSine',
    autoplay: false,
  });

setInterval(() => {
  loginFailAnim.restart();
  loginFailAnim.play();
}, 2500);