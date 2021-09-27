<template>
  <v-list>
    <v-list-item
      v-for="item in getUrlsList()"
      :key="item.hash"
      :href="item.originUrl"
    >
      <v-list-item-content>
        <v-list-item-title v-text="item.shortUrl"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
import UrlShortener from '~/services/backendMock'

export default {
  computed: {
    ...mapState(['userLogged']),
  },
  methods: {
    getUrlsList() {
      if (!this.userLogged) {
        return
      }

      return UrlShortener.getDatabaseUsersByUserId(this.userLogged.id)
    },
  },
}
</script>
