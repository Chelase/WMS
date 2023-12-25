<script setup lang="ts">
  import { ref, onMounted, provide } from 'vue'
  import { RefreshRight } from '@element-plus/icons-vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  //添加框
  import addCustom from './components/newAddCustom.vue'
  //地址 测边框
  import broadsideBox from './components/broadsideBox.vue'

  import storeQueryData from '@/store/modules/information/customer.ts'

  //store
  const getQueryData = storeQueryData()
  //存储表格初始值
  const tableData = ref()
  //表格列表数量
  const tableDataNum = ref(0)
  //调用列表数据需要的值
  const getneedData = ref({
    PageIndex: 1,
    PageRows: 10,
    Search: {},
    SortField: 'Id',
    SortType: 'asc'
  })
  //获取表格值方法
  const getQueryDatas = async () => {
    // store 表格列表get方法
    await getQueryData.getQueryData(getneedData.value)
    //store 表格列表存值
    tableData.value = getQueryData.querydata.Data
    tableDataNum.value = getQueryData.querydata.Total
    // console.log(tableData.value)
    isshow.value = false
  }
  onMounted(() => {
    getQueryDatas()
  })

  //表单内容 
  const formData = ref({
    Name: '',
    Type: '',
    Phone: '',
    Fax: '',
    Email: '',
    Remarks: ''
  })
  //显示隐藏变量
  const isshow = ref(false)
  //控制新建弹框 显示
  provide('showform', isshow)
  provide(provide('formDatas', formData))
  //新建按钮
  const createdata = () => {
    isshow.value = true
  }

  //查询
  //客户类型
  const userType = [
    { chin: '公司', engl: 'Company' },
    { chin: '个人', engl: 'Personal' },
    { chin: '虚拟', engl: 'Virtual' },
    { chin: '内部', engl: 'Internal' }
  ]
  //存储选中客户类型
  const SelectedType = ref([])
  //客户编号或名称
  const KeyWord = ref('')
  //查询客户按钮
  const queryCustom = () => {
    // console.log(!!SelectedType.value)
    //重置页数
    getneedData.value.PageIndex = 1
    //添加调用接口需要的数据
    getneedData.value.Search = {
      Type: SelectedType.value,
      KeyWord: KeyWord.value
    }
    getQueryDatas()
    // console.log(getneedData.value)
  }

  //重置
  const resetting = () => {
    //清空输入框
    SelectedType.value = ''
    KeyWord.value = ''
    //重置调用接口需要的数据
    getneedData.value = {
      PageIndex: 1,
      PageRows: 10,
      Search: {},
      SortField: 'Id',
      SortType: 'asc'
    }
    getQueryDatas()
  }

  //存储多选框选中的值
  const selectionData = ref([])
  //监听表格多选框
  const handleSelectionChange = (value) => {
    // console.log(value)
    selectionData.value = []
    //遍历选中的数据，只获取数据Id
    value.forEach(item => {
      selectionData.value.push(item.Id)
    });
    // console.log(selectionData.value)
  }

  //删除
  const deletepop = (seecieddata) => {
    // console.log(seecieddata)
    ElMessageBox.confirm(
      '确定删除此客户吗',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(async () => {
      // getQueryData(selectionData)
      if (seecieddata.length === 1) {
        await getQueryData.delQueryDatas(seecieddata)
      } else {
        await getQueryData.delQueryDatas(selectionData.value)
      }
      getQueryDatas()
      // console.log(selectionData.value)
    }).catch(() => {
      // 消息提示
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
  }

  //编辑按钮
  const edit = (row) => {
    console.log(row)
    isshow.value = true
    formData.value = {
      Name: row.Name,
      Type: row.Type,
      Phone: row.Phone,
      Fax: row.Fax,
      Email: row.Email,
      Remarks: row.Remarks,
      Code: row.Code,
      CreateTime: row.CreateTime,
      CreatorId: row.CreatorId,
      Deleted: row.Deleted,
      Id: row.Id
    }
    console.log(formData.value)
  }

  //监听分页
  const PageChange = (value) => {
    // console.log(value)
    getneedData.value.PageIndex = value
    getQueryDatas()
  }

  //传递点击的客户id
  const  customId = ref()
  provide('customId', customId)
  //控制 地址 侧边框显示隐藏
  const sideIsshow = ref(false)
  //向子组件传递 数据
  provide('customAddress')
  //地址按钮
  const customAddress = (row) => {
    // console.log(row)
    customId.value = row.Id
    sideIsshow.value = true
  }
</script>
<template>
  <div>
    <PageMain>
      客户管理
      <el-row>
        <el-button type="primary" @click="createdata">+ 新建</el-button>
        <el-button type="info" plain disabled v-if="!selectionData.length">- 删除</el-button>
        <el-button type="info" v-else @click="deletepop">- 删除</el-button>
        <el-button type="primary" :icon="RefreshRight" @click="getQueryDatas">刷新</el-button>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-select class="m-2" placeholder="客户类型" :span="6" style="margin: 0;" v-model="SelectedType">
          <el-option v-for="item in userType" :key="item" :label="item.chin" :value="item.engl" />
        </el-select>
        <el-input class="w-50 m-2" placeholder="客户编号或名称" :span="6" v-model="KeyWord"
          style="margin-top: 0;margin-left: 10px;" />
        <el-button type="primary" @click="queryCustom">查询</el-button>
        <el-button @click="resetting">重置</el-button>
      </el-row>
      <el-row>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection"/>
          <el-table-column prop="Code" label="客户编号"/>
          <el-table-column prop="Name" label="客户名称"/>
          <el-table-column prop="Type" label="客户类型">
            <template #default="{row}">
              <span>{{
                row.Type=='Personal'?'个人':
                row.Type == 'Company'? '公司':
                row.Type == 'Virtual'? '虚拟' :
                row.Type == 'Internal' ? '内部': ''
                }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Phone" label="电话"/>
          <el-table-column prop="Fax" label="传真"/>
          <el-table-column prop="Email" label="Email"/>
          <el-table-column prop="name" label="操作">
            <template #default="{ row }">
              <el-row style="color: rgb(25, 113, 228);" class="marleft">
                <span @click="edit(row)">编辑</span>
                <span @click="deletepop([row.Id])">删除</span>
                <span @click="customAddress(row)">地址</span>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页 -->
      <el-row style="float: right;">
        <div class="example-pagination-block">
          <el-pagination layout="total, prev, pager, next" :total="tableDataNum" @current-change="PageChange" />
        </div>
      </el-row>
      <!-- 测边框 -->
      <el-drawer v-model="sideIsshow" size="60%">
        <broadsideBox v-if="sideIsshow"></broadsideBox>
      </el-drawer>
    </PageMain>
    <addCustom @refreshs="getQueryDatas"></addCustom>
  </div>
</template>

<style scoped lang="scss">
  .marleft * {
    margin-left: 10px;
    cursor: pointer;
  }
</style>