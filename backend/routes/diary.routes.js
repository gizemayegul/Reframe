const router = require("express").Router();
const mongoose = require("mongoose");
const Diary = require("../models/Diary.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/diary/entries", isAuthenticated, async (req, res, next) => {
  const { _id: userID } = req.user;
  const { diaryText } = req.body;

  try {
    const newDiaryEntry = await Diary.create({ userID, diaryText });

    res.status(200).json(newDiaryEntry);
  } catch (err) {
    console.error("An error occurred:", err.message);
    next(err);
  }
});

router.get("/diary/entries", isAuthenticated, async (req, res, next) => {
  const { _id: userID } = req.user;

  try {
    const diaryEntries = await Diary.find({ userID });

    if (!diaryEntries) {
      return res
        .status(404)
        .json({ error: "An orror ocurred. Retrieving data impossible." });
    }

    res.status(200).json(diaryEntries);
  } catch (err) {
    console.error("An error occurred:", err.message);
    next(err);
  }
});

router.get(
  "/diary/entries/date/:dateNow",
  isAuthenticated,
  async (req, res, next) => {
    const { _id: userID } = req.user;
    const { dateNow } = req.params;
    const startDate = new Date(dateNow);
    const endDate = new Date(dateNow + "T23:59:59.999Z");

    try {
      const diaryEntryByDate = await Diary.findOne({
        userID: userID,
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      console.log();

      if (!diaryEntryByDate) {
        return res.status(404).json({ error: "Diary entry not found" });
      }

      res.status(200).json(diaryEntryByDate);
    } catch (error) {
      console.error("An error occurred:", error.message);
      next(error);
    }
  }
);

router.get(
  "/diary/entries/:entryID",
  isAuthenticated,
  async (req, res, next) => {
    const { entryID } = req.params;
    console.log(entryID);

    try {
      if (!mongoose.Types.ObjectId.isValid(entryID)) {
        return res.status(400).json({ error: "Specified id is not valid" });
      }

      const foundDiaryEntry = await Diary.findById(entryID);

      if (!foundDiaryEntry) {
        return res.status(404).json({ error: "Diary entry not found" });
      }

      res.status(200).json(foundDiaryEntry);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }
);

router.patch(
  "/diary/entries/:entryID",
  isAuthenticated,
  async (req, res, next) => {
    const { entryID } = req.params;
    const { diaryText } = req.body;
    if (diaryText === "") {
      Diary.findByIdAndDelete(entryID)
        .then(() => res.json())
        .catch((err) => res.json(err));
      return;
    }
    try {
      const updatedDiaryEntry = await Diary.findByIdAndUpdate(
        entryID,
        { diaryText },
        { new: true }
      );
      if (!updatedDiaryEntry) {
        return res.status(404).json({ error: "Diary entry not found" });
      }

      res.status(200).json(updatedDiaryEntry);
    } catch (err) {
      console.error("An error occurred:", err.message);
      next(err);
    }
  }
);

router.delete(
  "/diary/entries/:entryID",
  isAuthenticated,
  async (req, res, next) => {
    const { entryID } = req.params;

    try {
      const deletedDiaryEntry = await Diary.findByIdAndDelete(entryID);

      if (!deletedDiaryEntry) {
        return res.status(404).json({ error: "Diary entry not found" });
      }

      res.status(200).json({ message: "Diary entry successfully deleted" });
    } catch (err) {
      console.error("An error occurred:", err.message);
      next(err);
    }
  }
);

module.exports = router;
