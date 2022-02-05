<template>
  <div class="project">
    <div class="project-description">
      <h2>{{title}}</h2>
      <p v-id="description" class="mt-4">{{description}}</p>
      <p v-if="warnings">
        Notices: <strong class="red--text text--darken-3">{{warnings}}</strong>
      </p>
      <p v-if="lead">
        Project Lead: <strong>{{lead}}</strong>
      </p>
      <p v-if="credits">
        Contributors: <strong>{{credits}}</strong>
      </p>
    </div>
    <div class="project-close">
      <v-btn
        @click="$root.$emit('closeProject')"
        block large elevation="1" color="purple lighten-4">
        Close
      </v-btn>
    </div>
    <div class="project-content text-right">
      <iframe
        width="100%" height="100%"
        :src="video"
        frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'description', 'warnings', 'lead', 'credits', 'video'],
  data: () => ({
    //
  }),
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
    overflow-y:scroll;
    padding:0px 10px 0px 0px;
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
    width:380px;
  }
}
</style>
