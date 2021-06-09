<template>
  <button
    class="btn"
    :style="style"
    @mouseover="mouseOver"
    @mouseout="mouseOver"
    @click="onClickFunction"
  >
    <slot />
    {{ text }}
  </button>
</template>

<script>
export default {
	name: "MyButton",
	props: {
		text: {
			type: String,
			default: "دکمه"
		},
		fill: {
			type: Boolean,
			default: true
		},
		color: {
			type: String,
			default: "#00A1FF"
		},
		backGroundColor: {
			type: String,
			default: "transparent"
		},
		onClickFunction: {
			type: Function,
			default: () => {}
		}
	},
	data() {
		return {
			hovering: false
		};
	},
	computed: {
		style() {
			return `color: ${this.hovering ? this.color : "black"};
      background-color: ${this.backGroundColor}`;
		}
	},
	methods: {
		mouseOver() {
			this.hovering = !this.hovering;
		}
	}
};

</script>

<style scoped>
/* Overall styles */
.btn {
  margin: 30px auto;
  background: none;
  box-shadow: none;
  font-family: inherit;
  font-size: 15px;
  padding: 0.0% 1.5%;
  border-radius: 24px;
  border: 0 solid;
}
@media (max-width: 560px) {
  /* Smaller font on smaller screens */
  .btn {
    font-size: 12px;
  }
}
</style>
