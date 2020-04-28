module.exports = function (sequelize, DataTypes) {
  // model for worker accounts
  var Worker = sequelize.define("Worker", {

    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
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
    }
  })

  // a worker can sign up for many jobs
  Worker.associate = function (models) {
    Worker.belongsToMany(models.Job,
      {
        through: 'chosenJobs',
        foreignKey: 'Worker_rowId'
      })
  }

  return Worker
}