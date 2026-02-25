const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

router.post("/", async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (employeeId, fullName, email, department) are required",
      });
    }

    const employee = await Employee.create({
      employeeId,
      fullName,
      email,
      department,
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];

      return res.status(409).json({
        success: false,
        message: `${field} already exists`,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await Attendance.deleteMany({ employee: req.params.id });

    await Employee.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Employee and related attendance deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
