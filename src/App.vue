<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">خانه</router-link> |
      <router-link to="/about">درباره</router-link>
      <button>خانه</button>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

@font-face {
  font-family: "IranianSans";
  src: local("IranianSans"),   url(../public/IranianSans.ttf) format("truetype");}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
