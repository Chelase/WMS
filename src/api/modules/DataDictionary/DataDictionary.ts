import api from '@/api/index.ts'

//获取 数据字典 列表
export const dictionarylist = () => {
    return api({
        url:'http://wyz19940328.vicp.cc/api/Base/Base_Enum/GetDataList',
        method: 'post',
        data:{
            PageIndex: 1,
            PageRows: 10,
            Search: {},
            SortField: 'Id',
            SortType: "asc"
        }
    })
}

//数据字典-新增 数据
export const addDictionaryData = (data: NonNullable<unknown>) => {
    return api.post('http://wyz19940328.vicp.cc/api/Base/Base_Enum/SaveData', data)
}