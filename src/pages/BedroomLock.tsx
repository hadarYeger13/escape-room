import React, { FC, useState } from "react";
import { Box } from "@mui/material";
import { useZxing } from "react-zxing";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

export const BedroomLock: FC = () => {
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState<boolean>();

    const { ref } = useZxing({
        onDecodeResult: (result) => {
            const decodedText = result.getText();
            if (decodedText === "012345678912") {
                setShowConfetti(true);
            }
        }
    })

    return (
        <>
            <Box sx={{ marginTop: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <video width={"300px"} ref={ref}/>
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
    );
}