import React, {useEffect, useState} from 'react'
import './login.scss'
import {Box, ButtonBase, Container, Divider, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {Link, useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from "react-hook-form";
import {IUserLogin} from "../../app/models/User";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import RegisterModal from "../../components/Modal/Register";
import {useGetMeQuery, usePostLoginMutation} from "../../app/services/AuthService";
import NProgress from "nprogress";
import {useAppSelector} from "../../app/hook";

const InputLogin = styled("input")`
  background-color: white;
  border-radius: 6px;
  font-size: 17px;
  padding: 16px 18px;
  width: 360px;
  border: 1px solid #dddfe2;
  outline: none;
  margin-top: 10px;

  &:focus {
    border: 2px solid #1877f2;
  }
`

const ButtonLogin = styled(ButtonBase)`
  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 48px;
  padding: 0 18px;
  width: 360px;
  color: white;
  font-weight: bold;
  margin-top: 10px;
`

const ButtonCreateNew = styled(ButtonBase)`
  border: none;
  border-radius: 6px;
  font-size: 17px;
  line-height: 48px;
  padding: 0 16px;
  background-color: #42b72a;
  color: white;
  font-weight: bold;
  margin: 10px;
`

const schema = yup.object().shape({
    email: yup.string().email().required("Email hoặc số di động bạn nhập không kết nối với tài khoản nào"),
    password: yup.string().required("Mật khẩu không được để trống")
})

const LoginPage: React.FC = () => {
    const {refetch, isLoading: getMeLoading} = useGetMeQuery();
    const {isLoggedIn} = useAppSelector(state => state.authSlice);
    const navigate = useNavigate();
    const {register, setValue, formState: {errors}, handleSubmit} = useForm<IUserLogin>({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    })
    const [postLoginApi, {isLoading: loginLoading}] = usePostLoginMutation();
    const [openRegister, setOpenRegister] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
        if (loginLoading || getMeLoading) {
            NProgress.start()
        } else {
            NProgress.done()
        }

    }, [loginLoading, getMeLoading, navigate, isLoggedIn]);

    const handleLogin: SubmitHandler<IUserLogin> = async (data) => {
        await postLoginApi(data).then(async (response: any) => {
            const data = response.data.data;
            if (response.data.status === 200) {
                setValue("email", "");
                setValue("password", "");
                window.localStorage.setItem("auth", data.token);
                refetch();
            }
        })
    }

    return (
        <Box className="root__login">
            <Box className="login__top">
                <Container className="login__content">
                    <Box className="content">
                        <img src="/images/dF5SId3UHWd.svg" alt="" className="content__logo"/>
                        <Typography className="content__text">
                            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                        </Typography>
                    </Box>
                    <Box>
                        <form className="login__form" onSubmit={handleSubmit(handleLogin)}>
                            <InputLogin type="text"
                                        className={`${errors.email ? "input__login--error" : ""}`} {...register("email")}
                                        placeholder="Email hoặc số điện thoại"/>
                            {errors.email && <Typography className="message__login--error">
                                {errors.email.message}.
                                {" "}
                                <Link to="/login" className="text-decoration-none">
                                    <Typography className="message__error-link" component="span">
                                        Hãy tìm tài khoản của bạn và đăng nhập.
                                    </Typography>
                                </Link>
                            </Typography>}
                            <InputLogin type="password" {...register("password")}
                                        className={`${errors.password ? "input__login--error" : ""}`}
                                        placeholder="Mật khẩu"/>
                            {errors.password && <Typography className="message__login--error">
                                {errors.password.message}
                            </Typography>}
                            <ButtonLogin type="submit">Đăng nhập</ButtonLogin>
                            <Link className="forgot__text" to="/forgot-password">Quên mật khẩu?</Link>
                            <Divider sx={{width: "332px"}}/>
                            <ButtonCreateNew onClick={() => setOpenRegister(true)}>Tạo tài khoản mới</ButtonCreateNew>
                        </form>
                        <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)}/>
                        <Box sx={{
                            width: "390px",
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                            marginTop: "30px"
                        }}>
                            <Typography>
                                <Link to="/create-page" style={{textDecoration: "none"}}>
                                    <Typography color="black" fontWeight="bold" component="span">Tạo Trang</Typography>
                                </Link>
                                {" "}
                                dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box className="login__bottom">
                <Container className="bottom__list">
                    <Link className="text-footer" to={"/login"}>Đăng ký</Link>
                    <Link className="text-footer" to={"/login"}>Đăng nhập</Link>
                    <Link className="text-footer" to={"/login"}>Messenger</Link>
                    <Link className="text-footer" to={"/login"}>Facebook</Link>
                    <Link className="text-footer" to={"/login"}>LiteWatch</Link>
                    <Link className="text-footer" to={"/login"}>Địa điểm</Link>
                    <Link className="text-footer" to={"/login"}>Trò chơi</Link>
                    <Link className="text-footer" to={"/login"}>Marketplace</Link>
                    <Link className="text-footer" to={"/login"}>Facebook Pay</Link>
                    <Link className="text-footer" to={"/login"}>Oculus</Link>
                    <Link className="text-footer" to={"/login"}>Portal</Link>
                    <Link className="text-footer" to={"/login"}>Instagram</Link>
                    <Link className="text-footer" to={"/login"}>Bulletin</Link>
                    <Link className="text-footer" to={"/login"}>Địa phương</Link>
                    <Link className="text-footer" to={"/login"}>Chiến dịch gây quỹ</Link>
                    <Link className="text-footer" to={"/login"}>Dịch vụ</Link>
                    <Link className="text-footer" to={"/login"}>Trung tâm thông tin bỏ phiếu</Link>
                    <Link className="text-footer" to={"/login"}>Nhóm</Link>
                    <Link className="text-footer" to={"/login"}>Giới thiệu</Link>
                    <Link className="text-footer" to={"/login"}>Tạo quảng cáo</Link>
                    <Link className="text-footer" to={"/login"}>Tạo Trang</Link>
                    <Link className="text-footer" to={"/login"}>Nhà phát triển</Link>
                    <Link className="text-footer" to={"/login"}>Tuyển dụng</Link>
                    <Link className="text-footer" to={"/login"}>Quyền riêng tư</Link>
                    <Link className="text-footer" to={"/login"}>Cookie</Link>
                    <Link className="text-footer" to={"/login"}>Lựa chọn quảng cáo</Link>
                    <Link className="text-footer" to={"/login"}>Điều khoản</Link>
                    <Link className="text-footer" to={"/login"}>Trợ giúp</Link>
                    <Link className="text-footer" to={"/login"}>Tải thông tin liên hệ lên & đối tượng không phải người
                        dùng</Link>
                    <Link className="text-footer" to={"/login"}>Cài đặt</Link>
                </Container>
            </Box>
        </Box>
    )
}

export default LoginPage