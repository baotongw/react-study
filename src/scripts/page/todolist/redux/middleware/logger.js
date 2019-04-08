const reduxLoggerMiddleware = ({dispatch, getState}) => next => action => {
  console.log('[Logger] Action -->', action);

  return next(action);
}

export default reduxLoggerMiddleware;
