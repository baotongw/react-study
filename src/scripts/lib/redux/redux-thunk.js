function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
// 可以通过thunk的createThunkMiddleware 再创建一个chunk middleware
// 但在我们的使用场景中没有遇到过
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
