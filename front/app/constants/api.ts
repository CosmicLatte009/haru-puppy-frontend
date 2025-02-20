export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

//api url

export const BACKEND_REDIRECT_URL = 'https://port-0-haru-puppy-backend-1cupyg2klv9dkg9z.sel5.cloudtype.app/auth/login/kakao';

//kakao 인증에 필요한 변수

const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;

export const KAKAO_REDIRECT_URL = 'https://haru-puppy-frontend.vercel.app/auth/callback/kakao';
// export const KAKAO_REDIRECT_URL = 'https://haru-puppy-front.vercel.app/auth/callback/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
