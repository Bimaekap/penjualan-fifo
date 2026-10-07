import * as bcrypt from 'bcrypt';

const password = 'Admin123@';

const hast = await bcrypt.hash(password, 10);

console.log('Password:', password);
console.log('Hash:', hast);