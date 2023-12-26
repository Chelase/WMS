<script setup lang="ts">
    import { ref, inject, defineEmits } from 'vue'
    import { Search, Paperclip, FullScreen, Document } from '@element-plus/icons-vue'
    import storeMaterialQueryData from '@/store/modules/information/materialManage.ts'

    //store
    const storeMaterialData = storeMaterialQueryData()

    //父组件传递的值，控制弹窗显示隐藏
    const isShow = inject('isShow')
    const input2 = ref()

    //form表单
    const formobj = ref({
        BarCode: '',
        CusId: '',
        MaterialTypeId: '',
        Max: '',
        MeasureId: '',
        Min: '',
        Name: '',
        Price: '',
        Remarks: '',
        SimpleName: '',
        Spec: '',
        StorId: '',
        SupId: ''
    })
</script>
<template>
    <el-dialog v-model="isShow" title="新增" width="50%">

        <el-row :gutter="10" class="lineheight">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                <el-row>
                    <span>名称:</span>
                    <el-input v-model="formobj.Name" class="w-88% m-3" :icon="Paperclip"/>
                </el-row>
                <el-row>
                    <span>编码:</span>
                    <el-input class="w-88% m-3" placeholder="系统自动生成" disabled :icon="FullScreen" />
                </el-row>
                <el-row>
                    <span>类型:</span>
                    <el-input v-model="input2" class="w-88% m-3" placeholder="类型" />
                </el-row>
                <el-row>
                    <span>下限:</span>
                    <el-input v-model="formobj.Min" class="w-88% m-3" placeholder="下限"/>
                </el-row>
                <el-row>
                    <span>单价:</span>
                    <el-input v-model="formobj.Price" class="w-88% m-3" placeholder="0"/>
                </el-row>
                <el-row>
                    <span>客户:</span>
                    <el-select v-model="value" class="w-73% m-3" placeholder="客户/投料点" :icon="Document">
                        <el-option
                          v-for="(item, index) in 5"
                          :key="index"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    <el-button type="primary" class="w-12% buttop" :icon="Search"></el-button>
                </el-row>
                <el-row>
                    <span>仓库:</span>
                    <el-input v-model="input2" class="w-88% m-3" placeholder="请选择仓库" />
                </el-row>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                <el-row>
                    <span>简称:</span>
                    <el-input v-model="formobj.SimpleName" class="w-88% m-3" :icon="Paperclip"/>
                </el-row>
                <el-row>
                    <span>条码:</span>
                    <el-input v-model="formobj.BarCode" class="w-88% m-3" :icon="FullScreen"/>
                </el-row>
                <el-row>
                    <span>规格:</span>
                    <el-select v-model="value" class="w-88% m-3" :icon="Document">
                        <el-option
                          v-for="(item, index) in 2"
                          :key="index"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                </el-row>
                <el-row>
                    <span>上限:</span>
                    <el-input v-model="formobj.Max" class="w-88% m-3" placeholder="上限"/>
                </el-row>
                <el-row>
                    <span>单位:</span>
                    <el-input v-model="input2" class="w-88% m-3" placeholder="单位" />
                </el-row>
                <el-row>
                    <span>供应商:</span>
                    <el-select v-model="value" class="w-73% m-3" :icon="Document" placeholder="供应商/下料点">
                        <el-option
                          v-for="(item, index) in 2"
                          :key="index"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    <el-button type="primary" class="w-12% buttop" :icon="Search"></el-button>
                </el-row>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
        </el-row>
        <el-row class="w-82%" style="margin: auto;margin-top: 10px;">
            <span>备注:</span>
            <el-input v-model="formobj.Remarks" maxlength="30" show-word-limit type="textarea" class="w-90%" />
        </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isShow = false">Cancel</el-button>
                <el-button type="primary" @click="isShow = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style scoped>
    .lineheight span {
        line-height: 60px;
    }

    .buttop {
        margin-top: 12px;
    }
</style>





<!-- //form表单
const formobj = ref({
    BarCode: '',
    Code: 'M-98',
    CreateTime: '2023-12-24 00:0053.110',
    CreatorId: 'Admin',
    CusId: '',
    Customer: null,
    Deleted: false,
    Id: '',
    MaterialType: {
        Code: '',
        CreateTime: '',
        CreatorId:'',
        Deleted: true,
        Id: '',
        IsLeaf: false,
        Name: '',
        ParentId: '',
        Path: '',
        Remarks: null,
    },
    MaterialTypeId: '',
    Max: '',
    MeasureId: {
        Code: '',
        CreateTime: '',
        CreatorId: '',
        Deleted: true,
        Id: '',
        Name: ''
    },
    MeasureId: '',
    Min: 1,
    Name: '',
    PB_AreaMaterials: null,
    PB_MaterialPoints: null,
    PB_TrayMaterials: null,
    Price: 1,
    Remarks: '',
    SimpleName: '',
    Spec: '',
    StorId: '',
    SupId: '',
    Supplier: {
        Address: '',
        Code: '',
        ContactName: '',
        CreateTime: '',
        CreatorId: '',
        Deleted: false,
        Email: '',
        Fax: '',
        Id: '',
        Name: '',
        Phone: '',
        Remarks: '',
        Type: ''
    }

}) -->