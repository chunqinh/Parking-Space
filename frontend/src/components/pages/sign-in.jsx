import React from 'react'
import {Container} from "@mui/material";
import LoginForm from "../form/login";

function Login(){
    return(
        <div>
            <Container>
                <div style={{display:'flex'}}>
                    <div>
                        <LoginForm/>
                    </div>
                    <div>
                        TROUBLE FINDING A SPOT?
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Login;