import api from '../../index.ts'

//获取物料统计
export function getMaterialStatisticsData () {
    return api.get('/Report/Introduce/MaterialSummary')
}

//获取入库统计
export function getInventoryStatistics () {
    return api.get('/Report/Introduce/InStorageSummary')
}

//获取出库统计
export function getOutboundStatistics () {
    return api.get('/Report/Introduce/OutStorageSummary')
}