import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Preencha o nome de usuário corretamente."],
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "Preencha o e-mail corretamente."],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Por favor, digite um e-mail válido."],
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: [true, "Digite uma senha válida."],
        minlength: 6,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;