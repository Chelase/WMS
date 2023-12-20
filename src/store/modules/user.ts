import useRouteStore from './route'
import useMenuStore from './menu'
import router from '@/router'
import apiUser from '@/api/modules/user'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()

    const userName = ref(localStorage.userName ?? '')
    const token = ref(localStorage.token ?? '')
    const permissions = ref<string[]>([])
    const CreatorId = ref('')
    const isLogin = computed(() => {
      let retn = false
      if (token.value) {
        retn = true
      }
      return retn
    })

    // 登录
    async function login(data: {
      userName: string
      password: string
    }) {
      const res = await apiUser.login(data) // 登录
      token.value = res.Data
      localStorage.setItem('token', token.value)
      const userInfo = await apiUser.userInfo() // 用户信息
      console.log(userInfo)
      userName.value = userInfo.Data.UserInfo.UserName
      localStorage.setItem('userName', userName.value)
      CreatorId.value = userInfo.Data.UserInfo.Id
      localStorage.setItem('CreatorId', CreatorId.value)
      permissions.value = userInfo.Data.Permissions
      localStorage.setItem('permissions', userInfo.Data.Permissions)
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      localStorage.removeItem('userName')
      localStorage.removeItem('token')
      localStorage.removeItem('permissions')
      localStorage.removeItem('CreatorId')
      userName.value = ''
      token.value = ''
      permissions.value = []
      CreatorId.value = ''
      routeStore.removeRoutes()
      menuStore.setActived(0)
      router.push({
        name: 'login',
        query: {
          ...(router.currentRoute.value.path !== '/' && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      })
    }
    // 获取权限
    async function getPermissions() {
      const res = await apiUser.permission()
      permissions.value = res.data.permissions
      return permissions.value
    }
    // 修改密码
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await apiUser.passwordEdit(data)
    }

    return {
      userName,
      token,
      permissions,
      CreatorId,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
    }
  },
)

export default useUserStore
