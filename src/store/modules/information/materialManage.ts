import { 
    getMaterialManageDataList,                      //获取物料管理列表
    addMaterialManageDataList,                      //新建物料
} from '@/api/modules/information/materialManage.ts'
import { ref } from 'vue'

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
        console.log(res)
    }

    return {
        //获取物料列表
        MaterialDataList,
        getMaterialList,
        //新建物料
        addMaterialList,
    }
})

export default storeMaterialQueryData