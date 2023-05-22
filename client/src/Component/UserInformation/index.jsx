function UserInformation() {
    const logOut = () =>{
        sessionStorage.removeItem("account")
        window.location.href = "/login"
    }
    const changePassword = () =>{}
    return ( <div style={{display: "flex", justifyContent: "space-between"}}>
        <p>Xin chào <strong style={{display: "inline-block", fontSize: "18px"}}>{JSON.parse(sessionStorage.getItem("account")).username.toUpperCase()}</strong></p>
        <div>
            <button className="cancel" onClick={changePassword}>Đổi mật khẩu</button>
            <button className="cancel" onClick={logOut}>Đăng xuất</button>
        </div>
    </div> );
}

export default UserInformation;