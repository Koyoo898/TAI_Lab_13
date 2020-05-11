'use strict';
import business from '../business/business.container';
import applicationException from "../service/applicationException";
const postEndpoint = (router) => {
  router.get('/api/posts', async (request, response, next) => {
    try {
      let result = await business(request).getCategoryManager().query();
      response.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  });
};
export default postEndpoint;
