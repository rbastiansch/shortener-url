<template>
  <v-app class="defaultApp">
    <v-app-bar
      app
      dense
      flat
      class="defaultApp__bar"
    >
      <div class="defaultApp__bar__content d-flex justify-space-between">
        <v-app-bar-title
          v-if="isLogged"
          width
          class="defaultApp__bar__content__title"
        >
          {{ userLogged.email }} is online
        </v-app-bar-title>
        <v-btn
          v-else
          text
          color="#00dc82"
          to="/signin"
        >
          SignIn
        </v-btn>
        <v-btn
          v-if="isLogged"
          text
          color="#00dc82"
          @click="logout"
        >
          Logout
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="pt-10">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['userLogged']),
    isLogged () {
      return !!this.userLogged
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('currentUser')
      this.$store.commit('removeUserLogged')
    }
  }
}
</script>

<style lang="scss" scoped>
.defaultApp__bar {
  background-color: #001e26 !important;
}
.defaultApp__bar__content {
  width: 100%;
}
.defaultApp__bar__content__title {
  color: #00dc82;
}
</style>
