import FundController from "../controllers/fund";

export default ({express, bodyValidator, fundModel, validator}) => {
	const fundRouter = express.Router();
	const fundController = FundController({fundModel});

	fundRouter.get("/", fundController.getAllFunds);
    fundRouter.get("/:fid", fundController.getSingleFund);
    
    fundRouter.post('/donate');

	return fundRouter;
};
