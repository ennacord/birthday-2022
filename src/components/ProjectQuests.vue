<template>
  <div class="project">
    <div class="project-title">
      <h2 class="text-center">Quests</h2>
    </div>
    <div class="project-content">
      <ul>
        <li v-for="(quest, project) in questStatus" :key="`quest-${project}`">
          <input type="checkbox" onclick="return false;" :checked="quest" />
          <span>{{questText[project]}}</span>
        </li>
      </ul>
      <hr class="my-4" />
      <ul>
        <li>
          <input type="checkbox" onclick="return false;" checked />
          <span>Play Button on the wall toggles BGM and SFX</span>
        </li>
        <li>
          <input type="checkbox" onclick="return false;" checked />
          <span>Millie turns the confetti on or off</span>
        </li>
        <li>
          <input type="checkbox" onclick="return false;" checked />
          <span>(Bonus Quest) Blow the candle</span>
        </li>
      </ul>
    </div>
    <div class="project-close">
      <v-btn
        @click="$root.$emit('closeProject')"
        block large elevation="1" color="purple lighten-4">
        Close
      </v-btn>
    </div>
  </div>
</template>

<script>

export default {
  props: ['questStatus'],
  data: () => ({
    questText: {
      aloucast: 'Listen to the Radio',
      rickroll: 'Watch the Television',
      bakingrelay: 'Talk to the Chef Aloupeep',
      bdayvoices: 'Right Aloupeeps voicing their warm wishes',
      gsacover: 'Talk to Nina',
      bdaydance: 'Bottom-left Aloupeep is dancing',
      mural: 'Check the painting the Aloupeeps drew together',
      messages: 'Read birthday cards from Aloupeeps',
      credits: 'Aloupeep with sunglasses on the right',
    },
  }),
};
</script>

<style lang="scss" scoped>
.project {
  height:90vh;
  position:relative;
  .project-title {
    left:0;
    right:0;
  }
  .project-content {
    position:absolute;
    top: 50px;
    left:0;
    right:0;
    bottom:110px;
    overflow-y:scroll;
    background:#f0f0f0;
    padding:10px 20px;
  }
  .project-close {
    position:absolute;
    bottom:40px;
    left:0;
    right:0;
  }
}

ul {
  margin:0;
  padding:0;
  font-size:24px;
  li {
    margin:0;
    padding:0;
    list-style: none;
    input {
      width: 18px;
      height: 18px;
      margin-right:10px;
    }
  }
}
</style>
