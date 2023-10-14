import axiosInstance from '..';

const getCheck = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/api/user/check?userId=${userId}`);

    return data;
  } catch (e) {
    console.error(e);

    return e;
  }
};

export default getCheck;
