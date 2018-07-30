const Sequelize = require('sequelize');

const userSchema = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    isTemporary: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    googleID: Sequelize.STRING,
    googleEmail: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    }
};

module.exports = userSchema;