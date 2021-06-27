function formatToRial(num) {
	const toCurrencyFormat = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "IRR"
	});
	const money = toCurrencyFormat.format(num);
	console.log(money);
	return money.replace("IRR", "").replace(".00", "") + " تومان";
}

export default { formatToRial };
