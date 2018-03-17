'use strict';

var defaultIp = 'Find it on https://api.ipify.org';
var defaultCoords = 'Find it on https://jsfiddle.net/qmjet97b/';
var link = document.querySelector('#support-google-form');
var getFormURL = function getFormURL(ip, coords) {
  return 'https://docs.google.com/forms/d/13r_7B72v6u6326atqzKZpv0fs_3OUOJFR-6QDipHl3Y/viewform?entry.1560244398&entry.1894094686&entry.1809496416&entry.2029760924&entry.1442423869&entry.1714224469&entry.1070945708=' + encodeURIComponent(ip) + '&entry.2019626860=' + encodeURIComponent(coords);
};
link.setAttribute('href', getFormURL(defaultIp, defaultCoords));
link.addEventListener('click', function (clickEvent) {
  clickEvent.preventDefault();
  try {
    navigator.geolocation.getCurrentPosition(function (_ref) {
      var coords = _ref.coords;
      return (// success
        window.location.href = getFormURL(window.userip ? window.userip + ' (detected)' : defaultIp, coords.latitude + ',' + coords.longitude + '  (detected)')
      );
    }, function () {
      return window.location.href = clickEvent.target.href;
    } // error
    );
  } catch (geoNotAvailable) {
    window.location.href = clickEvent.target.href;
  }
});