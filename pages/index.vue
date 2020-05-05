<template>
  <div class="container">
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <h1 class="title">
        Welcome
      </h1>
      <h2 class="subtitle">
        Logged in as {{ userInfo.user.friendly_name }}
      </h2>

      <hr>

      Create new:

      <form @submit.prevent="create"
            class="mt-3 mb-3">
        <div class="form-group">
          <label>Name</label>
          <input class="form-control" type="text" v-model="story.name" />
        </div>
        <div class="form-group">
          <label>Slug</label>
          <input class="form-control" type="text" v-model="story.slug" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>

      <hr>

      Stories (<a href="#" @click.prevent="loadStories">Reload</a>):
      <div v-for="story in stories"
           :key="story.id">
        {{ story.name }} ({{ story.full_slug }})
      </div>
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
      loading: true,
      stories: [],
      story: {name: '', slug: ''},
      userInfo: {
        user: {}
      }
    }
  },
  mounted() {
    if (window.top == window.self) {
      window.location.assign('https://app.storyblok.com/oauth/app_redirect')
    } else {
      this.loadStories()
      this.loadUserInfo()
    }
  },
  methods: {
    create() {
      this.loading = true
      axios.post(`/auth/explore/${this.$route.query.space_id}/stories`, {story: this.story})
        .then((res) => {
          this.loadStories()
        })
    },
    loadStories() {
      this.loading = true
      axios.get(`/auth/explore/${this.$route.query.space_id}/stories`)
        .then((res) => {
          this.loading = false
          this.stories = res.data.stories
        })
    },
    loadUserInfo() {
      axios.get(`/auth/user_info`)
        .then((res) => {
          this.userInfo = res.data
        })
    }
  }
}
</script>

<style>
.container {
  margin: 20px auto;
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
  margin-top: 20px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
