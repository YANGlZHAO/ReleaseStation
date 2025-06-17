<template>
	<div class="ac-wrap">
		<select ref="select" v-model="selectedValue" class="selector">
			<option v-for="option in options" :key="option.id" :value="option.id">
				{{ option.name }}
			</option>
		</select>
	</div>
</template>

<script>
	import $ from "jquery";
	import "select2";
	import "select2/dist/css/select2.min.css";

	export default {
		props: {
			value: String,
			options: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				selectedValue: this.value || (this.options.length ? this.options[0].value : ""),
			};
		},
		watch: {
			selectedValue(newValue) {
				this.$emit("input", newValue);
			},
			value(newValue) {
				if (newValue !== this.selectedValue) {
					this.selectedValue = newValue;
					$(this.$refs.select).val(newValue).trigger("change");
				}
			},
			options: {
			        deep: true,
			        handler() {
			            this.$nextTick(() => {
			                this.refreshSelect2();
			            });
			        },
			    },
		},
		mounted() {
		    this.initSelect2();
		},
		beforeDestroy() {
			$(this.$refs.select).off("change").select2("destroy");
		},
		methods: {
			initSelect2() {
				$(this.$refs.select).select2();
				$(this.$refs.select).on("change", () => {
					this.selectedValue = $(this.$refs.select).val();
				});
			},
			refreshSelect2() {
			    const $select = $(this.$refs.select);
			    $select.off("change"); // 先解绑事件，防止重复绑定
			    $select.select2("destroy").empty(); // 清除旧数据
			
			    this.$nextTick(() => {
			        $select.append(this.options.map(option => 
			            new Option(option.name, option.id, false, option.id === this.selectedValue)
			        )); // 重新添加 option
			        $select.select2(); // 重新初始化 select2
			        $select.on("change", () => {
			            this.selectedValue = $select.val();
			        });
			
			        $select.val(this.selectedValue).trigger("change"); // 确保选中值正确
			    });
			}

		},
	};
</script>

<style>
	.selector {
		width: 7rem !important;
	}
	
	::v-deep .select2-container {
	  width: 7rem !important;
	  margin: 0 0.5rem !important;
	}
	
	/* 使用深度选择器修改 Select2 文本大小 */
	::v-deep .select2-container .select2-selection--single .select2-selection__rendered {
	  font-size: 0.4rem !important;
	}
	
	::v-deep .select2-container--default .select2-results__option {
	  font-size: 0.4rem !important;
	}
	
	::v-deep .select2-container .select2-selection--single {
	    padding: 0 !important;
	    margin: 0 !important;
	    height: auto !important;
	    line-height: normal !important;
	}
	
	
</style>