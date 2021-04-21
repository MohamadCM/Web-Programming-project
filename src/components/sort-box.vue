<template>
  <div id="sort-box" class="container">
    <div>
    <p class="title">مرتب سازی بر اساس: </p>
    </div>
    <div>
    <button v-for="(btn, index) of buttons"
               :key="btn.text"
               :text="btn.text"
               :color="btn.color"
               @click="selection(index)"
               :back-ground-color="btn.backGroundColor"
                :style="style(index)"
               class="btn btn__box-shadow btn__margin">
      {{btn.text}}
    </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sort-box',
  components: {
  },
  data() {
    return {
      buttons: [{
        text: 'بیشترین فروش',
        backGroundColor: '#00A1FF',
        color: 'white',
      }, {
        text: 'قیمت',
        backGroundColor: 'white',
        color: 'black',
      }],
    };
  },
  methods: {
    selection(buttonIndex) {
      this.buttons[buttonIndex].color = 'white';
      this.buttons[buttonIndex].backGroundColor = '#00A1FF';
      const changeIndex = buttonIndex === 1 ? 0 : 1;
      this.buttons[changeIndex].color = 'black';
      this.buttons[changeIndex].backGroundColor = 'white';
    },
    style(index) {
      // Selection logic and requests
      return `color: ${this.buttons[index].color};
      background-color: ${this.buttons[index].backGroundColor}`;
    },
  },

};
</script>

<style scoped>
/* Overall style */
#sort-box {
  background-color: white;
  text-align: right;
  direction: rtl;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  /* Positions */
  height: 50px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
}
.title {
  font-family: inherit;
  margin-right: 5px;
}
/* Selection button styles */
.btn {
  border-radius: 24px;
  border: none;
  padding: 10px 20px;
  font-family: inherit;
  font-size: inherit;
}
/* Selection button box shadow */
.btn__box-shadow {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
/* Selection button margin */
.btn__margin {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
}
/* Selection button hover */
.btn:hover {
  box-shadow: 0 0 3pt 0.5pt silver;
}
@media (max-width: 500px) {
  .btn {
    padding: 5px 10px;
    margin-top: 10px;
  }
}
/*Flex container*/
.container {
  display: flex;
  flex-direction: row;
}
</style>
