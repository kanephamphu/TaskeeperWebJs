import { LocalStorageKey } from "enums/localstorage.enum";
import { HttpStatus, AuthEndpoint } from "enums/Http.enum";
import { sendPostRequest } from "services/api.service";
import { ILoginState, IRegisterNewAccountState } from "models/IUserState";
export const login = async (
    loginState: ILoginState
): Promise<Object | Error> => {
    const loginResult = await sendPostRequest(AuthEndpoint.LOGIN, loginState);

    //This set set for dev only
    if (
        loginState.loginString === "devcheating" &&
        loginState.loginInformation.password === "devcheating"
    ) {
        localStorage.setItem(
            LocalStorageKey.BEARER,
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTliYWU3NTNiZTI4NzAwMTZiOTA3NmUiLCJhY2NvdW50VHlwZSI6Im5vcm1hbFVzZXIiLCJhY2NvdW50U3RhdHVzIjoiYWN0aXZlIiwibGFuZ3VhZ2VDb2RlIjoiZW5fVVMiLCJpYXQiOjE2MzgwNjk5MTcsImV4cCI6MTYzODA3MzUxN30.OyRBEvuQaBGjrgUwr10MXjjVE7HMs66WrGqyN4dfAcE"
        );
    }

    if (loginResult.status === HttpStatus.ACCEPTED) {
        localStorage.setItem(
            LocalStorageKey.BEARER,
            loginResult.data.access_token
        );
        
        return loginResult.data;
    }

    throw new Error(loginResult?.message);
};

export const register = async (
    registerState: IRegisterNewAccountState
): Promise<Object | Error> => {
    const registerResult = await sendPostRequest(
        AuthEndpoint.REGISTER,
        registerState
    );

    if (registerResult.status === HttpStatus.CREATED) {
        return registerResult.data;
    }

    throw new Error(registerResult.message);
};
