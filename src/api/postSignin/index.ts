import axiosInstance from '..';

const postSignin = async (userId: string) => {
  try {
    const { data } = await axiosInstance.post('/api/user/signin', {
      userId,
    });

    return data;
  } catch (e) {
    console.error(e);

    return null;
  }
};

export default postSignin;
