<template>
  <div>
    <v-text-field v-model="input" />
    <v-btn @click="generateUrl">
      Generate Url
    </v-btn>

    <div v-if="urlGenerated">
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
      const result = UrlShortener.createUrl(this.input)

      this.urlGenerated = result

      console.log(result)
    }
  }
}
</script>