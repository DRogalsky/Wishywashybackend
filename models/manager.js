module.exports = function (sequelize, DataTypes) {
  // Model for manager accounts
  var Manager = sequelize.define("Manager", {

    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }

    
  })

  // a manager can post many jobs
  Manager.associate = function (models) {
    Manager.hasMany(models.Job, {
      onDelete: "cascade"
    })
  }

  return Manager
}