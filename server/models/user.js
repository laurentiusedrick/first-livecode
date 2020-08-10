'use strict';

const bcrypt = require("bcryptjs")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Food)
    }
  };
  User.init({
    email: {type:DataTypes.STRING,
      validate:{
        isEmail:{
          args:true,
          msg:"Email format not valid"
        }
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance,options)=>{
    const salt = bcrypt.genSaltSync(5)
    instance.password = bcrypt.hashSync(instance.password,salt)
  })
  return User;
};