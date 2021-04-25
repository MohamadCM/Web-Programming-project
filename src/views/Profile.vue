<template>
  <div>
    <tab-selector
      :tabs="tabs"
    />
  </div>
</template>

<script>
import tabSelector from "../components/core/tab-selector";

export default {
	name: "Profile",
	components: {
	  tabSelector
	},
	data(){
	  return {
			tabs: [
				{name: "پروفایل"},
				{name: "رسیدها"},
				{name: "ویرایش"}
			]
		};
	}
};
</script>

<style scoped>

</style>
