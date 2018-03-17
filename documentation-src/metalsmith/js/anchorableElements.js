'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = anchorableElements;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function anchorableElements(elements) {
  [].concat(_toConsumableArray(elements)).forEach(function (element) {
    // duplicate id in name to benefit from css :target
    element.setAttribute('name', element.getAttribute('id'));
    var anchor = document.createElement('a');
    anchor.setAttribute('href', '#' + element.id);
    anchor.classList.add('anchor');
    anchor.textContent = '#';
    element.appendChild(anchor);
  });
}