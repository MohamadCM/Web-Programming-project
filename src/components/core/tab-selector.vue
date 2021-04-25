<template>
  <div class="tab-container">
    <button
      v-for="(tab, index) of currentTabs"
      :key="index"
      :style="style(index)"
      @click="selection(index)"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<script>
export default {
	name: "TabSelector",
	props: {
		tabs: {
	    type: Array,
			default: () => []
		}
	},
	data() {
	  return {
	    currentTabs: []
		};
	},
	mounted() {
		for (let i = 0; i < this.tabs.length; i++) {
			this.currentTabs.push(
				{name: this.tabs[i].name,
					backGroundColor: "white",
					color: "rgb(238,238,238)"}
			);
		}
		if(this.currentTabs.length) {
		  this.currentTabs[0].backGroundColor= "rgb(238,238,238)";
		  this.currentTabs[0].color= "black";
		}
		this.$forceUpdate(); // Force update tabs
	},
	methods: {
	  selection(index) {
			// Selection logic and requests
			this.currentTabs[index].color = "black";
			this.currentTabs[index].backGroundColor = "rgb(238,238,238)";
			for (let i = 0; i < this.currentTabs.length; i++) {
			  if(i !== index) {
					this.currentTabs[i].color = "rgb(238,238,238)";
					this.currentTabs[i].backGroundColor = "white";
				}
			}
		},
		style(index){
			return `color: ${this.currentTabs[index].color};
      background-color: ${this.currentTabs[index].backGroundColor}`;
		}
	}
};
</script>

<style scoped>

/* Style the tab */
.tab-container {
  overflow: hidden;
  border: 3px solid #F7F7F7;
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

/* Style the buttons inside the tab */
.tab-container button {
  float: right;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 9px 12px;
  transition: 0.3s;
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
  width: 50%;
}

/* Change background color of buttons on hover */
.tab-container button:hover {
  background-color: #ddd;
}

</style>
