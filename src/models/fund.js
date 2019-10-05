export default ({Sequelize, db, BeneficiaryModel}) => {
	const Fund = db.define("fund", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		amountAchieved: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false
		},
		price: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		beneficiaryId: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	});

	Fund.belongsTo(BeneficiaryModel, {constraints: true, onDelete: "CASCADE"});

	return Fund;
};
