const util = require('util');
const sleep = util.promisify(setTimeout);

async function doSomeWork() {
  console.log(1);
  const promise = asynchronousWork();

  console.log(4);

  await promise;

  console.log(5);
}

async function asynchronousWork() {
  console.log(2);
  await sleep(1);
  console.log(3);
  return;
}

doSomeWork();