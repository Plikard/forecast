<template>
  <div class="day-item" v-if="i < 5" @click="selectDate(date)">
    <div class="day-item__number">{{currentDay}}</div>
    <div class="day-item__info">
      <div class="day-item__title">
        {{days[getDate.getDay()]}}
      </div>
      <div v-for="(title, time) in times" :key="time" class="day-item__info-row">
        <span v-if="day[time]">{{title}} {{day[time].main.temp | tempFormat }}</span>
      </div>
    </div>
  </div>
</template>

<script>
	import days from '../assets/days'

	export default {
		name: "day",
		props: ['date', 'day', 'i'],
    data(){
			return{
				times: {
					'15:00:00': 'днем',
					'03:00:00': 'ночью',
        },
        days: days
      }
    },
		computed: {
			currentDay() {
				return this.date.split('-').pop()
			},
			getDate() {
				return new Date(this.date);
			},
		},
		methods:{
			selectDate(date){
				this.$store.commit('selectDate', date)
      }
    }
	}
</script>

<style lang="scss" scoped>
  .day-item {
    padding: 30px 20px;
    border-radius: 10px;
    width: 210px;
    box-sizing: border-box;
    color: #666666;
    box-shadow: 1px 1px 3px 1px #00000011;
    position: relative;
    background: #fff;
    overflow: hidden;
    cursor: pointer;
    background: linear-gradient(140deg, rgb(213, 239, 255) 0%, rgb(255, 253, 254) 100%);

    transition: box-shadow 200ms;

    &:hover{
      box-shadow: 4px 4px 3px 1px #00000022;
    }

    &__info-row{
      padding-bottom: 5px;
      font-size: 16px;
      font-weight: bold;

      & ~ &{
        font-size: 12px;
        font-weight: normal;
      }

      span{
        &:after {
          content: '\00B0';
        }
      }
    }

    &__title{
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
      user-select: none;
      color: #5199d8;
    }

    &__number {
      font-size: 190px;
      position: absolute;
      font-weight: 900;
      color: #fff;
      top: -40px;
      right: -40px;
      z-index: 0;
      opacity: .5;
      user-select: none;
    }

    &__info {
      z-index: 1;
      position: relative;
    }
  }
</style>