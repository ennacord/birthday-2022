<template>
  <div>
    <v-img contain :src="image" @click="$root.$emit('closeProject')" />
  </div>
</template>

<script>
export default {
  props: ['image'],
  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>

</style>
