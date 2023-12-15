// 该文件为系统默认配置，请勿修改！！！

import type { RecursiveRequired, Settings } from '#/global'

const globalSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    colorScheme: 'light',
    enablePermission: false,
    enableProgress: true,
    enableDynamicTitle: false,
    routeBaseOn: 'frontend',
    enableAppSetting: false,
  },
  home: {
    enable: false,
  },
  layout: {
    enableMobileAdaptation: true, // 兼容移动端
    widthMode: 'adaption', // 自适应
  },
  menu: {
    baseOn: 'frontend',
    menuMode: 'single', // 侧边栏模式（无主导航）
    switchMainMenuAndPageJump: false,
    subMenuUniqueOpened: true,
    subMenuCollapse: false,
    enableSubMenuCollapseButton: true,
    enableHotkeys: false,
  },
  topbar: {
    mode: 'static',
  },
  toolbar: {
    enableFullscreen: false,
    enablePageReload: false,
    enableColorScheme: false,
  },
  breadcrumb: {
    enable: true,
  },
  mainPage: {
    enableHotkeys: true,
  },
  navSearch: {
    enable: true,
    enableHotkeys: true,
  },
  copyright: {
    enable: false,
    dates: '',
    company: '',
    website: '',
    beian: '',
  },
}

export default globalSettingsDefault
