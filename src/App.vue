<template>
  <v-app id="app">
    <div id="game-container" ref="game-container"></div>
    <v-dialog id="projects" v-model="dialog"
      elevation="0" overlay-color="purple darken-4" overlay-opacity="0.85">
      <v-card tile class="pa-4">
        <ProjectVideo
          v-if="openProject === 'bakingrelay'"
          title="Baking Relay"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque eu semper nulla. Suspendisse lectus odio,
            venenatis vitae enim non, eleifend mollis libero.
            Nulla nec tempor erat."
          lead="BONER"
          credits="Lorem, ipsum dolor, sit amet, consectetur, adipiscing, elit,
            Pellentesque, eu semper, nulla, Suspendisse, lectus odio,
            venenatis, vitae, enim non, eleifend, mollis, libero,
            Nulla, nec tempor, erat"
          video="https://www.youtube.com/embed/gj4cVOgEGGM"
          :dialog="dialog"
        ></ProjectVideo>

        <ProjectVideo
          v-if="openProject === 'gsacover'"
          title="God Sees All (Aloupeeps Cover)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque eu semper nulla. Suspendisse lectus odio,
            venenatis vitae enim non, eleifend mollis libero.
            Nulla nec tempor erat."
          lead="Dippy"
          credits="Lorem, ipsum dolor, sit amet, consectetur, adipiscing, elit,
            Pellentesque, eu semper, nulla, Suspendisse, lectus odio,
            venenatis, vitae, enim non, eleifend, mollis, libero,
            Nulla, nec tempor, erat"
          video="https://www.youtube.com/embed/gj4cVOgEGGM"
        ></ProjectVideo>

        <ProjectVideo
          v-if="openProject === 'aloucast'"
          title="AlouCast (Birthday Special)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque eu semper nulla. Suspendisse lectus odio,
            venenatis vitae enim non, eleifend mollis libero.
            Nulla nec tempor erat."
          lead="Domo Espresso, DarkDisasterKid"
          credits="Lorem, ipsum dolor, sit amet, consectetur, adipiscing, elit,
            Pellentesque, eu semper, nulla, Suspendisse, lectus odio,
            venenatis, vitae, enim non, eleifend, mollis, libero,
            Nulla, nec tempor, erat"
          video="https://www.youtube.com/embed/gj4cVOgEGGM"
        ></ProjectVideo>

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
import ProjectVideo from '@/components/ProjectVideo.vue';
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

    // Close Project
    this.$root.$on('closeProject', () => {
      this.dialog = false;
    });
  },
  components: {
    ProjectVideo,
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
}
</style>

<style lang="scss" scoped>
#game-container {
  width:100vw;
  height:100vh;
}
</style>
