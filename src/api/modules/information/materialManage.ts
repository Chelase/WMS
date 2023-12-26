import api from '../../index.ts'

//获取物料管理列表
export const getMaterialManageDataList = (data: NonNullable<unknown>) => {
    return api.post('/PB/PB_Material/QueryDataList', data)
}

//新建物料管理
export const addMaterialManageDataList = (data: NonNullable<unknown>) => {
    return api.post('/PB/PB_Material/SaveData', data)
}