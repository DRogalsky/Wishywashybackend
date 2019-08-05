module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("Job", {

        Position: {
          type: DataTypes.STRING,
          allowNull: false
        },
        address: {
          type:DataTypes.STRING,
          allowNull: false
        },
        pay: {
            type:DataTypes.FLOAT,
            allowNull: false
        },
        hours: {
            type:DataTypes.STRING,
            allowNull: false
        }

    })
    
    Job.associate = function(models) {

        Job.belongsTo(models.Manager, {
            foreignKey: {
                allowNull: false
            }
        })

        // Job.belongsToMany(Worker, 
        //     {
        //         through: 'chosenJobs',
        //         foreignKey: 'Job_rowId'
        //     })
    };

    return Job
}