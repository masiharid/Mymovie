const router = require('express').Router();
const Theatre = require('../models/theatreModel');
const authMiddleware = require('../middlewares/authMiddleware');
const Show = require('../models/showModel');
// Add Theatre
router.post('/add-theatre', authMiddleware, async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
            success: true,
            message: 'Theatre added successfully',


        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});
// Get all theatres
router.get("/get-all-theatres", authMiddleware, async (req, res) => {
    try {
        const theatres = await Theatre.find().sort({ createdAt: -1 });
        res.send({
            success: true,
            message: 'Theatres fetched successfully',
            data: theatres,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Get all theatres by owner
router.post("/get-all-theatres-by-owner", authMiddleware, async (req, res) => {
    try {
        const theatres = await Theatre.find({
            owner
                : req.body.owner
        }).sort({ createdAt: -1 });
        res.send({
            success: true,
            message: 'Theatres fetched successfully',
            data: theatres,
        });
    } catch
    (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});
// Update theatre
router.post("/update-theatre", authMiddleware, async (req, res) => {
    try {
        await Theatre.findByIdAndUpdate
            (req.body.theatreId, req.body);
        res.send({
            success: true,
            message: 'Theatre updated successfully',
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});
// Delete theatre
router.post("/delete-theatre", authMiddleware, async (req, res) => {
    try {
        await Theatre.findByIdAndDelete(req.body.theatreId);
        res.send({
            success: true,
            message: 'Theatre deleted successfully',
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});
// add show
router.post("/add-show", authMiddleware, async (req, res) => {
    try {
        const show = new Show(req.body);
        await show.save();
        res.send({
            success: true,
            message: 'Show added successfully',
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});
// get all shows by theatre
router.post("/get-all-shows-by-theatre", authMiddleware, async (req, res) => {
    try {
        const shows = await Show.find({ theatre: req.body.theatreId }).populate('movie').sort({ createdAt: -1 });
        res.send({
            success: true,
            message: 'Shows fetched successfully',
            data: shows,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});
// Delete show
router.post("/delete-show", authMiddleware, async (req, res) => {
    try {
        await Show.findByIdAndDelete(req.body.showId);
        res.send({
            success: true,
            message: 'Show deleted successfully',
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});
//get all unique theatres which have shows of a movie
router.post("/get-all-theatres-by-movie", authMiddleware, async (req, res) => {
    try {
        const { movie, date } = req.body;
        const shows = await Show.find({ movie, date })
            .populate('theatre')
            .sort({ createdAt: -1 });

        //get all unique theatres
        let uniqueTheatres = [];
        shows.forEach((show) => {
            const theatre = uniqueTheatres.find(
                (theatre) => theatre._id == show.theatre._id
            );
            if (!theatre) {
                const showsForThisTheatre = shows.filter(
                    (showObj) => showObj.theatre._id == show.theatre._id
                );
                uniqueTheatres.push({
                    ...show.theatre._doc,
                    shows: showsForThisTheatre,
                });
            }
        });
        res.send({
            success: true,
            message: 'Theatres fetched successfully',
            data: uniqueTheatres,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});
//get show by id
router.post("/get-show-by-id", authMiddleware, async (req, res) => {
    try {
        const show = await Show.findById(req.body.showId).populate('theatre').populate('movie');
        res.send({
            success: true,
            message: 'Show fetched successfully',
            data: show,
        });
    } catch
    (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;