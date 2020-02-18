<template>
  <div class="day-expanded">
    <div class="day-expanded__main-info">
      <div class="day-expanded__city">{{currentCity}}</div>
      <div class="day-expanded__datetime">{{getDayName}}</div>
      <div class="day-expanded__temp temperature">
        <div class="temperature__main">{{mainTemperatureInfo.main.temp | tempFormat}}</div>
        <div class="temperature__feels-like">ощущается как {{mainTemperatureInfo.main.feels_like | tempFormat}}</div>
        <div class="temperature__wind">скорость ветра {{mainTemperatureInfo.wind.speed}} м/с</div>
      </div>
    </div>
    <div class="day-expanded__by-time by-time">
      <div v-for="(title, time) in times" :key="time" class="by-time__item">
        <div v-if="selectedDay[time]">
          <div class="by-time__title">{{title}}</div>
          <div class="by-time__temp">{{selectedDay[time].main.temp | tempFormat}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import days from '../assets/days'

	export default {
		name: "expandedDay",
		props: ['days'],
		data() {
			return {
				times: {
					'03:00:00': 'Ночь',
					'09:00:00': 'Утро',
					'15:00:00': 'День',
					'21:00:00': 'Вечер',
				},
			}
		},
		computed: {
			currentDate() {
				return this.$store.state.selectedDate;
			},
			selectedDay() {
				return this.days[this.currentDate]
			},
			currentCity() {
				return this.$store.state.city
			},
			getDayName() {
				const date = new Date(this.currentDate)
				return days[date.getDay('+1')]
			},
			mainTemperatureInfo() {
				return this.selectedDay['15:00:00'] ? this.selectedDay['15:00:00'] : this.selectedDay[Object.keys(this.day).shift()];
			}
		},
	}
</script>

<style lang="scss" scoped>
  .day-expanded {
    padding: 30px 20px;
    border-radius: 10px;
    width: 440px;
    box-sizing: border-box;
    color: #666666;
    box-shadow: 1px 1px 3px 1px #00000011;
    position: relative;
    background: #fff;
    overflow: hidden;
    background: linear-gradient(140deg, rgb(213, 239, 255) 0%, rgb(255, 253, 254) 100%);

    &__main-info {
      margin-bottom: 50px;
      position: relative;
    }

    &__city {
      font-size: 30px;
      font-weight: bold;
    }

    &__datetime {
      padding-top: 5px;
      font-size: 14px;
    }

    &__temp {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .by-time {
    display: flex;
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid #e1e1e1;
    justify-content: flex-end;

    &__item {
      width: 25%;
      text-align: center;
    }

    &__title {
      font-size: 12px;
      color: #777;
    }

    &__temp {
      font-weight: bold;
      margin: 10px 0;

      &:after {
        content: '\00B0';
        width: 0;
        display: inline-block;
      }
    }
  }

  .temperature {
    text-align: right;

    &__main {
      font-size: 40px;
      font-weight: 900;

      &:after {
        content: '\00B0';
      }
    }

    &__feels-like {
      margin-bottom: 5px;

      &:after {
        content: '\00B0';
      }
    }

    &__wind, &__feels-like {
      font-size: 14px;
      color: #777;
    }
  }
</style>