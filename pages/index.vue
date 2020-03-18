<template>
  <div class="container">
    <div>
      <logo class="mx-auto" />
      <h1 class="title">
        storyblok-nuxt-auth
      </h1>
      {{stories}}
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'

export default {
  components: {
    Logo
  },
  data() {
    return {
      stories: []
    }
  },
  mounted() {
    if (window.top == window.self) {
      window.location.assign('https://app.storyblok.com/oauth/app_redirect')
    } else {
      this.loadStories()
    }
  },
  methods: {
    loadStories() {
      axios.get(`/auth/explore/${this.$route.query.space_id}/stories`)
        .then((res) => {
          this.stories = res.data.stories
        })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
