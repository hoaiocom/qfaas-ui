import * as React from 'react';
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
                {option.label}
            </span>
        );
    }

    return (
        <CustomSelect renderValue={renderValue} {...props}>
            <StyledOption value={"ibmq"}>simulator</StyledOption>
            <StyledOption value={"simulator"}>quantum computer</StyledOption>
            <StyledOption value={"simulator"}>classical nodes</StyledOption>
        </CustomSelect>
    );
}

export const BackendDeviceSelect = styled(UnstyledSelectCustomRenderValue)({
    backgroundColor: '#0f1535',
    color: "white",
    minWidth: "250px",
    border: "0.5px solid #4a5568"
})