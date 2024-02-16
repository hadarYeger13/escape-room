import React, { FC, useRef, useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useWindowSize } from "react-use";
import ReactConfetti from "react-confetti";

export const ChipopaLock: FC = () => {
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState<boolean>(false);

    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
    const errorDialogText = useRef<string>("");

    const onValueChange = (e) => {
        setError(false);
        setValue(e.target.value);
    }

    const onSubmit = () => {
        if(value !== "צ׳יפופה המתוקה") {
            setError(true);
            if (value === "נשיקה") {
                setErrorDialogOpen(true);
                errorDialogText.current = "באמת חשבת שזה כזה קל?";
            }
            if (value === "1111") {
                setErrorDialogOpen(true);
                errorDialogText.current = "ווהו! שוב נפלת בבור??"
            }
            if (value === "גוצ׳ה") {
                setErrorDialogOpen(true);
                errorDialogText.current = "צ׳יפוטון, צ׳יפוטון... מה נעשה איתך צ׳יפוטון?";
            }
            if (value === "כלים") {
                setErrorDialogOpen(true);
                errorDialogText.current = "נכון! אבל זאת לא התשובה, סתם רצינו לוודא שלא שכחת...";
            }
            if (value === "צ׳יפופו החכם") {
                setErrorDialogOpen(true);
                errorDialogText.current = "כנראה לא כזה חכם...";
            }
            if (value === "קאהוט") {
                setErrorDialogOpen(true);
                errorDialogText.current = "ערבבת את כל הקלפים..?";
            }
            if (value === "לא במקום" || value === "בסלון" || value === "באמצע הבית") {
                setErrorDialogOpen(true);
                errorDialogText.current = "ווהו! כמעט נפלתי! אהה לא.. זה אתה נפלת בפח!";
            }
            if (value === "מנה חמה") {
                setErrorDialogOpen(true);
                errorDialogText.current = "איכסססס אנחנו לא מעודדים דברים כאלה!";
            }
        }
        else {
            setShowConfetti(true);
        }
    }

    const onErrorDialogClose = () => {
        setErrorDialogOpen(false);
        errorDialogText.current = "";
        setValue("");
        setError(false);
    }

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
            <Dialog
                open={errorDialogOpen}
                onClose={onErrorDialogClose}
            >
                <DialogTitle sx={{ display: "flex", justifyContent: "center" }}
                    dir={"rtl"}
                >
                    נפלת בפח!
                </DialogTitle>
                <DialogContent
                    dir={"rtl"}
                >
                    {errorDialogText.current}
                </DialogContent>
            </Dialog>
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