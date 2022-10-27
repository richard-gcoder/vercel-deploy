import { useEffect } from 'react'
import { toast } from 'react-toastify';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setDiscordUserInfo } from '../../store/loginUserInfoSlice'

// Router
import { useNavigate, useLocation } from 'react-router-dom' 
import { ADMIN_DATA_PANEL_PATH } from '../DataPanel/Admin'

export const DiscordAuthHandler = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const res = JSON.parse(`${urlSearchParams.get('data')}`)
    const { userInfo, pageInfo } = res?.data

    const { Avatar, Discord, IsCompleteInfo, Nickname, Token } = userInfo

    if (!Token) {
      toast.warning("发生了未知错误，请关闭此窗口并重试Discord登录")
    } else {
      dispatch(setDiscordUserInfo({ 
        discord: Discord,
        nickname: Nickname,
        avatar: Avatar,
        token: Token,
      }))
      setTimeout(() => {
        toast.success('登录成功')
        navigate(ADMIN_DATA_PANEL_PATH)
      }, 500)
    }
  }, [])

  return (<></>)
}

export const DISCORD_AUTH_HANDLER_PATH = '/auth/discord'