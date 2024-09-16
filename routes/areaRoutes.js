const express = require("express");
const router = express.Router();
const AreaController = require("../controllers/areaController");
cons = require("../middleware/authMiddleware");

// Existing routes (renamed for areas)
router.get("/areas", AreaController.getAreas);
router.get("/area/:id", AreaController.getAreaById);
router.post("/area", AreaController.createArea);
router.delete("/area/:id", AreaController.deleteAreaById);
router.put("/area/:id", AreaController.updateAreaById);
router.get("/areas/count", AreaController.countAreas);
router.get("/areas/search", AreaController.searchAreas);
router.patch("/area/:id/toggle-status", AreaController.toggleStatus);

// New route to fetch areas by district or specific query (if needed)
router.get("/areas/district", AreaController.getAreasByDistrict);

module.exports = router;
