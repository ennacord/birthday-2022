<template>
  <div class="project">
    <div class="project-description">
      <h2>Drawing Board</h2>
      <p class="mt-4">
        Some aloupeeps drew their greetings on a shared community board!
      </p>
    </div>
    <div class="project-close">
      <v-btn
        @click="$root.$emit('closeProject')"
        block large elevation="1" color="purple lighten-4">
        Close
      </v-btn>
    </div>
    <div class="project-content" ref="container">
      <v-img
        contain
        :max-height="maxHeight"
        @load="onImgLoaded"
        @click="onImgClick"
        :src="image"  />
    </div>
  </div>
</template>

<script>
export default {
  props: ['image'],
  data: () => ({
    maxHeight: 480,
  }),
  methods: {
    onImgLoaded() {
      console.log(this.$refs.container.clientHeight);
      this.maxHeight = this.$refs.container.clientHeight;
    },
    onImgClick() {
      window.open(this.image);
    },
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
    overflow:auto;
  }
  .project-close {
    position:absolute;
    left:0;
    bottom:0;
    width:380px;
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
