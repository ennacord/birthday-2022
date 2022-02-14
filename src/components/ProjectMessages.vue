<template>
  <div class="project">
    <div class="project-description">
      <h2>Birthday Cards</h2>
      <p class="mt-4">
        Many aloupeeps sincerely wish Enna Alouette a very happy birthday this year!
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
      <div v-masonry transition-duration="0.3s" item-selector=".card">
        <div
          v-masonry-tile
          :class="[ 'card', read[item.name] ? 'card-read' : '' ]"
          v-for="(item, ix) in cards" :key="`card-${ix}`"
          @click="toggleRead(item.name)"
        >
          <div class="binder"></div>
          <div class="card-name text-h6 pr-12 py-2">{{item.name}}</div>
          <div class="card-text text-h6 pr-4 pb-2">{{item.message}}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import twemoji from 'twemoji';

export default {
  data: () => ({
    source: 'https://vtubertools.sfo3.digitaloceanspaces.com/tribute/enna2022.json',
    cards: [],
    read: {},
  }),
  methods: {
    toggleRead(key) {
      if (typeof this.read[key] === 'undefined') this.read[key] = false;
      this.read = { ...this.read, [key]: !this.read[key] };
      localStorage.setItem('read', JSON.stringify(this.read));
    },
  },
  mounted() {
    // Load data
    (async () => {
      if (!localStorage.getItem('read')) localStorage.setItem('read', '{}');
      this.read = JSON.parse(localStorage.getItem('read'));
      const fetchSource = await axios.get(this.source).catch(() => null);
      const data = fetchSource && fetchSource.data ? fetchSource.data : {};
      this.cards = Object.values(data.messages)
        .sort((a, b) => a.time - b.time);
      this.$nextTick(() => {
        twemoji.parse(document.body);
      });
    })();
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

.card {
  background:#FFFFFF;
  position:relative;
  padding-left:20px;
  min-height:100px;
  width:32%;
  margin:10px 0.5%;
  border:2px solid #858ED1;
  .binder {
    background:#858ED1;
    position:absolute;
    top:0px;
    left:0px;
    width:10px;
    height:100%;
  }
  .card-name {
    color:#343c75;
  }
  .card-text {
    white-space: pre-line;
  }
  &.card-read {
    background:#343c75;
    color:#ffffff;
    .card-name {
      color:#ffffff;
    }
  }
}

@media only screen and (max-width: 1264px) {
  .card {
    width:32%;
    margin:10px 0.5%;
  }
}
@media only screen and (max-width: 900px) {
  .card {
    width:48%;
    margin:10px 1%;
  }
}
@media only screen and (max-width: 700px) {
  .card {
    width:96%;
    margin:10px 2%;
  }
}
</style>

<style lang="scss">
.card-text {
  img {
    height:1.4rem;
  }
}
</style>
