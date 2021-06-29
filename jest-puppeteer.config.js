module.exports = {
	launch: {
		dumpio: true,
		headless: true,
		executablePath:  process.env.CI === "true" ? 'google-chrome-stable' : undefined,
		args: ['--disable-infobars', '--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
	},
	browserContext: 'default'
};