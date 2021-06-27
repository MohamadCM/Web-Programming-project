<template>
  <div id="loading__main">
    <div class="container">
      <div class="loader">
        <div
          id="a"
          class="circle"
        />
        <div
          id="b"
          class="circle"
        />
        <div
          id="c"
          class="circle"
        />
      </div>
      <div class="caption">
        لطفا منتظر بمانید😉....
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: "Loading"
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.loader {
  width: 200px;
  height: 80px;
  padding-top: 40vh;
  margin: auto;
  display: flex;
}
.circle {
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 50%;
  animation: jump 1s linear infinite;
  margin: 0 15px;
  background: linear-gradient( #185a9d,#43cea2);
}
.caption {
  margin: auto;
  font-size: 20px;
  color: black;
}
#b {
  animation-delay: 0.2s;
}
#c {
  animation-delay: 0.4s;
}
@keyframes jump {
  0% {
    margin-top: 0;
  }
  35% {
    margin-top: -75px;
  }
  70% {
    margin-top: 0;
  }
}
</style>
