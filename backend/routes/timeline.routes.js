const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const API_URL = process.env.API_URL;
const axios = require(`axios`)

router.get("/timeline", isAuthenticated, (req, res, next) => {
    const {token} = req.user;
    console.log("this is the token", token);

    let finalEntries = [];
    let allEntries = [];
    let allDiaryEntries;
    let allGratitudeEntries;

    const diaryPromise = axios.get(`${API_URL}/api/diary/entries`, {headers: {authorization: `${token}`}})
    .then((allDiaryEntriesFromApi) => {
        allDiaryEntries = allDiaryEntriesFromApi.data;
        // console.log(allDiaryEntries)
    })
    .catch((err) => {
      console.log(err.message)
      next(err)});

    

    const gratitudePromise = axios.get(`${API_URL}/api/gratitude/entries`, {headers: {authorization: `${token}`}})
    .then((allGratitudeEntriesFromApi) => {
        allGratitudeEntries = allGratitudeEntriesFromApi.data;
        // console.log(allGratitudeEntries)
    })
    .catch((err) => next(err));

    Promise.all([diaryPromise, gratitudePromise])
    .then(() => {
        allEntries = [...allGratitudeEntries, ...allDiaryEntries];
        // console.log(allEntries)
        allEntries.forEach((entry) => {
            const date = new Date(entry.createdAt).toISOString().split('T')[0];

            const existingDateObject = finalEntries.find((obj) => obj.date === date);

            if(existingDateObject){
                if(entry.gratitudeText) {
                    existingDateObject.gratitude.push({
                        id: entry._id,
                        text: entry.gratitudeText,
                    });
                } else if(entry.diaryText) {
                    existingDateObject.diary.push({
                        id: entry._id,
                        text: entry.diaryText,
                    });
                } 
            } else {
                // If it doesn't exist, create a new date object and push the entry to the corresponding category
                const newDateObject = {
                  date,
                  gratitude: [],
                  diary: [],
                };
            
                if (entry.gratitudeText) {
                  newDateObject.gratitude.push({
                    id: entry._id,
                    text: entry.gratitudeText,
                  });
                } else if (entry.diaryText) {
                  newDateObject.diary.push({
                    id: entry._id,
                    text: entry.diaryText,
                  });
                }
            
                finalEntries.push(newDateObject);
              }});
              console.log(finalEntries);
              res.status(200).json(finalEntries)
              // console.log(finalEntries[0].gratitude)
              // console.log(finalEntries[0].diary)
       
    })
    .catch((err) => next(err));


})

module.exports = router;