import { useEffect } from 'react'
import { toast } from 'react-toastify';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setAdminLogin, selectAdminUserinfo } from '../../store/loginUserInfoSlice'

export const DiscordAuthHandler = () => {

  const dispatch = useDispatch()

  useEffect(() => {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const res = JSON.parse(`${urlSearchParams.get('result')}`)
    console.log(typeof res)
    console.log(res)
    const accessToken = res?.data

    if (!accessToken) {
      toast.warning("发生了未知错误，请关闭此窗口并重试Discord登录")
      return
    }

    // Get user's avatar and name using token
    // fetch('https://discord.com/api/users/@me', {
    //   headers: {
    //     authorization: `Bearer ${accessToken}`,
    //   },
    // }).then(result => result.json())
    //   .then(response => {
    //     const { username, discriminator } = response
    //     console.log({ username, discriminator })
    //   })
 
    // fetch('https://discord.com/api/users/@me', {
    //   headers: {
    //     authorization: `${tokenType} ${accessToken}`,
    //   },
    // })
    //   .then(result => result.json())
    //   .then(response => {
    //     const { username, discriminator } = response;
    //     setState((prevState) => ({
    //       ...prevState,
    //       username: `${username}` || "",
    //       discriminator: `${discriminator}` || "",
    //     }))
    //     alert(`username: ${username}, discriminator: ${discriminator}`)
    //   })
    //   .catch(console.error);
  }, [])

  return (<></>)
}

export const DISCORD_AUTH_HANDLER_PATH = '/data'