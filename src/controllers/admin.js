export default ({beneficiaryModel, raveClient, adminModel}) => {
	const verifyBeneficiary = async (req, res) => {
		try {
			const {bid} = req.params;
			const beneficiary = await beneficiaryModel.update(
				{verified: true},
				{where: {id: bid}}
            );
            //Create Transfer Recipient
            await raveClient({
                url: 'v2/gpx/transfers/beneficiaries/create',
                method: 'post',
                data: {
                    account_number: beneficiary.account_number,
                    account_bank: beneficiary.account_bank,
                    seckey: process.env.RAVE_SECRET
                }
            })
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
    
    const createAdmin = async (req, res) => {
        try {
            
        } catch (err) {
			if (!err.statusCode) err.statusCode = 500;
			next(err);
		}
    }
	return {verifyBeneficiary, createAdmin};
};
