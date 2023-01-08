import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    // @ts-expect-error - This is a custom property added to the session object.
    if (req.session.auth) {
        return res.redirect('/');
    }
    res.render('auth');
});

// Export
const AuthRouter = router;
export default AuthRouter;
