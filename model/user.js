import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
        },
        age: {
            type: Number,
        },
        birth: {
            type: Date,
        },
        profileImg: {
            type: String,
        },
        role: {
            type: String,
            default: "user"
        }

    },
    {
        timestamps: true,
    }
)


userSchema.pre("save", async function (next) {
    try {
        console.log("enter")

        // profile 이미지 제너레이트
        const profileImg = await gravatar.url(this.email, {
            s: "200",
            r: "pg",
            d: "mm",
            protocol: "https"
        })
        // password 암호화
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        this.profileImg = profileImg

        console.log("exit")
        next()
    } catch (err) {
        next(err)
    }
})

userSchema.methods.comparePassword = function (inputPassword) {
    const isMatch = bcrypt.compare(inputPassword, this.password)
    return isMatch
}


const User = mongoose.model(`User`, userSchema)


export default User