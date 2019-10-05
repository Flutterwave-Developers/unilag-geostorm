import fs from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import helmet from "helmet";
import bcrypt from "bcryptjs";
import compression from "compression";
import logger from "morgan";
import {config} from "dotenv";
import Sequelize from "sequelize";
import initializeDatabase from "./util/db";
import {verifyToken} from "./util/auth";
import {body} from "express-validator";
import validator from "./util/validator";
import {raveClient} from "./util/client";

//Models
import AdminModel from "./models/admin";
import BeneficiaryModel from "./models/beneficiary";
import FundModel from "./models/fund";

//Routers
import AuthRouter from "./routes/auth";
import FundRouter from "./routes/fund";
import BeneficiaryRouter from "./routes/beneficiary";
import AdminRouter from "./routes/admin";

config();
const URL_PREFIX = "/api/v1";
const PORT = process.env.PORT || 7000;

// Initialize Database
const db = initializeDatabase({Sequelize});

// Initialize Models
const adminModel = AdminModel({Sequelize, db});
const beneficiaryModel = BeneficiaryModel({Sequelize, db});
const fundModel = FundModel({
	Sequelize,
	db,
	BeneficiaryModel: beneficiaryModel
});

const app = express();

app.use(helmet());
app.use(compression());
app.use(
	logger("common", {
		stream: fs.createWriteStream(path.resolve(__dirname, "./logs/access.log"), {
			flags: "a"
		})
	})
);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Enable CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, Authorization"
	);
	res.header(
		"Access-Control-Request-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, Authorization"
	);
	next();
});

//Routers
app.use(
	`${URL_PREFIX}/auth`,
	AuthRouter({
		express,
		jwt,
		bcrypt,
		adminModel,
		beneficiaryModel,
		bodyValidator: body,
		validator
	})
);

app.use(
	`${URL_PREFIX}/fund`,
	FundRouter({express, bodyValidator: body, fundModel, validator})
);

app.use(
	`${URL_PREFIX}/beneficiary`,
	BeneficiaryRouter({
		express,
		bcrypt,
		beneficiaryModel,
		bodyValidator: body,
		validator,
		raveClient
	})
);

app.use(
	`${URL_PREFIX}/admin`,
	AdminRouter({express, beneficiaryModel, verifyToken, adminModel, raveClient})
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	res.status(404).json({
		error: ["Path does not exist"],
		status: 404,
		message: "This route doesn't exist for you!"
	});
	next();
});

app.use((error, req, res, next) => {
	console.log(error);
	let responseObj = {
		status: "error",
		message: "Something went wrong",
		errorMessage: error.message
	};
	if (process.env.NODE_ENV === "development") {
		responseObj.errorStack = error.stack;
	}
	return res.status(error.statusCode).json(responseObj);
});

// Connect to Database
db.sync()
	.then(() => {
		console.log("DB Connection has been established");
		app.listen(PORT);
		console.log("App Running on PORT", PORT);
	})
	.catch(err => {
		console.error("Failed To connect to Database", err);
	});

export default app;
