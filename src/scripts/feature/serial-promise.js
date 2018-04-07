const list = [];

for (let i = 0; i < 10; ++i) {
  list.push(i);
}

// 串行promise
function SerialPromise(numberList, promiseGenerator) {
  let realResult = [];
  // 返回一个resolved状态的promise
  let result = Promise.resolve();
  
  numberList.forEach((number, index) => {
    // 每一个result等于最新创建的promise
    // callback是传入的生成promise的方法
    // 每一个result都是有result.then返回的新的promise，而不是promiseGenerator返回的！！
    console.log('foreach.', number)
    result = result.then(() => promiseGenerator(number).then((res) => realResult.push(res)));
  })

  // 走到这里的result是最后一个创建的promise
  return result.then(() => {
    console.log('real result')
    return realResult
  })
}

// SerialPromise(list, (number) => {
//   console.log('create new promise.', number)
//   // number通过一个函数，封锁在每个function的作用域里
//   const innerPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // console.log(number);
//       return resolve(number);
//     }, 100);
//   })
//     .then((data) => {
//       console.log('success:', data);
//     })
//     .catch((err) => {
//       console.log('error:', data);
//     });

//   return innerPromise;
// });


var promise = Promise.resolve();


var newPromise = promise.then(() => {
  console.log('111111')
  const innerPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolve-11111')
    }, 2000);
  })

  return innerPromise;
})

var newPromise2 = newPromise.then((ret) => {
  console.log(ret);
  console.log('222222')
  const innerPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolve-22222')
    }, 2000);
  });

  return innerPromise;
})

newPromise2.then(ret => {
  console.log(ret);
})

console.log(newPromise === promise)
console.log(newPromise === newPromise2)