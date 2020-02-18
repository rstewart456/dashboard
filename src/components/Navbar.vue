<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <div class="wrap">
        <v-toolbar-title class="text-center">Welcome</v-toolbar-title>
        <v-flex v-if="getuser">
          <transition name="fade">
            <v-flex key="user">
              <img class="imageman" :src="getuser.photoURL" alt="imageman" />
              <v-toolbar-title class="text-center">{{
                getuser.name
              }}</v-toolbar-title>
              <v-flex class="mt-3 mb-4 profile">
                <Profile />
              </v-flex>
            </v-flex>
          </transition>
        </v-flex>
        <div v-else class="guest">
          <transition name="fade">
            <div key="guest">
              <img class="imageman" src="@/assets/man.png" alt="imageman" />
              <v-toolbar-title class="text-center">Guest</v-toolbar-title>
              <p class="text-center">
                thank you for visiting my <br />DashBoard.
              </p>
            </div>
          </transition>
        </div>
      </div>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/projects">
          <v-list-item-action>
            <v-icon>mdi-store</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Projects</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div>
          <Pform />
        </div>
        <div v-if="getuser">
          <v-list-item @click="signOut">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item @click="signIn">
            <v-list-item-action>
              <v-icon>mdi-google</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sign in With Google</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="titbar">Ronald DashBoard</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <transition name="view" appear>
        <router-view></router-view>
        <router-view name="projects"></router-view>
        <router-view name="about"></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Profile from './Profile'
import Pform from './Pform'
export default {
  components: { Profile, Pform },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
  computed: {
    getuser () {
      return this.$store.getters.user
    }
  },
  methods: {
    signIn () {
      this.$store.dispatch('signIn')
    },
    signOut () {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  height: 275px;
  width: 250px;
}
.imageman {
  height: 150px;
  width: 150px;
  margin: 0px 20%;
  border-radius: 50%;
  border: 2px solid red;
}
.profile {
  margin: 0px 25%;
}
.view-enter-active,
.view-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease;
}

.view-enter-active {
  transition-delay: 0.5s;
}

.view-enter {
  opacity: 0;
  transform: translateY(-100px);
}

.view-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.view-enter-to,
.view-leave {
  opacity: 1;
  transform: translateX(0px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-active {
  transition-delay: 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.titbar {
    @media screen and (max-width: 450px) {
    font-size: 16px;
  }
}
</style>
