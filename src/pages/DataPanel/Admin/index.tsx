import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { LoginUserType, selectLoginUserType, selectAdminUserinfo, setAdminLogout, selectDiscordUserInfo, setDiscordUserLogout } from '../../../store/loginUserInfoSlice'

// Mui
import { 
  Paper,
  Box,
  Avatar,
  TextField,
  Autocomplete,
  createFilterOptions,
  Typography,
  Button,
  List,
  Menu,
  MenuItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Divider,
} from '@mui/material'

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// Material Icons
// import SupervisorIcon from '@mui/icons-material/SupervisorAccountTwoTone';
import { Logout, MoreVertSharp,  } from '@mui/icons-material';

// API
import { queryFarms, logout, queryAdmins, queryPersonalInvestment, queryFarmMemberAccountInfo } from '../../../api'
import {  } from '../../../api/types'

// Router
import { useNavigate } from 'react-router-dom' 

interface InputStates {
  username: string
  password: string
  showPassword: boolean
}

interface DataPanelState {
  columns: GridColDef[]
  rows: object[]
}

interface MenuState {
  open: boolean
  anchorEl: HTMLElement | null
}

interface NavMenuOption {
  label: PrimaryMenuNames // Primary label
  subMenuOptions?: SubMenuNames[] // sub menus
}

enum PrimaryMenuNames {
  QueryPersonalInfo = '查询个人账户信息',
  QueryFarmUserInfo = '查询农场用户账户信息',
}

enum SubMenuNames {
  InvestInfo = '投资信息', 
  HoldingInfo = '持有币信息'
}


