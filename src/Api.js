import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** A class for ShareBnb API */
class ShareBnbApi {
    static token;

    /** A function to send requests to the server */
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${ShareBnbApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            console.log('Inside try req', { url, method, data, params })
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /** Takes in a listing id and returns the associated listing
    * 
    *  Returns:
    *  { id, name, street, city, state, country, description, photoUrls }
    */
    static async getListing(id) {
        const result = await this.request(`listings/${id}`)
        return result.listing;
    }

    /** Takes in searchTermData and returns listings that fit the search
    *  criteria
    *
    *  Returns:
    *  [{ id, name, street, city, state, country, description, photoUrls },...]
    */
    static async getListings(searchTermData) {
        const result = await this.request(`listings/`, searchTermData)
        return result.listings;
    }

    /** Takes in files and uploads files to S3.
    *
    *  Returns new listing:
    *  { id, name, street, city, state, country, description, photoUrls }
    */
    static async uploadNewListing(data) {
        const result = await axios.post(`${BASE_URL}/listings/`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return result;
    }

    /** Takes in data about a new user and returns a token 
    */
    static async signUp(signUpData) {
        const result = await this.request(`auth/register`, signUpData, "post");
        return result.token;
    }

    /** Takes in data from the login form returns a token if the inputs match
    *   the user's data
    */
    static async login(loginData) {
        const result = await this.request(`auth/token`, loginData, "post");
        return result.token;
    }

    /** Takes in a username and returns the user data if the username is found
    *   in the database
    */
    static async getCurrentUser(username) {
        const result = await this.request(`users/${username}`);
        return result.user;
    }
}

export default ShareBnbApi;
