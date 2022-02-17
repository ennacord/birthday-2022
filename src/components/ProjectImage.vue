<template>
  <div class="project">
    <div class="project-description">
      <h2>Drawing Board</h2>
      <p>Some aloupeeps drew their greetings on a shared community board!</p>
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
  height:86vh;
  position:relative;
  .project-description {
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
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
    top: 70px;
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
