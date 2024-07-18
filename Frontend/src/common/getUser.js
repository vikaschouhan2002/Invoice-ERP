import Cookies from 'js-cookie';
export const getUser = () => {
    const admin = Cookies.get('Admin');
    const user = JSON.parse(admin);
    console.log('user:-',user);
    return user;
}