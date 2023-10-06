import { axiosInstance } from '..'

export const getCheck = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/api/user/check?userId=${userId}`)

    return data
  } catch (e) {
    console.error(e)
  }
}
