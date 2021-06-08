import dotenv from "dotenv";

dotenv.config();

interface PARAMETERS {
	SECRET_KEY: string
}

const parameters: PARAMETERS = {
	SECRET_KEY: process.env.SECRET_KEY || "KEY"
};

export {parameters};
