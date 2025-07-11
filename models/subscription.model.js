import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nome da assinatura é obrigatório."],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, "Valor da assinatura é obrigatório."],
        min: [0, "Preço deve ser maior que 0."],
        max: [1000, "Preço deve ser menor que 1000."]
    },
    currency: {
        type: String,
        enum: ["USD", "BRL"],
        default: "BRL",
    },
    frequency: {
        type: String,
        enum: ["Diária", "Semanal", "Mensal", "Anual"],
    },
    category:{
        type: String,
        enum: ["Notícias", "Entretenimento", "Tecnologia", "Queijos"]
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["Ativa", "Cancelada", "Expirada"],
        default: "Ativa",
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Data Inicial precisa estar no passado',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
               return value > this.startDate;
            },
            message: 'Data de renovação deve ser depois da data de ínicio.',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, { timestamps: true });

/*Calcula a data de renovação da assinatura*/
subscriptionSchema.pre("save", function (next) {
 if(!this.renewalDate){
     const renewalPeriods = {
        daily: 1,
         weekly: 7,
         monthly: 30,
         yearly: 365,
     };

     this.renewalDate = new Date(this.startDate);
     this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
 }

    /*Atualizar o status automaticamente se a data de renovação tiver passado*/
    if(this.renewalDate < new Date()){
    this.status = "Expirada";
    }

    next();
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;



