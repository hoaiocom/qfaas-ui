import * as React from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import { CustomSelect, StyledOption } from '../components/customSelect';


export default function UnstyledSelectCustomRenderValue(props) {
    console.log(props)
    function renderValue(option) {
        if (option == null) {
            return <span>Select an option...</span>;
        } else {
            props.providerOptionChanger(option.value)
        }

        return (
            <span>
                {/* {option.label} ({option.value}) */}
                {option.label}
            </span>
        );
    }

    return (
        <CustomSelect renderValue={renderValue} {...props}>
            <StyledOption value={"ibmq"}>pip</StyledOption>
            <StyledOption value={"simulator"}>tensorflow</StyledOption>
            <StyledOption value={"simulator"}>pysift</StyledOption>
        </CustomSelect>
    );
}

export const AdditionalLibrarySelect = styled(UnstyledSelectCustomRenderValue)({
    backgroundColor: '#0f1535',
    color: "white",
    minWidth: "250px",
    border: "0.5px solid #4a5568"
})