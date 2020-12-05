import React, { useState } from 'react'

export const LoginContext = React.createContext();

function LoginStore(props) {

    const [SignUpVisible, setSignUpVisible] = useState(false);
    const [SignId, setSignId] = useState('');
    
    return (
        <LoginContext.Provider value={{
            SignUpVisible, setSignUpVisible,
            SignId, setSignId,
        }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginStore;
