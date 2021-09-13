<template>
  <el-row class="panel-group">
    <el-col :span="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people" style="height:80px;margin-right:10px;">
          <svg-icon icon-class="document" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            系统手册
          </div>
          <el-link v-for="(item,index ) in systemManual" :key="index" style="line-height: 2.5" :label="item.title" :value="item.key" @click="add(item, 'detail')">{{ item.docTitle | ellipsis }}<i
            class="el-icon-view el-icon--right"
          /><br></el-link>
          <el-link style="line-height: 2.5" @click="goToSysDocNoticeList">显示更多<i class="el-icon-view el-icon--right" /></el-link>
          <!-- <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
    <el-col :span="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message" style="height:80px;margin-right:10px;">
          <svg-icon icon-class="circulars" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            通函通告
          </div>
          <el-link v-for="(item,index) in notice" :key="index" style="line-height: 2.5" :label="item.title" :value="item.key" @click="add(item, 'detail')">{{ item.docTitle | ellipsis }}<i
            class="el-icon-view el-icon--right"
          /><br></el-link>
          <el-link style="line-height: 2.5" @click="goToSysDocNoticeList">显示更多<i class="el-icon-view el-icon--right" /></el-link>
          <!-- <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
    <el-col :span="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money" style="height:80px;margin-right:10px;">
          <svg-icon icon-class="resource" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            其他资料
          </div>
          <el-link v-for="(item, index) in otherDocument" :key="index" style="line-height: 2.5" :label="item.title" href="baidu" :value="item.key" @click="add(item,'detail')">{{ item.docTitle | ellipsis
          }}<i class="el-icon-view el-icon--right" /><br></el-link>
          <el-link style="line-height: 2.5" @click="goToSysDocNoticeList">显示更多<i class="el-icon-view el-icon--right" /></el-link>
          <!-- <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
    <el-col :span="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping" style="height:80px;margin-right:10px;">
          <svg-icon icon-class="notice" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            系统公告
          </div>
          <el-link v-for="(item, index) in systemNotice" :key="index" style="line-height: 2.5" :label="item.title" :value="item.key" @click="add(item, 'detail')">{{ item.docTitle | ellipsis }}<i
            class="el-icon-view el-icon--right"
          /><br></el-link>
          <el-link style="line-height: 2.5" @click="goToSysDocNoticeList">显示更多<i class="el-icon-view el-icon--right" /></el-link>
          <!-- <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
    <sysDocNotice ref="child" />
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getQueryPage } from '@/api/requestGet'
import sysDocNotice from '@/views/docMng/sysDocNotice-dialog2'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CountTo,
    sysDocNotice
  },
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 10) {
        return value.slice(0, 10) + '...'
      }
      return value
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      systemManual: [],
      notice: [],
      otherDocument: [],
      systemNotice: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    goToSysDocNoticeList() {
      this.$router.push('/docMng/list2')
    },
    add(id, status) {
      // window.open('www.baidu.com')
      this.$refs.child.userDetail2(id, status)
      console.log(id, status)
    },
    getList() {
      var url = '/sysDocNotice/findPreviousThreeNotices'
      getQueryPage(url).then(response => {
        this.systemManual = response.data.data.systemManual
        this.notice = response.data.data.notice
        this.otherDocument = response.data.data.otherDocument
        this.systemNotice = response.data.data.systemNotice
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
      padding: 0 5px;
    }

    .card-panel {
      height: 250px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      display: flex;
      justify-content: space-between;

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 30px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
