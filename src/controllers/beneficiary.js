export default ({bcrypt, beneficiaryModel, raveClient}) => {
	const register = async (req, res) => {
		try {
			const {
				title,
				description,
				school,
				fullname,
				account_number,
				email,
				password
			} = req.body;
			const hash = await bcrypt.hash(password, 10);
			await beneficiaryModel.create({
				title,
				description,
				school,
				fullname,
				account_number,
				email,
				password: hash,
				verified: false
			});
			return res.status(201).json({
				status: "success",
				message: "Registration Submitted"
			});
		} catch (err) {
			if (!err.statusCode) err.statusCode = 500;
			next(err);
		}
	};

	const getBanks = async (req, res) => {
		try {
			const response = await raveClient({
				url: `v2/banks/NG?public_key=${process.env.RAVE_PUBLIC}`,
				method: "get"
			});
			return res.status(200).json({
				status: "success",
				data: response.data.data.Banks
			});
		} catch (err) {
			if (!err.statusCode) err.statusCode = 500;
			next(err);
		}
	};

	return {register, getBanks};
};
