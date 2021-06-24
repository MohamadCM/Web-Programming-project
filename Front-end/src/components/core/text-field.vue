<template>
  <div
    id="text-field__container"
    :style="borderStyle"
  >
    <div id="text-field__title-box">
      <p>{{ title }}</p>
    </div>
    <input
      v-if="!area"
      v-model="value"
      class="text-field"
      :type="isPassword ? 'password' : type"
      :placeholder="placeholder"
      :minlength="minLength"
      :maxlength="maxLength"
      min="0"
      @focus="focusFlag = true"
      @blur="focusFlag = false"
      @keypress="type === 'number' ? isNumber($event) : () => {}"
    >
    <textarea
      v-else
      v-model="value"
      class="text-field"
      :placeholder="placeholder"
      rows="1"
      @focus="focusFlag = true"
      @blur="focusFlag = false"
    />
    <transition name="fade">
      <p
        v-if="message && focusFlag"
        style="font-size: 12px"
      >
        {{ message }}
      </p>
    </transition>
  </div>
</template>

<script>
export default {
	name: "TextField",
	props: {
		placeholder: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: ""
		},
		area: {
			type: Boolean,
			default: false
		},
		initialValue: {
		  type: String,
			default: ""
		},
		isPassword:{
		  type: Boolean,
			default: false
		},
		minLength:{
		  type: Number,
			default: 2
		},
		maxLength:{
			type: Number,
			default: 255
		},
		pattern:{
		  type: String,
			default: undefined
		},
		type: {
		  type: String,
			default: "text"
		}
	},
	data() {
		return {
			value: "",
			focusFlag: false
		};
	},
	computed: {
		borderStyle(){
			if(this.focusFlag) {
			  if(!this.isDataValid())
					return "box-shadow: 0 0 3px 3px red;";
			  else
					return "box-shadow: 0 0 3px 3px green;";
			}
			else
				return "border: none";
		}
	},
	watch: {
		value(newValue) {
			this.$emit("input", newValue);
		}
	},
	mounted() {
	  this.value = this.initialValue;
	  if(this.isPassword) this.pattern = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})";
	},
	methods: {
	  isDataValid(){
	    let res = true;
	    let message = undefined;
	    this.value = this.value.trim();
	    if(this.value.length < this.minLength){
	      message = `${this.title} باید بیشتر از ${this.minLength} کاراکتر باشد.`;
	      res = false;
			}
			if(this.value.length > this.maxLength){
				message = `${this.title} باید کمتر از ${this.maxLength} کاراکتر باشد.`;
				res = false;
			}
			if(this.pattern.length > 0 && !new RegExp(this.pattern).test(this.value)){
			  message = `${this.title} معتبر نمی‌باشد.`;
				if(this.isPassword){
				  message = "پسورد حداقل ۸ کاراکتر، و شامل اعداد، حروف";
				}
			  res = false;
			}
			this.message = message;
			this.$emit("validation", message);
			return res;
		},
		isNumber(evt) {
			evt = (evt) ? evt : window.event;
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
				evt.preventDefault();;
			} else {
				return true;
			}
		}
	}
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
  border-radius: 6px;
  -webkit-transition: 200ms;
}
@media (max-width: 560px) {
  input, #text-field__title-box {
    font-size: 10px;
  }
}
/* Input placeholder styling */
.text-field::placeholder {
  text-indent: 5px;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
