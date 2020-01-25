'use strict';

import * as Fingerprint2 from 'fingerprintjs2';
import Promise from 'bluebird';

export function getFingerprint() {
  const options = {
    excludes: {
      plugins: true,
      localStorage: true,
      adBlock: true,
      screenResolution: true,
      availableScreenResolution: true,
      enumerateDevices: true,
      pixelRatio: true,
      doNotTrack: true
    }
  };

  return Fingerprint2.getPromise(options)
    .then(items => {
      const values = items.map(component => component.value);

      return String(Fingerprint2.x64hash128(values.join(''), 31));   //?
    })
}
