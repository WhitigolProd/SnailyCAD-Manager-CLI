import { Router } from 'express';
const router = Router();

// Middleware
router.use((req, res, next) => {
    // @ts-expect-error - This is a custom property added to the session object.
    if (!req.session.auth) {
        res.status(401).send('Unauthorized');
        return;
    }
    next();
});

router.get('/', (req, res) => {
    res.status(200).send('API Online');
});

router.post('/test', (req, res) => {
    const page = {
        title: req.body.test,
    };
    res.render('auth', {
        page,
    });
});

// Export
const ApiRouter = router;
export default ApiRouter;
