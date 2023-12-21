import api from '@/api/index.ts'

//获取 数据字典 列表
export const dictionarylist = (nums: NonNullable<unknown>) => {
    return api({
        url:'/Base/Base_Enum/GetDataList',
        method: 'post',
        data:{
            PageIndex: nums,
            PageRows: 10,
            Search: {},
            SortField: 'Id',
            SortType: "asc"
        }
    })
}

//数据字典-新增 数据
export const addDictionaryData = (data: NonNullable<unknown>) => {
    return api.post('/Base/Base_Enum/SaveData', data)
}