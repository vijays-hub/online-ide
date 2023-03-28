import { Router } from "express";
import { CodeExcerpt } from "types";
import { ALLOWED_LANGUAGES } from "types/enums";
import { getErrorResponse } from "utils";

const router = Router();

router.post("/", async (req, res) => {
  const { language = ALLOWED_LANGUAGES["C++"], excerpt } =
    req.body as CodeExcerpt;

  if (!excerpt)
    res.status(400).json(getErrorResponse("Cannot execute empty code excerpt"));

  res.status(200).json({
    language,
    excerpt,
  } as CodeExcerpt);
});

export default router;
