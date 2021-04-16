<template>
  <button class="btn"
          :style="style"
          @mouseover="mouseOver"
          @mouseout="mouseOver"
          >
    {{text}}
  </button>
</template>

<script>
export default {
  name: 'my-button',
  data() {
    return {
      hovering: false,
    };
  },
  props: {
    text: {
      type: String,
      default: 'دکمه',
    },
    fill: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '#00A1FF',
    },
  },
  methods: {
    mouseOver() {
      this.hovering = !this.hovering;
    },
  },
  computed: {
    style() {
      return `color: ${this.hovering ? '#0EBAC5' : 'black'};
      background-color: ${this.color}`;
    },
  },
};

</script>

<style scoped>
.btn {
  margin: 30px auto;
  background: none;
  box-shadow: none;
  font-family: inherit;
  font-size: 15px;
  padding: 0.7% 1.5%;
  border-radius: 20px;
  border: 0 solid;
}
</style>
