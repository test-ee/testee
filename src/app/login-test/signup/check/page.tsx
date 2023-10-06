'use client'

import { getCheck } from '@/api/getCheck'
import { postSignin } from '@/api/postSignin'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function SignUpCheck() {
  const session = useSession()
  const router = useRouter()

  React.useEffect(() => {
    ;(async () => {
      try {
        if (!session.data) return

        const { providerAccountId } = session.data.user as { providerAccountId: string }

        const { data } = await getCheck(providerAccountId)

        if (data.hasAccount) {
          const {
            data: { accessToken, refreshToken },
          } = await postSignin(providerAccountId)

          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', refreshToken)

          router.push('/')
        } else {
          router.push('/login-test/signup')
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [session])
  return <></>
}
