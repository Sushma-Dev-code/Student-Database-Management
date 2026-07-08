const express=require("express");

const router=express.Router();

const studentController=require(
"../controllers/studentController"
);

// TEST ROUTE
// router.get(
// "/test",
// (req,res)=>{
// res.send("Deleted route file working");
// }
// );

// Deleted students
router.get(
"/deleted",
studentController.getDeletedStudents
);

// Get students
router.get(
"/",
studentController.getStudents
);

// Add
router.post(
"/",
studentController.addStudent
);

// Update
router.put(
"/:id",
studentController.updateStudent
);

// Delete
router.delete(
"/:id",
studentController.deleteStudent
);

module.exports=router;