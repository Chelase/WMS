import api from '@/api/index.ts'

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