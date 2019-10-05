export default ({fundModel}) => {
	const getAllFunds = async (req, res) => {
		try {
			const funds = await fundModel.findAll({
				include: [{model: "Beneficiary"}]
			});
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

	const getSingleFund = async (req, res) => {
		try {
			const {fid} = req.params;
			const fund = await fundModel.findOne({
				include: [{model: "Beneficiary"}],
				where: {id: fid}
			});
			return res.status(200).json({
				status: "success",
				message: "Fund Retrieved",
				data: fund
			});
		} catch (err) {
			if (!err.status) err.statusCode = 500;
			next(err);
		}
	};

    const donate = async (req, res) => {};
    
	return {getAllFunds, getSingleFund, donate};
};
