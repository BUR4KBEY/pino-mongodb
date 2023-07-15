import { FormatFunction } from './typings';

const formatDefault: FormatFunction = chunk => {
  const result = chunk
    .split('\n')
    .filter(x => x)
    .map(x => JSON.parse(x))
    .map(x => {
      if (x.time) {
        x.time = new Date(x.time);
      }

      return x;
    });

  return result;
};

export default formatDefault;
