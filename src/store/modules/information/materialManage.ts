import { 
    getMaterialManageDataList,                      //获取物料管理列表
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

    return {
        //获取物料列表
        MaterialDataList,
        getMaterialList,
    }
})

export default storeMaterialQueryData