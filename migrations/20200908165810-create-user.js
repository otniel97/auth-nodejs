'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            profilePicture: {
                type: Sequelize.STRING,
                allowNull: true
            },
            notifications: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            lastLoginAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            google: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            roleId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Roles',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};