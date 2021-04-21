<template>
  <div class="container">
    <div id="category-card">
      <p id="category-card__title">
        دسته بندی
      </p>
      <div class="category-container__all">
      <div v-for="category of categories"
           :key="category.id"
      class="category-container">
        <input
          class="category"
          type="checkbox"
          :id="category.id"
          :value="category.id"
          v-model="selectedCategory">
        <label :for="category.id" class="category__label">{{ category.title }}</label>
      </div>
      </div>
      <br>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'filter-box',
  data() {
    return {
      categories: [
        {
          id: 0,
          title: 'دسته‌بندی یک',
        },
        {
          id: 1,
          title: 'دسته‌بندی دو',
        },
        {
          id: 3,
          title: 'دسته‌بندی سه',
        },
      ],
      selectedCategory: [],
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

#category-card {
  background: white;
  direction: rtl;
  text-align: right;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
}

/* Creating bottom line for p */
#category-card__title {
  padding-right: 10px;
  padding-bottom: 12px;
  text-align: right;
  border-top-style: none;
  border-right-style: none;
  border-bottom-style: solid;
  border-bottom-color: #E8E9ED;
  border-bottom-width: 2px;
  border-left-style: none;
}
/* Category boxing styles */
.category-container__all {
  max-height: 500px;
  overflow: auto;
  overflow-x: hidden;
  direction: rtl;
}
/* Category div styling */
.category-container {
  padding-top: 7px;
  padding-right: 5px;
}
/* Category Checkbox styling */
.category {
  -webkit-appearance: none;
  border: 1px solid #cacece;
  padding: 9px;
  border-radius: 24px;
  position: relative;
  top: 7px;
  margin-left: 10px;
  -webkit-transition: 200ms;
}
/* Active Checkbox styling */
.category:checked {
  background-color: #4491E0;
  border: 1px solid #adb8c0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0 -15px 10px -12px rgba(0,0,0,0.05),
  inset 15px 10px -12px rgba(255,255,255,0.1);
  color: #99a1a7;
}
/* Category label styling */
.category__label {
  font-size: 16px;
  font-family: inherit;
}
</style>
