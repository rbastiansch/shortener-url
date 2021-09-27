<template>
  <div class="urlForm">
    <div class="urlForm__grid">
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
      class="urlForm__result"
    >
      <span class="urlForm__result__title mr-1">
        Generated Url:
      </span>
      <span class="urlForm__result__link mr-2">
        {{ urlGenerated }}
      </span>
      <v-btn
        icon
        class="urlForm__result__clipboard"
        color="#001e26"
        @click="copyText(urlGenerated)"
      >
        <v-icon size="20px">mdi-clipboard-multiple-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import UrlShortener from '~/services/backendMock'

export default {
  name: 'UrlForm',
  data () {
    return {
      input: null,
      urlGenerated: null
    }
  },
  methods: {
    generateUrl () {
      this.urlGenerated = UrlShortener.createUrl(this.input)
      this.$store.dispatch('loadSavedUrls')
      this.input = null
    },
    copyText (text) {
      navigator.clipboard.writeText(text)
    }
  }
}
</script>

<style lang="scss" scoped>
.urlForm__grid {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 25px;
  align-items: center;
}

.urlForm__grid .v-btn {
  color: white;
}

.urlForm__result__title {
  color: #012a35;
  font-size: 1rem;
  font-weight: 500;
}
</style>
