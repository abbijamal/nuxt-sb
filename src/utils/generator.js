export function stream (fn, options = {}) {
  let i = 0;
  const next = async (options) => {
    const output = await fn(i, options);
    i++;
    if (output.length) {
      return output;
    }
  };
  const iterator = generator(next, options);
  iterator.next();
  return iterator;
}

async function* generator (next, options) {
  let output;
  let input;
  while (true) {
    input = yield output;
    output = await next(input || options);
    if (!output) {
      return;
    }
  }
}
