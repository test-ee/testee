'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function LoginTest() {
  const session = useSession()

  return (
    <div>
      <div>
        <button onClick={() => signIn('kakao')}>kakao login</button>
      </div>
      <div>
        <button onClick={() => signIn('naver')}>naver login</button>
      </div>
      <div>
        <button onClick={() => signIn('google')}>google login</button>
      </div>
      <div>
        <button onClick={() => signIn('instagram')}>instagram login</button>
      </div>
      <div>
        <button onClick={() => signOut({ redirect: false })}>logout</button>
      </div>
    </div>
  )
}
