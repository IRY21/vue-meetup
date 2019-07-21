export default {
  namespaced: true,
  state: {

  },
  actions: {
    loginWithEmailAndPassword({ state, commit }, formData) {
      console.log(formData)
    },
    registerUser({ state, commit }, formData) {
      console.log(formData)
    }
  },
  getters: {

  }
}