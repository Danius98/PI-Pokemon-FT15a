var {Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('./Pokemon');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("type",
      { Tipo: { type: DataTypes.STRING, allowNull: false },
      },
      { timestamps: false }
    );
  };