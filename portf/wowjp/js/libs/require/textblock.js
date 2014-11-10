/**
Requirejs block

Copyright (C) 2014  Oleksandr Knyga, oleksandrknyga@gmail.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
define({
    load: function (name, req, onload, config) {
        var spname = /^(.+)(\.[^\.]+$)?/.exec(name);
        var split = spname[1].split('.');

        if(split.length > 0) {
            spname[1] = split[0];
            spname[2] = '.'+split[1];
        }

    	var blocksPath = config.modules && config.modules.block && config.modules.block.path ? config.modules.block.path : 'blocks',
    		pathArray = spname[1].split('/');
    	var newName = 'text!' + blocksPath + '/',
            fname = '';

    	for(var i = 0;i<pathArray.length;i++) {
    		newName += pathArray[i];
    		newName += '/';

            if(i > 0) {
                fname += pathArray[i].charAt(0).toUpperCase() + pathArray[i].slice(1);
            } else {
                fname += pathArray[i];
            }
    	}

    	newName += fname;

        if('undefined' !== typeof spname[2]) {
            newName += spname[2];
        }

        //req has the same API as require().
        req([newName], function (value) {
            onload(value);
        });
    }
});