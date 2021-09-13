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
    chartTitle: {
      type: String
    },
    title: {
      type: String
    },
    subtitle:{
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
      default: 'piechart'
    },
    id: {
      type: String,
      default: 'piechart'
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
        title: {
          text: this.title,// '某站点用户访问来源',
          subtext: this.subtitle,// '纯属虚构',
          left: 'center'
        },
        tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
              orient: 'vertical',
              left: 'left',
              data: this.legendData// ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.seriesData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
          }
        ]
      })
    }
  }
}
</script>
