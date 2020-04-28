module.exports = function (sequelize, DataTypes) {
    // model for the job cards from the main site
    var Job = sequelize.define("Job", {

        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pay: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hours: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filled: {
            type: DataTypes.BOOLEAN,
            default: false
        }

    })

    Job.associate = function (models) {
        // a job can have on manager
        Job.belongsTo(models.Manager, {
            foreignKey: {
                allowNull: false
            }
        })

        // a job can have many workers
        Job.belongsToMany(models.Worker,
            {
                through: 'chosenJobs',
                foreignKey: 'Job_rowId'
            })
    };

    return Job
}