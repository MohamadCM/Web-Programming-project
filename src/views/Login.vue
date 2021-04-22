<template>
  <div style="padding: 100px">
    <text-field
      placeholder="متن خود را وارد کنید"
      title="متن عنوان فیلد" style="height: 164px; width: 600px; margin-top: 10px"/>
  </div>
</template>

<script>
import textField from '../components/core/text-field.vue';

export default {
  name: 'Login',
  components: {
    textField,
  },
};
</script>

<style scoped>

</style>
