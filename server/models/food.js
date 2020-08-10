'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.belongsTo(models.User)
    }
  };
  Food.init({
    title: {type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Title cannot be empty"
        }
      }
    },
    price: {type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:"Price cannot be empty"
        }
      }
    },
    ingredients: {type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Ingredients cannot be empty"
        }
      }
    },
    tag: {type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Tag cannot be empty"
        }
      }
    },
    UserId: {type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:"Creator cannot be empty"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};