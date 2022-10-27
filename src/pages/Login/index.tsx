import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { selectDiscordUserInfo } from '../../store/loginUserInfoSlice'

// MUI
import { Box, Button, SvgIcon, Typography } from '@mui/material'
import { SupervisorAccount } from '@mui/icons-material'

// Components
import { toast } from 'react-toastify';
import { ReactComponent as DiscordLogo } from './discord_logo.svg'

// API
import { REQUEST_URL_BASE, DISCORD_AUTH_URL } from '../../api'

// Router
import { useNavigate, useLocation } from 'react-router-dom' 
import { USERNAME_LOGIN_PATH } from './UsernameLogin'
import { ADMIN_DATA_PANEL_PATH } from '../DataPanel/Admin'

export const LoginMainPage = () => {

  const location = useLocation()
  const navigate = useNavigate()
  
  const discordUserInfo = useSelector(selectDiscordUserInfo)

  /** Discord auth states & managers */
  const [authWindowIsOpen, setAuthWindowIsOpen] = useState<boolean>(false)

  const handleDiscordLogin = useCallback(() => {
    if (discordUserInfo?.token) {
      toast.success('已登录')
      navigate(ADMIN_DATA_PANEL_PATH)
    } else {
      window.open(DISCORD_AUTH_URL, "_self")
    }
  }, [discordUserInfo?.token])

  // const timer = useRef<NodeJS.Timer | null>(null)
  // const popup = useRef<Window | null>(null)

  // useEffect(() => {
  //   if (authWindowIsOpen) {
  //     popup.current = window.open(DISCORD_AUTH_URL, '_blank', 'popup')
  //     timer.current = setInterval(() => {
  //       popup.current?.closed && setAuthWindowIsOpen(false)
  //     }, 500)
  //   } else
  //   // else {
  //   //   setDotCount(0)
  //   //   timer.current && clearInterval(timer.current)
  //   // }
  //   return () => {
  //     // Clean up on component dismount (route change)
  //     popup.current && popup.current.close()
  //     timer.current && clearInterval(timer.current)
  //   }
  // }, [authWindowIsOpen])

  // useEffect(() => {
  //   if (discordUserInfo?.token) {
  //     toast.success('登录成功')
  //     setAuthWindowIsOpen(false)
  //     navigate(ADMIN_DATA_PANEL_PATH)
  //   }
  // }, [authWindowIsOpen, discordUserInfo])
 
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '18px',
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: '#5865f2',
          textTransform: "none",
        }}
        startIcon={
          <SvgIcon sx={{ width: '40px', height: '40px' }}>  
            <DiscordLogo />
          </SvgIcon>
        }
        onClick={handleDiscordLogin}
      >
        <Typography variant='h6'>
          {authWindowIsOpen ? `等待用户完成授权....` : '使用 Discord 登录'}
        </Typography>
      </Button>

      {/* TODO: add username login functionality in phase 2 */}
      <Button
        variant="contained"
        size="large"
        sx={{
          maxWidth: 'max-content',
          height: '56px',
          textTransform: "none",
        }}
        startIcon={
          <SvgIcon sx={{ width: '40px', height: '40px' }}>  
            <SupervisorAccount />
          </SvgIcon>
        }
        onClick={() => navigate(USERNAME_LOGIN_PATH)}
      >
        <Typography variant='h6'>
          {'用户名密码登录'}
        </Typography>
      </Button>

    </Box>
  )
}

export const LOGIN_MAIN_PAGE_PATH = '/login'