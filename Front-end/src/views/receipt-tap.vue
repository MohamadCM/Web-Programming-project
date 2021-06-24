<template>
  <div>
    <div class="text-field__center">
      <text-field
        v-if="isAdmin"
        placeholder="کد پیگیری را برای جستجو وارد کنید..."
        title="جستجوی کد پیگیری"
        class="receipt-tab__text-field"
      />
    </div>
    <div
      id="receipt__container"
    >
      <table>
        <tr class="border_bottom">
          <th>کد پیگیری</th>
          <th>کالا</th>
          <th>قیمت پرداختی</th>
          <th v-if="isAdmin">
            نام خریدار
          </th>
          <th>آدرس ارسال شده</th>
          <th>وضعیت سفارش</th>
        </tr>
        <tr
          v-for="receipt of receipts"
          :key="receipt.trackingCode"
          class="border_bottom"
        >
          <td>{{ receipt.trackingCode }}</td>
          <td>{{ receipt.product }}</td>
          <td>{{ receipt.price }}</td>
          <td v-if="isAdmin">
            {{ receipt.username }}
          </td>
          <td>{{ receipt.address }}</td>
          <td>{{ receipt.status }}</td>
          <td
            style="border: none"
          >
            <button
              class="status__button"
              @click="changeStatus(receipt)"
            >
              پیشروی سفارش
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import textField from "../components/core/text-field";

export default {
	name: "ReceiptTap",
	components : {
		textField
	},
	props: {
	  isAdmin: {
	    type: Boolean,
			default: false
		}
	},
	data(){
	  return {
			receipts: [
				{trackingCode: "SHOP102312",
					product: "کیف صورتی", price: 5000,
					address: "تهران، تهران، خونه", username: "محمد", status: "در حال انجام"},
				{trackingCode: "SHOP202312",
					product: "کیف قرمز", price: 10000, address: "تهران، تهران، خونه", username: "محمد",
					status: "در حال انجام"}
			]
		};
	},
	methods: {
		changeStatus(val){
			console.log(`${JSON.stringify(val)} edited!`);
		}
	}
};
</script>

<style scoped>
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
/* Container styles to create paddings */
#receipt__container {
  background: white;
  padding: 0 25px 50px 25px;
  box-shadow: 0 0 3pt 0.5pt silver;
}
@media (max-width: 640px) {
  /* Make table font smaller on smaller screens */
  table {
    font-size: 1.6vw;
  }
}
/*Text field styling*/
.receipt-tab__text-field {
  height: 48px;
  width: 60%;
  margin-bottom: 48px;
  margin-top: 16px;
}
/* Centering text-field */
.text-field__center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.status__button{
  background: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  font-family: inherit;
  font-size: 16px;
  border-radius: 24px;
  border: 0 solid;
  background: #FFC80C;
  padding: 13px 20px;
  /* Animation */
  -webkit-transition: 0.4s;
}
/* Box shadow on hover */
.status__button:hover{
  box-shadow: 0 0 5pt 1.5pt #FFC80C;
}
</style>
