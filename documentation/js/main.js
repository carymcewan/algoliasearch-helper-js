'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray2(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******/(function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};

	/******/ // The require function
	/******/function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/exports: {},
			/******/id: moduleId,
			/******/loaded: false
			/******/ };

		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/module.loaded = true;

		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}

	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/return __webpack_require__(0);
	/******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	'use strict';

	var _sidebar = __webpack_require__(1);

	var _sidebar2 = _interopRequireDefault(_sidebar);

	var _javascripts = __webpack_require__(2);

	var algolia = _interopRequireWildcard(_javascripts);

	function _interopRequireWildcard(obj) {
		if (obj && obj.__esModule) {
			return obj;
		} else {
			var newObj = {};if (obj != null) {
				for (var key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
				}
			}newObj.default = obj;return newObj;
		}
	}

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

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

	/***/
},
/* 1 */
/***/function (module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = sidebar;

	function _toConsumableArray(arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
				arr2[i] = arr[i];
			}return arr2;
		} else {
			return Array.from(arr);
		}
	}

	function sidebar(options) {
		var headersContainer = options.headersContainer,
		    sidebarContainer = options.sidebarContainer,
		    headerStartLevel = options.headerStartLevel;

		listenToChanges(options);

		var headers = headersContainer.querySelectorAll('h2, h3');
		//const select = document.createElement('select');
		var list = document.createElement('ul');
		var startLevel = headerStartLevel; // we start at h2
		list.classList.add('no-mobile');
		var currentList = list;
		var currentLevel = startLevel;

		//select.addEventListener('change', e => window.location = e.target.value);
		sidebarContainer.appendChild(list);
		//sidebarContainer.appendChild(select);
		sidebarFollowScroll(sidebarContainer.firstChild);
		activeLinks(sidebarContainer);
		scrollSpy(sidebarContainer, headersContainer);
	}

	function listenToChanges(originalParameters) {
		var headersContainer = originalParameters.headersContainer,
		    sidebarContainer = originalParameters.sidebarContainer,
		    headerStartLevel = originalParameters.headerStartLevel;
	}

	function sidebarFollowScroll(sidebarContainer) {
		var _getPositionsKeyEleme = getPositionsKeyElements(sidebarContainer),
		    height = _getPositionsKeyEleme.height,
		    navHeight = _getPositionsKeyEleme.navHeight,
		    footerHeight = _getPositionsKeyEleme.footerHeight,
		    menuHeight = _getPositionsKeyEleme.menuHeight,
		    sidebarTop = _getPositionsKeyEleme.sidebarTop;

		var positionSidebar = function positionSidebar() {

			var currentScroll = window.pageYOffset;
			if (currentScroll > sidebarTop - navHeight) {
				var fold = height - footerHeight - menuHeight - 50;
				if (currentScroll > fold) {
					sidebarContainer.style.top = fold - currentScroll + navHeight + 'px';
				} else {
					sidebarContainer.style.top = null;
				}
				sidebarContainer.classList.add('fixed');
			} else {
				sidebarContainer.classList.remove('fixed');
			}
		};

		window.addEventListener('load', positionSidebar);
		document.addEventListener('DOMContentLoaded', positionSidebar);
		document.addEventListener('scroll', positionSidebar);
	}

	function scrollSpy(sidebarContainer, headersContainer) {
		var headers = [].concat(_toConsumableArray(headersContainer.querySelectorAll('h2, h3')));

		var setActiveSidebarLink = function setActiveSidebarLink(header) {
			[].concat(_toConsumableArray(sidebarContainer.querySelectorAll('a'))).forEach(function (item) {
				if (item.getAttribute('href').slice(1) === header.getAttribute('id')) {
					item.classList.add('active');
				} else {
					item.classList.remove('active');
				}
			});
		};

		var findActiveSidebarLink = function findActiveSidebarLink() {
			var highestVisibleHeaders = headers.map(function (header) {
				return { element: header, rect: header.getBoundingClientRect() };
			}).filter(function (_ref) {
				var rect = _ref.rect;

				// top element relative viewport position should be at least 1/3 viewport
				// and element should be in viewport
				return rect.top < window.innerHeight / 3 && rect.bottom < window.innerHeight;
			})
			// then we take the closest to this position as reference
			.sort(function (header1, header2) {
				return Math.abs(header1.rect.top) < Math.abs(header2.rect.top) ? -1 : 1;
			});

			if (highestVisibleHeaders.length === 0) {
				setActiveSidebarLink(headers[0]);
				return;
			}

			setActiveSidebarLink(highestVisibleHeaders[0].element);
		};

		findActiveSidebarLink();
		window.addEventListener('load', findActiveSidebarLink);
		document.addEventListener('DOMContentLoaded', findActiveSidebarLink);
		document.addEventListener('scroll', findActiveSidebarLink);
	}

	// The Following code is used to set active items
	// On the documentation sidebar depending on the
	// clicked item
	function activeLinks(sidebarContainer) {
		var linksContainer = sidebarContainer.querySelector('ul');

		linksContainer.addEventListener('click', function (e) {
			if (e.target.tagName === 'A') {
				[].concat(_toConsumableArray(linksContainer.querySelectorAll('a'))).forEach(function (item) {
					return item.classList.remove('active');
				});
				e.target.classList.add('active');
			}
		});
	}

	function getPositionsKeyElements(sidebar) {
		var sidebarBBox = sidebar.getBoundingClientRect();
		var bodyBBox = document.body.getBoundingClientRect();
		var sidebarTop = sidebarBBox.top - bodyBBox.top;
		var footer = document.querySelector('.ac-footer');
		var navigation = document.querySelector('.ac-nav');
		var menu = document.querySelector('.sidebar > ul');
		var height = document.querySelector('html').getBoundingClientRect().height;
		var navHeight = navigation.offsetHeight;
		var footerHeight = footer.offsetHeight;
		var menuHeight = menu.offsetHeight;

		return { sidebarTop: sidebarTop, height: height, navHeight: navHeight, footerHeight: footerHeight, menuHeight: menuHeight };
	}

	/***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

	var javascripts = {
		communityHeader: __webpack_require__(3)
	};

	module.exports = javascripts;

	/***/
},
/* 3 */
/***/function (module, exports) {

	/**
  * Main header function with docsearch
  * @param  {Object} docSearch config
  */

	var communityHeader = function () {
		function communityHeader(docSearchCredentials, docSearch) {
			var _this = this;

			_classCallCheck(this, communityHeader);

			this.docSearchCredentials = docSearchCredentials;
			this.docSearch = docSearch || null;

			this.menuState = {
				isOpen: false,
				isOpenMobile: false
			};

			this.INIT_VAL = {
				WIDTH: 490,
				HEIGHT: 360
			};

			this.disableTransitionTimeout;

			this.searchIcon = document.querySelector('#search');
			this.cancelIcon = document.querySelector('#cancel');
			this.searchInputContainer = document.querySelector('.algc-search__input');
			this.searchContainer = this.searchInputContainer ? this.searchInputContainer.parentNode : null;
			this.navRoot = document.querySelector('.algc-dropdownroot');
			this.dropdownRoot = document.querySelector('.algc-navigation__dropdown-holder');
			this.navItems = document.querySelectorAll('a[data-enabledropdown="true"]');
			this.navContainer = document.querySelector('.algc-dropdownroot__dropdowncontainer');
			this.menuContainer = document.querySelector('.algc-navigation__container');
			this.navBg = document.querySelector('.algc-dropdownroot__dropdownbg');
			this.navArrow = document.querySelector('.algc-dropdownroot__dropdownarrow');
			this.dropDownContainer = document.querySelector('.algc-dropdownroot__dropdowncontainer');
			this.menuTriggers = document.querySelectorAll('[data-enabledropdown="true"]');
			this.mobileMenuButton = document.querySelector('.algc-openmobile ');
			this.mobileMenu = document.querySelector('.algc-mobilemenu');
			this.subList = document.querySelectorAll('.algc-menu--sublistlink');
			this.subListHolders = [].concat(_toConsumableArray2(this.subList)).map(function (node) {
				return node.parentNode;
			});
			this.menuDropdowns = {};

			[].forEach.call(document.querySelectorAll('[data-dropdown-content]'), function (item) {
				_this.menuDropdowns[item.dataset.dropdownContent] = {
					parent: item.parentNode,
					content: item
				};
			});

			this.shouldInitDocSearch = this.shouldInitDocSearch.bind(this);
			this.docSearchInit = this.checkDocSearch(docSearch);
			this.enableDocSearch = this.verifyDocSearchParams(docSearchCredentials);
			this.hasDocSearchRendered = document.querySelector('.algc-navigation .algc-search__input--docsearch');
			this.triggerMenu = this.triggerMenu.bind(this);
			this.shouldTriggerMenu = this.shouldTriggerMenu.bind(this);
			this.closeMenu = this.closeMenu.bind(this);
			this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
			this.docSearchToggling = this.docSearchToggling.bind(this);
			this.initDocSearchStrategy = this.initDocSearchStrategy.bind(this);
			this.openSublist = this.openSublist.bind(this);
			this.closeSubLists = this.closeSubLists.bind(this);
			this.bindListeners = this.bindListeners.bind(this);

			this.calculatePosition = this.calculatePosition.bind(this);

			this.verifyDocSearchParams();
			this.shouldInitDocSearch();
			this.initDocSearchStrategy();
			this.bindListeners();
		}

		_createClass(communityHeader, [{
			key: 'calculatePosition',
			value: function calculatePosition(sourceNode) {
				var box = sourceNode.getBoundingClientRect();
				var realWidth = sourceNode.offsetWidth;
				var realHeight = sourceNode.offsetHeight;

				return {
					left: box.left,
					top: box.top,
					width: box.width,
					height: box.height,
					realWidth: realWidth,
					realHeight: realHeight,
					center: box.left + box.width / 2
				};
			}
		}, {
			key: 'shouldInitDocSearch',
			value: function shouldInitDocSearch() {
				if (!this.enableDocSearch && this.hasDocSearchRendered) {
					throw new Error('You need to pass docSearch: { apiKey, indexName, inputSelector } to communityHeader function in order to initialise docSearch');
				}
			}
		}, {
			key: 'checkDocSearch',
			value: function checkDocSearch() {
				var docSearch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (docSearch) return docSearch;

				if (typeof window.docsearch === "function" || typeof docsearch === "function") {
					return docsearch;
				}
			}
		}, {
			key: 'verifyDocSearchParams',
			value: function verifyDocSearchParams(docSearchCredentials) {
				return docSearchCredentials && docSearchCredentials.apiKey && docSearchCredentials.indexName && docSearchCredentials.inputSelector ? true : false;
			}
		}, {
			key: 'triggerMenu',
			value: function triggerMenu(event) {
				var _this2 = this;

				var dropdown = event.target.dataset.dropdown;
				var newTarget = this.menuDropdowns[dropdown].content;
				var newContent = this.menuDropdowns[dropdown].parent;

				var navItem = this.calculatePosition(event.target);
				var newTargetCoordinates = this.calculatePosition(newTarget);
				var menuContainerOffset = this.calculatePosition(this.menuContainer);
				var leftDistance = void 0;

				var scaleFactors = {
					X: newTargetCoordinates.realWidth / this.INIT_VAL.WIDTH,
					Y: newTargetCoordinates.realHeight / this.INIT_VAL.HEIGHT
				};

				leftDistance = navItem.center - menuContainerOffset.left + "px";

				if (menuContainerOffset.left < 20) {
					leftDistance = "calc(50% - 36px)";
				}

				this.navBg.style.cssText = '\n\t      transform: translateX(' + leftDistance + ') scale(' + scaleFactors.X + ', ' + scaleFactors.Y + ')';

				this.navArrow.style.cssText = '\n\t      transform: translateX(' + leftDistance + ') rotate(45deg)';

				this.dropDownContainer.style.cssText = '\n\t      transform: translateX(' + leftDistance + ');\n\t      width: ' + newTargetCoordinates.realWidth + 'px;\n\t      height: ' + (newTargetCoordinates.realHeight + 10) + 'px;';

				this.dropdownRoot.style.pointerEvents = "auto";

				Object.keys(this.menuDropdowns).forEach(function (key) {
					if (key === dropdown) {
						_this2.menuDropdowns[key].parent.classList.add('active');
					} else {
						_this2.menuDropdowns[key].parent.classList.remove('active');
					}
				});

				if (!this.menuState.isOpen) {
					setTimeout(function () {
						_this2.navRoot.className = "algc-dropdownroot activeDropdown";
					}, 50);
				}

				window.clearTimeout(this.disableTransitionTimeout);
				this.menuState.isOpen = true;
			}
		}, {
			key: 'shouldTriggerMenu',
			value: function shouldTriggerMenu(event) {
				var _this3 = this;

				if (this.menuState.isOpen) {
					this.triggerMenu(event);
				} else {
					this.triggerMenuTimeout = setTimeout(function () {
						_this3.triggerMenu(event);
					}, 200);
				}
			}
		}, {
			key: 'closeMenu',
			value: function closeMenu(event) {
				var _this4 = this;

				window.clearTimeout(this.triggerMenuTimeout);
				this.menuState.isOpen = false;
				this.disableTransitionTimeout = setTimeout(function () {
					_this4.dropdownRoot.style.pointerEvents = "none";
					_this4.navRoot.className = "algc-dropdownroot notransition";
				}, 50);
			}
		}, {
			key: 'toggleMobileMenu',
			value: function toggleMobileMenu(event) {
				this.mobileMenuButton.classList.toggle('algc-openmobile--open');
				this.mobileMenu.classList.toggle('algc-mobilemenu--open');
			}

			// Search

		}, {
			key: 'docSearchToggling',
			value: function docSearchToggling() {
				var _this5 = this;

				this.searchInput = document.querySelector(this.docSearchCredentials.inputSelector);
				var openSearchInput = function openSearchInput() {
					_this5.searchContainer.classList.add('open');
					_this5.searchInput.focus();
				};

				var closeSearchInput = function closeSearchInput() {
					_this5.searchInput.blur();
					_this5.searchContainer.classList.remove('open');
				};

				var emptySearchInput = function emptySearchInput() {
					if (_this5.searchInput.value !== '') {
						_this5.searchInput.value = '';
					} else {
						closeSearchInput();
					}
				};
				this.searchInput.setAttribute('value', '');
				this.searchIcon.addEventListener('click', openSearchInput);
				this.cancelIcon.addEventListener('click', emptySearchInput);
			}
		}, {
			key: 'initDocSearch',
			value: function initDocSearch() {
				this.docSearchToggling();
				this.docSearchInit(this.docSearchCredentials);
			}
		}, {
			key: 'initDocSearchStrategy',
			value: function initDocSearchStrategy() {
				var _this6 = this;

				if (this.enableDocSearch && typeof this.docSearchInit === "function") {
					this.initDocSearch();
				} else if (this.docSearch === "lazy") {

					var docSearchScript = document.createElement('script');
					docSearchScript.type = 'text/javascript';
					docSearchScript.async = true;
					document.body.appendChild(docSearchScript);

					docSearchScript.onload = function () {
						_this6.docSearchInit = docsearch;
						_this6.initDocSearch();
					};

					docSearchScript.src = "https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js";
				}
			}
		}, {
			key: 'openSublist',
			value: function openSublist(node) {
				var parent = node.parentNode;
				this.subListHolders.forEach(function (holder) {
					if (holder === parent && !parent.classList.contains('open')) {
						holder.classList.add('open');
					} else {
						holder.classList.remove('open');
					}
				});
			}
		}, {
			key: 'closeSubLists',
			value: function closeSubLists(event) {
				this.subListHolders.forEach(function (holder) {
					return holder.classList.remove('open');
				});
			}
		}, {
			key: 'bindListeners',
			value: function bindListeners() {
				var _this7 = this;

				var that = this;
				this.subList.forEach(function (link) {
					link.addEventListener('click', function (event) {
						event.preventDefault();
						event.stopPropagation();
						that.openSublist(this);
					});
				});

				this.menuTriggers.forEach(function (item) {
					item.addEventListener('mouseenter', _this7.shouldTriggerMenu);
					item.addEventListener('focus', _this7.triggerMenu);
				});

				this.navItems.forEach(function (item) {
					item.addEventListener('mouseleave', _this7.closeMenu);
				});

				this.navContainer.addEventListener('mouseenter', function () {
					clearTimeout(_this7.disableTransitionTimeout);
				});

				this.mobileMenuButton.addEventListener('click', this.toggleMobileMenu);
				document.addEventListener('click', this.closeSubLists);
				document.querySelector('.algc-dropdownroot__dropdowncontainer').addEventListener('mouseleave', this.closeMenu);
			}
		}]);

		return communityHeader;
	}();

	module.exports = communityHeader;

	/***/
}]
/******/);