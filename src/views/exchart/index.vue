<template>
  <div  class="chart-container">
          <!-- <chart
            v-if="chartFlag"
            ref="chart"
            height="100%"
            width="100%"
            v-bind:chartTitle="chartTitle"
            v-bind:xData="xData"
            v-bind:legendData="legendData"
            v-bind:seriesData="seriesData"
          /> -->
  <div id="chart" class="chart" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";
import {getEnergyEfficencyTrendMessage, getEnergyEfficencyTrend} from '@/api/requestPost'
require("echarts/theme/macarons"); // echarts theme
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      info:{
        shipImono: '',
        token: '',
        rollPeriod: '',
        auditTime: '',
      },
      initdatas:{

      },
      height:500+'px',
      width:80+'%',
      chartFlag: false,
      chartTitle: '',
      xData: [],
      legendData: [],
      seriesData: []
    }
  },
  computed: {
    // refresh_token () {
    //   return this.$route.query.refresh
    // },
    from_type () {
      return this.$route.query.type
    },
    from_token () {
      return this.$route.query.token
    },
    from_shipImono() {
      return this.$route.query.shipImono
    },
    from_rollPeriod() {
      return this.$route.query.rollPeriod
    },
    from_auditTime() {
      return this.$route.query.auditTime
    }
  },
  mounted () {
    console.log(this.$route.query.token,545545454545)
    // 如果是主账户切过来的，记录主账户的token
    if (this.from_token && this.from_username) {
      Cookies.set('from_token', this.from_token)
    } else {
      Cookies.remove('from_token')
    }
    let obj = {
      token : this.from_token,
      uid:this.from_username
    }
    this.initdata()
    this.initChart()
  },
  methods:{
    initdata() {
      this.info = {
         shipImono: this.from_shipImono,
        token: this.from_token,
        rollPeriod: this.from_rollPeriod,
        auditTime: this.from_auditTime,
        type:this.from_type
      }
      getEnergyEfficencyTrendMessage(this.info).then(res => {
        if(res.data.result){
          this.initdatas = res.data.data
          this.infoExchart()
        }
       
        //  this.chartTitle = '能效趋势分析'
        //    this.xData = res.data.data[0].xdata
        //    let list= []
        //   res.data.data.forEach(ele => {
        //       this.legendData.push(ele.name)
        //       let obj = {
        //         name: ele.name,
        //         type: ele.type,
        //         yAxisIndex: ele.yaxisIndex,
        //         data:ele.ydata
        //       }
        //       list.push(obj)
        //   })
        //   this.seriesData = list 
        //   this.chartFlag = true
        //   if(res.data.result){
        //       this.initChart()
        //   }
      })
    },
     infoExchart() {
       getEnergyEfficencyTrend(this.initdatas).then(res => {
          if(res.data.result){
             this.chartTitle = '能效趋势分析'
           this.xData = res.data.data.eneryEfficTrendIndexVos[0].xdata
           let list= []
          res.data.data.eneryEfficTrendIndexVos.forEach(ele => {
              this.legendData.push(ele.name)
              let obj = {
                name: ele.name,
                type: ele.type,
                yAxisIndex: ele.yaxisIndex,
                data:ele.ydata
              }
              list.push(obj)
          })
          this.seriesData = list 
           this.initChart()
             
          }
       })
     },
     initChart() {
      this.chart = echarts.init(document.getElementById('chart'), "macarons");
      this.chart.setOption({
        title: {
          x: "center",
          y: "top",
          text: this.chartTitle,
          textStyle: {
            fontSize: 14,
            fontWeight: "bolder",
            color: "#333", // 主标题文字颜色
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          borderWidth: 0,
          top: 100,
          bottom: 85,
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          x: "left",
          y: "top",
          top: "5%",
          textStyle: {
            color: "#90979c",
          },
          data: this.legendData,
        },
        calculable: true,
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: {
              readOnly: false,
            },
            magicType: {
              type: ["line", "bar"],
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            data: this.xData,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "数值",
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              formatter: "{value}",
            },
            splitArea: {
              show: false,
            },
          },
          // {
          //   type: 'value',
          //   name: '数值',
          //   splitLine: {
          //     show: false
          //   },
          //   axisLine: {
          //     lineStyle: {
          //       color: '#90979c'
          //     }
          //   },
          //   axisTick: {
          //     show: false
          //   },
          //   axisLabel: {
          //     interval: 0,
          //     formatter: '{value}'
          //   },
          //   splitArea: {
          //     show: false
          //   }
          // }
          {
            type: "value",
            name: "百分比",
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              formatter: "{value}%",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        // dataZoom: [
        //   {
        //     show: true,
        //     height: 30,
        //     xAxisIndex: [0],
        //     bottom: 30,
        //     start: 10,
        //     end: 80,
        //     handleIcon:
        //       "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
        //     handleSize: "110%",
        //     handleStyle: {
        //       color: "#839dec",
        //     },
        //     textStyle: {
        //       color: "#fff",
        //     },
        //     borderColor: "#90979c",
        //   },
        //   {
        //     type: "inside",
        //     show: true,
        //     height: 15,
        //     start: 1,
        //     end: 35,
        //   },
        // ],
        series: this.seriesData,
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .chart-container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
