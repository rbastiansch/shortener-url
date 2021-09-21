<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <search />
    </v-col>
  </v-row>
</template>

<script>
import Search from '~/components/Search.vue'

export default {
  components: {
    Search
  }
}
</script>
