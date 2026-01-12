import { APIRequestContext } from "@playwright/test";
import apiPathData from '../data/api-data/api-path-data.json'
import CommonUtils from "./CommonUtils";

export default class CommonApiUtils{

    private request : APIRequestContext;

    constructor(request : APIRequestContext){
        this.request = request;
    }

    public async createToken(){
        const commonUtilsObj = new CommonUtils();
        const apiUserName = commonUtilsObj.decryptData(process.env.API_USER_NAME!);
        const apiPassword = commonUtilsObj.decryptData(process.env.API_PASSWORD!);
        const createTokenResp = await this.request.post(apiPathData.auth_path, {
            data:{
                "username" : apiUserName,
                "password" : apiPassword
            }
        })
        const createTokenJsonResp = await createTokenResp.json();
        return createTokenJsonResp.token;
    }
}