<template>
  <v-list>
    <v-list-item
      v-for="item in userUrls"
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

export default {
  computed: {
    ...mapState(['userLogged', 'userUrls']),
  },
  mounted() {
    this.getUrlsList()
  },
  methods: {
    getUrlsList() {
      this.$store.dispatch('loadSavedUrls')
    },
  },
}
</script>
