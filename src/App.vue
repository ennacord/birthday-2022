<template>
  <v-app id="app">
    <div id="game-container" ref="game-container"></div>
    <v-dialog id="projects" v-model="dialog"
      :max-width="dialogWidth"
      elevation="0" overlay-color="purple darken-4" overlay-opacity="0.85">
      <v-card tile class="pa-4">
        <div v-for="(project, projectKey) in ProjectList" :key="projectKey">
          <ProjectVideo
            v-if="openProject === projectKey"
            :title="project.title"
            :description="project.description"
            :warnings="project.warnings"
            :lead="project.lead"
            :credits="project.credits"
            :video="project.video"
          ></ProjectVideo>
        </div>
        <div v-if="openProject === 'mural'">
          <ProjectImage image="https://100k.ennaalouette.com/img/mural.4f63dd0c.jpg" />
        </div>
        <div v-if="openProject === 'messages'">
          <ProjectMessages/>
        </div>
        <div v-if="openProject === 'gallery'">
          <ProjectTwitter/>
        </div>
        <div v-if="openProject === 'credits'">
          <ProjectCredits/>
        </div>
        <div v-if="openProject === 'quests'">
          <ProjectQuests :questStatus="questStatus" />
        </div>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import ProjectList from '@/data/projects';
import ProjectVideo from '@/components/ProjectVideo.vue';
import ProjectImage from '@/components/ProjectImage.vue';
import ProjectMessages from '@/components/ProjectMessages.vue';
import ProjectTwitter from '@/components/ProjectTwitter.vue';
import ProjectCredits from '@/components/ProjectCredits.vue';
import ProjectQuests from '@/components/ProjectQuests.vue';
import EnnaBirthday from './game';

export default {
  data: () => ({
    dialog: false,
    openProject: null,
    ProjectList,
    dialogWidth: '80vw',
    questStatus: {
      aloucast: false,
      rickroll: false,
      bakingrelay: false,
      bdayvoices: false,
      gsacover: false,
      bdaydance: false,
      mural: false,
      messages: false,
      gallery: false,
      credits: false,
      cake: false,
    },
  }),
  watch: {
    dialog(val) {
      if (!val) {
        this.$root.$emit('projectClosed');
        this.openProject = null;
      } else {
        this.dialogWidth = { credits: 660, quests: 700 }[this.openProject] || '90vw';
      }
    },
    openProject(val) {
      if (typeof this.questStatus[val] !== 'undefined') {
        this.questStatus[val] = true;
      }
    },
  },
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
    ProjectImage,
    ProjectMessages,
    ProjectTwitter,
    ProjectCredits,
    ProjectQuests,
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
