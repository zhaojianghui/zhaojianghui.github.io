require.config({
	baseUrl: 'js',
	paths: {
		"jquery": "lib/jquery",
		"template": "plug/template",
		"womai": "js/womai",
		"searchword":"js/searchword",
		"jquery.cookie":"lib/jquery.cookie",
		"gwc":"js/gwc",
		"gwcPay":"js/gwcPay"

	},
	shim:{
        "jquery.cookie": ['jquery']
	}
})