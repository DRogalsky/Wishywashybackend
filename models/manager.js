module.exports = function(sequelize, DataTypes) {
    var Manager = sequelize.define("Manager", {

        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        address: {
          type:DataTypes.STRING,
          allowNull: false
        }
    })

    Manager.associate = function(models) {
        Manager.hasMany(models.Job, {
            onDelete: "cascade"
        })
    }

    return Manager
}