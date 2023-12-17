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
    const failure_time = ref(localStorage.failure_time ?? '')
    const avatar = ref(localStorage.avatar ?? '')
    const permissions = ref<string[]>([])
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
      const res = await apiUser.login(data)
      token.value = res.Data
      const userInfo = await apiUser.userInfo()
      console.log('userInfo', userInfo)
      // localStorage.setItem('userName', res.data.userName)
      localStorage.setItem('token', res.Data)
      // userName.value = res.data.userName
      // failure_time.value = res.data.failure_time
      // avatar.value = res.data.avatar
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      localStorage.removeItem('userName')
      localStorage.removeItem('token')
      localStorage.removeItem('failure_time')
      localStorage.removeItem('avatar')
      userName.value = ''
      token.value = ''
      failure_time.value = ''
      avatar.value = ''
      permissions.value = []
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
      avatar,
      permissions,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
    }
  },
)

export default useUserStore
