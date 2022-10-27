import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

// MUI
import { Box, Button, SvgIcon, Typography } from '@mui/material'
import { SupervisorAccount } from '@mui/icons-material'

// Components
import {ReactComponent as DiscordLogo} from './discord_logo.svg'

// API
import { REQUEST_URL_BASE, DISCORD_AUTH_URL } from '../../api'

// Router
import { useNavigate, useLocation } from 'react-router-dom' 
import { USERNAME_LOGIN_PATH } from './UsernameLogin'


export const LoginMainPage = () => {

  const location = useLocation()
  const navigate = useNavigate()

  /** Discord auth states & managers */
  const [awaitDiscordAuth, setAwaitDiscordAuth] = useState<boolean>(false)
  const [dotCount, setDotCount] = useState<number>(0)

  const timer = useRef<NodeJS.Timer | null>(null)
  const popup = useRef<Window | null>(null)

  useEffect(() => {
    if (awaitDiscordAuth) {
      // window.addEventListener('message', (event) => console.log(event.data))
      popup.current = window.open(DISCORD_AUTH_URL, '_blank', 'popup')
      popup.current?.addEventListener('popstate', (event) => {
      popup.current?.alert('!!!!')
      popup.current?.postMessage(event, "*")
    })
      // popup.current?.onpopstate = () => {}
      timer.current = setInterval(() => {
        popup.current?.closed ? setAwaitDiscordAuth(false) : setDotCount(count => count < 4 ? count + 1 : 1);
      }, 1000)
    } else {
      setDotCount(0)
      timer.current && clearInterval(timer.current)
    }
    return () => {
      // Clean up on component dismount (route change)
      popup.current && popup.current.close()
      timer.current && clearInterval(timer.current)
    }
  }, [awaitDiscordAuth])
 
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
        onClick={() => setAwaitDiscordAuth(true)}
      >
        <Typography variant='h6'>
          {awaitDiscordAuth ? `等待用户完成授权${'.'.repeat(dotCount)}` : '使用 Discord 登录'}
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