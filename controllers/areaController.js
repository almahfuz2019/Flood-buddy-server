const Area = require("../models/areaModel"); // Assuming your model is named Area

// Get all areas with pagination
exports.getAreas = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const areas = await Area.find().skip(parseInt(skip)).limit(parseInt(limit));

    const totalAreas = await Area.countDocuments();

    res.status(200).json({ totalAreas, areas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single area by ID
exports.getAreaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Area ID is required" });
    }
    const area = await Area.findById(id);
    if (!area) {
      return res.status(404).json({ error: "Area not found" });
    }
    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new area
exports.createArea = async (req, res) => {
  try {
    const {
      districtName,
      stateName,
      thanaName,
      postOfficeName,
      villageName,
      floodSeverity,
      affectedPopulation,
      reliefEfforts,
      statusDate,
    } = req.body;

    if (
      !districtName ||
      !stateName ||
      !thanaName ||
      !postOfficeName ||
      !villageName ||
      !floodSeverity ||
      !affectedPopulation ||
      !reliefEfforts ||
      !statusDate
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Create a new area
    const area = new Area({
      districtName,
      stateName,
      thanaName,
      postOfficeName,
      villageName,
      floodSeverity,
      affectedPopulation,
      reliefEfforts,
      statusDate,
    });
    await area.save();
    res.status(201).json({ message: "Area created successfully", area });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an area by ID
exports.deleteAreaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Area ID is required" });
    }

    const area = await Area.findByIdAndDelete(id);
    if (!area) {
      return res.status(404).json({ error: "Area not found" });
    }

    res.status(200).json({ message: "Area deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing area by ID
exports.updateAreaById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      districtName,
      stateName,
      thanaName,
      postOfficeName,
      villageName,
      floodSeverity,
      affectedPopulation,
      reliefEfforts,
      statusDate,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Area ID is required" });
    }

    const area = await Area.findByIdAndUpdate(
      id,
      {
        districtName,
        stateName,
        thanaName,
        postOfficeName,
        villageName,
        floodSeverity,
        affectedPopulation,
        reliefEfforts,
        statusDate,
      },
      { new: true, runValidators: true },
    );

    if (!area) {
      return res.status(404).json({ error: "Area not found" });
    }

    res.status(200).json({ message: "Area updated successfully", area });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Count total areas
exports.countAreas = async (req, res) => {
  try {
    const count = await Area.countDocuments();
    res.status(200).json({ totalAreas: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search areas by multiple fields (districtName, stateName, thanaName, etc.)
exports.searchAreas = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const regex = new RegExp(query, "i"); // Case-insensitive search

    // Search across multiple fields
    const areas = await Area.find({
      $or: [
        { districtName: regex },
        { stateName: regex },
        { thanaName: regex },
        { postOfficeName: regex },
        { villageName: regex },
        { reliefEfforts: regex },
      ],
    });

    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch areas based on specific district or user’s query (if needed)
exports.getAreasByDistrict = async (req, res) => {
  try {
    const { district } = req.query; // Assuming you want to filter areas by district

    if (!district) {
      return res.status(400).json({ error: "District is required" });
    }

    const areas = await Area.find({ districtName: district });

    if (!areas || areas.length === 0) {
      return res.status(404).json({ error: "No areas found in this district" });
    }

    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Toggle status (true/false)
exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await Area.findById(id);

    if (!area) {
      return res.status(404).json({ error: "Area not found" });
    }

    // Toggle the status (true <-> false)
    area.status = !area.status;
    await area.save();

    res.status(200).json({ message: "Status updated successfully", area });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
