const { document, navigator } = window;

const MIRROR_SELECTOR = '.mirror';

const mirror = {
  mirror: document.querySelector(MIRROR_SELECTOR),
  video: document.querySelector(`${MIRROR_SELECTOR} > video`),
  init: function initMirror() {
    if (!navigator.mediaDevices.getUserMedia) { return false; }
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.video.srcObject = stream;
        this.mirror.classList.add('open');
      })
      .catch(() => {
        console.error('Something went wrong!'); // eslint-disable-line no-console
      });
    return true;
  },
};

mirror.init();
