import api from '../../index.ts'

//客户管理-----获取客户列表
export function getQueryDataList (data: NonNullable<unknown>) {
    return api.post('/PB/PB_Customer/QueryDataList',data)
}

//添加客户
export function addQueryData (data: NonNullable<unknown>) {
    return api.post('/PB/PB_Customer/SaveData', data)
}

//删除客户
export function delQueryData (data: NonNullable<unknown>){
    return api.post('/PB/PB_Customer/DeleteData',data)
}