import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/signup', (req, res, next) => {
    passport.authenticate('register', { failureRedirect: '/failregister' }, async (err, user) => {
        if (err) {
            console.error(err);
            return res.redirect('/failregister');
        }
        if (!user) {
            return res.redirect('/failregister');
        }
        const { first_name, last_name, age, email } = req.body;
        if (!first_name || !last_name || !age) {
            CustomError.createError({
                name: "User creation error",
                cause: generateUserErrorInfo({ first_name, last_name, age, email }),
                message: "Error Trying to create user",
                code: EErrors.INVALID_TYPES_ERROR
            });
            return res.redirect('/failregister');
        }
        req.login(user, (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return res.redirect('/failregister');
            }
            return res.redirect('/profile');
        });
    })(req, res, next);
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.email = req.user.email;
    req.session.age = req.user.age;
    req.session.role = req.user.role;
    req.session.isLogged = true;

    res.redirect('/products');
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        req.session.first_name = req.user.first_name;
        req.session.last_name = req.user.last_name;
        req.session.email = req.user.email;
        req.session.age = req.user.age;
        req.session.role = req.user.role;
        req.session.isLogged = true;

    res.redirect('/products');
}
);

export default router;

