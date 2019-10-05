import AdminController from "../controllers/admin";

export default ({express, beneficiaryModel, verifyToken}) => {
	const adminRouter = express.Router();
	const adminController = AdminController({beneficiaryModel});

	adminRouter.patch(
		"/verify/:bid",
		verifyToken,
		adminController.verifyBeneficiary
	);

	return adminRouter;
};
