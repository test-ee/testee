import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import NaverProvider from 'next-auth/providers/naver'
import InstagramProvider from 'next-auth/providers/instagram'
import KakaoProvider from 'next-auth/providers/kakao'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID || '',
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async redirect(params) {
      return '/login-test/signup/check'
    },
    async jwt({ token, account }) {
      return {
        ...token,
        ...account,
      }
    },
    async session({ session, token, user }) {
      session.user = token
      return session
    },
  },
})

export { handler as GET, handler as POST }
