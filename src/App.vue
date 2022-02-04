<template>
  <v-app id="app">
    <div id="game-container" ref="game-container"></div>
    <v-dialog v-model="dialog" id="projects" elevation="0">
      <v-card tile class="pa-4">
        <div v-if="openProject === 'bakingrelay'" class="text-center">
          <iframe
            width="854" height="480"
            src="https://www.youtube.com/embed/gj4cVOgEGGM"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        <div v-if="openProject === 'gsacover'" class="text-center">
          <iframe
            width="854" height="480"
            src="https://www.youtube.com/embed/gj4cVOgEGGM"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        <div v-if="openProject === 'aloucast'" class="text-center">
          <iframe
            width="854" height="480"
            src="https://www.youtube.com/embed/gj4cVOgEGGM"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        <div v-if="openProject === 'rickroll'" class="text-center">
          <iframe
            width="854" height="480"
            src="https://www.youtube.com/embed/gj4cVOgEGGM"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        <div v-if="openProject === 'mural'" class="text-center">
          <v-img
            contain
            src="https://100k.ennaalouette.com/img/mural.4f63dd0c.jpg"
            height="80vh"
          ></v-img>
        </div>
        <div v-if="openProject === 'messages'" class="text-center">
          messages
        </div>
        <div v-if="openProject === 'gallery'" class="text-center">
          twitter hashtag gallery
        </div>
        <div v-if="openProject === 'quests'" class="text-center">
          quests
        </div>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import EnnaBirthday from './game';

export default {
  data: () => ({
    dialog: false,
    openProject: null,
  }),
  mounted() {
    // Start game instance
    // eslint-disable-next-line no-new
    new EnnaBirthday('game-container', this);

    // Device layout
    if (this.$isMobile) {
      // No scrollbar
      document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
      // Game mobile class
      this.$refs['game-container'].classList.add('mobile');
    } else {
      // Game desktop class
      this.$refs['game-container'].classList.add('desktop');
    }
  },
};
</script>

<style lang="scss">
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
body {
  background-color:#858ED1;
  #app {
    background:none;
  }
  #projects {
    .aspectRatio {
      width:100%;
      height:100%;
      div {
        width: 100%;
        padding-bottom: 43.75%;
        background:#fcc;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
#game-container {
  width:100vw;
  height:100vh;
}
</style>
