const {nanoid} = require('nanoid');
const URL = require('../models/url.js'); 

const handleGenerateNewShortUrl = async (req, res) => {
    const body = req.body;
    if(!body.url) {
        return res.status(400).json({error: 'URL is required'});
    }
    const id = nanoid(8);
    await URL.create({
        shortId: id,
        redirectUrl: body.url,
        visitHistory: []
    })
    console.log(`Generated new short URL with id: ${id}`);
    return res.status(201).json({id: id});
}

const handleGetShortUrl = async (req, res) => {
    const shortId = req.params.shortId;
    const url = await URL.findOne({shortId: shortId});
    if(!url) {
        return res.status(404).json({error: 'Short URL not found'});
    }
    url.visitHistory.push({timestamp: Date.now()});
    await url.save();
    return res.redirect(url.redirectUrl);
}        

const handleGetAnalytics = async(req, res)=> {
    const shortId = req.params.shortId;
    const url = await URL.findOne({shortId: shortId});
    if(!url) {
        return res.status(404).json({error: 'Short URL not found'});
    }
    return res.json({
        totalClicks: url.visitHistory.length, 
        visitHistory: url.visitHistory
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetShortUrl,
    handleGetAnalytics
};