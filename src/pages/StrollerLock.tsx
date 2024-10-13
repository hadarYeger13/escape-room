import React, { FC, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput, SxProps, Typography } from "@mui/material";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

type QuestionInfo = {
    question: string;
    answer: string;
}

const getQuestionInfo = (questionNumber: number): QuestionInfo => {
    switch (questionNumber) {
        case 0:
            return {
                question: "אם אדם היה חיה איזה חיה הוא היה?",
                answer: "גוזל"
            };
        case 1:
            return {
                question: "מה המאכל האהוב על אדם?",
                answer: "חלב"
            }
        case 2:
            return {
                question: "כמה שיניים יש לאדם?",
                answer: "0"
            }
        case 3:
            return {
                question: "באיזה תאריך אדם נולד?",
                answer: "42 50 61"
            }
        case 4:
            return {
                question: "איזה ספר אדם הכי אוהב?",
                answer: "מעשה בחמישה בלונים"
            }
        case 5:
            return {
                question: "מה הכתובת שבה אדם גר? (רחוב, מספר בית ועיר)",
                answer: "אנה פרנק 52 רמת גן"
            }
        case 6:
            return {
                question: "מה הכי עוזר לאדם לעשות קקי?",
                answer: "הפוף"
            }
        case 7:
            return {
                question: "מה אמא סבתא מלי הכי אוהבת לשיר לאדם?",
                answer: "הרם סם סם"
            }
        case 8:
            return {
                question: "מי הכי מהפנט את אדם?",
                answer: "אבא סבא אבי"
            }
        case 9:
            return {
                question: "מהו כלי הנגינה האהוב על אדם?",
                answer: "קסילופון"
            }


        default:
            return {
                question: "",
                answer: ""
            };
    }
}

const getInitialAnswerLettersArray = (answer: string): Array<Array<string>> => {
    const splitted = answer.split(" ");
    return [...Array(splitted.length)].map((_, wordIndex) => [...Array(splitted[wordIndex].length)].fill(""));
}

export const StrollerLock: FC = () => {
    const [isQuizDialogOpen, setIsQuizDialogOpen] = useState<boolean>(false);
    const [questionNumber, setQuestionNumber] = useState<number>(0);
    const questionInfo = getQuestionInfo(questionNumber);
    // TODO: Hadar. Maybe we can use useMemo here so it will be calculated only when the question number changes.
    const initialAnswerLettersArray = getInitialAnswerLettersArray(questionInfo.answer);
    const [answerLetters, setAnswerLetters] = useState<Array<Array<string>>>(initialAnswerLettersArray);
    const [error, setError] = useState<boolean>(false);

    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState<boolean>(false);

    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState<boolean>(false);


    const onStartClick = () => {
        // setIsQuizDialogOpen(true);
        setIsSuccessDialogOpen(true);
    }

    const onValueChange = (e, wordIndex, letterIndex) => {
        setError(false);
        const typedValue = e.target.value;
        const newChar = typedValue.charAt(typedValue.length - 1);
        setAnswerLetters(prevAnswerLetters => {
            const newAnswerLetters = [...prevAnswerLetters];
            newAnswerLetters[wordIndex][letterIndex] = newChar;
            return newAnswerLetters;
        });
    }

    const onNextClick = () => {
        if (answerLetters.map(word => word.join("")).join(" ") === questionInfo.answer) {
            if (questionNumber === 9) {
                setIsQuizDialogOpen(false);
                setIsSuccessDialogOpen(true);
            } else {
                const nextQuestionInfo = getQuestionInfo(questionNumber + 1);
                setQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1);
                setAnswerLetters(getInitialAnswerLettersArray(nextQuestionInfo.answer));
            }
        }
        else {
            setError(true);
        }
    }

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "8px" }}>
                <Typography dir={"rtl"}>כדי לקבל חזרה את העגלה עליכם להוכיח שאתם מכירים את אדם...</Typography>
                <Button
                    variant={"contained"}
                    onClick={onStartClick}
                >
                    Start
                </Button>
                <Dialog
                    open={isQuizDialogOpen}
                    dir={"rtl"}
                >
                    <DialogTitle>חידון</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <Typography>{questionInfo.question}</Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", gap: "32px", flexWrap: "wrap" }}>
                                {[...Array(questionInfo.answer.split(" ").length)].map((_, wordIndex) =>
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
                                        key={wordIndex}
                                    >
                                        {[...Array(questionInfo.answer.split(" ")[wordIndex].length)].map((_, letterIndex) =>
                                            <OutlinedInput sx={inputSxProps}
                                                           key={wordIndex + "" + letterIndex}
                                                           dir={"rtl"}
                                                           value={answerLetters[wordIndex][letterIndex]}
                                                           onChange={e => onValueChange(e, wordIndex, letterIndex)}
                                                           error={error}
                                            />
                                        )}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={onNextClick}
                        >
                            הבא
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={isSuccessDialogOpen}
                    dir={"rtl"}
                >
                    <DialogTitle>כל הכבוד!</DialogTitle>
                    <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <Typography>עברתם בהצלחה את החידון! נותר רק מנעול אחד אחרון לפתוח...</Typography>
                        <Typography>את הרמז הבא רק לאחד מכם מותר לראות, ולא מישהו שראה את הפתקים הקודמים. בחרו בחוכמה...</Typography>
                        <Button sx={{ width: "fit-content", alignSelf: "center" }}
                                variant={"outlined"}
                        >
                            בחרנו, הראה לנו את הרמז
                        </Button>
                    </DialogContent>

                </Dialog>

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