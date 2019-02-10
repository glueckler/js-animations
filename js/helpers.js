function zQ(selector) {
  return document.querySelector(selector);
}
function zQA(selector) {
  return document.querySelectorAll(selector);
}

function zBindEvent(el, eventName, eventHandler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, eventHandler, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + eventName, eventHandler);
  }
}

window.applyStyles = (el, styles = {}) => {
  Object.keys(styles).forEach(style => {
    el.style[style] = styles[style];
  });
};
