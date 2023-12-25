<script setup lang="ts">
  import { ref, onMounted, provide } from 'vue'
  import { RefreshRight, Plus, Minus } from '@element-plus/icons-vue'
  import storeMaterialQueryData from '@/store/modules/information/materialManage.ts'
  import newMaterialPop from './components/newMaterialPop.vue'


  //tore
  const storeMaterialfunction = storeMaterialQueryData()

  //树形选择data
  const data = ref([
    {
      value: '1',
      label: 'Level one 1',
      children: [
        {
          value: '1-1',
          label: 'Level two 1-1',
          children: [
            {
              value: '1-1-1',
              label: 'Level three 1-1-1',
            },
          ],
        },
      ],
    },
  ])
  const value = ref()

  //表格data
  const materialManageData = ref([])
  //获取表格数据条件
  const getMaterialCondition = ref({
    PageIndex: 1,
    PageRows: 10,
    Search: {},
    SortField: "Id",
    SortType: "asc"
  })
  // 获取物料列表data数据
  const getMaterialList = async () => {
    await storeMaterialfunction.getMaterialList(getMaterialCondition.value)
    // console.log(storeMaterialfunction.MaterialDataList.Data)
    materialManageData.value = storeMaterialfunction.MaterialDataList
  }
  onMounted(() => {
    getMaterialList()
  })


  // 新建按钮
  const addPop = () => {
    isShow.value = true
  }
  //控制弹框显示隐藏
  const isShow = ref(false)
  //组件传值
  provide('isShow', isShow)

  //查询输入框
  const input2 = ref()

  //监听多选框选中
  const selectionMaterial = (value) => {
    console.log(value);
  }
</script>

<template>
  <div>
    <PageMain>
      <el-row class="martop">
        <el-button type="primary" :icon="Plus" @click="addPop"> 新建 </el-button>
        <el-button type="info" :icon="Minus" plain disabled> 删除 </el-button>
        <el-button type="primary" :icon="Minus"> 删除 </el-button>
        <el-button type="primary" :icon="RefreshRight"> 刷新 </el-button>
        <div style="position: absolute; right: 200px;">
          <el-button type="primary"> 导入物料 </el-button>
        </div>
      </el-row>
      <el-row class="martop">
        <el-tree-select class="martop" v-model="value" :data="data" :render-after-expand="false" placeholder="物料类型" />
        <el-input v-model="input2" class="w-50 m-2" placeholder="物料名称/编号/条码" />
        <el-input v-model="input2" class="w-50 m-2" placeholder="客户/供应商名称或编码" />
        <el-button type="primary" class="martop"> 查询 </el-button>
        <el-button class="martop"> 重置 </el-button>
      </el-row>
      <el-row>
        <el-table :data="materialManageData.Data" border style="width: 100%" @selection-change="selectionMaterial">
          <el-table-column type="selection" />
          <el-table-column prop="Name" label="物料名称" />
          <el-table-column prop="Code" label="物料编码" />
          <el-table-column prop="SimpleName" label="物料简称" />
          <el-table-column prop="MaterialType.Name" label="物料类别" />
          <el-table-column prop="BarCode" label="条码" />
          <el-table-column prop="Price" label="物料规格" />
          <el-table-column prop="Measure.Name" label="单位" />
          <el-table-column prop="max" label="上线数量" />
          <el-table-column prop="min" label="下限数量" />
          <el-table-column prop="address" label="操作">
            <template #default="{row}">
              <el-row style="color: rgb(0, 162, 255);">
                <span>编辑</span>
                <span style="margin-left: 15px;">删除</span>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <!-- <el-pagination layout="prev, pager, next, total " :total="" /> -->
      </el-row>
    </PageMain>
    <newMaterialPop></newMaterialPop>
  </div>
</template>

<style scoped lang="scss">
  .martop {
    margin-top: 8px;
  }
</style>