/**/$.fn.isVisible = function(offset) {
	// Am I visible?
	// Height and Width are not explicitly necessary in visibility detection, the bottom, right, top and left are the
	// essential checks. If an image is 0x0, it is technically not visible, so it should not be marked as such.
	// That is why either width or height have to be > 0.
	var rect = this[0].getBoundingClientRect();
	return (
		(rect.height > 0 || rect.width > 0) &&
		rect.bottom >= 0 &&
		rect.right >= 0 &&
		rect.top <= (window.innerHeight - offset || document.documentElement.clientHeight - offset) &&
		rect.left <= (window.innerWidth - offset || document.documentElement.clientWidth - offset)
	);
};

$.fn.timelify = function(options){

	var settings = $.extend({
		animLeft: "bounceInLeft",
		animRight: "bounceInRight",
		animCenter: "bounceInUp",
		animSpeed: 300,
		offset: 150
	}, options);

	var elem = this;

	var timeline_items = $(this).find('.timeline-items li');

	window.addEventListener('scroll', function(){
		var scrollPos = $(window).scrollTop();
		if($('.timeline-items li.is-hidden').length > 0){
			if(scrollPos > $(elem).offset().top - 600){
				$(timeline_items).each(function () {

					if ($(this).isVisible(settings.offset)) {
						$(this).removeClass('is-hidden').addClass('animated').css({"animation-duration": settings.animSpeed + "ms"});
						if (!$(this).hasClass('inverted')) {
							if ($(this).hasClass('centered')) {
								$(this).addClass(settings.animCenter)
							} else {
								$(this).addClass(settings.animLeft)
							}
						} else {

							$(this).addClass(settings.animRight)

						}
					}
				});
			}
		}


	});

	return this;
};
/*!
 * SlickNav Responsive Mobile Menu v1.0.7
 * (c) 2016 Josh Cope
 * licensed under MIT
 */
