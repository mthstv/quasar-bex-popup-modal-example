// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasarcount++-cli/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers';

const iframe = document.createElement('iframe');
iframe.setAttribute('id', 'modal');
iframe.width = '100vw';
iframe.height = '0px';

Object.assign(iframe.style, {
  position: 'fixed',
  border: 'none',
  zIndex: '10000',
  overflow: 'hidden',
  width: '100vw',
  height: '0px',
});

// load that specific page
iframe.src = chrome.runtime.getURL('www/index.html#/modal');

;(function () {
  // When the page loads, insert our browser extension app.
  document.body.prepend(iframe)
})()

const setIFrameHeight = (height: string) => {
  iframe.height = height

  Object.assign(iframe.style, {
    height: height,
  });
}

export default bexContent((bridge) => {
  // Hook into the bridge to listen for events sent from the client BEX.
  bridge.on('handle.modal', ({data: event}) => {
    console.log('reached content script');
    console.log('data: ', event.data);

    if (event.data.open) {
      setIFrameHeight('100vh');
    } else {
      setIFrameHeight('0');
    }
    bridge.send(event.eventResponseKey)
  })
});
