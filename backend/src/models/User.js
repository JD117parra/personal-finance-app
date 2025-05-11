import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  contraseñaHash: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Método para comparar contraseña
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.contraseñaHash);
};

// Antes de guardar, encriptar la contraseña si fue modificada
userSchema.pre('save', async function (next) {
  if (!this.isModified('contraseñaHash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseñaHash = await bcrypt.hash(this.contraseñaHash, salt);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;