export const AdminDataPanel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const loginUserType = useSelector(selectLoginUserType)
  // const adminUserInfo = useSelector(selectAdminUserinfo)
  const discordUserInfo = useSelector(selectDiscordUserInfo)

  // const displayUsername = loginUserType === LoginUserType.ADMIN ? adminUserInfo?.username : loginUserType === LoginUserType.DISCORD_USER ? discordUserInfo?.discord : ''


  /** Nav menu states */

  const NavMenuOptions: NavMenuOption[] = [
    {
      label: PrimaryMenuNames.QueryPersonalInfo,
      subMenuOptions: [
        ...Object.values(SubMenuNames)
      ]
    },
    {
      label: PrimaryMenuNames.QueryFarmUserInfo,
      subMenuOptions: [
        ...Object.values(SubMenuNames)
      ]
    },
    // '修改农场用户账户信息',
    // '添加农场用户账户信息',
  ]

  const [selectedMenuName, setSelectedMenuName] = useState<{ 
    primary: PrimaryMenuNames | null, 
    secondary: SubMenuNames | null,
    expanded: PrimaryMenuNames | null, // Controls which primary menu is expanded
  }>({
    primary: null,
    secondary: null,
    expanded: null,
  })

  const handlePrimaryMenuItemClick = (name: PrimaryMenuNames) => {
    setSelectedMenuName((prevState) => ({
      primary: prevState.primary === name ? null : name,
      secondary: null,
      expanded: prevState.expanded === name ? null : name,
    }))
  }


  const handleSubMenuItemClick = (name: SubMenuNames) => {
    setSelectedMenuName((prevState) => ({
      ...prevState,
      secondary: name,
    }))
  }

  /** Data panel state */
  const [dataPanelState, setDataPanelState] = useState<DataPanelState>({ columns: [], rows: [] })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  /** Settings menu state */
  const [menuState, setMenuState] = useState<MenuState>({
    open: false,
    anchorEl: null,
  })

  const handleMenuOpen = (event: any) => {
    setMenuState((prevState) => ({
      open: !prevState.open,
      anchorEl: prevState.open ? null : event.currentTarget,
    }))
  }

  const handleMenuClose = () => {
    setMenuState(() => ({
      open: false,
      anchorEl: null,
    }))
  }

  const handleAdminLogout = async() => {
    // if (adminUserInfo && adminUserInfo.username && adminUserInfo.token) {
    //   const resStatus = await logout(adminUserInfo.username, 0, adminUserInfo.token).then(res => res.status).catch(err => console.log(err))
    //   // Destroy credentials anyway, regardless of api response status
    //   toast.success("已登出")
    //   dispatch(setAdminLogout())
    // }
    toast.success("已登出")
    setTimeout(() => {
      dispatch(setDiscordUserLogout())
    }, 1000)
    // navigate('/login')
  }

  // const handleFetchAllFarms = async() => {
  //   if (adminUserInfo && adminUserInfo.token) {
  //     const resData = await queryFarms(adminUserInfo.token).then(res => console.log(res))
  //   }
  // }

  const pressTestButton = async() => {
    // queryFarms().then(res => console.log(res))
    // queryFarmMemberAccountInfo().then(res => console.log(res))
    // queryPersonalInfoInvestment().then((res) => console.log(res))
  }

  // Auto Complete Input
  const AutoCompletefilterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (item: string) => item,
  });

  // useEffect(() => {
  //   console.log({adminUserInfo, loginUserType})
  // }, [adminUserInfo, loginUserType])

  // const [loginUserType, setLoginUserType] = useState<LoginUserType>(LoginUserType.ADMIN)
  
  return (
    <Paper   
      elevation={24}
      sx={{
        display: 'flex',
        width: '75%',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        margin: 'auto',
      }}
    >
      <Box 
        onClick={event => handleMenuOpen(event)}
        sx={{ width: 'max-content', height: '56px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <Button variant="text" color='inherit' size='large' sx={{ textTransform: 'none' }} >
          <Box sx={{ display: 'flex', alignItems: 'center', justifySelf: 'left' }}>
            <Avatar sx={{ width: 46, height: 46 }} src={discordUserInfo?.avatar} />
            <Typography variant='h4' sx={{ marginLeft: '14px' }} >
              {discordUserInfo?.discord}
            </Typography>
            {/* <IconButton
              aria-label="more"
              sx={{ marginLeft: '4px' }}
              onClick={() => {}}
            >
              <MoreVertIcon />
            </IconButton> */}
          </Box>
        </Button>
      </Box>

      <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
        <Paper 
          elevation={2} 
          sx={{ 
            display: 'flex', 
            flex: 1, 
            margin: '24px 20px 0px 0px' ,
            '&. MuiPaper-root': {
              height: '100%', 
            },
          }}>
          <List sx={{ width: '100%', border: '1px solid grey' }} >
            {Object.values(NavMenuOptions).map((option) => (
              <>
                <ListItemButton
                  key={option.label}
                  sx={{ margin: '6px 0px' }}
                  onClick={() => handlePrimaryMenuItemClick(option.label)}
                >
                  <Typography variant='h6' >{option.label}</Typography>
                </ListItemButton>
                {option.subMenuOptions && 
                  option.subMenuOptions.map((name) => (
                    <Collapse in={option.label === selectedMenuName.primary}>
                      <List disablePadding>
                        <ListItemButton
                          sx={{ 
                            pl: 5, 
                            backgroundColor: selectedMenuName.secondary === name ? '#F5F5F5' : 'unset' 
                          }}
                          onClick={() => handleSubMenuItemClick(name)}
                        >
                          <ListItemText primary={name} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  ))
                }

              </>
            ))}
            <ListItemButton 
              sx={{ position: 'absolute', bottom: 0, width: '100%'}}
              onClick={handleAdminLogout}
            >
              <Logout/>
              <ListItemText primary={'退出登录'} sx={{ marginLeft: '8px' }} />
            </ListItemButton>
          </List>
        </Paper>

        <Box sx={{ flex: 5 }}>
          <Box sx={{ margin: '10px 0px', display: 'flex', alignItems: 'center' }}>
            <TextField
              label={'Discord'}
              variant="outlined"
              size='small'
              sx={{
                minWidth: '25%',
                margin: '14px 20px 14px 0px',
              }}
            />
            
            <Autocomplete
              disablePortal
              id="combo-box"
              options={top100Films}
              sx={{
                minWidth: '25%',
                margin: '14px 20px 14px 0px',
              }}
              renderInput={(params) => <TextField {...params} label="农场" variant="outlined" size='small' />}
            />
            {/* <TextField
              label={'农场'}
              variant="outlined"
              size='small'
              sx={{
                minWidth: '25%',
                margin: '14px 20px 14px 0px',
              }}
            /> */}

            <Button variant='contained' onClick={() => {}}>
              查询
            </Button>

            {/* <Button variant='contained' sx={{ marginLeft: '12px' }} onClick={pressTestButton} >
              Test
            </Button> */}
          </Box>

          <Box sx={{ }}>
            <DataGrid
              // loading={isLoading}
              columns={columns}
              rows={rows}
              pageSize={10}
              disableSelectionOnClick
              disableColumnMenu
              autoHeight
              components={{
                BaseTooltip: Tooltip
              }}
              sx={{
                '& .MuiDataGrid-main': {
                  overflow: 'initial',
                  // height: 'px',
                },
                '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
              }}
              disableDensitySelector
              // experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Box>
      </Box>



      <Menu
        disableAutoFocusItem
        open={menuState.open}
        anchorEl={menuState.anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleAdminLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>退出登录</ListItemText>
        </MenuItem>
      </Menu>
    </Paper >
  )
}

export const ADMIN_DATA_PANEL_PATH = '/admin/panel'

// Test data

const columns: GridColDef[] = [
  { 
    field: 'discord',
    headerName: 'Discord', 
    width: 240,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'memberID',
    headerName: 'Member ID',
    width: 120,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'farmID',
    headerName: 'Farm ID',
    width: 120,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'investhcn',
    headerName: 'Invest HCN',
    width: 120,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'volunteerhcn',
    headerName: 'Volunteer HCN',
    width: 120,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];


const rows = [
  { id: 1, discord: 'Snow#1234', memberID: 'Jon', farmID: '1', investhcn: 35, volunteerhcn: 100, },
  { id: 2, discord: 'Lannister#1234', memberID: 'Cersei', farmID: '1', investhcn: 42, volunteerhcn: 23, },
  { id: 3, discord: 'Brock#1234', memberID: 'Jaime', farmID: '2', investhcn: 45, volunteerhcn: 41, },
  { id: 4, discord: 'Stark#1234', memberID: 'Arya', farmID: '1', investhcn: 16, volunteerhcn: 55, },
  { id: 5, discord: 'Targaryen#1234', memberID: 'Daenerys', farmID: '2', investhcn: 11, volunteerhcn: 235, },
  { id: 6, discord: 'Melisandre#1234', memberID: 'Kaylin', farmID: '2', investhcn: 150, volunteerhcn: 12, },
  { id: 7, discord: 'Clifford#1234', memberID: 'Ferrara', farmID: '3', investhcn: 44, volunteerhcn: 0, },
  { id: 8, discord: 'Frances#1234', memberID: 'Rossini', farmID: '3', investhcn: 36, volunteerhcn: 45, },
  { id: 9, discord: 'Roxie#1234', memberID: 'Harvey', farmID: '1', investhcn: 65, volunteerhcn: 0, },
  { id: 10, discord: 'Snow#1234', memberID: 'Jon', farmID: '1', investhcn: 35, volunteerhcn: 100, },
  { id: 11, discord: 'Lannister#1234', memberID: 'Cersei', farmID: '1', investhcn: 42, volunteerhcn: 23, },
  { id: 12, discord: 'Richard#12', memberID: 'Li', farmID: '2', investhcn: 45, volunteerhcn: 41, },
  { id: 13, discord: 'Brock#1234', memberID: 'Jaime', farmID: '2', investhcn: 45, volunteerhcn: 41, },
  { id: 14, discord: 'Stark#1234', memberID: 'Arya', farmID: '1', investhcn: 16, volunteerhcn: 55, },
  { id: 15, discord: 'Targaryen#1234', memberID: 'Daenerys', farmID: '2', investhcn: 11, volunteerhcn: 235, },
  { id: 16, discord: 'Melisandre#1234', memberID: 'Kaylin', farmID: '2', investhcn: 150, volunteerhcn: 12, },
  { id: 17, discord: 'Clifford#1234', memberID: 'Ferrara', farmID: '3', investhcn: 44, volunteerhcn: 0, },
  { id: 18, discord: 'Frances#1234', memberID: 'Rossini', farmID: '3', investhcn: 36, volunteerhcn: 45, },
  { id: 19, discord: 'Roxie#1234', memberID: 'Harvey', farmID: '1', investhcn: 65, volunteerhcn: 0, },
];

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];
