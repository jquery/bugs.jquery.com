			var years = this._get(inst, 'yearRange').split(':');
			var year = 0;
			var endYear = 0;
			if (years.length != 2) {
				year = drawYear - 10;
				endYear = drawYear + 10;
			} else {
				switch( years[0].charAt(0) ) {
					case '+':
					case '-':
						year = drawYear + parseInt(years[0], 10);
					break;
					default:
						year = parseInt(years[0], 10);
				}
				switch( years[1].charAt(0) ) {
					case '+':
					case '-':
						endYear = drawYear + parseInt(years[1], 10);
					break;
					default:
						endYear = parseInt(years[1], 10);
				}
			}
			year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
			endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);