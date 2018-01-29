'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createComponent;

var _react = require('react');

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Creates a component class that renders the given Material UI component
 *
 * @param MaterialUIComponent The material ui component to render
 * @param mapProps A mapping of props provided by redux-form to the props the Material UI
 * component needs
 */
function createComponent(MaterialUIComponent, mapProps) {
  var InputComponent = function (_Component) {
    _inherits(InputComponent, _Component);

    function InputComponent() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, InputComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputComponent.__proto__ || Object.getPrototypeOf(InputComponent)).call.apply(_ref, [this].concat(args))), _this), _this.allowClickEventOnInputButton = function (onBlur) {
        return function (event) {
          var relatedTarget = event.relatedTarget;

          if (relatedTarget && relatedTarget.getAttribute('type') === 'button') {
            event.preventDefault();
          } else if (onBlur) {
            onBlur(event);
          }
        };
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(InputComponent, [{
      key: 'getRenderedComponent',
      value: function getRenderedComponent() {
        return this.component;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var propsToMap = _extends({}, this.props);
        if (propsToMap.input && propsToMap.input.onBlur) {
          propsToMap.input.onBlur = this.allowClickEventOnInputButton(propsToMap.input.onBlur);
        }

        return (0, _react.createElement)(MaterialUIComponent, _extends({}, mapProps(propsToMap), {
          ref: !(0, _utils.isStateLess)(MaterialUIComponent) ? function (el) {
            return _this2.component = el;
          } : null
        }));
      }
    }]);

    return InputComponent;
  }(_react.Component);

  InputComponent.displayName = 'ReduxFormMaterialUI' + MaterialUIComponent.name;
  return InputComponent;
}