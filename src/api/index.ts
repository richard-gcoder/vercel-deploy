
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify';
import { LoginUserType } from '../store/loginUserInfoSlice'
import { PersonalInvestmentResponse } from './types'

export const REQUEST_URL_BASE = 'http://recon.lovefuture99.com:8081'

/** Actual Discord Auth */
export const DISCORD_AUTH_URL = "https://discordapp.com/api/oauth2/authorize?response_type=code&client_id=1024123696123740250 &scope=identify email&state=discord&redirect_uri=http://recon.lovefuture99.com:8081/user/discordLogin"

/** My test Discord Auth */
// export const DISCORD_AUTH_URL = "https://discord.com/api/oauth2/authorize?client_id=1032735548055490580&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=code&scope=identify"

const MASTER_TEST_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJKaW0iLCJleHAiOjE2NjgyNTQzNjd9.ECWLPWU3bgxKPt_Q7nOUMElpToncuRowuuNtvPChzQ8' // Jim
const MASTER_TEST_TOKEN_KATE = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJLYXRlIiwiZXhwIjoxNjk4NDE4NDk3fQ.KX5bNhzn6pTpQ4Iz_lLZhYAC1Cgr86jQA1jB_VDBY0g' // Kate


const testRes = {
  "code": 0,
  "message": "ok",
  "data": {
    "userInfo": {
      "IsCompleteInfo": false,
      "Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJZYW5kZXJlQm90MTMjMTYyNiIsImV4cCI6MTY2NjczODYyOH0.1X8C-Vy-XM5T6MzHwse8l9YiRZ6rPsNWDqTiOSYIkmM",
      "Discord": "YandereBot13#1626",
      "Avatar": "https://cdn.discordapp.com/avatars/715317504573964339/350528c252a927e7103fdaedd19c3abc",
      "Nickname": "YandereBot13"
    },
    "pageInfo": {
      "totalRows": 0,
      "page": 1,
      "pageSize": 50,
      "isFirstPage": true,
      "isLastPage": true
    },
    "list": []
  }
}

const testToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ4aWFvaG9uZyIsImV4cCI6MTY2Njc0Njc2M30.0nNAEuyTGj6iRLYj52PgVo4wSOtI5VAebRdBQUI77kI'

export const adminLogin = async(username: string, password: string) => {
  return axios({
    method: 'get',
    url: '/user/login',
    params: {
      username: username,
      password: password,
    }
  })
}

export const logout = async(username: string, loginMode: 0 | 1, token: string) => {
  const usernameParam = loginMode === 0 ? { username: username } : { discord: username }
  return axios({
    method: 'get',
    url: '/user/logout',
    params: {
      ...usernameParam,
      loginMode: loginMode,
    },
    headers: {
      token: token
    }
  })
}

export const queryFarms = async(token?: string) => {
  return axios({
    method: 'get',
    url: '/user/queryFarms',
    headers: {
      token: testToken,
    }
  })
}

export const queryAdmins = async(token?: string) => {
  return axios({
    method: 'get',
    url: REQUEST_URL_BASE + '/user/queryManagers',
    headers: {
      token: testToken
    }
  })
}

export const queryPersonalInvestment = async(token?: string) => {
  return axios({
    method: 'get',
    url: '/detail/getPersonDetailInfo',
    headers: {
      token: MASTER_TEST_TOKEN
    },
  })
}
export const queryFarmMemberAccountInfo = async() => {
  return axios({
    method: 'get',
    url: '/detail/getDetailInfo',
    params: {
      discord: `Jim#123`,
      pageIndex: 1
    },
    headers: {
      token: MASTER_TEST_TOKEN
    },
  })
}

export const queryFarmMemberAccountInfoKate = async() => {
  return axios({
    method: 'get',
    url: '/detail/getDetailInfo',
    params: {
      discord: `Kate#456`,
      pageIndex: 1
    },
    headers: {
      token: MASTER_TEST_TOKEN_KATE
    },
  })
}
