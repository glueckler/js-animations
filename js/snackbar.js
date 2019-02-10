const w = window;

const snackbar = w.zQ('.snackbar');

const getSnackHeight = () => snackbar.getBoundingClientRect().width

function setBottom() {
  w.applyStyles(snackbar, {
    bottom: `-${getSnackHeight()}px`,
  });
}

setBottom();

const raiseSnack = anime({
  targets: '.snackbar',
  duration: 1100,
  translateY: [
    { value: `-=${getSnackHeight()}px` },
    { value: `+=${getSnackHeight()}px`, delay: 1500, },
  ],
  easing: 'easeInOutBack',
});

const innerTexts = [
  'i love you too',
  'the answer is: 42',
  'The Beatles - Come Together',
  'You Look good today',
  'What\'s cookin\'',
];

const ranArrElement = array => {
  if ((array || []).length === 0) {
    return;
  }
  return array[Math.trunc(Math.random() * array.length)];
};

setInterval(() => {
  snackbar.innerText = ranArrElement(innerTexts);
  setBottom();
  raiseSnack.restart();
  raiseSnack.play();
}, 3000);



