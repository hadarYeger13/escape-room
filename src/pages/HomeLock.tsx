import React, { FC, useState } from "react";
import { Box, Button, Divider, IconButton, SxProps, TextField, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useWindowSize } from "react-use";
import ReactConfetti from "react-confetti";

export const HomeLock: FC = () => {
    const [newValue, setNewValue] = useState<string>("");
    const [values, setValues] = useState<string[]>([]);
    const [error, setError] = useState<boolean>(false);

    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState<boolean>();

    const onValueChange = (e) => {
        setError(false);
        setNewValue(e.target.value)

    }

    const onAddClick = () => {
        if (newValue.trim() !== "") {
            setValues(prevValues => [...prevValues, newValue]);
            setNewValue("");
        }
    }

    const onDeleteClick = (index: number) => {
        setError(false);
        setValues(prevValues => {
            prevValues.splice(index, 1);
            return [...prevValues];
        })
    }

    const onSubmit = () => {
        if (values.length !== 9) {
            setError(true);
        }
        else if (!values.includes("עיניים") || !values.includes("גבות") || !values.includes("סנטר") || !values.includes("לחיים") || !values.includes("אף") || !values.includes("נחיריים")
            || !values.includes("מצח") || !values.includes("פה") || !values.includes("רקות")) {
            setError(true);
            return;
        }
        else {
            setShowConfetti(true);
        }
    };

    return (
        <>
            <Box sx={containerSxProps}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "8px", alignItems: "center" }}>
                    <Button
                        startIcon={<Add/>}
                        onClick={onAddClick}
                    >
                        Add
                    </Button>
                    <TextField
                        dir={"rtl"}
                        value={newValue}
                        onChange={onValueChange}
                        error={error}
                    />
                </Box>
                <Box sx={{ flexGrow: 1, overflowY: "auto" }}
                    dir={"rtl"}
                >
                    {values.map((value, index) => (
                        <Box
                            key={index}
                        >
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "273px" }}>
                                <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                                >
                                    {value}
                                </Typography>
                                <IconButton
                                    onClick={() => onDeleteClick(index)}
                                >
                                    <Delete/>
                                </IconButton>
                            </Box>
                            <Divider/>
                        </Box>

                    ))}
                </Box>
                <Button
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

const containerSxProps: SxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    paddingTop: "24px",
    paddingBottom: "24px",
    maxHeight: "calc(100vh - 16px)", // I need -16px due to the body margin
    boxSizing: "border-box"
}