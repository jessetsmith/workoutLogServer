module.exports = function(sequelize, DataTypes) {
    const Log = sequelize.define('log', {
        description: DataTypes.STRING,
        
        definition: DataTypes.STRING,
           
        result: DataTypes.STRING,
           
        owner: DataTypes.INTEGER,
    });
    return Log
};