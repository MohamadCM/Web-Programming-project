<template>
<div class="header-hero">
  <div>
  <p id="title">در محصولات سایت جستجو کنید...</p>
  </div>
  <div>
  <input type="text"
         class="text-field"
         onfocus="placeholder = ''"
         onblur="placeholder = 'نام محصول خود را وارد کنید...'"
         :placeholder="placeholder">
  </div>
  <div>
  <button class="button-search">جستجو کنید</button>
  </div>
  <div>
    <img id="image-clock" src="../assets/clock.png" alt="Tick toc..."/>
  </div>
</div>
</template>

<script>
export default {
  name: 'header-hero',
  data() {
    return {
      placeholder: 'نام محصول خود را وارد کنید...',
    };
  },
};
</script>

<style scoped>
/*Overall style*/
.header-hero {
  background: #FA583B;
  width: 100%;
  min-height: 85px;
  overflow: hidden;
  text-align: center;
}
/* Title overall style*/
#title {
  font-size: 32px;
  color: white;
  direction: inherit;
  font-family: inherit;
  width: 100%;
}
/* text input overall style */
.text-field {
  border-radius: 24px;
  font-family: inherit;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  width: 55%;
  height: 32px;
  text-align: center;
  outline: none;
  border: 0 solid;
  /* Animation */
  -webkit-transition: 0.5s;
  /* Margin for spacing */
  margin-top: 40px;
}
/* Box shadow on hover */
.text-field:hover {
  box-shadow: 0 0 3pt 0.5pt #D3D3D3;
}
/* Search button overall style */
.button-search{
  background: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  font-family: inherit;
  font-size: 16px;
  border-radius: 24px;
  border: 0 solid;
  background: #FFC80C;
  padding: 13px 3%;
  /* Margin for spacing */
  margin-top: 35px;
  /* Animation */
  -webkit-transition: 0.3s;
}
/* Box shadow on hover */
.button-search:hover{
  box-shadow: 0 0 3pt 0.5pt yellow;
}
/* Image styles and sizing */
#image-clock{
  position: relative;
  bottom: -10px;
  max-width: 100%;
  height: auto;
}
</style>
