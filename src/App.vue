<template>
  <Navbar />
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  created () {
    this.$store.dispatch('authuser')
    this.$store.dispatch('getprojects')
    this.$store.dispatch('getawards')
  }
}
</script>

<style>

</style>
