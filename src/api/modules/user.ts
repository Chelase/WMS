import api from '../index'

export default {
  // 登录获取token
  login: (data: {
    userName: string
    password: string
  }) => api.post('/Base_Manage/Home/SubmitLogin', data),

  userInfo: () => api.post('/Base_Manage/Home/GetOperatorInfo'),

  // 获取权限
  permission: () => api.get('user/permission', {
    baseURL: '/mock/',
  }),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newpassword: string
  }) => api.post('user/password/edit', data, {
    baseURL: '/mock/',
  }),
}
