<template>
  <!-- changes to be done -->
  <div class="sidebar">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      permanent
    >
      <div class="background">
        <div class="d-flex justify-content-start">
          <div class="pt-5">
            <v-img width="250px" src="@/assets/images/image (1).png"></v-img>
          </div>
        </div>

        <div class="ml-5 pt-5">
          <v-list nav>
            <!-- dashboard -->
            <v-list-item
              active-class="active-color"
              prepend-icon="mdi-view-dashboard"
              title="Dashboard"
              value="Dashboard"
              @click="$router.push('/dashboard')"
            >
            </v-list-item>

            <!-- employee Management -->
            <v-list-item
              active-class="active-color"
              prepend-icon="mdi mdi-account-group"
              title="Employee Management"
              value="Employee Management"
              @click="$router.push('/employee')"
            >
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
    };
  },
};
</script>
<style lang="scss" scoped>
.active-color {
  background-color: rgb(59, 113, 202);
  color: #ffffff;
}
</style>
