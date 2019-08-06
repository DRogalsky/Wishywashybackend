module.exports = function(sequelize, DataTypes) {
    var Manager = sequelize.define("Manager", {

        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        placeName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        address: {
          type:DataTypes.STRING,
          allowNull: false
        }

        //add email and phone to this and worker
    })

    Manager.associate = function(models) {
        Manager.hasMany(models.Job, {
            onDelete: "cascade"
        })
    }

    return Manager
}