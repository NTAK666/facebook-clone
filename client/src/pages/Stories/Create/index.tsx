import React, {useCallback, useRef, useState} from 'react';
import {Box, ButtonBase, IconButton, Slider, Typography} from "@mui/material";
import styles from './styles.module.scss'
import ImageIcon from '@mui/icons-material/Image';
import Cropper, {Area} from 'react-easy-crop'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CropRotateIcon from '@mui/icons-material/CropRotate';
import getCroppedImg from '../../../utils/CropImage';
import Navbar from '../../../components/Stories/NavbarCreate';
import HeaderRight from '../../../components/HomePage/Header/HeaderRight';
import {useCreateStoryMutation, useGetStoriesByMeQuery} from '../../../app/services/StoryService';
import {IStoryCreate} from '../../../app/models/Story';
import {useNavigate} from 'react-router-dom';

interface IProps {

}

const CreateStories: React.FC<IProps> = () => {
    useGetStoriesByMeQuery();
    const navigate = useNavigate();
    const [createStoryApi] = useCreateStoryMutation();
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [rotation, setRotation] = useState(0)
    const [storyPreview, setStoryPreview] = useState("")
    const storyRef = useRef<any>(null);
    const [zoom, setZoom] = useState(0.5)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [sliderValue, setSliderValue] = React.useState<number | string | Array<number | string>>(
        30,
    );

    const chooseImageStory = (e: any) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setStoryPreview(reader.result as string);
            storyRef.current.value = null;
        }
    }

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])

    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setSliderValue(newValue);
        setZoom(event.target.value / 50);
    };

    const showCroppedImage = useCallback(async () => {
        const cropImage = await getCroppedImg(
            storyPreview,
            croppedAreaPixels,
            rotation
        )

        if (cropImage) {
            const request: IStoryCreate = {
                title: "Create Story",
                image: cropImage,
            }

            createStoryApi(request).then((response: any) => {
                if (response.data.status === 200) {
                    setStoryPreview("");
                    navigate('/');
                }
            })
        }

    }, [createStoryApi, croppedAreaPixels, navigate, rotation, storyPreview])

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

    return <>
        <Box className={styles.wrapper} sx={{backgroundColor: "#e4e6eb"}}>
            <Navbar/>
            <Box className={styles.wrapperContent}>
                <Box className={styles.header}>
                    <HeaderRight/>
                </Box>
                <Box className={styles.content}>
                    {storyPreview && (
                        <Box className={styles.wrapperShowStory}>
                            <ButtonBase className={styles.buttonShow} onClick={() => setStoryPreview("")}>Bỏ</ButtonBase>
                            <ButtonBase className={styles.buttonShow} onClick={showCroppedImage}
                                          sx={{backgroundColor: "#1a6ed8 !important", color: "white"}}>Chia sẻ lên
                                tin</ButtonBase>
                        </Box>
                    )}
                    <Box className={styles.root}>
                        {!storyPreview ? (
                            <ButtonBase className={styles.createButton}>
                                <label htmlFor='story_file' className="wrapper-ab"></label>
                                <input type="file" onChange={chooseImageStory} ref={storyRef} hidden id="story_file"/>
                                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "10px"}}>
                                    <Box className={styles.wrapperIcon}>
                                        <ImageIcon/>
                                    </Box>
                                    <Typography sx={{color: "white"}} fontWeight="bold">Tạo tin ảnh</Typography>
                                </Box>
                            </ButtonBase>
                        ) : (
                            <Box className={styles.wrapperEditStory}>
                                <Typography fontWeight="bold">Xem trước</Typography>
                                <Box className={styles.wrapperImagePreview}>
                                    <Cropper
                                        image={storyPreview}
                                        crop={crop}
                                        zoom={zoom}
                                        rotation={rotation}
                                        aspect={10 / 16}
                                        onCropChange={setCrop}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={setZoom}
                                        showGrid={false}
                                        restrictPosition={false}
                                    />
                                </Box>
                                <Box className={styles.footer}>
                                    <Box className={styles.zoomImage}>
                                        <IconButton onClick={() => changeSlider('decrement')}>
                                            <RemoveIcon/>
                                        </IconButton>
                                        <Slider value={typeof sliderValue === 'number' ? sliderValue : 0}
                                                onChange={handleSliderChange}/>
                                        <IconButton onClick={() => changeSlider('increment')}>
                                            <AddIcon/>
                                        </IconButton>
                                    </Box>
                                    <ButtonBase className={styles.buttonRotate} onClick={changeRotation}>
                                        <CropRotateIcon fontSize={`small`}/>
                                        <Typography fontWeight={`bold`} fontSize={`small`}>Xoay</Typography>
                                    </ButtonBase>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
}

export default CreateStories;