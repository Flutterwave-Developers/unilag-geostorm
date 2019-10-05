export default ({bcrypt, beneficiaryModel}) => {
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

	return {register};
};
