import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    const page = {
        title: 'Login',
    };
    // @ts-ignore
    req.session.auth = true;
    // @ts-ignore - This is a custom property
    if (req.session.auth) return res.redirect('/');
    res.render('auth', {
        page,
    });
});

// Export
const AuthRouter = router;
export default AuthRouter;
