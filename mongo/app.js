// const mongoose = require("mongoose");

// // creation of database 
// mongoose.connect("mongodb://localhost:27017/bar")
//     .then(() => console.log("working......"))
//     .catch((err) => console.log(err))


// //schema defines the structor of the documents 

// const liqureschema = new mongoose.Schema({

//     name: String,
//     type: String,

// })

// //collection creation: {liqure: collection},{liqurelist:documents}

// const liqure = new mongoose.model("liqure", liqureschema);

// const creatdocumnet = async () => {


//     try {
//         const whisky = new liqure({

//             name: "black",
//             type: "whisky"

//         })
//         const rum = new liqure({

//             name: "whitedog",
//             type: "rum"

//         })
//         const desi = new liqure({

//             name: "noor",
//             type: "desi"

//         })
//         const vodka = new liqure({

//             name: "reserve",
//             type: "vodka"

//         })
//         const result = await liqure.insertMany([whisky, rum, desi, vodka]);

//         console.log(result)

//     } catch (err) {

//         console.log(err)

//     }
// }
// //creatdocumnet()

// const getdocument = async () => {

//     const result = await liqure.find({type:"rum"}).select({name:1});

//     console.log(result)

// }

// getdocument()

// predefine comparison operator : $gt,$lt,$lte,$in,$nin,$and,$or,.countDocuments().sort(1,-1)

// validation built-in



const mongoose = require("mongoose")
const validator = require("validator")

mongoose.connect("mongodb://localhost:27017/office")

    .then(() => console.log("working..."))
    .catch((err) => console.log(err))

const employeeschema = mongoose.Schema({

    name: {

        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 2,
        maxlength: 30,

    },
    salary: {

        type: Number,
        validate(salary) {

            if (salary < 0) {

                throw new Error("no negetive value")
            }
        }

    },
    type: String,
    email: {

        type: String,
        validate(value) {

            if (!validator.isEmail(value))

                throw new Error("email is Not  valid ")
        }
    }

})

const Employee = mongoose.model("Employee", employeeschema)

const insertdata = async () => {

    try {

        const emp1 = new Employee({

            name: "kalu",
            salary: 2,
            type: "permanent",
            email: "aditya.sharma9827.as@gmail.com",


        })

        const result = await Employee.insertMany([emp1])

        console.log(result);

    } catch (error) {

        console.log(error);

    }
}

insertdata()

const getdocument = async () => {

    //const result = await Employee.find({ type: { $in: ["permanent"] } }).select({ name: 1 });
    const result = await Employee.find({ salary: { $gt: 8000 } }).select({ name: 1 }).sort({ name: 1 });
    console.log(result)

}
//getdocument()


//update document

const up = async (_id) => {


    try {

        const result = await Employee.updateOne({ _id }, {

            $set: {

                name: "sambha"
            }

        });

        console.log(result)

    } catch (error) {

        console.log(error)

    }

}

//up("61935cfd3644c2e57aff36da")


//delete 


const deletee = async (_id) => {

    try {
        const result = await Employee.findByIdAndDelete({ _id })
        console.log(result)

    } catch (error) {

        console.log(error)

    }
}

//deletee("61935cfd3644c2e57aff36db")