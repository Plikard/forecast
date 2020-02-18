<template>
  <div>
    <form action="#" @submit.prevent="callApi()" class="form">
      <input autofocus :class="['input', {'input_error': error}]" type="text" v-model="city" @input="error = false"
      placeholder="Введите город" />
      <input type="submit" class="button" value="Узнать погоду">
      <transition name="fade">
        <loader v-show="loading"/>
      </transition>
    </form>

    <div v-show="error === 404" class="error">Город не найден</div>
    <div v-show="error && error !== 404" class="error">Ошибка запроса</div>
  </div>
</template>

<script>
	import loader from './loader.vue'

	export default {
		components: {
			loader,
		},
		data() {
			return {
				loading: false,
				error: false,
				city: '',
			}
		},
		methods: {
			callApi() {
				if (this.$store.state.city === this.city || this.error === 404) return
				if (!this.city) {
					this.error = true
					return
				}
				this.loading = true;
				this.$store.dispatch('getCity', this.city)
					.then(() => {
						this.error = false
						if (this.$route.params['city'] !== this.city) this.$router.push(this.city)
					})
					.catch(error => {
						this.error = typeof error.response !== 'undefined' ? error.response.status : true
            return error
					})
					.finally(() => {
						this.loading = false
					})
			}
		},
		created() {
			if (this.$route.params.city) {
				this.city = this.$route.params.city
				this.callApi()
			}
		}
	}
</script>


<style scoped lang="scss">

  .form {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }

  .input, .button {
    border: 3px solid #fff;
    border-radius: 10px;
    padding: 10px 30px;
    font: inherit;
    font-size: 16px;
    outline: none;
    background: transparent;
    font-weight: bold;
  }

  .input {
    color: #fff;
    transition: border-color 200ms, background-color 200ms;

    &_error {
      border-color: #fb7b9f;
      background: #ffffff;
      color: #5199d8;
    }

    &:focus:not(&_error) {
      background: #ffffff22;
    }
  }

  .button {
    cursor: pointer;
    background: #fff;
    transition: color 200ms;

    &:hover {
      color: #5199d8;
    }
  }

  .input + .button {
    margin-left: 20px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .error{
    margin-left: 20px;
    font-weight: bold;
    color: #c53c62;
    position: absolute;
  }

</style>
