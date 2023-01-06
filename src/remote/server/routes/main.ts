import { Router } from 'express';
const router = Router();
router.use((req, res, next) => {
    // @ts-expect-error - This is a custom property added to the session object.
    if (!req.session.auth) {
        res.redirect('/auth');
        return;
    }
    next();
});

router.get('/', (req, res) => {
    res.render('index');
});

// Export
const MainRouter = router;
export default MainRouter;
