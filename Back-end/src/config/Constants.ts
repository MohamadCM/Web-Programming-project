import dotenv from "dotenv";

dotenv.config();

interface PARAMETERS {
	UNKNOWN: string,
	SECRET_KEY: string,
	HASH_SALT_ROUNDS: number,
	ASSETS_PATH: Record<"PRODUCT_PICTURES", string>;
	DEFAULT_CATEGORY_NAME: string,
	CREDIT_INCREMENT_VALUE: number
}

const parameters: PARAMETERS = {
	UNKNOWN: "NOT_SET",
	SECRET_KEY: process.env.SECRET_KEY || "KEY",
	HASH_SALT_ROUNDS: Number.parseInt(process.env.HASH_SALT_ROUNDS || "1"),
	ASSETS_PATH: {
		PRODUCT_PICTURES: "public/product-pic"
	},
	DEFAULT_CATEGORY_NAME: process.env.DEFAULT_CATEGORY_NAME || "دسته‌بندی نشده",
	CREDIT_INCREMENT_VALUE: Number
		.parseInt(process.env.CREDIT_INCREMENT_VALUE && Number(process.env.CREDIT_INCREMENT_VALUE) ?
			process.env.CREDIT_INCREMENT_VALUE : "10000")
};

export default parameters;
