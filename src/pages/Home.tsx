import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Home: FC = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column"}}>
            <Typography>
                Select a lock
            </Typography>

            <Link to={"/escape-room/porch-lock"}>Porch lock</Link>
            <Link to={"/escape-room/bedroom-lock"}>Bedroom lock</Link>
            <Link to={"/escape-room/chipopa-lock"}>Chipopa lock</Link>
        </Box>
    );
}