<template>
  <div class="footer">
    {{ text }}
  </div>
</template>

<script>
export default {
	name: "Footer",
	data() {
		return {
			text: "تمامی حقوق برای محمد چمن مطلق محفوظ است.©"
		};
	}
};
</script>

<style scoped>
  .footer{
    background-color: #313436;
    color: white;
    text-align: center;
    direction: rtl;
    padding: 20px;
    margin-top: 15px;
  }
</style>
