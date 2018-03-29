/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function compose(...funcs) {
  // 没有函数传入，返回参数
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))

  // let firstCompose = function(...args) {
  //   // 将右边函数的计算结果返回给左边函数，知道所有的middleware执行完
  //   let ret = rightFunc(args);
  //   return leftFunc(ret);
  // }

  // let secondCompose = function(...args) {
  //   let ret = rightFunc(args);

  //   return firstCompose(ret);
  // }

  // let thirdCompose = function(...args) {
  //   let ret = rightFunc(args);

  //   return secondCompose(ret);
  // }

  // ...move on

  // let composeFinalFunc = thirdCompose;

  // composeFinalFunc(store.dispatch);
}
