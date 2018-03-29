'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = promiseMiddleware;

var _fluxStandardAction = require('flux-standard-action');

function isPromise(val) {
  return val && typeof val.then === 'function';
}

// 第一层在applyMiddleware中的middlewares.map种被执行
// 返回second，同事拿到了getState和原始dispatch
function promiseMiddleware(_ref) {
  // 这里通过作用域链存储了原始dispatch
  var dispatch = _ref.dispatch;

  // second函数会在compose之后在applyMiddleware文件中被执行
  // 传入的参数是dispatch或上一个中间件的返回值
  return function second(next) {
    return function third(action) {
      // 如果不是标准的action
      if (!_fluxStandardAction.isFSA(action)) {

        if(isPromise(action)) {
          return action.then(dispatch);
        } else {
          next(action);
        }
      }

      if(isPromise(action.payload)) {
        action.payload.then(function(result) {
          return dispatch(_extends({}, action, { payload: result }));
        }, function (error) {
          return dispatch(_extends({}, action, { payload: error, error: true }));
        })
      }  else {
        next(action);
      }
    };
  };
}

module.exports = exports['default'];