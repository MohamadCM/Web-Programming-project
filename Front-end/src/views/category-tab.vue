<template>
  <div>
    <div
      id="new-category__container"
    >
      <text-field
        v-model="newCategory"
        title="دسته‌بندی جدید"
        class="text-field"
        placeholder="نام دسته‌بندی جدید را وارد کنید"
      />
      <my-button
        class="btn"
        text="افزودن"
        back-ground-color="#009CFF"
        color="white"
        :on-click-function="create"
      >
        <i class="fas fa-plus" />
      </my-button>
      <p
        v-if="postInfo"
        style="color: #FFC80A"
      >
        {{ postInfo }}
      </p>
    </div>
    <div class="container">
      <table>
        <tr class="border_bottom">
          <th>نام دسته بندی</th>
          <th>عملیات</th>
        </tr>
        <tr
          v-for="category of categories"
          :key="category.name"
          class="border_bottom"
        >
          <td>{{ category.name }}</td>
          <td>
            <button
              id="edit-category"
              @click="select(category.name)"
            >
              <i class="fas fa-pencil-alt" />
              ویرایش دسته‌بندی
            </button>
            <button
              id="remove-category"
              @click="remove(category.name)"
            >
              <i class="fas fa-times" />
              حذف دسته‌بندی
            </button>
          </td>
        </tr>
      </table>
      <transition
        name="slide-fade"
      >
        <div
          v-if="selected"
          style="display: flex; align-items: center; flex-direction: column; margin-right: 5px"
        >
          <text-field
            v-model="editName"
            title="ویرایش نام دسته‌بندی"
            class="text-field"
            placeholder="نام جدید را وارد کنید"
          />
          <p style="margin: 10px">
            {{ selectedName }}
          </p>
          <div>
            <my-button
              class="btn"
              text="ویرایش"
              back-ground-color="#009CFF"
              color="white"
              :on-click-function="edit"
            />
            <i
              class="fas fa-times"
              style="margin-right: 10px; color: red; text-shadow: 2px 5px silver;"
              @click="selected=false"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import textField from "../components/core/text-field";
import myButton from "../components/core/my-button";
import category from "../controller/category";
export default {
	name: "CategoryTab",
	components: {
	  textField,
		myButton
	},
	data() {
	  return {
	    newCategory: "",
			editName: "",
	    selected: false,
	    selectedName: undefined,
			categories: [],
			postInfo: undefined
		};
	},
	async mounted(){
	  this.categories = await category.getCategories();
	},
	methods: {
	  select(name){
	    this.selected = true;
			this.selectedName = name;
		},
	  async remove(name){
			const res = await category.removeCategory(name);
			if(res) {
				this.postInfo = "حذف دسته‌بندی با موفقیت انجام شد.";
				setTimeout(() => {
					this.postInfo = "";
				}, 5000);
				this.categories = await  category.getCategories();
			}
		},
		async edit() {
			const res = await category.updateCategory(this.selectedName, this.editName);
			if(res) {
				this.postInfo = "ویرایش دسته‌بندی با موفقیت انجام شد.";
				setTimeout(() => {
					this.postInfo = "";
				}, 5000);
				this.categories = await category.getCategories();
				this.selectedName = this.editName;
			}
		},
		async create(){
	    const res = await category.updateCategory(undefined, this.newCategory);
	    if(res) {
				this.postInfo = "افزودن دسته‌بندی با موفقیت انجام شد.";
				setTimeout(() => {
					this.postInfo = "";
				}, 5000);
				this.categories = await  category.getCategories();
			}
		}
	}
};
</script>

<style scoped>
#new-category__container {
  display: flex;
  align-items: center;
  flex-direction: row;
}
/* Overall container style */
.container {
  display: flex;
  flex-direction: row;
}
/* Table overall styles */
table {
  width: 100%;
  background: white;
  border-radius: 4px;
  padding-bottom: 64px;
}
/* Creating borders */
table, th, td {
  border-bottom: 2px solid rgb(238,238,238);
  padding: 25px;
  border-collapse: collapse;
}
/* Title row styles */
th {
  color: silver;
  border-bottom: 2px solid rgb(238,238,238);
}
/* Remove and edit button styles */
#remove-category, #edit-category {
  background: none;
  border: none;
  padding: 10px;
  margin-right: 20px;
  margin-left: 20px;
  font-family: inherit;
}
/* Change colo */
#remove-category:hover {
  color: red;
}
#edit-category:hover {
  color: #0EBAC5;
}
/* Text-field style */
.text-field {
  height: 48px;
  min-width: 460px;
  margin-right: 20px;
  margin-left: 20px;
}
@media (max-width: 520px) {
  /* Make font smaller on small screens */
  * {
    font-size: 12px;
  }
}
/* Edit and new category button */
.btn {
  padding: 10px 20px;
  -webkit-transition: 500ms;
}
.btn:hover {
  box-shadow: 5px 10px silver;
}
@media (max-width: 820px) {
  /* Show items in columns in small screens */
  .container {
    flex-direction: column;
  }
  /* Text-field margins in small screens */
  .text-field {
    margin-top: 20px;
    margin-left: 0;
    margin-right: 0;
  }
  /* Show items in columns in small screens */
  #new-category__container {
    flex-direction: column;
  }
}
/* Enter and leave animation after category selection*/
.slide-fade-enter-active {
  transition: all 500ms ease;
}
.slide-fade-leave-active {
  transition: all 500ms cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
