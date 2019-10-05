import BeneficiaryController from "../controllers/beneficiary";

export default ({
	express,
	bcrypt,
	beneficiaryModel,
	bodyValidator,
    validator,
    raveClient
}) => {
	const beneficiaryController = BeneficiaryController({
		bcrypt,
        beneficiaryModel,
        raveClient
	});
	const beneficiaryRouter = express.Router();

	beneficiaryRouter.post(
		"/",
		[
			bodyValidator("title").isString(),
			bodyValidator("description").isString(),
			bodyValidator("school").isString(),
			bodyValidator("account_number").isNumeric(),
			bodyValidator("email")
				.isEmail()
				.withMessage("Please enter a valid email"),
			bodyValidator("password")
				.trim()
				.isLength({min: 5})
		],
		validator,
		beneficiaryController.register
	);

	beneficiaryRouter.get("/banks", beneficiaryController.getBanks);

	return beneficiaryRouter;
};
