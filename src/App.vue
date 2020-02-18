<template>
  <div id="app" class="forecast">
    <requestForm/>
    <day-expanded v-if="$store.state.city" class="forecast__current" :days="days"/>
    <days-list class="forecast__days list-days" :days="days"/>
  </div>
</template>

<script>

	import requestForm from './components/requestForm.vue'
	import dayExpanded from './components/dayExpanded.vue'
	import daysList from './components/daysList.vue'

	export default {
		name: 'App',

		components: {
			requestForm,
			dayExpanded,
			daysList
		},

		watch: {
			'$store.state.city'(city) {
				this.$store.commit('selectDate', Object.keys(this.days).shift())
				document.title = city + ' – прогноз погоды' || 'Прогноз погоды'
			}
		},
		computed: {
			days() {
				return this.$store.getters.getDays
			}
		}
	}
</script>

<style lang="scss">

  body {
    margin: 0;
    background: rgb(174, 213, 238);
    background: linear-gradient(90deg, rgba(174, 213, 238, 1) 0%, rgba(148, 203, 233, 1) 100%);
  }

  #app {
    /*font-family: 'Press Start 2P', cursive;*/
    font-family: 'Arial', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 30px;
    box-sizing: border-box;
  }

  .forecast {

    &__current {
      margin: 50px 0;
    }
  }

  .list-days {
    display: flex;
    margin: 40px 0;

    &__day {
      margin-right: 20px;
    }
  }
</style>
