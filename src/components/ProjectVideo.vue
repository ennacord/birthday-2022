<template>
  <div class="project">
    <div class="project-description">
      <h3>{{title}}</h3>
      <p>{{description}}</p>
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
  height:86vh;
  position:relative;
  .project-description {
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    overflow:none;
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
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .project-close {
    position:absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 50px;
  }
}
</style>
