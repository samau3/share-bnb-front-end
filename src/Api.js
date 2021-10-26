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

    static async uploadNewListings(image) {
        console.log("uploadNewListings", image)
        const results = await this.request(`listings/`, image, "post");
        console.log("uploaded", results);
    }
}

export default ShareBnbApi;
