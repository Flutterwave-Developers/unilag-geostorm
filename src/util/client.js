import {create} from "axios";

export const raveClient = requestConfig =>
	create({
		baseURL: "https://api.ravepay.co/",
		timeout: 100000,
		headers: {
			Authorization: `Bearer ${process.env.RAVE_SECRET}`,
			"Content-Type": "application/json"
		}
	})(requestConfig);
