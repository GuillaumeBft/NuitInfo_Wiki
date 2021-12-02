const URL = "http://localhost:3000/";
const USER_URL = URL + "user_api/users";
const API_KEY = "4BD39FF27B8B6C9433C8EBB4F455C";

export default class UserApi {

    static async loginUser(login, password) {
        const url = USER_URL + "?apiKey=" + API_KEY + "&login=" + login + "&password=" + password;
        console.log(url);
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            return console.error(error);
        }
    }

    static async registerUser(login, password) {
        const url = USER_URL + "?apiKey=" + API_KEY;

        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "login": login,
                    "password": password
                })

            });
            return await response.json();
        } catch (error) {
            return console.error(error);
        }
    }
}