import { 
    getMaterialManageDataList,                      //获取物料管理列表
    addMaterialManageDataList,                      //新建物料
    delMaterialManageDataList,                      //删除物料
    getMaterialManageTheDataList,                   //获取物料详情
} from '@/api/modules/information/materialManage.ts'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const storeMaterialQueryData = defineStore('MaterialManage', () => {
    //获取物料列表
    const MaterialDataList = ref([])
    const getMaterialList = async(data:NonNullable<unknown>) => {
        const res =  await getMaterialManageDataList(data)
        // console.log('store', res)
        MaterialDataList.value = res
    }

    //新建物料
    const addMaterialList = async(data: NonNullable<unknown>) => {
        const res = await addMaterialManageDataList(data)
        // console.log(res)
        if (res.Msg == '请求成功！') {
            ElMessage({
                message: '操作成功!.',
                type: 'success',
            })
        }  
    }

    //删除物料
    const delMaterialList = async(data: NonNullable<unknown>) => {
        const res = await delMaterialManageDataList(data)
        // console.log(res)
    }

    //获取物料详情
    const  MaterialManageTheData = ref({})
    const MaterialManageTheList = async(data:NonNullable<unknown>) => {
        const res = await getMaterialManageTheDataList(data)
        // console.log(res.Data)
        MaterialManageTheData.value = res.Data
    }

    return {
        //获取物料列表
        MaterialDataList,
        getMaterialList,
        //新建物料
        addMaterialList,
        //删除物料
        delMaterialList,
        //获取物料详情
        MaterialManageTheData,
        MaterialManageTheList,
    }
})

export default storeMaterialQueryData