function UserInformation() {
    const logOut = () =>{
        sessionStorage.removeItem("account")
        window.location.href = "/login"
    }
    return ( <div style={{display: "flex", justifyContent: "space-between"}}>
        <p>Xin chào <strong style={{display: "inline-block", fontSize: "18px"}}>{JSON.parse(sessionStorage.getItem("account")).username.toUpperCase()}</strong></p>
        <button className="cancel" onClick={logOut}>Đăng xuất</button>
    </div> );
}

export default UserInformation;