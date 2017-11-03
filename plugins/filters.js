import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', (value, format) => {
  if (value) {
    return moment(String(value)).format(format)
  }
})
