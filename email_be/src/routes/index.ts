import { Request, Response, router } from "@/config/express.config";
import authEmailRoute from "./auth";

// ** routes
import csrfProtection from "@/middlewares/csrfTokenHandler";

router.use("/auth", authEmailRoute);

router.get("/csrf-token", csrfProtection, (req: Request, res: Response) => {
  res.json({ csrfToken: req.csrfToken() });
});

export default router;
