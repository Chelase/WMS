import api from '../../index.ts'

export const getMaterialManageDataList = (data: NonNullable<unknown>) => {
    return api.post('/PB/PB_Material/QueryDataList', data)
}