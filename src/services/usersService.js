import httpService, {setCommonHeader} from "./httpService";
import jwtDecode from "jwt-decode";

export const getJWT = () => {
    return localStorage.getItem(TOKEN);
}

const setTokenHeader = () => {
    setCommonHeader("x-auth-token", getJWT())
}

const TOKEN = "token";
setTokenHeader();

export const createUser = (user) => {
    return httpService.post("/users", user);
}

export const loginUser = async (credentials) => {
    const { data } =  await httpService.post("/auth", credentials);
    localStorage.setItem(TOKEN, data.token);
    setTokenHeader();
}

export const logoutUser = () => {
    localStorage.removeItem(TOKEN);
    setTokenHeader();
}

export const getUser = () => {
    try{
        const token = getJWT();
        return jwtDecode(token);
    }catch{
        return null;
    }
}

const usersService = {
    createUser,
    loginUser, 
    logoutUser,
    getJWT,
    getUser,
}

export default usersService;