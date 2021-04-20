<template>
  <div>
    <div>
      <header-hero/>
    </div>
    <div id="main-part">
      <div>
        <sort-box />
      </div>
    </div>
  </div>
</template>

<script>
import headerHero from '../components/header-hero.vue';
import sortBox from '../components/sort-box.vue';

export default {
  name: 'Home',
  components: {
    headerHero,
    sortBox,
  },
};
</script>

<style scoped>
#main-part {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
