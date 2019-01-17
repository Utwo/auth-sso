import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema } = mongoose
type ObjectId = mongoose.Types.ObjectId

export interface Account {
  _id?: ObjectId
  firstName: string
  lastName: string
  email: string
  picture: string
  slug: string
  google: string
  github: string
  deleted: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

const schema = new Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    picture: {
      required: true,
      type: String,
    },
    slug: {
      required: false,
      type: String,
    },
    google: {
      default: {},
      type: Schema.Types.Mixed,
    },
    github: {
      default: {},
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
)

schema.pre('save', async (next) => {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

schema.methods.passwordMatch = async (password) => bcrypt.compare(password, this.passwordHash)

type AccountType = Account & mongoose.Document
export const AccountModel = mongoose.model<AccountType>('account', schema)
