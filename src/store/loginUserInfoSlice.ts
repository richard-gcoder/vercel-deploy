import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export enum LoginUserType {
  ADMIN = 'ADMIN',
  DISCORD_USER = 'DISCORD_USER'
}

const SLICE_NAME = 'LOGIN_USER_INFO_SLICE'

interface AdminUserInfo {
  username: string
  token: string
}

interface DiscordUserInfo {
  discord: string
  nickname: string
  avatar: string
  token: string
}

interface LoginUserStates {
  adminUserInfo?: AdminUserInfo
  discordUserInfo?: DiscordUserInfo
  loginUserType?: LoginUserType
  lastLoginUserType?: LoginUserType
}

const initialState: LoginUserStates = {}

export const loginUserInfoSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setDiscordUserInfo: (states, action: PayloadAction<DiscordUserInfo>) => {
      return { ...states, discordUserInfo: action.payload }
    },
    setLoginUserType: (states, action: PayloadAction<LoginUserType>) => {
      return { ...states, loginUserType: action.payload }
    },
    setAdminLogin: (states, action: PayloadAction<AdminUserInfo>) => {
      return { 
        ...states, 
        loginUserType: LoginUserType.ADMIN, 
        adminUserInfo: { 
          username: action.payload.username, 
          token: action.payload.token 
        },
        lastLoginUserType: LoginUserType.ADMIN,
      }
    },
    setDiscordUserLogout: (states) => {
      return { ...states, discordUserInfo: undefined }
    },
    setAdminLogout: (states) => {
      return { ...states, loginUserType: undefined, adminUserInfo: undefined }
    }
  }
})

export const {
  setDiscordUserInfo,
  setLoginUserType,
  setAdminLogin,
  setAdminLogout,
  setDiscordUserLogout,
} = loginUserInfoSlice.actions

export const selectDiscordUserInfo = (state: RootState) => state.LOGIN_USER_INFO_SLICE.discordUserInfo
export const selectLoginUserType = (state: RootState) => state.LOGIN_USER_INFO_SLICE.loginUserType
export const selectAdminUserinfo= (state: RootState) => state.LOGIN_USER_INFO_SLICE.adminUserInfo
export const selectLastLoginUserType = (state: RootState) => state.LOGIN_USER_INFO_SLICE.lastLoginUserType