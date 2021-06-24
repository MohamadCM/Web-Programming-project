<template>
  <transition name="slide-fade">
    <div
      v-if="localShowParameter"
      id="modal-id"
      class="modal"
    >
      <div class="modal-content">
        <span
          class="close"
          @click="localShowParameter = false"
        ><i
          class="fas fa-times"
        /></span>
        <p class="modal-content__inside">
          <slot />
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
	name: "Modal",
	props: {
	  show: {
	    type: Boolean,
			default: false
		}
	},
	data(){
	  return {
	    localShowParameter: false
		};
	},
	watch: {
		localShowParameter(val){
			this.$emit("input", val);
		}
	},
	mounted() {
	  this.localShowParameter = this.show;
	  document.addEventListener("click",
			(event) => {
	    if(event.target.id === "modal-id"){
	      console.log(this.localShowParameter);
	      this.localShowParameter = false;
				}
			});
	}
};
</script>

<style scoped>

/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 2; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #F7F7F7;
  margin: auto;
  padding: 5px;
  width: 100%;
  max-width: 450px;
  max-height: 80%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  border-radius: 24px;
}

/* The Close Button */
.close {
  color: black;
  float: right;
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 5px;
  -webkit-transition: 100ms;
}

.close:hover{
  color: red;
  cursor: pointer;
}

.slide-fade-enter-active {
  transition: all 400ms ease;
}
.slide-fade-leave-active {
  transition: all 200ms cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
