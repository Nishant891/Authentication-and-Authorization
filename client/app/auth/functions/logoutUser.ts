"use server"
import axios, { AxiosResponse } from 'axios'
import cookie from '@boiseitguru/cookie-cutter'
import { cookies } from 'next/headers'

export const logoutUser = async () => {
    try {
      const refreshToken = cookie.get('refreshToken'); 
      const response : AxiosResponse = await axios.post('http://localhost:8000/logout',
      {refreshToken});
      if(response.data.success){
        cookies().delete('accessTokenCookie');
        cookies().delete('refreshTokenCookie');
        return {
          success: response.data.success,
          message: response.data.message,
        }
      }
    }
    catch (error) {
      throw new Error('Cannot logout user')
    }
}