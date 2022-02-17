<template>
  <div class="project">
    <div class="project-description">
      <h2>Birthday Cards</h2>
      <p>
        Many aloupeeps sincerely wish Enna Alouette a very happy birthday this year!
      </p>
      <p class="blue--text">
        PROTIP: Click on a card to mark it as read. It will persist even across website visits.
        <span class="red--text font-weight-bold">Read messages:  {{countRead}} / {{countAll}}</span>
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
          <div class="card-text text-body-1 pr-4 pb-2">{{item.message}}</div>
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
    countRead: 0,
    countAll: 0,
  }),
  methods: {
    toggleRead(key) {
      if (typeof this.read[key] === 'undefined') this.read[key] = false;
      this.read = { ...this.read, [key]: !this.read[key] };
      localStorage.setItem('enna2022_read', JSON.stringify(this.read));
      this.countRead = Object.values(this.read).filter((v) => !!v).length;
    },
  },
  mounted() {
    // Load data
    (async () => {
      if (!localStorage.getItem('enna2022_read')) localStorage.setItem('enna2022_read', '{}');
      this.read = JSON.parse(localStorage.getItem('enna2022_read'));
      this.countRead = Object.values(this.read).filter((v) => !!v).length;
      const fetchSource = await axios.get(this.source).catch(() => null);
      const data = fetchSource && fetchSource.data ? fetchSource.data : {};
      this.cards = Object.values(data.messages)
        .sort((a, b) => a.time - b.time);
      this.countAll = this.cards.length;
      this.$nextTick(() => {
        twemoji.parse(document.body);
      });
    })();
  },
};
</script>

<style lang="scss" scoped>
.project {
  height:86vh;
  position:relative;
  .project-description {
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    overflow:hidden;
    h3 {
      padding:0;
      margin:0;
    }
    p {
      padding:0;
      margin:0;
    }
  }
  .project-content {
    position:absolute;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 0;
    background:#c1c5dd;
    overflow-y:scroll;
  }
  .project-close {
    position:absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 50px;
  }
}

.card {
  background:#FFFFFF;
  position:relative;
  padding-left:20px;
  min-height:100px;
  width:24%;
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

@media only screen and (max-width: 1800px) {
  .card {
    width:32%;
    margin:10px 0.5%;
  }
}
@media only screen and (max-width: 1264px) {
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

@media only screen and (max-width: 900px) {
  .project {
    .project-description { display:none; }
    .project-content { left:100px; }
    .project-close {
      position:absolute;
      top:40%;
      left:0;
      bottom:0;
      right:auto;
      width:90px;
    }
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
