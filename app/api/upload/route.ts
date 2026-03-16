import { route, type Router } from '@better-upload/server';
import { toRouteHandler } from '@better-upload/server/adapters/next';
import { aws } from '@better-upload/server/clients';

const router: Router = {
  client: aws(), // or cloudflare(), backblaze(), tigris(), ...
  bucketName: 'my-bucket', 
  routes: {
    profile: route({
      fileTypes: ['image/*'],
    }),
  },
};

export const { POST } = toRouteHandler(router);