import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Home: FC = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column"}}>
            <Typography>
                Select a puzzle
            </Typography>

            <Link to={"/escape-room/porch-puzzle"}>Porch puzzle</Link>
            <Link to={"/escape-room/bedroom-puzzle"}>Bedroom puzzle</Link>
        </Box>
    );
}