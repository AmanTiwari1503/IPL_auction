var express = require('express');
var mainController = require('../controllers/MainController');
var adminController = require('../controllers/AdminController');
var sessionController = require('../controllers/sessionController');
var playerController = require('../controllers/playerController');
var router = express.Router();
var app = require('../../ApplicationInstance');

router.route('/').get(mainController.home);
router.route('/login').post(sessionController.userlogin);
router.route('/userportal').get(mainController.userportal);
router.route('/admin').get(adminController.home);
router.route('/admin/portal').get(adminController.portal);
router.route('/admin').post(sessionController.login);
router.route('/admin/portal/registerplayer').post(playerController.registerplayer);
router.route('/admin/portal/registerteam').post(playerController.registerteam);
router.route('/admin/portal/findPlayer').post(playerController.findplayer);
router.route('/admin/portal/betting').post(playerController.betting);
router.route('/admin/portal/getAllTeams').post(playerController.getAllTeams);
router.route('/userportal/findMyPlayers').post(sessionController.findMyPlayers);

module.exports = router;