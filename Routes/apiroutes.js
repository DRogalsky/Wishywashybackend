const db = require("../models");

module.exports = function (app) {
    app.post("/api/signup/worker", function (req, res) {
        // new person of type type (manager or worker) gets added to the database might need two since they're so different?
        db.Worker.create(req.body).then(function (dbWorker) {
            res.json(dbWorker);
        });
    })
        // i probably don't need these anymore
    app.post("/api/signup/manager", function (req, res) {
        // new person of type type (manager or worker) gets added to the database might need two since they're so different?
        db.Manager.create(req.body).then(function (dbManager) {
            res.json(dbManager);
        });
    })

    app.get("/api/profile/Worker/:id", function (req, res) {
        // grab the profile of the person
        db.Worker.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Job]
        }).then(function (worker) {
            res.json(worker)
        })
    })

    app.get("/api/profile/Manager/:id", function (req, res) {
        // grab the profile of the person
        db.Manager.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Job]
        }).then(function (worker) {
            res.json(worker)
        })
    })

    app.get("/api/joblist", function (req, res) {
        // grab the job list and throw it to the front maybe only non filled?
        db.Job.findAll({
            where: {
                filled: null
            }
        }).then(function (jobs) {
            res.json(jobs)
        })
    })

    app.post("/api/createJob", function (req, res) {
        db.Job.create(req.body).then(function (job) {
            res.json(job)
        })
    })

    app.get("/api/job/workers/:id", function (req, res) {
        db.Job.findOne({
            where: {
                id: req.params.id
            },
            include: [db.worker]
        }).then(function (job){
            res.json(job)
        })
    })

    app.get('/api/takejob/:jobid/:workerid', function (req, res) {
        // adds job to worker and worker to job
        db.Worker.findOne({
            where: {
                id: req.params.workerid
            }
        }).then(function(worker) {
            worker.addJob(req.params.jobid)
            res.json(worker)
        })
        // db.Worker.addJob(Job)
        // db.Job.addWorker(Worker)
    })

    app.put('/api/filljob', function (req, res) {
        // flags the job as filled
        db.Job.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbJob) {
                db.Worker.update(
                    req.body
                )
            })
    })

    app.delete('/api/deletejob/:id', function (req, res) {
        // remove job from list and other things probably?
        db.Job.destory({
            where: {
                id: req.params.id
            }
        }).then(function (dbJob) {
            res.json(dbJob)
        })
    })
}