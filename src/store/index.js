import { createStore } from 'vuex'
import authModule from './modules/auth';
import storyModule from './modules/story';

export default createStore({
  modules: {
    auth: authModule,
    story: storyModule
  }
})
