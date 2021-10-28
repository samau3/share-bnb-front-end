import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class ShareBnbApi {

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        // const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            console.log('Inside try req', { url, method, data, params })
            console.log("Axios try request", await axios({ url, method, data, params }));
            return (await axios({ url, method, data, params })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getListing(id) {
        console.log({id});
        const result = await this.request(`listings/${id}`)
        return result.listing;
    }

    static async getListings(searchTermData) {
        const result = await this.request(`listings/`, searchTermData)
        return result.listings;
    }

    static async uploadNewListing(data) {
        const result = await axios.post(`${BASE_URL}/listings/`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return result;
    }

    static async signUp(signUpData) {
        console.log("inside sharebnb api signup");
        const result = await this.request(`auth/register`, signUpData, "post");
        console.log("result.token", result.token);
        return result.token;
    }

    static async login(loginData) {
        const result = await this.request(`auth/login`, loginData, "post");
        return result.token;
    }

    static async getCurrentUser(username) {
        const result = await this.request(`users/${username}`);
        return result.user;
    }

}

export default ShareBnbApi;
