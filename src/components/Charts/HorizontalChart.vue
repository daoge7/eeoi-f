<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { string } from 'jszip/lib/support'
require('echarts/theme/macarons') // echarts theme

export default {
  mixins: [resize],
  props: {
    chartTitle: {
      type: String
    },
    xName: {
      type: String
    },
    yName:{
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
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
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
        dataset: {
        source: this.seriesData
        },
        grid: {containLabel: true},
        title: {
          x: 'center',
          y: 'top',
          text: this.chartTitle,
          textStyle: {
            fontSize: 14,
            fontWeight: 'bolder',
            color: '#333'// 主标题文字颜色
          }
        },
        xAxis: {name: 'TotalVessel'},
        yAxis: {type: 'category'},
        // visualMap: {
        //     orient: 'horizontal',
        //     left: 'center',
        //     min: 10,
        //     max: 100,
        //     text: ['High Score', 'Low Score'],
        //     // Map the score column to color
        //     dimension: 0,
        //     inRange: {
        //         color: ['#D7DA8B', '#E15457']
        //     }
        // },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "TotalVessel" column to X axis.
                    x: this.xName,
                    // Map the "product" column to Y axis
                    y: this.yName
                }
            }
        ]
      })
    }
  }
}
</script>
