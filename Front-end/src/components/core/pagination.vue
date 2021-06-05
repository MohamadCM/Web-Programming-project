<template>
  <ul class="pagination">
    <transition name="fade">
      <li
        v-if="selectedIndex > 1"
        @click="selectedIndex--"
      >
        <a
          id="prev"
        ><i class="fas fa-chevron-right" />  قبلی</a>
      </li>
    </transition>
    <li
      v-for="i of length"
      :key="i"
      class="pageNumber"
      @click="selectedIndex = i"
    >
      {{ i }}
    </li>
    <transition name="fade">
      <li
        v-if="selectedIndex < length"
        @click="selectedIndex++"
      >
        <a
          id="next"
        >بعدی  <i class="fas fa-chevron-left" /></a>
      </li>
    </transition>
  </ul>
</template>

<script>
export default {
	name: "Pagination",
	props: {
	  length: {
	    type: Number,
			default: 10
		}
	},
	data(){
	  return {
	    selectedIndex: 1
		};
	},
	watch: {
	  selectedIndex(val) {
			const btns = document.getElementsByClassName("pageNumber");
			for (let i = 0; i < btns.length; i++) {
				if(i !== val - 1){
					btns[i].style.color = "#383838";
					btns[i].style.backgroundColor = "transparent";
				}else {
					btns[i].style.color = "white";
					btns[i].style.backgroundColor = "#FFC80C";
					btns[i].style.borderRadius = "100px";
				}
			}
			this.$emit("input", val);
		},
		length() {
	    this.selectedIndex = 1;
		}
	},
	mounted() {
		const btns = document.getElementsByClassName("pageNumber");
		btns[0].style.color = "white";
		btns[0].style.backgroundColor = "#FFC80C";
		btns[0].style.borderRadius = "100px";
	}
};
</script>

<style scoped>
/* ul Container style */
ul {
  position: relative;
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
/* list elements styles */
ul li {
  list-style: none;
  line-height: 50px;
  margin: 0 5px;
  cursor: pointer;
}
/* Page number container styles */
.pageNumber {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  -webkit-transition: 200ms;
  font-size: 18px;
}
/* Page number styles */
#next, #prev, .pageNumber {
  display: block;
  text-decoration: none;
  color: #383838;
  font-weight: 600;
  border-radius: 50%;
  -webkit-transition: 200ms;
}
/* Page number on hover style */
.pageNumber:hover{
  background: #E8E9ED !important;
  border-radius: 100px !important;;
}
/* previous button style */
#prev {
  margin-right: 30px;
  font-weight: 700;
  font-size: 20px;
  -webkit-transition: 300ms;
}
/* previous button style on hover */
#prev:hover {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
/* next button style */
#next {
  margin-left: 30px;
  font-weight: 700;
  font-size: 20px;
}
/* previous button style on hover */
#next:hover {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
@media (max-width: 520px) {
  #next, #prev, .pageNumber{
    font-size: 12px;
  }
}
/* Next and previous button animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 100ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
