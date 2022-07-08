import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    Avatar,
    Modal,
    AvatarGroup,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Typography, Slider
} from "@mui/material";
import ButtonBase from '@mui/material/ButtonBase';
import styles from './profile-information.module.scss';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {PROFILE_LINK} from "../../../constants/profile-link";
import {useLocation} from "react-router-dom";
import NavigateProfileItem from "../NavigateProfileItem";
import {useAppSelector} from "../../../app/hook";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import UploadIcon from '@mui/icons-material/Upload';
import Cropper, {Point, Area} from "react-easy-crop";
import {PROFILE_IMAGE} from "../../../constants";
import getCroppedImg from "../../../utils/CropImage";
import {IUserUpdate} from "../../../app/models/User";
import {useUpdateUserMutation} from "../../../app/services/UserService";


interface props {
}

const ProfileInformation: React.FC<props> = () => {
    const {pathname} = useLocation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [self, setSelf] = React.useState(false);
    const {userCurrent} = useAppSelector(state => state.userSlice);
    const {user} = useAppSelector(state => state.authSlice);
    const [userUpdateApi] = useUpdateUserMutation();

    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [avatarPreview, setAvatarPreview] = useState("");
    const [coverPreview, setCoverPreview] = useState("");
    const [crop, setCrop] = useState<Point>({x: 0, y: 0})
    const [sliderValue, setSliderValue] = React.useState<number | string | Array<number | string>>(
        30,);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const avaRef = useRef<any>(null);
    const coverRef = useRef<any>(null);


    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [openModalCovered, setOpenModalCovered] = React.useState(false);
    const handleOpenModalCovered = () => setOpenModalCovered(true);
    const handleCloseModalCovered = () => setOpenModalCovered(false);

    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setSliderValue(newValue);
        setZoom(event.target.value / 50);
    };

    useEffect(() => {

        if (userCurrent.id === user.id) {
            setSelf(true);
        }
    }, [userCurrent, user]);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const chooseImageAvatar = (e: any) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setAvatarPreview(reader.result as string);
            avaRef.current.value = null;
        }
    }

    const chooseImageCover = (e: any) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setCoverPreview(reader.result as string);
            avaRef.current.value = null;
        }
    }

    const changeSlider = (type: string) => {
        if (type === "increment") {
            if (sliderValue >= 100) {
                setSliderValue(100);
            } else {
                setSliderValue(+sliderValue + 10);
            }
            setZoom(+sliderValue / 50);
        } else {
            if (sliderValue <= 0) {
                setSliderValue(0);
            } else {
                setSliderValue(+sliderValue - 10);
            }
            setZoom(+sliderValue / 50);
        }
    }

    const changeRotation = () => {
        if (rotation < 0) {
            setRotation(360);
        } else if (rotation > 360) {
            setRotation(0);
        } else {
            setRotation(rotation + 90);
        }
    }

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const renderNavigate = useMemo(() => {
        return PROFILE_LINK.map((item, index) => {
            return <NavigateProfileItem title={item.title} key={index}
                                        to={`/profile/${userCurrent.userInfo.slug}-${userCurrent.id}${item.to}`}
                                        active={pathname === item.to}>
                <Typography
                    sx={{textDecoration: 'none', fontWeight: '600', fontSize: '.875rem'}}>{item.title}</Typography>
            </NavigateProfileItem>
        })
    }, [userCurrent, pathname]);

    const updateAvatar = useCallback(async () => {
        const cropAvatarImage = await getCroppedImg(
            avatarPreview,
            croppedAreaPixels,
            rotation
        )

        if (cropAvatarImage) {
            const request: IUserUpdate = {
                avatar: cropAvatarImage,
            }

            userUpdateApi(request).then((response: any) => {
                if (response.data.status === 200) {
                    handleCloseModal();
                }
            })
        }

    }, [userUpdateApi, croppedAreaPixels, rotation, avatarPreview])

    const updateCover = useCallback(async () => {
        const cropCoverImage = await getCroppedImg(
            coverPreview,
            croppedAreaPixels,
            rotation
        )

        if (cropCoverImage) {
            const request: IUserUpdate = {
                coverImage: cropCoverImage,
            }

            userUpdateApi(request).then((response: any) => {
                if (response.data.status === 200) {
                    handleCloseModalCovered();
                }
            })
        }

    }, [userUpdateApi, croppedAreaPixels, rotation, coverPreview])

    return (
        <Box>
            <Box className={styles.headerProfile}>
                <Box className={styles.backgroundInformation}>
                    <Box className={styles.blur}>
                        <img className={styles.coverBlur} src={userCurrent.userInfo.coverImage || PROFILE_IMAGE.COVER}
                             alt=""/>
                    </Box>
                    <Container className={styles.information}>
                        <Grid container>
                            <Grid item xs={10}>
                                <img className={styles.cover}
                                     src={coverPreview  ? coverPreview : (userCurrent.userInfo.coverImage || PROFILE_IMAGE.COVER)}
                                     alt=""/>
                                {self ? <ButtonBase
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    sx={{backgroundColor: 'white', color: 'black'}} className={styles.buttonEditCover}
                                >
                                    <CameraAltIcon sx={{fontSize: '16px'}}/> <Typography
                                    sx={{fontSize: '.875rem', fontWeight: '600'}}>Chỉnh sửa ảnh bìa</Typography>
                                </ButtonBase> : null}
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem><ButtonBase sx={{gap: '10px'}} onClick={handleOpenModalCovered}>
                                        <FileUploadOutlinedIcon/> <Typography>
                                        Tải lên
                                    </Typography>
                                    </ButtonBase>
                                    </MenuItem>
                                    <Modal
                                        open={openModalCovered}
                                        onClose={handleCloseModalCovered}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box className={styles.modalCover}>
                                            <Box className={styles.headerModalCover}>
                                                <Typography id="modal-modal-title" variant="h6"
                                                            className={styles.modalTitle}>
                                                    Cập nhật ảnh bìa
                                                </Typography>
                                                <IconButton onClick={handleCloseModalCovered}
                                                            className={styles.closeButton}
                                                            aria-label="delete">
                                                    <CloseIcon/>
                                                </IconButton>
                                            </Box>
                                            <hr/>
                                            <Box className={styles.coverPreview}>
                                                <Box className={styles.wrapperImagePreviewCover}>
                                                    <Cropper
                                                        image={coverPreview}
                                                        crop={crop}
                                                        classes={{
                                                            containerClassName: 'crop-container',
                                                            mediaClassName: 'crop-media',
                                                            cropAreaClassName: 'crop-area'
                                                        }}
                                                        zoom={zoom}
                                                        cropSize={{width: 920, height: 412}}
                                                        rotation={rotation}
                                                        aspect={16 / 9}
                                                        onCropChange={setCrop}
                                                        onCropComplete={onCropComplete}
                                                        onZoomChange={setZoom}
                                                        showGrid={false}
                                                        objectFit="contain"
                                                    />
                                                </Box>
                                                <Box className={styles.footerCover}>
                                                    <Box className={styles.zoomImageCover}>
                                                        <IconButton onClick={() => changeSlider('decrement')}>
                                                            <RemoveIcon/>
                                                        </IconButton>
                                                        <Slider
                                                            value={typeof sliderValue === 'number' ? sliderValue : 0}
                                                            onChange={handleSliderChange}
                                                        />
                                                        <IconButton onClick={() => changeSlider('increment')}>
                                                            <AddIcon/>
                                                        </IconButton>
                                                    </Box>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        gap: '20px',
                                                        marginTop: '20px'
                                                    }}>
                                                        <ButtonBase className={styles.buttonUploadCover}
                                                        >
                                                            <label htmlFor='cover_file' className="wrapper-ab"></label>
                                                            <input type="file" onChange={chooseImageCover} ref={coverRef}
                                                                   hidden id="cover_file"/>
                                                            <UploadIcon fontSize={`small`}/>
                                                            <Typography fontWeight={`bold`}
                                                                        fontSize={`small`}>Tải ảnh khác</Typography>
                                                        </ButtonBase>
                                                        <ButtonBase className={styles.buttonRotateCover}
                                                                    onClick={changeRotation}>
                                                            <CropRotateIcon fontSize={`small`}/>
                                                            <Typography fontWeight={`bold`}
                                                                        fontSize={`small`}>Xoay</Typography>
                                                        </ButtonBase>
                                                        <ButtonBase className={styles.buttonSaveCover} onClick={updateCover}>
                                                            <Typography fontWeight={`bold`}
                                                                        fontSize={`small`}>Lưu</Typography>
                                                        </ButtonBase>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Modal>
                                    <hr/>
                                    <MenuItem onClick={handleClose}
                                              sx={{gap: '10px'}}><DeleteOutlineOutlinedIcon/> Gỡ</MenuItem>
                                </Menu>
                                <Box className={styles.avatar}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={avatarPreview ? avatarPreview : (userCurrent.userInfo.avatar || PROFILE_IMAGE.AVATAR)}
                                        sx={{width: 165, height: 165, border: '5px solid white'}}
                                    />
                                    <IconButton onClick={handleOpenModal} sx={{
                                        position: 'absolute', bottom: '5%', right: '12%', backgroundColor: '#E4E6EB',
                                        '&:hover': {backgroundColor: '#D8DADF'}
                                    }}>
                                        <CameraAltIcon sx={{fontSize: '22px'}}/>
                                    </IconButton>
                                    <Modal
                                        open={openModal}
                                        onClose={handleCloseModal}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box className={styles.modal}>
                                            <Box className={styles.headerModal}>
                                                <Typography id="modal-modal-title" variant="h6"
                                                            className={styles.modalTitle}>
                                                    Cập nhật ảnh đại diện
                                                </Typography>
                                                <IconButton onClick={handleCloseModal} className={styles.closeButton}
                                                            aria-label="delete">
                                                    <CloseIcon/>
                                                </IconButton>
                                            </Box>
                                            <hr/>
                                            <Box className={styles.avatarPreview}>
                                                <Box className={styles.wrapperImagePreview}>
                                                    <Cropper
                                                        image={avatarPreview}
                                                        crop={crop}
                                                        cropSize={{height: 300, width: 300}}
                                                        classes={{
                                                            containerClassName: 'crop-container',
                                                            mediaClassName: 'crop-media',
                                                            cropAreaClassName: 'crop-area'
                                                        }}
                                                        zoom={zoom}
                                                        rotation={rotation}
                                                        aspect={1}
                                                        cropShape="round"
                                                        onCropChange={setCrop}
                                                        onCropComplete={onCropComplete}
                                                        onZoomChange={setZoom}
                                                        showGrid={false}
                                                        objectFit="contain"
                                                    />
                                                </Box>
                                                <Box className={styles.footer}>
                                                    <Box className={styles.zoomImage}>
                                                        <IconButton onClick={() => changeSlider('decrement')}>
                                                            <RemoveIcon/>
                                                        </IconButton>
                                                        <Slider
                                                            value={typeof sliderValue === 'number' ? sliderValue : 0}
                                                            onChange={handleSliderChange}
                                                        />
                                                        <IconButton onClick={() => changeSlider('increment')}>
                                                            <AddIcon/>
                                                        </IconButton>
                                                    </Box>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        gap: '20px',
                                                        marginTop: '20px'
                                                    }}>
                                                        <ButtonBase className={styles.buttonUpload}>
                                                            <label htmlFor='avatar_file' className="wrapper-ab"></label>
                                                            <input type="file" onChange={chooseImageAvatar} ref={avaRef}
                                                                   hidden id="avatar_file"/>
                                                            <UploadIcon fontSize={`small`}/>
                                                            <Typography fontWeight={`bold`}
                                                                        fontSize={`small`}>Tải lên</Typography>
                                                        </ButtonBase>
                                                        <ButtonBase className={styles.buttonRotate}
                                                                    onClick={changeRotation}>
                                                            <CropRotateIcon fontSize={`small`}/>
                                                            <Typography fontWeight={`bold`}
                                                                        fontSize={`small`}>Xoay</Typography>
                                                        </ButtonBase>
                                                        <ButtonBase className={styles.buttonSave}
                                                                    onClick={updateAvatar}>
                                                            <Typography fontWeight={`bold`}
                                                                        fontSize={`small`}>Lưu</Typography>
                                                        </ButtonBase>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Modal>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{bottom: '0'}}>
                            <Grid item xs={2} sx={{position: 'relative'}}>

                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{marginTop: '25px'}}>
                                    <h1>{`${userCurrent.userInfo.firstName} ${userCurrent.userInfo.lastName}`}</h1>
                                </Typography>
                                <Typography sx={{fontSize: '1rem', fontWeight: '600', color: '#65676B'}}>2,5K bạn
                                    bè</Typography>
                                <AvatarGroup total={24} sx={{float: 'left'}}>
                                    <Avatar
                                        src="data:image/jpeg;base64,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"/>
                                    <Avatar
                                        src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-cap-2-3.jpg"/>
                                    <Avatar
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRog-6aP2E0jJluyzbEvE0Rzhrmh9N7D6MT9g&usqp=CAU"/>
                                    <Avatar
                                        src="https://pdp.edu.vn/wp-content/uploads/2021/01/hinh-anh-girl-xinh-toc-ngan-de-thuong.jpg"/>
                                </AvatarGroup>
                            </Grid>
                            <Grid item xs={6} className={styles.buttonFunction}>
                                {self ? <ButtonBase sx={{
                                    gap: '5px',
                                    backgroundColor: '#1B74E4',
                                    color: 'white',
                                    padding: '8px 12px 8px 12px',
                                    borderRadius: '6px'
                                }}>
                                    <AddCircleIcon sx={{fontSize: '20px'}}/>
                                    <Typography sx={{fontSize: '.875rem', fontWeight: '600'}}>
                                        Thêm vào tin
                                    </Typography>
                                </ButtonBase> : <ButtonBase sx={{
                                    gap: '5px',
                                    backgroundColor: '#1B74E4',
                                    color: 'white',
                                    padding: '8px 12px 8px 12px',
                                    borderRadius: '6px'
                                }}>
                                    <PersonAddIcon sx={{fontSize: '20px'}}/>
                                    <Typography sx={{fontSize: '.875rem', fontWeight: '600'}}>
                                        Thêm bạn bè
                                    </Typography>
                                </ButtonBase>}
                                {self ? <ButtonBase sx={{
                                    gap: '5px',
                                    backgroundColor: '#E4E6EB',
                                    color: 'black',
                                    padding: '8px 12px 8px 12px',
                                    borderRadius: '6px'
                                }}>
                                    <EditIcon sx={{fontSize: '20px'}}/>
                                    <Typography sx={{fontSize: '.875rem', fontWeight: '600'}}>
                                        Chỉnh sửa trang cá nhân
                                    </Typography>
                                </ButtonBase> : <ButtonBase sx={{
                                    gap: '5px',
                                    backgroundColor: '#E4E6EB',
                                    color: 'black',
                                    padding: '8px 12px 8px 12px',
                                    borderRadius: '6px'
                                }}>
                                    <ChatBubbleOutlineIcon sx={{fontSize: '20px'}}/>
                                    <Typography sx={{fontSize: '.875rem', fontWeight: '600'}}>
                                        Nhắn tin
                                    </Typography>
                                </ButtonBase>}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <hr style={{marginBottom: '5px'}}/>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={10} className={styles.navigate}>
                                {renderNavigate}
                            </Grid>
                            <Grid item xs={2}>
                                <Button className={styles.moreButton}>
                                    <MoreHorizIcon/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </Box>
    )
}


export default ProfileInformation;
