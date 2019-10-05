import FundController from "../controllers/fund";

export default ({express, bodyValidator, fundModel, validator}) => {
	const fundRouter = express.Router();
	const fundController = FundController({fundModel});

    fundRouter.get("/", fundController.getAllFunds);
    
    return fundRouter;
};
