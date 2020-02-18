<template>
  <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
        <v-btn
          color="green lighten-2"
          dark
          v-on="on"
        >
          Edit Name
        </v-btn>
      </template>
      <v-card>
          <v-card-title>
              <h2>Edit Name</h2>
          </v-card-title>
          <v-card-text>
              <v-form
              ref="form"
              class="px-3"
              >
                  <v-text-field
                  v-model="name"
                  :rules= "rules"
                  counter="30"
                  @keydown.enter.prevent="Submit"
                  >
                  </v-text-field>
                    <v-btn
                    color="green lighten-2"
                    @click="Submit">
                    Update
                    </v-btn>
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
      rules: [
        v => v.length >= 2 || 'Minimum lenght is 2',
        v => v.length <= 30 || 'Maximum lenght is 30'
      ],
      name: '',
      id: ''
    }
  },
  methods: {
    Submit () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('updateuser', { name: this.name, id: this.id })
        this.dialog = false
        event.preventDefault()
      }
    }
  },
  mounted () {
    this.name = this.$store.getters.user.name
    this.id = this.$store.getters.user.id
  }
}
</script>

<style lang="scss" scoped>

</style>
