import curlirize from 'axios-curlirize';

var common  = {};

// shows curl of the http request
// use only for debugging
function showAxiosCurl(axios) {
  // a safety lock, in case someone forgets to stop using this on the release build
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  curlirize(axios);

  console.info("your network requests are getting logged to terminal..")
  console.warn("DO NOT use the `showAxiosCurl` method in the release build.")
}

function undefinedOrNull(x) {
  return x === null || x === undefined;
}

function prettyConsole(text = 'LOG', entity = '') {
  const postFix = typeof entity === 'object' && entity !== null
    ? JSON.stringify(entity, null, 2)
    : entity;

  console.log(`${text} ${(!undefinedOrNull(postFix) & postFix !== '') ? '==> ' + postFix : ''}\n\n`);
};



common.prettyConsole = prettyConsole;
common.undefinedOrNull = undefinedOrNull;
common.showAxiosCurl = showAxiosCurl;


export {common};