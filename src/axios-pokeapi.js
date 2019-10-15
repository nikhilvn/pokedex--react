import axios from 'axios';
import { setupCache } from 'axios-cache-adapter'

export const cache = setupCache();

const instance =  axios.create({
  adapter: cache.adapter
});

// export const hoverInstance = axios.create({
//   headers: {'Cache-Control': 'no-cache,no-store,must-revalidate'}
// });

export default instance;