import { jwtVerify } from 'jose'

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY))

    return payload as T
  } catch (e) {
    console.log(e)
    throw new Error('invalid token!')
  }
}
