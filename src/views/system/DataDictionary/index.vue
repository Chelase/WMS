<script setup lang="ts">
  //数据表格组件
  import tables from './components/dictionaryTable.vue'
  //公共组件--------侧边弹框组件
  import newaddFrom from '@/components/drawer/index.vue'
  //字典初始值
  import { dictionarylist } from '@/api/modules/DataDictionary/DataDictionary.ts'
  import { ref, onMounted } from 'vue'

  //控制侧边弹框显示隐藏
  const showhidd = ref(Boolean)

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
</script>

<template>
  <div>
    <PageMain>
      数据字典
      <el-row>
        <el-button type="primary">+ &nbsp;新建</el-button>
        <el-button type="info" plain disabled>- &nbsp;删除</el-button>
        <el-button type="primary"><svg-icon name="ep:refresh-right"></svg-icon> 刷新</el-button>
      </el-row>
      <el-row class="martop">
        <el-input v-model="input2" class="w-50 m-2" placeholder="编号/名称" style="margin-top: 0px;margin-left: 0px;" />
        <el-button type="primary"> 查询 </el-button>
        <el-button>重置</el-button>
      </el-row>
      <el-row class="martop">
        <tables></tables>
      </el-row>
    </PageMain>
    <el-drawer v-model="showhidd" title="新建字典" size="60%">
      <newaddFrom v-model="dictionaryDataList"></newaddFrom>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
  .martop {
    margin-top: 15px;
  }
</style>