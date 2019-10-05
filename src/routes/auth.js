import AuthController from "../controllers/auth";

export default ({
	express,
	jwt,
	bcrypt,
	adminModel,
	beneficiaryModel,
	bodyValidator,
	validator
}) => {
	const authController = AuthController({
		jwt,
		bcrypt,
		adminModel,
		beneficiaryModel
	});
	const authRouter = express.Router();

	authRouter.post(
		"/login",
		[
			bodyValidator("email")
				.isEmail()
				.withMessage("Please enter a valid email"),
			bodyValidator("password")
				.trim()
				.isLength({min: 5})
		],
		validator,
		authController.login
	);

	return authRouter;
};
