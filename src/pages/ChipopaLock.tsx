import React, { FC, useRef, useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useWindowSize } from "react-use";
import ReactConfetti from "react-confetti";

type MisleadingAnswer = {
    answer: string;
    errorDialogText: string;
}
const misleadingAnswers: MisleadingAnswer[] = [
    { answer: "נשיקה", errorDialogText: "באמת חשבת שזה כזה קל?" },
    { answer: "1111", errorDialogText: "too easy..." },
    { answer: "גוצ׳ה", errorDialogText: "צ׳יפוטון, צ׳יפוטון... מה נעשה איתך צ׳יפוטון?" },
    { answer: "כלים", errorDialogText: "נכון! אבל זאת לא התשובה, סתם רצינו לוודא שלא שכחת..." },
    { answer: "צ׳יפופו החכם", errorDialogText: "כנראה לא כזה חכם..." },
    { answer: "קאהוט", errorDialogText: "ערבבת את כל הקלפים..? טיפשוני..." },
    { answer: "באמצע הבית", errorDialogText: "ווהו! כמעט נפלתי! אהה לא.. זה אתה נפלת בפח!" },
    { answer: "מנה חמה", errorDialogText: "איכסססס אנחנו לא מעודדים דברים כאלה!" },
    { answer: "אנדרו", errorDialogText: "בררר מתקרר... איפה אנדרו כשצריך אותו?" },
    { answer: "טוסיק", errorDialogText: "ווהו תזהר לא ליפול על הטוסיק המתוק הזה! אוי.. מאוחר מידי..." },
    { answer: "סיוון", errorDialogText: "אם נופל, נופל יפה..." },
];

const genericErrorMessages: string[] = [
    "חבל, דווקא יש לך פרצוף יפה",
    "חותכים עפים...",
    "אתה מפסיד אותי...",
    "אני קורצת?",
    "אוו עצוב לך"
]

export const ChipopaLock: FC = () => {
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState<boolean>(false);

    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
    const errorDialogText = useRef<string>("");
    const errorDialogType = useRef<"error" | "misleading">(null);

    const onValueChange = (e) => {
        setError(false);
        setValue(e.target.value);
    }

    const onSubmit = () => {
        if (value === "") {
            return;
        }
        if(value !== "צ׳יפופה המתוקה") {
            setError(true);
            const misleadingAnswer = misleadingAnswers.find(ma => ma.answer === value);
            if (misleadingAnswer) {
                setErrorDialogOpen(true);
                errorDialogType.current = "misleading";
                errorDialogText.current = misleadingAnswer.errorDialogText;
            }
            else {
                const genericErrorMessageIndex = Math.floor(Math.random() * (genericErrorMessages.length + 1));
                console.log("%%%");
                console.log(genericErrorMessageIndex);
                if (genericErrorMessageIndex < genericErrorMessages.length) {
                    setErrorDialogOpen(true);
                    errorDialogText.current = genericErrorMessages[genericErrorMessageIndex];
                    errorDialogType.current = "error";
                }
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
                    {errorDialogType.current === "error" ? "טעות!" : "נפלת בפח!"}
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