import firebase, { db } from '@/firebase'

export default {
  state: {
    user: null,
    unull: null
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    setuser (state, payload) {
      state.user = payload
    },
    setnull (state, payload) {
      state.unull = payload
    }
  },
  actions: {
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    signOut () {
      firebase.auth().signOut()
    },
    updateuser ({ commit }, payload) {
      const userRef = db.collection('users').doc(payload.id)
      const name = payload.name
      userRef.update({
        name
      })
      commit('setnull', null)
    },
    authuser ({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const userRef = db.collection('users').doc(user.uid)
          const tempUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          }
          userRef.onSnapshot((doc) => {
            if (doc.exists) {
              commit('setuser', doc.data())
            } else {
              userRef.set({
                ...tempUser
              })
                .then(userRef.onSnapshot((doc) => {
                  commit('setuser', doc.data())
                }))
            }
          })
        } else {
          commit('setuser', null)
        }
      })
    }
  }
}
