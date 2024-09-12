import { config } from "dotenv";
config();
const serverconfig = {
  BCRYPT_HASH: process.env.BCRYPT_HASH,
  JWT_SECRET: process.env.JWT_SECRET,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
};
export default serverconfig;
