const db=require("../db");


// Get all students
exports.getStudents=async(req,res)=>{

try{

const data=await db.query(

"SELECT * FROM students WHERE deleted=false ORDER BY id"

);

res.json(data.rows);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};


// Add student
exports.addStudent=async(req,res)=>{

try{

const {
name,
email,
phone,
class:studentClass,
gender
}=req.body;


// check duplicate email
const check=await db.query(

"SELECT * FROM students WHERE email=$1",

[email]

);

if(check.rows.length>0){

return res.status(400).json({

message:"Email already exists"

});

}


const data=await db.query(

`INSERT INTO students
(name,email,phone,class,gender)

VALUES($1,$2,$3,$4,$5)

RETURNING *`,

[
name,
email,
phone,
studentClass,
gender
]

);

res.status(201).json(
data.rows[0]
);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};


// Update student
exports.updateStudent=async(req,res)=>{

try{

const id=req.params.id;

const {
name,
email,
phone,
class:studentClass,
gender
}=req.body;


const data=await db.query(

`UPDATE students

SET

name=$1,
email=$2,
phone=$3,
class=$4,
gender=$5

WHERE id=$6

RETURNING *`,

[
name,
email,
phone,
studentClass,
gender,
id
]

);


if(data.rows.length===0){

return res.status(404).json({

message:"Student not found"

});

}

res.json(
data.rows[0]
);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};


// Delete student

exports.deleteStudent = async (req, res) => {

    try {

        const id = req.params.id;

        const data = await db.query(
            "UPDATE students SET deleted = true WHERE id = $1 RETURNING *",
            [id]
        );

        if (data.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student moved to deleted list",
            student: data.rows[0]
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Get deleted students

exports.getDeletedStudents=async(req,res)=>{

try{

console.log("Deleted API called");

const data=await db.query(
"SELECT * FROM students WHERE deleted=true ORDER BY id"
);

res.json(data.rows);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};