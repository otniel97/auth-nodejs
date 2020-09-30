'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'El correo no puede estar vacío.'
                },
                isEmail: {
                    msg: 'El correo debe ser un email valido'
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'El nombre usuario no puede estar vacío.'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'La contraseña no puede estar vacía.'
                }
            }
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true
        },
        notifications: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        lastLoginAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        google: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                notEmpty: {
                    msg: 'La verificación por google no puede estar vacío.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El estatus no puede estar vacío.'
                }
            }
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id rol vacío.'
                }
            }
        }
    }, {});
    User.prototype.toJSON = function() {
        var values = Object.assign({}, this.get());
        delete values.password;
        return values;
    }
    User.associate = function(models) {
        // associations can be defined here
        User.belongsTo(models.Role, { foreignKey: 'roleId' });
    };
    return User;
};