// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasarcount++-cli/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers';

function createIframe() {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('id', 'modal');
  iframe.width = '100vw';
  iframe.height = '100vh';

  Object.assign(iframe.style, {
    position: 'fixed',
    border: 'none',
    zIndex: '10000',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
  });

  // load that specific page
  iframe.src = chrome.runtime.getURL('www/index.html#/modal');

  return iframe;
}

function destroyIframe() {
  const iframe = document.getElementById('modal');
  if (iframe) {
    iframe.remove();
  }
}

export default bexContent((bridge) => {
  // Hook into the bridge to listen for events sent from the client BEX.
  bridge.on('handle.modal', ({data, respond}) => {
    console.log('reached content script');
    console.log('data: ', data.data);

    if (data.data.showModal) {
      document.body.prepend(createIframe());
      respond();
    } else {
      destroyIframe();
      respond();
    }
  })
});
