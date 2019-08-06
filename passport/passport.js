const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require("../models");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = "superdupersecrethaha";

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      db.Worker.findOne({
        where: {
          id: payload.id
        }
      })
        .then(user => {
          if (user) {
            return done(null, user)
          }

          db.Manager.findOne({
            where: {
              id: payload.id
            }
          })
          .then(user => {
            if (user) {
              return done(null, user)
            }

            return done(null, false)
          })
        })
    })
  )
}
