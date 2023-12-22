import { addDictionaryData } from '@/api/modules/DataDictionary/DataDictionary.ts'
import { ref } from "vue"

const storeCallInterface = defineStore('DataDictionary', () => {

    const addDictionaryres = ref()
    const DictionaryAdd = async (data: NonNullable<unknown>) => {
        const res = await addDictionaryData(data)
        // console.log('123', res)
        addDictionaryres.value = res
    }

    return {
        addDictionaryres,
        DictionaryAdd
    }
})

export default storeCallInterface