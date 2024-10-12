import React, { FC, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useWindowSize } from "react-use";
import ReactConfetti from "react-confetti";

export const HomeLock: FC = () => {
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState<boolean>();

    const onValueChange = (e) => {
        setError(false);
        setValue(e.target.value);
    }

    const onSubmit = () => {
        if (value === "") {
            return;
        }
        else if (value === "סלמנדרה") {
            setShowConfetti(true);
        }
        else {
            setError(true);
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", marginTop: "24px" }}>
                <TextField
                    dir={"rtl"}
                    value={value}
                    onChange={onValueChange}
                    error={error}
                />
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