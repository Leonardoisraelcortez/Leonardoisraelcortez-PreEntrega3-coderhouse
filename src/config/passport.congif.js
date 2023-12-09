import passport from "passport";
import LocalStrategy from 'passport-local';
import GitHubStrategy from 'passport-github2'
import bcrypt from 'bcrypt';
import userModel from "../dao/models/user.model.js";
import config from "./config.js";
import CustomError from "../services/errors/customError.js";
import EErrors from "../services/errors/enums.js";
import { generateUserErrorInfo } from "../services/errors/info.js";

const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
            const existUser = await userModel.findOne({ email: username });
            if (existUser) {
                return done(null, false);
            }

            const userCreate = await userModel.create({
                first_name,
                last_name,
                age,
                email: username,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            });

            return done(null, userCreate);

        } catch (error) {
            return done(error);
        }
    }))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });

            if (!user) {
                return done(null, false);
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false)
            }

            return done(null, user);

        } catch (error) {
            return done(error);
        }
    }));

    const clientID = config.github_client_id;
    const clientSecret = config.github_client_secret;
    const callbackURL = config.github_callback_url;


    passport.use('github', new GitHubStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: callbackURL,
        scope:['user:email'],
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            const email = profile.emails[0].value;
        const user = await userModel.findOne({ email })

            if (!user) {
                const newUser = await userModel.create({
                    first_name: profile._json.name,
                    last_name: '',
                    age: 20,
                    password: '',
                    email
                });

                return done(null, newUser)
            }

            return done(null, user)
        }catch(error){
            return done(error);
        }
        }
    )
);

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;