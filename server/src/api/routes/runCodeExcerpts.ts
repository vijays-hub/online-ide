// import executeExcerpt from "api/legacy/utils/executeExcerpt";
// import generateFile from "api/legacy/utils/generateFile";
import { Router } from "express";
import { CodeExcerpt } from "types";
import { ALLOWED_LANGUAGES } from "types/enums";
import { getErrorResponse, getSuccessResponse } from "utils";

const router = Router();

router.post("/", async (req, res) => {
  const { language = ALLOWED_LANGUAGES["C++"], excerpt } =
    req.body as CodeExcerpt;

  if (!excerpt)
    return res
      .status(400)
      .json(getErrorResponse("Cannot execute empty code excerpt"));

  try {
    // // Get the file path to execute.
    // const filePath = await generateFile({ language, excerpt });

    // // Brew an executable file and then execute the code excerpt.
    // const output = await executeExcerpt(filePath, language);
    res.status(200).json(
      getSuccessResponse({
        data: "Compiled & Executed output",
        message: "code compiled successfully",
      })
    );
  } catch (error) {
    console.error("Error running the excerpt ", error);
    res.status(500).json(getErrorResponse(`Error running the excerpt`, error));
  }
});

export default router;
