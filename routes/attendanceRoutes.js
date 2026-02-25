const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

router.post("/", async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    // 1️⃣ Required fields validation
    if (!employeeId || !date || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields (employeeId, date, status) are required",
      });
    }

    if (!["Present", "Absent"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'Present' or 'Absent'",
      });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    const attendance = await Attendance.create({
      employee: employeeId,
      date: normalizedDate,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Attendance already marked for this employee on this date",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const records = await Attendance.find({
      employee: employeeId,
    })
      .populate("employee", "employeeId fullName email department")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
