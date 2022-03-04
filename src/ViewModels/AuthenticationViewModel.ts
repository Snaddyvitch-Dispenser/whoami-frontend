/**
 * Connects the Login/Register Views with the Authentication Service (Backend / Model)
 * @class AuthenticationViewModel
 * @param apiUrl {string} The URL of the Backend API Login
 */
import axios from "axios";
import {encryptShamirSharesWithAES, generateNewShamirShares} from "../Global/Cryptography";
import {emailRegex} from "../Global/Regex";

export default class AuthenticationViewModel{
    private apiUrl: string;

    constructor(apiUrl?: string){
        this.apiUrl = apiUrl || process.env.REACT_APP_API_URL + "/auth";
    }

    /**
     * Logs the User in
     * @param username {string} The Username of the User
     * @param password {string} The Password of the User
     * @returns {Promise<any>}
     */
    public async login(username: string, password: string): Promise<any>{
        return await axios.post(this.apiUrl + "/sign_in", {
            username: username,
            password: password
        });
    }

    /**
     * Registers the User
     * @param username {string} The Username of the User
     * @param password {string} The Password of the User
     * @param email {string} The Email of the User
     * @param shamirSecrets {string[]} The Shamir Secret (encrypted) of the User
     * @returns {Promise<any>}
     */
    private async sendRegisterRequest(username: string, password: string, email: string, shamirSecrets: string[]) {
        try {
            const response = await axios.post(this.apiUrl + "/sign_up", {
                username: username,
                password: password,
                email: email,
                shamirSecrets: shamirSecrets
            });

            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "An error occurred while connecting to the server"
            };
        }
    }

    public validateRegisterFields(username: string, email: string, password: string, confirmPassword: string): {success: boolean, message: string} {
        console.log(username, email, password, confirmPassword);

        if (username.length < 3) {
            return {
                success: false,
                message: "Username must be at least 3 characters long"
            };
        }

        else if (password.length < 8 || password.match(/[0-9]/g) !== null) {
            return {
                success: false,
                message: "Password must be at least 8 characters long and include a number"
            };
        }

        else if (password !== confirmPassword) {
            return {
                success: false,
                message: "Passwords do not match"
            };
        }

        else if (email.match(emailRegex) === null) {
            return {
                success: false,
                message: "Email is not valid"
            };
        }

        else return {
            success: true,
            message: ""
        };
    }

    public async register(username: string, email: string, password: string): Promise<any>{
        // We only generate these here, they are never sent anywhere unencrypted
        const shares = generateNewShamirShares();

        const encryptedShares = encryptShamirSharesWithAES(shares, password);

        // now we can send to the server using the authViewModel
        await this.sendRegisterRequest(username, email, password, encryptedShares);
    }
}