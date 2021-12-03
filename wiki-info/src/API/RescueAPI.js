const URL = "http://localhost:3000/";
const RESCUE_URL = URL + "rescue_api/rescues";

export default class RescueApi {

    static async findRescue(search) {
        const url = RESCUE_URL + "?search=" + search;
        console.log(url);
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            return console.error(error);
        }
    }

    static async getPersonOfRescue(id) {
        const url = RESCUE_URL + "?id=" + id;
        console.log(url);
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            return console.error(error);
        }
    }
}