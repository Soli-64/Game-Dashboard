

export const validatePassword = (password: string): boolean => {

    if (password.length < 8) {
        return false
    } 

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);

}