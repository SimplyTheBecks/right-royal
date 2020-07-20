import { Server } from 'miragejs';

export default function makeServer({ environment = 'development' } = {}) {
  return new Server({
    environment,

    routes() {
      this.namespace = 'api';

      this.get('/user-messages/count', () => JSON.stringify({ count: 15 }));
      this.get('/user-notifications/count', () => JSON.stringify({ count: 5 }));
      this.get('/products', () => JSON.stringify([
        { name: 'Product1' },
        { name: 'Product2' },
        { name: 'Product3' },
        { name: 'Product4' },
        { name: 'Product5' },
        { name: 'Product6' },
        { name: 'Product7' },
        { name: 'Product8' },
        { name: 'Product9' },
      ]));
    },
  });
}
