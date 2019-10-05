export default ({fundModel}) => {
	const getAllFunds = async (req, res) => {
		try {
			const funds = await fundModel.findAll({include: [{model: Beneficiary}]});
			return res.status(200).json({
				status: "success",
				message: "Funds Retrieved",
				data: funds
			});
		} catch (err) {
			if (!err.statusCode) err.statusCode = 500;
			next(err);
		}
	};
	return {getAllFunds};
};
