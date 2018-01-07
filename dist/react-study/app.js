'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _show = require('./show');

var _show2 = _interopRequireDefault(_show);

var _sk = require('./sk');

var _sk2 = _interopRequireDefault(_sk);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            name: 'baotong.wang',
            isShow: true
        };
        _utils2.default.logTitle('Component Constructor');
        _utils2.default.log(_this.props);
        _utils2.default.log(_this.state);
        _this.toggle = _this.toggle.bind(_this);
        _this.updateName = _this.updateName.bind(_this);
        _this.doUpdate = _this.doUpdate.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'doUpdate',
        value: function doUpdate() {
            this.setState();
        }

        // getDefaultProps() {
        //     Utils.log('getDefaultProps')
        // }

    }, {
        key: 'getInitialState',
        value: function getInitialState() {
            _utils2.default.logTitle('getInitialState');
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            _utils2.default.logTitle('componentWillMount');
            _utils2.default.log(arguments);
            _utils2.default.log(this.props);
            _utils2.default.log(this.state);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _utils2.default.logTitle('componentDidMount');
            _utils2.default.log(arguments);
            _utils2.default.log(this.props);
            _utils2.default.log(this.state);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            _utils2.default.logTitle('shouldComponentUpdate');
            _utils2.default.log(arguments);
            _utils2.default.log(this.props);
            _utils2.default.log(this.state);
            return true;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            _utils2.default.logTitle('componentWillReceiveProps');
            _utils2.default.log(arguments);
            _utils2.default.log(this.props);
            _utils2.default.log(this.state);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            _utils2.default.logTitle('componentWillUpdate');
            _utils2.default.log(arguments);
            _utils2.default.log(this.props);
            _utils2.default.log(this.state);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            _utils2.default.logTitle('componentDidUpdate');
            _utils2.default.log(arguments);
            _utils2.default.log(this.props);
            _utils2.default.log(this.state);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _utils2.default.logTitle('componentWillUnmount');
            _utils2.default.log(arguments);
            _utils2.default.log(this.props);
            _utils2.default.log(this.state);
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            this.setState({
                isShow: !this.state.isShow
            });
        }
    }, {
        key: 'updateName',
        value: function updateName(e) {
            this.setState({
                name: e.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var element = null;

            if (this.state.isShow) {
                element = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('input', { type: 'text', value: this.state.name, onChange: this.updateName }),
                    _react2.default.createElement(_show2.default, { name: this.state.name }),
                    _react2.default.createElement('br', null)
                );
            }

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'a',
                    { href: 'javascript:;', onClick: this.doUpdate },
                    '\u6267\u884CsetState'
                ),
                _react2.default.createElement(_sk2.default, null),
                element,
                _react2.default.createElement(
                    'a',
                    { href: 'javascript:;', onClick: this.toggle },
                    '\u5207\u6362\u663E\u793A'
                )
            );
        }
    }]);

    return App;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('container'));