'use strict';

var _sidebar = require('./sidebar.js');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _javascripts = require('algolia-frontend-components/javascripts');

var algolia = _interopRequireWildcard(_javascripts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  var header = new algolia.communityHeader();
});

var container = document.querySelector('.documentation-container');
var sidebarContainer = document.querySelector('.sidebar');

if (container && _sidebar2.default) {
  (0, _sidebar2.default)({
    headersContainer: container,
    sidebarContainer: sidebarContainer,
    headerStartLevel: 2
  });
}