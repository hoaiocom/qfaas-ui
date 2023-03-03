import * as React from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import { CustomSelect, StyledOption } from '../components/customSelect';

export default function UnstyledSelectCustomRenderValue(props) {

    function renderValue(option) {

        if (option == null) {
            return <span>Select an template...</span>;
        } else {
            props.templateChanger(option.value)
        }

        return (
            <span>
                {option.label}
            </span>
        );
    }

    return (
        <CustomSelect renderValue={renderValue} {...props}>
            <StyledOption value={"qiskit"}>Qiskit</StyledOption>
            <StyledOption value={"cirq"}>Cirq</StyledOption>
            <StyledOption value={"qsharp"}>Q#</StyledOption>
            <StyledOption value={"braket"}>Braket</StyledOption>
        </CustomSelect>
    );
}

export const TemplateSelect = styled(UnstyledSelectCustomRenderValue)({
    backgroundColor: '#0f1535',
    color: "white",
    minWidth: "100%",
    border: "0.5px solid #4a5568"
})