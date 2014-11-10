#!/bin/sh

if [ "$1" = "" ] || [ "$1" = "--css" ]
then
	echo "--css"
	node_modules/.bin/borschik --input=css/main.css --output=css/main.built.temp1.css --minimize=false --comments=false
	echo "built"
	sed "s/﻿﻿//g" css/main.built.temp1.css > css/main.built.temp2.css
	sed "s/﻿//g" css/main.built.temp2.css > css/main.built.temp3.css
	node_modules/.bin/uglifycss --cute-comments css/main.built.temp3.css > css/main.built.css
	echo "optimised"
	rm css/main.built.temp1.css
	rm css/main.built.temp2.css
	rm css/main.built.temp3.css
	echo "temp files removed"
fi

if [ "$1" = "" ] || [ "$1" = "--js" ]
then
	echo "--js"
	node_modules/.bin/r.js -o js/build.js
fi

#