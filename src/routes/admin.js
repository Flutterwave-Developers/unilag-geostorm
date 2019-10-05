import AdminController from "../controllers/admin";

export default ({
	express,
	beneficiaryModel,
	verifyToken,
	raveClient,
	adminModel
}) => {
	const adminRouter = express.Router();
	const adminController = AdminController({
		beneficiaryModel,
		raveClient,
		adminModel
	});

	adminRouter.patch(
		"/verify/:bid",
		verifyToken,
		adminController.verifyBeneficiary
	);

	adminRouter.post("/create", verifyToken, adminController.createAdmin);

	return adminRouter;
};
