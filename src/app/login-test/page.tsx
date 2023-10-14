'use client';

import { signIn, signOut } from 'next-auth/react';

export default function LoginTest() {
  return (
    <div>
      <div>
        <button type='button' onClick={() => signIn('kakao')}>
          kakao login
        </button>
      </div>
      <div>
        <button type='button' onClick={() => signIn('naver')}>
          naver login
        </button>
      </div>
      <div>
        <button type='button' onClick={() => signIn('google')}>
          google login
        </button>
      </div>
      <div>
        <button type='button' onClick={() => signIn('instagram')}>
          instagram login
        </button>
      </div>
      <div>
        <button type='button' onClick={() => signOut({ redirect: false })}>
          logout
        </button>
      </div>
    </div>
  );
}
