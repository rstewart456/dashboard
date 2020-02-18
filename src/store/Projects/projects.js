import { db, storage } from '@/firebase'

export default {
  state: {
    projects: null,
    pnull: null
  },
  mutations: {
    setprojects (state, payload) {
      state.projects = payload
    },
    setpnull (state, payload) {
      state.pnull = payload
    }
  },
  getters: {
    projects (state) {
      return state.projects
    }
  },
  actions: {
    getprojects ({ commit }) {
      const project = db.collection('projects').orderBy('createdAt', 'desc')
      project.onSnapshot(snapShot => {
        const temp = []
        snapShot.forEach(doc => {
          const data = {
            id: doc.id,
            ...doc.data()
          }
          temp.push(data)
          commit('setprojects', temp)
        })
      })
    },
    addproject ({ commit }, payload) {
      const proj = {
        name: payload.name,
        paragraph: payload.paragraph,
        github: payload.github,
        location: payload.location,
        createdAt: new Date()
      }
      let key
      let picture
      const project = db.collection('projects')
      project.add(proj)
        .then(data => {
          key = data.id
          return key
        })
        .then(function () {
          const images = storage.ref(`/projects/${key}`)
          const image = images.child(payload.image.name).put(payload.image)
          image.on('state_changed', function (snapshot) {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
          }, function (error) {
            switch (error.code) {
              case 'storage/unauthorized':
                break
              case 'storage/canceled':
                break
              case 'storage/unknown':
                break
            }
          }, function () {
            image.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              // console.log('File available at', downloadURL)
              picture = downloadURL
              return picture
            })
              .then(function () {
                const projext = db.collection('projects').doc(key)
                projext.set({
                  id: key,
                  image: picture
                }, { merge: true })
                commit('setpnull', null)
              })
          })
        })
    },
    projectDelete ({ commit }, payload) {
      const project = db.collection('projects').doc(payload)
      project.delete().then(function () {
        const listRef = storage.ref(`/projects/${payload}/`)
        listRef.listAll().then(function (res) {
          res.items.forEach(function (itemRef) {
            const item = storage.ref(`${itemRef.location.path}`)
            item.delete()
          })
        })
      })
    },
    updateProject ({ commit }, payload) {
      const updateProj = {
        name: payload.name,
        image: payload.image,
        paragraph: payload.paragraph,
        github: payload.github,
        location: payload.location
      }
      const project = db.collection('projects').doc(payload.id)
      project.update({ ...updateProj })
        .then(() => {
          commit('setpnull', null)
        })
    }
  }
}
