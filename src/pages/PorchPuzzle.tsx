import React, { ChangeEvent, FC, useState } from "react";
import { Box, Button, OutlinedInput, SxProps } from "@mui/material";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

const isNumber = (value: string): boolean => {
    const reg = new RegExp("[0-9]");
    return reg.test(value);
}

export const PorchPuzzle: FC = () => {
    const [value1, setValue1] = useState<number | "">("");
    const [value2, setValue2] = useState<number | "">("");
    const [value3, setValue3] = useState<number | "">("");
    const [value4, setValue4] = useState<number | "">("");

    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);

    const getValue = (index: number) => {
        switch (index) {
            case 1:
                return value1;
            case 2:
                return value2;
            case 3:
                return value3;
            case 4:
                return value4;
        }
    }

    const setValue = (value: number | "", index: number) => {
        switch (index) {
            case 1:
                setValue1(value);
                return;
            case 2:
                setValue2(value);
                return;
            case 3:
                setValue3(value);
                return;
            case 4:
                setValue4(value);
                return;
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        setError(false);
        const typedValue = e.target.value;
        if (typedValue === "") {
            setValue("", index);
            return;
        }
        const newChar = typedValue.charAt(typedValue.length - 1);
        if (isNumber(newChar)) {
            setValue(Number(newChar), index);
            return;
        }
    }

    const onSubmit = () => {
        if (value1 === 1 && value2 === 3 && value3 === 5 && value4 === 7) {
            setShowConfetti(true);
        }
        else {
            setError(true);
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", marginTop: "24px" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
                    {[1, 2, 3, 4].map(index =>
                        <OutlinedInput sx={inputSxProps}
                            key={index}
                            value={getValue(index)}
                            onChange={(e) => onChange(e, index)}
                            error={error}
                        />
                    )}
                </Box>
                <Button sx={{ width: "fit-content" }}
                        variant={"contained"}
                        onClick={onSubmit}
                >
                    Submit
                </Button>
            </Box>
            {showConfetti
                ? <ReactConfetti
                    width={width}
                    height={height}
                    numberOfPieces={1000}
                />
                : null
            }
        </>

    )
}

const inputSxProps: SxProps = {
    width: "56px",
    ".MuiOutlinedInput-input": {
        textAlign: "center"
    }
};