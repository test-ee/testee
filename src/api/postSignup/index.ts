import axiosInstance from '..';

interface PostSignUpProps {
  id: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
  provider: string;
}

const postSignup = async (request: PostSignUpProps) => {
  try {
    const { data } = await axiosInstance.post('/api/user/signup', request);

    return data;
  } catch (e) {
    console.error(e);

    return null;
  }
};

export default postSignup;
