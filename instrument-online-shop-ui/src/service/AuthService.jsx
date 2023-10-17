import { toast } from "react-toastify";
import { loginApi, registerApi } from "./UserService";
import Cookies from "js-cookie";

const handleLogin = async (data) => {
  try {
    const res = await loginApi(data.username, data.password);
    console.log("check respone: ", res);

    if (res && res.data.accessToken) {
      const user = {
        token: res.data.accessToken,
        username: data.username,
      };
      // localStorage.setItem("user", JSON.stringify(user));
      Cookies.set("user", JSON.stringify(user));
    } else {
      if (res && res.status !== 200) {
        toast.error(res.data.error);
      }
    }
    // Điều hướng tới trang sau khi đăng nhập thành công
    window.location.href = "/";
  } catch (error) {
    // Xử lý lỗi đăng nhập
    toast.error("Username/password is not valid");
  }
};

const handleRegister = async (data) => {
  try {
    let res;
    try {
      res = await registerApi(
        data.name,
        data.email,
        data.username,
        data.password
      );
    } catch (apiError) {
      if (apiError.response && apiError.response.status === 409) {
        // Username đã tồn tại
        toast.error("Tài khoản đã tồn tại");
      } else {
        // Xử lý các lỗi khác nếu cần
        toast.error("Có lỗi xảy ra khi đăng ký");
      }
      return;
    }

    console.log("check response: ", res);

    if (res.status === 200) {
      // Đăng ký thành công, thực hiện đăng nhập
      handleLogin(data);
    } else {
      // Xử lý lỗi khác nếu cần
      toast.error("Có lỗi xảy ra khi đăng ký");
    }
  } catch (error) {
    // Xử lý lỗi nếu có lỗi trong quá trình gọi API
    toast.error("Có lỗi xảy ra khi gọi API");
  }
};

export { handleLogin, handleRegister };
