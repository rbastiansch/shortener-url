<template>
  <div class="search">
    <div class="search__grid">
      <v-text-field v-model="input" />
      <v-btn
        color="#012a35"
        @click="generateUrl"
      >
        Generate Url
      </v-btn>
    </div>

    <div
      v-if="urlGenerated"
      class="search__result"
    >
      Generated Url: {{ urlGenerated }}
    </div>
  </div>
</template>

<script>
import UrlShortener from '~/services/backendMock'

export default {
  name: 'Search',
  data () {
    return {
      input: null,
      urlGenerated: null
    }
  },
  methods: {
    generateUrl () {
      this.urlGenerated = UrlShortener.createUrl(this.input)
    }
  }
}
</script>

<style lang="scss" scoped>
.search__grid {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-column-gap: 25px;
    align-items: center;
}

.search__grid .v-btn {
  color: white;
}
</style>