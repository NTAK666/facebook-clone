import React, { memo, useEffect } from 'react';
import './register.scss'
import {
    Backdrop,
    Box,
    ButtonBase,
    Divider,
    Fade,
    FormControlLabel,
    Grid,
    IconButton,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InputRegister from "../../Input/InputRegister";
import IconButtonPopper from "../../Popper/IconButtonPopper";
import HelpIcon from '@mui/icons-material/Help';
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUserRegister } from "../../../app/models/User";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostRegisterMutation } from "../../../app/services/AuthService";
import NProgress from "nprogress";
import LoadingCircle from "../../Loading/LoadingCircle";

interface IProps {
    open: boolean;
    onClose: () => void;
}

const ButtonRegister = styled(ButtonBase)`
  background-color: #00a400;
  border: none;
  border-radius: 6px;
  box-shadow: none;
  color: #fff;
  font-size: 18px;
  height: 36px;
  overflow: hidden;
  padding: 0 50px;
  font-weight: bold;
  text-shadow: none;
`

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    gender: yup.string().required(),
})

const RegisterModal: React.FC<IProps> = ({ open, onClose }) => {
    const [datePicker, setDatePicker] = React.useState('2020-01-01');
    const [postRegister, { isLoading }] = usePostRegisterMutation();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IUserRegister>({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    useEffect(() => {
        if (isLoading) {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }, [isLoading]);

    const handleRegister: SubmitHandler<IUserRegister> = async (data) => {
        const request: IUserRegister = {
            email: data.email,
            lastName: data.lastName,
            firstName: data.firstName,
            birthday: datePicker,
            gender: data.gender,
            password: data.password
        }
        await postRegister(request).then((response: any) => {
            if (response.data.status === 200) {
                setValue('email', '');
                setValue('password', '');
                setValue('firstName', '');
                setValue('lastName', '');
                setValue('birthday', '');
                onClose();
            }
        })
    }

    return (
        <>
            {isLoading && <LoadingCircle />}
            <Modal
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className="root-register-modal">
                        <Box className="header">
                            <Box>
                                <Typography fontSize={"xx-large"} fontWeight={"bolder"}>Đăng ký</Typography>
                                <Typography fontSize={"medium"} className={'text-color-gray'}>Nhanh chóng và dễ
                                    dàng.</Typography>
                            </Box>

                            <IconButton onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Divider sx={{ width: "100%" }} />
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <Grid container spacing={2} className="body">
                                <Grid item xs={6}>
                                    <InputRegister
                                        className={errors.firstName ? 'input-error' : ""} {...register('firstName')}
                                        placeholder={"Họ"} isError={!!errors.firstName}
                                        textPopper={'Tên bạn là gì?'} />
                                </Grid>
                                <Grid item xs={6}><InputRegister
                                    className={errors.firstName ? 'input-error' : ""} {...register('lastName')}
                                    placeholder={"Tên"}
                                    isError={!!errors.lastName}
                                    textPopper={'Tên bạn là gì?'} /></Grid>
                                <Grid item xs={12}><InputRegister isError={!!errors.email}
                                    className={errors.firstName ? 'input-error' : ""}
                                    {...register('email')}
                                    placeholder={"Số di động hoặc email"}
                                    textPopper={'Bạn sẽ sử dụng thông tin này khi đăng nhập và khi cần đặt lại mật khẩu'} />
                                </Grid>
                                <Grid item xs={12}><InputRegister isError={!!errors.password}
                                    className={errors.firstName ? 'input-error' : ""}
                                    type={'password'}
                                    {...register('password')}
                                    placeholder={"Mật khẩu mới"}
                                    textPopper={'Nhập mật khẩu có tối thiểu 6 ký tự bao gồm số, chữ cái và dấu chấm câu(như ! và &).'} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display={'flex'} alignItems={'center'}>
                                        <Typography className={'text-color-gray'} fontWeight={'bolder'}
                                            fontSize={'small'}>Sinh
                                            nhật</Typography>
                                        <IconButtonPopper
                                            text={"Cung cấp ngày sinh của bạn giúp đảm bảo bạn có được trải nghiệm Facebook phù hợp với độ tuổi của mình. Nếu bạn muốn thay đổi người nhìn thấy thông tin này, hãy đi tới phần Giới thiệu trên trang cá nhân của bạn. Để biết thêm chi tiết, vui lòng truy cập vào Chính sách dữ liệu của chúng tôi."}>
                                            <HelpIcon fontSize={'small'} />
                                        </IconButtonPopper>
                                    </Box>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DesktopDatePicker
                                            value={moment(datePicker)}
                                            minDate={moment('1911-01-01')}
                                            onChange={(newValue: any) => {
                                                setDatePicker(newValue.format('YYYY-MM-DD'));
                                            }}
                                            renderInput={(params: any) => <TextField fullWidth {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display={'flex'} alignItems={'center'}>
                                        <Typography className={'text-color-gray'} fontWeight={'bolder'}
                                            fontSize={'small'}>Giới
                                            tính</Typography>
                                        <IconButtonPopper
                                            text={"Về sau, bạn có thể thay đổi những ai nhìn thấy giới tính của mình trên trang cá nhân. Chọn Tùy chỉnh nếu bạn thuộc giới tính khác hoặc không muốn tiết lộ."}>
                                            <HelpIcon fontSize={'small'} />
                                        </IconButtonPopper>
                                    </Box>
                                    <RadioGroup
                                        aria-labelledby="demo-error-radios"
                                        row
                                        defaultValue={true}
                                        {...register('gender')}
                                    >
                                        <FormControlLabel value={true} control={<Radio />} label="Nam" />
                                        <FormControlLabel value={false} control={<Radio />} label="Nữ" />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography mb={2} fontSize={'small'}>
                                        Người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên
                                        Facebook. <Link
                                            to={'/about'} className={'text-decoration-none'}>Tìm hiểu thêm</Link>
                                    </Typography>
                                    <Typography fontSize={'small'}>
                                        Bằng cách nhấp vào Đăng ký, bạn đồng ý với {" "}
                                        <Link className={'text-decoration-none'} to={'/about'}>Điều khoản</Link>, {" "}
                                        <Link className={'text-decoration-none'} to={'/about'}>Chính sách dữ
                                            liệu</Link> {" "}
                                        và <Link className={'text-decoration-none'} to={'/about'}>Chính sách cookie của
                                            chúng
                                            tôi</Link>. Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất
                                        kỳ lúc
                                        nào
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                    <ButtonRegister type={'submit'}>Đăng ký</ButtonRegister>
                                </Grid>
                            </Grid>

                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}
export default memo(RegisterModal);