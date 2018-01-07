'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SK = function (_Component) {
    _inherits(SK, _Component);

    function SK() {
        _classCallCheck(this, SK);

        return _possibleConstructorReturn(this, (SK.__proto__ || Object.getPrototypeOf(SK)).apply(this, arguments));
    }

    _createClass(SK, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _utils2.default.logTitle('SK-componentDidMount.');
            _utils2.default.log('Send Page SK Done.', true);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            _utils2.default.logTitle('SK-componentWillReceiveProps');
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            _utils2.default.logTitle('SK-componentWillUpdate');
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _utils2.default.logTitle('SK-componentWillUnmount');
            _utils2.default.log(this.props);
            _utils2.default.log(this.state);
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return SK;
}(_react.Component);

exports.default = SK;