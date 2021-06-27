<template>
  <div>
    <div class="text-field__center">
      <text-field
        v-if="isAdmin"
        v-model="searchCode"
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
          <td>{{ formatPrice(receipt.price) }}</td>
          <td v-if="isAdmin">
            {{ receipt.username }}
          </td>
          <td>{{ receipt.address }}</td>
          <td>{{ receipt.status }}</td>
          <td
            v-if="isAdmin"
            style="border: none"
          >
            <button
              v-if="receipt.status !== 'لغو شده'"
              class="cancel__status__button"
              @click="changeStatus(receipt, -1)"
            >
              لغو سفارش
            </button>
            <button
              v-if="receipt.status !== 'درحال انجام'"
              class="progress__status__button"
              @click="changeStatus(receipt, 0)"
            >
              در حال انجام
            </button>
            <button
              v-if="receipt.status !== 'انجام شده'"
              class="done__status__button"
              @click="changeStatus(receipt, 1)"
            >
              انجام سفارش
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import textField from "../components/core/text-field";
import receipt from "../controller/receipt";
import language from "../utils/language";
import formatter from "../utils/formatter";

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
			],
			searchCode: ""
		};
	},
	watch: {
		async searchCode(val){
			this.receipts = await receipt.getReceipts(Number.MAX_SAFE_INTEGER, 0,
				val && val.length > 0 ? val : undefined);
		}
	},
	async mounted() {
		this.receipts = await receipt.getReceipts();
	},
	methods: {
		async changeStatus(val, newStatus){
		  await receipt.updateStatus(val.trackingCode, newStatus);
			this.receipts = await receipt.getReceipts(Number.MAX_SAFE_INTEGER, 0,
				this.searchCode && this.searchCode.length > 0 ? this.searchCode : undefined);
		},
		formatPrice(val) {
			return language.toFarsiNumber(formatter.formatToRial(val));
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
.done__status__button{
  background: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  font-family: inherit;
  font-size: 16px;
  border-radius: 24px;
  border: 0 solid;
  background: lightgreen;
  padding: 6px 10px;
  /* Animation */
  -webkit-transition: 0.4s;
  margin: 1px;
}
/* Box shadow on hover */
.done__status__button:hover{
  box-shadow: 0 0 5pt 1.5pt green;
}
.cancel__status__button{
  background: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  font-family: inherit;
  font-size: 16px;
  border-radius: 24px;
  border: 0 solid;
  background: indianred;
  padding: 6px 10px;
  /* Animation */
  -webkit-transition: 0.4s;
  margin: 1px;
  color: white;
}
/* Box shadow on hover */
.cancel__status__button:hover{
  box-shadow: 0 0 5pt 1.5pt red;
}
.progress__status__button{
  background: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  font-family: inherit;
  font-size: 16px;
  border-radius: 24px;
  border: 0 solid;
  background: lightskyblue;
  padding: 6px 10px;
  /* Animation */
  -webkit-transition: 0.4s;
  margin: 1px;
}
/* Box shadow on hover */
.progress__status__button:hover{
  box-shadow: 0 0 5pt 1.5pt deepskyblue;
}
</style>
