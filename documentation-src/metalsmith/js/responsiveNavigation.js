'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = responsiveNavigation;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* global currentPath */
// currentPath is computed by Middleman, inlined in layout.erb and contains
// the source file name of the current page (index.html, documentation.html)

function responsiveNavigation() {
  var navigation = document.querySelector('.ac-nav');
  var links = navigation.querySelectorAll('a');
  var navigationAsSelect = document.createElement('select');

  if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
    navigationAsSelect.classList.add('display-on-small', 'device');
  } else {
    navigationAsSelect.classList.add('display-on-small');
  }

  [].concat(_toConsumableArray(links)).forEach(function (link) {
    var option = document.createElement('option');
    option.text = link.title;
    option.value = link.href;
    if (link.dataset.path === currentPath) {
      option.selected = true;
    }
    navigationAsSelect.appendChild(option);
  });

  navigation.appendChild(navigationAsSelect);
  navigationAsSelect.addEventListener('change', function (e) {
    return window.location = e.target.value;
  });
}