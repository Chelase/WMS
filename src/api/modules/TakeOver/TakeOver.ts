import api from '../../index.ts'

//获取收货管理初始数据
export const  getTakeOverList = () => {
    return api({
        url:'/TD/TD_Receiving/GetDataList',
        method:'post',
        data:{
            pageIndex: 1,
            pageRows: 50,
            sortField: 'CreateTime',
            SortType: 'desc'
        }
    })
}