export default ({beneficiaryModel}) => {
	const register = async (req, res) => {
		try {
            const beneficiary = await beneficiaryModel.create({
                
            });
		} catch (err) {
			if (!err.statusCode) err.statusCode = 500;
			next(err);
		}
	};

	return {register};
};
