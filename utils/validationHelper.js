export const isEmailValid =(email)=> {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) === true;
}
export const isUsernameValid =(user)=> {
    let reg = /^\w+([\.-]?[0-9]?\w+)+$/;
    return reg.test(user) === true;
}

export const isPasswordValid =(password)=> {
     if(password !==''){ return password.length >1 }else{ return false};
}