<template>
  <div
    id="sort-box"
    class="container"
  >
    <div>
      <p class="title">
        مرتب سازی بر اساس:
      </p>
    </div>
    <div>
      <button
        v-for="(btn, index) of buttons"
        :key="btn.text"
        :style="style(index)"
        class="btn btn__box-shadow btn__margin"
        @click="selection(index)"
      >
        {{ btn.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
	name: "SortBox",
	components: {
	},
	data() {
		return {
			buttons: [{
				text: "بیشترین فروش",
				backGroundColor: "#00A1FF",
				color: "white"
			}, {
				text: "قیمت",
				backGroundColor: "white",
				color: "black"
			}, {
				text: "تاریخ ایجاد محصول",
				backGroundColor: "white",
				color: "black"
			}]
		};
	},
	methods: {
		selection(buttonIndex) {
			// Selection logic and requests
			this.buttons[buttonIndex].color = "white";
			this.buttons[buttonIndex].backGroundColor = "#00A1FF";
			for (let i = 0; i < this.buttons.length; i++) {
				if(i !== buttonIndex){
					this.buttons[i].color = "black";
					this.buttons[i].backGroundColor = "white";
				}
			}
			this.$emit("input", buttonIndex);
		},
		style(index) {
			return `color: ${this.buttons[index].color};
      background-color: ${this.buttons[index].backGroundColor}`;
		}
	}

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
  -webkit-transition: 200ms;
}
/* Selection button box shadow */
.btn__box-shadow {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
/* Selection button margin */
.btn__margin {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 3px;
}
/* Selection button hover */
.btn:hover {
  box-shadow: 0 0 3pt 0.5pt silver;
}
@media (max-width: 600px) {
  .btn {
    padding: 5px 10px;
    margin-top: 12px;
    font-size: 12px;
  }
}
/*Flex container*/
.container {
  display: flex;
  flex-direction: row;
}
</style>
