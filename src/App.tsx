// UI
import { Box } from '@mui/material'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux
import { useSelector } from 'react-redux'
import { selectLoginUserType, selectLastLoginUserType } from './store/loginUserInfoSlice'

// Routes
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginMainPage, LOGIN_MAIN_PAGE_PATH } from './pages/Login'
import { DiscordAuthHandler, DISCORD_AUTH_HANDLER_PATH } from './pages/Login/discordAuthHandler'
import { UsernameLogin, USERNAME_LOGIN_PATH } from './pages/Login/UsernameLogin'
import { RegularUserDataPanel, REGULAR_USER_DATA_PANEL_PATH } from './pages/DataPanel/RegularUser'
import { AdminDataPanel, ADMIN_DATA_PANEL_PATH } from './pages/DataPanel/Admin'

// Types
import { LoginUserType } from './store/loginUserInfoSlice'

function App() {
  const loginUserType = useSelector(selectLoginUserType)
  const lastLoginUserType = useSelector(selectLastLoginUserType)

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Routes>
        <Route path="/" element={<Navigate to={LOGIN_MAIN_PAGE_PATH} />} />
        <Route path={LOGIN_MAIN_PAGE_PATH} element={<LoginMainPage />} />
        <Route path={DISCORD_AUTH_HANDLER_PATH} element={<DiscordAuthHandler />} />
        <Route path={USERNAME_LOGIN_PATH} element={<UsernameLogin />} />
        {/* <Route path={DATA_PANEL_PATH} element={ // TODO: navigate to new main login page
          loginUserType ? 
            <DataPanel />
            : 
            <Navigate to={LOGIN_MAIN_PAGE_PATH}/> 
        }/> */}
        <Route path={ADMIN_DATA_PANEL_PATH} element={<AdminDataPanel />}/>
        <Route path={REGULAR_USER_DATA_PANEL_PATH} element={<RegularUserDataPanel />}/>
      </Routes>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme="colored"
      />
    </Box>
  );
}

export default App;
