<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { string, array } from 'jszip/lib/support'
require('echarts/theme/macarons') // echarts theme

export default {
  mixins: [resize],
  props: {
    title: {
      type: String
    },
    legendData: {
      type: Array
    },
    seriesData: {
      type: Array
    },
    className: {
      type: String,
      default: 'line'
    },
    id: {
      type: String,
      default: 'line'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    xAxisData: {
      type: Array
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id), 'macarons')
      this.chart.setOption({
        title: {
        text: this.title, // '折线图堆叠'
        left: 'center'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: this.legendData//  ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '17%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.xAxisData
    },
    yAxis: {
        type: 'value'
    },
    series: this.seriesData
      })
    }
  }
}
</script>
