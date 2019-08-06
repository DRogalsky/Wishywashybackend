module.exports = function (sequelize, DataTypes) {
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

        Job.belongsTo(models.Manager, {
            foreignKey: {
                allowNull: false
            }
        })
        // how do i put this in index?

        Job.belongsToMany(models.Worker,
            {
                through: 'chosenJobs',
                foreignKey: 'Job_rowId'
            })
    };

    return Job
}