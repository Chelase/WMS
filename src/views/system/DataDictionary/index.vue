<script setup lang="ts">
  //数据表格组件
  import tables from './components/dictionaryTable.vue'
  //公共组件--------侧边弹框组件
  import newaddFrom from '@/components/drawer/index.vue'
  //组件-------新建对话框
  import newDialog from './components/newDialog.vue'
  //字典初始值
  import { dictionarylist } from '@/api/modules/DataDictionary/DataDictionary.ts'
  import { ref, onMounted, provide } from 'vue'

  //控制侧边弹框显示隐藏
  const showhidd = ref(false)

  // 存储表格组件选择的数据
  const delDictionaryList = ref([])
  const deletefun = (value) => {
    // console.log('父组件', value)
    delDictionaryList.value = value
    console.log(delDictionaryList.value.length)
  }

  //存储 字典view 初始值
  const dictionaryDataList = ref([])
  //获取 字典初始值
  const getdictionarylist = async () => {
    const { Data } = await dictionarylist()
    dictionaryDataList.value = Data
    console.log('字典', dictionaryDataList.value)
  }
  onMounted(() => {
    getdictionarylist()
  })

  // 控制新建对话框显示隐藏
  const newlogShow = ref(false)

  //向表格组件传值
  provide('tableDatas', dictionaryDataList)
  //向新建对话框传值————控制显示隐藏
  provide('newdialogShow', newlogShow)

  //存储点击的字典列表的数据
  const dictionarylistData = ref()
  //显示侧边弹窗
  const isshow = (value) => {
    showhidd.value = true
    console.log(value)
    dictionarylistData.value = value
  }

</script>

<template>
  <div>
    <PageMain>
      数据字典
      <el-row>
        <el-button type="primary" @click="newlogShow = true">+ &nbsp;新建</el-button>
        <el-button type="info" plain disabled v-if="delDictionaryList.length === 0">- &nbsp;删除</el-button>
        <el-button type="info" v-else>- &nbsp;删除</el-button>
        <el-button type="primary" @click="getdictionarylist"><svg-icon name="ep:refresh-right"></svg-icon> 刷新</el-button>
      </el-row>
      <el-row class="martop">
        <el-input v-model="input2" class="w-50 m-2" placeholder="编号/名称" style="margin-top: 0px;margin-left: 0px;" />
        <el-button type="primary"> 查询 </el-button>
        <el-button>重置</el-button>
      </el-row>
      <el-row class="martop">
        <tables @showdele="deletefun" @showpop="isshow"></tables>
      </el-row>
    </PageMain>
    <!-- 新建对话框 -->
    <newDialog :outerVisible=true></newDialog>
    <!-- //字典值编辑测边框 -->
    <el-drawer v-model="showhidd" title="字典值" size="60%">
      <newaddFrom></newaddFrom>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
  .martop {
    margin-top: 15px;
  }
</style>