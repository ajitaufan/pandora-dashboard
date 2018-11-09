import Vuex from "vuex";
import Cookies from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: true,
      credentials: {
        username: "",
        nama: ""
      },
      token: ""
    },
    mutations: {
      clearState(state) {
        state.token = null;
        state.credentials = null;
      },
      setUser(state, credentials) {
        state.credentials.username = credentials.user.username;
        state.credentials.nama = credentials.user.nama;
        state.token = credentials.token;
        Cookies.set(credentials.user.nama, credentials.token, {
          expires: 3600
        });
      },
      setAuthenticated(state, credentials) {
        if (state.token != null) {
          state.auth = true;
        }
      },
      logout(vuexContext) {
        vuexContext.commit("clearState");
        //Cookies.remove(credential.nama);
      }
    },
    getters: {
      isAuthenticated(state) {
        return state.token != null;
      },
      getToken(state) {
        return state.token;
      }
    }
  });
};
export default createStore;
