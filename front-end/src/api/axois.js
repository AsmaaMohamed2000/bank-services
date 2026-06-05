import axios from 'axios'

let accessToken = null

export const setAccessToken = (token)=>{
   accessToken = token
}

export const clearAccessToken = ()=>{
   accessToken = null
}

const axiosInstance = axios.create({
   baseURL:'http://localhost:4000/api',
   withCredentials:true
})



axiosInstance.interceptors.request.use(

   (config)=>{

      if(accessToken){

         config.headers.Authorization =
            `Bearer ${accessToken}`
      }

      return config
   },

   (error)=>{
      return Promise.reject(error)
   }
)



axiosInstance.interceptors.response.use(

   (response)=>{
      return response
   },

   async(error)=>{

      const originalRequest = error.config

      if(
         error.response?.status === 401 &&
         !originalRequest._retry
      ){

         originalRequest._retry = true

         try{

            const response = await axios.post(
               'http://localhost:4000/api/auth/refresh-token',
               {},
               {
                  withCredentials:true
               }
            )

            const newAccessToken =
               response.data.accessToken

            setAccessToken(newAccessToken)
            originalRequest.headers.Authorization =
              `Bearer ${newAccessToken}`

            return axiosInstance(originalRequest)

         }catch(err){

            clearAccessToken()

            window.location.href = '/login'

            return Promise.reject(err)
         }
      }

      return Promise.reject(error)
   }
)

export default axiosInstance