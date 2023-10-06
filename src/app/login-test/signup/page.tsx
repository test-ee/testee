'use client'

import { postSignup } from '@/api/postSignup'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent } from 'react'

export default function SignUp() {
  const session = useSession()
  const router = useRouter()

  const [formData, setFormData] = React.useState({
    email: session.data?.user?.email || '',
    nickname: (session.data?.user as { nickname: string }).nickname || '',
    profileImageUrl: (session.data?.user as { profileImageUrl: string }).profileImageUrl || '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      const { provider, providerAccountId } = session.data?.user as { provider: string; providerAccountId: string }
      const { email, nickname, profileImageUrl } = formData

      const {
        data: { accessToken, refreshToken },
      } = await postSignup({
        id: providerAccountId,
        email,
        nickname,
        profileImageUrl,
        provider,
      })

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      router.push('/')
    } catch (e) {
      console.error(e)
    }
  }

  React.useEffect(() => {
    console.log(session)
    if (session.status === 'unauthenticated') {
      router.push('/login-test')
    }
  }, [session])

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center align-middle text-black bg-white'>
      <input id='email' value={formData.email} onChange={handleChange} type='email' placeholder='이메일' />
      <input id='nickname' value={formData.nickname} onChange={handleChange} type='text' placeholder='닉네임' />
      <input id='profileImageUrl' value={formData.profileImageUrl} onChange={handleChange} type='file' />
      <button type='submit'>회원가입</button>
    </form>
  )
}
