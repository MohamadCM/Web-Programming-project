<template>
  <div>
    <modal
      :key="showModal"
      v-model="showModal"
      :show="showModal"
    >
      <div style="display: flex; flex-direction: column; margin-left: 10px; align-items: center">
        <text-field
          v-model="newName"
          title="نام کالا"
          class="text-field"
          :initial-value="newName"
          placeholder="نام جدید را وارد کنید..."
        />
        <text-field
          v-model="inventory"
          title="تعداد کالا"
          class="text-field"
          :initial-value="inventory"
          placeholder="تعداد کالا را وارد کنید..."
          type="number"
        />
        <text-field
          v-model="category"
          title="دسته‌بندی کالا"
          class="text-field"
          :initial-value="category"
          placeholder="دسته‌بندی کالا را وارد کنید..."
        />
        <text-field
          v-model="price"
          title="قیمت کالا"
          class="text-field"
          :initial-value="price"
          placeholder="قیمت کالا کالا را وارد کنید..."
          type="number"
        />
        <p
          style="margin-top: 20px;"
        >
          انتخاب فایل تصویر:
        </p>
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="product_image"
          class="file-input"
          @change="previewFile"
        >
        <button
          class="product__button"
          @click="addOrEdit"
        >
          <i
            v-if="editingMode"
            class="fas fa-pen"
          />
          <i
            v-else
            class="fas fa-plus"
          />
          {{ editingMode ? "ویرایش محصول" : "ایجاد محصول جدید" }}
        </button>
      </div>
    </modal>
    <button
      id="new-product__button"
      @click="showModal = true"
    >
      <i class="fas fa-plus" />
      ایجاد محصول جدید
    </button>
    <div class="product__container">
      <product-card
        v-for="product of products"
        :key="product.id"
        :category="product.category"
        :name="product.name"
        :price="product.price"
        :image="product.image"
        button-title="ویرایش محصول"
        :amount-badge="product.amountBadge"
        :button-function="() => editProduct(product)"
        class="product-box__item"
      />
    </div>
    <span
      @mouseover="hover = true"
    >
      <pagination
        v-model="page"
        :length="numberOfPages"
      />
    </span>
    <div
      v-if="hover"
      class="custom-select"
    >
      تعداد محصولات هر صفحه:
      <select
        id="eachPageLength"
        v-model="pageLength"
        name="تعداد محصول در هر صفحه"
      >
        <option
          v-for="val of [10,15,20]"
          :key="val"
          :value="val"
        >
          {{ val }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import productCard from "../components/product-card";
import pagination from "../components/core/pagination";
import modal from "../components/core/modal";
import textField from "../components/core/text-field";
export default {
	name: "ProductsTab",
	components: {productCard, pagination, modal, textField},
	data(){
	  return{
			page: 1,
			fullProducts: [],
			pageLength: 15,
			numberOfPages: 3,
			products: [],
			hover: false,
			showModal: false,
			newName: "",
			inventory: undefined,
			category: "",
			price: undefined,
			image: undefined,
			editingMode: false,
			oldName: ""
		};
	},
	watch: {
		page(val) {
			this.products = [];
			for (let i = (val - 1) * this.pageLength;
				i < Math.min(val * this.pageLength, this.fullProducts.length); i++) {
				this.products.push(this.fullProducts[i]);
			}
		},
		pageLength() {
			this.page = 1;
			this.init();
		},
		showModal(val){
		  if(val === false){
				this.category = undefined;
				this.price = undefined;
				this.newName = undefined;
				this.inventory = undefined;
				this.oldName = undefined;
				this.editingMode = false;
			}
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.fullProducts = [];
			for (let i = 0; i < 40; i++) {
				this.fullProducts.push({
					id: i,
					name: `name ${i}`,
					category: "دسته بندی",
					price: 10000,
					amountBadge: i,
					image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG",
					inventory: 5
				});
			}
			this.numberOfPages = Math.ceil(this.fullProducts.length / this.pageLength);
			this.products = [];
			for (let i = 0; i < Math.min(this.pageLength, this.fullProducts.length); i++) {
				this.products.push(this.fullProducts[i]);
			}
		},
		editProduct(val){
		  this.oldName = val.name;
		  this.category = val.category;
		  this.price = val.price;
		  this.newName = val.name;
		  this.inventory = val.inventory;
		  this.showModal = true;
		  this.editingMode = true;
		  console.log(val.name);
		},
		previewFile(event) {
		  this.image = event.target.files[0];
			console.log(this.image);
		},
		addOrEdit(){
		  if(this.editingMode)
		    console.log("Edited!");
		  else
		    console.log("Created!");
		}
	}
};
</script>

<style scoped>
/* New product button styles */
#new-product__button {
  border: none;
  background: #009CFF;
  padding: 17px 22px;
  color: white;
  border-radius: 32px;
  font-family: inherit;
  font-size: 16px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  -webkit-transition: 300ms;
  margin-bottom: 30px;
}
/* Button on hover */
#new-product__button:hover{
  box-shadow: 0 9px 12px rgba(0,0,0,0.16), 0 9px 12px rgba(0,0,0,0.23);
}
/* Grid with three columns in each line */
.product__container {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-items: center;
  grid-column-gap: 5%;
  grid-row-gap: 25px;
  margin-bottom: 48px;
}
@media (max-width: 768px) {
  .product__container{
    grid-template-columns: auto auto; /*Two columns*/
  }
}
@media (max-width: 560px) {
  .product__container{
    grid-template-columns: auto; /*One columns*/
  }
}
/* Text-field style */
.text-field {
  height: 48px;
  min-width: 320px;
  margin-left: 20px;
  margin-top: 20px;
}
/* File input styles */
.file-input {
  background-color: #0DB9C4;
  border: none;
  color: white;
  padding: 15px 48px;
  text-align: center;
  display: inline-block;
  font-size: inherit;
  border-radius: 8px;
  -webkit-transition: 400ms;
}
.file-input:hover {
  box-shadow: 0 9px 12px rgba(0,0,0,0.16), 0 9px 12px rgba(0,0,0,0.23);
}
.product__button {
  border: none;
  background: #009CFF;
  padding: 17px 22px;
  color: white;
  border-radius: 32px;
  font-family: inherit;
  font-size: 16px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  -webkit-transition: 300ms;
  margin-top: 20px;
  width: 90%;
}
.product__button:hover {
  box-shadow: 0 9px 12px rgba(0,0,0,0.16), 0 9px 12px rgba(0,0,0,0.23);
}
</style>