!function(e,n,t){function a(n,t){this.element=n,this.settings=e.extend({},i,t),this.settings.duplicate||t.hasOwnProperty("removeIds")||(this.settings.removeIds=!1),this._defaults=i,this._name=s,this.init()}var i={label:"MENU",duplicate:!0,duration:200,easingOpen:"swing",easingClose:"swing",closedSymbol:"&#9658;",openedSymbol:"&#9660;",prependTo:"body",appendTo:"",parentTag:"a",closeOnClick:!1,allowParentLinks:!1,nestedParentLinks:!0,showChildren:!1,removeIds:!0,removeClasses:!1,removeStyles:!1,brand:"",init:function(){},beforeOpen:function(){},beforeClose:function(){},afterOpen:function(){},afterClose:function(){}},s="slicknav",l="slicknav";a.prototype.init=function(){var t,a,i=this,s=e(this.element),o=this.settings;if(o.duplicate?i.mobileNav=s.clone():i.mobileNav=s,o.removeIds&&(i.mobileNav.removeAttr("id"),i.mobileNav.find("*").each(function(n,t){e(t).removeAttr("id")})),o.removeClasses&&(i.mobileNav.removeAttr("class"),i.mobileNav.find("*").each(function(n,t){e(t).removeAttr("class")})),o.removeStyles&&(i.mobileNav.removeAttr("style"),i.mobileNav.find("*").each(function(n,t){e(t).removeAttr("style")})),t=l+"_icon",""===o.label&&(t+=" "+l+"_no-text"),"a"==o.parentTag&&(o.parentTag='a href="#"'),i.mobileNav.attr("class",l+"_nav"),a=e('<div class="'+l+'_menu"></div>'),""!==o.brand){var r=e('<div class="'+l+'_brand">'+o.brand+"</div>");e(a).append(r)}i.btn=e(["<"+o.parentTag+' aria-haspopup="true" tabindex="0" class="'+l+"_btn "+l+'_collapsed">','<span class="'+l+'_menutxt">'+o.label+"</span>",'<span class="'+t+'">','<span class="'+l+'_icon-bar"></span>','<span class="'+l+'_icon-bar"></span>','<span class="'+l+'_icon-bar"></span>',"</span>","</"+o.parentTag+">"].join("")),e(a).append(i.btn),""!==o.appendTo?e(o.appendTo).append(a):e(o.prependTo).prepend(a),a.append(i.mobileNav);var d=i.mobileNav.find("li");e(d).each(function(){var n=e(this),t={};if(t.children=n.children("ul").attr("role","menu"),n.data("menu",t),t.children.length>0){var a=n.contents(),s=!1,r=[];e(a).each(function(){return e(this).is("ul")?!1:(r.push(this),void(e(this).is("a")&&(s=!0)))});var d=e("<"+o.parentTag+' role="menuitem" aria-haspopup="true" tabindex="-1" class="'+l+'_item"/>');if(o.allowParentLinks&&!o.nestedParentLinks&&s)e(r).wrapAll('<span class="'+l+"_parent-link "+l+'_row"/>').parent();else{var p=e(r).wrapAll(d).parent();p.addClass(l+"_row")}o.showChildren?n.addClass(l+"_open"):n.addClass(l+"_collapsed"),n.addClass(l+"_parent");var c=e('<span class="'+l+'_arrow">'+(o.showChildren?o.openedSymbol:o.closedSymbol)+"</span>");o.allowParentLinks&&!o.nestedParentLinks&&s&&(c=c.wrap(d).parent()),e(r).last().after(c)}else 0===n.children().length&&n.addClass(l+"_txtnode");n.children("a").attr("role","menuitem").click(function(n){o.closeOnClick&&!e(n.target).parent().closest("li").hasClass(l+"_parent")&&e(i.btn).click()}),o.closeOnClick&&o.allowParentLinks&&(n.children("a").children("a").click(function(n){e(i.btn).click()}),n.find("."+l+"_parent-link a:not(."+l+"_item)").click(function(n){e(i.btn).click()}))}),e(d).each(function(){var n=e(this).data("menu");o.showChildren||i._visibilityToggle(n.children,null,!1,null,!0)}),i._visibilityToggle(i.mobileNav,null,!1,"init",!0),i.mobileNav.attr("role","menu"),e(n).mousedown(function(){i._outlines(!1)}),e(n).keyup(function(){i._outlines(!0)}),e(i.btn).click(function(e){e.preventDefault(),i._menuToggle()}),i.mobileNav.on("click","."+l+"_item",function(n){n.preventDefault(),i._itemClick(e(this))}),e(i.btn).keydown(function(e){var n=e||event;13==n.keyCode&&(e.preventDefault(),i._menuToggle())}),i.mobileNav.on("keydown","."+l+"_item",function(n){var t=n||event;13==t.keyCode&&(n.preventDefault(),i._itemClick(e(n.target)))}),o.allowParentLinks&&o.nestedParentLinks&&e("."+l+"_item a").click(function(e){e.stopImmediatePropagation()})},a.prototype._menuToggle=function(e){var n=this,t=n.btn,a=n.mobileNav;t.hasClass(l+"_collapsed")?(t.removeClass(l+"_collapsed"),t.addClass(l+"_open")):(t.removeClass(l+"_open"),t.addClass(l+"_collapsed")),t.addClass(l+"_animating"),n._visibilityToggle(a,t.parent(),!0,t)},a.prototype._itemClick=function(e){var n=this,t=n.settings,a=e.data("menu");a||(a={},a.arrow=e.children("."+l+"_arrow"),a.ul=e.next("ul"),a.parent=e.parent(),a.parent.hasClass(l+"_parent-link")&&(a.parent=e.parent().parent(),a.ul=e.parent().next("ul")),e.data("menu",a)),a.parent.hasClass(l+"_collapsed")?(a.arrow.html(t.openedSymbol),a.parent.removeClass(l+"_collapsed"),a.parent.addClass(l+"_open"),a.parent.addClass(l+"_animating"),n._visibilityToggle(a.ul,a.parent,!0,e)):(a.arrow.html(t.closedSymbol),a.parent.addClass(l+"_collapsed"),a.parent.removeClass(l+"_open"),a.parent.addClass(l+"_animating"),n._visibilityToggle(a.ul,a.parent,!0,e))},a.prototype._visibilityToggle=function(n,t,a,i,s){var o=this,r=o.settings,d=o._getActionItems(n),p=0;a&&(p=r.duration),n.hasClass(l+"_hidden")?(n.removeClass(l+"_hidden"),s||r.beforeOpen(i),n.slideDown(p,r.easingOpen,function(){e(i).removeClass(l+"_animating"),e(t).removeClass(l+"_animating"),s||r.afterOpen(i)}),n.attr("aria-hidden","false"),d.attr("tabindex","0"),o._setVisAttr(n,!1)):(n.addClass(l+"_hidden"),s||r.beforeClose(i),n.slideUp(p,this.settings.easingClose,function(){n.attr("aria-hidden","true"),d.attr("tabindex","-1"),o._setVisAttr(n,!0),n.hide(),e(i).removeClass(l+"_animating"),e(t).removeClass(l+"_animating"),s?"init"==i&&r.init():r.afterClose(i)}))},a.prototype._setVisAttr=function(n,t){var a=this,i=n.children("li").children("ul").not("."+l+"_hidden");t?i.each(function(){var n=e(this);n.attr("aria-hidden","true");var i=a._getActionItems(n);i.attr("tabindex","-1"),a._setVisAttr(n,t)}):i.each(function(){var n=e(this);n.attr("aria-hidden","false");var i=a._getActionItems(n);i.attr("tabindex","0"),a._setVisAttr(n,t)})},a.prototype._getActionItems=function(e){var n=e.data("menu");if(!n){n={};var t=e.children("li"),a=t.find("a");n.links=a.add(t.find("."+l+"_item")),e.data("menu",n)}return n.links},a.prototype._outlines=function(n){n?e("."+l+"_item, ."+l+"_btn").css("outline",""):e("."+l+"_item, ."+l+"_btn").css("outline","none")},a.prototype.toggle=function(){var e=this;e._menuToggle()},a.prototype.open=function(){var e=this;e.btn.hasClass(l+"_collapsed")&&e._menuToggle()},a.prototype.close=function(){var e=this;e.btn.hasClass(l+"_open")&&e._menuToggle()},e.fn[s]=function(n){var t=arguments;if(void 0===n||"object"==typeof n)return this.each(function(){e.data(this,"plugin_"+s)||e.data(this,"plugin_"+s,new a(this,n))});if("string"==typeof n&&"_"!==n[0]&&"init"!==n){var i;return this.each(function(){var l=e.data(this,"plugin_"+s);l instanceof a&&"function"==typeof l[n]&&(i=l[n].apply(l,Array.prototype.slice.call(t,1)))}),void 0!==i?i:this}}}(jQuery,document,window);
(function(factory) {
  /* global define */
  /* istanbul ignore next */
  if ( typeof define === 'function' && define.amd ) {
    define(['jquery'], factory);
  } else if ( typeof module === 'object' && module.exports ) {
    // Node/CommonJS
    module.exports = function( root, jQuery ) {
      if ( jQuery === undefined ) {
        if ( typeof window !== 'undefined' ) {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
  'use strict';

  var $doc = $(document);
  var $win = $(window);

  var pluginName = 'selectric';
  var classList = 'Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Scroll Group GroupLabel';
  var bindSufix = '.sl';

  var chars = ['a', 'e', 'i', 'o', 'u', 'n', 'c', 'y'];
  var diacritics = [
    /[\xE0-\xE5]/g, // a
    /[\xE8-\xEB]/g, // e
    /[\xEC-\xEF]/g, // i
    /[\xF2-\xF6]/g, // o
    /[\xF9-\xFC]/g, // u
    /[\xF1]/g,      // n
    /[\xE7]/g,      // c
    /[\xFD-\xFF]/g  // y
  ];

  /**
   * Create an instance of Selectric
   *
   * @constructor
   * @param {Node} element - The &lt;select&gt; element
   * @param {object}  opts - Options
   */
  var Selectric = function(element, opts) {
    var _this = this;

    _this.element = element;
    _this.$element = $(element);

    _this.state = {
      enabled     : false,
      opened      : false,
      currValue   : -1,
      selectedIdx : -1
    };

    _this.eventTriggers = {
      open    : _this.open,
      close   : _this.close,
      destroy : _this.destroy,
      refresh : _this.refresh,
      init    : _this.init
    };

    _this.init(opts);
  };

  Selectric.prototype = {
    utils: {
      /**
       * Detect mobile browser
       *
       * @return {boolean}
       */
      isMobile: function() {
        return /android|ip(hone|od|ad)/i.test(navigator.userAgent);
      },

      /**
       * Escape especial characters in string (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
       *
       * @param  {string} str - The string to be escaped
       * @return {string}       The string with the special characters escaped
       */
      escapeRegExp: function(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
      },

      /**
       * Replace diacritics
       *
       * @param  {string} str - The string to replace the diacritics
       * @return {string}       The string with diacritics replaced with ascii characters
       */
      replaceDiacritics: function(str) {
        var k = diacritics.length;

        while (k--) {
          str = str.toLowerCase().replace(diacritics[k], chars[k]);
        }

        return str;
      },

      /**
       * Format string
       * https://gist.github.com/atesgoral/984375
       *
       * @param  {string} f - String to be formated
       * @return {string}     String formated
       */
      format: function (f) {
        var a = arguments; // store outer arguments
        return ('' + f) // force format specifier to String
          .replace( // replace tokens in format specifier
            /\{(?:(\d+)|(\w+))\}/g, // match {token} references
            function (
              s, // the matched string (ignored)
              i, // an argument index
              p // a property name
            ) {
              return p && a[1] // if property name and first argument exist
                ? a[1][p] // return property from first argument
                : a[i]; // assume argument index and return i-th argument
            });
      },

      /**
       * Get the next enabled item in the options list.
       *
       * @param  {object} selectItems - The options object.
       * @param  {number}    selected - Index of the currently selected option.
       * @return {object}               The next enabled item.
       */
      nextEnabledItem: function(selectItems, selected) {
        while ( selectItems[ selected = (selected + 1) % selectItems.length ].disabled ) {
          // empty
        }
        return selected;
      },

      /**
       * Get the previous enabled item in the options list.
       *
       * @param  {object} selectItems - The options object.
       * @param  {number}    selected - Index of the currently selected option.
       * @return {object}               The previous enabled item.
       */
      previousEnabledItem: function(selectItems, selected) {
        while ( selectItems[ selected = (selected > 0 ? selected : selectItems.length) - 1 ].disabled ) {
          // empty
        }
        return selected;
      },

      /**
       * Transform camelCase string to dash-case.
       *
       * @param  {string} str - The camelCased string.
       * @return {string}       The string transformed to dash-case.
       */
      toDash: function(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      },

      /**
       * Calls the events and hooks registered with function name.
       *
       * @param {string}    fn - The name of the function.
       * @param {number} scope - Scope that should be set on the function.
       */
      triggerCallback: function(fn, scope) {
        var elm = scope.element;
        var func = scope.options['on' + fn];

        if ( $.isFunction(func) ) {
          func.call(elm, elm, scope);
        }

        if ( $.fn[pluginName].hooks[fn] ) {
          $.each($.fn[pluginName].hooks[fn], function() {
            this.call(elm, elm, scope);
          });
        }

        $(elm).trigger(pluginName + '-' + this.toDash(fn), scope);
      }
    },

    /** Initializes */
    init: function(opts) {
      var _this = this;

      // Set options
      _this.options = $.extend(true, {}, $.fn[pluginName].defaults, _this.options, opts);

      _this.utils.triggerCallback('BeforeInit', _this);

      // Preserve data
      _this.destroy(true);

      // Disable on mobile browsers
      if ( _this.options.disableOnMobile && _this.utils.isMobile() ) {
        _this.disableOnMobile = true;
        return;
      }

      // Get classes
      _this.classes = _this.getClassNames();

      // Create elements
      var input        = $('<input/>', { 'class': _this.classes.input, 'readonly': _this.utils.isMobile() });
      var items        = $('<div/>',   { 'class': _this.classes.items, 'tabindex': -1 });
      var itemsScroll  = $('<div/>',   { 'class': _this.classes.scroll });
      var wrapper      = $('<div/>',   { 'class': _this.classes.prefix, 'html': _this.options.arrowButtonMarkup });
      var label        = $('<span/>',  { 'class': 'label' });
      var outerWrapper = _this.$element.wrap('<div/>').parent().append(wrapper.prepend(label), items, input);

      _this.elements = {
        input        : input,
        items        : items,
        itemsScroll  : itemsScroll,
        wrapper      : wrapper,
        label        : label,
        outerWrapper : outerWrapper
      };

      _this.$element
        .on(_this.eventTriggers)
        .wrap('<div class="' + _this.classes.hideselect + '"/>');

      _this.originalTabindex = _this.$element.prop('tabindex');
      _this.$element.prop('tabindex', false);

      _this.populate();
      _this.activate();

      _this.utils.triggerCallback('Init', _this);
    },

    /** Activates the plugin */
    activate: function() {
      var _this = this;
      var originalWidth = _this.$element.width();

      _this.utils.triggerCallback('BeforeActivate', _this);

      _this.elements.outerWrapper.prop('class', [
        _this.classes.wrapper,
        _this.$element.prop('class').replace(/\S+/g, _this.classes.prefix + '-$&'),
        _this.options.responsive ? _this.classes.responsive : ''
      ].join(' '));

      if ( _this.options.inheritOriginalWidth && originalWidth > 0 ) {
        _this.elements.outerWrapper.width(originalWidth);
      }

      if ( !_this.$element.prop('disabled') ) {
        _this.state.enabled = true;

        // Not disabled, so... Removing disabled class
        _this.elements.outerWrapper.removeClass(_this.classes.disabled);

        // Remove styles from items box
        // Fix incorrect height when refreshed is triggered with fewer options
        _this.$li = _this.elements.items.removeAttr('style').find('li');

        _this.bindEvents();
      } else {
        _this.elements.outerWrapper.addClass(_this.classes.disabled);
        _this.elements.input.prop('disabled', true);
      }

      _this.utils.triggerCallback('Activate', _this);
    },

    /**
     * Generate classNames for elements
     *
     * @return {object} Classes object
     */
    getClassNames: function() {
      var _this = this;
      var customClass = _this.options.customClass;
      var classesObj  = {};

      $.each(classList.split(' '), function(i, currClass) {
        var c = customClass.prefix + currClass;
        classesObj[currClass.toLowerCase()] = customClass.camelCase ? c : _this.utils.toDash(c);
      });

      classesObj.prefix = customClass.prefix;

      return classesObj;
    },

    /** Set the label text */
    setLabel: function() {
      var _this = this;
      var labelBuilder = _this.options.labelBuilder;
      var currItem = _this.lookupItems[_this.state.currValue];

      _this.elements.label.html(
        $.isFunction(labelBuilder)
          ? labelBuilder(currItem)
          : _this.utils.format(labelBuilder, currItem)
      );
    },

    /** Get and save the available options */
    populate: function() {
      var _this = this;
      var $options = _this.$element.children();
      var $justOptions = _this.$element.find('option');
      var selectedIndex = $justOptions.index($justOptions.filter(':selected'));
      var currIndex = 0;

      _this.state.currValue = (_this.state.selected = ~selectedIndex ? selectedIndex : 0);
      _this.state.selectedIdx = _this.state.currValue;
      _this.items = [];
      _this.lookupItems = [];

      if ( $options.length ) {
        // Build options markup
        $options.each(function(i) {
          var $elm = $(this);

          if ( $elm.is('optgroup') ) {

            var optionsGroup = {
              element       : $elm,
              label         : $elm.prop('label'),
              groupDisabled : $elm.prop('disabled'),
              items         : []
            };

            $elm.children().each(function(i) {
              var $elm = $(this);
              var optionText = $elm.html();

              optionsGroup.items[i] = {
                index    : currIndex,
                element  : $elm,
                value    : $elm.val(),
                text     : optionText,
                slug     : _this.utils.replaceDiacritics(optionText),
                disabled : optionsGroup.groupDisabled
              };

              _this.lookupItems[currIndex] = optionsGroup.items[i];

              currIndex++;
            });

            _this.items[i] = optionsGroup;

          } else {

            var optionText = $elm.html();

            _this.items[i] = {
              index    : currIndex,
              element  : $elm,
              value    : $elm.val(),
              text     : optionText,
              slug     : _this.utils.replaceDiacritics(optionText),
              disabled : $elm.prop('disabled')
            };

            _this.lookupItems[currIndex] = _this.items[i];

            currIndex++;

          }
        });

        _this.setLabel();
        _this.elements.items.append( _this.elements.itemsScroll.html( _this.getItemsMarkup(_this.items) ) );
      }
    },

    /**
     * Generate options markup
     *
     * @param  {object} items - Object containing all available options
     * @return {string}         HTML for the options box
     */
    getItemsMarkup: function(items) {
      var _this = this;
      var markup = '<ul>';

      $.each(items, function(i, elm) {
        if ( elm.label !== undefined ) {

          markup += _this.utils.format('<ul class="{1}"><li class="{2}">{3}</li>',
            $.trim([_this.classes.group, elm.groupDisabled ? 'disabled' : '', elm.element.prop('class')].join(' ')),
            _this.classes.grouplabel,
            elm.element.prop('label')
          );

          $.each(elm.items, function(i, elm) {
            markup += _this.getItemMarkup(elm.index, elm);
          });

          markup += '</ul>';

        } else {

          markup += _this.getItemMarkup(elm.index, elm);

        }
      });

      return markup + '</ul>';
    },

    /**
     * Generate every option markup
     *
     * @param  {number} i   - Index of current item
     * @param  {object} elm - Current item
     * @return {string}       HTML for the option
     */
    getItemMarkup: function(i, elm) {
      var _this = this;
      var itemBuilder = _this.options.optionsItemBuilder;

      return _this.utils.format('<li data-index="{1}" class="{2}">{3}</li>',
        i,
        $.trim([
          i === _this.state.currValue  ? 'selected' : '',
          i === _this.items.length - 1 ? 'last'     : '',
          elm.disabled                 ? 'disabled' : ''
        ].join(' ')),
        $.isFunction(itemBuilder) ? itemBuilder(elm, elm.element, i) : _this.utils.format(itemBuilder, elm)
      );
    },

    /** Bind events on the elements */
    bindEvents: function() {
      var _this = this;

      _this.elements.wrapper
        .add(_this.$element)
        .add(_this.elements.outerWrapper)
        .add(_this.elements.input)
        .off(bindSufix);

      _this.elements.outerWrapper.on('mouseenter' + bindSufix + ' mouseleave' + bindSufix, function(e) {
        $(this).toggleClass(_this.classes.hover, e.type === 'mouseenter');

        // Delay close effect when openOnHover is true
        if ( _this.options.openOnHover ) {
          clearTimeout(_this.closeTimer);

          if ( e.type === 'mouseleave' ) {
            _this.closeTimer = setTimeout($.proxy(_this.close, _this), _this.options.hoverIntentTimeout);
          } else {
            _this.open();
          }
        }
      });

      // Toggle open/close
      _this.elements.wrapper.on('click' + bindSufix, function(e) {
        _this.state.opened ? _this.close() : _this.open(e);
      });

      _this.elements.input
        .prop({ tabindex: _this.originalTabindex, disabled: false })
        .on('keydown' + bindSufix, $.proxy(_this.handleKeys, _this))
        .on('focusin' + bindSufix, function(e) {
          _this.elements.outerWrapper.addClass(_this.classes.focus);

          // Prevent the flicker when focusing out and back again in the browser window
          _this.elements.input.one('blur', function() {
            _this.elements.input.blur();
          });

          if ( _this.options.openOnFocus && !_this.state.opened ) {
            _this.open(e);
          }
        })
        .on('focusout' + bindSufix, function() {
          _this.elements.outerWrapper.removeClass(_this.classes.focus);
        })
        .on('input propertychange', function() {
          var val = _this.elements.input.val();

          // Clear search
          clearTimeout(_this.resetStr);
          _this.resetStr = setTimeout(function() {
            _this.elements.input.val('');
          }, _this.options.keySearchTimeout);

          if ( val.length ) {
            // Search in select options
            $.each(_this.items, function(i, elm) {
              if ( RegExp('^' + _this.utils.escapeRegExp(val), 'i').test(elm.slug) && !elm.disabled ) {
                _this.select(i);
                return false;
              }
            });
          }
        });

      _this.$li.on({
        // Prevent <input> blur on Chrome
        mousedown: function(e) {
          e.preventDefault();
          e.stopPropagation();
        },
        click: function() {
          // The second parameter is to close the box after click
          _this.select($(this).data('index'), true);

          // Chrome doesn't close options box if select is wrapped with a label
          // We need to 'return false' to avoid that
          return false;
        }
      });
    },

    /**
     * Behavior when keyboard keys is pressed
     *
     * @param {object} e - Event object
     */
    handleKeys: function(e) {
      var _this = this;
      var key = e.keyCode || e.which;
      var keys = _this.options.keys;

      var isPrev = $.inArray(key, keys.previous) > -1;
      var isNext = $.inArray(key, keys.next) > -1;
      var isSelect = $.inArray(key, keys.select) > -1;
      var isOpen = $.inArray(key, keys.open) > -1;
      var idx = _this.state.selectedIdx;
      var isFirstOrLastItem = (isPrev && idx === 0) || (isNext && (idx + 1) === _this.items.length);
      var goToItem = 0;

      // Enter / Space
      if ( key === 13 || key === 32 ) {
        e.preventDefault();
      }

      // If it's a directional key
      if ( isPrev || isNext ) {
        if ( !_this.options.allowWrap && isFirstOrLastItem ) {
          return;
        }

        if ( isPrev ) {
          goToItem = _this.utils.previousEnabledItem(_this.items, idx);
        }

        if ( isNext ) {
          goToItem = _this.utils.nextEnabledItem(_this.items, idx);
        }

        _this.select(goToItem);
      }

      // Tab / Enter / ESC
      if ( isSelect && _this.state.opened ) {
        _this.select(idx, true);
        return;
      }

      // Space / Enter / Left / Up / Right / Down
      if ( isOpen && !_this.state.opened ) {
        _this.open();
      }
    },

    /** Update the items object */
    refresh: function() {
      var _this = this;

      _this.populate();
      _this.activate();
      _this.utils.triggerCallback('Refresh', _this);
    },

    /** Set options box width/height */
    setOptionsDimensions: function() {
      var _this = this;

      // Calculate options box height
      // Set a temporary class on the hidden parent of the element
      var hiddenChildren = _this.elements.items.closest(':visible').children(':hidden').addClass(_this.classes.tempshow);
      var maxHeight = _this.options.maxHeight;
      var itemsWidth = _this.elements.items.outerWidth();
      var wrapperWidth = _this.elements.wrapper.outerWidth() - (itemsWidth - _this.elements.items.width());

      // Set the dimensions, minimum is wrapper width, expand for long items if option is true
      if ( !_this.options.expandToItemText || wrapperWidth > itemsWidth ) {
        _this.finalWidth = wrapperWidth;
      } else {
        // Make sure the scrollbar width is included
        _this.elements.items.css('overflow', 'scroll');

        // Set a really long width for _this.elements.outerWrapper
        _this.elements.outerWrapper.width(9e4);
        _this.finalWidth = _this.elements.items.width();
        // Set scroll bar to auto
        _this.elements.items.css('overflow', '');
        _this.elements.outerWrapper.width('');
      }

      _this.elements.items.width(_this.finalWidth).height() > maxHeight && _this.elements.items.height(maxHeight);

      // Remove the temporary class
      hiddenChildren.removeClass(_this.classes.tempshow);
    },

    /** Detect if the options box is inside the window */
    isInViewport: function() {
      var _this = this;
      var scrollTop = $win.scrollTop();
      var winHeight = $win.height();
      var uiPosX = _this.elements.outerWrapper.offset().top;
      var uiHeight = _this.elements.outerWrapper.outerHeight();

      var fitsDown = (uiPosX + uiHeight + _this.itemsHeight) <= (scrollTop + winHeight);
      var fitsAbove = (uiPosX - _this.itemsHeight) > scrollTop;

      // If it does not fit below, only render it
      // above it fit's there.
      // It's acceptable that the user needs to
      // scroll the viewport to see the cut off UI
      var renderAbove = !fitsDown && fitsAbove;

      _this.elements.outerWrapper.toggleClass(_this.classes.above, renderAbove);
    },

    /**
     * Detect if currently selected option is visible and scroll the options box to show it
     *
     * @param {number} index - Index of the selected items
     */
    detectItemVisibility: function(index) {
      var _this = this;
      var liHeight = _this.$li.eq(index).outerHeight();
      var liTop = _this.$li[index].offsetTop;
      var itemsScrollTop = _this.elements.itemsScroll.scrollTop();
      var scrollT = liTop + liHeight * 2;

      _this.elements.itemsScroll.scrollTop(
        scrollT > itemsScrollTop + _this.itemsHeight ? scrollT - _this.itemsHeight :
          liTop - liHeight < itemsScrollTop ? liTop - liHeight :
            itemsScrollTop
      );
    },

    /**
     * Open the select options box
     *
     * @param {event} e - Event
     */
    open: function(e) {
      var _this = this;

      _this.utils.triggerCallback('BeforeOpen', _this);

      if ( e ) {
        e.preventDefault();
        e.stopPropagation();
      }

      if ( _this.state.enabled ) {
        _this.setOptionsDimensions();

        // Find any other opened instances of select and close it
        $('.' + _this.classes.hideselect, '.' + _this.classes.open).children()[pluginName]('close');

        _this.state.opened = true;
        _this.itemsHeight = _this.elements.items.outerHeight();
        _this.itemsInnerHeight = _this.elements.items.height();

        // Toggle options box visibility
        _this.elements.outerWrapper.addClass(_this.classes.open);

        // Give dummy input focus
        _this.elements.input.val('');
        if ( e && e.type !== 'focusin' ) {
          _this.elements.input.focus();
        }

        $doc
          .on('click' + bindSufix, $.proxy(_this.close, _this))
          .on('scroll' + bindSufix, $.proxy(_this.isInViewport, _this));
        _this.isInViewport();

        // Prevent window scroll when using mouse wheel inside items box
        if ( _this.options.preventWindowScroll ) {
          /* istanbul ignore next */
          $doc.on('mousewheel' + bindSufix + ' DOMMouseScroll' + bindSufix, '.' + _this.classes.scroll, function(e) {
            var orgEvent = e.originalEvent;
            var scrollTop = $(this).scrollTop();
            var deltaY = 0;

            if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1; }
            if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;  }
            if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY; }
            if ( 'deltaY'      in orgEvent ) { deltaY = orgEvent.deltaY * -1; }

            if ( scrollTop === (this.scrollHeight - _this.itemsInnerHeight) && deltaY < 0 || scrollTop === 0 && deltaY > 0 ) {
              e.preventDefault();
            }
          });
        }

        _this.detectItemVisibility(_this.state.selectedIdx);

        _this.utils.triggerCallback('Open', _this);
      }
    },

    /** Close the select options box */
    close: function() {
      var _this = this;

      _this.utils.triggerCallback('BeforeClose', _this);

      _this.change();

      // Remove custom events on document
      $doc.off(bindSufix);

      // Remove visible class to hide options box
      _this.elements.outerWrapper.removeClass(_this.classes.open);

      _this.state.opened = false;

      _this.utils.triggerCallback('Close', _this);
    },

    /** Select current option and change the label */
    change: function() {
      var _this = this;

      _this.utils.triggerCallback('BeforeChange', _this);

      if ( _this.state.currValue !== _this.state.selectedIdx ) {
        // Apply changed value to original select
        _this.$element
          .prop('selectedIndex', _this.state.currValue = _this.state.selectedIdx)
          .data('value', _this.lookupItems[_this.state.selectedIdx].text);

        // Change label text
        _this.setLabel();
      }

      _this.utils.triggerCallback('Change', _this);
    },

    /**
     * Select option
     *
     * @param {number}  index - Index of the option that will be selected
     * @param {boolean} close - Close the options box after selecting
     */
    select: function(index, close) {
      var _this = this;

      // Parameter index is required
      if ( index === undefined ) {
        return;
      }

      // If element is disabled, can't select it
      if ( !_this.lookupItems[index].disabled ) {
        _this.$li.filter('[data-index]')
          .removeClass('selected')
          .eq(_this.state.selectedIdx = index)
          .addClass('selected');

        _this.detectItemVisibility(index);

        // If 'close' is false (default), the options box won't close after
        // each selected item, this is necessary for keyboard navigation
        if ( close ) {
          _this.close();
        }
      }
    },

    /**
     * Unbind and remove
     *
     * @param {boolean} preserveData - Check if the data on the element should be removed too
     */
    destroy: function(preserveData) {
      var _this = this;

      if ( _this.state && _this.state.enabled ) {
        _this.elements.items.add(_this.elements.wrapper).add(_this.elements.input).remove();

        if ( !preserveData ) {
          _this.$element.removeData(pluginName).removeData('value');
        }

        _this.$element.prop('tabindex', _this.originalTabindex).off(bindSufix).off(_this.eventTriggers).unwrap().unwrap();

        _this.state.enabled = false;
      }
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(args) {
    return this.each(function() {
      var data = $.data(this, pluginName);

      if ( data && !data.disableOnMobile ) {
        (typeof args === 'string' && data[args]) ? data[args]() : data.init(args);
      } else {
        $.data(this, pluginName, new Selectric(this, args));
      }
    });
  };

  /**
   * Hooks for the callbacks
   *
   * @type {object}
   */
  $.fn[pluginName].hooks = {
    /**
     * @param {string} callbackName - The callback name.
     * @param {string}     hookName - The name of the hook to be attached.
     * @param {function}         fn - Callback function.
     */
    add: function(callbackName, hookName, fn) {
      if ( !this[callbackName] ) {
        this[callbackName] = {};
      }

      this[callbackName][hookName] = fn;
    },

    /**
     * @param {string} callbackName - The callback name.
     * @param {string}     hookName - The name of the hook that will be removed.
     */
    remove: function(callbackName, hookName) {
      delete this[callbackName][hookName];
    }
  };

  /**
   * Default plugin options
   *
   * @type {object}
   */
  $.fn[pluginName].defaults = {
    onChange             : function(elm) { $(elm).change(); },
    maxHeight            : 300,
    keySearchTimeout     : 500,
    arrowButtonMarkup    : '<b class="button">&#x25be;</b>',
    disableOnMobile      : true,
    openOnFocus          : true,
    openOnHover          : false,
    hoverIntentTimeout   : 500,
    expandToItemText     : false,
    responsive           : false,
    preventWindowScroll  : true,
    inheritOriginalWidth : false,
    allowWrap            : true,
    optionsItemBuilder   : '{text}', // function(itemData, element, index)
    labelBuilder         : '{text}', // function(currItem)
    keys                 : {
      previous : [37, 38],                 // Left / Up
      next     : [39, 40],                 // Right / Down
      select   : [9, 13, 27],              // Tab / Enter / Escape
      open     : [13, 32, 37, 38, 39, 40], // Enter / Space / Left / Up / Right / Down
      close    : [9, 27]                   // Tab / Escape
    },
    customClass          : {
      prefix: pluginName,
      camelCase: false
    }
  };
}));