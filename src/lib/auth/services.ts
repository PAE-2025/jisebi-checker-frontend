import axios from "axios";
// import axiosWithAuth from "../axiosWithAuth";

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    console.log(username);
    const response = await axios.post(
      process.env.AUTH_SERVICE + "/auth/login",
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message || "Login gagal");
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    console.error("Login error:", error);
    throw new Error("Terjadi kesalahan saat login");
  }
};
