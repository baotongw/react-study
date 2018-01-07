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

var Show = function (_Component) {
    _inherits(Show, _Component);

    function Show() {
        _classCallCheck(this, Show);

        var _this = _possibleConstructorReturn(this, (Show.__proto__ || Object.getPrototypeOf(Show)).call(this));

        _this.state = {
            count: 0,
            placeHolder: 'nothing'
        };

        _utils2.default.logTitle('Show-Component Constructor');
        _utils2.default.log(_this.props);
        _utils2.default.log(_this.state);

        _this.addCount = _this.addCount.bind(_this);
        return _this;
    }

    _createClass(Show, [{
        key: 'addCount',
        value: function addCount() {
            var count = this.state.count + 1;

            this.setState({
                count: this.state.count
            });
        }
    }, {
        key: 'getInitialState',
        value: function getInitialState() {
            _utils2.default.logTitle('Show-getInitialState');
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            _utils2.default.logTitle('Show-componentWillMount');
            _utils2.default.log(arguments);
            _utils2.default.log(this.props);
            _utils2.default.log(this.state);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _utils2.default.logTitle('Show-componentDidMount');
            _utils2.default.log(arguments);
            _utils2.default.log(this.props);
            _utils2.default.log(this.state);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            _utils2.default.logTitle('Show-shouldComponentUpdate');

            _utils2.default.log(this.props, 0);
            _utils2.default.log(this.state, 0);
            _utils2.default.log(this.props === nextProps, 0);
            _utils2.default.log(this.state === nextState, 0);

            return true;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            _utils2.default.logTitle('Show-componentWillReceiveProps');
            _utils2.default.log(arguments, 1);
            _utils2.default.log(this.props, 1);
            _utils2.default.log(this.state, 1);
            _utils2.default.log(this.props === nextProps, 0);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            _utils2.default.logTitle('Show-componentWillUpdate');
            _utils2.default.log(arguments);
            _utils2.default.log(this.props);
            _utils2.default.log(this.state);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            _utils2.default.logTitle('Show-componentDidUpdate');
            _utils2.default.log(arguments, 0);
            _utils2.default.log(this.props, 0);
            _utils2.default.log(this.state, 0);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _utils2.default.logTitle('Show-componentWillUnmount');
            // no arguments here
            // Utils.log(arguments, true)
            _utils2.default.log(this.props, 0);
            _utils2.default.log(this.state, 0);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    this.props.name
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Button Click Count: ',
                    this.state.count
                ),
                _react2.default.createElement(
                    'button',
                    { onClick: this.addCount },
                    'Click Me!'
                )
            );
        }
    }]);

    return Show;
}(_react.Component);

exports.default = Show;