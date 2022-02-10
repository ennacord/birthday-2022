<template>
  <div class="project">
    <div class="project-description">
      <h2>Birthday Artworks</h2>
      <p class="mt-4">
        Some aloupeeps made amazing fanarts for Enna Alouette's birthday!
      </p>
      <p>
        <em>This may take time to load~</em>
      </p>
    </div>
    <div class="project-close">
      <v-btn
        @click="$root.$emit('closeProject')"
        block large elevation="1" color="purple lighten-4">
        Close
      </v-btn>
    </div>
    <div class="project-content">
      <v-container class="content-grid">
        <v-row>
          <v-col
            cols="12" sm="6" lg="4" xl="3"
            v-for="(item, ix) in tweets" :key="`tweet-${ix}`">
            <v-card  elevation="1" shaped>
              <Tweet :id="item"></Tweet>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import { Tweet } from 'vue-tweet-embed';

export default {
  data: () => ({
    source: 'https://vtubertools.sfo3.digitaloceanspaces.com/tribute/enna100k.json',
    tweets: [],
  }),
  mounted() {
    // Load data
    (async () => {
      const fetchSource = await axios.get(this.source).catch(() => null);
      const data = fetchSource && fetchSource.data ? fetchSource.data : {};
      this.tweets = Object.values(data.tweets).map((tweet) => String(tweet.id));
    })();
  },
  components: {
    Tweet,
  },
};
</script>

<style lang="scss" scoped>
.project {
  height:80vh;
  position:relative;
  .project-description {
    position:absolute;
    top: 0;
    left: 0;
    width: 380px;
    bottom: 50px;
    padding:0px 10px 0px 0px;
    .project-credits {
      strong {
        white-space:pre-wrap;
      }
    }
  }
  .project-content {
    position:absolute;
    top: 0;
    left: 400px;
    right: 0;
    bottom: 0;
    overflow-y:scroll;
  }
  .project-close {
    position:absolute;
    left:0;
    bottom:0;
    width:380px;
  }
}
</style>
