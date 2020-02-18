<template>
  <div class="wrapper">
    <div class="pa-12">
      <h1 class="header1 font-weight-bold">Thank you for coming to my Dashboard</h1><br>
      <p class="p1">This Dashboard is using Vue for the front end and firestore for database, authentication, and storage. Only the owner of this DashBoard can create, delete, and update project cards.</p>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header1 {
  font-size: 80px;
  @media screen and (max-width: 450px) {
  font-size: 48px;
  }
}
.p1 {
  font-size: 52px;
  @media screen and (max-width: 450px) {
    font-size: 24px;
  }
}
</style>
