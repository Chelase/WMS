<script setup lang="ts">
  import { ref, onMounted, provide } from 'vue'
  import { RefreshRight, Plus, Minus, Upload, Download } from '@element-plus/icons-vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import storeMaterialQueryData from '@/store/modules/information/materialManage.ts'
  import useMaterialStore from '@/store/modules/information/material.ts'
  import newMaterialPop from './components/newMaterialPop.vue'


  //store
  const storeMaterialfunction = storeMaterialQueryData()
  //物料类型store
  const useMaterialStoredata = useMaterialStore()

  const value = ref()

  //表格data
  const materialManageData = ref([])
  const materialManageTotal = ref(0)
  //物料类型list
  const materialTypesData = ref([])

  //获取表格数据条件
  const getMaterialCondition = ref({
    PageIndex: 1,
    PageRows: 10,
    Search: {
      ContactName: '',
      Keyword: '',
      TypeId: ''
    },
    SortField: "Id",
    SortType: "asc"
  })
  // 获取物料列表data数据
  const getMaterialList = async () => {
    await storeMaterialfunction.getMaterialList(getMaterialCondition.value)
    // console.log(storeMaterialfunction.MaterialDataList.Data)
    materialManageData.value = storeMaterialfunction.MaterialDataList
    materialManageTotal.value = storeMaterialfunction.MaterialDataList.Total
    //获取 物料类型
    await useMaterialStoredata.getMaterialTreeData(getMaterialCondition)
    // console.log('物料类型', useMaterialStoredata.MaterialTreeData)
    materialTypesData.value = useMaterialStoredata.MaterialTreeData
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
  //子组件form表单
  const formobj = ref({
    BarCode: '',
    CusId: '',
    MaterialTypeId: '',
    Max: '',
    MeasureId: '',
    Min: '',
    Name: '',
    Price: '',
    Remarks: '',
    SimpleName: '',
    Spec: '',
    StorId: '',
    SupId: '',
  })
  //组件传值
  provide('isShow', isShow)
  provide('formobj', formobj)

  //存储多选选中的data
  const selectiondata = ref([])
  //监听多选框选中
  const selectionMaterial = (value) => {
    selectiondata.value = []
    value.forEach(item => {
      selectiondata.value.push(item.Id)
    });
    // console.log(selectiondata.value)
  }
  //删除按钮
  const deleteMaterialList = async (value) => {
    if (value.length === 1) {
      // console.log(value)
      await storeMaterialfunction.delMaterialList(value)
      getMaterialList()
    } else {
      await storeMaterialfunction.delMaterialList(selectiondata.value)
      getMaterialList()
    }
  }
  const deleteMaterial = (value) => {
    ElMessageBox.confirm(
      '确定删除此条数据吗?',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(() => {
        deleteMaterialList(value)
        ElMessage({
          type: 'success',
          message: '删除成功!',
        })
      })
      .catch(() => {
      })
  }

  //查询按钮
  const queryMaterial = async () => {
    // console.log(queryCondition.value)
    // console.log('前', storeMaterialfunction.MaterialDataList)
    await storeMaterialfunction.getMaterialList(getMaterialCondition.value)
    materialManageData.value = storeMaterialfunction.MaterialDataList
    // console.log('后', storeMaterialfunction.MaterialDataList)
  }

  //重置按钮
  const resetting = () => {
    getMaterialCondition.value.Search = {
      ContactName: '',
      Keyword: '',
      TypeId: ''
    }
  }

  //编辑按钮
  const editMaterial = async (row) => {
    await storeMaterialfunction.MaterialManageTheList({ Id: row.Id })
    formobj.value = storeMaterialfunction.MaterialManageTheData
    isShow.value = true
    // console.log(row.Id)
  }

  //换页
  const PageChange = (value) => {
    getMaterialCondition.value.PageIndex = value
    getMaterialList()
  }

  //导入导出模板
  const imexportIsshow = ref(false)
</script>

<template>
  <div>
    <PageMain>
      <el-row class="martop">
        <el-button type="primary" :icon="Plus" @click="addPop"> 新建 </el-button>
        <el-button type="info" :icon="Minus" plain disabled v-if="!selectiondata.length"> 删除 </el-button>
        <el-button type="primary" :icon="Minus" v-else @click="deleteMaterial"> 删除 </el-button>
        <el-button type="primary" :icon="RefreshRight" @click="getMaterialList"> 刷新 </el-button>
        <div style="position: absolute; right: 200px;">
          <el-button type="primary" @click="imexportIsshow = true"> 导入物料 </el-button>
        </div>
      </el-row>
      <el-row class="martop">
        <el-tree-select class="martop" v-model="getMaterialCondition.Search.TypeId" :data="materialTypesData"
          :render-after-expand="false" placeholder="物料类型" :label="materialTypesData.title"
          :props="{ vlaue: 'Id', label: 'title' }" />
        <el-input v-model="getMaterialCondition.Search.Keyword" class="w-50 m-2" placeholder="物料名称/编号/条码" />
        <el-input v-model="getMaterialCondition.Search.ContactName" class="w-50 m-2" placeholder="客户/供应商名称或编码" />
        <el-button type="primary" class="martop" @click="queryMaterial"> 查询 </el-button>
        <el-button class="martop" @click="resetting"> 重置 </el-button>
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
          <el-table-column prop="Max" label="上线数量" />
          <el-table-column prop="Min" label="下限数量" />
          <el-table-column prop="address" label="操作">
            <template #default="{row}">
              <el-row style="color: rgb(0, 162, 255);">
                <span style="cursor: pointer;" @click="editMaterial(row)">编辑</span>
                <span style="margin-left: 15px;cursor: pointer;" @click="deleteMaterial([row.Id])">删除</span>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="float: right;">
        <el-pagination layout="total, prev, pager, next" :total="materialManageTotal" @current-change="PageChange" />
      </el-row>
    </PageMain>
    <newMaterialPop @refresh="getMaterialList" v-if="isShow"></newMaterialPop>
    
    <el-dialog v-model="imexportIsshow" title="导入导出" width="30%">
      <el-row justify="center">
        <el-col :span="10">
          <el-upload ref="fileListRef" class="upload-demo" action="http://118.190.145.57/api/PB/PB_Material/Import"
            :auto-upload="false">
            <el-button :icon="Upload" type="primary">
              上传数据
            </el-button>
          </el-upload>
        </el-col>
        <el-col :span="10">
          <el-button :icon="Download" tag="a" href="http://118.190.145.57/api/PB/PB_Material/ExportToExcel">
            下载模板表
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
  .martop {
    margin-top: 8px;
  }
</style>