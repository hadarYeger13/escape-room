import { FC } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Home: FC = () => {
    return (
        <>
            <Typography>
                Select a puzzle
            </Typography>

            <Link to={"/escape-room/puzzle1"}>Puzzle 1</Link>
        </>
    );
}