<template>
  <v-app id="app">
    <div id="game-container" ref="game-container"></div>
    <v-dialog id="projects" v-model="dialog"
      elevation="0" overlay-color="purple darken-4" overlay-opacity="0.85">
      <v-card tile class="pa-4">
        <div v-if="openProject === 'bakingrelay'" class="project text-center">
          <iframe
            width="100%" height="100%"
            src="https://www.youtube.com/embed/gj4cVOgEGGM"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        <div v-if="openProject === 'gsacover'" class="project">
          <div class="project-description">
            <h2>Baking Relay</h2>
            <p class="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque eu semper nulla. Suspendisse lectus odio,
              venenatis vitae enim non, eleifend mollis libero.
              Nulla nec tempor erat.
            </p>
            <p>
              Project Lead: <strong>BONER</strong>
            </p>
            <p>
              Contributors: <strong>Lorem, ipsum dolor, sit amet, consectetur, adipiscing, elit,
              Pellentesque, eu semper, nulla, Suspendisse, lectus odio,
              venenatis, vitae, enim non, eleifend, mollis, libero,
              Nulla, nec tempor, erat</strong>
            </p>
          </div>
          <div class="project-close">
            <v-btn
              @click="dialog = false"
              block large elevation="1" color="purple lighten-4">
              Close
            </v-btn>
          </div>
          <div class="project-content text-right">
            <iframe
              width="100%" height="100%"
              src="https://www.youtube.com/embed/gj4cVOgEGGM"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
        </div>
        <div v-if="openProject === 'aloucast'" class="project">
          <iframe
            width="100%" height="100%"
            src="https://www.youtube.com/embed/gj4cVOgEGGM"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        <div v-if="openProject === 'rickroll'" class="project text-center">
          <iframe
            width="100%" height="100%"
            src="https://www.youtube.com/embed/gj4cVOgEGGM"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        <div v-if="openProject === 'mural'" class="project text-center">
          <v-img
            contain
            src="https://100k.ennaalouette.com/img/mural.4f63dd0c.jpg"
          ></v-img>
        </div>
        <div v-if="openProject === 'messages'" class="project text-center">
          messages
        </div>
        <div v-if="openProject === 'gallery'" class="project text-center">
          twitter hashtag gallery
        </div>
        <div v-if="openProject === 'quests'" class="project text-center">
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
  .v-dialog {
    overflow:hidden;
  }
  .project {
    height:80vh;
    position:relative;
    .project-description {
      position:absolute;
      top: 0;
      left: 0;
      width: 360px;
      bottom: 50px;
      overflow-y:scroll;
    }
    .project-content {
      position:absolute;
      top: 0;
      left: 400px;
      right: 0;
      bottom: 0;
    }
    .project-close {
      position:absolute;
      left:0;
      bottom:0;
      width:360px;
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
