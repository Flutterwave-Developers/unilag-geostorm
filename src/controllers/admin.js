export default ({beneficiaryModel}) => {
	const verifyBeneficiary = async (req, res) => {
		try {
			const {bid} = req.params;
			const beneficiary = await beneficiaryModel.update(
				{verified: true},
				{where: {id: bid}}
			);
			//Email beneficiary that he/she has been verified
			return res.status(200).json({
				status: "success",
				message: "Beneficiary Verified"
			});
		} catch (err) {
			if (!err.statusCode) err.statusCode = 500;
			next(err);
		}
	};
	return {verifyBeneficiary};
};
