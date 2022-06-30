import React from 'react';
import {InputBase} from "@mui/material";
import styled from "@emotion/styled";
import ReportIcon from '@mui/icons-material/Report';
import IconButtonPopper from "../../Popper/IconButtonPopper";

interface IProps {
    isError?: boolean;
    textPopper?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    type?: string;
    name?: string;
    className?: string;
}

const InputRegister: React.FC<IProps> = React.forwardRef((props, ref) => {
    const {type = 'text', className, name, placeholder, onChange, value, isError = false, textPopper, ...args} = props;
    return (
        <InputCustom ref={ref} className={className} type={type} name={name} placeholder={placeholder} onChange={onChange} value={value} {...args}
                     endAdornment={isError && textPopper ? (
                         <>
                             <IconButtonPopper bgrColor={'#be4b49'} textColor={'#f8ecec'} text={textPopper}>
                                 <ReportIcon color={'error'}/>
                             </IconButtonPopper>
                         </>
                     ) : null}/>
    )
})

const InputCustom = styled(InputBase)`
  border: 1px solid #ccd0d5;
  border-radius: 4px;
  color: #8d949e;
  padding: 6px 8px;
  font-size: 17px;
  width: 100%;
`

export default InputRegister;