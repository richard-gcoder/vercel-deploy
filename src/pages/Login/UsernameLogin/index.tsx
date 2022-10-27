import React, { useState, useCallback } from 'react'
import { toast } from 'react-toastify';

// Mui
import { Box, Paper, TextField, TextFieldProps, Button, IconButton } from '@mui/material'
import { Visibility, VisibilityOff, Reply } from '@mui/icons-material'

// API
import { adminLogin } from '../../../api'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setAdminLogin, selectAdminUserinfo } from '../../../store/loginUserInfoSlice'

// Router
import { useNavigate } from 'react-router-dom' 
import { LOGIN_MAIN_PAGE_PATH } from '../' 

interface InputStates {
  username: string
  password: string
  showPassword: boolean
}

export const UsernameLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const adminLoginInfo = useSelector(selectAdminUserinfo)

  const [states, setStates] = useState<InputStates>({
    username: '',
    password: '',
    showPassword: false,
  })

  const handleInputchange = (state: keyof InputStates) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setStates({ ...states, [state]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setStates({
      ...states,
      showPassword: !states.showPassword,
    });
  };

  const handleLogin = async() => {
    // Axios request here to login
    const username = states.username
    const resData = await adminLogin(username, states.password).then((res) => res.data).catch(err => toast.error(`系统错误: ${err}`))
    const token = resData.data?.token
    if(!token) {
      !token && toast.warning("用户名或密码无效")
      return
    } 
    dispatch(setAdminLogin({username: username, token: token}))
    toast.success("管理员登录成功")
    navigate('/data-panel')
  }

  const CustomTextField: React.FC<TextFieldProps> = useCallback((props) => {
    return (
      <TextField
        variant="outlined"
        sx={{
          minWidth: '50%',
          margin: '14px 0',
        }}
        {...props}
      >
      </TextField>
    )
  }, [])

  return (
    <Paper   
      elevation={24}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        maxWidth: '600px',
        maxHeight: '1000px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px'
      }}
    >
      <h1>用户名登录</h1>
      <CustomTextField label="用户名" value={states.username} onChange={handleInputchange('username')} />
      <CustomTextField 
        label="密码" 
        type={states.showPassword ? 'text' : 'password'}
        value={states.password} 
        onChange={handleInputchange('password')} 
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={handleClickShowPassword}>
              {states.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          )
        }}
      />
      <Button
        variant="contained"
        size="large"
        sx={{
          textTransform: "none",
          minWidth: '50%',
          margin: '14px 0',
        }}
        onClick={handleLogin}
      >
        登录
      </Button>
      <Button
        variant="contained"
        size="large"
        color='error'
        sx={{
          textTransform: "none",
          maxWidth: 'max-content',
          minWidth: '50%',
        }}
        onClick={() => navigate(LOGIN_MAIN_PAGE_PATH)}
      >
        返回
      </Button>
    </Paper >
  )
}

export const USERNAME_LOGIN_PATH = '/login/username'