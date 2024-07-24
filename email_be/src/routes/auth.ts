import { Request, Response, router } from "@/config/express.config";
import { registerEmail } from "@/controller/auth";


router.post('/register', registerEmail)

export default router;
