<template>
  <div>
    <day v-for="(day, date, i) in days" :date="date" :day="day" :key="i" :i="i" class="list-days__day"/>
  </div>
</template>

<script>
	import day from './day.vue'

	export default {
		components: {
			day
		},
		props: ['days'],
	}
</script>

<style scoped>

</style>