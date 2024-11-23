import axios from "axios";

// baseURL 설정
const baseURL = "https://api.mymoo.site";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL,
  timeout: 1000 * 60 * 5, // 요청 타임아웃 설정 (5분)
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use((config) => {
  // 로컬 스토리지에서 accessToken 가져오기
  const storage = localStorage.getItem("mymoo");
  if (storage) {
    const parsedStorage = JSON.parse(storage);
    if (parsedStorage["user-token"]) {
      // Authorization 헤더에 Bearer {accessToken} 형식으로 추가
      config.headers.Authorization = `Bearer ${parsedStorage["user-token"]}`;
    }
  }

  return config;
});

export default axiosInstance;

export const SigninAPI = async (data) => {
  console.log("로그인 요청 데이터:", data);
  try {
    const response = await axiosInstance.post(`/api/v1/auth/login`, data);
    console.log("서버 응답 데이터:", response.data);
    return response;
  } catch (error) {
    console.error("Axios 요청 에러:", error.response || error.message);
    throw error;
  }
};

export const getUserInfoAPI = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/accounts/`);
    console.log("사용자 정보 응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("사용자 정보 요청 에러:", error.response || error.message);
    throw error;
  }
};
