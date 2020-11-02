import React, { useState } from 'react'

export const LoginContext = React.createContext();

function LoginStore(props) {

    const [SignUpVisible, setSignUpVisible] = useState(false);
    
    return (
        <LoginContext.Provider value={{
            SignUpVisible, setSignUpVisible,
        }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginStore;
