import {create} from "axios";

export const raveClient = requestConfig =>
	create({
		baseURL: "https://api.ravepay.co/",
		timeout: 100000,
		headers: {
			"Content-Type": "application/json"
		}
	})(requestConfig);
