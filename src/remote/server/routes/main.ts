import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    const page = {
        title: 'Home',
    };

    // @ts-ignore - This is a custom property
    if (!req.session.auth) return res.redirect('/auth');
    res.render('index', {
        page,
        session: req.session,
    });
});

// Export
const MainRouter = router;
export default MainRouter;
