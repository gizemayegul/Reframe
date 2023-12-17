const router = require("express").Router();
const mongoose = require("mongoose");
const Gratitude = require("../models/Gratitude.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/gratitude/entries", isAuthenticated, (req, res, next) => {
  const { gratitudeText } = req.body;
  const { _id: userID } = req.user;

  Gratitude.create({ userID, gratitudeText })
    .then((newGratitudeEntry) => res.status(200).json(newGratitudeEntry))
    .catch((err) => res.json(err));
});

router.get("/gratitude/entries", isAuthenticated, (req, res, next) => {
  const { _id: userID } = req.user;

  Gratitude.find({ userID })
    .then((allGratitudeEntries) => {
      if (!allGratitudeEntries) {
        return res
          .status(404)
          .json({ message: "An error occured, data could not be retrieved" });
      }
      res.json(allGratitudeEntries);
    })
    .catch((err) => res.json(err));
});

router.get(
  "/gratitude/entries/date/:dateNow",
  isAuthenticated,
  async (req, res, next) => {
    const { _id: userID } = req.user;
    const { dateNow } = req.params;
    const startDate = new Date(dateNow);
    const endDate = new Date(dateNow + "T23:59:59.999Z");

    try {
      const gratitudeEntryByDate = await Gratitude.findOne({
        userID: userID,
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      if (!gratitudeEntryByDate) {
        return res.status(404).json({ message: "Gratitude entry not found" });
      }

      res.status(200).json(gratitudeEntryByDate);
    } catch (error) {
      console.error("An error occurred:", error.message);
      next(error);
    }
  }
);

//show me a specific entry by entry ID (currently ignoring the user):
router.get("/gratitude/entries/:entryID", isAuthenticated, (req, res, next) => {
  const { entryID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(entryID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Gratitude.findById(entryID)
    .then((foundEntryID) => {
      if (!foundEntryID) {
        res.status(404).json({ message: "This entry does not exist" });
        return;
      }
      res.json(foundEntryID); //Object
    })
    .catch((err) => res.json(err));
});

router.delete(
  "/gratitude/entries/:entryID",
  isAuthenticated,
  (req, res, next) => {
    const { entryID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(entryID)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    Gratitude.findByIdAndDelete(entryID)
      .then(() => res.json({ message: "Gratitude entry successfully deleted" }))
      .catch((err) => res.json(err));
  }
);

router.patch(
  "/gratitude/entries/:entryID",
  isAuthenticated,
  (req, res, next) => {
    const { entryID } = req.params;
    const { gratitudeText } = req.body;
    if (gratitudeText === "") {
      Gratitude.findByIdAndDelete(entryID)
        .then(() => res.json())
        .catch((err) => res.json(err));
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(entryID)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    Gratitude.findByIdAndUpdate(entryID, { gratitudeText }, { new: true })
      .then((updatedGratitudeEntry) => res.json(updatedGratitudeEntry))
      .catch((err) => res.json(err));
  }
);

module.exports = router;
