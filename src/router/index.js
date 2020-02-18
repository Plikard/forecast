import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			name: 'city', path: '/:city'
		},
	]
})