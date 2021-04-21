<template>
  <div>
    <div>
      <header-hero/>
    </div>
    <div id="main-part">
      <div>
        <sort-box />
      </div>
      <div class="filter-box">
        <filter-box />
      </div>
    </div>
  </div>
</template>

<script>
import headerHero from '../components/header-hero.vue';
import sortBox from '../components/sort-box.vue';
import filterBox from '../components/filter-box.vue';

export default {
  name: 'Home',
  components: {
    headerHero,
    sortBox,
    filterBox,
  },
};
</script>

<style scoped>
#main-part {
  margin-left: 10px;
  margin-right: 10px;
  overflow: auto;
}
.filter-box {
  width: 25%;
}
@media (max-width: 680px) {
  .filter-box{
    width: 100%;
  }
}
</style>
