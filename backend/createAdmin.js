const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  const email = 'skyfundedadmin@gmailcom';
  const plainPassword = 'skyfunded12345';

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("❌ Admin already exists");
    process.exit(0);
  }

  const admin = new Admin({
    email,
    password: plainPassword,  // Will be auto-hashed
    role: 'admin'              // ✅ Important: add this
  });

  await admin.save();

  console.log('✅ Admin user created successfully with role: admin');
  process.exit(0);
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});
