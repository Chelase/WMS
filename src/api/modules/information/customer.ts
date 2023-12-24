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

//获取地址
export function getAddressDataList (data: NonNullable<unknown>) {
    return api.post('/api/PB/PB_Address/QueryDataList', data)
}

//添加客户地址
export function addAddressDataList (data: NonNullable<unknown>) {
    return api.post('/api/PB/PB_Address/SaveData',data)
}

//删除地址
export function delAddressDataList (data: NonNullable<unknown>) {
    return api.post('/PB/PB_Address/DeleteData', data)
}

//修改状态
export function modifyAddressListstate (data: NonNullable<unknown>) {
    return api.post('/PB/PB_Address/ModifyEnable?id='+data, data)
}

//修改默认
export function modifyDefaultListstate (data: NonNullable<unknown>) {
    return api.post('/PB/PB_Address/ModifyDefault?id='+data, data)
}