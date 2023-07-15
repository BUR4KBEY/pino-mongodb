import { MongoClient } from 'mongodb';
import { Writable } from 'stream';

import { formatDefault, WritableStreamOptions } from './utils';

export * from './utils';

export async function getWritableStream(
  options: WritableStreamOptions
): Promise<Writable> {
  const client = new MongoClient(options.connectionUri);
  await client.connect();

  const db = client.db(options.dbName);
  const collection = db.collection(options.collectionName);

  const stream = new Writable({
    objectMode: true,
    autoDestroy: true,
    write: async (chunk, encoding, callback) => {
      chunk = chunk.toString();

      try {
        const formatted = options.format
          ? options.format(chunk)
          : formatDefault(chunk);

        await collection.insertMany(formatted);
        callback();
      } catch (error) {
        if (error instanceof Error) {
          callback(error);
        }
      }
    },
    destroy: async (err, cb) => {
      try {
        await client.close(true);
        cb(err);
      } catch (error) {
        if (error instanceof Error) {
          cb(error);
        } else {
          cb(err);
        }
      }
    }
  });

  return stream;
}
