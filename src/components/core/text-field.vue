<template>
  <div id="text-field__container">
    <div id="text-field__title-box">
      <p>{{ title }}</p>
    </div>
    <input v-if="!area"
      class="text-field"
      type="text"
      :placeholder="placeholder"
      v-model="value">
    <textarea v-else
              class="text-field"
              :placeholder="placeholder"
              v-model="value"
              rows="1"
    />
  </div>
</template>

<script>
export default {
  name: 'text-field',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    area: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: '',
    };
  },
  watch: {
    value(newValue) {
      this.$emit('input', newValue);
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
/* Input styling */
.text-field {
  height: 100%;
  width: 100%;
  font-family: IranianSans, sans-serif;
  outline: none;
  border: 0 solid;
  border-radius: 4px 0 0 4px;
  resize: none;
}
/* Title box styling */
#text-field__title-box {
  background: #0EBAC5;
  height: 100%;
  color: white;
  text-align: center;
  width: 35%;
  font-size: 16px;
  font-weight: bold;
  border-radius: 0 4px 4px 0;
  /* Positions */
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Container field */
#text-field__container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}
/* Input placeholder styling */
.text-field::placeholder {
  text-indent: 5px;
}
</style>
