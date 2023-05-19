import {useRef, useCallback } from "react";
import {useNavigate} from 'react-router-dom'
function Form() {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const messageRef = useRef()
    const submitRef = useRef()
    const navigate = useNavigate()
    const submitClick = (e)=>{
        if(e.key == 'Enter') submitRef.current.click()
    }
    const handleSubmit = useCallback(()=>{
        messageRef.current.style.color = 'blue'
        messageRef.current.innerHTML = "Waiting..."
        fetch(`http://localhost:9999/QLDPKS/login?username=${usernameRef.current.value}&password=${passwordRef.current.value}`,{
            method: 'POST'
        })
        .then(res=>res.json())
        .then(data=>{
            if(data){
                messageRef.current.style.color = 'green'
                messageRef.current.innerHTML  = "Login successful!"
                setTimeout(()=>{
                    sessionStorage.setItem('account',JSON.stringify(data))
                    navigate("/home")
                },1500)
            }
            else{
                messageRef.current.style.color = 'red'
                messageRef.current.innerHTML  = "Login failed! Please try again."
                passwordRef.current.select()
            }
        })
    },[]) 
    return (
        <div className="container" >
            <h1>Đăng nhập</h1>
            <div>
                <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input 
                        ref={usernameRef}
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Nhập tên đăng nhập"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input 
                        ref={passwordRef}
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Nhập mật khẩu" 
                        onKeyDown={submitClick}
                        required
                    />
                </div>
                <div ref={messageRef} id="login-info"></div>
                <div className="form-group">
                    <button ref={submitRef} id="submit" onClick={handleSubmit}>Đăng nhập</button>
                </div>
                <div className="form-group">
                    <button type="submit" id="signup" className="sub" >Đăng kí</button>
                </div>
            </div>
        </div>
    );
}

export default Form;