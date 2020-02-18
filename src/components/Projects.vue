<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-card
              v-for="project in getprojects"
              :key="project.id"
              max-width="360"
              class="mx-auto my-8 white"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="black--text">{{
                    project.name
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-img :src="project.image" height="194"></v-img>
              <v-card-text class="black--text parag">{{
                project.paragraph
              }}</v-card-text>
              <v-card-actions>
                <v-btn text color="deep-purple accent-4" :href="project.github"
                  >Github</v-btn
                >
                <v-btn
                  text
                  color="deep-purple accent-4"
                  @click.prevent="liveDemo(project.location)"
                  >Live Demo</v-btn
                >
                <v-btn
                  text
                  color="deep-purple accent-4"
                  @click.prevent="edit(project)"
                  >Edit</v-btn
                >
                <v-btn
                  text
                  color="deep-purple accent-4"
                  @click.prevent="pdelete(project.id)"
                  >Delete</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <h2>Update Project</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-text-field
              label="Name"
              v-model="name"
              @keydown.enter="Submit"
            ></v-text-field>
            <v-textarea
              name="input-7-1"
              label="Image"
              v-model="image"
              @keydown.enter="Submit"
            ></v-textarea>
            <v-textarea
              name="input-7-1"
              label="Paragraph"
              v-model="paragraph"
              @keydown.enter="Submit"
            ></v-textarea>
            <!-- <v-text-field label="Paragraph" v-model="paragraph" @keydown.enter="Submit" ></v-text-field> -->
            <v-text-field
              label="Github"
              v-model="github"
              @keydown.enter="Submit"
            ></v-text-field>
            <v-text-field
              label="Location"
              v-model="location"
              @keydown.enter="Submit"
            ></v-text-field>
            <v-btn color="green lighten-2" @click="Submit">Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="demo"
      fullscreen
      hide-overlay
      scrollable
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <div class="wdemo">
            <v-btn icon dark @click="demo = false">
              <v-icon>mdi-close</v-icon>
              Close
            </v-btn>
          </div>
        </v-toolbar>
        <iframe class="demo" :src="location"></iframe>
      </v-card>
    </v-dialog>
    <v-dialog v-model="Pdelete" max-width="290">
      <v-card>
        <v-card-title class="headline">Alart </v-card-title>
        <v-card-text>
          Are you sure you want to delete this Project
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="projectDelete">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      demo: false,
      dialog: false,
      Pdelete: false,
      id: '',
      name: '',
      image: '',
      paragraph: '',
      github: '',
      location: ''
    }
  },
  computed: {
    getprojects () {
      return this.$store.getters.projects
    },
    getuser () {
      return this.$store.getters.user
    }
  },
  methods: {
    projectDelete () {
      this.$store.dispatch('projectDelete', this.id)
      this.Pdelete = false
    },
    pdelete (id) {
      this.Pdelete = true
      this.id = id
    },
    edit (project) {
      this.id = project.id
      this.name = project.name
      this.image = project.image
      this.paragraph = project.paragraph
      this.github = project.github
      this.location = project.location
      this.dialog = true
    },
    Submit () {
      this.$store.dispatch('updateProject', {
        id: this.id,
        name: this.name,
        image: this.image,
        paragraph: this.paragraph,
        github: this.github,
        location: this.location
      })
      this.dialog = false
    },
    liveDemo (location) {
      this.location = location
      this.demo = true
    }
  }
}
</script>

<style lang="scss">
.parag {
  height: 100px;
}
.demo {
  height: 100vh;
  width: 98.9vw;
}
.wdemo {
  margin: auto auto;
}
</style>
