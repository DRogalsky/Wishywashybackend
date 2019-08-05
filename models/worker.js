module.exports = function(sequelize, DataTypes) {
    var Worker = sequelize.define("Worker", {

        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        address: {
          type:DataTypes.STRING,
          allowNull: false
        }
    })

    Worker.associate = function(models) { //aliases
        Worker.belongsToMany(models.Job, 
            {
                through: 'chosenJobs',
                foreignKey: 'Worker_rowId'
            })
    }

    return Worker
}