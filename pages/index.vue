<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <url-form class="urlForm" />

      <div class="list mt-10">
        <div class="list__title pl-4">
          Previously generated short urls
        </div>
        <list-urls class="list__listUrls" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import UrlForm from '~/components/UrlForm.vue'
import ListUrls from '~/components/ListUrls.vue'

export default {
  components: {
    UrlForm,
    ListUrls
  }
}
</script>

<style lang="scss" scoped>
.list__title {
  color: #012a35;
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
