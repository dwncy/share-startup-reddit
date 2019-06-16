<template>
  <ClipLoader />
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import { handleAuthentication } from '../utils/auth'

export default {
  components: {
    ClipLoader
  },
  async created() {
    if (handleAuthentication()) {
      this.$router.push("/");
    }
  }
};
</script>
