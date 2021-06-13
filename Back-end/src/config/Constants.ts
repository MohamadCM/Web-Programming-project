import dotenv from "dotenv";

dotenv.config();

interface PARAMETERS {
	UNKNOWN: string,
	SECRET_KEY: string,
	HASH_SALT_ROUNDS: number,
	ASSETS_PATH: Record<"PRODUCT_PICTURES", string>;

}

const parameters: PARAMETERS = {
	UNKNOWN: "NOT_SET",
	SECRET_KEY: process.env.SECRET_KEY || "KEY",
	HASH_SALT_ROUNDS: Number.parseInt(process.env.HASH_SALT_ROUNDS || "1"),
	ASSETS_PATH: {
		PRODUCT_PICTURES: "public/product-pic"
	}
};

export default parameters;
