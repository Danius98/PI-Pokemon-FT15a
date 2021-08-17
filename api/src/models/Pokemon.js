const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    ID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    Nombre: {type: DataTypes.STRING, allowNull: false},
    Vida: {type: DataTypes.INTEGER},
    Ataque: {type: DataTypes.INTEGER},
    Defensa: {type: DataTypes.INTEGER},
    Velocidad: {type: DataTypes.INTEGER},
    Altura: {type: DataTypes.INTEGER},
    Peso: {type: DataTypes.INTEGER},
    Imagen: {type: DataTypes.TEXT},
    Creado: {type: DataTypes.BOOLEAN, defaultvalue: false}
  },
  { timestamps: false },
  );
};
