# @burakbey/pino-mongodb 🎄

[**@burakbey/pino-mongodb**](https://npmjs.org/package/@burakbey/pino-mongodb) is a package that enables you to save logs from pino to MongoDB, offering a convenient method to store your application's logs.

## Installation 🚀

To get started, use your preferred package manager to install the **@burakbey/pino-mongodb** package.

```
yarn install @burakbey/pino-mongodb
```

## Implementation 🛠️

Using **@burakbey/pino-mongodb** is straightforward. Simply import the `getWritableStream` function and use it as a stream in your code, as shown in the examples below.

```ts
import pino from 'pino';

import { getWritableStream } from '@burakbey/pino-mongodb';

async function bootstrap() {
  const mongodbStream = await getWritableStream({
    connectionUri: 'mongodb://localhost:27017',
    collectionName: 'logs',
    dbName: 'logs'
  });

  const logger = pino(
    { level: 'info' },
    pino.multistream([{ stream: process.stdout }, { stream: mongodbStream }])
  );

  logger.info('hello');
}

bootstrap();
```

You can also customize the default formatter to suit your needs, giving you the flexibility to modify the log data before it is stored in the MongoDB instance. This includes controlling how the timestamp is converted and making any other desired modifications to the log entries.

```ts
import pino from 'pino';

import { FormatFunction, getWritableStream } from '@burakbey/pino-mongodb';

const customFormat: FormatFunction = chunk => {
  const result = chunk
    .split('\n')
    .filter(x => x)
    .map(x => JSON.parse(x))
    .map(x => {
      // do whatever you want here
      // if (x.time) {
      //   x.time = new Date(x.time);
      // }

      return x;
    });

  return result;
};

async function bootstrap() {
  const mongodbStream = await getWritableStream({
    connectionUri: 'mongodb://localhost:27017',
    collectionName: 'logs',
    dbName: 'logs',
    format: customFormat
  });

  const logger = pino(
    { level: 'info' },
    pino.multistream([{ stream: process.stdout }, { stream: mongodbStream }])
  );

  logger.info('hello');
}

bootstrap();
```

With **@burakbey/pino-mongodb**, you can easily save and manage your application logs in a MongoDB database. Enjoy streamlined log management for your projects! ✨
