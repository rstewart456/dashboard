<template>
  <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
          <v-list-item
          v-on="on">
          <v-list-item-action>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add Project</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-card>
          <v-card-title>
              <h2>Add Project</h2>
          </v-card-title>
          <v-card-text>
              <v-form class="px-3">
                  <v-text-field label="Name" v-model="name"  @keydown.enter="Submit" ></v-text-field>
                  <template>
                    <v-file-input label="Screen Shot" v-model="image"></v-file-input>
                  </template>
                    <v-textarea name="input-7-1" label="Paragraph" v-model="paragraph" @keydown.enter="Submit"></v-textarea>
                  <!-- <v-text-field label="Paragraph" v-model="paragraph" @keydown.enter="Submit" ></v-text-field> -->
                  <v-text-field label="Github" v-model="github" @keydown.enter="Submit" ></v-text-field>
                  <v-text-field label="Location" v-model="location" @keydown.enter="Submit" ></v-text-field>
                    <v-btn color="green lighten-2" @click="Submit">Add</v-btn>
              </v-form>
          </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      name: '',
      image: null,
      paragraph: '',
      github: '',
      location: ''
    }
  },
  methods: {
    Submit () {
      this.$store.dispatch('addproject',
        {
          name: this.name,
          image: this.image,
          paragraph: this.paragraph,
          github: this.github,
          location: this.location
        })
      this.dialog = false
    }
  }
}
</script>

<style>

</style>
