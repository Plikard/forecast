import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

import api from '../api/apiConfig'

Vue.use(VueAxios, axios);
Vue.use(Vuex);

Vue.filter('tempFormat', temp => {
		return Math.round(temp)
	}
)

export default new Vuex.Store({
	state: {
		city: null,
		cityInfo: null,
		selectedDate: null
	},
	actions: {
		getCity: ({commit}, city) => {
			// return axios.get('/api', { // Проки иногда выдавал ошибку ECONNRESET, не успел решить проблему.
			return axios.get('https://api.openweathermap.org/data/2.5/forecast', {
				timeout: 4000,
				params: {
					APPID: api.apiKey,
					q: city,
					units: 'metric',
					cnt: 42
				}
			}).then((response) => {
				commit('setCityInfo', response.data)
				commit('setCity', city)
				return response
			})
		},
	},
	mutations: {
		setCityInfo: (state, payload) => {
			state.cityInfo = payload;
		},
		setCity: (state, payload) => {
			state.city = payload;
		},
		selectDate: (state, payload) => {
			state.selectedDate = payload;
		},
	},
	getters: {
		getDays: state => {
			if (state.cityInfo) {
				return [...state.cityInfo.list].reduce((r, {dt_txt, ...data}) => {
					const [day, time] = dt_txt.split(' ');
					r[day] = r[day] || {};
					r[day][time] = data;
					return r;
				}, {});
			} else return {}
		},
		cityInfo: state => state.cityInfo.city,
	}
})