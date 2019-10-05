export default ({Sequelize, db}) => {
	const Beneficiary = db.define("beneficiary", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		fullname: {
			type: Sequelize.STRING,
			allowNull: false
		},
		account_number: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		account_bank: {
			type: Sequelize.STRING,
			allowNull: false
		},
		school: {
			type: Sequelize.STRING,
			allowNull: false
        },
        school_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
        },
        verified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            default: false
        }
	});

	return Beneficiary;
};
