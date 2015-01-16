// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS

/**
 * @license jqGrid  4.7.0-post - jQuery Grid
 * Copyright (c) 2008, Tony Tomov, tony@trirand.com
 * Copyright (c) 2014, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * Date: 2014-12-28
 */
//jsHint options
/*jshint evil:true, eqeqeq:false, eqnull:true, devel:true */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */

(function ($) {
"use strict";
var englishLanguageDefaults = {
	defaults : {
		recordtext: "View {0} - {1} of {2}",
		emptyrecords: "No records to view",
		loadtext: "Loading...",
		pgtext : "Page {0} of {1}",
		pgfirst : "First Page",
		pglast : "Last Page",
		pgnext : "Next Page",
		pgprev : "Previous Page",
		pgrecs : "Records per Page",
		showhide: "Toggle Expand Collapse Grid"
	},
	search : {
		caption: "Search...",
		Find: "Find",
		Reset: "Reset",
		odata: [{ oper:'eq', text:'equal'},{ oper:'ne', text:'not equal'},{ oper:'lt', text:'less'},{ oper:'le', text:'less or equal'},{ oper:'gt', text:'greater'},{ oper:'ge', text:'greater or equal'},{ oper:'bw', text:'begins with'},{ oper:'bn', text:'does not begin with'},{ oper:'in', text:'is in'},{ oper:'ni', text:'is not in'},{ oper:'ew', text:'ends with'},{ oper:'en', text:'does not end with'},{ oper:'cn', text:'contains'},{ oper:'nc', text:'does not contain'},{ oper:'nu', text:'is null'},{ oper:'nn', text:'is not null'}],
		groupOps: [{ op: "AND", text: "all" },{ op: "OR",  text: "any" }],
		operandTitle : "Click to select search operation.",
		resetTitle : "Reset Search Value"
	},
	edit : {
		addCaption: "Add Record",
		editCaption: "Edit Record",
		bSubmit: "Submit",
		bCancel: "Cancel",
		bClose: "Close",
		saveData: "Data has been changed! Save changes?",
		bYes : "Yes",
		bNo : "No",
		bExit : "Cancel",
		msg: {
			required:"Field is required",
			number:"Please, enter valid number",
			minValue:"value must be greater than or equal to ",
			maxValue:"value must be less than or equal to",
			email: "is not a valid e-mail",
			integer: "Please, enter valid integer value",
			date: "Please, enter valid date value",
			url: "is not a valid URL. Prefix required ('http://' or 'https://')",
			nodefined : " is not defined!",
			novalue : " return value is required!",
			customarray : "Custom function should return array!",
			customfcheck : "Custom function should be present in case of custom checking!"
			
		}
	},
	view : {
		caption: "View Record",
		bClose: "Close"
	},
	del : {
		caption: "Delete",
		msg: "Delete selected record(s)?",
		bSubmit: "Delete",
		bCancel: "Cancel"
	},
	nav : {
		edittext: "",
		edittitle: "Edit selected row",
		addtext:"",
		addtitle: "Add new row",
		deltext: "",
		deltitle: "Delete selected row",
		searchtext: "",
		searchtitle: "Find records",
		refreshtext: "",
		refreshtitle: "Reload Grid",
		alertcap: "Warning",
		alerttext: "Please, select row",
		viewtext: "",
		viewtitle: "View selected row"
	},
	col : {
		caption: "Select columns",
		bSubmit: "Ok",
		bCancel: "Cancel"
	},
	errors : {
		errcap : "Error",
		nourl : "No url is set",
		norecords: "No records to process",
		model : "Length of colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: ",", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat",
				"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
				"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th';},
			srcformat: 'Y-m-d',
			newformat: 'n/j/Y',
			masks : {
				// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
				// and see http://docs.jquery.com/UI/Datepicker/formatDate
				// and https://github.com/jquery/globalize#dates for alternative formats used frequently
				// one can find on https://github.com/jquery/globalize/tree/master/lib/cultures many
				// information about date, time, numbers and currency formats used in different countries
				// one should just convert the information in PHP format
				// short date:
				//    n - Numeric representation of a month, without leading zeros
				//    j - Day of the month without leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				// example: 3/1/2012 which means 1 March 2012
				ShortDate: "n/j/Y", // in jQuery UI Datepicker: "M/d/yyyy"
				// long date:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				LongDate: "l, F d, Y", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy"
				// long date with long time:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				FullDateTime: "l, F d, Y g:i:s A", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy h:mm:ss tt"
				// month day:
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				MonthDay: "F d", // in jQuery UI Datepicker: "MMMM dd"
				// short time (without seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				ShortTime: "g:i A", // in jQuery UI Datepicker: "h:mm tt"
				// long time (with seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				LongTime: "g:i:s A", // in jQuery UI Datepicker: "h:mm:ss tt"
				// month with year
				//    Y - A full numeric representation of a year, 4 digits
				//    F - A full textual representation of a month
				YearMonth: "F, Y" // in jQuery UI Datepicker: "MMMM, yyyy"
			}
		}
	}
};

$.jgrid = $.jgrid || {};
$.extend(true,$.jgrid,{
	version : "4.7.0-post",
	cmTemplate : {
        integer: {
            formatter: "integer", align: "right", sorttype: "integer",
			searchoptions: { sopt: ["eq", "ne", "lt", "le", "gt", "ge"] }
        },
        number: {
            formatter: "number", align: "right", sorttype: "number",
			searchoptions: { sopt: ["eq", "ne", "lt", "le", "gt", "ge"] }
        },
		actions: {
			formatter: "actions", width: 53, align: "center", autoResizable: false,
			fixed: true, resizable: false, sortable: false, search: false, editable: false, viewable: false
		}
    },
	formatter : { // set common formatter settings independent from the language and locale
		date: {
			parseRe: /[#%\\\/:_;.,\t\s-]/,
			masks: {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO"
			},
			reformatAfterEdit : false,
			userLocalTime : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox: {disabled:true},
		idName: 'id',
		unused: '' // used only to detect whether the changes are overwritten because of wrong usage
	},
	htmlDecode : function(value){
		if(value && (value==='&nbsp;' || value==='&#160;' || (value.length===1 && value.charCodeAt(0)===160))) { return "";}
		return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");		
	},
	htmlEncode : function (value){
		return !value ? value : String(value).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	},
	clearArray : function (ar) {
		// see http://jsperf.com/empty-javascript-array
		while (ar.length > 0) {
			ar.pop();
		}
	},
	format : function(format){ //jqgformat
		var args = $.makeArray(arguments).slice(1);
		if(format==null) { format = ""; }
		return format.replace(/\{(\d+)\}/g, function(m, i){
			return args[i];
		});
	},
	msie : navigator.appName === 'Microsoft Internet Explorer',
	msiever : function () {
		var rv = -1;
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null) {
			rv = parseFloat( RegExp.$1 );
		}
		return rv;
	},
	getCellIndex : function (cell) {
		var c = $(cell);
		if (c.is('tr')) { return -1; }
		c = (!c.is('td') && !c.is('th') ? c.closest("td,th") : c)[0];
		if ($.jgrid.msie) { return $.inArray(c, c.parentNode.cells); }
		return c.cellIndex;
	},
	stripHtml : function(v) {
		v = String(v);
		var regexp = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
		if (v) {
			v = v.replace(regexp,"");
			return (v && v !== '&nbsp;' && v !== '&#160;') ? v.replace(/\"/g,"'") : "";
		} 
			return v;
	},
	stripPref : function (pref, id) {
		var obj = $.type( pref );
		if( obj === "string" || obj === "number") {
			pref =  String(pref);
			id = pref !== "" ? String(id).replace(String(pref), "") : id;
		}
		return id;
	},
	parse : function(jsonString) {
		var js = jsonString;
		if (js.substr(0,9) === "while(1);") { js = js.substr(9); }
		if (js.substr(0,2) === "/*") { js = js.substr(2,js.length-4); }
		if(!js) { js = "{}"; }
		return ($.jgrid.useJSON===true && typeof JSON === 'object' && typeof JSON.parse === 'function') ?
			JSON.parse(js) :
			eval('(' + js + ')');
	},
	parseDate : function(format, date, newformat, opts) {
		var	token = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		msDateRegExp = new RegExp("^\/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)\/$"),
		msMatch = ((typeof date === 'string') ? date.match(msDateRegExp): null),
		pad = function (value, length) {
			value = String(value);
			length = parseInt(length,10) || 2;
			while (value.length < length)  { value = '0' + value; }
			return value;
		},
		ts = {m : 1, d : 1, y : 1970, h : 0, i : 0, s : 0, u:0},
		timestamp=0, dM, k,hl,
		h12to24 = function(ampm, h){
			if (ampm === 0){ if (h === 12) { h = 0;} }
			else { if (h !== 12) { h += 12; } }
			return h;
		},
		offset =0;
		if(opts === undefined) {
			opts = $.jgrid.formatter.date;
		}
		// old lang files
		if(opts.parseRe === undefined ) {
			opts.parseRe = /[#%\\\/:_;.,\t\s-]/;
		}
		if( opts.masks.hasOwnProperty(format) ) { format = opts.masks[format]; }
		if(date && date != null) {
			if( !isNaN( date - 0 ) && String(format).toLowerCase() === "u") {
				//Unix timestamp
				timestamp = new Date( parseFloat(date)*1000 );
			} else if(date.constructor === Date) {
				timestamp = date;
				// Microsoft date format support
			} else if( msMatch !== null ) {
				timestamp = new Date(parseInt(msMatch[1], 10));
				if (msMatch[3]) {
					offset = Number(msMatch[5]) * 60 + Number(msMatch[6]);
					offset *= ((msMatch[4] === '-') ? 1 : -1);
					offset -= timestamp.getTimezoneOffset();
					timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
				}
			} else {
				//Support ISO8601Long that have Z at the end to indicate UTC timezone
				if(opts.srcformat === 'ISO8601Long' && date.charAt(date.length - 1) === 'Z') {
					offset -= (new Date()).getTimezoneOffset();
				}
				date = String(date).replace(/\T/g,"#").replace(/\t/,"%").split(opts.parseRe);
				format = format.replace(/\T/g,"#").replace(/\t/,"%").split(opts.parseRe);
				// parsing for month names
				for(k=0,hl=format.length;k<hl;k++){
					if(format[k] === 'M') {
						dM = $.inArray(date[k],opts.monthNames);
						if(dM !== -1 && dM < 12){date[k] = dM+1; ts.m = date[k];}
					}
					if(format[k] === 'F') {
						dM = $.inArray(date[k],opts.monthNames,12);
						if(dM !== -1 && dM > 11){date[k] = dM+1-12; ts.m = date[k];}
					}
					if(format[k] === 'a') {
						dM = $.inArray(date[k],opts.AmPm);
						if(dM !== -1 && dM < 2 && date[k] === opts.AmPm[dM]){
							date[k] = dM;
							ts.h = h12to24(date[k], ts.h);
						}
					}
					if(format[k] === 'A') {
						dM = $.inArray(date[k],opts.AmPm);
						if(dM !== -1 && dM > 1 && date[k] === opts.AmPm[dM]){
							date[k] = dM-2;
							ts.h = h12to24(date[k], ts.h);
						}
					}
					if (format[k] === 'g') {
						ts.h = parseInt(date[k], 10);
					}
					if(date[k] !== undefined) {
						ts[format[k].toLowerCase()] = parseInt(date[k],10);
					}
				}
				if(ts.f) {ts.m = ts.f;}
				if( ts.m === 0 && ts.y === 0 && ts.d === 0) {
					return "&#160;" ;
				}
				ts.m = parseInt(ts.m,10)-1;
				var ty = ts.y;
				if (ty >= 70 && ty <= 99) {ts.y = 1900+ts.y;}
				else if (ty >=0 && ty <=69) {ts.y= 2000+ts.y;}
				timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, ts.u);
				//Apply offset to show date as local time.
				if(offset > 0) {
					timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
				}
			}
		} else {
			timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, ts.u);
		}
		if(opts.userLocalTime && offset === 0) {
			offset -= (new Date()).getTimezoneOffset();
			if( offset > 0 ) {
				timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
			}
		}
		if( newformat === undefined ) {
			return timestamp;
		}
		if( opts.masks.hasOwnProperty(newformat) )  {
			newformat = opts.masks[newformat];
		} else if ( !newformat ) {
			newformat = 'Y-m-d';
		}
		var 
			G = timestamp.getHours(),
			i = timestamp.getMinutes(),
			j = timestamp.getDate(),
			n = timestamp.getMonth() + 1,
			o = timestamp.getTimezoneOffset(),
			s = timestamp.getSeconds(),
			u = timestamp.getMilliseconds(),
			w = timestamp.getDay(),
			Y = timestamp.getFullYear(),
			N = (w + 6) % 7 + 1,
			z = (new Date(Y, n - 1, j) - new Date(Y, 0, 1)) / 86400000,
			flags = {
				// Day
				d: pad(j),
				D: opts.dayNames[w],
				j: j,
				l: opts.dayNames[w + 7],
				N: N,
				S: opts.S(j),
				//j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th',
				w: w,
				z: z,
				// Week
				W: N < 5 ? Math.floor((z + N - 1) / 7) + 1 : Math.floor((z + N - 1) / 7) || ((new Date(Y - 1, 0, 1).getDay() + 6) % 7 < 4 ? 53 : 52),
				// Month
				F: opts.monthNames[n - 1 + 12],
				m: pad(n),
				M: opts.monthNames[n - 1],
				n: n,
				t: '?',
				// Year
				L: '?',
				o: '?',
				Y: Y,
				y: String(Y).substring(2),
				// Time
				a: G < 12 ? opts.AmPm[0] : opts.AmPm[1],
				A: G < 12 ? opts.AmPm[2] : opts.AmPm[3],
				B: '?',
				g: G % 12 || 12,
				G: G,
				h: pad(G % 12 || 12),
				H: pad(G),
				i: pad(i),
				s: pad(s),
				u: u,
				// Timezone
				e: '?',
				I: '?',
				O: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				P: '?',
				T: (String(timestamp).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				Z: '?',
				// Full Date/Time
				c: '?',
				r: '?',
				U: Math.floor(timestamp / 1000)
			};
		return newformat.replace(token, function ($0) {
			return flags.hasOwnProperty($0) ? flags[$0] : $0.substring(1);
		});
	},
	jqID : function(sid){
		return String(sid).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g,"\\$&");
	},
	getGridComponentId: function (componentName) {
		var self = this, id;
		if (self == null || self.p == null || !self.p.id) {
			return ""; // return empty string
		}
		id = self.p.id;
		switch (componentName) {
			case "grid":
				return id;
			case "gBox":
				return "gbox_" + id;
			case "gView":
				return "gview_" + id;
			case "alertMod": // footer/summary table
				return "alertmod_" + id;
			case "columnResizer":
				return "rs_m" + id;
			case "selectAlCheckbox":
				return "cb_" + id;
			case "searchOperationMenu":
				return "sopt_menu";
			default:
				return ""; // return empty string
		}
	},
	getGridComponentIdSelector: function (componentName) {
		var jgrid = $.jgrid, id = jgrid.getGridComponentId.call(this, componentName);
		return id ? "#" + jgrid.jqID(id) : "";
	},
	getGridComponent: function (componentName, $p, p1) {
		if (!($p instanceof jQuery) || $p.length == 0) {
			return $(); // return empty jQuery object
		}
		var p = $p[0];
		switch (componentName) {
			case "bTable": // get body table from bDiv
				return $p.hasClass("ui-jqgrid-bdiv") ? $p.find(">div>.ui-jqgrid-btable") : $();
			case "hTable": // header table from bHiv
				return $p.hasClass("ui-jqgrid-hdiv") ? $p.find(">div>.ui-jqgrid-htable") : $();
			case "fTable": // footer/summary table from sDiv
				return $p.hasClass("ui-jqgrid-sdiv") ? $p.find(">div>.ui-jqgrid-ftable") : $();
			case "bDiv":
				return $p.hasClass("ui-jqgrid-bdiv") && p.grid != null ? $(p.grid.bDiv) : $();
			case "hDiv":
				return $p.hasClass("ui-jqgrid-bdiv") && p.grid != null ? $(p.grid.hDiv) : $();
			case "sDiv":
				return $p.hasClass("ui-jqgrid-bdiv") && p.grid != null ? $(p.grid.sDiv) : $();
			case "colHeader": // p should be iCol
				return !isNaN(p1) && p.grid != null && p.grid.headers != null && p.grid.headers[p1] != null ? $(p.grid.headers[p1].el) : $();
			default:
				return $(); // return empty jQuery object
		}
	},
	guid : 1,
	uidPref: 'jqg',
	randId : function( prefix )	{
		return (prefix || $.jgrid.uidPref) + ($.jgrid.guid++);
	},
	getAccessor : function(obj, expr) {
		var ret,p,prm = [], i;
		if( typeof expr === 'function') { return expr(obj); }
		ret = obj[expr];
		if(ret===undefined) {
			try {
				if ( typeof expr === 'string' ) {
					prm = expr.split('.');
				}
				i = prm.length;
				if( i ) {
					ret = obj;
					while (ret && i--) {
						p = prm.shift();
						ret = ret[p];
					}
				}
			} catch (ignore) {}
		}
		return ret;
	},
	getXmlData: function (obj, expr, returnObj) {
		var ret, m = typeof expr === 'string' ? expr.match(/^(.*)\[(\w+)\]$/) : null;
		if (typeof expr === 'function') { return expr(obj); }
		if (m && m[2]) {
			// m[2] is the attribute selector
			// m[1] is an optional element selector
			// examples: "[id]", "rows[page]"
			return m[1] ? $(m[1], obj).attr(m[2]) : $(obj).attr(m[2]);
		}
			ret = $(expr, obj);
			if (returnObj) { return ret; }
			//$(expr, obj).filter(':last'); // we use ':last' to be more compatible with old version of jqGrid
			return ret.length > 0 ? $(ret).text() : undefined;
	},
	cellWidth : function () {
		var $testDiv = $("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div>"),
		testCell = $testDiv.appendTo("body")
			.find("td")
			.width();
		$testDiv.remove();
		return Math.abs(testCell-5) > 0.1;
	},
	cell_width : true,
	ajaxOptions: {},
	from : function(source){
		// Original Author Hugo Bonacci
		// License MIT http://jlinq.codeplex.com/license
		var QueryObject=function(d,q){
		if(typeof d==="string"){
			d=$.data(d);
		}
		var self=this,
		_data=d,
		_usecase=true,
		_trim=false,
		_query=q,
		_stripNum = /[\$,%]/g,
		_lastCommand=null,
		_lastField=null,
		_orDepth=0,
		_negate=false,
		_queuedOperator="",
		_sorting=[],
		_useProperties=true;
		if(typeof d==="object"&&d.push) {
			if(d.length>0){
				if(typeof d[0]!=="object"){
					_useProperties=false;
				}else{
					_useProperties=true;
				}
			}
		}else{
			throw "data provides is not an array";
		}
		this._hasData=function(){
			return _data===null?false:_data.length===0?false:true;
		};
		this._getStr=function(s){
			var phrase=[];
			if(_trim){
				phrase.push("jQuery.trim(");
			}
			phrase.push("String("+s+")");
			if(_trim){
				phrase.push(")");
			}
			if(!_usecase){
				phrase.push(".toLowerCase()");
			}
			return phrase.join("");
		};
		this._strComp=function(val){
			if(typeof val==="string"){
				return".toString()";
			}
			return"";
		};
		this._group=function(f,u){
			return({field:f.toString(),unique:u,items:[]});
		};
		this._toStr=function(phrase){
			if(_trim){
				phrase=$.trim(phrase);
			}
			phrase=phrase.toString().replace(/\\/g,'\\\\').replace(/\"/g,'\\"');
			return _usecase ? phrase : phrase.toLowerCase();
		};
		this._funcLoop=function(func){
			var results=[];
			$.each(_data,function(i,v){
				results.push(func(v));
			});
			return results;
		};
		this._append=function(s){
			var i;
			if(_query===null){
				_query="";
			} else {
				_query+=_queuedOperator === "" ? " && " :_queuedOperator;
			}
			for (i=0;i<_orDepth;i++){
				_query+="(";
			}
			if(_negate){
				_query+="!";
			}
			_query+="("+s+")";
			_negate=false;
			_queuedOperator="";
			_orDepth=0;
		};
		this._setCommand=function(f,c){
			_lastCommand=f;
			_lastField=c;
		};
		this._resetNegate=function(){
			_negate=false;
		};
		this._repeatCommand=function(f,v){
			if(_lastCommand===null){
				return self;
			}
			if(f!==null&&v!==null){
				return _lastCommand(f,v);
			}
			if(_lastField===null){
				return _lastCommand(f);
			}
			if(!_useProperties){
				return _lastCommand(f);
			}
			return _lastCommand(_lastField,f);
		};
		this._equals=function(a,b){
			return(self._compare(a,b,1)===0);
		};
		this._compare=function(a,b,d){
			var toString = Object.prototype.toString;
			if( d === undefined) { d = 1; }
			if(a===undefined) { a = null; }
			if(b===undefined) { b = null; }
			if(a===null && b===null){
				return 0;
			}
			if(a===null&&b!==null){
				return 1;
			}
			if(a!==null&&b===null){
				return -1;
			}
			if (toString.call(a) === '[object Date]' && toString.call(b) === '[object Date]') {
				if (a < b) { return -d; }
				if (a > b) { return d; }
				return 0;
			}
			if(!_usecase && typeof a !== "number" && typeof b !== "number" ) {
				a=String(a);
				b=String(b);
			}
			if(a<b){return -d;}
			if(a>b){return d;}
			return 0;
		};
		this._performSort=function(){
			if(_sorting.length===0){return;}
			_data=self._doSort(_data,0);
		};
		this._doSort=function(d,q){
			var by=_sorting[q].by,
			dir=_sorting[q].dir,
			type = _sorting[q].type,
			dfmt = _sorting[q].datefmt,
			sfunc = _sorting[q].sfunc;
			if(q===_sorting.length-1){
				return self._getOrder(d, by, dir, type, dfmt, sfunc);
			}
			q++;
			var values=self._getGroup(d,by,dir,type,dfmt), results=[], i, j, sorted;
			for(i=0;i<values.length;i++){
				sorted=self._doSort(values[i].items,q);
				for(j=0;j<sorted.length;j++){
					results.push(sorted[j]);
				}
			}
			return results;
		};
		this._getOrder=function(data,by,dir,type, dfmt, sfunc){
			var sortData=[],_sortData=[], newDir = dir==="a" ? 1 : -1, i,ab,j,
			findSortKey;

			if(type === undefined ) { type = "text"; }
			if (type === 'float' || type=== 'number' || type=== 'currency' || type=== 'numeric') {
				findSortKey = function($cell) {
					var key = parseFloat( String($cell).replace(_stripNum, ''));
					return isNaN(key) ? Number.NEGATIVE_INFINITY : key;
				};
			} else if (type==='int' || type==='integer') {
				findSortKey = function($cell) {
					return $cell ? parseFloat(String($cell).replace(_stripNum, '')) : Number.NEGATIVE_INFINITY;
				};
			} else if(type === 'date' || type === 'datetime') {
				findSortKey = function($cell) {
					return $.jgrid.parseDate(dfmt,$cell).getTime();
				};
			} else if($.isFunction(type)) {
				findSortKey = type;
			} else {
				findSortKey = function($cell) {
					$cell = $cell ? $.trim(String($cell)) : "";
					return _usecase ? $cell : $cell.toLowerCase();
				};
			}
			$.each(data,function(i,v){
				ab = by!=="" ? $.jgrid.getAccessor(v,by) : v;
				if(ab === undefined) { ab = ""; }
				ab = findSortKey(ab, v);
				_sortData.push({ 'vSort': ab,'index':i});
			});
			if($.isFunction(sfunc)) {
				_sortData.sort(function(a,b){
					a = a.vSort;
					b = b.vSort;
					return sfunc.call(this,a,b,newDir);
				});
			} else {
				_sortData.sort(function(a,b){
					a = a.vSort;
					b = b.vSort;
					return self._compare(a,b,newDir);
				});
			}
			j=0;
			var nrec= data.length;
			// overhead, but we do not change the original data.
			while(j<nrec) {
				i = _sortData[j].index;
				sortData.push(data[i]);
				j++;
			}
			return sortData;
		};
		this._getGroup=function(data,by,dir,type, dfmt){
			var results=[],
			group=null,
			last=null;
			$.each(self._getOrder(data,by,dir,type, dfmt),function(i,v){
				var val = $.jgrid.getAccessor(v, by);
				if(val == null) { val = ""; }
				if(!self._equals(last,val)){
					last=val;
					if(group !== null){
						results.push(group);
					}
					group=self._group(by,val);
				}
				group.items.push(v);
			});
			if(group !== null){
				results.push(group);
			}
			return results;
		};
		this.ignoreCase=function(){
			_usecase=false;
			return self;
		};
		this.useCase=function(){
			_usecase=true;
			return self;
		};
		this.trim=function(){
			_trim=true;
			return self;
		};
		this.noTrim=function(){
			_trim=false;
			return self;
		};
		this.execute=function(){
			var match=_query, results=[];
			if(match === null){
				return self;
			}
			$.each(_data,function(){
				if(eval(match)){results.push(this);}
			});
			_data=results;
			return self;
		};
		this.data=function(){
			return _data;
		};
		this.select=function(f){
			self._performSort();
			if(!self._hasData()){ return[]; }
			self.execute();
			if($.isFunction(f)){
				var results=[];
				$.each(_data,function(i,v){
					results.push(f(v));
				});
				return results;
			}
			return _data;
		};
		this.hasMatch=function(){
			if(!self._hasData()) { return false; }
			self.execute();
			return _data.length>0;
		};
		this.andNot=function(f,v,x){
			_negate=!_negate;
			return self.and(f,v,x);
		};
		this.orNot=function(f,v,x){
			_negate=!_negate;
			return self.or(f,v,x);
		};
		this.not=function(f,v,x){
			return self.andNot(f,v,x);
		};
		this.and=function(f,v,x){
			_queuedOperator=" && ";
			if(f===undefined){
				return self;
			}
			return self._repeatCommand(f,v,x);
		};
		this.or=function(f,v,x){
			_queuedOperator=" || ";
			if(f===undefined) { return self; }
			return self._repeatCommand(f,v,x);
		};
		this.orBegin=function(){
			_orDepth++;
			return self;
		};
		this.orEnd=function(){
			if (_query !== null){
				_query+=")";
			}
			return self;
		};
		this.isNot=function(f){
			_negate=!_negate;
			return self.is(f);
		};
		this.is=function(f){
			self._append('this.'+f);
			self._resetNegate();
			return self;
		};
		this._compareValues=function(func,f,v,how,t){
			var fld;
			if(_useProperties){
				fld='jQuery.jgrid.getAccessor(this,\''+f+'\')';
			}else{
				fld='this';
			}
			if(v===undefined) { v = null; }
			//var val=v===null?f:v,
			var val =v,
			swst = t.stype === undefined ? "text" : t.stype;
			if(v !== null) {
			switch(swst) {
				case 'int':
				case 'integer':
					val = (isNaN(Number(val)) || val==="") ? '0' : val; // To be fixed with more inteligent code
					fld = 'parseInt('+fld+',10)';
					val = 'parseInt('+val+',10)';
					break;
				case 'float':
				case 'number':
				case 'numeric':
					val = String(val).replace(_stripNum, '');
					val = (isNaN(Number(val)) || val==="") ? '0' : val; // To be fixed with more inteligent code
					fld = 'parseFloat('+fld+')';
					val = 'parseFloat('+val+')';
					break;
				case 'date':
				case 'datetime':
					val = String($.jgrid.parseDate(t.newfmt || 'Y-m-d',val).getTime());
					fld = 'jQuery.jgrid.parseDate("'+t.srcfmt+'",'+fld+').getTime()';
					break;
				default :
					fld=self._getStr(fld);
					val=self._getStr('"'+self._toStr(val)+'"');
			}
			}
			self._append(fld+' '+how+' '+val);
			self._setCommand(func,f);
			self._resetNegate();
			return self;
		};
		this.equals=function(f,v,t){
			return self._compareValues(self.equals,f,v,"==",t);
		};
		this.notEquals=function(f,v,t){
			return self._compareValues(self.equals,f,v,"!==",t);
		};
		this.isNull = function(f,v,t){
			return self._compareValues(self.equals,f,null,"===",t);
		};
		this.greater=function(f,v,t){
			return self._compareValues(self.greater,f,v,">",t);
		};
		this.less=function(f,v,t){
			return self._compareValues(self.less,f,v,"<",t);
		};
		this.greaterOrEquals=function(f,v,t){
			return self._compareValues(self.greaterOrEquals,f,v,">=",t);
		};
		this.lessOrEquals=function(f,v,t){
			return self._compareValues(self.lessOrEquals,f,v,"<=",t);
		};
		this.startsWith=function(f,v){
			var val = (v==null) ? f: v,
			length=_trim ? $.trim(val.toString()).length : val.toString().length;
			if(_useProperties){
				self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.substr(0,'+length+') == '+self._getStr('"'+self._toStr(v)+'"'));
			}else{
				if (v!=null) { length=_trim?$.trim(v.toString()).length:v.toString().length; }
				self._append(self._getStr('this')+'.substr(0,'+length+') == '+self._getStr('"'+self._toStr(f)+'"'));
			}
			self._setCommand(self.startsWith,f);
			self._resetNegate();
			return self;
		};
		this.endsWith=function(f,v){
			var val = (v==null) ? f: v,
			length=_trim ? $.trim(val.toString()).length:val.toString().length;
			if(_useProperties){
				self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.substr('+self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.length-'+length+','+length+') == "'+self._toStr(v)+'"');
			} else {
				self._append(self._getStr('this')+'.substr('+self._getStr('this')+'.length-"'+self._toStr(f)+'".length,"'+self._toStr(f)+'".length) == "'+self._toStr(f)+'"');
			}
			self._setCommand(self.endsWith,f);self._resetNegate();
			return self;
		};
		this.contains=function(f,v){
			if(_useProperties){
				self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.indexOf("'+self._toStr(v)+'",0) > -1');
			}else{
				self._append(self._getStr('this')+'.indexOf("'+self._toStr(f)+'",0) > -1');
			}
			self._setCommand(self.contains,f);
			self._resetNegate();
			return self;
		};
		this.groupBy=function(by,dir,type, datefmt){
			if(!self._hasData()){
				return null;
			}
			return self._getGroup(_data,by,dir,type, datefmt);
		};
		this.orderBy=function(by,dir,stype, dfmt, sfunc){
			dir = dir == null ? "a" :$.trim(dir.toString().toLowerCase());
			if(stype == null) { stype = "text"; }
			if(dfmt == null) { dfmt = "Y-m-d"; }
			if(sfunc == null) { sfunc = false; }
			if(dir==="desc"||dir==="descending"){dir="d";}
			if(dir==="asc"||dir==="ascending"){dir="a";}
			_sorting.push({by:by,dir:dir,type:stype, datefmt: dfmt, sfunc: sfunc});
			return self;
		};
		return self;
		};
	return new QueryObject(source,null);
	},
	feedback: function (callbackName) {
		var self = this;
		if (self instanceof jQuery && self.length > 0) {
			self = self[0];
		}
		if (self.p == null || typeof callbackName !== "string" || callbackName.length < 2) {
			return null; // incorrect call
		}
		// onSortCol -> jqGridSortCol, onSelectAll -> jqGridSelectAll, ondblClickRow -> jqGridDblClickRow
		// resizeStop -> jqGridResizeStop
		var eventName = callbackName.substring(0, 1) === "on"?
				"jqGrid" + callbackName.charAt(2).toUpperCase() + callbackName.substring(3):
				"jqGrid" + callbackName.charAt(0).toUpperCase() + callbackName.substring(1),
			args = $.makeArray(arguments).slice(1),
			callback = self.p[callbackName];

		var result = $(self).triggerHandler(eventName, args);
		result = (result === false || result === "stop") ? false : true;

		if ($.isFunction(callback)) {
			var callbackResult = callback.apply(self, args);
			if (callbackResult === false || callbackResult === 'stop') {
				result = false;
			 }
		}
		return result;
	},
	getMethod: function (name) {
        return this.getAccessor($.fn.jqGrid, name);
	},
	extend : function(methods) {
		$.extend($.fn.jqGrid,methods);
		if (!this.no_legacy_api) {
			$.fn.extend(methods);
		}
	}
});

$.fn.jqGrid = function( pin ) {
	if (typeof pin === 'string') {
		var fn = $.jgrid.getMethod(pin);
		if (!fn) {
			throw ("jqGrid - No such method: " + pin);
		}
		var args = $.makeArray(arguments).slice(1);
		return fn.apply(this,args);
	}
	return this.each( function() {
		if(this.grid) {return;}
		var ts = this, localData, jgrid = $.jgrid, clearArray = jgrid.clearArray, feedback = jgrid.feedback,
		getGridComponentIdSelector = jgrid.getGridComponentIdSelector, getGridComponentId = jgrid.getGridComponentId,
		getGridComponent = jgrid.getGridComponent,
		jqID = jgrid.jqID, getAccessor = jgrid.getAccessor,	stripPref = jgrid.stripPref, getCellIndex = jgrid.getCellIndex,
		fatalErrorFunction = jgrid.defaults != null && $.isFunction(jgrid.defaults.fatalError) ? jgrid.defaults.fatalError : alert;
		if (pin != null && pin.data !== undefined) {
			localData = pin.data;
			pin.data = []; // don't clear the array, just change the value of data property
		}
		if (jgrid.defaults == null) {
			//fatalErrorFunction("FATAL ERROR!!!\n\nthe locale file \"grid.locale-en.js\" or other are not included. It should be included before jquery.jqGrid.min.js\n");
			//return;
			
			// set English options only if no grid.locale-XX.js file are included.
			$.extend(true, $.jgrid, englishLanguageDefaults);
		}
		if (jgrid.formatter == null || jgrid.formatter.unused == null) {
			// detect old locale file grid.locale-XX.js are included (without DEEP extend).
			fatalErrorFunction("CRITICAL ERROR!!!\n\n\nOne uses probably\n\n	$.extend($.jgrid.defaults, {...});\n\nto set default settings of jqGrid instead of the usage the DEEP version of jQuery.extend (with true as the first parameter):\n\n	$.extend(true, $.jgrid.defaults, {...});\n\nOne other possible reason:\n\nyou included some OLD version of language file (grid.locale-en.js for example) AFTER jquery.jqGrid.min.js. For example all language files of jqGrid 4.7.0 uses non-deep call of jQuery.extend.\n\n\nSome options of jqGrid could still work, but another one will be broken.");
		}
		if (pin != null) {
			if (pin.datatype === undefined && pin.dataType !== undefined) {
				// fix the bug in the usage of dataType instead of datatype
				pin.datatype = pin.dataType;
				delete pin.dataType;
			}
			if (pin.mtype === undefined && pin.type !== undefined) {
				// fix the bug in the usage of type instead of mtype
				pin.mtype = pin.type;
				delete pin.type;
			}
		}

		var p = $.extend(true,{
			url: "",
			height: "auto",
			page: 1,
			rowNum: 20,
			maxRowNum: 10000,
			autoresizeOnLoad: false,
			autoResizing: {
				wrapperClassName: "ui-jqgrid-cell-wrapper",
				widthOfVisiblePartOfSortIcon: 12,
				minColWidth: 33,
				maxColWidth: 300,
				adjustGridWidth: true, // shrinkToFit and widthOrg (no width option or width:"auto" during jqGrid creation will be detected) will be used additionally with adjustGridWidth
				compact: false,
				fixWidthOnShrink: false
			},
			doubleClickSensitivity: 250,
			rowTotal : null,
			records: 0,
			pager: "",
			pgbuttons: true,
			pginput: true,
			colModel: [],
			rowList: [],
			colNames: [],
			sortorder: "asc",
			sortname: "",
			//datatype: "xml",
			mtype: "GET",
			altRows: false,
			selarrrow: [],
			savedRow: [],
			shrinkToFit: true,
			xmlReader: {},
			jsonReader: {},
			subGrid: false,
			subGridModel :[],
			reccount: 0,
			lastpage: 0,
			lastsort: 0,
			selrow: null,
			beforeSelectRow: null,
			onSelectRow: null,
			onSortCol: null,
			ondblClickRow: null,
			onRightClickRow: null,
			onPaging: null,
			onSelectAll: null,
			onInitGrid : null,
			loadComplete: null,
			gridComplete: null,
			loadError: null,
			loadBeforeSend: null,
			afterInsertRow: null,
			beforeRequest: null,
			beforeProcessing : null,
			onHeaderClick: null,
			viewrecords: false,
			loadonce: false,
			multiselect: false,
			multikey: false,
			editurl: "clientArray",
			search: false,
			caption: "",
			hidegrid: true,
			hiddengrid: false,
			postData: {},
			userData: {},
			treeGrid : false,
			treeGridModel : 'nested',
			treeReader : {},
			treeANode : -1,
			ExpandColumn: null,
			tree_root_level : 0,
			prmNames: {page:"page",rows:"rows", sort: "sidx",order: "sord", search:"_search", nd:"nd", id:"id",oper:"oper",editoper:"edit",addoper:"add",deloper:"del", subgridid:"id", npage: null, totalrows:"totalrows"},
			forceFit : false,
			gridstate : "visible",
			cellEdit: false,
			cellsubmit: "clientArray",
			nv:0,
			loadui: "enable",
			toolbar: [false,""],
			scroll: false,
			multiboxonly : false,
			deselectAfterSort : true,
			scrollrows : false,
			autowidth: false,
			scrollOffset :18,
			cellLayout: 5,
			subGridWidth: 20,
			multiselectWidth: 20,
			gridview: true,
			rownumWidth: 25,
			rownumbers : false,
			pagerpos: 'center',
			recordpos: 'right',
			footerrow : false,
			userDataOnFooter : false,
			hoverrows : true,
			altclass : 'ui-priority-secondary',
			viewsortcols : [false,'vertical',true],
			resizeclass : '',
			autoencode : true,
			remapColumns : [],
			ajaxGridOptions :{},
			direction : "ltr",
			toppager: false,
			headertitles: false,
			scrollTimeout: 40,
			data : [],
			lastSelectedData : [],
			_index : {},
			grouping : false,
			groupingView : {groupField:[],groupOrder:[], groupText:[],groupColumnShow:[],groupSummary:[], showSummaryOnHide: false, sortitems:[], sortnames:[], summary:[],summaryval:[], plusicon: 'ui-icon-circlesmall-plus', minusicon: 'ui-icon-circlesmall-minus', displayField: [], groupSummaryPos:[], formatDisplayField : [], _locgr : false},
			ignoreCase : false,
			cmTemplate : {},
			idPrefix : "",
			multiSort :  false
		},
		// if no datatype is specified, but data option exist then use datatype: "local" else "xml"
		pin == null || pin.datatype !== undefined ? {} : // if datatype is specified explicitly
			localData !== undefined || pin.url == null ? { datatype: "local" } : // no url is specified or data is explicitly specified
			pin.jsonReader != null && typeof pin.jsonReader === "object" ? { datatype: "json" } : { datatype: "xml" },
		jgrid.defaults, pin || {});
		if (localData !== undefined) {
			p.data = localData;
			pin.data = localData;
		}
		if(ts.tagName.toUpperCase() !== 'TABLE') {
			fatalErrorFunction("Element is not a table!");
			return;
		}
		if (ts.id == "") {
			$(ts).attr("id", jgrid.randId());
		}
		if(document.documentMode !== undefined ) { // IE only
			if(document.documentMode <= 5) {
				fatalErrorFunction("Grid can not be used in this ('quirks') mode!");
				return;
			}
		}
		$(ts).empty().attr("tabindex","0");
		ts.p = p;
		p.id = ts.id;
		p.idSel = "#" + jgrid.jqID(ts.id);
		p.gBoxId = getGridComponentId.call(ts, "gBox");   // gbox id like "gbox_list" or "gbox_my.list"
		p.gBox = getGridComponentIdSelector.call(ts, "gBox");   // gbox selector like "#gbox_list" or "#gbox_my\\.list"
		p.gViewId = getGridComponentId.call(ts, "gView"); // gview id like "gview_list" or "gview_my.list"
		p.gView = getGridComponentIdSelector.call(ts, "gView"); // gview selector like "#gview_list" or "#gview_my\\.list"
		p.rsId = getGridComponentId.call(ts, "columnResizer"); // vertical div inside of gbox which will be seen on resizing of columns
		p.rs = getGridComponentIdSelector.call(ts, "columnResizer"); // vertical div inside of gbox which will be seen on resizing of columns
		p.cbId = getGridComponentId.call(ts, "selectAlCheckbox"); // "cb_" +id
		p.cb = getGridComponentIdSelector.call(ts, "selectAlCheckbox"); // "cb_" +id
		p.useProp = !!$.fn.prop;
		p.propOrAttr = p.useProp ? 'prop' : 'attr';

		var propOrAttr = p.propOrAttr,
		myResizerClickHandler = function (e) {
			var pageX = $(this).data("pageX");
			if (pageX) {
				pageX = String(pageX).split(";");
				pageX = pageX[pageX.length - 1];
				$(this).data("pageX", pageX + ";" + e.pageX);
			} else {
				$(this).data("pageX", e.pageX);
			}
		},
		grid = {
			headers:[],
			cols:[],
			footers: [],
			dragStart: function(i,x,y) {
				var self = this, $bDiv = $(self.bDiv), gridLeftPos = $bDiv.offset().left;
				self.resizing = { idx: i, startX: x.pageX, sOL : x.pageX - gridLeftPos, moved: false };
				self.hDiv.style.cursor = "col-resize";
				self.curGbox = $(p.rs,p.gBox);
				self.curGbox.css({display:"block",left:x.pageX-gridLeftPos,top:y[1],height:y[2]});
				self.curGbox.data("idx",i);
				myResizerClickHandler.call(this.curGbox, x);
				feedback.call(getGridComponent("bTable", $bDiv), "resizeStart", x, i);
				document.onselectstart=function(){return false;};
			},
			dragMove: function(x) {
				var self = this, resizing = self.resizing;
				if(resizing) {
					var diff = x.pageX-resizing.startX, headers = self.headers,
					h = headers[resizing.idx],
					newWidth = p.direction === "ltr" ? h.width + diff : h.width - diff, hn, nWn;
					resizing.moved = true;
					if(newWidth > 33) {
						if (self.curGbox == null) {
							self.curGbox = $(p.rs,p.gBox);
						}
						self.curGbox.css({left:resizing.sOL+diff});
						if(p.forceFit===true ){
							hn = headers[resizing.idx+p.nv];
							nWn = p.direction === "ltr" ? hn.width - diff : hn.width + diff;
							if(nWn > p.autoResizing.minColWidth ) {
								h.newWidth = newWidth;
								hn.newWidth = nWn;
							}
						} else {
							self.newWidth = p.direction === "ltr" ? p.tblwidth+diff : p.tblwidth-diff;
							h.newWidth = newWidth;
						}
					}
				}
			},
			resizeColumn: function (idx, ts, skipCallbacks) {
				var self = this, headers = self.headers, footers = self.footers, h = headers[idx], hn, nw = h.newWidth || h.width;
				nw = parseInt(nw,10);
				p.colModel[idx].width = nw;
				h.width = nw;
				h.el.style.width = nw + "px";
				self.cols[idx].style.width = nw+"px";
				if(footers.length>0) {footers[idx].style.width = nw+"px";}
				if(p.forceFit===true){
					hn = headers[idx+p.nv]; // next visible th
					nw = hn.newWidth || hn.width;
					hn.width = nw;
					hn.el.style.width = nw + "px";
					self.cols[idx+p.nv].style.width = nw+"px";
					if(footers.length>0) {footers[idx+p.nv].style.width = nw+"px";}
					p.colModel[idx+p.nv].width = nw;
				} else {
					p.tblwidth = self.newWidth || p.tblwidth;
					getGridComponent("bTable", $(self.bDiv)).css("width",p.tblwidth+"px");
					getGridComponent("hTable", $(self.hDiv)).css("width",p.tblwidth+"px");
					self.hDiv.scrollLeft = self.bDiv.scrollLeft;
					if(p.footerrow) {
						getGridComponent("fTable", $(self.sDiv)).css("width",p.tblwidth+"px");
						self.sDiv.scrollLeft = self.bDiv.scrollLeft;
					}
				}
				if (!skipCallbacks) {
					feedback.call(ts, "resizeStop", nw, idx);
				}
			},
			dragEnd: function() {
				var self = this;
				self.hDiv.style.cursor = "default";
				if(self.resizing) {
					if (self.resizing !== null && self.resizing.moved === true) {
						self.resizeColumn(self.resizing.idx, getGridComponent("bTable", $(self.bDiv)));
					}
					$(p.rs).removeData("pageX");
					self.resizing = false;
					setTimeout(function () {
						$(p.rs).css("display","none");
					}, p.doubleClickSensitivity);
				}
				self.curGbox = null;
				document.onselectstart=function(){return true;};
			},
			populateVisible: function() {
				var self = this, $self = $(self), gridSelf = self.grid, bDiv = gridSelf.bDiv, $bDiv = $(bDiv);
				if (gridSelf.timer) { clearTimeout(gridSelf.timer); }
				gridSelf.timer = null;
				var dh = $bDiv.height();
				if (!dh) { return; }
				var firstDataRow, rh;
				if(self.rows.length) {
					try {
						firstDataRow = self.rows[1]; // self.rows[0] is cols row (the first row (.jqgfirstrow)) used only to set column width
						rh = firstDataRow ? $(firstDataRow).outerHeight() || gridSelf.prevRowHeight : gridSelf.prevRowHeight;
					} catch (pv) {
						rh = gridSelf.prevRowHeight;
					}
				}
				if (!rh) { return; }
				gridSelf.prevRowHeight = rh;
				var rn = p.rowNum;
				gridSelf.scrollTop = bDiv.scrollTop;
				var scrollTop = gridSelf.scrollTop;
				var ttop = Math.round($self.position().top) - scrollTop;
				var tbot = ttop + $self.height();
				var div = rh * rn;
				var page, npage, empty;
				if ( tbot < dh && ttop <= 0 &&
					(p.lastpage===undefined||(parseInt((tbot + scrollTop + div - 1) / div,10) || 0) <= p.lastpage))
				{
					npage = parseInt((dh - tbot + div - 1) / div,10) || 1;
					if (tbot >= 0 || npage < 2 || p.scroll === true) {
						page = ( Math.round((tbot + scrollTop) / div) || 0) + 1;
						ttop = -1;
					} else {
						ttop = 1;
					}
				}
				if (ttop > 0) {
					page = ( parseInt(scrollTop / div,10) || 0 ) + 1;
					npage = (parseInt((scrollTop + dh) / div,10) || 0) + 2 - page;
					empty = true;
				}
				if (npage) {
					if (p.lastpage && (page > p.lastpage || p.lastpage===1 || (page === p.page && page===p.lastpage)) ) {
						return;
					}
					if (gridSelf.hDiv.loading) {
						gridSelf.timer = setTimeout(function () {gridSelf.populateVisible.call(self);}, p.scrollTimeout);
					} else {
						p.page = page;
						if (empty) {
							gridSelf.selectionPreserver.call(table[0]);
							gridSelf.emptyRows.call(table[0], false, false);
						}
						gridSelf.populate.call(self,npage);
					}
				}
			},
			scrollGrid: function(e) { // this maus be bDiv
				// TODO get ts from this bDiv
				var bDiv = this, $bTable = getGridComponent("bTable", $(this)), gridSelf;
				if (e) { e.stopPropagation(); }
				if ($bTable.length == 0) { return true; }
				gridSelf = $bTable[0].grid;
				if (p.scroll) {
					var scrollTop = bDiv.scrollTop;
					// save last scrollTop of bDiv as property of grid object
					if (gridSelf.scrollTop === undefined) { gridSelf.scrollTop = 0; }
					if (scrollTop !== gridSelf.scrollTop) {
						gridSelf.scrollTop = scrollTop;
						if (gridSelf.timer) { clearTimeout(gridSelf.timer); }
						gridSelf.timer = setTimeout(function () {gridSelf.populateVisible.call($bTable[0]);}, p.scrollTimeout);
					}
				}
				gridSelf.hDiv.scrollLeft = bDiv.scrollLeft;
				if(p.footerrow) {
					gridSelf.sDiv.scrollLeft = bDiv.scrollLeft;
				}
			},
			selectionPreserver : function() {
				var self = this, $self = $(self), sr = p.selrow, sra = p.selarrrow ? $.makeArray(p.selarrrow) : null,
				bDiv = self.grid.bDiv, left = bDiv.scrollLeft,
				restoreSelection = function() {
					var i;
					p.selrow = null;
					clearArray(p.selarrrow); // p.selarrrow = [];
					if(p.multiselect && sra && sra.length>0) {
						for(i=0;i<sra.length;i++){
							if (sra[i] !== sr) {
								$self.jqGrid("setSelection",sra[i],false, null);
							}
						}
					}
					if (sr) {
						$self.jqGrid("setSelection",sr,false,null);
					}
					bDiv.scrollLeft = left;
					$self.unbind('.selectionPreserver', restoreSelection);
				};
				$self.bind('jqGridGridComplete.selectionPreserver', restoreSelection);				
			}
		};
		ts.grid = grid;

		var iCol, dir;
		if(p.colNames.length === 0) {
			for (iCol=0;iCol<p.colModel.length;iCol++){
				p.colNames[iCol] = p.colModel[iCol].label || p.colModel[iCol].name;
			}
		}
		if( p.colNames.length !== p.colModel.length ) {
			fatalErrorFunction(jgrid.errors.model);
			return;
		}
		var gv = $("<div class='ui-jqgrid-view' role='grid' aria-multiselectable='" + !!p.multiselect +"'></div>"),
		isMSIE = jgrid.msie,
		isMSIE8 = isMSIE && jgrid.msiever() < 8;
		p.direction = $.trim(p.direction.toLowerCase());
		if($.inArray(p.direction,["ltr","rtl"]) === -1) { p.direction = "ltr"; }
		dir = p.direction;

		$(gv).insertBefore(this);
		$(this).removeClass("scroll").appendTo(gv);
		var eg = $("<div class='ui-jqgrid ui-widget ui-widget-content ui-corner-all'></div>");
		$(eg).attr({"id": p.gBoxId,"dir": dir}).insertBefore(gv);
		$(gv).attr("id", p.gViewId).appendTo(eg);
		$("<div class='ui-widget-overlay jqgrid-overlay' id='lui_"+this.id+"'></div>").insertBefore(gv);
		$("<div class='loading ui-state-default ui-state-active' id='load_"+this.id+"'>"+p.loadtext+"</div>").insertBefore(gv);
		if (isMSIE8) {
			$(this).attr({cellspacing:"0"});
		}
		$(this).attr({"role":"presentation","aria-labelledby":"gbox_"+this.id});
		var sortkeys = ["shiftKey","altKey","ctrlKey"],
		intNum = function(val,defval) {
			val = parseInt(val,10);
			if (isNaN(val)) { return defval || 0;}
			return val;
		},
		formatCol = function (pos, rowInd, tv, rawObject, rowId, rdata){
			var cm = p.colModel[pos], cellAttrFunc,
			ral = cm.align, result="style=\"", clas = cm.classes, nm = cm.name, celp, acp=[];
			if(ral) { result += "text-align:"+ral+";"; }
			if(cm.hidden===true) { result += "display:none;"; }
			if(rowInd===0) {
				result += "width: "+grid.headers[pos].width+"px;";
			} else if ($.isFunction(cm.cellattr) || (typeof cm.cellattr === "string" && jgrid.cellattr != null && $.isFunction(jgrid.cellattr[cm.cellattr]))) {
				cellAttrFunc = $.isFunction(cm.cellattr) ? cm.cellattr : jgrid.cellattr[cm.cellattr];
				celp = cellAttrFunc.call(ts, rowId, tv, rawObject, cm, rdata);
				if(celp && typeof celp === "string") {
					celp = celp.replace(/style/i,'style').replace(/title/i,'title');
					if(celp.indexOf('title') > -1) { cm.title=false;}
					if(celp.indexOf('class') > -1) { clas = undefined;}
					acp = celp.replace(/\-style/g,'-sti').split(/style/);
					if(acp.length === 2 ) {
						acp[1] =  $.trim(acp[1].replace(/\-sti/g,'-style').replace("=",""));
						if(acp[1].indexOf("'") === 0 || acp[1].indexOf('"') === 0) {
							acp[1] = acp[1].substring(1);
						}
						result += acp[1].replace(/'/gi,'"');
					} else {
						result += "\"";
					}
				}
			}
			if(!acp.length) { acp[0] = ""; result += "\"";}
			result += (clas !== undefined ? (" class=\""+clas+"\"") :"") + ((cm.title && tv) ? (" title=\""+jgrid.stripHtml(tv)+"\"") :"");
			result += " aria-describedby=\""+p.id+"_"+nm+"\"";
			return result + acp[0];
		},
		cellVal =  function (val) {
			return val == null || val === "" ? "&#160;" : (p.autoencode ? jgrid.htmlEncode(val) : String(val));
		},
		formatter = function (rowId, cellval, colpos, rwdat, act){
			var cm = p.colModel[colpos],v;
			if(cm.formatter !== undefined) {
				rowId = String(p.idPrefix) !== "" ? stripPref(p.idPrefix, rowId) : rowId;
				var opts= {rowId: rowId, colModel:cm, gid:p.id, pos:colpos };
				if($.isFunction( cm.formatter ) ) {
					v = cm.formatter.call(ts,cellval,opts,rwdat,act);
				} else if($.fmatter){
					v = $.fn.fmatter.call(ts,cm.formatter,cellval,opts,rwdat,act);
				} else {
					v = cellVal(cellval);
				}
			} else {
				v = cellVal(cellval);
			}
			return cm.autoResizable && cm.formatter !== "actions" ? "<span class='" + p.autoResizing.wrapperClassName + "'>" + v + "</span>" : v;
		},
		addCell = function(rowId,cell,pos,irow, srvr, rdata) {
			var v = formatter(rowId,cell,pos,srvr,'add');
			return "<td role=\"gridcell\" "+formatCol( pos,irow, v, srvr, rowId, rdata)+">"+v+"</td>";
		},
		addMulti = function(rowid,pos,irow,checked){
			var	v = "<input role=\"checkbox\" type=\"checkbox\""+" id=\"jqg_"+p.id+"_"+rowid+"\" class=\"cbox\" name=\"jqg_"+p.id+"_"+rowid+"\"" + (checked ? " checked=\"checked\" aria-checked=\"true\"" : " aria-checked=\"false\"")+"/>";
			return "<td role=\"gridcell\" "+
				formatCol(pos,irow,'',null, rowid, true)+">"+v+"</td>";
		},
		addRowNum = function (pos,irow,pG,rN) {
			var v = (parseInt(pG,10)-1)*parseInt(rN,10)+1+irow;
			return "<td role=\"gridcell\" class=\"ui-state-default jqgrid-rownum\" "+
				formatCol(pos,irow,v, null, irow, true)+">"+v+"</td>";
		},
		reader = function (datatype) {
			var field, f=[], j=0, i, colModel = p.colModel, nCol = colModel.length;
			for(i=0; i<nCol; i++){
				field = colModel[i];
				if (field.name !== 'cb' && field.name !=='subgrid' && field.name !=='rn') {
					f[j] = (datatype === "xml" || datatype === "xmlstring") ?
							field.xmlmap || field.name :
							(datatype === "local" && !p.dataTypeOrg ? field.jsonmap || field.name : field.name);
					if(p.keyName !== false && field.key===true ) {
						p.keyName = f[j];
					}
					j++;
				}
			}
			return f;
		},
		orderedCols = function (offset) {
			var order = p.remapColumns;
			if (!order || !order.length) {
				order = $.map(p.colModel, function(v,i) { return i; });
			}
			if (offset) {
				order = $.map(order, function(v) { return v<offset?null:v-offset; });
			}
			return order;
		},
		emptyRows = function (scroll, locdata) {
			var firstrow, self = this, rows = this.rows, bDiv = self.grid.bDiv;
			if (p.deepempty) {
				$(rows).slice(1).remove();
			} else {
				firstrow = rows.length > 0 ? rows[0] : null;
				$(self.firstChild).empty().append(firstrow);
			}
			if (scroll && p.scroll) {
				$(bDiv.firstChild).css({height: "auto"});
				$(bDiv.firstChild.firstChild).css({height: 0, display: "none"});
				if (bDiv.scrollTop !== 0) {
					bDiv.scrollTop = 0;
				}
			}
			if(locdata === true && p.treeGrid) {
				clearArray(p.data); //p.data = [];
				clearArray(p.lastSelectedData); //p.lastSelectedData = [];
				p._index = {};
			}
		},
		normalizeData = function() {
			var data = p.data, dataLength = data.length, i, j, cur, cells, idn, idi, idr, v, rd,
			localReader = p.localReader,
			colModel = p.colModel,
			cellName = localReader.cell,
			iOffset = (p.multiselect === true ? 1 : 0) + (p.subGrid === true ? 1 : 0) + (p.rownumbers === true ? 1 : 0),
			br = p.scroll ? jgrid.randId() : 1,
			arrayReader, objectReader, rowReader;

			if (p.datatype !== "local" || localReader.repeatitems !== true) {
				return; // nothing to do
			}

			arrayReader = orderedCols(iOffset);
			objectReader = reader("local");
			// read ALL input items and convert items to be read by
			// $.jgrid.getAccessor with column name as the second parameter
			idn = p.keyName === false ?
				($.isFunction(localReader.id) ? localReader.id.call(this, data) : localReader.id) :
				p.keyName;
			if (!isNaN(idn)) {
				idi = Number(idn);
			}
			for (i = 0; i < colModel.length; i++) {
				if (colModel[i].name === idn) {
					idi = i;
					break;
				}
			}
			for (i = 0; i < dataLength; i++) {
				cur = data[i];
				cells = cellName ? getAccessor(cur, cellName) || cur : cur;
				rowReader = $.isArray(cells) ? arrayReader : objectReader;
				idr = p.keyName === false ? getAccessor(cur, idn) : getAccessor(cells, rowReader[idi]);
				if (idr === undefined) {
					// it could be that one uses the index of column in localReader.id
					if (!isNaN(idn) && colModel[Number(idn) + iOffset] != null) {
						idr = getAccessor(cells, rowReader[Number(idn)]);
					}
					if (idr === undefined) {
						idr = br + i;
					}
				}
				rd = { };
				rd[localReader.id] = idr;
				for (j = 0; j < rowReader.length; j++) {
					v = getAccessor(cells, rowReader[j]);
					rd[colModel[j + iOffset].name] = v;
				}
				$.extend(true, data[i], rd);
			}
		},
		refreshIndex = function() {
			var datalen = p.data.length, idname, i, val;

			if(p.keyName === false || p.loadonce) {
				idname = p.localReader.id;
			} else {
				idname = p.keyName;
			}
			p._index = {};
			for(i =0;i < datalen; i++) {
				val = getAccessor(p.data[i],idname);
				if (val === undefined) { val=String(i+1); }
				p._index[val] = i;
			}
		},
		constructTr = function(id, hide, altClass, rd, cur, selected) {
			var tabindex = '-1', restAttr = '', attrName, style = hide ? 'display:none;' : '', self = this,
				classes = 'ui-widget-content jqgrow ui-row-' + p.direction + (altClass ? ' ' + altClass : '') + (selected ? ' ui-state-highlight' : ''),
				rowAttrObj = $(self).triggerHandler("jqGridRowAttr", [rd, cur, id]);
			if( typeof rowAttrObj !== "object" ) {
				rowAttrObj = $.isFunction(p.rowattr) ? p.rowattr.call(self, rd, cur, id) :
					(typeof p.rowattr === "string" && jgrid.rowattr != null && $.isFunction(jgrid.rowattr[p.rowattr]) ?
					 jgrid.rowattr[p.rowattr].call(self, rd, cur, id) : {});
			}
			if(rowAttrObj != null && !$.isEmptyObject( rowAttrObj )) {
				if (rowAttrObj.hasOwnProperty("id")) {
					id = rowAttrObj.id;
					delete rowAttrObj.id;
				}
				if (rowAttrObj.hasOwnProperty("tabindex")) {
					tabindex = rowAttrObj.tabindex;
					delete rowAttrObj.tabindex;
				}
				if (rowAttrObj.hasOwnProperty("style")) {
					style += rowAttrObj.style;
					delete rowAttrObj.style;
				}
				if (rowAttrObj.hasOwnProperty("class")) {
					classes += ' ' + rowAttrObj['class'];
					delete rowAttrObj['class'];
				}
				// dot't allow to change role attribute
				try { delete rowAttrObj.role; } catch(ignore){}
				for (attrName in rowAttrObj) {
					if (rowAttrObj.hasOwnProperty(attrName)) {
						restAttr += ' ' + attrName + '=' + rowAttrObj[attrName];
					}
				}
			}
			return '<tr role="row" id="' + id + '" tabindex="' + tabindex + '" class="' + classes + '"' +
				(style === '' ? '' : ' style="' + style + '"') + restAttr + '>';
		},
		addXmlData = function (xml, rcnt, more, adjust) {
			var self = this, $self = $(this), startReq = new Date(), getXmlData = jgrid.getXmlData,
			locdata = (p.datatype !== "local" && p.loadonce) || p.datatype === "xmlstring",
			xmlid = "_id_", xmlRd = p.xmlReader, colModel = p.colModel,
			frd = p.datatype === "local" ? "local" : "xml";
			if(locdata) {
				clearArray(p.data); //p.data = [];
				clearArray(p.lastSelectedData); //p.lastSelectedData = [];
				p._index = {};
				p.localReader.id = xmlid;
			}
			p.reccount = 0;
			if($.isXMLDoc(xml)) {
				if(p.treeANode===-1 && !p.scroll) {
					emptyRows.call(self, false, true);
					rcnt=1;
				} else { rcnt = rcnt > 1 ? rcnt :1; }
			} else { return; }
			var i,fpos,ir=0,v,gi=p.multiselect===true?1:0,si=0,addSubGridCell,ni=p.rownumbers===true?1:0,idn, getId,f=[],F,rd ={},
			xmlr,rid, rowData=[], cn=(p.altRows === true) ? p.altclass:"",cn1;
			if(p.subGrid===true) {
				si = 1;
				addSubGridCell = jgrid.getMethod("addSubGridCell");
			}
			if(!xmlRd.repeatitems) {f = reader(frd);}
			if( p.keyName===false) {
				idn = $.isFunction( xmlRd.id ) ?  xmlRd.id.call(self, xml) : xmlRd.id;
			} else {
				idn = p.keyName;
			}
			if (isNaN(idn) && xmlRd.repeatitems) {
				for (i=0; i<colModel.length; i++) {
					if (colModel[i].name === idn) {
						idn = i;
						break;
					}
				}
			}

			if( String(idn).indexOf("[") === -1 ) {
				if (f.length) {
					getId = function( trow, k) {return $(idn,trow).text() || k;};
				} else {
					getId = function( trow, k) {return $(xmlRd.cell,trow).eq(idn).text() || k;};
				}
			}
			else {
				getId = function( trow, k) {return trow.getAttribute(idn.replace(/[\[\]]/g,"")) || k;};
			}
			p.userData = {};
			p.page = intNum(getXmlData(xml, xmlRd.page), p.page);
			p.lastpage = intNum(getXmlData(xml, xmlRd.total), 1);
			p.records = intNum(getXmlData(xml, xmlRd.records));
			if($.isFunction(xmlRd.userdata)) {
				p.userData = xmlRd.userdata.call(self, xml) || {};
			} else {
				getXmlData(xml, xmlRd.userdata, true).each(function() {p.userData[this.getAttribute("name")]= $(this).text();});
			}
			var hiderow=false, groupingPrepare, gxml = getXmlData( xml, xmlRd.root, true);
			gxml = getXmlData(gxml, xmlRd.row, true) || [];
			var gl = gxml.length, j=0, grpdata=[], rn = parseInt(p.rowNum,10), br=p.scroll?jgrid.randId():1, altr, iStartTrTag, cells;
			if (gl > 0 &&  p.page <= 0) { p.page = 1; }
			if(p.grouping) {
				hiderow = p.groupingView.groupCollapse === true;
				groupingPrepare = jgrid.getMethod("groupingPrepare");
			}
			var $tbody = $(self.tBodies[0]); //$self.children("tbody").filter(":first");
			if(gxml && gl){
				if (adjust) { rn *= adjust+1; }
				while (j<gl) {
					xmlr = gxml[j];
					rid = getId(xmlr,br+j);
					rid  = p.idPrefix + rid;
					altr = rcnt === 0 ? 0 : rcnt+1;
					cn1 = (altr+j)%2 === 1 ? cn : '';
					iStartTrTag = rowData.length;
					rowData.push("");
					if( ni ) {
						rowData.push( addRowNum(0,j,p.page,p.rowNum) );
					}
					if( gi ) {
						rowData.push( addMulti(rid,ni,j, false) );
					}
					if( si ) {
						rowData.push( addSubGridCell.call($self,gi+ni,j+rcnt) );
					}
					if(xmlRd.repeatitems){
						if (!F) { F=orderedCols(gi+si+ni); }
						cells = getXmlData( xmlr, xmlRd.cell, true);
						$.each(F, function (k) {
							var cell = cells[this];
							if (!cell) { return false; }
							v = cell.textContent || cell.text;
							rd[colModel[k+gi+si+ni].name] = v;
							rowData.push( addCell(rid,v,k+gi+si+ni,j+rcnt,xmlr, rd) );
						});
					} else {
						for(i = 0; i < f.length;i++) {
							v = getXmlData( xmlr, f[i]);
							rd[colModel[i+gi+si+ni].name] = v;
							rowData.push( addCell(rid, v, i+gi+si+ni, j+rcnt, xmlr, rd) );
						}
					}
					rowData[iStartTrTag] = constructTr.call(self, rid, hiderow, cn1, rd, xmlr, false);
					rowData.push("</tr>");
					if(p.grouping) {
						grpdata.push( rowData );
						if(!p.groupingView._locgr) {
							groupingPrepare.call($self, rd, j );
						}
						rowData = [];
					}
					if(locdata || p.treeGrid === true) {
						rd[xmlid] = stripPref(p.idPrefix, rid);
						p.data.push(rd);
						p._index[rd[xmlid]] = p.data.length-1;
					}
					if(p.gridview === false ) {
						$tbody.append(rowData.join(''));
						feedback.call(self, "afterInsertRow", rid, rd, xmlr);
						clearArray(rowData);//rowData=[];
					}
					rd={};
					ir++;
					j++;
					if(ir===rn) {break;}
				}
			}
			if(p.gridview === true) {
				fpos = p.treeANode > -1 ? p.treeANode: 0;
				if(p.grouping) {
					if(!locdata) {
						$self.jqGrid('groupingRender',grpdata,colModel.length, p.page, rn);
						grpdata = null;
					}
				} else if(p.treeGrid === true && fpos > 0) {
					$(self.rows[fpos]).after(rowData.join(''));
				} else if (self.firstElementChild) {
					//$("tbody:first",self.grid.bDiv).append(rowData.join(''));
					self.firstElementChild.innerHTML += rowData.join(''); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
					self.grid.cols = self.rows[0].cells; // update cached first row
				} else {
					// for IE8 for example
					$tbody($tbody.html() + rowData.join('')); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
					self.grid.cols = self.rows[0].cells; // update cached first row
				}
			}
			if(p.subGrid === true ) {
				try {$self.jqGrid("addSubGrid",gi+ni);} catch (ignore){}
			}
			p.totaltime = new Date() - startReq;
			if(ir>0) { if(p.records===0) { p.records=gl;} }
			clearArray(rowData);
			if(p.treeGrid === true) {
				try {$self.jqGrid("setTreeNode", fpos+1, ir+fpos+1);} catch (ignore) {}
			}
			//if(!p.treeGrid && !p.scroll) {grid.bDiv.scrollTop = 0;}
			p.reccount=ir;
			p.treeANode = -1;
			if(p.userDataOnFooter) { $self.jqGrid("footerData","set",p.userData,true); }
			if(locdata) {
				p.records = gl;
				p.lastpage = Math.ceil(gl/ rn);
			}
			if (!more) { self.updatepager(false,true); }
			if(locdata) {
				while (ir<gl) {
					xmlr = gxml[ir];
					rid = getId(xmlr,ir+br);
					rid  = p.idPrefix + rid;
					if(xmlRd.repeatitems){
						if (!F) { F=orderedCols(gi+si+ni); }
						var cells2 = getXmlData( xmlr, xmlRd.cell, true);
						$.each(F, function (k) {
							var cell = cells2[this];
							if (!cell) { return false; }
							v = cell.textContent || cell.text;
							rd[colModel[k+gi+si+ni].name] = v;
						});
					} else {
						for(i = 0; i < f.length;i++) {
							v = getXmlData( xmlr, f[i]);
							rd[colModel[i+gi+si+ni].name] = v;
						}
					}
					rd[xmlid] = stripPref(p.idPrefix, rid);
					if(p.grouping) {
						groupingPrepare.call($self, rd, ir );
					}
					p.data.push(rd);
					p._index[rd[xmlid]] = p.data.length-1;
					rd = {};
					ir++;
				}
				if(p.grouping) {
					p.groupingView._locgr = true;
					$self.jqGrid('groupingRender', grpdata, colModel.length, p.page, rn);
					grpdata = null;
				}
			}
		},
		addJSONData = function(data, rcnt, more, adjust) {
			var self = this, $self = $(self), startReq = new Date();
			if(data) {
				if(p.treeANode === -1 && !p.scroll) {
					emptyRows.call(self, false, true);
					rcnt=1;
				} else { rcnt = rcnt > 1 ? rcnt :1; }
			} else { return; }

			var dReader, locid = "_id_", frd,
			locdata = (p.datatype !== "local" && p.loadonce) || p.datatype === "jsonstring";
			if(locdata) {
				clearArray(p.data); //p.data = [];
				clearArray(p.lastSelectedData); //p.lastSelectedData = [];
				p._index = {};
				p.localReader.id = locid;
			}
			p.reccount = 0;
			if(p.datatype === "local") {
				dReader =  p.localReader;
				frd= 'local';
			} else {
				dReader =  p.jsonReader;
				frd='json';
			}
			var ir,v,i,j,cur,cells,gi=p.multiselect?1:0,si=p.subGrid===true?1:0,addSubGridCell,ni=p.rownumbers===true?1:0,
			arrayReader=orderedCols(gi+si+ni),objectReader=reader(frd),rowReader,len,drows,idn,idi,rd={}, fpos, idr,rowData=[],
			cn=(p.altRows === true) ? p.altclass:"",cn1;
			p.page = intNum(getAccessor(data,dReader.page), p.page);
			p.lastpage = intNum(getAccessor(data,dReader.total), 1);
			p.records = intNum(getAccessor(data,dReader.records));
			p.userData = getAccessor(data,dReader.userdata) || {};
			if(si) {
				addSubGridCell = jgrid.getMethod("addSubGridCell");
			}
			if( p.keyName===false ) {
				idn = $.isFunction(dReader.id) ? dReader.id.call(self, data) : dReader.id; 
			} else {
				idn = p.keyName;
			}
			if (!isNaN(idn)) {
				idi = Number(idn);
			}
			for (i=0; i<p.colModel.length; i++) {
				if (p.colModel[i].name === idn) {
					idi = i;
					break;
				}
			}
			drows = getAccessor(data,dReader.root);
			if (drows == null && $.isArray(data)) { drows = data; }
			if (!drows) { drows = []; }
			len = drows.length;
			if (len > 0 && p.page <= 0) { p.page = 1; }
			var rn = parseInt(p.rowNum,10),br=p.scroll?jgrid.randId():1, altr, selected=false, selr;
			if (adjust) { rn *= adjust+1; }
			if(p.datatype === "local" && !p.deselectAfterSort) {
				selected = true;
			}
			var grpdata=[],hiderow=false, groupingPrepare, iStartTrTag;
			if(p.grouping)  {
				hiderow = p.groupingView.groupCollapse === true;
				groupingPrepare = jgrid.getMethod("groupingPrepare");
			}
			var $tbody = $(self.tBodies[0]); //$self.children("tbody").filter(":first");
			for (i=0; i<len && i<rn; i++) {
				cur = drows[i];
				cells = dReader.repeatitems && dReader.cell ? getAccessor(cur, dReader.cell) || cur : cur;
				rowReader = dReader.repeatitems && $.isArray(cells) ? arrayReader : objectReader;
				idr = p.keyName === false ? getAccessor(cur, idn) : getAccessor(cells, rowReader[idi]);
				if(idr === undefined) {
					// it could be that one uses the index of column in dReader.id
					if (!isNaN(idn) && p.colModel[Number(idn)+gi+si+ni] != null) {
						idr = getAccessor(cells, rowReader[Number(idn)]);
					}
					if(idr === undefined) {
						idr = br+i;
					}
				}
				idr  = p.idPrefix + idr;
				altr = rcnt === 1 ? 0 : rcnt;
				cn1 = (altr+i)%2 === 1 ? cn : '';
				if( selected) {
					if( p.multiselect) {
						selr = ($.inArray(idr, p.selarrrow) !== -1);
					} else {
						selr = (idr === p.selrow);
					}
				}
				iStartTrTag = rowData.length;
				rowData.push("");
				if( ni ) {
					rowData.push( addRowNum(0,i,p.page,p.rowNum) );
				}
				if( gi ){
					rowData.push( addMulti(idr,ni,i,selr) );
				}
				if( si ) {
					rowData.push( addSubGridCell.call($self,gi+ni,i+rcnt) );
				}
				for (j=0;j<rowReader.length;j++) {
					v = getAccessor(cells, rowReader[j]);
					rd[p.colModel[j+gi+si+ni].name] = v;
					rowData.push( addCell(idr,v,j+gi+si+ni,i+rcnt,cells, rd) );
				}
				rowData[iStartTrTag] = constructTr.call(self, idr, hiderow, cn1, rd, cells, selr);
				rowData.push( "</tr>" );
				if(p.grouping) {
					grpdata.push( rowData );
					if(!p.groupingView._locgr) {
						groupingPrepare.call($self, rd, i);
					}
					rowData = [];
				}
				if(locdata || p.treeGrid===true) {
					rd[locid] = stripPref(p.idPrefix, idr);
					p.data.push(rd);
					p._index[rd[locid]] = p.data.length-1;
				}
				if(p.gridview === false ) {
					$tbody.append(rowData.join('')); // ??? $self.append(rowData.join(''));
					feedback.call(self, "afterInsertRow", idr, rd, cells);
					clearArray(rowData); // rowData=[];
				}
				rd={};
			}
			if(p.gridview === true ) {
				fpos = p.treeANode > -1 ? p.treeANode: 0;
				if(p.grouping) {
					if(!locdata) {
						$self.jqGrid('groupingRender', grpdata, p.colModel.length, p.page, rn);
						grpdata = null;
					}
				} else if(p.treeGrid === true && fpos > 0) {
					$(self.rows[fpos]).after(rowData.join(''));
				} else if (self.firstElementChild) {
					self.firstElementChild.innerHTML += rowData.join(''); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
					self.grid.cols = self.rows[0].cells; // update cached first row
				} else {
					// for IE8 for example
					$tbody.html($tbody.html() + rowData.join('')); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
					self.grid.cols = self.rows[0].cells; // update cached first row
				}
			}
			if(p.subGrid === true ) {
				try { $self.jqGrid("addSubGrid",gi+ni);} catch (ignore){}
			}
			p.totaltime = new Date() - startReq;
			if(i>0) {
				if(p.records===0) { p.records=len; }
			}
			clearArray(rowData);
			if( p.treeGrid === true) {
				try {$self.jqGrid("setTreeNode", fpos+1, i+fpos+1);} catch (ignore) {}
			}
			//if(!p.treeGrid && !p.scroll) {grid.bDiv.scrollTop = 0;}
			p.reccount=i;
			p.treeANode = -1;
			if(p.userDataOnFooter) { $self.jqGrid("footerData","set",p.userData,true); }
			if(locdata) {
				p.records = len;
				p.lastpage = Math.ceil(len/ rn);
			}
			if (!more) { self.updatepager(false,true); }
			if(locdata) {
				for (ir=i; ir<len && drows[ir]; ir++) {
					cur = drows[ir];
					cells = dReader.repeatitems && dReader.cell ? getAccessor(cur, dReader.cell) || cur : cur;
					rowReader = dReader.repeatitems && $.isArray(cells) ? arrayReader : objectReader;
					idr = p.keyName === false ? getAccessor(cur, idn) : getAccessor(cells, rowReader[idi]);
					if(idr === undefined) {
						// it could be that one uses the index of column in dReader.id
						if (!isNaN(idn) && p.colModel[Number(idn)+gi+si+ni] != null) {
							idr = getAccessor(cells, rowReader[Number(idn)]);
						}
						if(idr === undefined) {
							idr = br+ir;
						}
					}
					if(cells) {
						for (j=0;j<rowReader.length;j++) {
							rd[p.colModel[j+gi+si+ni].name] = getAccessor(cells,rowReader[j]);
						}
						rd[locid] = stripPref(p.idPrefix, idr);
						if(p.grouping) {
							groupingPrepare.call($self, rd, ir );
						}
						p.data.push(rd);
						p._index[rd[locid]] = p.data.length-1;
						rd = {};
					}
				}
				if(p.grouping) {
					p.groupingView._locgr = true;
					$self.jqGrid('groupingRender', grpdata, p.colModel.length, p.page, rn);
					grpdata = null;
				}
			}
		},
		addLocalData = function() {
			var $self = $(this), st = p.multiSort ? [] : "", sto=[], fndsort=false, cmtypes={}, grtypes=[], grindexes=[], srcformat, sorttype, newformat;
			if(!$.isArray(p.data)) {
				return {};
			}
			var grpview = p.grouping ? p.groupingView : false, lengrp, gin;
			$.each(p.colModel,function(){
				var grindex = this.index || this.name;
				sorttype = this.sorttype || "text";
				if(sorttype === "date" || sorttype === "datetime") {
					if(this.formatter && typeof this.formatter === 'string' && this.formatter === 'date') {
						if(this.formatoptions && this.formatoptions.srcformat) {
							srcformat = this.formatoptions.srcformat;
						} else {
							srcformat = jgrid.formatter.date.srcformat;
						}
						if(this.formatoptions && this.formatoptions.newformat) {
							newformat = this.formatoptions.newformat;
						} else {
							newformat = jgrid.formatter.date.newformat;
						}
					} else {
						srcformat = newformat = this.datefmt || "Y-m-d";
					}
					cmtypes[this.name] = {"stype": sorttype, "srcfmt": srcformat,"newfmt":newformat, "sfunc": this.sortfunc || null};
				} else {
					cmtypes[this.name] = {"stype": sorttype, "srcfmt":'',"newfmt":'', "sfunc": this.sortfunc || null};
				}
				if(p.grouping) {
					for(gin =0, lengrp = grpview.groupField.length; gin< lengrp; gin++) {
						if( this.name === grpview.groupField[gin]) {
							grtypes[gin] = cmtypes[grindex];
							grindexes[gin]= grindex;
						}
					}
				}
				if(p.multiSort) {
					if(this.lso) {
						st.push(this.name);
						var tmplso= this.lso.split("-");
						sto.push( tmplso[tmplso.length-1] );
					}
				} else {
					if(!fndsort && (this.index === p.sortname || this.name === p.sortname)){
						st = this.name; // ???
						fndsort = true;
					}
				}
			});
			if(p.treeGrid) {
				$self.jqGrid("SortTree", st, p.sortorder,
					cmtypes[st] != null && cmtypes[st].stype ? cmtypes[st].stype : 'text',
					cmtypes[st] != null && cmtypes[st].srcfmt ? cmtypes[st].srcfmt : '');
				return {};
			}
			var compareFnMap = {
				'eq':function(queryObj) {return queryObj.equals;},
				'ne':function(queryObj) {return queryObj.notEquals;},
				'lt':function(queryObj) {return queryObj.less;},
				'le':function(queryObj) {return queryObj.lessOrEquals;},
				'gt':function(queryObj) {return queryObj.greater;},
				'ge':function(queryObj) {return queryObj.greaterOrEquals;},
				'cn':function(queryObj) {return queryObj.contains;},
				'nc':function(queryObj,op) {return op === "OR" ? queryObj.orNot().contains : queryObj.andNot().contains;},
				'bw':function(queryObj) {return queryObj.startsWith;},
				'bn':function(queryObj,op) {return op === "OR" ? queryObj.orNot().startsWith : queryObj.andNot().startsWith;},
				'en':function(queryObj,op) {return op === "OR" ? queryObj.orNot().endsWith : queryObj.andNot().endsWith;},
				'ew':function(queryObj) {return queryObj.endsWith;},
				'ni':function(queryObj,op) {return op === "OR" ? queryObj.orNot().equals : queryObj.andNot().equals;},
				'in':function(queryObj) {return queryObj.equals;},
				'nu':function(queryObj) {return queryObj.isNull;},
				'nn':function(queryObj,op) {return op === "OR" ? queryObj.orNot().isNull : queryObj.andNot().isNull;}
			},
			query = jgrid.from(p.data);
			if (p.ignoreCase) { query = query.ignoreCase(); }
			function tojLinq ( group ) {
				var s = 0, index, gor, ror, opr, rule;
				if (group.groups != null) {
					gor = group.groups.length && group.groupOp.toString().toUpperCase() === "OR";
					if (gor) {
						query.orBegin();
					}
					for (index = 0; index < group.groups.length; index++) {
						if (s > 0 && gor) {
							query.or();
						}
						try {
							tojLinq(group.groups[index]);
						} catch (e) {fatalErrorFunction(e);}
						s++;
					}
					if (gor) {
						query.orEnd();
					}
				}
				if (group.rules != null) {
					//if(s>0) {
					//	var result = query.select();
					//	query = $.jgrid.from( result);
					//	if (p.ignoreCase) { query = query.ignoreCase(); } 
					//}
					try{
						ror = group.rules.length && group.groupOp.toString().toUpperCase() === "OR";
						if (ror) {
							query.orBegin();
						}
						for (index = 0; index < group.rules.length; index++) {
							rule = group.rules[index];
							opr = group.groupOp.toString().toUpperCase();
							if (compareFnMap[rule.op] && rule.field ) {
								if(s > 0 && opr && opr === "OR") {
									query = query.or();
								}
								query = compareFnMap[rule.op](query, opr)(rule.field, rule.data, cmtypes[rule.field]);
							}
							s++;
						}
						if (ror) {
							query.orEnd();
						}
					} catch (g) {fatalErrorFunction(g);}
				}
			}
			if (p.search === true) {
				var srules = p.postData.filters;
				if(srules) {
					if(typeof srules === "string") { srules = jgrid.parse(srules);}
					tojLinq( srules );
				} else {
					try {
						query = compareFnMap[p.postData.searchOper](query)(p.postData.searchField, p.postData.searchString,cmtypes[p.postData.searchField]);
					} catch (ignore){}
				}
			}
			if(p.grouping) {
				for(gin=0; gin<lengrp;gin++) {
					query.orderBy(grindexes[gin],grpview.groupOrder[gin],grtypes[gin].stype, grtypes[gin].srcfmt);
				}
			}
			if(p.multiSort) {
				$.each(st,function(i){
					query.orderBy(this, sto[i], cmtypes[this].stype, cmtypes[this].srcfmt, cmtypes[this].sfunc);
				});
			} else {
				if (st && p.sortorder && fndsort) {
					if(p.sortorder.toUpperCase() === "DESC") {
						query.orderBy(p.sortname, "d", cmtypes[st].stype, cmtypes[st].srcfmt, cmtypes[st].sfunc);
					} else {
						query.orderBy(p.sortname, "a", cmtypes[st].stype, cmtypes[st].srcfmt, cmtypes[st].sfunc);
					}
				}
			}
			p.lastSelectedData = query.select();
			var recordsperpage = parseInt(p.rowNum,10),
			total = p.lastSelectedData.length,
			page = parseInt(p.page,10),
			totalpages = Math.ceil(total / recordsperpage),
			retresult = {};
			if((p.search || p.resetsearch) && p.grouping && p.groupingView._locgr) {
				p.groupingView.groups =[];
				var j, grPrepare = jgrid.getMethod("groupingPrepare"), key, udc;
				if(p.footerrow && p.userDataOnFooter) {
					for (key in p.userData) {
						if(p.userData.hasOwnProperty(key)) {
							p.userData[key] = 0;
						}
					}
					udc = true;
				}
				for(j=0; j<total; j++) {
					if(udc) {
						for(key in p.userData){
							if(p.userData.hasOwnProperty(key)) {
								p.userData[key] += parseFloat(p.lastSelectedData[j][key] || 0);
							}
						}
					}
					grPrepare.call($self,p.lastSelectedData[j],j, recordsperpage );
				}
			}
			query = null;
			cmtypes = null;
			var localReader = p.localReader;
			retresult[localReader.total] = totalpages;
			retresult[localReader.page] = page;
			retresult[localReader.records] = total;
			retresult[localReader.root] = p.lastSelectedData.slice((page-1)*recordsperpage, page*recordsperpage);
			retresult[localReader.userdata] = p.userData;
			return retresult;
		},
		updatepager = function(rn, dnd) {
			var self = this, $self = $(self), gridSelf = self.grid, cp, last, base, from, to, tot, fmt, pgboxes = p.pager || "", sppg,
			tspg = p.pager ? "_"+p.pager.substr(1) : "", bDiv = gridSelf.bDiv,
			tspg_t = p.toppager ? "_"+p.toppager.substr(1) : "";
			base = parseInt(p.page,10)-1;
			if(base < 0) { base = 0; }
			base = base*parseInt(p.rowNum,10);
			to = base + p.reccount;
			if (p.scroll) {
				var rows = $(getGridComponent("bTable", $(bDiv))[0].rows).slice(1);//$("tbody:first > tr:gt(0)", bDiv);
				base = to - rows.length;
				p.reccount = rows.length;
				var rh = rows.outerHeight() || gridSelf.prevRowHeight;
				if (rh) {
					var top = base * rh;
					var height = parseInt(p.records,10) * rh;
					$(">div",bDiv).filter(":first").css({height : height}).children("div").filter(":first").css({height:top,display:top?"":"none"});
					if (bDiv.scrollTop === 0 && p.page > 1) {
						bDiv.scrollTop = p.rowNum * (p.page - 1) * rh;
					}
				}
				bDiv.scrollLeft = gridSelf.hDiv.scrollLeft;
			}
			pgboxes += p.toppager ? (pgboxes ? ",": "") + p.toppager : "";
			if(pgboxes) {
				fmt = jgrid.formatter.integer || {};
				cp = intNum(p.page);
				last = intNum(p.lastpage);
				$(".selbox", pgboxes)[propOrAttr]("disabled", false);
				if(p.pginput===true) {
					$('.ui-pg-input',pgboxes).val(p.page);
					sppg = p.toppager ? '#sp_1'+tspg+",#sp_1"+tspg_t : '#sp_1'+tspg;
					$(sppg).html($.fmatter ? $.fmatter.util.NumberFormat(p.lastpage,fmt):p.lastpage);

				}
				if (p.viewrecords){
					if(p.reccount === 0) {
						$(".ui-paging-info",pgboxes).html(p.emptyrecords);
					} else {
						from = base+1;
						tot=p.records;
						if($.fmatter) {
							from = $.fmatter.util.NumberFormat(from,fmt);
							to = $.fmatter.util.NumberFormat(to,fmt);
							tot = $.fmatter.util.NumberFormat(tot,fmt);
						}
						$(".ui-paging-info",pgboxes).html(jgrid.format(p.recordtext,from,to,tot));
					}
				}
				if(p.pgbuttons===true) {
					if(cp<=0) {cp = last = 0;}
					if(cp===1 || cp === 0) {
						$("#first"+tspg+", #prev"+tspg).addClass('ui-state-disabled').removeClass('ui-state-hover');
						if(p.toppager) { $("#first_t"+tspg_t+", #prev_t"+tspg_t).addClass('ui-state-disabled').removeClass('ui-state-hover'); }
					} else {
						$("#first"+tspg+", #prev"+tspg).removeClass('ui-state-disabled');
						if(p.toppager) { $("#first_t"+tspg_t+", #prev_t"+tspg_t).removeClass('ui-state-disabled'); }
					}
					if(cp===last || cp === 0) {
						$("#next"+tspg+", #last"+tspg).addClass('ui-state-disabled').removeClass('ui-state-hover');
						if(p.toppager) { $("#next_t"+tspg_t+", #last_t"+tspg_t).addClass('ui-state-disabled').removeClass('ui-state-hover'); }
					} else {
						$("#next"+tspg+", #last"+tspg).removeClass('ui-state-disabled');
						if(p.toppager) { $("#next_t"+tspg_t+", #last_t"+tspg_t).removeClass('ui-state-disabled'); }
					}
				}
			}
			if(rn===true && p.rownumbers === true) {
				$(">td.jqgrid-rownum",self.rows).each(function(i){
					$(this).html(base+1+i);
				});
			}
			if(dnd && p.jqgdnd) { $self.jqGrid('gridDnD','updateDnD');}
			feedback.call(self, "gridComplete");
			$self.triggerHandler("jqGridAfterGridComplete");
		},
		beginReq = function() {
			var self = this;
			self.grid.hDiv.loading = true;
			if(p.hiddengrid) { return;}
			$(self).jqGrid("progressBar", {method:"show", loadtype : p.loadui, htmlcontent: p.loadtext });
		},
		endReq = function() {
			var self = this;
			self.grid.hDiv.loading = false;
			$(self).jqGrid("progressBar", {method:"hide", loadtype : p.loadui });
		},
		populate = function (npage) {
			var self = this, $self = $(self), gridSelf = self.grid;
			if(!gridSelf.hDiv.loading) {
				var pvis = p.scroll && npage === false,
				prm = {}, dt, dstr, pN=p.prmNames;
				if(p.page <=0) { p.page = Math.min(1,p.lastpage); }
				if(pN.search !== null) {prm[pN.search] = p.search;} if(pN.nd !== null) {prm[pN.nd] = new Date().getTime();}
				if (isNaN(parseInt(p.rowNum,10)) || parseInt(p.rowNum,10) <= 0) { p.rowNum = p.maxRowNum; }
				if(pN.rows !== null) {prm[pN.rows]= p.rowNum;} if(pN.page !== null) {prm[pN.page]= p.page;}
				if(pN.sort !== null) {prm[pN.sort]= p.sortname;} if(pN.order !== null) {prm[pN.order]= p.sortorder;}
				if(p.rowTotal !== null && pN.totalrows !== null) { prm[pN.totalrows]= p.rowTotal; }
				var lcf = $.isFunction(p.loadComplete), lc = lcf ? p.loadComplete : null;
				var adjust = 0;
				npage = npage || 1;
				if (npage > 1) {
					if(pN.npage !== null) {
						prm[pN.npage] = npage;
						adjust = npage - 1;
						npage = 1;
					} else {
						lc = function(req) {
							p.page++;
							gridSelf.hDiv.loading = false;
							if (lcf) {
								p.loadComplete.call(self,req);
							}
							populate.call(self,npage-1);
						};
					}
				} else if (pN.npage !== null) {
					delete p.postData[pN.npage];
				}
				if(p.grouping) {
					$self.jqGrid('groupingSetup');
					var grp = p.groupingView, gi, gs="", index;
					for(gi=0;gi<grp.groupField.length;gi++) {
						index = grp.groupField[gi];
						$.each(p.colModel, function(cmIndex, cmValue) {
							if (cmValue.name === index && cmValue.index){
								index = cmValue.index;
							}
						} );
						gs += index +" "+grp.groupOrder[gi]+", ";
					}
					prm[pN.sort] = gs + prm[pN.sort];
				}
				$.extend(p.postData,prm);
				var rcnt = !p.scroll ? 1 : self.rows.length-1;
				if (!feedback.call(self, "beforeRequest")) { return; }
				if ($.isFunction(p.datatype)) { p.datatype.call(self,p.postData,"load_"+p.id, rcnt, npage, adjust); return;}
				dt = p.datatype.toLowerCase();
				switch(dt)
				{
				case "json":
				case "jsonp":
				case "xml":
				case "script":
					$.ajax($.extend({
						url:p.url,
						type:p.mtype,
						dataType: dt ,
						data: $.isFunction(p.serializeGridData)? p.serializeGridData.call(self,p.postData) : p.postData,
						success:function(data,st, xhr) {
							if ($.isFunction(p.beforeProcessing)) {
								if (p.beforeProcessing.call(self, data, st, xhr) === false) {
									endReq.call(self);
									return;
								}
							}
							if(dt === "xml") { addXmlData.call(self,data,rcnt,npage>1,adjust); }
							else { addJSONData.call(self,data,rcnt,npage>1,adjust); }
							$self.triggerHandler("jqGridLoadComplete", [data]);
							if(lc) { lc.call(self,data); }
							if (p.autoresizeOnLoad) {$self.jqGrid("autoResizeAllColumns");}
							$self.triggerHandler("jqGridAfterLoadComplete", [data]);
							if (pvis) { gridSelf.populateVisible.call(self); }
							if (p.loadonce || p.treeGrid) {
								p.dataTypeOrg = p.datatype;
								p.datatype = "local";
							}
							data=null;
							if (npage === 1) { endReq.call(self); }
						},
						error:function(xhr,st,err){
							if($.isFunction(p.loadError)) { p.loadError.call(self,xhr,st,err); }
							if (npage === 1) { endReq.call(self); }
							xhr=null;
						},
						beforeSend: function(xhr, settings ){
							var gotoreq = true;
							if($.isFunction(p.loadBeforeSend)) {
								gotoreq = p.loadBeforeSend.call(self,xhr, settings); 
							}
							if(gotoreq === undefined) { gotoreq = true; }
							if(gotoreq === false) {
								return false;
							}
							beginReq.call(self);
						}
					},jgrid.ajaxOptions, p.ajaxGridOptions));
				break;
				case "xmlstring":
					beginReq.call(self);
					dstr = typeof p.datastr !== 'string' ? p.datastr : $.parseXML(p.datastr);
					addXmlData.call(self,dstr);
					feedback.call(self, "loadComplete", dstr);
					if (p.autoresizeOnLoad) {$self.jqGrid("autoResizeAllColumns");}
					$self.triggerHandler("jqGridAfterLoadComplete", [dstr]);
					p.datatype = "local";
					p.datastr = null;
					endReq.call(self);
				break;
				case "jsonstring":
					beginReq.call(self);
					if(typeof p.datastr === 'string') { dstr = jgrid.parse(p.datastr); }
					else { dstr = p.datastr; }
					addJSONData.call(self,dstr);
					feedback.call(self, "loadComplete", dstr);
					if (p.autoresizeOnLoad) {$self.jqGrid("autoResizeAllColumns");}
					$self.triggerHandler("jqGridAfterLoadComplete", [dstr]);
					p.datatype = "local";
					p.datastr = null;
					endReq.call(self);
				break;
				case "local":
				case "clientside":
					beginReq.call(self);
					p.datatype = "local";
					var req = addLocalData.call(self);
					addJSONData.call(self,req,rcnt,npage>1,adjust);
					$self.triggerHandler("jqGridLoadComplete", [req]);
					if(lc) { lc.call(self,req); }
					if (p.autoresizeOnLoad) {$self.jqGrid("autoResizeAllColumns");}
					$self.triggerHandler("jqGridAfterLoadComplete", [req]);
					if (pvis) { gridSelf.populateVisible.call(self); }
					endReq.call(self);
				break;
				}
			}
		},
		setHeadCheckBox = function (checked) {
		    var self = this, gridSelf = self.grid;
			$(p.cb,gridSelf.hDiv)[p.propOrAttr]("checked", checked);
			var fid = p.frozenColumns ? p.id+"_frozen" : "";
			if(fid) {
				$(p.cb,gridSelf.fhDiv)[p.propOrAttr]("checked", checked);
			}
		},
		setPager = function (pgid, tp){
			var sep = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>",
			pginp = "",
			blockAlign = p.pagerpos === "left" ? "margin-right:auto;" : (p.pagerpos === "right" ? "margin-left:auto;" : "margin-left:auto;margin-right:auto;"),
			pgl="<table "+(isMSIE8 ? "cellspacing='0' " : "")+"style='table-layout:auto;"+blockAlign+"' class='ui-pg-table'><tbody><tr>",
			str="", pgcnt, lft, cent, rgt, twd, tdw, i,
			clearVals = function(onpaging){
				var ret;
				if ($.isFunction(p.onPaging) ) { ret = p.onPaging.call(ts,onpaging); }
				if(ret==='stop') {return false;}
				p.selrow = null;
				if(p.multiselect) {
					clearArray(p.selarrrow); // p.selarrrow = [];
					setHeadCheckBox.call(ts, false);
				}
				clearArray(p.savedRow); // p.savedRow = [];
				return true;
			};
			tp += "_" + pgid;
			pgcnt = "pg_"+pgid;
			lft = pgid+"_left"; cent = pgid+"_center"; rgt = pgid+"_right";
			$("#"+jqID(pgid) )
			.append("<div id='"+pgcnt+"' class='ui-pager-control' role='group'><table "+(isMSIE8 ? "cellspacing='0' " : "")+"class='ui-pg-table' style='width:100%;table-layout:fixed;height:100%;'><tbody><tr><td id='"+lft+"' style='text-align:left;'></td><td id='"+cent+"' style='text-align:center;white-space:pre;'></td><td id='"+rgt+"' style='text-align:right;'></td></tr></tbody></table></div>")
			.attr("dir","ltr"); //explicit setting
			pgcnt = "#" + jqID(pgcnt); // modify to id selector
			if(p.rowList.length >0){
				str = "<td dir='"+dir+"'>";
				str +="<select class='ui-pg-selbox' role='listbox' " + (p.pgrecs ? "title='"+p.pgrecs +"'" : "")+ ">";
				var strnm;
				for(i=0;i<p.rowList.length;i++){
					strnm = p.rowList[i].toString().split(":");
					if(strnm.length === 1) {
						strnm[1] = strnm[0];
					}
					str +="<option role=\"option\" value=\""+strnm[0]+"\""+(( intNum(p.rowNum,0) === intNum(strnm[0],0))?" selected=\"selected\"":"")+">"+strnm[1]+"</option>";
				}
				str +="</select></td>";
			}
			if(dir==="rtl") { pgl += str; }
			if(p.pginput===true) { pginp= "<td dir='"+dir+"'>"+jgrid.format(p.pgtext || "","<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>","<span id='sp_1_"+pgid+"'></span>")+"</td>";}
			pgid = "#"+jqID(pgid); // modify to id selector
			if(p.pgbuttons===true) {
				var po=["first"+tp,"prev"+tp, "next"+tp,"last"+tp]; if(dir==="rtl") { po.reverse(); }
				pgl += "<td id='"+po[0]+"' class='ui-pg-button ui-corner-all' " + (p.pgfirst ? "title='"+p.pgfirst +"'" : "")+"><span class='ui-icon ui-icon-seek-first'></span></td>";
				pgl += "<td id='"+po[1]+"' class='ui-pg-button ui-corner-all' " + (p.pgprev ? "title='"+p.pgprev +"'" : "")+"><span class='ui-icon ui-icon-seek-prev'></span></td>";
				pgl += pginp !== "" ? sep+pginp+sep:"";
				pgl += "<td id='"+po[2]+"' class='ui-pg-button ui-corner-all' " + (p.pgnext ? "title='"+p.pgnext +"'" : "")+"><span class='ui-icon ui-icon-seek-next'></span></td>";
				pgl += "<td id='"+po[3]+"' class='ui-pg-button ui-corner-all' " + (p.pglast ? "title='"+p.pglast +"'" : "")+"><span class='ui-icon ui-icon-seek-end'></span></td>";
			} else if (pginp !== "") { pgl += pginp; }
			if(dir==="ltr") { pgl += str; }
			pgl += "</tr></tbody></table>";
			if(p.viewrecords===true) {$("td"+pgid+"_"+p.recordpos,pgcnt).append("<div dir='"+dir+"' style='text-align:"+p.recordpos+"' class='ui-paging-info'></div>");}
			$("td"+pgid+"_"+p.pagerpos,pgcnt).append(pgl);
			tdw = $(".ui-jqgrid>.ui-jqgrid-view").css("font-size") || "11px";
			$(document.body).append("<div id='testpg' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:"+tdw+";visibility:hidden;' ></div>");
			twd = $(pgl).clone().appendTo("#testpg").width();
			$("#testpg").remove();
			if(twd > 0) {
				if(pginp !== "") { twd += 50; } //should be param
				$("td"+pgid+"_"+p.pagerpos,pgcnt).width(twd);
			}
			p._nvtd = [];
			p._nvtd[0] = twd ? Math.floor((p.width - twd)/2) : Math.floor(p.width/3);
			p._nvtd[1] = 0;
			pgl=null;
			$('.ui-pg-selbox',pgcnt).bind('change',function() {
				if(!clearVals('records')) { return false; }
				p.page = Math.round(p.rowNum*(p.page-1)/this.value-0.5)+1;
				p.rowNum = this.value;
				if(p.pager) { $('.ui-pg-selbox',p.pager).val(this.value); }
				if(p.toppager) { $('.ui-pg-selbox',p.toppager).val(this.value); }
				populate.call(ts);
				return false;
			});
			if(p.pgbuttons===true) {
			$(".ui-pg-button",pgcnt).hover(function(){
				if($(this).hasClass('ui-state-disabled')) {
					this.style.cursor='default';
				} else {
					$(this).addClass('ui-state-hover');
					this.style.cursor='pointer';
				}
			},function() {
				if(!$(this).hasClass('ui-state-disabled')) {
					$(this).removeClass('ui-state-hover');
					this.style.cursor= "default";
				}
			});
			$("#first"+jqID(tp)+", #prev"+jqID(tp)+", #next"+jqID(tp)+", #last"+jqID(tp)).click( function() {
				if ($(this).hasClass("ui-state-disabled")) {
					return false;
				}
				var cp = intNum(p.page,1),
				last = intNum(p.lastpage,1), selclick = false,
				fp=true, pp=true, np=true,lp=true;
				if(last ===0 || last===1) {fp=false;pp=false;np=false;lp=false; }
				else if( last>1 && cp >=1) {
					if( cp === 1) { fp=false; pp=false; }
					//else if( cp>1 && cp <last){ }
					else if( cp===last){ np=false;lp=false; }
				} else if( last>1 && cp===0 ) { np=false;lp=false; cp=last-1;}
				if(!clearVals(this.id)) { return false; }
				if( this.id === 'first'+tp && fp ) { p.page=1; selclick=true;}
				if( this.id === 'prev'+tp && pp) { p.page=(cp-1); selclick=true;}
				if( this.id === 'next'+tp && np) { p.page=(cp+1); selclick=true;}
				if( this.id === 'last'+tp && lp) { p.page=last; selclick=true;}
				if(selclick) {
					populate.call(ts);
				}
				return false;
			});
			}
			if(p.pginput===true) {
			$('input.ui-pg-input',pgcnt).keypress( function(e) {
				var key = e.charCode || e.keyCode || 0;
				if(key === 13) {
					if(!clearVals('user')) { return false; }
					$(this).val( intNum( $(this).val(), 1));
					p.page = ($(this).val()>0) ? $(this).val():p.page;
					populate.call(ts);
					return false;
				}
				return this;
			});
			}
		},
		multiSort = function(iCol, obj ) {
			var splas, sort="", cm = p.colModel, fs=false, ls, 
					selTh = p.frozenColumns ?  obj : ts.grid.headers[iCol].el, so="";
			$("span.ui-grid-ico-sort",selTh).addClass('ui-state-disabled');
			$(selTh).attr("aria-selected","false");

			if(cm[iCol].lso) {
				if(cm[iCol].lso==="asc") {
					cm[iCol].lso += "-desc";
					so = "desc";
				} else if(cm[iCol].lso==="desc") {
					cm[iCol].lso += "-asc";
					so = "asc";
				} else if(cm[iCol].lso==="asc-desc" || cm[iCol].lso==="desc-asc") {
					cm[iCol].lso="";
				}
			} else {
				cm[iCol].lso = so = cm[iCol].firstsortorder || 'asc';
			}
			if( so ) {
				$("span.s-ico",selTh).show();
				$("span.ui-icon-"+so,selTh).removeClass('ui-state-disabled');
				$(selTh).attr("aria-selected","true");
			} else {
				if(!p.viewsortcols[0]) {
					$("span.s-ico",selTh).hide();
				}
			}
			p.sortorder = "";
			$.each(cm, function(i){
				if(this.lso) {
					if(i>0 && fs) {
						sort += ", ";
					}
					splas = this.lso.split("-");
					sort += cm[i].index || cm[i].name;
					sort += " "+splas[splas.length-1];
					fs = true;
					p.sortorder = splas[splas.length-1];
				}
			});
			ls = sort.lastIndexOf(p.sortorder);
			sort = sort.substring(0, ls);
			p.sortname = sort;
		},
		sortData = function (index, idxcol,reload,sor, obj){
			var self = this;
			if(!p.colModel[idxcol].sortable) { return; }
			if(p.savedRow.length > 0) {return;}
			if(!reload) {
				if( p.lastsort === idxcol && p.sortname !== "" ) {
					if( p.sortorder === 'asc') {
						p.sortorder = 'desc';
					} else if(p.sortorder === 'desc') { p.sortorder = 'asc';}
				} else { p.sortorder = p.colModel[idxcol].firstsortorder || 'asc'; }
				p.page = 1;
			}
			if(p.multiSort) {
				multiSort( idxcol, obj);
			} else {
				if(sor) {
					if(p.lastsort === idxcol && p.sortorder === sor && !reload) { return; }
					p.sortorder = sor;
				}
				var previousSelectedTh = self.grid.headers[p.lastsort] ? self.grid.headers[p.lastsort].el : null, newSelectedTh = p.frozenColumns ?  obj : self.grid.headers[idxcol].el;

				$("span.ui-grid-ico-sort",previousSelectedTh).addClass('ui-state-disabled');
				$(previousSelectedTh).attr("aria-selected","false");
				if(p.frozenColumns) {
					self.grid.fhDiv.find("span.ui-grid-ico-sort").addClass('ui-state-disabled');
					self.grid.fhDiv.find("th").attr("aria-selected","false");
				}
				$("span.ui-icon-"+p.sortorder,newSelectedTh).removeClass('ui-state-disabled');
				$(newSelectedTh).attr("aria-selected","true");
				if(!p.viewsortcols[0]) {
					if(p.lastsort !== idxcol) {
						if(p.frozenColumns){
							self.grid.fhDiv.find("span.s-ico").hide();
						}
						$("span.s-ico",previousSelectedTh).hide();
						$("span.s-ico",newSelectedTh).show();
					} else if (p.sortname === "") { // if p.lastsort === idxcol but p.sortname === ""
						$("span.s-ico",newSelectedTh).show();
					}
				}
				index = index.substring(5 + p.id.length + 1); // bad to be changed!?!
				p.sortname = p.colModel[idxcol].index || index;
			}
			if (!feedback.call(self, "onSortCol", p.sortname, idxcol, p.sortorder)) {
				p.lastsort = idxcol;
				return;
			}
			if(p.datatype === "local") {
				if(p.deselectAfterSort) {$(self).jqGrid("resetSelection");}
			} else {
				p.selrow = null;
				if(p.multiselect){setHeadCheckBox.call(self, false);}
				clearArray(p.selarrrow); //p.selarrrow =[];
				clearArray(p.savedRow); //p.savedRow =[];
			}
			if(p.scroll) {
				var sscroll = self.grid.bDiv.scrollLeft;
				emptyRows.call(self, true, false);
				self.grid.hDiv.scrollLeft = sscroll;
			}
			if(p.subGrid && p.datatype === 'local') {
				$("td.sgexpanded","#"+jqID(p.id)).each(function(){
					$(this).trigger("click");
				});
			}
			populate.call(self);
			p.lastsort = idxcol;
			if(p.sortname !== index && idxcol) {p.lastsort = idxcol;}
		},
		setColWidth = function () {
			var initwidth = 0, brd=jgrid.cell_width? 0: intNum(p.cellLayout,0), vc=0, lvc, scw=intNum(p.scrollOffset,0),cw,hs=false,aw,gw=0,cr;
			$.each(p.colModel, function() {
				if(this.hidden === undefined) {this.hidden=false;}
				if(p.grouping && p.autowidth) {
					var ind = $.inArray(this.name, p.groupingView.groupField);
					if(ind >= 0 && p.groupingView.groupColumnShow.length > ind) {
						this.hidden = !p.groupingView.groupColumnShow[ind];
					}
				}
				this.widthOrg = cw = intNum(this.width,0);
				if(this.hidden===false){
					initwidth += cw+brd;
					if(this.fixed) {
						gw += cw+brd;
					} else {
						vc++;
					}
				}
			});
			if(isNaN(p.width)) {
				p.width  = initwidth + ((p.shrinkToFit ===false && !isNaN(p.height)) ? scw : 0);
			}
			grid.width = p.width;
			p.tblwidth = initwidth;
			if(p.shrinkToFit ===false && p.forceFit === true) {p.forceFit=false;}
			if(p.shrinkToFit===true && vc > 0) {
				aw = grid.width-brd*vc-gw;
				if(!isNaN(p.height)) {
					aw -= scw;
					hs = true;
				}
				initwidth =0;
				$.each(p.colModel, function(i) {
					if(this.hidden === false && !this.fixed){
						cw = Math.round(aw*this.width/(p.tblwidth-brd*vc-gw));
						this.width =cw;
						initwidth += cw;
						lvc = i;
					}
				});
				cr =0;
				if (hs) {
					if(grid.width-gw-(initwidth+brd*vc) !== scw){
						cr = grid.width-gw-(initwidth+brd*vc)-scw;
					}
				} else if(!hs && Math.abs(grid.width-gw-(initwidth+brd*vc)) !== 1) {
					cr = grid.width-gw-(initwidth+brd*vc);
				}
				p.colModel[lvc].width += cr;
				p.tblwidth = initwidth+cr+brd*vc+gw;
				if(p.tblwidth > p.width) {
					p.colModel[lvc].width -= (p.tblwidth - parseInt(p.width,10));
					p.tblwidth = p.width;
				}
			}
		},
		nextVisible= function(iCol) {
			var ret = iCol, j=iCol, i;
			for (i = iCol+1;i<p.colModel.length;i++){
				if(p.colModel[i].hidden !== true ) {
					j=i; break;
				}
			}
			return j-ret;
		},
		getOffset = function (iCol) {
			var $th = $(ts.grid.headers[iCol].el), ret = [$th.position().left + $th.outerWidth()];
			if(p.direction==="rtl") { ret[0] = p.width - ret[0]; }
			ret[0] -= ts.grid.bDiv.scrollLeft;
			ret.push($(ts.grid.hDiv).position().top);
			ret.push($(ts.grid.bDiv).offset().top - $(ts.grid.hDiv).offset().top + $(ts.grid.bDiv).height());
			return ret;
		},
		getColumnHeaderIndex = function (th) {
			var i, headers = ts.grid.headers, ci = getCellIndex(th);
			for (i = 0; i < headers.length; i++) {
				if (th === headers[i].el) {
					ci = i;
					break;
				}
			}
			return ci;
		},
		colTemplate;
		if ($.inArray(p.multikey,sortkeys) === -1 ) {p.multikey = false;}
		p.keyName=false;
		for (iCol=0; iCol<p.colModel.length;iCol++) {
			colTemplate = typeof p.colModel[iCol].template === "string" ?
				(jgrid.cmTemplate != null && typeof jgrid.cmTemplate[p.colModel[iCol].template] === "object" ? jgrid.cmTemplate[p.colModel[iCol].template]: {}) :
				p.colModel[iCol].template;
			p.colModel[iCol] = $.extend(true, {}, p.cmTemplate, colTemplate || {}, p.colModel[iCol]);
			if (p.keyName === false && p.colModel[iCol].key===true) {
				p.keyName = p.colModel[iCol].name;
			}
		}
		p.sortorder = p.sortorder.toLowerCase();
		jgrid.cell_width = jgrid.cellWidth();
		if(p.grouping===true) {
			p.scroll = false;
			p.rownumbers = false;
			//p.subGrid = false; expiremental
			p.treeGrid = false;
			p.gridview = true;
		}
		if(p.treeGrid === true) {
			try { $(this).jqGrid("setTreeGrid");} catch (ignore) {}
			if(p.datatype !== "local") { p.localReader = {id: "_id_"};	}
		}
		if(p.subGrid) {
			try { $(ts).jqGrid("setSubGrid");} catch (ignore){}
		}
		if(p.multiselect) {
			p.colNames.unshift("<input role='checkbox' id='"+p.cbId+"' class='cbox' type='checkbox' aria-checked='false'/>");
			p.colModel.unshift({name:'cb',width:jgrid.cell_width ? p.multiselectWidth+p.cellLayout : p.multiselectWidth,sortable:false,resizable:false,hidedlg:true,search:false,align:'center',fixed:true});
		}
		if(p.rownumbers) {
			p.colNames.unshift("");
			p.colModel.unshift({name:'rn',width:p.rownumWidth,sortable:false,resizable:false,hidedlg:true,search:false,align:'center',fixed:true});
		}
		p.xmlReader = $.extend(true,{
			root: "rows",
			row: "row",
			page: "rows>page",
			total: "rows>total",
			records : "rows>records",
			repeatitems: true,
			cell: "cell",
			id: "[id]",
			userdata: "userdata",
			subgrid: {root:"rows", row: "row", repeatitems: true, cell:"cell"}
		}, p.xmlReader);
		p.jsonReader = $.extend(true,{
			root: "rows",
			page: "page",
			total: "total",
			records: "records",
			repeatitems: true,
			cell: "cell",
			id: "id",
			userdata: "userdata",
			subgrid: {root:"rows", repeatitems: true, cell:"cell"}
		},p.jsonReader);
		p.localReader = $.extend(true,{
			root: "rows",
			page: "page",
			total: "total",
			records: "records",
			repeatitems: false,
			cell: "cell",
			id: "id",
			userdata: "userdata",
			subgrid: {root:"rows", repeatitems: true, cell:"cell"}
		},p.localReader);
		if(p.scroll){
			p.pgbuttons = false; p.pginput=false; p.rowList=[];
		}
		if(p.data.length) { normalizeData.call(ts); refreshIndex(); }
		var thead = "<thead><tr class='ui-jqgrid-labels' role='row'>",
		tdc, idn, w, res, sort, cmi, tooltip, labelStyle,
		td, ptr, tbody, imgs,iac="",idc="",sortarr=[], sortord=[], sotmp=[];
		if(p.shrinkToFit===true && p.forceFit===true) {
			for (iCol=p.colModel.length-1;iCol>=0;iCol--){
				if(p.colModel[iCol].hidden !== true) {
					p.colModel[iCol].resizable=false;
					break;
				}
			}
		}
		if(p.viewsortcols[1] === 'horizontal') {iac=" ui-i-asc";idc=" ui-i-desc";}
		tdc = isMSIE ?  "ui-th-div-ie" :"";
		imgs = "<span class='s-ico' style='display:none'><span class='ui-grid-ico-sort ui-icon-asc"+iac+" ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-"+dir+"'></span>";
		imgs += "<span class='ui-grid-ico-sort ui-icon-desc"+idc+" ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-"+dir+"'></span></span>";
		if(p.multiSort) {
			sortarr = p.sortname.split(",");
			var iSort;
			for (iSort=0; iSort<sortarr.length; iSort++) {
				sotmp = $.trim(sortarr[iSort]).split(" ");
				sortarr[iSort] = $.trim(sotmp[0]);
				sortord[iSort] = sotmp[1] ? $.trim(sotmp[1]) : p.sortorder || "asc";
			}
		}
		for(iCol=0;iCol<p.colNames.length;iCol++){
			cmi = p.colModel[iCol];
			tooltip = p.headertitles ? (" title=\""+jgrid.stripHtml(p.colNames[iCol])+"\"") :"";
			thead += "<th id='"+p.id+"_"+cmi.name+"' role='columnheader' class='ui-state-default ui-th-column ui-th-"+dir+"'"+ tooltip+">";
			idn = cmi.index || cmi.name;
			switch (cmi.labelAlign) {
				case "left":
					labelStyle = "text-align:left;";
					break;
				case "right":
					labelStyle = "text-align:right;" + (cmi.sortable === false ? "" : "padding-right:" + p.autoResizing.widthOfVisiblePartOfSortIcon  + "px;");
					break;
				case "likeData":
					labelStyle = cmi.align === undefined || cmi.align === "left" ? 
							"text-align:left;" :
							(cmi.align === "right" ? "text-align:right;" + (cmi.sortable === false ? "" : "padding-right:" + p.autoResizing.widthOfVisiblePartOfSortIcon  + "px;") : "");
					break;
				default:
					labelStyle = "";
			}
			thead += "<div id='jqgh_"+p.id+"_"+cmi.name+"'" +
				(tdc === "" && !cmi.labelClasses ? "" : " class='" + (tdc !== "" ? tdc + " " : "") + cmi.labelClasses + "'") +
				(labelStyle === "" ? "" : " style='" + labelStyle + "'") +
				">"+
				(cmi.autoResizable && cmi.formatter !== "actions" ?
					"<span class='" + p.autoResizing.wrapperClassName + "'>" + p.colNames[iCol] + "</span>":
					p.colNames[iCol]);
			if(!cmi.width)  { cmi.width = 150; }
			else { cmi.width = parseInt(cmi.width,10); }
			if(typeof cmi.title !== "boolean") { cmi.title = true; }
			cmi.lso = "";
			if (idn === p.sortname) {
				p.lastsort = iCol;
			}
			if(p.multiSort) {
				sotmp = $.inArray(idn,sortarr);
				if( sotmp !== -1 ) {
					cmi.lso = sortord[sotmp];
				}
			}
			thead += imgs+"</div></th>";
		}
		thead += "</tr></thead>";
		imgs = null;
		$(this).append(thead);
		$("thead tr:first th",this).hover(function(){$(this).addClass('ui-state-hover');},function(){$(this).removeClass('ui-state-hover');});
		if(p.multiselect) {
			var emp=[], chk;
			$(p.cb,this).bind('click',function(){
				clearArray(p.selarrrow); // p.selarrrow = [];
				var froz = p.frozenColumns === true ? p.id + "_frozen" : "";
				if (this.checked) {
					$(ts.rows).each(function(i) {
						if (i>0) {
							if(!$(this).hasClass("ui-subgrid") && !$(this).hasClass("jqgroup") && !$(this).hasClass('ui-state-disabled') && !$(this).hasClass("jqfoot")){
								$("#jqg_"+jqID(p.id)+"_"+jqID(this.id) )[p.propOrAttr]("checked",true);
								$(this).addClass("ui-state-highlight").attr("aria-selected","true");  
								p.selarrrow.push(this.id);
								p.selrow = this.id;
								if(froz) {
									$("#jqg_"+jqID(p.id)+"_"+jqID(this.id), ts.grid.fbDiv )[p.propOrAttr]("checked",true);
									$("#"+jqID(this.id), ts.grid.fbDiv).addClass("ui-state-highlight");
								}
							}
						}
					});
					chk=true;
					emp=[];
				}
				else {
					$(ts.rows).each(function(i) {
						if(i>0) {
							if(!$(this).hasClass("ui-subgrid") && !$(this).hasClass("jqgroup") && !$(this).hasClass('ui-state-disabled') && !$(this).hasClass("jqfoot")){
								$("#jqg_"+jqID(p.id)+"_"+jqID(this.id) )[p.propOrAttr]("checked", false);
								$(this).removeClass("ui-state-highlight").attr("aria-selected","false");
								emp.push(this.id);
								if(froz) {
									$("#jqg_"+jqID(p.id)+"_"+jqID(this.id), ts.grid.fbDiv )[p.propOrAttr]("checked",false);
									$("#"+jqID(this.id), ts.grid.fbDiv).removeClass("ui-state-highlight");
								}
							}
						}
					});
					p.selrow = null;
					chk=false;
				}
				feedback.call(ts, "onSelectAll", chk ? p.selarrrow : emp, chk);
			});
		}

		if(p.autowidth===true) {
			var pw = $(eg).innerWidth();
			p.width = pw > 0?  pw: 'nw';
		}
		p.widthOrg = p.width;
		setColWidth();
		$(eg).css("width",grid.width+"px").append("<div class='ui-jqgrid-resize-mark' id='"+p.rsId+"'>&#160;</div>");
		$(p.rs).click(myResizerClickHandler).dblclick(function (e) {
			var iColIndex = $(this).data("idx"), pageX = $(this).data("pageX"), arPageX, pageX1, pageX2, cm = p.colModel[iColIndex];

			if (pageX == null) {
				return false;
			}
			arPageX = String(pageX).split(";");
			pageX1 = parseFloat(arPageX[0]);
			pageX2 = parseFloat(arPageX[1]);
			if (arPageX.length === 2 && (Math.abs(pageX1-pageX2) > 5 || Math.abs(e.pageX-pageX1) > 5 || Math.abs(e.pageX-pageX2) > 5)) {
				return false;
			}
			if (feedback.call(ts, "resizeDblClick", iColIndex, cm, e) && cm != null && cm.autoResizable) {
				$(ts).jqGrid("autoResizeColumn", iColIndex);
			}

			return false; // stop propagate
		});
		$(gv).css("width",grid.width+"px");
		thead = $("thead:first",ts).get(0);
		var	tfoot = "";
		if(p.footerrow) { tfoot += "<table role='presentation' style='width:"+p.tblwidth+"px' class='ui-jqgrid-ftable'"+(isMSIE8 ? " cellspacing='0'" : "")+"><tbody><tr role='row' class='ui-widget-content footrow footrow-"+dir+"'>"; }
		var thr = $("tr:first",thead),
		firstr = "<tr class='jqgfirstrow' role='row' style='height:auto'>";
		p.disableClick=false;
		$("th",thr).each(function ( j ) {
			w = p.colModel[j].width;
			if(p.colModel[j].resizable === undefined) {p.colModel[j].resizable = true;}
			if(p.colModel[j].resizable){
				res = document.createElement("span");
				$(res).html("&#160;").addClass('ui-jqgrid-resize ui-jqgrid-resize-'+dir)
				.css("cursor","col-resize");
				$(this).addClass(p.resizeclass);
			} else {
				res = "";
			}
			$(this).css("width",w+"px").prepend(res);
			res = null;
			var hdcol = "";
			if(p.colModel[j].hidden === true) {
				$(this).css("display","none");
				hdcol = "display:none;";
			}
			firstr += "<td role='gridcell' style='height:0;width:"+w+"px;"+hdcol+"'></td>";
			grid.headers[j] = { width: w, el: this };
			sort = p.colModel[j].sortable;
			if( typeof sort !== 'boolean') {p.colModel[j].sortable =  true; sort=true;}
			var nm = p.colModel[j].name;
			if( !(nm === 'cb' || nm==='subgrid' || nm==='rn') ) {
				if(p.viewsortcols[2]){
					$(">div",this).addClass('ui-jqgrid-sortable');
				}
			}
			if(sort) {
				if(p.multiSort) {
					if(p.viewsortcols[0]) {
						$("div span.s-ico",this).show(); 
						if(p.colModel[j].lso){ 
							$("div span.ui-icon-"+p.colModel[j].lso,this).removeClass("ui-state-disabled");
						}
					} else if( p.colModel[j].lso) {
						$("div span.s-ico",this).show();
						$("div span.ui-icon-"+p.colModel[j].lso,this).removeClass("ui-state-disabled");
					}
				} else {
					if(p.viewsortcols[0]) {$("div span.s-ico",this).show(); if(j===p.lastsort){ $("div span.ui-icon-"+p.sortorder,this).removeClass("ui-state-disabled");}}
					else if(j === p.lastsort && p.sortname !== "") {$("div span.s-ico",this).show();$("div span.ui-icon-"+p.sortorder,this).removeClass("ui-state-disabled");}
				}
			}
			if(p.footerrow) { tfoot += "<td role='gridcell' "+formatCol(j,0,'', null, '', false)+">&#160;</td>"; }
		}).mousedown(function(e) {
			if ($(e.target).closest("th>span.ui-jqgrid-resize").length !== 1) { return; }
			var ci = getColumnHeaderIndex(this);
			if(p.forceFit===true) {p.nv= nextVisible(ci);}
			grid.dragStart(ci, e, getOffset(ci));
			return false;
		}).click(function(e) {
			if (p.disableClick) {
				p.disableClick = false;
				return false;
			}
			var s = "th>div.ui-jqgrid-sortable",r,d;
			if (!p.viewsortcols[2]) { s = "th>div>span>span.ui-grid-ico-sort"; }
			var t = $(e.target).closest(s);
			if (t.length !== 1) { return; }
			var ci;
			if(p.frozenColumns) {
				var tid =  $(this)[0].id.substring( p.id.length + 1 );
				$(p.colModel).each(function(i){
					if (this.name === tid) {
						ci = i;return false;
					}
				});
			} else {
				ci = getColumnHeaderIndex(this);
			}
			if (!p.viewsortcols[2]) {
				r = true;
				d = t.hasClass("ui-icon-desc") ? "desc" : "asc";
			}
			if(ci != null){
				sortData.call(ts, $('div',this)[0].id, ci, r, d, this);
			}
			return false;
		});
		if (p.sortable && $.fn.sortable) {
			try {
				$(ts).jqGrid("sortableColumns", thr);
			} catch (ignore){}
		}
		if(p.footerrow) { tfoot += "</tr></tbody></table>"; }
		firstr += "</tr>";
		tbody = document.createElement("tbody");
		this.appendChild(tbody);
		$(this).addClass('ui-jqgrid-btable').append(firstr);
		firstr = null;
		var hTable = $("<table class='ui-jqgrid-htable' style='width:"+p.tblwidth+"px' role='presentation' aria-labelledby='gbox_"+this.id+"'"+(isMSIE8 ? " cellspacing='0'" : "")+"></table>").append(thead),
		hg = (p.caption && p.hiddengrid===true) ? true : false,
		hb = $("<div class='ui-jqgrid-hbox" + (dir==="rtl" ? "-rtl" : "" )+"'></div>");
		thead = null;
		grid.hDiv = document.createElement("div");
		$(grid.hDiv)
			.css({ width: grid.width+"px"})
			.addClass("ui-state-default ui-jqgrid-hdiv")
			.append(hb);
		$(hb).append(hTable);
		hTable = null;
		if(hg) { $(grid.hDiv).hide(); }
		if(p.pager){
			// see http://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
			// or http://api.jquery.com/id-selector/ or http://api.jquery.com/category/selectors/
			// about the requirement to escape characters like '.', ':' or some other in case.
			var $pager, pagerId;
			if (typeof p.pager === "string" && p.pager.substr(0,1) !== "#") {
				pagerId = p.pager; // UNESCAPED id of the pager
				$pager = $("#" + jqID(p.pager));
			} else {
				$pager = $(p.pager); // jQuery wrapper or ESCAPED id selector
				pagerId = $pager.attr("id");
			}
			if ($pager.length > 0) {
				$pager.css({width: grid.width+"px"}).addClass('ui-state-default ui-jqgrid-pager ui-corner-bottom').appendTo(eg);
				if(hg) {$pager.hide();}
				setPager(pagerId,'');
				p.pager = "#" + jqID(pagerId); // hold ESCAPED id selector in the pager
			} else {
				p.pager = ""; // clear wrong value of the pager option
			}
		}
		if( p.cellEdit === false && p.hoverrows === true) {
		$(ts).bind('mouseover',function(e) {
			ptr = $(e.target).closest("tr.jqgrow");
			if($(ptr).attr("class") !== "ui-subgrid") {
				$(ptr).addClass("ui-state-hover");
			}
		}).bind('mouseout',function(e) {
			ptr = $(e.target).closest("tr.jqgrow");
			$(ptr).removeClass("ui-state-hover");
		});
		}
		var ri,ci, tdHtml;
		$(ts).before(grid.hDiv).click(function(e) {
			td = e.target;
			ptr = $(td,ts.rows).closest("tr.jqgrow");
			if($(ptr).length === 0 || ptr[0].className.indexOf( 'ui-state-disabled' ) > -1 || ($(td,ts).closest("table.ui-jqgrid-btable").attr('id') || '').replace("_frozen","") !== ts.id ) {
				return this;
			}
			var scb = $(td).hasClass("cbox"), cSel = feedback.call(ts, "beforeSelectRow", ptr[0].id, e);
			if (td.tagName === 'A' || ((td.tagName === 'INPUT' || td.tagName === 'TEXTAREA' || td.tagName === 'OPTION' || td.tagName === 'SELECT' ) && !scb) ) { return; }
			ri = ptr[0].id;
			td = $(td).closest("tr.jqgrow>td");
			if (td.length > 0) {
				ci = getCellIndex(td);
				tdHtml = $(td).closest("td,th").html();
				feedback.call(ts, "onCellSelect", ri, ci, tdHtml, e);
			}
			if(p.cellEdit === true) {
				if(p.multiselect && scb && cSel){
					$(ts).jqGrid("setSelection", ri ,true,e);
				} else if (td.length > 0) {
					ri = ptr[0].rowIndex;
					try {$(ts).jqGrid("editCell",ri,ci,true);} catch (ignore) {}
				}
				return;
			}
			if (!cSel) {
				return;
			}
			if ( !p.multikey ) {
				if(p.multiselect && p.multiboxonly) {
					if(scb){$(ts).jqGrid("setSelection",ri,true,e);}
					else {
						var frz = p.frozenColumns ? p.id+"_frozen" : "";
						$(p.selarrrow).each(function(i,n){
							var trid = $(ts).jqGrid('getGridRowById',n);
							if(trid) { $( trid ).removeClass("ui-state-highlight"); }
							$("#jqg_"+jqID(p.id)+"_"+jqID(n))[p.propOrAttr]("checked", false);
							if(frz) {
								$("#"+jqID(n), "#"+jqID(frz)).removeClass("ui-state-highlight");
								$("#jqg_"+jqID(p.id)+"_"+jqID(n), "#"+jqID(frz))[p.propOrAttr]("checked", false);
							}
						});
						clearArray(p.selarrrow); // p.selarrrow = [];
						$(ts).jqGrid("setSelection",ri,true,e);
					}
				} else {
					$(ts).jqGrid("setSelection",ri,true,e);
				}
			} else {
				if(e[p.multikey]) {
					$(ts).jqGrid("setSelection",ri,true,e);
				} else if(p.multiselect && scb) {
					scb = $("#jqg_"+jqID(p.id)+"_"+ri).is(":checked");
					$("#jqg_"+jqID(p.id)+"_"+ri)[propOrAttr]("checked", scb);
				}
			}
		}).bind('reloadGrid', function(e,opts) {
		    var self = this, gridSelf = self.grid, $self = $(this);
			if (p.treeGrid === true) {
				p.datatype = p.treedatatype;
			}
			if (p.datatype === "local" && p.dataTypeOrg && p.loadonce && opts.fromServer) {
				p.datatype = p.dataTypeOrg;
				delete p.dataTypeOrg;
			}
			if (opts && opts.current) {
				gridSelf.selectionPreserver.call(self);
			}
			if(p.datatype==="local"){ $self.jqGrid("resetSelection");  if(p.data.length) { normalizeData.call(self); refreshIndex();} }
			else if(!p.treeGrid) {
				p.selrow=null;
				if(p.multiselect) {
					clearArray(p.selarrrow); // p.selarrrow = [];
					setHeadCheckBox.call(self, false);
				}
				clearArray(p.savedRow); // p.savedRow = [];
			}
			if(p.scroll) {emptyRows.call(self, true, false);}
			if (opts && opts.page) {
				var page = parseInt(opts.page, 10);
				if (page > p.lastpage) { page = p.lastpage; }
				if (page < 1) { page = 1; }
				p.page = page;
				if (gridSelf.prevRowHeight) {
					gridSelf.bDiv.scrollTop = (page - 1) * gridSelf.prevRowHeight * p.rowNum;
				} else {
					gridSelf.bDiv.scrollTop = 0;
				}
			}
			if (gridSelf.prevRowHeight && p.scroll) {
				delete p.lastpage;
				gridSelf.populateVisible.call(self);
			} else {
				gridSelf.populate.call(self);
			}
			if(p._inlinenav===true) {$self.jqGrid('showAddEditButtons');}
			return false;
		})
		.dblclick(function(e) {
			td = e.target;
			ptr = $(td,ts.rows).closest("tr.jqgrow");
			if($(ptr).length === 0 ){return;}
			ri = ptr[0].rowIndex;
			ci = getCellIndex(td);
			if (!feedback.call(ts, "ondblClickRow", $(ptr).attr("id"), ri, ci, e)) {
				return false; // e.preventDefault() and e.stopPropagation() together
			}
		})
		.bind('contextmenu', function(e) {
			td = e.target;
			ptr = $(td,ts.rows).closest("tr.jqgrow");
			if($(ptr).length === 0 ){return;}
			if(!p.multiselect) {	$(ts).jqGrid("setSelection",ptr[0].id,true,e);	}
			ri = ptr[0].rowIndex;
			ci = getCellIndex(td);
			if (!feedback.call(ts, "onRightClickRow", $(ptr).attr("id"), ri, ci, e)) {
				return false; // e.preventDefault() and e.stopPropagation() together
			}
		});
		grid.bDiv = document.createElement("div");
		if(isMSIE) { if(String(p.height).toLowerCase() === "auto") { p.height = "100%"; } }
		$(grid.bDiv)
			.append($('<div style="position:relative;'+(isMSIE8 ? "height:0.01%;" : "")+'"></div>').append('<div></div>').append(ts))
			.addClass("ui-jqgrid-bdiv")
			.css({ height: p.height+(isNaN(p.height)?"":"px"), width: (grid.width)+"px"})
			.scroll(grid.scrollGrid);
		$(ts).css({width:p.tblwidth+"px"});
		if( !$.support.tbody ) { //IE
			if( $(">tbody",this).length === 2 ) { $(">tbody:gt(0)",this).remove();}
		}
		if(p.multikey){
			if( jgrid.msie) {
				$(grid.bDiv).bind("selectstart",function(){return false;});
			} else {
				$(grid.bDiv).bind("mousedown",function(){return false;});
			}
		}
		if(hg) {$(grid.bDiv).hide();}
		grid.cDiv = document.createElement("div");
		var arf = p.hidegrid===true ? $("<a role='link' class='ui-jqgrid-titlebar-close ui-corner-all HeaderButton' " + (p.showhide ? "title='"+p.showhide+"'" : "")+" />").hover(
			function(){ arf.addClass('ui-state-hover');},
			function() {arf.removeClass('ui-state-hover');})
		.append("<span class='ui-icon ui-icon-circle-triangle-n'></span>").css((dir==="rtl"?"left":"right"),"0") : "";
		$(grid.cDiv).append(arf).append("<span class='ui-jqgrid-title'>"+p.caption+"</span>")
		.addClass("ui-jqgrid-titlebar ui-jqgrid-caption"+(dir==="rtl" ? "-rtl" :"" )+" ui-widget-header ui-corner-top ui-helper-clearfix");
		$(grid.cDiv).insertBefore(grid.hDiv);
		if( p.toolbar[0] ) {
			grid.uDiv = document.createElement("div");
			if(p.toolbar[1] === "top") {$(grid.uDiv).insertBefore(grid.hDiv);}
			else if (p.toolbar[1]==="bottom" ) {$(grid.uDiv).insertAfter(grid.hDiv);}
			if(p.toolbar[1]==="both") {
				grid.ubDiv = document.createElement("div");
				$(grid.uDiv).addClass("ui-userdata ui-state-default").attr("id","t_"+this.id).insertBefore(grid.hDiv);
				$(grid.ubDiv).addClass("ui-userdata ui-state-default").attr("id","tb_"+this.id).insertAfter(grid.hDiv);
				if(hg)  {$(grid.ubDiv).hide();}
			} else {
				$(grid.uDiv).width(grid.width).addClass("ui-userdata ui-state-default").attr("id","t_"+this.id);
			}
			if(hg) {$(grid.uDiv).hide();}
		}
		p.datatype = p.datatype.toLowerCase();
		if(p.toppager) {
			p.toppager = p.id+"_toppager";
			grid.topDiv = $("<div id='"+p.toppager+"'></div>")[0];
			$(grid.topDiv).addClass('ui-state-default ui-jqgrid-toppager').css({width: grid.width+"px"}).insertBefore(grid.hDiv);
			setPager(p.toppager,'_t');
			p.toppager = "#"+jqID(p.toppager); // hold ESCAPED id selector in the toppager option
		} else if (p.pager === "" && !p.scroll) {
			p.rowNum = p.maxRowNum;
		}
		if(p.footerrow) {
			grid.sDiv = $("<div class='ui-jqgrid-sdiv'></div>")[0];
			hb = $("<div class='ui-jqgrid-hbox"+(dir==="rtl"?"-rtl":"")+"'></div>");
			$(grid.sDiv).append(hb).width(grid.width).insertAfter(grid.hDiv);
			$(hb).append(tfoot);
			grid.footers = $(".ui-jqgrid-ftable",grid.sDiv)[0].rows[0].cells;
			if(p.rownumbers) { grid.footers[0].className = 'ui-state-default jqgrid-rownum'; }
			if(hg) {$(grid.sDiv).hide();}
		}
		hb = null;
		if(p.caption) {
			var tdt = p.datatype;
			if(p.hidegrid===true) {
				$(".ui-jqgrid-titlebar-close",grid.cDiv).click( function(e){
					var elems = ".ui-jqgrid-bdiv,.ui-jqgrid-hdiv,.ui-jqgrid-pager,.ui-jqgrid-sdiv",
					counter, self = this;
					if(p.toolbar[0]===true) {
						if( p.toolbar[1]==='both') {
							elems += ',#' + jqID($(grid.ubDiv).attr('id'));
						}
						elems += ',#' + jqID($(grid.uDiv).attr('id'));
					}
					counter = $(elems, p.gView).length;
					if(p.toppager) {
						elems += ',' + p.toppager;
					}

					if(p.gridstate === 'visible') {
						$(elems, p.gBox).slideUp("fast", function() {
							counter--;
							if (counter === 0) {
								$("span",self).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s");
								p.gridstate = 'hidden';
								if($(p.gBox).hasClass("ui-resizable")) { $(".ui-resizable-handle",p.gBox).hide(); }
								$(grid.cDiv).addClass("ui-corner-bottom");
								if (!hg) { feedback.call(ts, "onHeaderClick", p.gridstate, e); }
							}
						});
					} else if(p.gridstate === 'hidden'){
						$(grid.cDiv).removeClass("ui-corner-bottom");
						$(elems,p.gBox).slideDown("fast", function() {
							counter--;
							if (counter === 0) {
								$("span",self).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n");
								if(hg) {p.datatype = tdt;populate.call(ts);hg=false;}
								p.gridstate = 'visible';
								if($(p.gBox).hasClass("ui-resizable")) { $(".ui-resizable-handle",p.gBox).show(); }
								if (!hg) { feedback.call(ts, "onHeaderClick", p.gridstate, e); }
							}
						});
					}
					return false;
				});
				if(hg) {p.datatype="local"; $(".ui-jqgrid-titlebar-close",grid.cDiv).trigger("click");}
			}
		} else {
			$(grid.cDiv).hide();
			$(grid.cDiv).nextAll("div:visible").filter(":first").addClass('ui-corner-top'); // set on top toolbar or toppager or on hDiv
		}
		$(grid.hDiv).after(grid.bDiv)
		.mousemove(function (e) {
			if(grid.resizing){grid.dragMove(e);return false;}
		});
		$(eg).click(myResizerClickHandler).dblclick(function (e) { // it's still needed for Firefox
			var arPageX, pageX1, pageX2,
				$resizer = $(p.rs),
				resizerOffset = $resizer.offset(),
				iColIndex = $resizer.data("idx"),
				cm = p.colModel[iColIndex],
				pageX = $(this).data("pageX") || $resizer.data("pageX");

			if (pageX == null) {
				return false;
			}
			arPageX = String(pageX).split(";");
			pageX1 = parseFloat(arPageX[0]);
			pageX2 = parseFloat(arPageX[1]);
			if (arPageX.length === 2 && (Math.abs(pageX1-pageX2) > 5 || Math.abs(e.pageX-pageX1) > 5 || Math.abs(e.pageX-pageX2) > 5)) {
				return false;
			}
				
			if (feedback.call(ts, "resizeDblClick", iColIndex, cm) &&
					(resizerOffset.left - 1 <= e.pageX && e.pageX <= resizerOffset.left + $resizer.outerWidth() + 1) && cm != null && cm.autoResizable) {
				$(ts).jqGrid("autoResizeColumn", iColIndex);
			}
			return false;
		});
		if (!p.pager) {
			$(grid.cDiv).nextAll("div:visible").filter(":last").addClass('ui-corner-bottom'); // set on bottom toolbar or footer (sDiv) or on bDiv
		}
		$(".ui-jqgrid-labels",grid.hDiv).bind("selectstart", function () { return false; });
		$(document).bind( "mouseup.jqGrid" + p.id, function () {
			if (grid.resizing !== false) {
				grid.dragEnd();
				return false;
			}
			return true;
		});
		ts.formatCol = formatCol;
		ts.sortData = sortData;
		ts.updatepager = updatepager;
		ts.refreshIndex = refreshIndex;
		ts.setHeadCheckBox = setHeadCheckBox;
		ts.constructTr = constructTr;
		ts.formatter = function ( rowId, cellval , colpos, rwdat, act){return formatter(rowId, cellval , colpos, rwdat, act);};
		$.extend(grid,{populate : populate, emptyRows: emptyRows, beginReq: beginReq, endReq: endReq});
		ts.addXmlData = function(d) {addXmlData.call(ts,d);};
		ts.addJSONData = function(d) {addJSONData.call(ts,d);};
		this.grid.cols = this.rows[0].cells;
		feedback.call(ts, "onInitGrid");

		populate.call(ts);p.hiddengrid=false;
	});
};
$.jgrid.extend({
	getGridParam : function(pName) {
		var $t = this[0];
		if (!$t || !$t.grid) {return null;}
		if (!pName) { return $t.p; }
		return $t.p[pName] !== undefined ? $t.p[pName] : null;
	},
	setGridParam : function (newParams, overwrite){
		return this.each(function(){
			var self = this;
			if(overwrite == null) {
				overwrite = false;
			}
			if (self.grid && typeof newParams === 'object') {
				if(overwrite === true) {
					var params = $.extend({}, self.p, newParams);
					self.p = params;
				} else {
					$.extend(true,self.p,newParams);
				}
			}
		});
	},
	getGridRowById: function ( rowid ) {
		if (rowid == null) {
			return null;
		}
		var row, rowId = rowid.toString();
		this.each( function(){
			var i, rows = this.rows, tr;
			try {
				//row = this.rows.namedItem( rowid );
				i = rows.length;
				while(i--) {
					tr = rows[i];
					if( rowId === tr.id) {
						row = tr;
						break;
					}
				}
			} catch ( e ) {
				row = $(this.grid.bDiv).find( "#" + $.jgrid.jqID( rowid ));
				row = row.length > 0 ? row[0] : null;
			}
		});
		return row;
	},
	getDataIDs : function () {
		var ids=[];
		this.each(function(){
			var rows = this.rows, len = rows.length, i, tr;
			if(len && len>0){
				for (i=0; i<len; i++) {
					tr = rows[i];
					if($(tr).hasClass('jqgrow')) {
						ids.push(tr.id);
					}
				}
			}
		});
		return ids;
	},
	setSelection : function(selection,onsr, e) {
		return this.each(function(){
			var $t = this, p = $t.p, stat,pt, ner, ia, tpsr, fid, csr, jgrid = $.jgrid, jqID = jgrid.jqID, feedback = jgrid.feedback;
			if(selection === undefined) { return; }
			onsr = onsr === false ? false : true;
			pt=$($t).jqGrid('getGridRowById', selection);
			if(!pt || !pt.className || pt.className.indexOf( 'ui-state-disabled' ) > -1 ) { return; }
			function scrGrid(tr, bDiv){
				var ch = bDiv.clientHeight,
				st = bDiv.scrollTop,
				rpos = $(tr).position().top,
				rh = tr.clientHeight;
				if(rpos+rh >= ch+st) {bDiv.scrollTop = rpos-(ch+st)+rh+st; }
				else if(rpos < ch+st) {
					if(rpos < st) {
						bDiv.scrollTop = rpos;
					}
				}
			}
			if(p.scrollrows===true) {
				ner = $($t).jqGrid('getGridRowById',selection).rowIndex;
				if(ner >=0 ){
					scrGrid($t.rows[ner], $t.grid.bDiv);
				}
			}
			if(p.frozenColumns === true ) {
				fid = p.id+"_frozen";
			}
			if(!p.multiselect) {	
				if(pt.className !== "ui-subgrid") {
					if( p.selrow !== pt.id ) {
						if (p.selrow !== null) {
							csr = $($t).jqGrid('getGridRowById', p.selrow);
							if( csr ) {
								$(  csr ).removeClass("ui-state-highlight").attr({"aria-selected":"false", "tabindex" : "-1"});
							}
						}
						$(pt).addClass("ui-state-highlight").attr({"aria-selected":"true", "tabindex" : "0"});//.focus();
						if(fid) {
							$("#"+jqID(p.selrow), "#"+jqID(fid)).removeClass("ui-state-highlight");
							$("#"+jqID(selection), "#"+jqID(fid)).addClass("ui-state-highlight");
						}
						stat = true;
					} else {
						stat = false;
					}
					p.selrow = pt.id;
					if( onsr ) {
						feedback.call($t, "onSelectRow", pt.id, stat, e);
					}
				}
			} else {
				//unselect selectall checkbox when deselecting a specific row
				$t.setHeadCheckBox(false);
				p.selrow = pt.id;
				ia = $.inArray(p.selrow,p.selarrrow);
				if (  ia === -1 ){
					if(pt.className !== "ui-subgrid") { $(pt).addClass("ui-state-highlight").attr("aria-selected","true");}
					stat = true;
					p.selarrrow.push(p.selrow);
				} else {
					if(pt.className !== "ui-subgrid") { $(pt).removeClass("ui-state-highlight").attr("aria-selected","false");}
					stat = false;
					p.selarrrow.splice(ia,1);
					tpsr = p.selarrrow[0];
					p.selrow = (tpsr === undefined) ? null : tpsr;
				}
				$("#jqg_"+jqID(p.id)+"_"+jqID(pt.id))[p.propOrAttr]("checked",stat);
				if(fid) {
					if(ia === -1) {
						$("#"+jqID(selection), "#"+jqID(fid)).addClass("ui-state-highlight");
					} else {
						$("#"+jqID(selection), "#"+jqID(fid)).removeClass("ui-state-highlight");
					}
					$("#jqg_"+jqID(p.id)+"_"+jqID(selection), "#"+jqID(fid))[p.propOrAttr]("checked",stat);
				}
				if( onsr ) {
					feedback.call($t, "onSelectRow", pt.id, stat, e);
				}
			}
		});
	},
	resetSelection : function( rowid ){
		return this.each(function(){
			var t = this, p = t.p, sr, frozenColumns = p.frozenColumns === true, jgrid = $.jgrid, clearArray = jgrid.clearArray,
			jqID = jgrid.jqID, gridIdEscaped = jqID(p.id), gridIdSelector = p.idSel,
			fid = p.id+"_frozen", gridIdFrozenSelector = "#"+jqID(fid);
			if( p.frozenColumns === true ) {
				fid = p.id+"_frozen";
			}
			if(rowid !== undefined ) {
				sr = rowid === p.selrow ? p.selrow : rowid;
				$(gridIdSelector+">tbody>tr#"+jqID(sr)).removeClass("ui-state-highlight").attr("aria-selected","false");
				if (frozenColumns) { $("#"+jqID(sr), gridIdFrozenSelector).removeClass("ui-state-highlight"); }
				if(p.multiselect) {
					$("#jqg_"+jqID(p.id)+"_"+jqID(sr), gridIdSelector)[p.propOrAttr]("checked",false);
					if(frozenColumns) { $("#jqg_"+gridIdEscaped+"_"+jqID(sr), gridIdFrozenSelector)[p.propOrAttr]("checked",false); }
					t.setHeadCheckBox(false);
					var ia = $.inArray(jqID(sr), p.selarrrow);
					if (ia !== -1) {
						p.selarrrow.splice(ia,1);
					}
				}
				sr = null;
			} else if(!p.multiselect) {
				if(p.selrow) {
					$(gridIdSelector+">tbody>tr#"+jqID(p.selrow)).removeClass("ui-state-highlight").attr("aria-selected","false");
					if(frozenColumns) { $("#"+jqID(p.selrow), gridIdFrozenSelector).removeClass("ui-state-highlight"); }
					p.selrow = null;
				}
			} else {
				$(p.selarrrow).each(function(i,n){
					var selRowIdEscaped = jqID(n);
					$( $(t).jqGrid('getGridRowById',n) ).removeClass("ui-state-highlight").attr("aria-selected","false");
					$("#jqg_"+gridIdEscaped+"_"+selRowIdEscaped)[p.propOrAttr]("checked",false);
					if(frozenColumns) { 
						$("#"+selRowIdEscaped, gridIdFrozenSelector).removeClass("ui-state-highlight"); 
						$("#jqg_"+gridIdEscaped+"_"+selRowIdEscaped, gridIdFrozenSelector)[p.propOrAttr]("checked",false);
					}
				});
				t.setHeadCheckBox(false);
				clearArray(p.selarrrow); // p.selarrrow = [];
				p.selrow = null;
			}
			if(p.cellEdit === true) {
				if(parseInt(p.iCol,10)>=0  && parseInt(p.iRow,10)>=0) {
					$("td:eq("+p.iCol+")",t.rows[p.iRow]).removeClass("edit-cell ui-state-highlight");
					$(t.rows[p.iRow]).removeClass("selected-row ui-state-hover");
				}
			}
			clearArray(p.savedRow); // p.savedRow = [];
		});
	},
	getRowData : function( rowid ) {
		var res = {}, resall;
		this.each(function(){
			var $t = this, p = $t.p, getall=false, ind, len = 2, j=0, rows = $t.rows;
			if(rowid === undefined) {
				getall = true;
				resall = [];
				len = rows.length;
			} else {
				ind = $($t).jqGrid('getGridRowById', rowid);
				if(!ind) { return res; }
			}
			while(j<len){
				if(getall) { ind = rows[j]; }
				if( $(ind).hasClass('jqgrow') ) {
					$('td[role="gridcell"]',ind).each( function(i) {
						var cm = p.colModel[i], nm = cm.name;
						if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn') {
							if(p.treeGrid===true && nm === p.ExpandColumn) {
								res[nm] = $.jgrid.htmlDecode($("span",this).filter(":first").html());
							} else {
								try {
									res[nm] = $.unformat.call($t,this,{rowId:ind.id, colModel:cm},i);
								} catch (exception){
									res[nm] = $.jgrid.htmlDecode($(this).html());
								}
							}
						}
					});
					if(getall) { resall.push(res); res={}; }
				}
				j++;
			}
		});
		return resall || res;
	},
	delRowData : function(rowid) {
		var success = false, rowInd, ia, nextRow;
		this.each(function() {
			var $t = this, p = $t.p;
			rowInd = $($t).jqGrid('getGridRowById', rowid);
			if(!rowInd) {return false;}
				if(p.subGrid) {
					nextRow = $(rowInd).next();
					if(nextRow.hasClass('ui-subgrid')) {
						nextRow.remove();
					}
				}
				$(rowInd).remove();
				p.records--;
				p.reccount--;
				$t.updatepager(true,false);
				success=true;
				if(p.multiselect) {
					ia = $.inArray(rowid,p.selarrrow);
					if(ia !== -1) { p.selarrrow.splice(ia,1);}
				}
				if (p.multiselect && p.selarrrow.length > 0) {
					p.selrow = p.selarrrow[p.selarrrow.length-1];
				} else {
					p.selrow = null;
				}
			if(p.datatype === 'local') {
				var id = $.jgrid.stripPref(p.idPrefix, rowid),
				pos = p._index[id];
				if(pos !== undefined) {
					p.data.splice(pos,1);
					$t.refreshIndex();
				}
			}
			if( p.altRows === true && success ) {
				var cn = p.altclass;
				$($t.rows).each(function(i){
					if(i % 2 === 1) { $(this).addClass(cn); }
					else { $(this).removeClass(cn); }
				});
			}
		});
		return success;
	},
	setRowData : function(rowid, data, cssp) {
		var success=true;
		this.each(function(){
			var t = this, p = t.p, vl, ind, cp = typeof cssp, lcdata={};
			if(!t.grid) {return false;}
			ind = $(t).jqGrid('getGridRowById', rowid);
			if(!ind) { return false; }
			if( data ) {
				try {
					$(p.colModel).each(function(i){
						var cm = this, nm = cm.name, title;
						var dval =$.jgrid.getAccessor(data,nm);
						if( dval !== undefined) {
							lcdata[nm] = cm.formatter && typeof cm.formatter === 'string' && cm.formatter === 'date' ? $.unformat.date.call(t,dval,cm) : dval;
							vl = t.formatter( rowid, lcdata[nm], i, data, 'edit');
							title = cm.title ? {"title":$.jgrid.stripHtml(vl)} : {};
							if(p.treeGrid===true && nm === p.ExpandColumn) {
								$("td[role='gridcell']:eq("+i+") > span:first",ind).html(vl).attr(title);
							} else {
								$("td[role='gridcell']:eq("+i+")",ind).html(vl).attr(title);
							}
						}
					});
					if(p.datatype === 'local') {
						var id = $.jgrid.stripPref(p.idPrefix, rowid),
						pos = p._index[id], key;
						if(p.treeGrid) {
							for(key in p.treeReader){
								if(p.treeReader.hasOwnProperty(key)) {
									delete lcdata[p.treeReader[key]];
								}
							}
						}
						if(pos !== undefined) {
							p.data[pos] = $.extend(true, p.data[pos], lcdata);
						}
						lcdata = null;
					}
				} catch (exception) {
					success = false;
				}
			}
			if(success) {
				if(cp === 'string') {$(ind).addClass(cssp);} else if(cssp !== null && cp === 'object') {$(ind).css(cssp);}
				$(t).triggerHandler("jqGridAfterGridComplete");
			}
		});
		return success;
	},
	addRowData : function(rowid,rdata,pos,src) {
		if(["first", "last", "before", "after"].indexOf(pos) === -1) {pos = "last";}
		var success = false, nm, row, gi, si, ni,sind, i, v, prp="", aradd, cnm, cn, data, cm, id;
		if(rdata) {
			if($.isArray(rdata)) {
				aradd=true;
				//pos = "last";
				cnm = rowid;
			} else {
				rdata = [rdata];
				aradd = false;
			}
			this.each(function() {
				var t = this, p = t.p, datalen = rdata.length, jgrid = $.jgrid, feedback = jgrid.feedback, randId = jgrid.randId;
				ni = p.rownumbers===true ? 1 :0;
				gi = p.multiselect ===true ? 1 :0;
				si = p.subGrid===true ? 1 :0;
				if(!aradd) {
					if(rowid !== undefined) { rowid = String(rowid);}
					else {
						rowid = randId();
						if(p.keyName !== false) {
							cnm = p.keyName;
							if(rdata[0][cnm] !== undefined) { rowid = rdata[0][cnm]; }
						}
					}
				}
				cn = p.altclass;
				var k = 0, cna ="", lcdata = {};
				while(k < datalen) {
					data = rdata[k];
					row=[];
					if(aradd) {
						try {
							rowid = data[cnm];
							if(rowid===undefined) {
								rowid = randId();
							}
						}
						catch (exception) {rowid = randId();}
						cna = p.altRows === true ?  (t.rows.length-1)%2 === 0 ? cn : "" : "";
					}
					id = rowid;
					rowid  = p.idPrefix + rowid;
					if(ni){
						prp = t.formatCol(0,1,'',null,rowid, true);
						row.push("<td role=\"gridcell\" class=\"ui-state-default jqgrid-rownum\" "+prp+">0</td>");
					}
					if(gi) {
						v = "<input role=\"checkbox\" type=\"checkbox\""+" id=\"jqg_"+p.id+"_"+rowid+"\" class=\"cbox\" aria-checked=\"false\"/>";
						prp = t.formatCol(ni,1,'', null, rowid, true);
						row.push("<td role=\"gridcell\" "+prp+">"+v+"</td>");
					}
					if(si) {
						row.push($(t).jqGrid("addSubGridCell",gi+ni,1));
					}
					for(i = gi+si+ni; i < p.colModel.length;i++){
						cm = p.colModel[i];
						nm = cm.name;
						lcdata[nm] = data[nm];
						v = t.formatter( rowid, $.jgrid.getAccessor(data,nm), i, data );
						prp = t.formatCol(i,1,v, data, rowid, lcdata);
						row.push("<td role=\"gridcell\" "+prp+">"+v+"</td>");
					}
					row.unshift(t.constructTr(rowid, false, cna, lcdata, data, false));
					row.push("</tr>");
					row = row.join('');
					if(t.rows.length === 0){
						$("table:first",t.grid.bDiv).append(row);
					} else {
						switch (pos) {
							case 'last':
								$(t.rows[t.rows.length-1]).after(row);
								sind = t.rows.length-1;
								break;
							case 'first':
								$(t.rows[0]).after(row);
								sind = 1;
								break;
							case 'after':
								sind = $(t).jqGrid('getGridRowById', src);
								if (sind) {
									if ($(t.rows[sind.rowIndex+1]).hasClass("ui-subgrid")) {
										$(t.rows[sind.rowIndex+1]).after(row);
										sind=sind.rowIndex + 2;
									} else {
										$(sind).after(row);
										sind=sind.rowIndex + 1;
									}
								}	
								break;
							case 'before':
								sind = $(t).jqGrid('getGridRowById', src);
								if(sind) {
									$(sind).before(row);
									sind=sind.rowIndex - 1;
								}
								break;
						}
					}
					if(p.subGrid===true) {
						$(t).jqGrid("addSubGrid",gi+ni, sind);
					}
					p.records++;
					p.reccount++;
					feedback.call(t, "afterInsertRow", rowid, data, data);
					k++;
					if(p.datatype === 'local') {
						lcdata[p.localReader.id] = id;
						p._index[id] = p.data.length;
						p.data.push(lcdata);
						lcdata = {};
					}
				}
				if( p.altRows === true && !aradd) {
					if (pos === "last") {
						if ((t.rows.length-1)%2 === 1)  {$(t.rows[t.rows.length-1]).addClass(cn);}
					} else {
						$(t.rows).each(function(i){
							if(i % 2 ===1) { $(this).addClass(cn); }
							else { $(this).removeClass(cn); }
						});
					}
				}
				t.updatepager(true,true);
				success = true;
			});
		}
		return success;
	},
	footerData : function(action,data, format) {
		var nm, success=false, res={}, title;
		function isEmpty(obj) {
			var i;
			for(i in obj) {
				if (obj.hasOwnProperty(i)) { return false; }
			}
			return true;
		}
		if(action === undefined) { action = "get"; }
		if(typeof format !== "boolean") { format  = true; }
		action = action.toLowerCase();
		this.each(function(){
			var t = this, p = t.p, vl;
			if(!t.grid || !p.footerrow) {return false;}
			if(action === "set") { if(isEmpty(data)) { return false; } }
			success=true;
			$(p.colModel).each(function(i){
				nm = this.name;
				if(action === "set") {
					if( data[nm] !== undefined) {
						vl = format ? t.formatter( "", data[nm], i, data, 'edit') : data[nm];
						title = this.title ? {"title":$.jgrid.stripHtml(vl)} : {};
						$("tr.footrow td:eq("+i+")",t.grid.sDiv).html(vl).attr(title);
						success = true;
					}
				} else if(action === "get") {
					res[nm] = $("tr.footrow td:eq("+i+")",t.grid.sDiv).html();
				}
			});
		});
		return action === "get" ? res : success;
	},
	showHideCol : function(colname,show) {
		return this.each(function() {
			var $t = this, fndh=false, p = $t.p, jgrid = $.jgrid, feedback = jgrid.feedback,
			brd=jgrid.cell_width ? 0: p.cellLayout, cw;
			if (!$t.grid ) {return;}
			if( typeof colname === 'string') {colname=[colname];}
			show = show !== "none" ? "" : "none";
			var sw = show === "" ? true :false,
			gh = p.groupHeader && (typeof p.groupHeader === 'object' || $.isFunction(p.groupHeader) );
			if(gh) { $($t).jqGrid('destroyGroupHeader', false); }
			$(p.colModel).each(function(i) {
				if ($.inArray(this.name,colname) !== -1 && this.hidden === sw) {
					if(p.frozenColumns === true && this.frozen === true) {
						return true;
					}
					$("tr[role=row]",$t.grid.hDiv).each(function(){
						$(this.cells[i]).css("display", show);
					});
					$($t.rows).each(function(){
						if (!$(this).hasClass("jqgroup")) {
							$(this.cells[i]).css("display", show);
						}
					});
					if(p.footerrow) { $("tr.footrow td:eq("+i+")", $t.grid.sDiv).css("display", show); }
					cw =  parseInt(this.width,10);
					if(show === "none") {
						p.tblwidth -= cw+brd;
					} else {
						p.tblwidth += cw+brd;
					}
					this.hidden = !sw;
					fndh=true;
					feedback.call($t, "onShowHideCol", sw, this.name, i);
				}
			});
			if(fndh===true) {
				if(p.shrinkToFit === true && !isNaN(p.height)) { p.tblwidth += parseInt(p.scrollOffset,10);}
				$($t).jqGrid("setGridWidth",p.shrinkToFit === true ? p.tblwidth : p.width );
			}
			if( gh )  {
				$($t).jqGrid('setGroupHeaders',p.groupHeader);
			}
		});
	},
	hideCol : function (colname) {
		return this.each(function(){$(this).jqGrid("showHideCol",colname,"none");});
	},
	showCol : function(colname) {
		return this.each(function(){$(this).jqGrid("showHideCol",colname,"");});
	},
	remapColumns : function(permutation, updateCells, keepHeader)
	{
		function resortArray(a) {
			var ac;
			if (a.length) {
				ac = $.makeArray(a);
			} else {
				ac = $.extend({}, a);
			}
			$.each(permutation, function(i) {
				a[i] = ac[this];
			});
		}
		var ts = this.get(0), p = ts.p, grid = ts.grid;
		function resortRows(parent, clobj) {
			$(">tr"+(clobj||""), parent).each(function() {
				var row = this;
				var elems = $.makeArray(row.cells);
				$.each(permutation, function() {
					var e = elems[this];
					if (e) {
						row.appendChild(e);
					}
				});
			});
		}
		resortArray(p.colModel);
		resortArray(p.colNames);
		resortArray(grid.headers);
		resortRows($("thead:first", grid.hDiv), keepHeader && ":not(.ui-jqgrid-labels)");
		if (updateCells) {
			resortRows($(ts.tBodies[0]), ".jqgfirstrow, tr.jqgrow, tr.jqfoot");
		}
		if (p.footerrow) {
			resortRows($("tbody:first", grid.sDiv));
		}
		if (p.remapColumns) {
			if (!p.remapColumns.length){
				p.remapColumns = $.makeArray(permutation);
			} else {
				resortArray(p.remapColumns);
			}
		}
		p.lastsort = $.inArray(p.lastsort, permutation);
		if(p.treeGrid) { p.expColInd = $.inArray(p.expColInd, permutation); }
		$.jgrid.feedback.call(ts, "onRemapColumns", permutation, updateCells, keepHeader);
	},
	setGridWidth : function(nwidth, shrink) {
		return this.each(function(){
			var $t = this, p = $t.p, jgrid = $.jgrid, cw, grid = $t.grid, initwidth = 0, lvc, vc=0, hs=false, aw, gw=0, cr;
			if (!grid || p == null) {return;}
			var colModel = p.colModel, cm, scw = p.scrollOffset, brd = jgrid.cell_width ? 0 : p.cellLayout, thInfo,
				headers = grid.headers, footers = grid.footers, bDiv = grid.bDiv, hDiv = grid.hDiv, sDiv = grid.sDiv, cols = grid.cols;
			if(typeof shrink !== 'boolean') {
				shrink=p.shrinkToFit;
			}
			if(isNaN(nwidth)) {return;}
			nwidth = parseInt(nwidth,10); 
			grid.width = p.width = nwidth;
			$(p.gBox).css("width",nwidth+"px");
			$(p.gView).css("width",nwidth+"px");
			$(bDiv).css("width",nwidth+"px");
			$(hDiv).css("width",nwidth+"px");
			if(p.pager) {$(p.pager).css("width",nwidth+"px");}
			if(p.toppager) {$(p.toppager).css("width",nwidth+"px");}
			if(p.toolbar[0] === true){
				$(grid.uDiv).css("width",nwidth+"px");
				if(p.toolbar[1]==="both") {$(grid.ubDiv).css("width",nwidth+"px");}
			}
			if(p.footerrow) { $(sDiv).css("width",nwidth+"px"); }
			if(shrink ===false && p.forceFit === true) {p.forceFit=false;}
			if(shrink===true) {
				$.each(colModel, function() {
					if(this.hidden===false){
						cw = this.widthOrg;
						initwidth += cw+brd;
						if(this.fixed) {
							gw += cw+brd;
						} else {
							vc++;
						}
					}
				});
				if(vc  === 0) { return; }
				p.tblwidth = initwidth;
				aw = nwidth-brd*vc-gw;
				if(!isNaN(p.height)) {
					if(bDiv.clientHeight < bDiv.scrollHeight || $t.rows.length === 1){
						hs = true;
						aw -= scw;
					}
				}
				initwidth =0;
				var cle = cols.length >0;
				$.each(colModel, function(i) {
					if(this.hidden === false && !this.fixed){
						cw = this.widthOrg;
						cw = Math.round(aw*cw/(p.tblwidth-brd*vc-gw));
						if (cw < 0) { return; }
						this.width =cw;
						initwidth += cw;
						headers[i].width=cw;
						headers[i].el.style.width=cw+"px";
						if(p.footerrow) { footers[i].style.width = cw+"px"; }
						if(cle) { cols[i].style.width = cw+"px"; }
						lvc = i;
					}
				});

				if (!lvc) { return; }

				cr = 0;
				if (hs) {
					if(nwidth-gw-(initwidth+brd*vc) !== scw){
						cr = nwidth-gw-(initwidth+brd*vc)-scw;
					}
				} else if( Math.abs(nwidth-gw-(initwidth+brd*vc)) !== 1) {
					cr = nwidth-gw-(initwidth+brd*vc);
				}
				cm = colModel[lvc];
				cm.width += cr;
				p.tblwidth = initwidth+cr+brd*vc+gw;
				if(p.tblwidth > nwidth) {
					var delta = p.tblwidth - parseInt(nwidth,10);
					p.tblwidth = nwidth;
					cm.width = cm.width-delta;
				}
				cw = cm.width;
				thInfo = headers[lvc];
				thInfo.width = cw;
				thInfo.el.style.width=cw+"px";
				if(cle) { cols[lvc].style.width = cw+"px"; }
				if(p.footerrow) {
					footers[lvc].style.width = cw+"px";
				}
			}
			if(p.tblwidth) {
				$('table:first',bDiv).css("width",p.tblwidth+"px");
				$('table:first',hDiv).css("width",p.tblwidth+"px");
				hDiv.scrollLeft = bDiv.scrollLeft;
				if(p.footerrow) {
					$('table:first',sDiv).css("width",p.tblwidth+"px");
				}
			}
		});
	},
	setGridHeight : function (nh) {
		return this.each(function (){
			var $t = this, grid = $t.grid, p = $t.p;
			if(!$t.grid) {return;}
			var bDiv = $(grid.bDiv);
			bDiv.css({height: nh+(isNaN(nh)?"":"px")});
			if(p.frozenColumns === true){
				//follow the original set height to use 16, better scrollbar width detection
				$(p.idSel+"_frozen").parent().height(bDiv.height() - 16);
			}
			p.height = nh;
			if (p.scroll) { grid.populateVisible.call($t); }
		});
	},
	setCaption : function (newcap){
		return this.each(function(){
			var self = this, cDiv = self.grid.cDiv;
			self.p.caption=newcap;
			$("span.ui-jqgrid-title, span.ui-jqgrid-title-rtl",cDiv).html(newcap);
			$(cDiv).show();
			$(cDiv).nextAll("div").removeClass('ui-corner-top');
		});
	},
	setLabel : function(colname, nData, prop, attrp ){
		return this.each(function(){
			var $t = this, pos=-1;
			if(!$t.grid) {return;}
			if(colname !== undefined) {
				$($t.p.colModel).each(function(i){
					if (this.name === colname) {
						pos = i;return false;
					}
				});
			} else { return; }
			if(pos>=0) {
				var thecol = $("tr.ui-jqgrid-labels th:eq("+pos+")",$t.grid.hDiv);
				if (nData){
					var ico = $(".s-ico",thecol);
					$("[id^=jqgh_]",thecol).empty().html(nData).append(ico);
					$t.p.colNames[pos] = nData;
				}
				if (prop) {
					if(typeof prop === 'string') {$(thecol).addClass(prop);} else {$(thecol).css(prop);}
				}
				if(typeof attrp === 'object') {$(thecol).attr(attrp);}
			}
		});
	},
	setCell : function(rowid,colname,nData,cssp,attrp, forceupd) {
		return this.each(function(){
			var $t = this, pos =-1,v, title;
			if(!$t.grid) {return;}
			if(isNaN(colname)) {
				$($t.p.colModel).each(function(i){
					if (this.name === colname) {
						pos = i;return false;
					}
				});
			} else {pos = parseInt(colname,10);}
			if(pos>=0) {
				var ind = $($t).jqGrid('getGridRowById', rowid); 
				if (ind){
					var tcell = $("td:eq("+pos+")",ind), cl=0, rawdat=[];
					if(nData !== "" || forceupd === true) {
						while(cl<ind.cells.length) {
							// slow down speed
							rawdat.push(ind.cells[cl].innerHTML);
							cl++;
						}
						v = $t.formatter(rowid, nData, pos, rawdat, 'edit');
						title = $t.p.colModel[pos].title ? {"title":$.jgrid.stripHtml(v)} : {};
						if($t.p.treeGrid && $(".tree-wrap",$(tcell)).length>0) {
							$("span",$(tcell)).html(v).attr(title);
						} else {
							$(tcell).html(v).attr(title);
						}
						if($t.p.datatype === "local") {
							var cm = $t.p.colModel[pos], index;
							nData = cm.formatter && typeof cm.formatter === 'string' && cm.formatter === 'date' ? $.unformat.date.call($t,nData,cm) : nData;
							index = $t.p._index[$.jgrid.stripPref($t.p.idPrefix, rowid)];
							if(index !== undefined) {
								$t.p.data[index][cm.name] = nData;
							}
						}
					}
					if(typeof cssp === 'string'){
						$(tcell).addClass(cssp);
					} else if(cssp) {
						$(tcell).css(cssp);
					}
					if(typeof attrp === 'object') {$(tcell).attr(attrp);}
				}
			}
		});
	},
	getCell : function(rowid,col) {
		var ret = false;
		this.each(function(){
			var $t=this, pos=-1;
			if(!$t.grid) {return;}
			if(isNaN(col)) {
				$($t.p.colModel).each(function(i){
					if (this.name === col) {
						pos = i;return false;
					}
				});
			} else {pos = parseInt(col,10);}
			if(pos>=0) {
				var ind = $($t).jqGrid('getGridRowById', rowid);
				if(ind) {
					try {
						ret = $.unformat.call($t,$("td:eq("+pos+")",ind),{rowId:ind.id, colModel:$t.p.colModel[pos]},pos);
					} catch (exception){
						ret = $.jgrid.htmlDecode($("td:eq("+pos+")",ind).html());
					}
				}
			}
		});
		return ret;
	},
	getCol : function (col, obj, mathopr) {
		var ret = [], val, sum=0, min, max, v;
		obj = typeof obj !== 'boolean' ? false : obj;
		if(mathopr === undefined) { mathopr = false; }
		this.each(function(){
			var $t=this, pos=-1;
			if(!$t.grid) {return;}
			if(isNaN(col)) {
				$($t.p.colModel).each(function(i){
					if (this.name === col) {
						pos = i;return false;
					}
				});
			} else {pos = parseInt(col,10);}
			if(pos>=0) {
				var ln = $t.rows.length, i =0, dlen=0;
				if (ln && ln>0){
					while(i<ln){
						if($($t.rows[i]).hasClass('jqgrow')) {
							try {
								val = $.unformat.call($t,$($t.rows[i].cells[pos]),{rowId:$t.rows[i].id, colModel:$t.p.colModel[pos]},pos);
							} catch (exception) {
								val = $.jgrid.htmlDecode($t.rows[i].cells[pos].innerHTML);
							}
							if(mathopr) {
								v = parseFloat(val);
								if(!isNaN(v)) {
									sum += v;
									if (max === undefined) {max = min = v;}
									min = Math.min(min, v);
									max = Math.max(max, v);
									dlen++;
								}
							}
							else if(obj) { ret.push( {id:$t.rows[i].id,value:val} ); }
							else { ret.push( val ); }
						}
						i++;
					}
					if(mathopr) {
						switch(mathopr.toLowerCase()){
							case 'sum': ret =sum; break;
							case 'avg': ret = sum/dlen; break;
							case 'count': ret = (ln-1); break;
							case 'min': ret = min; break;
							case 'max': ret = max; break;
						}
					}
				}
			}
		});
		return ret;
	},
	clearGridData : function(clearfooter) {
		return this.each(function(){
			var $t = this, p = $t.p, jgrid = $.jgrid, clearArray = jgrid.clearArray, gridIdEscaped = jgrid.jqID(p.id);
			if(!$t.grid) {return;}
			if(typeof clearfooter !== 'boolean') { clearfooter = false; }
			if(p.deepempty) {$("#"+gridIdEscaped+" tbody:first tr:gt(0)").remove();}
			else {
				var trf = $("#"+gridIdEscaped+" tbody:first tr:first")[0];
				$("#"+gridIdEscaped+" tbody:first").empty().append(trf);
			}
			if(p.footerrow && clearfooter) { $(".ui-jqgrid-ftable td",$t.grid.sDiv).html("&#160;"); }
			p.selrow = null;
			clearArray(p.selarrrow); // p.selarrrow= [];
			clearArray(p.savedRow); // p.savedRow = [];
			p.records = 0;
			p.page=1;
			p.lastpage=0;
			p.reccount=0;
			clearArray(p.data); // $t.p.data = [];
			clearArray(p.lastSelectedData); // p.lastSelectedData = [];
			p._index = {};
			$t.updatepager(true,false);
		});
	},
	getInd : function(rowid,rc){
		var ret =false,rw;
		this.each(function(){
			rw = $(this).jqGrid('getGridRowById', rowid);
			if(rw) {
				ret = rc===true ? rw: rw.rowIndex;
			}
		});
		return ret;
	},
	bindKeys : function( settings ){
		var o = $.extend({
			onEnter: null,
			onSpace: null,
			onLeftKey: null,
			onRightKey: null,
			scrollingRows : true
		},settings || {});
		return this.each(function(){
			var $t = this;
			if( !$('body').is('[role]') ){$('body').attr('role','application');}
			$t.p.scrollrows = o.scrollingRows;
			$($t).keydown(function(event){
				var target = $($t).find('tr[tabindex=0]')[0], id, r, mind,
				expanded = $t.p.treeReader.expanded_field;
				//check for arrow keys
				if(target) {
					mind = $t.p._index[$.jgrid.stripPref($t.p.idPrefix, target.id)];
					if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
						// up key
						if(event.keyCode === 38 ){
							r = target.previousSibling;
							id = "";
							if(r) {
								if($(r).is(":hidden")) {
									while(r) {
										r = r.previousSibling;
										if(!$(r).is(":hidden") && $(r).hasClass('jqgrow')) {id = r.id;break;}
									}
								} else {
									id = r.id;
								}
							}
							$($t).jqGrid('setSelection', id, true, event);
							event.preventDefault();
						}
						//if key is down arrow
						if(event.keyCode === 40){
							r = target.nextSibling;
							id ="";
							if(r) {
								if($(r).is(":hidden")) {
									while(r) {
										r = r.nextSibling;
										if(!$(r).is(":hidden") && $(r).hasClass('jqgrow') ) {id = r.id;break;}
									}
								} else {
									id = r.id;
								}
							}
							$($t).jqGrid('setSelection', id, true, event);
							event.preventDefault();
						}
						// left
						if(event.keyCode === 37 ){
							if($t.p.treeGrid && $t.p.data[mind][expanded]) {
								$(target).find("div.treeclick").trigger('click');
							}
							$($t).triggerHandler("jqGridKeyLeft", [$t.p.selrow]);
							if($.isFunction(o.onLeftKey)) {
								o.onLeftKey.call($t, $t.p.selrow);
							}
						}
						// right
						if(event.keyCode === 39 ){
							if($t.p.treeGrid && !$t.p.data[mind][expanded]) {
								$(target).find("div.treeclick").trigger('click');
							}
							$($t).triggerHandler("jqGridKeyRight", [$t.p.selrow]);
							if($.isFunction(o.onRightKey)) {
								o.onRightKey.call($t, $t.p.selrow);
							}
						}
					}
					//check if enter was pressed on a grid or treegrid node
					else if( event.keyCode === 13 ){
						$($t).triggerHandler("jqGridKeyEnter", [$t.p.selrow]);
						if($.isFunction(o.onEnter)) {
							o.onEnter.call($t, $t.p.selrow);
						}
					} else if(event.keyCode === 32) {
						$($t).triggerHandler("jqGridKeySpace", [$t.p.selrow]);
						if($.isFunction(o.onSpace)) {
							o.onSpace.call($t, $t.p.selrow);
						}
					}
				}
			});
		});
	},
	unbindKeys : function(){
		return this.each(function(){
			$(this).unbind('keydown');
		});
	},
	getLocalRow : function (rowid) {
		var ret = false, ind;
		this.each(function(){
			if(rowid !== undefined) {
				ind = this.p._index[$.jgrid.stripPref(this.p.idPrefix, rowid)];
				if(ind >= 0 ) {
					ret = this.p.data[ind];
				}
			}
		});
		return ret;
	},
	progressBar : function ( p ) {
		p = $.extend({
			htmlcontent : "",
			method : "hide",
			loadtype : "disable" 
		}, p || {});
		return this.each(function(){
			var sh = p.method==="show" ? true : false, gridIdEscaped = $.jgrid.jqID(this.p.id);
			if(p.htmlcontent !== "") {
				$("#load_"+gridIdEscaped).html( p.htmlcontent );
			}
			switch(p.loadtype) {
				case "disable":
					break;
				case "enable":
					$("#load_"+gridIdEscaped).toggle( sh );
					break;
				case "block":
					$("#lui_"+gridIdEscaped).toggle( sh );
					$("#load_"+gridIdEscaped).toggle( sh );
					break;
			}
		});
	},
	setColWidth: function (iCol, newWidth, adjustGridWidth) {
		return this.each(function () {
			var $self = $(this), grid = this.grid, colName, colModel, i, nCol;
			if (typeof iCol === "string") {
				// the first parametrer is column name instead of index
				colName = iCol;
				colModel = $self.jqGrid("getGridParam", "colModel");
				for (i = 0, nCol = colModel.length; i < nCol; i++) {
					if (colModel[i].name === colName) {
						iCol = i;
						break;
					}
				}
				if (i >= nCol) {
					return; // error: non-existing column name specified as the first parameter
				}
			} else if (typeof iCol !== "number") {
				return; // error: wrong parameters
			}
			grid.headers[iCol].newWidth = newWidth;
			grid.newWidth = grid.width + newWidth - grid.headers[iCol].width;
			grid.resizeColumn(iCol, this, true);
			if (adjustGridWidth !== false) {
				$self.jqGrid("setGridWidth", grid.newWidth, false); // adjust grid width too
			}
		});
	},
	autoResizeColumn: function (iCol) {
		return this.each(function () {
			var rows = this.rows, row, cell, iRow, $cell, $cellFirstChild, widthOrg,
				p = this.p,
				cm = p.colModel[iCol],
				$th = $($(this.grid.hDiv).find(".ui-jqgrid-labels>.ui-th-column")[iCol]),
				$thDiv = $th.find(">div"),
				thPaddingLeft = parseFloat($th.css("padding-left") || 0),
				thPaddingRight = parseFloat($th.css("padding-right") || 0),
				$incosDiv = $thDiv.find("span.s-ico"),
				$wrapper = $thDiv.find(">." + p.autoResizing.wrapperClassName),
				wrapperOuterWidth = $wrapper.outerWidth(),
				wrapperCssWidth = parseFloat($wrapper.css("width") || 0),
				widthOuter = 0,
				colWidth = 0,
				wrapperClassName = p.autoResizing.wrapperClassName;

			if (cm == null || !cm.autoResizable || $wrapper.length === 0 || cm.hidden || cm.fixed) {
				return; // do nothing
			}
			if (!((cm.autoResizing != null && cm.autoResizingOption.compact !== undefined) ? cm.autoResizingOption.compact: p.autoResizing.compact) || $incosDiv.is(":visible") || ($incosDiv.css("display") !== "none")) {  //|| p.viewsortcols[0]
				colWidth = p.autoResizing.widthOfVisiblePartOfSortIcon; // $incosDiv.width() can be grater as the visible part of icon
				if ($thDiv.css("text-align") === "center") {
					colWidth += colWidth; // *2
				}
				if (p.viewsortcols[1] === "horizontal") {
					colWidth += colWidth; // *2
				}
			}
			colWidth += wrapperOuterWidth + thPaddingLeft +
					(wrapperCssWidth === wrapperOuterWidth ? thPaddingLeft + thPaddingRight : 0) +
					parseFloat($thDiv.css("margin-left") || 0) + parseFloat($thDiv.css("margin-right") || 0);
			for (iRow = 0, rows = this.rows; iRow < rows.length; iRow++) {
				row = rows[iRow];
				cell = row.cells[iCol];
				$cell = $(row.cells[iCol]);
				if ($(row).hasClass("jqgrow") && cell != null) {
					$cellFirstChild = $(cell.firstChild);
					if ($cellFirstChild.hasClass(wrapperClassName)) {
						colWidth = Math.max(colWidth, $cellFirstChild.outerWidth() + widthOuter);
					}
				} else if ($(row).hasClass("jqgfirstrow")) {
					widthOuter = ($.jgrid.cell_width ? parseFloat($cell.css("padding-left") || 0) + parseFloat($cell.css("padding-right") || 0) : 0) +
							parseFloat($cell.css("border-right") || 0) +
							parseFloat($cell.css("border-left") || 0);
				}
			}
			colWidth = Math.max(colWidth, cm.autoResizing != null && cm.autoResizingOption.minColWidth !== undefined ? cm.autoResizingOption.minColWidth : p.autoResizing.minColWidth);
			$(this).jqGrid("setColWidth", iCol, Math.min(colWidth, cm.autoResizing != null && cm.autoResizingOption.maxColWidth !== undefined ? cm.autoResizingOption.maxColWidth : p.autoResizing.maxColWidth), p.autoResizing.adjustGridWidth && !p.autoResizing.fixWidthOnShrink);
			if (p.autoResizing.fixWidthOnShrink && p.shrinkToFit) {
				cm.fixed = true;
				widthOrg = cm.widthOrg; // save the value in temporary variable
				cm.widthOrg = cm.width; // to force not changing of the column width
				$(this).jqGrid("setGridWidth", p.width, true);
				cm.widthOrg = widthOrg;
				cm.fixed = false;
			}
		});
	},
	autoResizeAllColumns: function () {
		return this.each(function () {
			var $self = $(this), p = this.p, colModel = p.colModel, nCol = colModel.length, iCol, cm,
				shrinkToFit = p.shrinkToFit, // save the original shrinkToFit value in the grid
				adjustGridWidth = p.autoResizing.adjustGridWidth,
				fixWidthOnShrink = p.autoResizing.fixWidthOnShrink,
				width = parseInt(p.widthOrg,10),
				autoResizeColumn = $.jgrid.getMethod("autoResizeColumn"); // cache autoResizeColumn reference

			p.shrinkToFit = false; // make no shrinking during resizing of any columns 
			p.autoResizing.adjustGridWidth = true;
			p.autoResizing.fixWidthOnShrink = false;
			for (iCol = 0; iCol < nCol; iCol++) {
				cm = colModel[iCol];
				if (cm.autoResizable && cm.formatter !== "actions") {
					autoResizeColumn.call($self, iCol);
				}
			}
			if (!isNaN(width)) {
				$(this).jqGrid("setGridWidth", width, false);
			}
			// restore the original shrinkToFit value
			p.autoResizing.fixWidthOnShrink = fixWidthOnShrink;
			p.autoResizing.adjustGridWidth = adjustGridWidth;
			p.shrinkToFit = shrinkToFit;
		});
	}
});
}(jQuery));
/*jshint eqeqeq:false */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
(function($){
/*
**
 * jqGrid extension for cellediting Grid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/ 
/**
 * all events and options here are aded anonynous and not in the base grid
 * since the array is to big. Here is the order of execution.
 * From this point we use jQuery isFunction
 * formatCell
 * beforeEditCell,
 * onSelectCell (used only for noneditable cels)
 * afterEditCell,
 * beforeSaveCell, (called before validation of values if any)
 * beforeSubmitCell (if cellsubmit remote (ajax))
 * afterSubmitCell(if cellsubmit remote (ajax)),
 * afterSaveCell,
 * errorCell,
 * serializeCellData - new
 * Options
 * cellsubmit (remote,clientArray) (added in grid options)
 * cellurl
 * ajaxCellOptions
* */
"use strict";
$.jgrid.extend({
	editCell : function (iRow,iCol, ed){
		return this.each(function (){
			var $t = this, $self = $($t), p = $t.p, nm, tmp,cc, cm, jgrid = $.jgrid, feedback = jgrid.feedback;
			if (!$t.grid || p.cellEdit !== true) {return;}
			iRow = parseInt(iRow, 10);
			iCol = parseInt(iCol, 10);
			var tr = $t.rows[iRow], rowid = tr.id, $tr = $(tr), $trOld = $($t.rows[p.iRow]);
			// select the row that can be used for other methods
			p.selrow = rowid;
			if (!p.knv) {$self.jqGrid("GridNav");}
			// check to see if we have already edited cell
			if (p.savedRow.length>0) {
				// prevent second click on that field and enable selects
				if (ed===true ) {
					if(iRow === p.iRow && iCol === p.iCol){
						return;
					}
				}
				// save the cell
				$self.jqGrid("saveCell",p.savedRow[0].id,p.savedRow[0].ic);
			} else {
				window.setTimeout(function () { $("#"+jgrid.jqID(p.knv)).attr("tabindex","-1").focus();},1);
			}
			cm = p.colModel[iCol];
			nm = cm.name;
			if (nm==='subgrid' || nm==='cb' || nm==='rn') {return;}
			cc = $("td:eq("+iCol+")",tr);
			if (cm.editable===true && ed===true && !cc.hasClass("not-editable-cell")) {
				if(parseInt(p.iCol,10)>=0  && parseInt(p.iRow,10)>=0) {
					$("td:eq("+p.iCol+")",$trOld).removeClass("edit-cell ui-state-highlight");
					$trOld.removeClass("selected-row ui-state-hover");
				}
				cc.addClass("edit-cell ui-state-highlight");
				$tr.addClass("selected-row ui-state-hover");
				try {
					tmp =  $.unformat.call($t,cc,{rowId: rowid, colModel:cm},iCol);
				} catch (_) {
					tmp = ( cm.edittype && cm.edittype === 'textarea' ) ? cc.text() : cc.html();
				}
				if(p.autoencode) { tmp = jgrid.htmlDecode(tmp); }
				if (!cm.edittype) {cm.edittype = "text";}
				p.savedRow.push({id:iRow,ic:iCol,name:nm,v:tmp});
				if(tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length===1 && tmp.charCodeAt(0)===160) ) {tmp='';}
				if($.isFunction(p.formatCell)) {
					var tmp2 = p.formatCell.call($t, rowid,nm,tmp,iRow,iCol);
					if(tmp2 !== undefined ) {tmp = tmp2;}
				}
				feedback.call($t, "beforeEditCell", rowid, nm, tmp, iRow, iCol);
				var opt = $.extend({}, cm.editoptions || {} ,{id:iRow+"_"+nm,name:nm,rowId: rowid});
				var elc = jgrid.createEl.call($t,cm.edittype,opt,tmp,true,$.extend({},jgrid.ajaxOptions,p.ajaxSelectOptions || {}));
				cc.html("").append(elc).attr("tabindex","0");
				jgrid.bindEv.call($t, elc, opt);
				window.setTimeout(function () { $(elc).focus();},1);
				$("input, select, textarea",cc).bind("keydown",function(e) {
					if (e.keyCode === 27) {
						if($("input.hasDatepicker",cc).length >0) {
							if( $(".ui-datepicker").is(":hidden") )  { $self.jqGrid("restoreCell",iRow,iCol); }
							else { $("input.hasDatepicker",cc).datepicker('hide'); }
						} else {
							$self.jqGrid("restoreCell",iRow,iCol);
						}
					} //ESC
					if (e.keyCode === 13 && !e.shiftKey) {
						$self.jqGrid("saveCell",iRow,iCol);
						// Prevent default action
						return false;
					} //Enter
					if (e.keyCode === 9)  {
						if(!$t.grid.hDiv.loading ) {
							if (e.shiftKey) {$self.jqGrid("prevCell",iRow,iCol);} //Shift TAb
							else {$self.jqGrid("nextCell",iRow,iCol);} //Tab
						} else {
							return false;
						}
					}
					e.stopPropagation();
				});
				feedback.call($t, "afterEditCell", rowid, nm, tmp, iRow, iCol);
				$self.triggerHandler("jqGridAfterEditCell", [rowid, nm, tmp, iRow, iCol]);
			} else {
				if (parseInt(p.iCol,10)>=0  && parseInt(p.iRow,10)>=0) {
					$("td:eq("+p.iCol+")",$trOld).removeClass("edit-cell ui-state-highlight");
					$trOld.removeClass("selected-row ui-state-hover");
				}
				cc.addClass("edit-cell ui-state-highlight");
				$tr.addClass("selected-row ui-state-hover");
				tmp = cc.html().replace(/\&#160\;/ig,'');
				feedback.call($t, "onSelectCell", rowid, nm, tmp, iRow, iCol);
			}
			p.iCol = iCol; p.iRow = iRow;
		});
	},
	saveCell : function (iRow, iCol){
		return this.each(function(){
			var $t= this, $self = $($t), p = $t.p, fr, jgrid = $.jgrid, feedback = jgrid.feedback, infoDialog = jgrid.info_dialog, jqID = jgrid.jqID,
				errors = jgrid.errors, errcap = errors.errcap, edit = jgrid.edit, editMsg = jgrid.edit.msg, bClose = edit.bClose;
			if (!$t.grid || p.cellEdit !== true) {return;}
			if ( p.savedRow.length >= 1) {fr = 0;} else {fr=null;}
			if(fr !== null) {
				var tr = $t.rows[iRow], rowid = tr.id, $tr = $(tr), cc = $("td:eq("+iCol+")",tr),v,v2,
				cm = p.colModel[iCol], nm = cm.name, iRowNmSelector = "#"+iRow+"_"+jqID(nm);
				switch (cm.edittype) {
					case "select":
						if(!cm.editoptions.multiple) {
							v = $(iRowNmSelector+" option:selected",tr).val();
							v2 = $(iRowNmSelector+" option:selected",tr).text();
						} else {
							var sel = $(iRowNmSelector,tr), selectedText = [];
							v = $(sel).val();
							if(v) { v.join(",");} else { v=""; }
							$("option:selected",sel).each(
								function(i,selected){
									selectedText[i] = $(selected).text();
								}
							);
							v2 = selectedText.join(",");
						}
						if(cm.formatter) { v2 = v; }
						break;
					case "checkbox":
						var cbv  = ["Yes","No"];
						if(cm.editoptions){
							cbv = cm.editoptions.value.split(":");
						}
						v = $(iRowNmSelector,tr).is(":checked") ? cbv[0] : cbv[1];
						v2=v;
						break;
					case "password":
					case "text":
					case "textarea":
					case "button" :
						v = $(iRowNmSelector,tr).val();
						v2=v;
						break;
					case 'custom' :
						try {
							if(cm.editoptions && $.isFunction(cm.editoptions.custom_value)) {
								v = cm.editoptions.custom_value.call($t, $(".customelement",cc),'get');
								if (v===undefined) { throw "e2";}
								v2=v;
							} else { throw "e1"; }
						} catch (e) {
							if (e==="e1") { infoDialog(errcap,"function 'custom_value' "+editMsg.nodefined,bClose); }
							if (e==="e2") { infoDialog(errcap,"function 'custom_value' "+editMsg.novalue,bClose); }
							else {infoDialog(errcap,e.message,bClose); }
						}
						break;
				}
				// The common approach is if nothing changed do not do anything
				if (v2 !== p.savedRow[fr].v){
					var vvv = $self.triggerHandler("jqGridBeforeSaveCell", [rowid, nm, v, iRow, iCol]);
					if (vvv) {v = vvv; v2=vvv;}
					if ($.isFunction(p.beforeSaveCell)) {
						var vv = p.beforeSaveCell.call($t, rowid,nm, v, iRow,iCol);
						if (vv) {v = vv; v2=vv;}
					}
					var cv = jgrid.checkValues.call($t,v,iCol);
					if(cv[0] === true) {
						var addpost = $self.triggerHandler("jqGridBeforeSubmitCell", [rowid, nm, v, iRow, iCol]) || {};
						if ($.isFunction(p.beforeSubmitCell)) {
							addpost = p.beforeSubmitCell.call($t, rowid,nm, v, iRow,iCol);
							if (!addpost) {addpost={};}
						}
						if( $("input.hasDatepicker",cc).length >0) { $("input.hasDatepicker",cc).datepicker('hide'); }
						if (p.cellsubmit === 'remote') {
							if (p.cellurl) {
								var postdata = {};
								if(p.autoencode) { v = jgrid.htmlEncode(v); }
								postdata[nm] = v;
								var idname,oper, opers;
								opers = p.prmNames;
								idname = opers.id;
								oper = opers.oper;
								postdata[idname] = jgrid.stripPref(p.idPrefix, rowid);
								postdata[oper] = opers.editoper;
								postdata = $.extend(addpost,postdata);
								$self.jqGrid("progressBar", {method:"show", loadtype : p.loadui, htmlcontent: jgrid.defaults.savetext || "Saving..." });
								$t.grid.hDiv.loading = true;
								$.ajax( $.extend( {
									url: p.cellurl,
									data :$.isFunction(p.serializeCellData) ? p.serializeCellData.call($t, postdata) : postdata,
									type: "POST",
									complete: function (result, stat) {
										$self.jqGrid("progressBar", {method:"hide", loadtype : p.loadui });
										$t.grid.hDiv.loading = false;
										if (stat === 'success') {
											var ret = $self.triggerHandler("jqGridAfterSubmitCell", [$t, result, postdata.id, nm, v, iRow, iCol]) || [true, ''];
											if (ret[0] === true && $.isFunction(p.afterSubmitCell)) {
												ret = p.afterSubmitCell.call($t, result,postdata.id,nm,v,iRow,iCol);
											}
											if(ret[0] === true){
												cc.empty();
												$self.jqGrid("setCell",rowid, iCol, v2, false, false, true);
												cc.addClass("dirty-cell");
												$tr.addClass("edited");
												feedback.call($t, "afterSaveCell", rowid,nm, v, iRow,iCol);
												p.savedRow.splice(0,1);
											} else {
												infoDialog(errcap,ret[1],bClose);
												$self.jqGrid("restoreCell",iRow,iCol);
											}
										}
									},
									error:function(res,stat,err) {
										$("#lui_"+jqID(p.id)).hide();
										$t.grid.hDiv.loading = false;
										$self.triggerHandler("jqGridErrorCell", [res, stat, err]);
										if ($.isFunction(p.errorCell)) {
											p.errorCell.call($t, res,stat,err);
											$self.jqGrid("restoreCell",iRow,iCol);
										} else {
											infoDialog(errcap,res.status+" : "+res.statusText+"<br/>"+stat,bClose);
											$self.jqGrid("restoreCell",iRow,iCol);
										}
									}
								}, jgrid.ajaxOptions, p.ajaxCellOptions || {}));
							} else {
								try {
									infoDialog(errcap,errors.nourl,bClose);
									$self.jqGrid("restoreCell",iRow,iCol);
								} catch (ignore) {}
							}
						}
						if (p.cellsubmit === 'clientArray') {
							cc.empty();
							$self.jqGrid("setCell",rowid,iCol, v2, false, false, true);
							cc.addClass("dirty-cell");
							$tr.addClass("edited");
							feedback.call($t, "afterSaveCell", rowid, nm, v, iRow, iCol);
							p.savedRow.splice(0,1);
						}
					} else {
						try {
							window.setTimeout(function(){infoDialog(errcap,v+" "+cv[1],bClose);},100);
							$self.jqGrid("restoreCell",iRow,iCol);
						} catch (ignore) {}
					}
				} else {
					$self.jqGrid("restoreCell",iRow,iCol);
				}
			}
			window.setTimeout(function () { $("#"+jqID(p.knv)).attr("tabindex","-1").focus();},0);
		});
	},
	restoreCell : function(iRow, iCol) {
		return this.each(function(){
			var $t= this, p = $t.p, fr, tr = $t.rows[iRow], rowid = tr.id;
			if (!$t.grid || p.cellEdit !== true ) {return;}
			if ( p.savedRow.length >= 1) {fr = 0;} else {fr=null;}
			if(fr !== null) {
				var cc = $("td:eq("+iCol+")",tr);
				// datepicker fix
				if($.isFunction($.fn.datepicker)) {
					try {
						$("input.hasDatepicker",cc).datepicker('hide');
					} catch (ignore) {}
				}
				$(cc).empty().attr("tabindex","-1");
				$($t).jqGrid("setCell",rowid, iCol, p.savedRow[fr].v, false, false, true);
				$.jgrid.feedback.call($t, "afterRestoreCell", rowid, p.savedRow[fr].v, iRow, iCol);
				p.savedRow.splice(0,1);
			}
			window.setTimeout(function () { $("#"+p.knv).attr("tabindex","-1").focus();},0);
		});
	},
	nextCell : function (iRow,iCol) {
		return this.each(function (){
			var $t = this, $self = $($t), p = $t.p, nCol=false, i;
			if (!$t.grid || p.cellEdit !== true) {return;}
			// try to find next editable cell
			for (i=iCol+1; i<p.colModel.length; i++) {
				if ( p.colModel[i].editable ===true) {
					nCol = i; break;
				}
			}
			if(nCol !== false) {
				$self.jqGrid("editCell",iRow,nCol,true);
			} else {
				if (p.savedRow.length >0) {
					$self.jqGrid("saveCell",iRow,iCol);
				}
			}
		});
	},
	prevCell : function (iRow,iCol) {
		return this.each(function (){
			var $t = this, $self = $($t), p = $t.p, nCol=false, i;
			if (!$t.grid || p.cellEdit !== true) {return;}
			// try to find next editable cell
			for (i=iCol-1; i>=0; i--) {
				if ( p.colModel[i].editable ===true) {
					nCol = i; break;
				}
			}
			if(nCol !== false) {
				$self.jqGrid("editCell",iRow,nCol,true);
			} else {
				if (p.savedRow.length >0) {
					$self.jqGrid("saveCell",iRow,iCol);
				}
			}
		});
	},
	GridNav : function() {
		return this.each(function () {
			var  $t = this, $self = $($t), p = $t.p, grid = $t.grid;
			if (!grid || p.cellEdit !== true ) {return;}
			var bDiv = grid.bDiv;
			// trick to process keydown on non input elements
			p.knv = p.id + "_kn";
			var selection = $("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='"+p.knv+"'></div></div>"),
			i, kdir;
			function scrollGrid(iR, iC, tp){
				var tr = $t.rows[iR];
				if (tp.substr(0,1)==='v') {
					var ch = bDiv.clientHeight,
					st = bDiv.scrollTop,
					nRot = tr.offsetTop+tr.clientHeight,
					pRot = tr.offsetTop;
					if(tp === 'vd') {
						if(nRot >= ch) {
							bDiv.scrollTop = bDiv.scrollTop + tr.clientHeight;
						}
					}
					if(tp === 'vu'){
						if (pRot < st ) {
							bDiv.scrollTop = bDiv.scrollTop - tr.clientHeight;
						}
					}
				}
				if(tp==='h') {
					var cw = bDiv.clientWidth,
					sl = bDiv.scrollLeft, td = tr.cells[iC],
					nCol = td.offsetLeft+td.clientWidth,
					pCol = td.offsetLeft;
					if(nCol >= cw+parseInt(sl,10)) {
						bDiv.scrollLeft = bDiv.scrollLeft + td.clientWidth;
					} else if (pCol < sl) {
						bDiv.scrollLeft = bDiv.scrollLeft - td.clientWidth;
					}
				}
			}
			function findNextVisible(iC,act){
				var ind = 0, j, colModel = p.colModel;
				if(act === 'lft') {
					ind = iC+1;
					for (j=iC;j>=0;j--){
						if (colModel[j].hidden !== true) {
							ind = j;
							break;
						}
					}
				}
				if(act === 'rgt') {
					ind = iC-1;
					for (j=iC; j<colModel.length;j++){
						if (colModel[j].hidden !== true) {
							ind = j;
							break;
						}						
					}
				}
				return ind;
			}

			$(selection).insertBefore(grid.cDiv);
			$("#"+p.knv)
			.focus()
			.keydown(function (e){
				kdir = e.keyCode;
				if(p.direction === "rtl") {
					if(kdir===37) { kdir = 39;}
					else if (kdir===39) { kdir = 37; }
				}
				switch (kdir) {
					case 38:
						if (p.iRow-1 >0 ) {
							scrollGrid(p.iRow-1,p.iCol,'vu');
							$self.jqGrid("editCell",p.iRow-1,p.iCol,false);
						}
					break;
					case 40 :
						if (p.iRow+1 <=  $t.rows.length-1) {
							scrollGrid(p.iRow+1,p.iCol,'vd');
							$self.jqGrid("editCell",p.iRow+1,p.iCol,false);
						}
					break;
					case 37 :
						if (p.iCol -1 >=  0) {
							i = findNextVisible(p.iCol-1,'lft');
							scrollGrid(p.iRow, i,'h');
							$self.jqGrid("editCell",p.iRow, i,false);
						}
					break;
					case 39 :
						if (p.iCol +1 <=  p.colModel.length-1) {
							i = findNextVisible(p.iCol+1,'rgt');
							scrollGrid(p.iRow,i,'h');
							$self.jqGrid("editCell",p.iRow,i,false);
						}
					break;
					case 13:
						if (parseInt(p.iCol,10)>=0 && parseInt(p.iRow,10)>=0) {
							$self.jqGrid("editCell",p.iRow,p.iCol,true);
						}
					break;
					default :
						return true;
				}
				return false;
			});
		});
	},
	getChangedCells : function (mthd) {
		var ret=[];
		if (!mthd) {mthd='all';}
		this.each(function(){
			var $t = this, p = $t.p, htmlDecode = $.jgrid.htmlDecode;
			if (!$t.grid || p.cellEdit !== true ) {return;}
			$($t.rows).each(function(j){
				var res = {};
				if ($(this).hasClass("edited")) {
					$('td',this).each( function(i) {
						var cm = p.colModel[i], nm = cm.name, $td = $(this);
						if ( nm !== 'cb' && nm !== 'subgrid') {
							if (mthd==='dirty') {
								if ($td.hasClass('dirty-cell')) {
									try {
										res[nm] = $.unformat.call($t,this,{rowId:$t.rows[j].id, colModel:cm},i);
									} catch (e){
										res[nm] = htmlDecode($td.html());
									}
								}
							} else {
								try {
									res[nm] = $.unformat.call($t,this,{rowId:$t.rows[j].id,colModel:cm},i);
								} catch (e) {
									res[nm] = htmlDecode($td.html());
								}
							}
						}
					});
					res.id = this.id;
					ret.push(res);
				}
			});
		});
		return ret;
	}
/// end  cell editing
});
}(jQuery));
/*jshint eqeqeq:false */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
(function($){
/*
 * jqGrid common function
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
*/
"use strict";
$.extend($.jgrid,{
// Modal functions
	showModal : function(h) {
		h.w.show();
	},
	closeModal : function(h) {
		h.w.hide().attr("aria-hidden","true");
		if(h.o) {h.o.remove();}
	},
	hideModal : function (selector,o) {
		o = $.extend({jqm : true, gb :'', removemodal: false, formprop: false, form : ''}, o || {});
		var thisgrid = o.gb && typeof o.gb === "string" && o.gb.substr(0,6) === "#gbox_" ? $("#" + o.gb.substr(6))[0] : false;
		if(o.onClose) {
			var oncret = thisgrid ? o.onClose.call(thisgrid, selector) : o.onClose(selector);
			if (typeof oncret === 'boolean'  && !oncret ) { return; }
		}
		if( o.formprop && thisgrid  && o.form) {
			var fh = $(selector)[0].style.height;
			if(fh.indexOf("px") > -1 ) {
				fh = parseFloat(fh);
			}
			var frmgr, frmdata;
			if(o.form==='edit'){
				frmgr = '#' +$.jgrid.jqID("FrmGrid_"+ o.gb.substr(6));
				frmdata = "formProp";
			} else if( o.form === 'view') {
				frmgr = '#' +$.jgrid.jqID("ViewGrid_"+ o.gb.substr(6));
				frmdata = "viewProp";
			}
			$(thisgrid).data(frmdata, {
				top:parseFloat($(selector).css("top")),
				left : parseFloat($(selector).css("left")),
				width : $(selector).width(),
				height : fh,
				dataheight : $(frmgr).height(),
				datawidth: $(frmgr).width()
			});
		}
		if ($.fn.jqm && o.jqm === true) {
			$(selector).attr("aria-hidden","true").jqmHide();
		} else {
			if(o.gb !== '') {
				try {$(".jqgrid-overlay:first",o.gb).hide();} catch (ignore){}
			}
			$(selector).hide().attr("aria-hidden","true");
		}
		if( o.removemodal ) {
			$(selector).remove();
		}
	},
//Helper functions
	findPos : function(obj) {
		var curleft = 0, curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			    obj = obj.offsetParent;
			} while (obj);
			//do not change obj == obj.offsetParent
		}
		return [curleft,curtop];
	},
	createModal : function(aIDs, content, p, insertSelector, posSelector, appendsel, css) {
		var jgrid = $.jgrid, jqID = jgrid.jqID;
		p = $.extend(true, {}, jgrid.jqModal || {}, p);
		var mw = document.createElement('div'), rtlsup, self = this, themodalSelector = "#"+jqID(aIDs.themodal),
		scrollelmSelector = aIDs.scrollelm ? "#"+jqID(aIDs.scrollelm) : false;
		css = $.extend({}, css || {});
		rtlsup = $(p.gbox).attr("dir") === "rtl" ? true : false;
		mw.className= "ui-widget ui-widget-content ui-corner-all ui-jqdialog";
		mw.id = aIDs.themodal;
		var mh = document.createElement('div');
		mh.className = "ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix";
		mh.id = aIDs.modalhead;
		$(mh).append("<span class='ui-jqdialog-title'>"+p.caption+"</span>");
		var ahr= $("<a class='ui-jqdialog-titlebar-close ui-corner-all'></a>")
		.hover(function(){ahr.addClass('ui-state-hover');},
			function(){ahr.removeClass('ui-state-hover');})
		.append("<span class='ui-icon ui-icon-closethick'></span>");
		$(mh).append(ahr);
		if(rtlsup) {
			mw.dir = "rtl";
			$(".ui-jqdialog-title",mh).css("float","right");
			$(".ui-jqdialog-titlebar-close",mh).css("left",0.3+"em");
		} else {
			mw.dir = "ltr";
			$(".ui-jqdialog-title",mh).css("float","left");
			$(".ui-jqdialog-titlebar-close",mh).css("right",0.3+"em");
		}
		var mc = document.createElement('div');
		$(mc).addClass("ui-jqdialog-content ui-widget-content").attr("id",aIDs.modalcontent);
		$(mc).append(content);
		mw.appendChild(mc);
		$(mw).prepend(mh);
		if(appendsel===true) { $('body').append(mw); } //append as first child in body -for alert dialog
		else if (typeof appendsel === "string") {
			$(appendsel).append(mw);
		} else {$(mw).insertBefore(insertSelector);}
		$(mw).css(css);
		if(p.jqModal === undefined) {p.jqModal = true;} // internal use
		var coord = {};
		if ( $.fn.jqm && p.jqModal === true) {
			if(p.left ===0 && p.top===0 && p.overlay) {
				var pos = [];
				pos = jgrid.findPos(posSelector);
				p.left = pos[0] + 4;
				p.top = pos[1] + 4;
			}
			coord.top = p.top+"px";
			coord.left = p.left;
		} else if(p.left !==0 || p.top!==0) {
			coord.left = p.left;
			coord.top = p.top+"px";
		}
		$("a.ui-jqdialog-titlebar-close",mh).click(function(){
			var oncm = $(themodalSelector).data("onClose") || p.onClose;
			var gboxclose = $(themodalSelector).data("gbox") || p.gbox;
			self.hideModal(themodalSelector,{gb:gboxclose,jqm:p.jqModal,onClose:oncm, removemodal: p.removemodal || false, formprop : !p.recreateForm || false, form: p.form || ''});
			return false;
		});
		if (p.width === 0 || !p.width) {p.width = 300;}
		if(p.height === 0 || !p.height) {p.height =200;}
		if(!p.zIndex) {
			var parentZ = $(insertSelector).parents("*[role=dialog]").filter(':first').css("z-index");
			if(parentZ) {
				p.zIndex = parseInt(parentZ,10)+2;
			} else {
				p.zIndex = 950;
			}
		}
		var rtlt = 0;
		if( rtlsup && coord.left && !appendsel) {
			rtlt = $(p.gbox).width()- (!isNaN(p.width) ? parseInt(p.width,10) :0) - 8; // to do
		// just in case
			coord.left = parseInt(coord.left,10) + parseInt(rtlt,10);
		}
		if(coord.left) { coord.left += "px"; }
		$(mw).css($.extend({
			width: isNaN(p.width) ? "auto": p.width+"px",
			height:isNaN(p.height) ? "auto" : p.height + "px",
			zIndex:p.zIndex,
			overflow: 'hidden'
		},coord))
		.attr({tabIndex: "-1","role":"dialog","aria-labelledby":aIDs.modalhead,"aria-hidden":"true"});
		if(p.drag === undefined) { p.drag=true;}
		if(p.resize === undefined) {p.resize=true;}
		if (p.drag) {
			$(mh).css('cursor','move');
			if($.fn.jqDrag) {
				$(mw).jqDrag(mh);
			} else {
				try {
					$(mw).draggable({handle: $("#"+jqID(mh.id))});
				} catch (ignore) {}
			}
		}
		if(p.resize) {
			if($.fn.jqResize) {
				$(mw).append("<div class='jqResize ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se'></div>");
				$(themodalSelector).jqResize(".jqResize",scrollelmSelector);
			} else {
				try {
					$(mw).resizable({handles: 'se, sw',alsoResize: scrollelmSelector});
				} catch (ignore) {}
			}
		}
		if(p.closeOnEscape === true){
			$(mw).keydown( function( e ) {
				if( e.which === 27 ) {
					var cone = $(themodalSelector).data("onClose") || p.onClose;
					self.hideModal(themodalSelector,{gb:p.gbox,jqm:p.jqModal,onClose: cone, removemodal: p.removemodal || false, formprop : !p.recreateForm || false, form: p.form || ''});
				}
			});
		}
	},
	viewModal : function (selector,o){
		var jgrid = $.jgrid;
		o = $.extend({
			toTop: true,
			overlay: 10,
			modal: false,
			overlayClass : 'ui-widget-overlay',
			onShow: jgrid.showModal,
			onHide: jgrid.closeModal,
			gbox: '',
			jqm : true,
			jqM : true
		}, o || {});
		if ($.fn.jqm && o.jqm === true) {
			if(o.jqM) { $(selector).attr("aria-hidden","false").jqm(o).jqmShow(); }
			else {$(selector).attr("aria-hidden","false").jqmShow();}
		} else {
			if(o.gbox !== '') {
				$(".jqgrid-overlay:first",o.gbox).show();
				$(selector).data("gbox",o.gbox);
			}
			$(selector).show().attr("aria-hidden","false");
			try{$(':input:visible',selector)[0].focus();}catch(ignore){}
		}
	},
	info_dialog : function(caption, content,c_b, modalopt) {
		var mopt = {
			width:290,
			height:'auto',
			dataheight: 'auto',
			drag: true,
			resize: false,
			left:250,
			top:170,
			zIndex : 1000,
			jqModal : true,
			modal : false,
			closeOnEscape : true,
			align: 'center',
			buttonalign : 'center',
			buttons : []
		// {text:'textbutt', id:"buttid", onClick : function(){...}}
		// if the id is not provided we set it like info_button_+ the index in the array - i.e info_button_0,info_button_1...
		}, jgrid = $.jgrid;
		$.extend(true, mopt, jgrid.jqModal || {}, {caption:"<b>"+caption+"</b>"}, modalopt || {});
		var jm = mopt.jqModal, self = this;
		if($.fn.jqm && !jm) { jm = false; }
		// in case there is no jqModal
		var buttstr ="", i;
		if(mopt.buttons.length > 0) {
			for(i=0;i<mopt.buttons.length;i++) {
				if(mopt.buttons[i].id === undefined) { mopt.buttons[i].id = "info_button_"+i; }
				buttstr += "<a id='"+mopt.buttons[i].id+"' class='fm-button ui-state-default ui-corner-all'>"+mopt.buttons[i].text+"</a>";
			}
		}
		var dh = isNaN(mopt.dataheight) ? mopt.dataheight : mopt.dataheight+"px",
		cn = "text-align:"+mopt.align+";";
		var cnt = "<div id='info_id'>";
		cnt += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:"+dh+";"+cn+"'>"+content+"</div>";
		cnt += c_b ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:"+mopt.buttonalign+";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a id='closedialog' class='fm-button ui-state-default ui-corner-all'>"+c_b+"</a>"+buttstr+"</div>" :
			buttstr !== ""  ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:"+mopt.buttonalign+";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'>"+buttstr+"</div>" : "";
		cnt += "</div>";

		try {
			if($("#info_dialog").attr("aria-hidden") === "false") {
				jgrid.hideModal("#info_dialog",{jqm:jm});
			}
			$("#info_dialog").remove();
		} catch (ignore){}
		jgrid.createModal({
			themodal:'info_dialog',
			modalhead:'info_head',
			modalcontent:'info_content',
			scrollelm: 'infocnt'},
			cnt,
			mopt,
			'','',true
		);
		// attach onclick after inserting into the dom
		if(buttstr) {
			$.each(mopt.buttons,function(i){
				$("#"+jgrid.jqID(this.id),"#info_id").bind('click',function(){mopt.buttons[i].onClick.call($("#info_dialog")); return false;});
			});
		}
		$("#closedialog", "#info_id").click(function(){
			self.hideModal("#info_dialog",{
				jqm:jm,
				onClose: $("#info_dialog").data("onClose") || mopt.onClose,
				gb: $("#info_dialog").data("gbox") || mopt.gbox
			});
			return false;
		});
		$(".fm-button","#info_dialog").hover(
			function(){$(this).addClass('ui-state-hover');},
			function(){$(this).removeClass('ui-state-hover');}
		);
		if($.isFunction(mopt.beforeOpen) ) { mopt.beforeOpen(); }
		jgrid.viewModal("#info_dialog",{
			onHide: function(h) {
				h.w.hide().remove();
				if(h.o) { h.o.remove(); }
			},
			modal :mopt.modal,
			jqm:jm
		});
		if($.isFunction(mopt.afterOpen) ) { mopt.afterOpen(); }
		try{ $("#info_dialog").focus();} catch (ignore){}
	},
	bindEv: function  (el, opt) {
		var $t = this;
		if($.isFunction(opt.dataInit)) {
			opt.dataInit.call($t,el,opt);
		}
		if(opt.dataEvents) {
			$.each(opt.dataEvents, function() {
				if (this.data !== undefined) {
					$(el).bind(this.type, this.data, this.fn);
				} else {
					$(el).bind(this.type, this.fn);
				}
			});
		}
	},
// Form Functions
	createEl : function(eltype,options,vl,autowidth, ajaxso) {
		var elem = "", $t = this, jgrid = $.jgrid, infoDialog = jgrid.info_dialog,
		errcap = jgrid.errors.errcap, edit = jgrid.edit, editMsg = jgrid.edit.msg, bClose = edit.bClose;
		function setAttributes(elm, atr, exl ) {
			var exclude = ['dataInit','dataEvents','dataUrl', 'buildSelect','sopt', 'searchhidden', 'defaultValue', 'attr', 'custom_element', 'custom_value'];
			if(exl !== undefined && $.isArray(exl)) {
				$.merge(exclude, exl);
			}
			$.each(atr, function(key, value){
				if($.inArray(key, exclude) === -1) {
					$(elm).attr(key,value);
				}
			});
			if(!atr.hasOwnProperty('id')) {
				$(elm).attr('id', jgrid.randId());
			}
		}
		switch (eltype)
		{
			case "textarea" :
				elem = document.createElement("textarea");
				if(autowidth) {
					if(!options.cols) { $(elem).css({width:"98%"});}
				} else if (!options.cols) { options.cols = 20; }
				if(!options.rows) { options.rows = 2; }
				if(vl==='&nbsp;' || vl==='&#160;' || (vl.length===1 && vl.charCodeAt(0)===160)) {vl="";}
				elem.value = vl;
				setAttributes(elem, options);
				$(elem).attr({"role":"textbox","multiline":"true"});
			break;
			case "checkbox" : //what code for simple checkbox
				elem = document.createElement("input");
				elem.type = "checkbox";
				if( !options.value ) {
					var vl1 = String(vl).toLowerCase();
					if(vl1.search(/(false|f|0|no|n|off|undefined)/i)<0 && vl1!=="") {
						elem.checked=true;
						elem.defaultChecked=true;
						elem.value = vl;
					} else {
						elem.value = "on";
					}
					$(elem).attr("offval","off");
				} else {
					var cbval = options.value.split(":");
					if(vl === cbval[0]) {
						elem.checked=true;
						elem.defaultChecked=true;
					}
					elem.value = cbval[0];
					$(elem).attr("offval",cbval[1]);
				}
				setAttributes(elem, options, ['value']);
				$(elem).attr("role","checkbox");
			break;
			case "select" :
				elem = document.createElement("select");
				elem.setAttribute("role","select");
				var msl, ovm = [];
				if(options.multiple===true) {
					msl = true;
					elem.multiple="multiple";
					$(elem).attr("aria-multiselectable","true");
				} else { msl = false; }
				if(options.dataUrl !== undefined) {
					var rowid = null, postData = options.postData || ajaxso.postData;
					try {
						rowid = options.rowId;
					} catch(ignore) {}

					if ($t.p && $t.p.idPrefix) {
						rowid = jgrid.stripPref($t.p.idPrefix, rowid);
					}
					$.ajax($.extend({
						url: $.isFunction(options.dataUrl) ? options.dataUrl.call($t, rowid, vl, String(options.name)) : options.dataUrl,
						type : "GET",
						dataType: "html",
						data: $.isFunction(postData) ? postData.call($t, rowid, vl, String(options.name)) : postData,
						context: {elem:elem, options:options, vl:vl},
						success: function(data){
							var ovm1 = [], elem1 = this.elem, vl2 = this.vl,
							options1 = $.extend({},this.options),
							msl1 = options1.multiple===true,
							a = $.isFunction(options1.buildSelect) ? options1.buildSelect.call($t,data) : data;
							if(typeof a === 'string') {
								a = $( $.trim( a ) ).html();
							}
							if(a) {
								$(elem1).append(a);
								setAttributes(elem1, options1, postData ? ['postData'] : undefined );
								if(options1.size === undefined) { options1.size =  msl1 ? 3 : 1;}
								if(msl1) {
									ovm1 = vl2.split(",");
									ovm1 = $.map(ovm1,function(n){return $.trim(n);});
								} else {
									ovm1[0] = $.trim(vl2);
								}
								//$(elem).attr(options);
								setTimeout(function(){
									$("option",elem1).each(function(i){
										//if(i===0) { this.selected = ""; }
										// fix IE8/IE7 problem with selecting of the first item on multiple=true
										if (i === 0 && elem1.multiple) { this.selected = false; }
										$(this).attr("role","option");
										if($.inArray($.trim($(this).text()),ovm1) > -1 || $.inArray($.trim($(this).val()),ovm1) > -1 ) {
											this.selected= "selected";
										}
									});
								},0);
							}
						}
					},ajaxso || {}));
				} else if(options.value) {
					var i;
					if(options.size === undefined) {
						options.size = msl ? 3 : 1;
					}
					if(msl) {
						ovm = vl.split(",");
						ovm = $.map(ovm,function(n){return $.trim(n);});
					}
					if(typeof options.value === 'function') { options.value = options.value(); }
					var so,sv, ov, 
					sep = options.separator === undefined ? ":" : options.separator,
					delim = options.delimiter === undefined ? ";" : options.delimiter,
                    mapFunc = function(n,ii){if(ii>0) { return n;} };
					if(typeof options.value === 'string') {
						so = options.value.split(delim);
						for(i=0; i<so.length;i++){
							sv = so[i].split(sep);
							if(sv.length > 2 ) {
							    sv[1] = $.map(sv, mapFunc).join(sep);
							}
							ov = document.createElement("option");
							ov.setAttribute("role","option");
							ov.value = sv[0]; ov.innerHTML = sv[1];
							elem.appendChild(ov);
							if (!msl &&  ($.trim(sv[0]) === $.trim(vl) || $.trim(sv[1]) === $.trim(vl))) { ov.selected ="selected"; }
							if (msl && ($.inArray($.trim(sv[1]), ovm)>-1 || $.inArray($.trim(sv[0]), ovm)>-1)) {ov.selected ="selected";}
						}
					} else if (typeof options.value === 'object') {
						var oSv = options.value, key;
						for (key in oSv) {
							if (oSv.hasOwnProperty(key ) ){
								ov = document.createElement("option");
								ov.setAttribute("role","option");
								ov.value = key; ov.innerHTML = oSv[key];
								elem.appendChild(ov);
								if (!msl &&  ( $.trim(key) === $.trim(vl) || $.trim(oSv[key]) === $.trim(vl)) ) { ov.selected ="selected"; }
								if (msl && ($.inArray($.trim(oSv[key]),ovm)>-1 || $.inArray($.trim(key),ovm)>-1)) { ov.selected ="selected"; }
							}
						}
					}
					setAttributes(elem, options, ['value']);
				}
			break;
			case "text" :
			case "password" :
			case "button" :
				var role;
				if(eltype==="button") { role = "button"; }
				else { role = "textbox"; }
				elem = document.createElement("input");
				elem.type = eltype;
				elem.value = vl;
				setAttributes(elem, options);
				if(eltype !== "button"){
					if(autowidth) {
						if(!options.size) { $(elem).css({width:"98%"}); }
					} else if (!options.size) { options.size = 20; }
				}
				$(elem).attr("role",role);
			break;
			case "image" :
			case "file" :
				elem = document.createElement("input");
				elem.type = eltype;
				setAttributes(elem, options);
				break;
			case "custom" :
				elem = document.createElement("span");
				try {
					if($.isFunction(options.custom_element)) {
						var celm = options.custom_element.call($t,vl,options);
						if(celm) {
							celm = $(celm).addClass("customelement").attr({id:options.id,name:options.name});
							$(elem).empty().append(celm);
						} else {
							throw "e2";
						}
					} else {
						throw "e1";
					}
				} catch (e) {
					if (e==="e1") { infoDialog(errcap,"function 'custom_element' "+editMsg.nodefined, bClose);}
					if (e==="e2") { infoDialog(errcap,"function 'custom_element' "+editMsg.novalue,bClose);}
					else { infoDialog(errcap,typeof e==="string"?e:e.message,bClose); }
				}
			break;
		}
		return elem;
	},
// Date Validation Javascript
	checkDate : function (format, date) {
		var daysInFebruary = function(year){
		// February has 29 days in any year evenly divisible by four,
		// EXCEPT for centurial years which are not also divisible by 400.
			return (((year % 4 === 0) && ( year % 100 !== 0 || (year % 400 === 0))) ? 29 : 28 );
		},
		tsp = {}, sep;
		format = format.toLowerCase();
		//we search for /,-,. for the date separator
		if(format.indexOf("/") !== -1) {
			sep = "/";
		} else if(format.indexOf("-") !== -1) {
			sep = "-";
		} else if(format.indexOf(".") !== -1) {
			sep = ".";
		} else {
			sep = "/";
		}
		format = format.split(sep);
		date = date.split(sep);
		if (date.length !== 3) { return false; }
		var j=-1,yln, dln=-1, mln=-1, i, dv;
		for(i=0;i<format.length;i++){
			dv = isNaN(date[i]) ? 0 : parseInt(date[i],10);
			tsp[format[i]] = dv;
			yln = format[i];
			if(yln.indexOf("y") !== -1) { j=i; }
			if(yln.indexOf("m") !== -1) { mln=i; }
			if(yln.indexOf("d") !== -1) { dln=i; }
		}
		if (format[j] === "y" || format[j] === "yyyy") {
			yln=4;
		} else if(format[j] ==="yy"){
			yln = 2;
		} else {
			yln = -1;
		}
		var daysInMonth = [0,31,29,31,30,31,30,31,31,30,31,30,31],
		strDate;
		if (j === -1) {
			return false;
		}
			strDate = tsp[format[j]].toString();
			if(yln === 2 && strDate.length === 1) {yln = 1;}
			if (strDate.length !== yln || (tsp[format[j]]===0 && date[j]!=="00")){
				return false;
			}
		if(mln === -1) {
			return false;
		}
			strDate = tsp[format[mln]].toString();
			if (strDate.length<1 || tsp[format[mln]]<1 || tsp[format[mln]]>12){
				return false;
			}
		if(dln === -1) {
			return false;
		}
			strDate = tsp[format[dln]].toString();
			if (strDate.length<1 || tsp[format[dln]]<1 || tsp[format[dln]]>31 || (tsp[format[mln]]===2 && tsp[format[dln]]>daysInFebruary(tsp[format[j]])) || tsp[format[dln]] > daysInMonth[tsp[format[mln]]]){
				return false;
			}
		return true;
	},
	isEmpty : function(val) {
		if (val.match(/^\s+$/) || val === "")	{
			return true;
		}
		return false;
	},
	checkTime : function(time){
	// checks only hh:ss (and optional am/pm)
		var re = /^(\d{1,2}):(\d{2})([apAP][Mm])?$/,regs;
		if(!$.jgrid.isEmpty(time))
		{
			regs = time.match(re);
			if(regs) {
				if(regs[3]) {
					if(regs[1] < 1 || regs[1] > 12) { return false; }
				} else {
					if(regs[1] > 23) { return false; }
				}
				if(regs[2] > 59) {
					return false;
				}
			} else {
				return false;
			}
		}
		return true;
	},
	checkValues : function(val, valref, customobject, nam) {
		var edtrul,i, nm, dft, len, g = this, p = g.p, cm = p.colModel, jgrid = $.jgrid, isEmpty = jgrid.isEmpty,
		editMsg = jgrid.edit.msg, dateMasks = jgrid.formatter.date.masks;
		if(customobject === undefined) {
			if(typeof valref==='string'){
				for( i =0, len=cm.length;i<len; i++){
					if(cm[i].name===valref) {
						edtrul = cm[i].editrules;
						valref = i;
						if(cm[i].formoptions != null) { nm = cm[i].formoptions.label; }
						break;
					}
				}
			} else if(valref >=0) {
				edtrul = cm[valref].editrules;
			}
		} else {
			edtrul = customobject;
			nm = nam===undefined ? "_" : nam;
		}
		if(edtrul) {
			if(!nm) { nm = p.colNames != null ? p.colNames[valref] : cm[valref].label; }
			if(edtrul.required === true) {
				if( isEmpty(val) )  { return [false,nm+": "+editMsg.required,""]; }
			}
			// force required
			var rqfield = edtrul.required === false ? false : true;
			if(edtrul.number === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
					if(isNaN(val)) { return [false,nm+": "+editMsg.number,""]; }
				}
			}
			if(edtrul.minValue !== undefined && !isNaN(edtrul.minValue)) {
				if (parseFloat(val) < parseFloat(edtrul.minValue) ) { return [false,nm+": "+editMsg.minValue+" "+edtrul.minValue,""];}
			}
			if(edtrul.maxValue !== undefined && !isNaN(edtrul.maxValue)) {
				if (parseFloat(val) > parseFloat(edtrul.maxValue) ) { return [false,nm+": "+editMsg.maxValue+" "+edtrul.maxValue,""];}
			}
			var filter;
			if(edtrul.email === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
				// taken from $ Validate plugin
					filter = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
					if(!filter.test(val)) {return [false,nm+": "+editMsg.email,""];}
				}
			}
			if(edtrul.integer === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
					if(isNaN(val)) { return [false,nm+": "+editMsg.integer,""]; }
					if ((val % 1 !== 0) || (val.indexOf('.') !== -1)) { return [false,nm+": "+editMsg.integer,""];}
				}
			}
			if(edtrul.date === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
					if(cm[valref].formatoptions && cm[valref].formatoptions.newformat) {
						dft = cm[valref].formatoptions.newformat;
						if( dateMasks.hasOwnProperty(dft) ) {
							dft = dateMasks[dft];
						}
					} else {
						dft = cm[valref].datefmt || "Y-m-d";
					}
					if(!jgrid.checkDate (dft, val)) { return [false,nm+": "+editMsg.date+" - "+dft,""]; }
				}
			}
			if(edtrul.time === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
					if(!jgrid.checkTime (val)) { return [false,nm+": "+editMsg.date+" - hh:mm (am/pm)",""]; }
				}
			}
			if(edtrul.url === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
					filter = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
					if(!filter.test(val)) {return [false,nm+": "+editMsg.url,""];}
				}
			}
			if(edtrul.custom === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
					if($.isFunction(edtrul.custom_func)) {
						var ret = edtrul.custom_func.call(g,val,nm,valref);
						return $.isArray(ret) ? ret : [false,editMsg.customarray,""];
					}
					return [false,editMsg.customfcheck,""];
				}
			}
		}
		return [true,"",""];
	}
});
}(jQuery));
/*jshint eqeqeq:false */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
(function($){
/**
 * jqGrid extension for custom methods
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * 
 * Wildraid wildraid@mail.ru
 * Oleg Kiriljuk oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
"use strict";
$.jgrid.extend({
	getColProp : function(colname){
		var ret ={}, $t = this[0];
		if ( !$t.grid ) { return false; }
		var cM = $t.p.colModel, i;
		for ( i=0;i<cM.length;i++ ) {
			if ( cM[i].name === colname ) {
				ret = cM[i];
				break;
			}
		}
		return ret;
	},
	setColProp : function(colname, obj){
		//do not set width will not work
		return this.each(function(){
			var self = this, p = self.p; 
			if (self.grid && p != null && obj) {
				var cM = p.colModel, i;
				for ( i=0;i<cM.length;i++ ) {
					if ( cM[i].name === colname ) {
						$.extend(true, cM[i],obj);
						break;
					}
				}
			}
		});
	},
	sortGrid : function(colname, reload, sor){
		return this.each(function(){
			var self = this, grid = self.grid, p = self.p, colModel = p.colModel, l = colModel.length, cm, i, sobj = false, sort;
			if (!grid) { return; }
			if (!colname) { colname = p.sortname; }
			if (typeof reload !=='boolean') { reload = false; }
			for (i = 0; i < l; i++) {
				cm = colModel[i];
				if (cm.index === colname || cm.name === colname) {
					if (p.frozenColumns === true && cm.frozen === true) {
						sobj = grid.fhDiv.find("#" + p.id + "_" + colname);
					}
					if (!sobj || sobj.length === 0) {
						sobj = grid.headers[i].el;
					}
					sort = cm.sortable;
					if (typeof sort !== 'boolean' || sort) {
						self.sortData("jqgh_"+p.id+"_" + colname, i, reload, sor, sobj);
					}
					break;
				}
			}
		});
	},
	clearBeforeUnload : function () {
		return this.each(function(){
			var self = this, p = self.p, grid = self.grid, propOrMethod, clearArray = $.jgrid.clearArray;
			if ($.isFunction(grid.emptyRows)) {
				grid.emptyRows.call(self, true, true); // this work quick enough and reduce the size of memory leaks if we have someone
			}

			$(document).unbind("mouseup.jqGrid" + p.id ); 
			$(grid.hDiv).unbind("mousemove"); // TODO add namespace
			$(self).unbind();

			/*grid.dragEnd = null;
			grid.dragMove = null;
			grid.dragStart = null;
			grid.emptyRows = null;
			grid.populate = null;
			grid.populateVisible = null;
			grid.scrollGrid = null;
			grid.selectionPreserver = null;

			grid.bDiv = null;
			grid.cDiv = null;
			grid.hDiv = null;
			grid.cols = null;*/
			var i, l = grid.headers.length;
			for (i = 0; i < l; i++) {
				grid.headers[i].el = null;
			}
			for (propOrMethod in grid) {
				if (grid.hasOwnProperty(propOrMethod)) {
					grid.propOrMethod = null;
				}
			}

			/*self.formatCol = null;
			self.sortData = null;
			self.updatepager = null;
			self.refreshIndex = null;
			self.setHeadCheckBox = null;
			self.constructTr = null;
			self.formatter = null;
			self.addXmlData = null;
			self.addJSONData = null;
			self.grid = null;*/

			var propOrMethods = ['formatCol','sortData','updatepager','refreshIndex','setHeadCheckBox','constructTr','formatter','addXmlData','addJSONData','nav','grid','p'];
			l = propOrMethods.length;
			for(i = 0; i < l; i++) {
				if(self.hasOwnProperty(propOrMethods[i])) {
					self[propOrMethods[i]] = null;
				}
			}
			self._index = {};
			clearArray(p.data);
			clearArray(p.lastSelectedData);
			clearArray(p.selarrrow);
			clearArray(p.savedRow);
		});
	},
	GridDestroy : function () {
		return this.each(function(){
			var self = this, p = self.p, pager = p.pager;
			if ( self.grid ) { 
				if (pager) { // if not part of grid
					$(pager).remove();
				}
				try {
					$(self).jqGrid('clearBeforeUnload');
					$(p.gBox).remove();
					$("#alertmod_"+p.idSel).remove();
				} catch (ignore) {}
			}
		});
	},
	GridUnload : function(){
		return this.each(function(){
			var self = this, p = self.p;
			if ( !self.grid ) {return;}
			var defgrid = {id: $(self).attr('id'),cl: $(self).attr('class')};
			if (p.pager) {
				$(p.pager).empty().removeClass("ui-state-default ui-jqgrid-pager ui-corner-bottom");
			}
			var newtable = document.createElement('table');
			$(newtable).attr({id:defgrid.id});
			newtable.className = defgrid.cl;
			$(newtable).removeClass("ui-jqgrid-btable");
			if( $(p.pager).parents(p.gBox).length === 1 ) {
				$(newtable).insertBefore(p.gBox).show();
				$(p.pager).insertBefore(p.gBox);
			} else {
				$(newtable).insertBefore(p.gBox).show();
			}
			$(self).jqGrid('clearBeforeUnload');
			$(p.gBox).remove();
		});
	},
	setGridState : function(state) {
		return this.each(function(){
			var $t = this, p = $t.p, grid = $t.grid, cDiv = grid.cDiv, $uDiv = $(grid.uDiv), $ubDiv = $(grid.ubDiv);
			if (!grid) {return;}
			if(state === 'hidden'){
				$(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv",p.gView).slideUp("fast");
				if(p.pager) {$(p.pager).slideUp("fast");}
				if(p.toppager) {$(p.toppager).slideUp("fast");}
				if(p.toolbar[0]===true) {
					if( p.toolbar[1] === 'both') {
						$ubDiv.slideUp("fast");
					}
					$uDiv.slideUp("fast");
				}
				if(p.footerrow) { $(".ui-jqgrid-sdiv",p.gBox).slideUp("fast"); }
				$(".ui-jqgrid-titlebar-close span",cDiv).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s");
				p.gridstate = 'hidden';
			} else if(state === 'visible') {
				$(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv",p.gView).slideDown("fast");
				if(p.pager) {$(p.pager).slideDown("fast");}
				if(p.toppager) {$(p.toppager).slideDown("fast");}
				if(p.toolbar[0]===true) {
					if( p.toolbar[1] === 'both') {
						$ubDiv.slideDown("fast");
					}
					$uDiv.slideDown("fast");
				}
				if(p.footerrow) { $(".ui-jqgrid-sdiv",p.gBox).slideDown("fast"); }
				$(".ui-jqgrid-titlebar-close span",cDiv).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n");
				p.gridstate = 'visible';
			}

		});
	},
	filterToolbar : function(o){
		var jgrid = $.jgrid;
		o = $.extend({
			autosearch: true,
			autosearchDelay: 500,
			searchOnEnter : true,
			beforeSearch: null,
			afterSearch: null,
			beforeClear: null,
			afterClear: null,
			searchurl : '',
			stringResult: false,
			groupOp: 'AND',
			defaultSearch : "bw",
			searchOperators : false,
			resetIcon : "x",
			operands : { "eq" :"==", "ne":"!","lt":"<","le":"<=","gt":">","ge":">=","bw":"^","bn":"!^","in":"=","ni":"!=","ew":"|","en":"!@","cn":"~","nc":"!~","nu":"#","nn":"!#"}
		}, jgrid.search , o  || {});
		return this.each(function(){
			var $t = this, grid = $t.grid, $self = $($t), p = $t.p, bindEv = jgrid.bindEv, info_dialog = jgrid.info_dialog;
			if(this.ftoolbar) { return; }
			var colModel = p.colModel, errcap = jgrid.errors.errcap, bClose = jgrid.edit.bClose, editMsg = jgrid.edit.msg, jqID = jgrid.jqID;
			var triggerToolbar = function() {
				var sdata={}, j=0, v, nm, sopt={},so;
				$.each(colModel,function(){
					var cm = this, $elem = $("#gs_"+jqID(cm.name), (cm.frozen===true && p.frozenColumns === true) ?  grid.fhDiv : grid.hDiv);
					nm = cm.index || cm.name;
					if(o.searchOperators ) {
						so = $elem.parent().prev().children("a").attr("soper") || o.defaultSearch;
					} else {
						so  = (cm.searchoptions && cm.searchoptions.sopt) ? cm.searchoptions.sopt[0] : cm.stype==='select'?  'eq' : o.defaultSearch;
					}
					v = cm.stype === "custom" && $.isFunction(cm.searchoptions.custom_value) && $elem.length > 0 && $elem[0].nodeName.toUpperCase() === "SPAN" ?
						cm.searchoptions.custom_value.call($t, $elem.children(".customelement:first"), "get") :
						$elem.val();
					if(v || so==="nu" || so==="nn") {
						sdata[nm] = v;
						sopt[nm] = so;
						j++;
					} else {
						try {
							delete p.postData[nm];
						} catch (ignore) {}
					}
				});
				var sd =  j>0 ? true : false;
				if(o.stringResult === true || p.datatype === "local" || o.searchOperators === true) {
					var ruleGroup = "{\"groupOp\":\"" + o.groupOp + "\",\"rules\":[";
					var gi=0;
					$.each(sdata,function(i,n){
						if (gi > 0) {ruleGroup += ",";}
						ruleGroup += "{\"field\":\"" + i + "\",";
						ruleGroup += "\"op\":\"" + sopt[i] + "\",";
						n+="";
						ruleGroup += "\"data\":\"" + n.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + "\"}";
						gi++;
					});
					ruleGroup += "]}";
					$.extend(p.postData,{filters:ruleGroup});
					$.each(['searchField', 'searchString', 'searchOper'], function(i, n){
						if(p.postData.hasOwnProperty(n)) { delete p.postData[n];}
					});
				} else {
					$.extend(p.postData,sdata);
				}
				var saveurl;
				if(p.searchurl) {
					saveurl = p.url;
					$self.jqGrid("setGridParam",{url:p.searchurl});
				}
				var bsr = $self.triggerHandler("jqGridToolbarBeforeSearch") === 'stop' ? true : false;
				if(!bsr && $.isFunction(o.beforeSearch)){bsr = o.beforeSearch.call($t);}
				if(!bsr) { $self.jqGrid("setGridParam",{search:sd}).trigger("reloadGrid",[{page:1}]); }
				if(saveurl) {$self.jqGrid("setGridParam",{url:saveurl});}
				$self.triggerHandler("jqGridToolbarAfterSearch");
				if($.isFunction(o.afterSearch)){o.afterSearch.call($t);}
			},
			clearToolbar = function(trigger){
				var sdata={}, j=0, nm;
				trigger = (typeof trigger !== 'boolean') ? true : trigger;
				$.each(colModel,function(){
					var v, cm = this, $elem = $("#gs_"+jqID(cm.name),(cm.frozen===true && p.frozenColumns === true) ?  grid.fhDiv : grid.hDiv);
					if(cm.searchoptions && cm.searchoptions.defaultValue !== undefined) { v = cm.searchoptions.defaultValue; }
					nm = cm.index || cm.name;
					switch (cm.stype) {
						case 'select' :
							$elem.find("option").each(function (i){
								if(i===0) { this.selected = true; }
								if ($(this).val() === v) {
									this.selected = true;
									return false;
								}
							});
							if ( v !== undefined ) {
								// post the key and not the text
								sdata[nm] = v;
								j++;
							} else {
								try {
									delete p.postData[nm];
								} catch(ignore) {}
							}
							break;
						case 'text':
							$elem.val(v || "");
							if(v !== undefined) {
								sdata[nm] = v;
								j++;
							} else {
								try {
									delete p.postData[nm];
								} catch (ignore){}
							}
							break;
						case 'custom':
							if ($.isFunction(cm.searchoptions.custom_value) && $elem.length > 0 && $elem[0].nodeName.toUpperCase() === "SPAN") {
								cm.searchoptions.custom_value.call($t, $elem.children(".customelement:first"), "set", v || "");
							}
							break;
					}
				});
				var sd =  j>0 ? true : false;
				p.resetsearch =  true;
				if(o.stringResult === true || p.datatype === "local") {
					var ruleGroup = "{\"groupOp\":\"" + o.groupOp + "\",\"rules\":[";
					var gi=0;
					$.each(sdata,function(i,n){
						if (gi > 0) {ruleGroup += ",";}
						ruleGroup += "{\"field\":\"" + i + "\",";
						ruleGroup += "\"op\":\"" + "eq" + "\",";
						n+="";
						ruleGroup += "\"data\":\"" + n.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + "\"}";
						gi++;
					});
					ruleGroup += "]}";
					$.extend(p.postData,{filters:ruleGroup});
					$.each(['searchField', 'searchString', 'searchOper'], function(i, n){
						if(p.postData.hasOwnProperty(n)) { delete p.postData[n];}
					});
				} else {
					$.extend(p.postData,sdata);
				}
				var saveurl;
				if(p.searchurl) {
					saveurl = p.url;
					$self.jqGrid("setGridParam",{url:p.searchurl});
				}
				var bcv = $self.triggerHandler("jqGridToolbarBeforeClear") === 'stop' ? true : false;
				if(!bcv && $.isFunction(o.beforeClear)){bcv = o.beforeClear.call($t);}
				if(!bcv) {
					if(trigger) {
						$self.jqGrid("setGridParam",{search:sd}).trigger("reloadGrid",[{page:1}]);
					}
				}
				if(saveurl) {$self.jqGrid("setGridParam",{url:saveurl});}
				$self.triggerHandler("jqGridToolbarAfterClear");
				if($.isFunction(o.afterClear)){o.afterClear();}
			},
			toggleToolbar = function(){
				var trow = $("tr.ui-search-toolbar",grid.hDiv),
				trow2 = p.frozenColumns === true ?  $("tr.ui-search-toolbar",grid.fhDiv) : false;
				if(trow.css("display") === 'none') {
					trow.show(); 
					if(trow2) {
						trow2.show();
					}
				} else { 
					trow.hide(); 
					if(trow2) {
						trow2.hide();
					}
				}
			},
			buildRuleMenu = function( elem, left, top ){
				$("#sopt_menu").remove();

				left=parseInt(left,10);
				top=parseInt(top,10) + 18;

				var fs =  $('.ui-jqgrid-view').css('font-size') || '11px';
				var str = '<ul id="sopt_menu" class="ui-search-menu" role="menu" tabindex="0" style="font-size:'+fs+';left:'+left+'px;top:'+top+'px;">',
				selected = $(elem).attr("soper"), selclass,
				aoprs = [], ina;
				var i=0, nm =$(elem).attr("colname"),len = colModel.length;
				while(i<len) {
					if(colModel[i].name === nm) {
						break;
					}
					i++;
				}
				var cm = colModel[i], options = $.extend({}, cm.searchoptions);
				if(!options.sopt) {
					options.sopt = [];
					options.sopt[0]= cm.stype==='select' ?  'eq' : o.defaultSearch;
				}
				$.each(o.odata, function() { aoprs.push(this.oper); });
				for ( i = 0 ; i < options.sopt.length; i++) {
					ina = $.inArray(options.sopt[i],aoprs);
					if(ina !== -1) {
						selclass = selected === o.odata[ina].oper ? "ui-state-highlight" : "";
						str += '<li class="ui-menu-item '+selclass+'" role="presentation"><a class="ui-corner-all g-menu-item" tabindex="0" role="menuitem" value="'+o.odata[ina].oper+'" oper="'+o.operands[o.odata[ina].oper]+'"><table'+(jgrid.msie && jgrid.msiever() < 8 ? ' cellspacing="0"' : '')+'><tr><td width="25px">'+o.operands[o.odata[ina].oper]+'</td><td>'+ o.odata[ina].text+'</td></tr></table></a></li>';
					}
				}
				str += "</ul>";
				$('body').append(str);
				$("#sopt_menu").addClass("ui-menu ui-widget ui-widget-content ui-corner-all");
				$("#sopt_menu > li > a").hover(
					function(){ $(this).addClass("ui-state-hover"); },
					function(){ $(this).removeClass("ui-state-hover"); }
				).click(function(){
					var v = $(this).attr("value"),
					oper = $(this).attr("oper");
					$self.triggerHandler("jqGridToolbarSelectOper", [v, oper, elem]);
					$("#sopt_menu").hide();
					$(elem).text(oper).attr("soper",v);
					if(o.autosearch===true){
						var inpelm = $(elem).parent().next().children()[0];
						if( $(inpelm).val() || v==="nu" || v ==="nn") {
							triggerToolbar();
						}
					}
				});
			};
			// create the row
			var tr = $("<tr class='ui-search-toolbar' role='row'></tr>");
			var timeoutHnd;
			$.each(colModel,function(ci){
				var cm=this, soptions, surl, self, select = "", sot="=", so, i, searchoptions = cm.searchoptions, editoptions = cm.editoptions,
				th = $("<th role='columnheader' class='ui-state-default ui-th-column ui-th-"+p.direction+"'></th>"),
				thd = $("<div style='position:relative;height:auto;padding-right:0.3em;padding-left:0.3em;'></div>"),
				stbl = $("<table class='ui-search-table'"+(jgrid.msie && jgrid.msiever() < 8 ? " cellspacing='0'" : "")+"><tr><td class='ui-search-oper'></td><td class='ui-search-input'></td><td class='ui-search-clear'></td></tr></table>");
				if(this.hidden===true) { $(th).css("display","none");}
				this.search = this.search === false ? false : true;
				if(this.stype === undefined) {this.stype='text';}
				soptions = $.extend({},this.searchoptions || {});
				if(this.search){
					if(o.searchOperators) {
						so  = (soptions.sopt) ? soptions.sopt[0] : cm.stype==='select' ?  'eq' : o.defaultSearch;
						for(i = 0;i<o.odata.length;i++) {
							if(o.odata[i].oper === so) {
								sot = o.operands[so] || "";
								break;
							}
						}
						var st = soptions.searchtitle != null ? soptions.searchtitle : o.operandTitle;
						select = "<a title='"+st+"' style='padding-right: 0.5em;' soper='"+so+"' class='soptclass' colname='"+this.name+"'>"+sot+"</a>";
					}
					$("td:eq(0)",stbl).data("colindex",ci).append(select);
					if (soptions.sopt == null || soptions.sopt.length === 1) {
						$("td.ui-search-oper",stbl).hide();
					}
					if(soptions.clearSearch === undefined) {
						soptions.clearSearch = this.stype === "text" ? true : false;
					}
					if(soptions.clearSearch) {
						var csv = o.resetTitle || 'Clear Search Value';
						$("td:eq(2)",stbl).append("<a title='"+csv+"' style='padding-right: 0.3em;padding-left: 0.3em;' class='clearsearchclass'>"+o.resetIcon+"</a>");
					} else {
						$("td:eq(2)", stbl).hide();
					}
					switch (this.stype)
					{
					case "select":
						surl = this.surl || soptions.dataUrl;
						if(surl) {
							// data returned should have already constructed html select
							// primitive jQuery load
							self = thd;
							$(self).append(stbl);
							$.ajax($.extend({
								url: surl,
								dataType: "html",
								success: function(res) {
									if(soptions.buildSelect !== undefined) {
										var d = soptions.buildSelect(res);
										if (d) {
											$("td:eq(1)",stbl).append(d);
										}
									} else {
										$("td:eq(1)",stbl).append(res);
									}
									if(soptions.defaultValue !== undefined) { $("select",self).val(soptions.defaultValue); }
									$("select",self).attr({name:cm.index || cm.name, id: "gs_"+cm.name});
									if(soptions.attr) {$("select",self).attr(soptions.attr);}
									$("select",self).css({width: "100%"});
									// preserve autoserch
									bindEv.call($t, $("select",self)[0], soptions);
									if(o.autosearch===true){
										$("select",self).change(function(){
											triggerToolbar();
											return false;
										});
									}
									res=null;
								}
							}, jgrid.ajaxOptions, p.ajaxSelectOptions || {} ));
						} else {
							var oSv, sep, delim;
							if(searchoptions) {
								oSv = searchoptions.value === undefined ? "" : searchoptions.value;
								sep = searchoptions.separator === undefined ? ":" : searchoptions.separator;
								delim = searchoptions.delimiter === undefined ? ";" : searchoptions.delimiter;
							} else if(editoptions) {
								oSv = editoptions.value === undefined ? "" : editoptions.value;
								sep = editoptions.separator === undefined ? ":" : editoptions.separator;
								delim = editoptions.delimiter === undefined ? ";" : editoptions.delimiter;
							}
							if (oSv) {	
								var elem = document.createElement("select");
								elem.style.width = "100%";
								$(elem).attr({name:cm.index || cm.name, id: "gs_"+cm.name});
								var sv, ov, key, k;
								if(typeof oSv === "string") {
									so = oSv.split(delim);
									for(k=0; k<so.length;k++){
										sv = so[k].split(sep);
										ov = document.createElement("option");
										ov.value = sv[0]; ov.innerHTML = sv[1];
										elem.appendChild(ov);
									}
								} else if(typeof oSv === "object" ) {
									for (key in oSv) {
										if(oSv.hasOwnProperty(key)) {
											ov = document.createElement("option");
											ov.value = key; ov.innerHTML = oSv[key];
											elem.appendChild(ov);
										}
									}
								}
								if(soptions.defaultValue !== undefined) { $(elem).val(soptions.defaultValue); }
								if(soptions.attr) {$(elem).attr(soptions.attr);}
								$(thd).append(stbl);
								bindEv.call($t, elem , soptions);
								$("td:eq(1)",stbl).append( elem );
								if(o.autosearch===true){
									$(elem).change(function(){
										triggerToolbar();
										return false;
									});
								}
							}
						}
						break;
					case "text":
						var df = soptions.defaultValue !== undefined ? soptions.defaultValue: "";

						$("td:eq(1)",stbl).append("<input type='text' style='width:100%;padding:0;' name='"+(cm.index || cm.name)+"' id='gs_"+cm.name+"' value='"+df+"'/>");
						$(thd).append(stbl);

						if(soptions.attr) {$("input",thd).attr(soptions.attr);}
						bindEv.call($t, $("input",thd)[0], soptions);
						if(o.autosearch===true){
							if(o.searchOnEnter) {
								$("input",thd).keypress(function(e){
									var key1 = e.charCode || e.keyCode || 0;
									if(key1 === 13){
										triggerToolbar();
										return false;
									}
									return this;
								});
							} else {
								$("input",thd).keydown(function(e){
									var key1 = e.which;
									switch (key1) {
										case 13:
											return false;
										case 9 :
										case 16:
										case 37:
										case 38:
										case 39:
										case 40:
										case 27:
											break;
										default :
											if(timeoutHnd) { clearTimeout(timeoutHnd); }
											timeoutHnd = setTimeout(function(){triggerToolbar();}, o.autosearchDelay);
									}
								});
							}
						}
						break;
					case "custom":
						$("td:eq(1)",stbl).append("<span style='width:95%;padding:0;' name='"+(cm.index || cm.name)+"' id='gs_"+cm.name+"'/>");
						$(thd).append(stbl);
						try {
							if($.isFunction(soptions.custom_element)) {
								var celm = soptions.custom_element.call($t,soptions.defaultValue !== undefined ? soptions.defaultValue: "",soptions);
								if(celm) {
									celm = $(celm).addClass("customelement");
									$(thd).find("span[name='" + (cm.index || cm.name) + "']").append(celm);
								} else {
									throw "e2";
								}
							} else {
								throw "e1";
							}
						} catch (e) {
							if (e === "e1") { info_dialog(errcap,"function 'custom_element' "+editMsg.nodefined,bClose);}
							if (e === "e2") { info_dialog(errcap,"function 'custom_element' "+editMsg.novalue,bClose);}
							else { info_dialog(errcap,typeof e==="string"?e:e.message,bClose); }
						}
						break;
					}
				}
				$(th).append(thd);
				$(tr).append(th);
				if(!o.searchOperators) {
					$("td:eq(0)",stbl).hide();
				}
			});
			$("table thead",grid.hDiv).append(tr);
			if(o.searchOperators) {
				$(".soptclass",tr).click(function(e){
					var offset = $(this).offset(),
					left = ( offset.left ),
					top = ( offset.top);
					buildRuleMenu(this, left, top );
					e.stopPropagation();
				});
				$("body").on('click', function(e){
					if(e.target.className !== "soptclass") {
						$("#sopt_menu").hide();
					}
				});
			}
			$(".clearsearchclass",tr).click(function(){
				var ptr = $(this).parents("tr:first"),
				coli = parseInt($("td.ui-search-oper", ptr).data('colindex'),10),
				sval  = $.extend({},colModel[coli].searchoptions || {}),
				dval = sval.defaultValue || "";
				if(colModel[coli].stype === "select") {
					if(dval) {
						$("td.ui-search-input select", ptr).val( dval );
					} else {
						$("td.ui-search-input select", ptr)[0].selectedIndex = 0;
					}
				} else {
					$("td.ui-search-input input", ptr).val( dval );
				}
				// ToDo custom search type
				if(o.autosearch===true){
					triggerToolbar();
				}

			});
			this.ftoolbar = true;
			this.triggerToolbar = triggerToolbar;
			this.clearToolbar = clearToolbar;
			this.toggleToolbar = toggleToolbar;
		});
	},
	destroyFilterToolbar: function () {
		return this.each(function () {
			var self = this;
			if (!self.ftoolbar) {
				return;
			}
			self.triggerToolbar = null;
			self.clearToolbar = null;
			self.toggleToolbar = null;
			self.ftoolbar = false;
			$(self.grid.hDiv).find("table thead tr.ui-search-toolbar").remove();
		});
	},
	destroyGroupHeader : function(nullHeader)
	{
		if(nullHeader === undefined) {
			nullHeader = true;
		}
		return this.each(function()
		{
			var $t = this, i, l, $th, $resizing, grid = $t.grid,
			thead = $("table.ui-jqgrid-htable thead", grid.hDiv), cm = $t.p.colModel, hc;
			if(!grid) { return; }

			$($t).unbind('.setGroupHeaders');
			var $tr = $("<tr>", {role: "row"}).addClass("ui-jqgrid-labels");
			var headers = grid.headers;
			for (i = 0, l = headers.length; i < l; i++) {
				hc = cm[i].hidden ? "none" : "";
				$th = $(headers[i].el)
					.width(headers[i].width)
					.css('display',hc);
				try {
					$th.removeAttr("rowSpan");
				} catch (rs) {
					//IE 6/7
					$th.attr("rowSpan",1);
				}
				$tr.append($th);
				$resizing = $th.children("span.ui-jqgrid-resize");
				if ($resizing.length>0) {// resizable column
					$resizing[0].style.height = "";
				}
				$th.children("div")[0].style.top = "";
			}
			$(thead).children('tr.ui-jqgrid-labels').remove();
			$(thead).prepend($tr);

			if(nullHeader === true) {
				$($t).jqGrid('setGridParam',{ 'groupHeader': null});
			}
		});
	},
	setGroupHeaders : function ( o ) {
		o = $.extend({
			useColSpanStyle :  false,
			groupHeaders: []
		},o  || {});
		return this.each(function(){
			this.p.groupHeader = o;
			var ts = this,
			i, cmi, skip = 0, $tr, $colHeader, th, $th, thStyle,
			iCol,
			cghi,
			//startColumnName,
			numberOfColumns,
			titleText,
			cVisibleColumns,
			colModel = ts.p.colModel,
			cml = colModel.length,
			ths = ts.grid.headers,
			$htable = $("table.ui-jqgrid-htable", ts.grid.hDiv),
			$trLabels = $htable.children("thead").children("tr.ui-jqgrid-labels:last").addClass("jqg-second-row-header"),
			$thead = $htable.children("thead"),
			$theadInTable,
			$firstHeaderRow = $htable.find(".jqg-first-row-header");
			if($firstHeaderRow[0] === undefined) {
				$firstHeaderRow = $('<tr>', {role: "row", "aria-hidden": "true"}).addClass("jqg-first-row-header").css("height", "auto");
			} else {
				$firstHeaderRow.empty();
			}
			var $firstRow,
			inColumnHeader = function (text, columnHeaders) {
				var length = columnHeaders.length, j;
				for (j = 0; j < length; j++) {
					if (columnHeaders[j].startColumnName === text) {
						return j;
					}
				}
				return -1;
			};

			$(ts).prepend($thead);
			$tr = $('<tr>', {role: "row"}).addClass("ui-jqgrid-labels jqg-third-row-header");
			for (i = 0; i < cml; i++) {
				th = ths[i].el;
				$th = $(th);
				cmi = colModel[i];
				// build the next cell for the first header row
				thStyle = { height: '0', width: ths[i].width + 'px', display: (cmi.hidden ? 'none' : '')};
				$("<th>", {role: 'gridcell'}).css(thStyle).addClass("ui-first-th-"+ts.p.direction).appendTo($firstHeaderRow);

				th.style.width = ""; // remove unneeded style
				iCol = inColumnHeader(cmi.name, o.groupHeaders);
				if (iCol >= 0) {
					cghi = o.groupHeaders[iCol];
					numberOfColumns = cghi.numberOfColumns;
					titleText = cghi.titleText;

					// caclulate the number of visible columns from the next numberOfColumns columns
					for (cVisibleColumns = 0, iCol = 0; iCol < numberOfColumns && (i + iCol < cml); iCol++) {
						if (!colModel[i + iCol].hidden) {
							cVisibleColumns++;
						}
					}

					// The next numberOfColumns headers will be moved in the next row
					// in the current row will be placed the new column header with the titleText.
					// The text will be over the cVisibleColumns columns
					$colHeader = $('<th>').attr({role: "columnheader"})
						.addClass("ui-state-default ui-th-column-header ui-th-"+ts.p.direction)
						.css({'height':'22px', 'border-top': '0 none'})
						.html(titleText);
					if(cVisibleColumns > 0) {
						$colHeader.attr("colspan", String(cVisibleColumns));
					}
					if (ts.p.headertitles) {
						$colHeader.attr("title", $colHeader.text());
					}
					// hide if not a visible cols
					if( cVisibleColumns === 0) {
						$colHeader.hide();
					}

					$th.before($colHeader); // insert new column header before the current
					$tr.append(th);         // move the current header in the next row

					// set the coumter of headers which will be moved in the next row
					skip = numberOfColumns - 1;
				} else {
					if (skip === 0) {
						if (o.useColSpanStyle) {
							// expand the header height to two rows
							$th.attr("rowspan", "2");
						} else {
							$('<th>', {role: "columnheader"})
								.addClass("ui-state-default ui-th-column-header ui-th-"+ts.p.direction)
								.css({"display": cmi.hidden ? 'none' : '', 'border-top': '0 none'})
								.insertBefore($th);
							$tr.append(th);
						}
					} else {
						// move the header to the next row
						//$th.css({"padding-top": "2px", height: "19px"});
						$tr.append(th);
						skip--;
					}
				}
			}
			$theadInTable = $(ts).children("thead");
			$theadInTable.prepend($firstHeaderRow);
			$tr.insertAfter($trLabels);
			$htable.append($theadInTable);

			if (o.useColSpanStyle) {
				// Increase the height of resizing span of visible headers
				$htable.find("span.ui-jqgrid-resize").each(function () {
					var $parent = $(this).parent();
					if ($parent.is(":visible")) {
						this.style.cssText = 'height: ' + $parent.height() + 'px !important; cursor: col-resize;';
					}
				});

				// Set position of the sortable div (the main lable)
				// with the column header text to the middle of the cell.
				// One should not do this for hidden headers.
				$htable.find("div.ui-jqgrid-sortable").each(function () {
					var $ts = $(this), $parent = $ts.parent();
					if ($parent.is(":visible") && $parent.is(":has(span.ui-jqgrid-resize)")) {
						$ts.css('top', ($parent.height() - $ts.outerHeight()) / 2 + 'px');
					}
				});
			}

			$firstRow = $theadInTable.find("tr.jqg-first-row-header");
			$(ts).bind('jqGridResizeStop.setGroupHeaders', function (e, nw, idx) {
				$firstRow.find('th').eq(idx).width(nw);
			});
		});				
	},
	setFrozenColumns : function () {
		return this.each(function() {
			var $t = this, $self = $($t), p = $t.p, grid = $t.grid, jqID = $.jgrid.jqID;
			if (!grid) {return;}
			var cm = p.colModel,i=0, len = cm.length, maxfrozen = -1, frozen= false;
			// TODO treeGrid and grouping  Support
			if(p.subGrid === true || p.treeGrid === true || p.cellEdit === true || p.sortable || p.scroll )
			{
				return;
			}
			if(p.rownumbers) { i++; }
			if(p.multiselect) { i++; }
			
			// get the max index of frozen col
			while(i<len)
			{
				// from left, no breaking frozen
				if(cm[i].frozen === true)
				{
					frozen = true;
					maxfrozen = i;
				} else {
					break;
				}
				i++;
			}
			if( maxfrozen>=0 && frozen) {
				var top = p.caption ? $(grid.cDiv).outerHeight() : 0,
				hth = $(".ui-jqgrid-htable",p.gView).height();
				//headers
				if(p.toppager) {
					top = top + $(grid.topDiv).outerHeight();
				}
				if(p.toolbar[0] === true) {
					if(p.toolbar[1] !== "bottom") {
						top = top + $(grid.uDiv).outerHeight();
					}
				}
				grid.fhDiv = $('<div style="position:absolute;left:0;top:'+top+'px;height:'+hth+'px;" class="frozen-div ui-state-default ui-jqgrid-hdiv"></div>');
				grid.fbDiv = $('<div style="position:absolute;left:0;top:'+(parseInt(top,10)+parseInt(hth,10) + 1)+'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>');
				$(p.gView).append(grid.fhDiv);
				var htbl = $(".ui-jqgrid-htable",p.gView).clone(true);
				// groupheader support - only if useColSpanstyle is false
				if(p.groupHeader) {
					$("tr.jqg-first-row-header, tr.jqg-third-row-header", htbl).each(function(){
						$("th:gt("+maxfrozen+")",this).remove();
					});
					var swapfroz = -1, fdel = -1, cs, rs;
					$("tr.jqg-second-row-header th", htbl).each(function(){
						cs= parseInt($(this).attr("colspan"),10);
						rs= parseInt($(this).attr("rowspan"),10);
						if(rs) {
							swapfroz++;
							fdel++;
						}
						if(cs) {
							swapfroz = swapfroz+cs;
							fdel++;
						}
						if(swapfroz === maxfrozen) {
							return false;
						}
					});
					if(swapfroz !== maxfrozen) {
						fdel = maxfrozen;
					}
					$("tr.jqg-second-row-header", htbl).each(function(){
						$("th:gt("+fdel+")",this).remove();
					});
				} else {
					$("tr",htbl).each(function(){
						$("th:gt("+maxfrozen+")",this).remove();
					});
				}
				$(htbl).width(1);
				// resizing stuff
				$(grid.fhDiv).append(htbl)
				.mousemove(function (e) {
					if(grid.resizing){ grid.dragMove(e);return false; }
				});
				if(p.footerrow) {
					var hbd = $(".ui-jqgrid-bdiv",p.gView).height();

					grid.fsDiv = $('<div style="position:absolute;left:0;top:'+(parseInt(top,10)+parseInt(hth,10) + parseInt(hbd,10)+1)+'px;" class="frozen-sdiv ui-jqgrid-sdiv"></div>');
					$(p.gView).append(grid.fsDiv);
					var ftbl = $(".ui-jqgrid-ftable",p.gView).clone(true);
					$("tr",ftbl).each(function(){
						$("td:gt("+maxfrozen+")",this).remove();
					});
					$(ftbl).width(1);
					$(grid.fsDiv).append(ftbl);
				}
				$self.bind('jqGridResizeStop.setFrozenColumns', function (e, w, index) {
					var rhth = $(".ui-jqgrid-htable",grid.fhDiv);
					$("th:eq("+index+")",rhth).width( w ); 
					var btd = $(".ui-jqgrid-btable",grid.fbDiv);
					$("tr:first td:eq("+index+")",btd).width( w );
					if(p.footerrow) {
						var ftd = $(".ui-jqgrid-ftable",grid.fsDiv);
						$("tr:first td:eq("+index+")",ftd).width( w );
					}
				});
				// sorting stuff
				$self.bind('jqGridSortCol.setFrozenColumns', function (e, index, idxcol) {

					var previousSelectedTh = $("tr.ui-jqgrid-labels:last th:eq("+p.lastsort+")",grid.fhDiv), newSelectedTh = $("tr.ui-jqgrid-labels:last th:eq("+idxcol+")",grid.fhDiv);

					$("span.ui-grid-ico-sort",previousSelectedTh).addClass('ui-state-disabled');
					$(previousSelectedTh).attr("aria-selected","false");
					$("span.ui-icon-"+p.sortorder,newSelectedTh).removeClass('ui-state-disabled');
					$(newSelectedTh).attr("aria-selected","true");
					if(!p.viewsortcols[0]) {
						if(p.lastsort !== idxcol) {
							$("span.s-ico",previousSelectedTh).hide();
							$("span.s-ico",newSelectedTh).show();
						}
					}
				});
				
				// data stuff
				//TODO support for setRowData
				$(p.gView).append(grid.fbDiv);
				$(grid.bDiv).scroll(function () {
					$(grid.fbDiv).scrollTop($(this).scrollTop());
				});
				if(p.hoverrows === true) {
					$(p.idSel).unbind('mouseover').unbind('mouseout');
				}
				$self.bind('jqGridAfterGridComplete.setFrozenColumns', function () {
					$(p.idSel+"_frozen").remove();
					$(grid.fbDiv).height($(grid.bDiv).height()-16);
					var btbl = $(p.idSel).clone(true);
					$("tr[role=row]",btbl).each(function(){
						$("td[role=gridcell]:gt("+maxfrozen+")",this).remove();
					});

					$(btbl).width(1).attr("id",p.id+"_frozen");
					$(grid.fbDiv).append(btbl);
					if(p.hoverrows === true) {
						$("tr.jqgrow", btbl).hover(
							function(){ var tr = this; $(tr).addClass("ui-state-hover"); $("#"+jqID(tr.id), p.idSel).addClass("ui-state-hover"); },
							function(){ var tr = this; $(tr).removeClass("ui-state-hover"); $("#"+jqID(tr.id), p.idSel).removeClass("ui-state-hover"); }
						);
						$("tr.jqgrow", p.idSel).hover(
							function(){ var tr = this; $(tr).addClass("ui-state-hover"); $("#"+jqID(tr.id), p.idSel+"_frozen").addClass("ui-state-hover");},
							function(){ var tr = this; $(tr).removeClass("ui-state-hover"); $("#"+jqID(tr.id), p.idSel+"_frozen").removeClass("ui-state-hover"); }
						);
					}
					btbl=null;
				});
				if(!grid.hDiv.loading) {
					$self.triggerHandler("jqGridAfterGridComplete");
				}
				p.frozenColumns = true;
			}
		});
	},
	destroyFrozenColumns :  function() {
		return this.each(function() {
			var $t = this, $self = $($t), grid = $t.grid, p = $t.p;
			if (!grid) {return;}
			if(p.frozenColumns === true) {
				$(grid.fhDiv).remove();
				$(grid.fbDiv).remove();
				grid.fhDiv = null; grid.fbDiv=null;
				if(p.footerrow) {
					$(grid.fsDiv).remove();
					grid.fsDiv = null;
				}
				$self.unbind('.setFrozenColumns');
				if(p.hoverrows === true) {
					var ptr;
					$self.bind('mouseover',function(e) {
						ptr = $(e.target).closest("tr.jqgrow");
						if($(ptr).attr("class") !== "ui-subgrid") {
						$(ptr).addClass("ui-state-hover");
					}
					}).bind('mouseout',function(e) {
						ptr = $(e.target).closest("tr.jqgrow");
						$(ptr).removeClass("ui-state-hover");
					});
				}
				p.frozenColumns = false;
			}
		});
	}
});
}(jQuery));
/*
 * jqFilter  jQuery jqGrid filter addon.
 * Copyright (c) 2011, Tony Tomov, tony@trirand.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * 
 * The work is inspired from this Stefan Pirvu
 * http://www.codeproject.com/KB/scripting/json-filtering.aspx
 *
 * The filter uses JSON entities to hold filter rules and groups. Here is an example of a filter:

{ "groupOp": "AND",
      "groups" : [ 
        { "groupOp": "OR",
            "rules": [
                { "field": "name", "op": "eq", "data": "England" }, 
                { "field": "id", "op": "le", "data": "5"}
             ]
        } 
      ],
      "rules": [
        { "field": "name", "op": "eq", "data": "Romania" }, 
        { "field": "id", "op": "le", "data": "1"}
      ]
}
*/
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*global jQuery */

(function ($) {
"use strict";

$.fn.jqFilter = function( arg ) {
	if (typeof arg === 'string') {
		
		var fn = $.fn.jqFilter[arg];
		if (!fn) {
			throw ("jqFilter - No such method: " + arg);
		}
		var args = $.makeArray(arguments).slice(1);
		return fn.apply(this,args);
	}

	var p = $.extend(true,{
		filter: null,
		columns: [],
		onChange : null,
		afterRedraw : null,
		checkValues : null,
		error: false,
		errmsg : "",
		errorcheck : true,
		showQuery : true,
		sopt : null,
		ops : [],
		operands : null,
		numopts : ['eq','ne', 'lt', 'le', 'gt', 'ge', 'nu', 'nn', 'in', 'ni'],
		stropts : ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc', 'nu', 'nn', 'in', 'ni'],
		strarr : ['text', 'string', 'blob'],
		groupOps : [{ op: "AND", text: "AND" },	{ op: "OR",  text: "OR" }],
		groupButton : true,
		ruleButtons : true,
		direction : "ltr"
	}, $.jgrid.filter, arg || {});
	return this.each( function() {
		if (this.filter) {return;}
		this.p = p;
		// setup filter in case if they is not defined
		if (this.p.filter === null || this.p.filter === undefined) {
			this.p.filter = {
				groupOp: this.p.groupOps[0].op,
				rules: [],
				groups: []
			};
		}
		var i, len = this.p.columns.length, cl,
		isIE = /msie/i.test(navigator.userAgent) && !window.opera;

		// translating the options
		this.p.initFilter = $.extend(true,{},this.p.filter);

		// set default values for the columns if they are not set
		if( !len ) {return;}
		for(i=0; i < len; i++) {
			cl = this.p.columns[i];
			if( cl.stype ) {
				// grid compatibility
				cl.inputtype = cl.stype;
			} else if(!cl.inputtype) {
				cl.inputtype = 'text';
			}
			if( cl.sorttype ) {
				// grid compatibility
				cl.searchtype = cl.sorttype;
			} else if (!cl.searchtype) {
				cl.searchtype = 'string';
			}
			if(cl.hidden === undefined) {
				// jqGrid compatibility
				cl.hidden = false;
			}
			if(!cl.label) {
				cl.label = cl.name;
			}
			if(cl.index) {
				cl.name = cl.index;
			}
			if(!cl.hasOwnProperty('searchoptions')) {
				cl.searchoptions = {};
			}
			if(!cl.hasOwnProperty('searchrules')) {
				cl.searchrules = {};
			}

		}
		if(this.p.showQuery) {
			$(this).append("<table class='queryresult ui-widget ui-widget-content' style='display:block;max-width:440px;border:0px none;' dir='"+this.p.direction+"'><tbody><tr><td class='query'></td></tr></tbody></table>");
		}
		var getGrid = function () {
			return $("#" + $.jgrid.jqID(p.id))[0] || null;
		};
		/*
		 *Perform checking.
		 *
		*/
		var checkData = function(val, colModelItem) {
			var ret = [true,""], $t = getGrid();
			if($.isFunction(colModelItem.searchrules)) {
				ret = colModelItem.searchrules.call($t, val, colModelItem);
			} else if($.jgrid && $.jgrid.checkValues) {
				try {
					ret = $.jgrid.checkValues.call($t, val, -1, colModelItem.searchrules, colModelItem.label);
				} catch (e) {}
			}
			if(ret && ret.length && ret[0] === false) {
				p.error = !ret[0];
				p.errmsg = ret[1];
			}
		};
		/* moving to common
		randId = function() {
			return Math.floor(Math.random()*10000).toString();
		};
		*/

		this.onchange = function (  ){
			// clear any error 
			this.p.error = false;
			this.p.errmsg="";
			return $.isFunction(this.p.onChange) ? this.p.onChange.call( this, this.p ) : false;
		};
		/*
		 * Redraw the filter every time when new field is added/deleted
		 * and field is  changed
		 */
		this.reDraw = function() {
			$("table.group:first",this).remove();
			var t = this.createTableForGroup(p.filter, null);
			$(this).append(t);
			if($.isFunction(this.p.afterRedraw) ) {
				this.p.afterRedraw.call(this, this.p);
			}
		};
		/*
		 * Creates a grouping data for the filter
		 * @param group - object
		 * @param parentgroup - object
		 */
		this.createTableForGroup = function(group, parentgroup) {
			var that = this,  i;
			// this table will hold all the group (tables) and rules (rows)
			var table = $("<table class='group ui-widget ui-widget-content' style='border:0px none;'><tbody></tbody></table>"),
			// create error message row
			align = "left";
			if(this.p.direction === "rtl") {
				align = "right";
				table.attr("dir","rtl");
			}
			if(parentgroup === null) {
				table.append("<tr class='error' style='display:none;'><th colspan='5' class='ui-state-error' align='"+align+"'></th></tr>");
			}

			var tr = $("<tr></tr>");
			table.append(tr);
			// this header will hold the group operator type and group action buttons for
			// creating subgroup "+ {}", creating rule "+" or deleting the group "-"
			var th = $("<th colspan='5' align='"+align+"'></th>");
			tr.append(th);

			if(this.p.ruleButtons === true) {
			// dropdown for: choosing group operator type
			var groupOpSelect = $("<select class='opsel'></select>");
			th.append(groupOpSelect);
			// populate dropdown with all posible group operators: or, and
			var str= "", selected;
			for (i = 0; i < p.groupOps.length; i++) {
				selected =  group.groupOp === that.p.groupOps[i].op ? " selected='selected'" :"";
				str += "<option value='"+that.p.groupOps[i].op+"'" + selected+">"+that.p.groupOps[i].text+"</option>";
			}

			groupOpSelect
			.append(str)
			.bind('change',function() {
				group.groupOp = $(groupOpSelect).val();
				that.onchange(); // signals that the filter has changed
			});
			}
			// button for adding a new subgroup
			var inputAddSubgroup ="<span></span>";
			if(this.p.groupButton) {
				inputAddSubgroup = $("<input type='button' value='+ {}' title='Add subgroup' class='add-group'/>");
				inputAddSubgroup.bind('click',function() {
					if (group.groups === undefined ) {
						group.groups = [];
					}

					group.groups.push({
						groupOp: p.groupOps[0].op,
						rules: [],
						groups: []
					}); // adding a new group

					that.reDraw(); // the html has changed, force reDraw

					that.onchange(); // signals that the filter has changed
					return false;
				});
			}
			th.append(inputAddSubgroup);
			if(this.p.ruleButtons === true) {
			// button for adding a new rule
			var inputAddRule = $("<input type='button' value='+' title='Add rule' class='add-rule ui-add'/>"), cm;
			inputAddRule.bind('click',function() {
				//if(!group) { group = {};}
				if (group.rules === undefined) {
					group.rules = [];
				}
				for (i = 0; i < that.p.columns.length; i++) {
				// but show only serchable and serchhidden = true fields
					var searchable = (that.p.columns[i].search === undefined) ?  true: that.p.columns[i].search,
					hidden = (that.p.columns[i].hidden === true),
					ignoreHiding = (that.p.columns[i].searchoptions.searchhidden === true);
					if ((ignoreHiding && searchable) || (searchable && !hidden)) {
						cm = that.p.columns[i];
						break;
					}
				}
				
				var opr;
				if( cm.searchoptions.sopt ) {opr = cm.searchoptions.sopt;}
				else if(that.p.sopt) { opr= that.p.sopt; }
				else if  ( $.inArray(cm.searchtype, that.p.strarr) !== -1 ) {opr = that.p.stropts;}
				else {opr = that.p.numopts;}

				group.rules.push({
					field: cm.name,
					op: opr[0],
					data: ""
				}); // adding a new rule

				that.reDraw(); // the html has changed, force reDraw
				// for the moment no change have been made to the rule, so
				// this will not trigger onchange event
				return false;
			});
			th.append(inputAddRule);
			}

			// button for delete the group
			if (parentgroup !== null) { // ignore the first group
				var inputDeleteGroup = $("<input type='button' value='-' title='Delete group' class='delete-group'/>");
				th.append(inputDeleteGroup);
				inputDeleteGroup.bind('click',function() {
				// remove group from parent
					for (i = 0; i < parentgroup.groups.length; i++) {
						if (parentgroup.groups[i] === group) {
							parentgroup.groups.splice(i, 1);
							break;
						}
					}

					that.reDraw(); // the html has changed, force reDraw

					that.onchange(); // signals that the filter has changed
					return false;
				});
			}

			// append subgroup rows
			if (group.groups !== undefined) {
				for (i = 0; i < group.groups.length; i++) {
					var trHolderForSubgroup = $("<tr></tr>");
					table.append(trHolderForSubgroup);

					var tdFirstHolderForSubgroup = $("<td class='first'></td>");
					trHolderForSubgroup.append(tdFirstHolderForSubgroup);

					var tdMainHolderForSubgroup = $("<td colspan='4'></td>");
					tdMainHolderForSubgroup.append(this.createTableForGroup(group.groups[i], group));
					trHolderForSubgroup.append(tdMainHolderForSubgroup);
				}
			}
			if(group.groupOp === undefined) {
				group.groupOp = that.p.groupOps[0].op;
			}

			// append rules rows
			if (group.rules !== undefined) {
				for (i = 0; i < group.rules.length; i++) {
					table.append(
                       this.createTableRowForRule(group.rules[i], group)
					);
				}
			}

			return table;
		};
		/*
		 * Create the rule data for the filter
		 */
		this.createTableRowForRule = function(rule, group ) {
			// save current entity in a variable so that it could
			// be referenced in anonimous method calls

			var that=this, $t = getGrid(), tr = $("<tr></tr>"),
			//document.createElement("tr"),

			// first column used for padding
			//tdFirstHolderForRule = document.createElement("td"),
			i, op, trpar, cm, str="", selected;
			//tdFirstHolderForRule.setAttribute("class", "first");
			tr.append("<td class='first'></td>");


			// create field container
			var ruleFieldTd = $("<td class='columns'></td>");
			tr.append(ruleFieldTd);


			// dropdown for: choosing field
			var ruleFieldSelect = $("<select></select>"), ina, aoprs = [];
			ruleFieldTd.append(ruleFieldSelect);
			ruleFieldSelect.bind('change',function() {
				rule.field = $(ruleFieldSelect).val();

				trpar = $(this).parents("tr:first");
				for (i=0;i<that.p.columns.length;i++) {
					if(that.p.columns[i].name ===  rule.field) {
						cm = that.p.columns[i];
						break;
					}
				}
				if(!cm) {return;}
				cm.searchoptions.id = $.jgrid.randId();
				if(isIE && cm.inputtype === "text") {
					if(!cm.searchoptions.size) {
						cm.searchoptions.size = 10;
					}
				}
				var elm = $.jgrid.createEl.call($t, cm.inputtype,cm.searchoptions, "", true, that.p.ajaxSelectOptions || {}, true);
				$(elm).addClass("input-elm");
				//that.createElement(rule, "");

				if( cm.searchoptions.sopt ) {op = cm.searchoptions.sopt;}
				else if(that.p.sopt) { op= that.p.sopt; }
				else if  ($.inArray(cm.searchtype, that.p.strarr) !== -1) {op = that.p.stropts;}
				else {op = that.p.numopts;}
				// operators
				var s ="", so = 0;
				aoprs = [];
				$.each(that.p.ops, function() { aoprs.push(this.oper); });
				for ( i = 0 ; i < op.length; i++) {
					ina = $.inArray(op[i],aoprs);
					if(ina !== -1) {
						if(so===0) {
							rule.op = that.p.ops[ina].oper;
						}
						s += "<option value='"+that.p.ops[ina].oper+"'>"+that.p.ops[ina].text+"</option>";
						so++;
					}
				}
				$(".selectopts",trpar).empty().append( s );
				$(".selectopts",trpar)[0].selectedIndex = 0;
				if( $.jgrid.msie && $.jgrid.msiever() < 9) {
					var sw = parseInt($("select.selectopts",trpar)[0].offsetWidth, 10) + 1;
					$(".selectopts",trpar).width( sw );
					$(".selectopts",trpar).css("width","auto");
				}
				// data
				$(".data",trpar).empty().append( elm );
				$.jgrid.bindEv.call($t, elm, cm.searchoptions);
				$(".input-elm",trpar).bind('change',function( e ) {
					var elem = e.target;
					rule.data = elem.nodeName.toUpperCase() === "SPAN" && cm.searchoptions && $.isFunction(cm.searchoptions.custom_value) ?
						cm.searchoptions.custom_value.call($t, $(elem).children(".customelement:first"), 'get') : elem.value;
					that.onchange(); // signals that the filter has changed
				});
				setTimeout(function(){ //IE, Opera, Chrome
				rule.data = $(elm).val();
				that.onchange();  // signals that the filter has changed
				}, 0);
			});

			// populate drop down with user provided column definitions
			var j=0;
			for (i = 0; i < that.p.columns.length; i++) {
				// but show only serchable and serchhidden = true fields
				var searchable = (that.p.columns[i].search === undefined) ? true: that.p.columns[i].search,
				hidden = (that.p.columns[i].hidden === true),
				ignoreHiding = (that.p.columns[i].searchoptions.searchhidden === true);
				if ((ignoreHiding && searchable) || (searchable && !hidden)) {
					selected = "";
					if(rule.field === that.p.columns[i].name) {
						selected = " selected='selected'";
						j=i;
					}
					str += "<option value='"+that.p.columns[i].name+"'" +selected+">"+that.p.columns[i].label+"</option>";
				}
			}
			ruleFieldSelect.append( str );


			// create operator container
			var ruleOperatorTd = $("<td class='operators'></td>");
			tr.append(ruleOperatorTd);
			cm = p.columns[j];
			// create it here so it can be referentiated in the onchange event
			//var RD = that.createElement(rule, rule.data);
			cm.searchoptions.id = $.jgrid.randId();
			if(isIE && cm.inputtype === "text") {
				if(!cm.searchoptions.size) {
					cm.searchoptions.size = 10;
				}
			}
			var ruleDataInput = $.jgrid.createEl.call($t, cm.inputtype,cm.searchoptions, rule.data, true, that.p.ajaxSelectOptions || {}, true);
			if(rule.op === 'nu' || rule.op === 'nn') {
				$(ruleDataInput).attr('readonly','true');
				$(ruleDataInput).attr('disabled','true');
			} //retain the state of disabled text fields in case of null ops
			// dropdown for: choosing operator
			var ruleOperatorSelect = $("<select class='selectopts'></select>");
			ruleOperatorTd.append(ruleOperatorSelect);
			ruleOperatorSelect.bind('change',function() {
				rule.op = $(ruleOperatorSelect).val();
				trpar = $(this).parents("tr:first");
				var rd = $(".input-elm",trpar)[0];
				if (rule.op === "nu" || rule.op === "nn") { // disable for operator "is null" and "is not null"
					rule.data = "";
					if(rd.tagName.toUpperCase() !== 'SELECT') { rd.value = ""; }
					rd.setAttribute("readonly", "true");
					rd.setAttribute("disabled", "true");
				} else {
					if(rd.tagName.toUpperCase() === 'SELECT') { rule.data = rd.value; }
					rd.removeAttribute("readonly");
					rd.removeAttribute("disabled");
				}

				that.onchange();  // signals that the filter has changed
			});

			// populate drop down with all available operators
			if( cm.searchoptions.sopt ) {op = cm.searchoptions.sopt;}
			else if(that.p.sopt) { op= that.p.sopt; }
			else if  ($.inArray(cm.searchtype, that.p.strarr) !== -1) {op = that.p.stropts;}
			else {op = that.p.numopts;}
			str="";
			$.each(that.p.ops, function() { aoprs.push(this.oper); });
			for ( i = 0; i < op.length; i++) {
				ina = $.inArray(op[i],aoprs);
				if(ina !== -1) {
					selected = rule.op === that.p.ops[ina].oper ? " selected='selected'" : "";
					str += "<option value='"+that.p.ops[ina].oper+"'"+selected+">"+that.p.ops[ina].text+"</option>";
				}
			}
			ruleOperatorSelect.append( str );
			// create data container
			var ruleDataTd = $("<td class='data'></td>");
			tr.append(ruleDataTd);

			// textbox for: data
			// is created previously
			//ruleDataInput.setAttribute("type", "text");
			ruleDataTd.append(ruleDataInput);
			$.jgrid.bindEv.call($t, ruleDataInput, cm.searchoptions);
			$(ruleDataInput)
			.addClass("input-elm")
			.bind('change', function() {
				rule.data = cm.inputtype === 'custom' ? cm.searchoptions.custom_value.call($t, $(this).children(".customelement:first"),'get') : $(this).val();
				that.onchange(); // signals that the filter has changed
			});

			// create action container
			var ruleDeleteTd = $("<td></td>");
			tr.append(ruleDeleteTd);

			// create button for: delete rule
			if(this.p.ruleButtons === true) {
			var ruleDeleteInput = $("<input type='button' value='-' title='Delete rule' class='delete-rule ui-del'/>");
			ruleDeleteTd.append(ruleDeleteInput);
			//$(ruleDeleteInput).html("").height(20).width(30).button({icons: {  primary: "ui-icon-minus", text:false}});
			ruleDeleteInput.bind('click',function() {
				// remove rule from group
				for (i = 0; i < group.rules.length; i++) {
					if (group.rules[i] === rule) {
						group.rules.splice(i, 1);
						break;
					}
				}

				that.reDraw(); // the html has changed, force reDraw

				that.onchange(); // signals that the filter has changed
				return false;
			});
			}
			return tr;
		};

		this.getStringForGroup = function(group) {
			var s = "(", index;
			if (group.groups !== undefined) {
				for (index = 0; index < group.groups.length; index++) {
					if (s.length > 1) {
						s += " " + group.groupOp + " ";
					}
					try {
						s += this.getStringForGroup(group.groups[index]);
					} catch (eg) {alert(eg);}
				}
			}

			if (group.rules !== undefined) {
				try{
					for (index = 0; index < group.rules.length; index++) {
						if (s.length > 1) {
							s += " " + group.groupOp + " ";
						}
						s += this.getStringForRule(group.rules[index]);
					}
				} catch (e) {alert(e);}
			}

			s += ")";

			if (s === "()") {
				return ""; // ignore groups that don't have rules
			}
			return s;
		};
		this.getStringForRule = function(rule) {
			var opUF = "",opC="", i, cm, ret, val,
			numtypes = ['int', 'integer', 'float', 'number', 'currency']; // jqGrid
			for (i = 0; i < this.p.ops.length; i++) {
				if (this.p.ops[i].oper === rule.op) {
					opUF = this.p.operands.hasOwnProperty(rule.op) ? this.p.operands[rule.op] : "";
					opC = this.p.ops[i].oper;
					break;
				}
			}
			for (i=0; i<this.p.columns.length; i++) {
				if(this.p.columns[i].name === rule.field) {
					cm = this.p.columns[i];
					break;
				}
			}
			if (cm === undefined) { return ""; }
			val = rule.data;
			if(opC === 'bw' || opC === 'bn') { val = val+"%"; }
			if(opC === 'ew' || opC === 'en') { val = "%"+val; }
			if(opC === 'cn' || opC === 'nc') { val = "%"+val+"%"; }
			if(opC === 'in' || opC === 'ni') { val = " ("+val+")"; }
			if(p.errorcheck) { checkData(rule.data, cm); }
			if($.inArray(cm.searchtype, numtypes) !== -1 || opC === 'nn' || opC === 'nu') { ret = rule.field + " " + opUF + " " + val; }
			else { ret = rule.field + " " + opUF + " \"" + val + "\""; }
			return ret;
		};
		this.resetFilter = function () {
			this.p.filter = $.extend(true,{},this.p.initFilter);
			this.reDraw();
			this.onchange();
		};
		this.hideError = function() {
			$("th.ui-state-error", this).html("");
			$("tr.error", this).hide();
		};
		this.showError = function() {
			$("th.ui-state-error", this).html(this.p.errmsg);
			$("tr.error", this).show();
		};
		this.toUserFriendlyString = function() {
			return this.getStringForGroup(p.filter);
		};
		this.toString = function() {
			// this will obtain a string that can be used to match an item.
			var that = this;
			function getStringRule(rule) {
				if(that.p.errorcheck) {
					var i, cm;
					for (i=0; i<that.p.columns.length; i++) {
						if(that.p.columns[i].name === rule.field) {
							cm = that.p.columns[i];
							break;
						}
					}
					if(cm) {checkData(rule.data, cm);}
				}
				return rule.op + "(item." + rule.field + ",'" + rule.data + "')";
			}

			function getStringForGroup(group) {
				var s = "(", index;

				if (group.groups !== undefined) {
					for (index = 0; index < group.groups.length; index++) {
						if (s.length > 1) {
							if (group.groupOp === "OR") {
								s += " || ";
							}
							else {
								s += " && ";
							}
						}
						s += getStringForGroup(group.groups[index]);
					}
				}

				if (group.rules !== undefined) {
					for (index = 0; index < group.rules.length; index++) {
						if (s.length > 1) {
							if (group.groupOp === "OR") {
								s += " || ";
							}
							else  {
								s += " && ";
							}
						}
						s += getStringRule(group.rules[index]);
					}
				}

				s += ")";

				if (s === "()") {
					return ""; // ignore groups that don't have rules
				}
				return s;
			}

			return getStringForGroup(this.p.filter);
		};

		// Here we init the filter
		this.reDraw();

		if(this.p.showQuery) {
			this.onchange();
		}
		// mark is as created so that it will not be created twice on this element
		this.filter = true;
	});
};
$.extend($.fn.jqFilter,{
	/*
	 * Return SQL like string. Can be used directly
	 */
	toSQLString : function()
	{
		var s ="";
		this.each(function(){
			s = this.toUserFriendlyString();
		});
		return s;
	},
	/*
	 * Return filter data as object.
	 */
	filterData : function()
	{
		var s;
		this.each(function(){
			s = this.p.filter;
		});
		return s;

	},
	getParameter : function (param) {
		if(param !== undefined) {
			if (this.p.hasOwnProperty(param) ) {
				return this.p[param];
			}
		}
		return this.p;
	},
	resetFilter: function() {
		return this.each(function(){
			this.resetFilter();
		});
	},
	addFilter: function (pfilter) {
		if (typeof pfilter === "string") {
			pfilter = $.jgrid.parse( pfilter );
	}
		this.each(function(){
			this.p.filter = pfilter;
			this.reDraw();
			this.onchange();
		});
	}

});
})(jQuery);
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*global xmlJsonClass, jQuery */
(function($){
/**
 * jqGrid extension for form editing Grid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
"use strict";
var rp_ge = {};
$.jgrid.extend({
	searchGrid : function (o) {
		o = $.extend(true, {
			recreateFilter: false,
			drag: true,
			sField:'searchField',
			sValue:'searchString',
			sOper: 'searchOper',
			sFilter: 'filters',
			loadDefaults: true, // this options activates loading of default filters from grid's postData for Multipe Search only.
			beforeShowSearch: null,
			afterShowSearch : null,
			onInitializeSearch: null,
			afterRedraw : null,
			afterChange: null,
			closeAfterSearch : false,
			closeAfterReset: false,
			closeOnEscape : false,
			searchOnEnter : false,
			multipleSearch : false,
			multipleGroup : false,
			//cloneSearchRowOnAdd: true,
			top : 0,
			left: 0,
			jqModal : true,
			modal: false,
			resize : true,
			width: 450,
			height: 'auto',
			dataheight: 'auto',
			showQuery: false,
			errorcheck : true,
			sopt: null,
			stringResult: undefined,
			onClose : null,
			onSearch : null,
			onReset : null,
			toTop : true,
			overlay : 30,
			columns : [],
			tmplNames : null,
			tmplFilters : null,
			tmplLabel : ' Template: ',
			showOnLoad: false,
			layer: null,
			operands : { "eq" :"=", "ne":"<>","lt":"<","le":"<=","gt":">","ge":">=","bw":"LIKE","bn":"NOT LIKE","in":"IN","ni":"NOT IN","ew":"LIKE","en":"NOT LIKE","cn":"LIKE","nc":"NOT LIKE","nu":"IS NULL","nn":"ISNOT NULL"}
		}, $.jgrid.search, o || {});
		return this.each(function() {
			var $t = this, $self = $($t), jgrid = $.jgrid, jqID = jgrid.jqID, p = $t.p;
			if(!$t.grid) {return;}
			var fid = "fbox_"+p.id,
			showFrm = true,
			mustReload = true,
			ids = {themodal:'searchmod'+fid,modalhead:'searchhd'+fid,modalcontent:'searchcnt'+fid, scrollelm : fid},
			themodalSelector = "#"+jqID(ids.themodal), gboxSelector = p.gBox, gviewSelector = p.gView,
			defaultFilters  = p.postData[o.sFilter],
			fl;
			if(typeof defaultFilters === "string") {
				defaultFilters = jgrid.parse( defaultFilters );
			}
			if(o.recreateFilter === true) {
				$(themodalSelector).remove();
			}
			function showFilter($filter) {
				showFrm = $self.triggerHandler("jqGridFilterBeforeShow", [$filter]);
				if(showFrm === undefined) {
					showFrm = true;
				}
				if(showFrm && $.isFunction(o.beforeShowSearch)) {
					showFrm = o.beforeShowSearch.call($t,$filter);
				}
				if(showFrm) {
					jgrid.viewModal(themodalSelector,{gbox:gboxSelector,jqm:o.jqModal, modal:o.modal, overlay: o.overlay, toTop: o.toTop});
					$self.triggerHandler("jqGridFilterAfterShow", [$filter]);
					if($.isFunction(o.afterShowSearch)) {
						o.afterShowSearch.call($t, $filter);
					}
				}
			}
			if ( $(themodalSelector)[0] !== undefined ) {
				showFilter($("#fbox_"+p.idSel));
			} else {
				var fil = $("<div><div id='"+fid+"' class='searchFilter' style='overflow:auto'></div></div>").insertBefore(gviewSelector),
				align = "left", butleft =""; 
				if(p.direction === "rtl") {
					align = "right";
					butleft = " style='text-align:left'";
					fil.attr("dir","rtl");
				}
				var columns = $.extend([],p.colModel),
				bS = "<a id='"+fid+"_search' class='fm-button ui-state-default ui-corner-all fm-button-icon-right ui-reset'><span class='ui-icon ui-icon-search'></span>"+o.Find+"</a>",
				bC = "<a id='"+fid+"_reset' class='fm-button ui-state-default ui-corner-all fm-button-icon-left ui-search'><span class='ui-icon ui-icon-arrowreturnthick-1-w'></span>"+o.Reset+"</a>",
				bQ = "", tmpl="", colnm, found = false, bt, cmi=-1;
				if(o.showQuery) {
					bQ ="<a id='"+fid+"_query' class='fm-button ui-state-default ui-corner-all fm-button-icon-left'><span class='ui-icon ui-icon-comment'></span>Query</a>";
				}
				if(!o.columns.length) {
					$.each(columns, function(i,n){
						if(!n.label) {
							n.label = p.colNames[i];
						}
						// find first searchable column and set it if no default filter
						if(!found) {
							var searchable = (n.search === undefined) ?  true: n.search ,
							hidden = (n.hidden === true),
							ignoreHiding = (n.searchoptions && n.searchoptions.searchhidden === true);
							if ((ignoreHiding && searchable) || (searchable && !hidden)) {
								found = true;
								colnm = n.index || n.name;
								cmi =i;
							}
						}
					});
				} else {
					columns = o.columns;
					cmi = 0;
					colnm = columns[0].index || columns[0].name;
				}
				// old behaviour
				if( (!defaultFilters && colnm) || o.multipleSearch === false  ) {
					var cmop = "eq";
					if(cmi >=0 && columns[cmi].searchoptions && columns[cmi].searchoptions.sopt) {
						cmop = columns[cmi].searchoptions.sopt[0];
					} else if(o.sopt && o.sopt.length) {
						cmop = o.sopt[0];
					}
					defaultFilters = {groupOp: "AND", rules: [{field: colnm, op: cmop, data: ""}]};
				}
				found = false;
				if(o.tmplNames && o.tmplNames.length) {
					found = true;
					tmpl = o.tmplLabel;
					tmpl += "<select class='ui-template'>";
					tmpl += "<option value='default'>Default</option>";
					$.each(o.tmplNames, function(i,n){
						tmpl += "<option value='"+i+"'>"+n+"</option>";
					});
					tmpl += "</select>";
				}

				bt = "<table class='EditTable' style='border:0px none;margin-top:5px' id='"+fid+"_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='EditButton' style='text-align:"+align+"'>"+bC+tmpl+"</td><td class='EditButton' "+butleft+">"+bQ+bS+"</td></tr></tbody></table>";
				fid = jqID(fid);
				o.gbox = "#gbox_"+fid;
				fid = "#"+fid;
				$(fid).jqFilter({
					columns : columns,
					filter: o.loadDefaults ? defaultFilters : null,
					showQuery: o.showQuery,
					errorcheck : o.errorcheck,
					sopt: o.sopt,
					groupButton : o.multipleGroup,
					ruleButtons : o.multipleSearch,
					afterRedraw : o.afterRedraw,
					ops : o.odata,
					operands : o.operands,
					ajaxSelectOptions: p.ajaxSelectOptions,
					groupOps: o.groupOps,
					onChange : function() {
						if(this.p.showQuery) {
							$('.query',this).html(this.toUserFriendlyString());
						}
						if ($.isFunction(o.afterChange)) {
							o.afterChange.call($t, $(fid), o);
						}
					},
					direction : p.direction,
					id: p.id
				});
				fil.append( bt );
				if(found && o.tmplFilters && o.tmplFilters.length) {
					$(".ui-template", fil).bind('change', function(){
						var curtempl = $(this).val();
						if(curtempl==="default") {
							$(fid).jqFilter('addFilter', defaultFilters);
						} else {
							$(fid).jqFilter('addFilter', o.tmplFilters[parseInt(curtempl,10)]);
						}
						return false;
					});
				}
				if(o.multipleGroup === true) {o.multipleSearch = true;}
				$self.triggerHandler("jqGridFilterInitialize", [$(fid)]);
				if($.isFunction(o.onInitializeSearch) ) {
					o.onInitializeSearch.call($t, $(fid));
				}
				if (o.layer) {
					jgrid.createModal(ids ,fil,o,gviewSelector,$(gboxSelector)[0], "#"+jqID(o.layer), {position: "relative"});
				} else {
					jgrid.createModal(ids ,fil,o,gviewSelector,$(gboxSelector)[0]);
				}
				if (o.searchOnEnter || o.closeOnEscape) {
					$(themodalSelector).keydown(function (e) {
						var $target = $(e.target);
						if (o.searchOnEnter && e.which === 13 && // 13 === $.ui.keyCode.ENTER
								!$target.hasClass('add-group') && !$target.hasClass('add-rule') &&
								!$target.hasClass('delete-group') && !$target.hasClass('delete-rule') &&
								(!$target.hasClass("fm-button") || !$target.is("[id$=_query]"))) {
							$(fid+"_search").click();
							return false;
						}
						if (o.closeOnEscape && e.which === 27) { // 27 === $.ui.keyCode.ESCAPE
							$("#"+jqID(ids.modalhead)).find(".ui-jqdialog-titlebar-close").click();
							return false;
						}
					});
				}
				if(bQ) {
					$(fid+"_query").bind('click', function(){
						$(".queryresult", fil).toggle();
						return false;
					});
				}
				if (o.stringResult===undefined) {
					// to provide backward compatibility, inferring stringResult value from multipleSearch
					o.stringResult = o.multipleSearch;
				}
				$(fid+"_search").bind('click', function(){
					var sdata={}, res, filters;
					fl = $(fid);
					fl.find(".input-elm:focus").change();
					filters = fl.jqFilter('filterData');
					if(o.errorcheck) {
						fl[0].hideError();
						if(!o.showQuery) {fl.jqFilter('toSQLString');}
						if(fl[0].p.error) {
							fl[0].showError();
							return false;
						}
					}

					if(o.stringResult) {
						try {
							// xmlJsonClass or JSON.stringify
							res = xmlJsonClass.toJson(filters, '', '', false);
						} catch (e) {
							try {
								res = JSON.stringify(filters);
							} catch (e2) { }
						}
						if(typeof res==="string") {
							sdata[o.sFilter] = res;
							$.each([o.sField,o.sValue, o.sOper], function() {sdata[this] = "";});
						}
					} else {
						if(o.multipleSearch) {
							sdata[o.sFilter] = filters;
							$.each([o.sField,o.sValue, o.sOper], function() {sdata[this] = "";});
						} else {
							sdata[o.sField] = filters.rules[0].field;
							sdata[o.sValue] = filters.rules[0].data;
							sdata[o.sOper] = filters.rules[0].op;
							sdata[o.sFilter] = "";
						}
					}
					p.search = true;
					$.extend(p.postData,sdata);
					mustReload = $self.triggerHandler("jqGridFilterSearch");
					if( mustReload === undefined) {
						mustReload = true;
					}
					if(mustReload && $.isFunction(o.onSearch) ) {
						mustReload = o.onSearch.call($t, p.filters);
					}
					if (mustReload !== false) {
						$self.trigger("reloadGrid",[{page:1}]);
					}
					if(o.closeAfterSearch) {
						jgrid.hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: o.onClose});
					}
					return false;
				});
				$(fid+"_reset").bind('click', function(){
					var sdata={},
					fl = $(fid);
					p.search = false;
					p.resetsearch =  true;
					if(o.multipleSearch===false) {
						sdata[o.sField] = sdata[o.sValue] = sdata[o.sOper] = "";
					} else {
						sdata[o.sFilter] = "";
					}
					fl[0].resetFilter();
					if(found) {
						$(".ui-template", fil).val("default");
					}
					$.extend(p.postData,sdata);
					mustReload = $self.triggerHandler("jqGridFilterReset");
					if(mustReload === undefined) {
						mustReload = true;
					}
					if(mustReload && $.isFunction(o.onReset) ) {
						mustReload = o.onReset.call($t);
					}
					if(mustReload !== false) {
						$self.trigger("reloadGrid",[{page:1}]);
					}
					if (o.closeAfterReset) {
						jgrid.hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: o.onClose});
					}
					return false;
				});
				showFilter($(fid));
				$(".fm-button:not(.ui-state-disabled)",fil).hover(
					function(){$(this).addClass('ui-state-hover');},
					function(){$(this).removeClass('ui-state-hover');}
				);
			}
		});
	},
	editGridRow : function(rowid, o){
		o = $.extend(true, {
			top : 0,
			left: 0,
			width: 300,
			datawidth: 'auto',
			height: 'auto',
			dataheight: 'auto',
			modal: false,
			overlay : 30,
			drag: true,
			resize: true,
			url: null,
			mtype : "POST",
			clearAfterAdd :true,
			closeAfterEdit : false,
			reloadAfterSubmit : true,
			onInitializeForm: null,
			beforeInitData: null,
			beforeShowForm: null,
			afterShowForm: null,
			beforeSubmit: null,
			afterSubmit: null,
			onclickSubmit: null,
			afterComplete: null,
			onclickPgButtons : null,
			afterclickPgButtons: null,
			editData : {},
			recreateForm : false,
			jqModal : true,
			closeOnEscape : false,
			addedrow : "first",
			topinfo : '',
			bottominfo: '',
			saveicon : [],
			closeicon : [],
			savekey: [false,13],
			navkeys: [false,38,40],
			checkOnSubmit : false,
			checkOnUpdate : false,
			_savedData : {},
			processing : false,
			onClose : null,
			ajaxEditOptions : {},
			serializeEditData : null,
			viewPagerButtons : true,
			overlayClass : 'ui-widget-overlay',
			removemodal : true,
			form: 'edit'
		}, $.jgrid.edit, o || {});
		rp_ge[$(this)[0].p.id] = o;
		return this.each(function(){
			var $t = this, $self = $($t);
			if (!$t.grid || !rowid) {return;}
			var p = $t.p, gID = p.id, jgrid = $.jgrid, jqID = jgrid.jqID, hideModal = jgrid.hideModal,
			frmgr = "FrmGrid_"+gID, frmgrID = frmgr, frmtborg = "TblGrid_"+gID, frmtb = "#"+jqID(frmtborg), frmtb2 = frmtb+"_2",
			ids = {themodal:'editmod'+gID,modalhead:'edithd'+gID,modalcontent:'editcnt'+gID, scrollelm : frmgr},
			themodalSelector = "#"+jqID(ids.themodal), gboxSelector = p.gBox,
			onBeforeShow = $.isFunction(rp_ge[gID].beforeShowForm) ? rp_ge[gID].beforeShowForm : false,
			onAfterShow = $.isFunction(rp_ge[gID].afterShowForm) ? rp_ge[gID].afterShowForm : false,
			onBeforeInit = $.isFunction(rp_ge[gID].beforeInitData) ? rp_ge[gID].beforeInitData : false,
			onInitializeForm = $.isFunction(rp_ge[gID].onInitializeForm) ? rp_ge[gID].onInitializeForm : false,
			showFrm = true,
			maxCols = 1, maxRows=0,	postdata, diff, frmoper;
			frmgr = "#" + jqID(frmgr);
			if (rowid === "new") {
				rowid = "_empty";
				frmoper = "add";
				o.caption=rp_ge[gID].addCaption;
			} else {
				o.caption=rp_ge[gID].editCaption;
				frmoper = "edit";
			}
			if(!o.recreateForm) {
				if( $self.data("formProp") ) {
					$.extend(rp_ge[gID], $self.data("formProp"));
				}
			}
			var closeovrl = true;
			if(o.checkOnUpdate && o.jqModal && !o.modal) {
				closeovrl = false;
			}
			function getFormData(){
				$(frmtb+" > tbody > tr > td .FormElement").each(function() {
					var celm = $(".customelement", this);
					if (celm.length) {
						var  elem = celm[0], nm = $(elem).attr('name');
						$.each(p.colModel, function(){
							if(this.name === nm && this.editoptions && $.isFunction(this.editoptions.custom_value)) {
								try {
									postdata[nm] = this.editoptions.custom_value.call($t, $("#"+jqID(nm),frmtb),'get');
									if (postdata[nm] === undefined) {throw "e1";}
								} catch (e) {
									if (e==="e1") {jgrid.info_dialog(jgrid.errors.errcap,"function 'custom_value' "+jgrid.edit.msg.novalue,jgrid.edit.bClose);}
									else {jgrid.info_dialog(jgrid.errors.errcap,e.message,jgrid.edit.bClose);}
								}
								return true;
							}
						});
					} else {
					switch ($(this).get(0).type) {
						case "checkbox":
							if($(this).is(":checked")) {
								postdata[this.name]= $(this).val();
							}else {
								var ofv = $(this).attr("offval");
								postdata[this.name]= ofv;
							}
						break;
						case "select-one":
							postdata[this.name]= $("option:selected",this).val();
						break;
						case "select-multiple":
							postdata[this.name]= $(this).val();
							if(postdata[this.name]) {postdata[this.name] = postdata[this.name].join(",");}
							else {postdata[this.name] ="";}
							var selectedText = [];
							$("option:selected",this).each(
								function(i,selected){
									selectedText[i] = $(selected).text();
								}
							);
						break;
						case "password":
						case "text":
						case "textarea":
						case "button":
							postdata[this.name] = $(this).val();

						break;
					}
					if(p.autoencode) {postdata[this.name] = jgrid.htmlEncode(postdata[this.name]);}
					}
				});
				return true;
			}
			function createData(rowid,tb,maxcols){
				var nm, hc,trdata, cnt=0,tmp, dc,elc, retpos=[], ind=false,
				tdtmpl = "<td class='CaptionTD'></td><td class='DataTD'></td>", tmpl="", i; //*2
				for (i =1; i<=maxcols;i++) {
					tmpl += tdtmpl;
				}
				if(rowid !== '_empty') {
					ind = $self.jqGrid("getInd",rowid);
				}
				$(p.colModel).each( function(i) {
					nm = this.name;
					// hidden fields are included in the form
					if(this.editrules && this.editrules.edithidden === true) {
						hc = false;
					} else {
						hc = this.hidden === true ? true : false;
					}
					dc = hc ? "style='display:none'" : "";
					if ( nm !== 'cb' && nm !== 'subgrid' && this.editable===true && nm !== 'rn') {
						if(ind === false) {
							tmp = "";
						} else {
							if(nm === p.ExpandColumn && p.treeGrid === true) {
								tmp = $("td[role='gridcell']:eq("+i+")",$t.rows[ind]).text();
							} else {
								try {
									tmp =  $.unformat.call($t, $("td[role='gridcell']:eq("+i+")",$t.rows[ind]),{rowId:rowid, colModel:this},i);
								} catch (_) {
									tmp =  (this.edittype && this.edittype === "textarea") ? $("td[role='gridcell']:eq("+i+")",$t.rows[ind]).text() : $("td[role='gridcell']:eq("+i+")",$t.rows[ind]).html();
								}
								if(!tmp || tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length===1 && tmp.charCodeAt(0)===160) ) {tmp='';}
							}
						}
						var opt = $.extend({}, this.editoptions || {} ,{id:nm,name:nm, rowId: rowid}),
						frmopt = $.extend({}, {elmprefix:'',elmsuffix:'',rowabove:false,rowcontent:''}, this.formoptions || {}),
						rp = parseInt(frmopt.rowpos,10) || cnt+1,
						cp = parseInt((parseInt(frmopt.colpos,10) || 1)*2,10);
						if(rowid === "_empty" && opt.defaultValue ) {
							tmp = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
						}
						if(!this.edittype) {this.edittype = "text";}
						if(p.autoencode) {tmp = jgrid.htmlDecode(tmp);}
						elc = jgrid.createEl.call($t,this.edittype,opt,tmp,false,$.extend({},jgrid.ajaxOptions,p.ajaxSelectOptions || {}));
						//if(tmp === "" && this.edittype == "checkbox") {tmp = $(elc).attr("offval");}
						//if(tmp === "" && this.edittype == "select") {tmp = $("option:eq(0)",elc).text();}
						if(rp_ge[gID].checkOnSubmit || rp_ge[gID].checkOnUpdate) {rp_ge[gID]._savedData[nm] = tmp;}
						$(elc).addClass("FormElement");
						if( $.inArray(this.edittype, ['text','textarea','password','select']) > -1) {
							$(elc).addClass("ui-widget-content ui-corner-all");
						}
						trdata = $(tb).find("tr[rowpos="+rp+"]");
						if(frmopt.rowabove) {
							var newdata = $("<tr><td class='contentinfo' colspan='"+(maxcols*2)+"'>"+frmopt.rowcontent+"</td></tr>");
							$(tb).append(newdata);
							newdata[0].rp = rp;
						}
						if ( trdata.length===0 ) {
							trdata = $("<tr "+dc+" rowpos='"+rp+"'></tr>").addClass("FormData").attr("id","tr_"+nm);
							$(trdata).append(tmpl);
							$(tb).append(trdata);
							trdata[0].rp = rp;
						}
						$("td:eq("+(cp-2)+")",trdata[0]).html(frmopt.label === undefined ? p.colNames[i]: frmopt.label);
						$("td:eq("+(cp-1)+")",trdata[0]).html(frmopt.elmprefix).append(elc).append(frmopt.elmsuffix);
						if(this.edittype==='custom' && $.isFunction(opt.custom_value) ) {
							opt.custom_value.call($t, $("#"+jqID(nm),frmgr),'set',tmp);
						}
						jgrid.bindEv.call($t, elc, opt);
						retpos[cnt] = i;
						cnt++;
					}
				});
				if( cnt > 0) {
					var idrow = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+ (maxcols*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='"+gID+"_id' value='"+rowid+"'/></td></tr>");
					idrow[0].rp = cnt+999;
					$(tb).append(idrow);
					if(rp_ge[gID].checkOnSubmit || rp_ge[gID].checkOnUpdate) {rp_ge[gID]._savedData[gID+"_id"] = rowid;}
				}
				return retpos;
			}
			function fillData(rowid,fmid){
				var nm,cnt=0,tmp, fld,opt,vl,vlc;
				if(rp_ge[gID].checkOnSubmit || rp_ge[gID].checkOnUpdate) {rp_ge[gID]._savedData = {};rp_ge[gID]._savedData[gID+"_id"]=rowid;}
				var cm = p.colModel;
				if(rowid === '_empty') {
					$(cm).each(function(){
						nm = this.name;
						opt = $.extend({}, this.editoptions || {} );
						fld = $("#"+jqID(nm),fmid);
						if(fld && fld.length && fld[0] !== null) {
							vl = "";
							if(this.edittype === 'custom' && $.isFunction(opt.custom_value)) {
								opt.custom_value.call($t, fld,'set',vl);
							} else if(opt.defaultValue ) {
								vl = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
								if(fld[0].type==='checkbox') {
									vlc = vl.toLowerCase();
									if(vlc.search(/(false|f|0|no|n|off|undefined)/i)<0 && vlc!=="") {
										fld[0].checked = true;
										fld[0].defaultChecked = true;
										fld[0].value = vl;
									} else {
										fld[0].checked = false;
										fld[0].defaultChecked = false;
									}
								} else {fld.val(vl);}
							} else {
								if( fld[0].type==='checkbox' ) {
									fld[0].checked = false;
									fld[0].defaultChecked = false;
									vl = $(fld).attr("offval");
								} else if (fld[0].type && fld[0].type.substr(0,6)==='select') {
									fld[0].selectedIndex = 0;
								} else {
									fld.val(vl);
								}
							}
							if(rp_ge[gID].checkOnSubmit===true || rp_ge[gID].checkOnUpdate) {rp_ge[gID]._savedData[nm] = vl;}
						}
					});
					$("#id_g",fmid).val(rowid);
					return;
				}
				var tre = $self.jqGrid("getInd",rowid,true);
				if(!tre) {return;}
				$('td[role="gridcell"]',tre).each( function(i) {
					nm = cm[i].name;
					// hidden fields are included in the form
					if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && cm[i].editable===true) {
						if(nm === p.ExpandColumn && p.treeGrid === true) {
							tmp = $(this).text();
						} else {
							try {
								tmp =  $.unformat.call($t, $(this),{rowId:rowid, colModel:cm[i]},i);
							} catch (_) {
								tmp = cm[i].edittype==="textarea" ? $(this).text() : $(this).html();
							}
						}
						if(p.autoencode) {tmp = jgrid.htmlDecode(tmp);}
						if(rp_ge[gID].checkOnSubmit===true || rp_ge[gID].checkOnUpdate) {rp_ge[gID]._savedData[nm] = tmp;}
						nm = "#"+jqID(nm);
						switch (cm[i].edittype) {
							case "password":
							case "text":
							case "button" :
							case "image":
							case "textarea":
								if(tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length===1 && tmp.charCodeAt(0)===160) ) {tmp='';}
								$(nm,fmid).val(tmp);
								break;
							case "select":
								var opv = tmp.split(",");
								opv = $.map(opv,function(n){return $.trim(n);});
								$(nm+" option",fmid).each(function(){
									if (!cm[i].editoptions.multiple && ($.trim(tmp) === $.trim($(this).text()) || opv[0] === $.trim($(this).text()) || opv[0] === $.trim($(this).val())) ){
										this.selected= true;
									} else if (cm[i].editoptions.multiple){
										if(  $.inArray($.trim($(this).text()), opv ) > -1 || $.inArray($.trim($(this).val()), opv ) > -1  ){
											this.selected = true;
										}else{
											this.selected = false;
										}
									} else {
										this.selected = false;
									}
								});
								break;
							case "checkbox":
								tmp = String(tmp);
								if(cm[i].editoptions && cm[i].editoptions.value) {
									var cb = cm[i].editoptions.value.split(":");
									if(cb[0] === tmp) {
										$(nm,fmid)[p.useProp ? 'prop': 'attr']({"checked":true, "defaultChecked" : true});
									} else {
										$(nm,fmid)[p.useProp ? 'prop': 'attr']({"checked":false, "defaultChecked" : false});
									}
								} else {
									tmp = tmp.toLowerCase();
									if(tmp.search(/(false|f|0|no|n|off|undefined)/i)<0 && tmp!=="") {
										$(nm,fmid)[p.useProp ? 'prop': 'attr']("checked",true);
										$(nm,fmid)[p.useProp ? 'prop': 'attr']("defaultChecked",true); //ie
									} else {
										$(nm,fmid)[p.useProp ? 'prop': 'attr']("checked", false);
										$(nm,fmid)[p.useProp ? 'prop': 'attr']("defaultChecked", false); //ie
									}
								}
								break;
							case 'custom' :
								try {
									if(cm[i].editoptions && $.isFunction(cm[i].editoptions.custom_value)) {
										cm[i].editoptions.custom_value.call($t, $(nm,fmid),'set',tmp);
									} else {throw "e1";}
								} catch (e) {
									if (e==="e1") {jgrid.info_dialog(jgrid.errors.errcap,"function 'custom_value' "+jgrid.edit.msg.nodefined,jgrid.edit.bClose);}
									else {jgrid.info_dialog(jgrid.errors.errcap,e.message,jgrid.edit.bClose);}
								}
								break;
						}
						cnt++;
					}
				});
				if(cnt>0) {$("#id_g",frmtb).val(rowid);}
			}
			function setNulls() {
				$.each(p.colModel, function(i,n){
					if(n.editoptions && n.editoptions.NullIfEmpty === true) {
						if(postdata.hasOwnProperty(n.name) && postdata[n.name] === "") {
							postdata[n.name] = 'null';
						}
					}
				});
			}
			function postIt() {
				var copydata, ret=[true,"",""], onCS = {}, opers = p.prmNames, idname, oper, key, selr, i, url;
				
				var retvals = $self.triggerHandler("jqGridAddEditBeforeCheckValues", [$(frmgr), frmoper]);
				if(retvals && typeof retvals === 'object') {postdata = retvals;}
				
				if($.isFunction(rp_ge[gID].beforeCheckValues)) {
					retvals = rp_ge[gID].beforeCheckValues.call($t, postdata,$(frmgr),frmoper);
					if(retvals && typeof retvals === 'object') {postdata = retvals;}
				}
				for( key in postdata ){
					if(postdata.hasOwnProperty(key)) {
						ret = jgrid.checkValues.call($t,postdata[key],key);
						if(ret[0] === false) {break;}
					}
				}
				setNulls();
				if(ret[0]) {
					onCS = $self.triggerHandler("jqGridAddEditClickSubmit", [rp_ge[gID], postdata, frmoper]);
					if( onCS === undefined && $.isFunction( rp_ge[gID].onclickSubmit)) { 
						onCS = rp_ge[gID].onclickSubmit.call($t, rp_ge[gID], postdata, frmoper) || {}; 
					}
					ret = $self.triggerHandler("jqGridAddEditBeforeSubmit", [postdata, $(frmgr), frmoper]);
					if(ret === undefined) {
						ret = [true,"",""];
					}
					if( ret[0] && $.isFunction(rp_ge[gID].beforeSubmit))  {
						ret = rp_ge[gID].beforeSubmit.call($t,postdata,$(frmgr), frmoper);
					}
				}

				if(ret[0] && !rp_ge[gID].processing) {
					rp_ge[gID].processing = true;
					$("#sData", frmtb2).addClass('ui-state-active');
					url = rp_ge[gID].url || $self.jqGrid('getGridParam','editurl');
					oper = opers.oper;
					idname = url === 'clientArray' ? p.keyName : opers.id;
					// we add to pos data array the action - the name is oper
					postdata[oper] = ($.trim(postdata[gID+"_id"]) === "_empty") ? opers.addoper : opers.editoper;
					if(postdata[oper] !== opers.addoper) {
						postdata[idname] = postdata[gID+"_id"];
					} else {
						// check to see if we have allredy this field in the form and if yes lieve it
						if( postdata[idname] === undefined ) {postdata[idname] = postdata[gID+"_id"];}
					}
					delete postdata[gID+"_id"];
					postdata = $.extend(postdata,rp_ge[gID].editData,onCS);
					if(p.treeGrid === true)  {
						if(postdata[oper] === opers.addoper) {
						selr = $self.jqGrid("getGridParam", 'selrow');
							var trParID = p.treeGridModel === 'adjacency' ? p.treeReader.parent_id_field : 'parent_id';
							postdata[trParID] = selr;
						}
						for(i in p.treeReader){
							if(p.treeReader.hasOwnProperty(i)) {
								var itm = p.treeReader[i];
								if(postdata.hasOwnProperty(itm)) {
									if(postdata[oper] === opers.addoper && i === 'parent_id_field') {continue;}
									delete postdata[itm];
								}
							}
						}
					}
					
					postdata[idname] = jgrid.stripPref(p.idPrefix, postdata[idname]);
					var ajaxOptions = $.extend({
						url: url,
						type: rp_ge[gID].mtype,
						data: $.isFunction(rp_ge[gID].serializeEditData) ? rp_ge[gID].serializeEditData.call($t,postdata) :  postdata,
						complete:function(data,status){
							var key;
							$("#sData", frmtb2).removeClass('ui-state-active');
							postdata[idname] = p.idPrefix + postdata[idname];
							if(data.status >= 300 && data.status !== 304) {
								ret[0] = false;
								ret[1] = $self.triggerHandler("jqGridAddEditErrorTextFormat", [data, frmoper]);
								if ($.isFunction(rp_ge[gID].errorTextFormat)) {
									ret[1] = rp_ge[gID].errorTextFormat.call($t, data, frmoper);
								} else {
									ret[1] = status + " Status: '" + data.statusText + "'. Error code: " + data.status;
								}
							} else {
								// data is posted successful
								// execute aftersubmit with the returned data from server
								ret = $self.triggerHandler("jqGridAddEditAfterSubmit", [data, postdata, frmoper]);
								if(ret === undefined) {
									ret = [true,"",""];
								}
								if( ret[0] && $.isFunction(rp_ge[gID].afterSubmit) ) {
									ret = rp_ge[gID].afterSubmit.call($t, data,postdata, frmoper);
								}
							}
							if(ret[0] === false) {
								$("#FormError>td",frmtb).html(ret[1]);
								$("#FormError",frmtb).show();
							} else {
								if(p.autoencode) {
									$.each(postdata,function(n,v){
										postdata[n] = jgrid.htmlDecode(v);
									});
								}
								//rp_ge[gID].reloadAfterSubmit = rp_ge[gID].reloadAfterSubmit && $t.o.datatype != "local";
								// the action is add
								if(postdata[oper] === opers.addoper ) {
									//id processing
									// user not set the id ret[2]
									if(!ret[2]) {ret[2] = jgrid.randId();}
									if(postdata[idname] == null || postdata[idname] === "_empty"){
										postdata[idname] = ret[2];
									} else {
										ret[2] = postdata[idname];
									}
									if(rp_ge[gID].reloadAfterSubmit) {
										$self.trigger("reloadGrid");
									} else {
										if(p.treeGrid === true){
											$self.jqGrid("addChildNode",ret[2],selr,postdata );
										} else {
											$self.jqGrid("addRowData",ret[2],postdata,o.addedrow);
										}
									}
									if(rp_ge[gID].closeAfterAdd) {
										if(p.treeGrid !== true){
											$self.jqGrid("setSelection",ret[2]);
										}
										hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: rp_ge[gID].onClose, removemodal: rp_ge[gID].removemodal, formprop: !rp_ge[gID].recreateForm, form: rp_ge[gID].form});
									} else if (rp_ge[gID].clearAfterAdd) {
										fillData("_empty",frmgr);
									}
								} else {
									// the action is update
									if(rp_ge[gID].reloadAfterSubmit) {
										$self.trigger("reloadGrid");
										if( !rp_ge[gID].closeAfterEdit ) {setTimeout(function(){$self.jqGrid("setSelection",postdata[idname]);},1000);}
									} else {
										if(p.treeGrid === true) {
											$self.jqGrid("setTreeRow", postdata[idname],postdata);
										} else {
											$self.jqGrid("setRowData", postdata[idname],postdata);
										}
									}
									if(rp_ge[gID].closeAfterEdit) {hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: rp_ge[gID].onClose, removemodal: rp_ge[gID].removemodal, formprop: !rp_ge[gID].recreateForm, form: rp_ge[gID].form});}
								}
								if($.isFunction(rp_ge[gID].afterComplete)) {
									copydata = data;
									setTimeout(function(){
										$self.triggerHandler("jqGridAddEditAfterComplete", [copydata, postdata, $(frmgr), frmoper]);
										rp_ge[gID].afterComplete.call($t, copydata, postdata, $(frmgr), frmoper);
										copydata=null;
									},500);
								}
								if(rp_ge[gID].checkOnSubmit || rp_ge[gID].checkOnUpdate) {
									$(frmgr).data("disabled",false);
									if(rp_ge[gID]._savedData[gID+"_id"] !== "_empty"){
										for(key in rp_ge[gID]._savedData) {
											if(rp_ge[gID]._savedData.hasOwnProperty(key) && postdata[key]) {
												rp_ge[gID]._savedData[key] = postdata[key];
											}
										}
									}
								}
							}
							rp_ge[gID].processing=false;
							try{$(':input:visible',frmgr)[0].focus();} catch (e){}
						}
					}, jgrid.ajaxOptions, rp_ge[gID].ajaxEditOptions );

					if (!ajaxOptions.url && !rp_ge[gID].useDataProxy) {
						if ($.isFunction(p.dataProxy)) {
							rp_ge[gID].useDataProxy = true;
						} else {
							ret[0]=false;ret[1] += " "+jgrid.errors.nourl;
						}
					}
					if (ret[0]) {
						if (rp_ge[gID].useDataProxy) {
							var dpret = p.dataProxy.call($t, ajaxOptions, "set_"+gID); 
							if(dpret === undefined) {
								dpret = [true, ""];
							}
							if(dpret[0] === false ) {
								ret[0] = false;
								ret[1] = dpret[1] || "Error deleting the selected row!" ;
							} else {
								if(ajaxOptions.data.oper === opers.addoper && rp_ge[gID].closeAfterAdd ) {
									hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: rp_ge[gID].onClose, removemodal: rp_ge[gID].removemodal, formprop: !rp_ge[gID].recreateForm, form: rp_ge[gID].form});
								}
								if(ajaxOptions.data.oper === opers.editoper && rp_ge[gID].closeAfterEdit ) {
									hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: rp_ge[gID].onClose, removemodal: rp_ge[gID].removemodal, formprop: !rp_ge[gID].recreateForm, form: rp_ge[gID].form});
								}
							}
						} else {
							if(ajaxOptions.url === "clientArray") {
								rp_ge[gID].reloadAfterSubmit = false;
								postdata = ajaxOptions.data;
								ajaxOptions.complete({status:200, statusText:''},'');
							} else {
								$.ajax(ajaxOptions); 
							}
						}
					}
				}
				if(ret[0] === false) {
					$("#FormError>td",frmtb).html(ret[1]);
					$("#FormError",frmtb).show();
					// return;
				}
			}
			function compareData(nObj, oObj ) {
				var ret = false,key;
				for (key in nObj) {
					if(nObj.hasOwnProperty(key) && nObj[key] != oObj[key]) {
						ret = true;
						break;
					}
				}
				return ret;
			}
			function checkUpdates () {
				var stat = true;
				$("#FormError",frmtb).hide();
				if(rp_ge[gID].checkOnUpdate) {
					postdata = {};
					getFormData();
					diff = compareData(postdata,rp_ge[gID]._savedData);
					if(diff) {
						$(frmgr).data("disabled",true);
						$(".confirm",themodalSelector).show();
						stat = false;
					}
				}
				return stat;
			}
			function restoreInline()
			{
				var i;
				if (rowid !== "_empty" && p.savedRow !== undefined && p.savedRow.length > 0 && $.isFunction($.fn.jqGrid.restoreRow)) {
					for (i=0;i<p.savedRow.length;i++) {
						if (p.savedRow[i].id == rowid) {
							$self.jqGrid('restoreRow',rowid);
							break;
						}
					}
				}
			}
			function updateNav(cr, posarr){
				var totr = posarr[1].length-1;
				if (cr===0) {
					$("#pData",frmtb2).addClass('ui-state-disabled');
				} else if( posarr[1][cr-1] !== undefined && $("#"+jqID(posarr[1][cr-1])).hasClass('ui-state-disabled')) {
						$("#pData",frmtb2).addClass('ui-state-disabled');
				} else {
					$("#pData",frmtb2).removeClass('ui-state-disabled');
				}
				
				if (cr===totr) {
					$("#nData",frmtb2).addClass('ui-state-disabled');
				} else if( posarr[1][cr+1] !== undefined && $("#"+jqID(posarr[1][cr+1])).hasClass('ui-state-disabled')) {
					$("#nData",frmtb2).addClass('ui-state-disabled');
				} else {
					$("#nData",frmtb2).removeClass('ui-state-disabled');
				}
			}
			function getCurrPos() {
				var rowsInGrid = $self.jqGrid("getDataIDs"),
				selrow = $("#id_g",frmtb).val(),
				pos = $.inArray(selrow,rowsInGrid);
				return [pos,rowsInGrid];
			}

			var dh = isNaN(rp_ge[gID].dataheight) ? rp_ge[gID].dataheight : rp_ge[gID].dataheight+"px",
			dw = isNaN(rp_ge[gID].datawidth) ? rp_ge[gID].datawidth : rp_ge[gID].datawidth+"px",
			frm = $("<form name='FormPost' id='"+frmgrID+"' class='FormGrid' onSubmit='return false;' style='width:"+dw+";overflow:auto;position:relative;height:"+dh+";'></form>").data("disabled",false),
			tbl = $("<table id='"+frmtborg+"' class='EditTable'"+(jgrid.msie && jgrid.msiever() < 8 ? " cellspacing='0'" : "")+"><tbody></tbody></table>");
			$(p.colModel).each( function() {
				var fmto = this.formoptions;
				maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0 );
				maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0 );
			});
			$(frm).append(tbl);
			var flr = $("<tr id='FormError' style='display:none'><td class='ui-state-error' colspan='"+(maxCols*2)+"'></td></tr>");
			flr[0].rp = 0;
			$(tbl).append(flr);
			//topinfo
			flr = $("<tr style='display:none' class='tinfo'><td class='topinfo' colspan='"+(maxCols*2)+"'>"+rp_ge[gID].topinfo+"</td></tr>");
			flr[0].rp = 0;
			$(tbl).append(flr);
			showFrm = $self.triggerHandler("jqGridAddEditBeforeInitData", [frm, frmoper]);
			if(showFrm === undefined) {
				showFrm = true;
			}
			if(showFrm && onBeforeInit) {
				showFrm = onBeforeInit.call($t,frm, frmoper);
			}
			if(showFrm === false) {return;}
			restoreInline();
			// set the id.
			// use carefull only to change here colproperties.
			// create data
			var rtlb = p.direction === "rtl" ? true :false,
			bp = rtlb ? "nData" : "pData",
			bn = rtlb ? "pData" : "nData";
			createData(rowid,tbl,maxCols);
			// buttons at footer
			var bP = "<a id='"+bp+"' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>",
			bN = "<a id='"+bn+"' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>",
			bS  ="<a id='sData' class='fm-button ui-state-default ui-corner-all'>"+o.bSubmit+"</a>",
			bC  ="<a id='cData' class='fm-button ui-state-default ui-corner-all'>"+o.bCancel+"</a>";
			var bt = "<table"+(jgrid.msie && jgrid.msiever() < 8 ? " cellspacing='0'" : "")+" class='EditTable' id='"+frmtborg+"_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton'>"+(rtlb ? bN+bP : bP+bN)+"</td><td class='EditButton'>"+bS+bC+"</td></tr>";
			bt += "<tr style='display:none' class='binfo'><td class='bottominfo' colspan='2'>"+rp_ge[gID].bottominfo+"</td></tr>";
			bt += "</tbody></table>";
			if(maxRows >  0) {
				var sd=[];
				$.each($(tbl)[0].rows,function(i,r){
					sd[i] = r;
				});
				sd.sort(function(a,b){
					if(a.rp > b.rp) {return 1;}
					if(a.rp < b.rp) {return -1;}
					return 0;
				});
				$.each(sd, function(index, row) {
					$('tbody',tbl).append(row);
				});
			}
			o.gbox = gboxSelector;
			var cle = false;
			if(o.closeOnEscape===true){
				o.closeOnEscape = false;
				cle = true;
			}
			var tms = $("<div></div>").append(frm).append(bt);
			jgrid.createModal(ids,tms, rp_ge[gID] ,p.gView,$(gboxSelector)[0]);
			if(rtlb) {
				$("#pData, #nData",frmtb2).css("float","right");
				$(".EditButton",frmtb2).css("text-align","left");
			}
			if(rp_ge[gID].topinfo) {$(".tinfo",frmtb).show();}
			if(rp_ge[gID].bottominfo) {$(".binfo",frmtb2).show();}
			tms = null;bt=null;
			$(themodalSelector).keydown( function( e ) {
				var wkey = e.target;
				if ($(frmgr).data("disabled")===true ) {return false;}//??
				if(rp_ge[gID].savekey[0] === true && e.which === rp_ge[gID].savekey[1]) { // save
					if(wkey.tagName !== "TEXTAREA") {
						$("#sData", frmtb2).trigger("click");
						return false;
					}
				}
				if(e.which === 27) {
					if(!checkUpdates()) {return false;}
					if(cle)	{hideModal(themodalSelector,{gb:o.gbox,jqm:o.jqModal, onClose: rp_ge[gID].onClose, removemodal: rp_ge[gID].removemodal, formprop: !rp_ge[gID].recreateForm, form: rp_ge[gID].form});}
					return false;
				}
				if(rp_ge[gID].navkeys[0]===true) {
					if($("#id_g",frmtb).val() === "_empty") {return true;}
					if(e.which === rp_ge[gID].navkeys[1]){ //up
						$("#pData", frmtb2).trigger("click");
						return false;
					}
					if(e.which === rp_ge[gID].navkeys[2]){ //down
						$("#nData", frmtb2).trigger("click");
						return false;
					}
				}
			});
			if(o.checkOnUpdate) {
				$("a.ui-jqdialog-titlebar-close span",themodalSelector).removeClass("jqmClose");
				$("a.ui-jqdialog-titlebar-close",themodalSelector).unbind("click")
				.click(function(){
					if(!checkUpdates()) {return false;}
					hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: rp_ge[gID].onClose, removemodal: rp_ge[gID].removemodal, formprop: !rp_ge[gID].recreateForm, form: rp_ge[gID].form});
					return false;
				});
			}
			o.saveicon = $.extend([true,"left","ui-icon-disk"],o.saveicon);
			o.closeicon = $.extend([true,"left","ui-icon-close"],o.closeicon);
			// beforeinitdata after creation of the form
			if(o.saveicon[0]===true) {
				$("#sData",frmtb2).addClass(o.saveicon[1] === "right" ? 'fm-button-icon-right' : 'fm-button-icon-left')
				.append("<span class='ui-icon "+o.saveicon[2]+"'></span>");
			}
			if(o.closeicon[0]===true) {
				$("#cData",frmtb2).addClass(o.closeicon[1] === "right" ? 'fm-button-icon-right' : 'fm-button-icon-left')
				.append("<span class='ui-icon "+o.closeicon[2]+"'></span>");
			}
			if(rp_ge[gID].checkOnSubmit || rp_ge[gID].checkOnUpdate) {
				bS  ="<a id='sNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>"+o.bYes+"</a>";
				bN  ="<a id='nNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>"+o.bNo+"</a>";
				bC  ="<a id='cNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>"+o.bExit+"</a>";
				var zI = o.zIndex  || 999;zI ++;
				$("<div class='"+ o.overlayClass+" jqgrid-overlay confirm' style='z-index:"+zI+";display:none;'>&#160;"+"</div><div class='confirm ui-widget-content ui-jqconfirm' style='z-index:"+(zI+1)+"'>"+o.saveData+"<br/><br/>"+bS+bN+bC+"</div>").insertAfter(frmgr);
				$("#sNew",themodalSelector).click(function(){
					postIt();
					$(frmgr).data("disabled",false);
					$(".confirm",themodalSelector).hide();
					return false;
				});
				$("#nNew",themodalSelector).click(function(){
					$(".confirm",themodalSelector).hide();
					$(frmgr).data("disabled",false);
					setTimeout(function(){$(":input:visible",frmgr)[0].focus();},0);
					return false;
				});
				$("#cNew",themodalSelector).click(function(){
					$(".confirm",themodalSelector).hide();
					$(frmgr).data("disabled",false);
					hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: rp_ge[gID].onClose, removemodal: rp_ge[gID].removemodal, formprop: !rp_ge[gID].recreateForm, form: rp_ge[gID].form});
					return false;
				});
			}
			// here initform - only once
			$self.triggerHandler("jqGridAddEditInitializeForm", [$(frmgr), frmoper]);
			if(onInitializeForm) {onInitializeForm.call($t,$(frmgr), frmoper);}
			if(rowid==="_empty" || !rp_ge[gID].viewPagerButtons) {$("#pData,#nData",frmtb2).hide();} else {$("#pData,#nData",frmtb2).show();}
			$self.triggerHandler("jqGridAddEditBeforeShowForm", [$(frmgr), frmoper]);
			if(onBeforeShow) { onBeforeShow.call($t, $(frmgr), frmoper);}
			$(themodalSelector).data("onClose",rp_ge[gID].onClose);
			jgrid.viewModal(themodalSelector,{
				gbox:gboxSelector,
				jqm:o.jqModal, 
				overlay: o.overlay,
				modal:o.modal, 
				overlayClass: o.overlayClass,
				onHide :  function(h) {
					var fh = $(themodalSelector)[0].style.height;
					if(fh.indexOf("px") > -1 ) {
						fh = parseFloat(fh);
					}
					$self.data("formProp", {
						top:parseFloat($(h.w).css("top")),
						left : parseFloat($(h.w).css("left")),
						width : $(h.w).width(),
						height : fh,
						dataheight : $(frmgr).height(),
						datawidth: $(frmgr).width()
					});
					h.w.remove();
					if(h.o) {h.o.remove();}
				}
			});
			if(!closeovrl) {
				$("." + jqID(o.overlayClass)).click(function(){
					if(!checkUpdates()) {return false;}
					hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: rp_ge[gID].onClose, removemodal: rp_ge[gID].removemodal, formprop: !rp_ge[gID].recreateForm, form: rp_ge[gID].form});
					return false;
				});
			}
			$(".fm-button",themodalSelector).hover(
				function(){$(this).addClass('ui-state-hover');},
				function(){$(this).removeClass('ui-state-hover');}
			);
			$("#sData", frmtb2).click(function(){
				postdata = {};
				$("#FormError",frmtb).hide();
				// all depend on ret array
				//ret[0] - succes
				//ret[1] - msg if not succes
				//ret[2] - the id  that will be set if reload after submit false
				getFormData();
				if(postdata[gID+"_id"] === "_empty")	{postIt();}
				else if(o.checkOnSubmit===true ) {
					diff = compareData(postdata,rp_ge[gID]._savedData);
					if(diff) {
						$(frmgr).data("disabled",true);
						$(".confirm",themodalSelector).show();
					} else {
						postIt();
					}
				} else {
					postIt();
				}
				return false;
			});
			$("#cData", frmtb2).click(function(){
				if(!checkUpdates()) {return false;}
				hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: rp_ge[gID].onClose, removemodal: rp_ge[gID].removemodal, formprop: !rp_ge[gID].recreateForm, form: rp_ge[gID].form});
				return false;
			});
			$("#nData", frmtb2).click(function(){
				if(!checkUpdates()) {return false;}
				$("#FormError",frmtb).hide();
				var npos = getCurrPos();
				npos[0] = parseInt(npos[0],10);
				if(npos[0] !== -1 && npos[1][npos[0]+1]) {
					$self.triggerHandler("jqGridAddEditClickPgButtons", ['next',$(frmgr),npos[1][npos[0]]]);
					var nposret;
					if($.isFunction(o.onclickPgButtons)) {
						nposret = o.onclickPgButtons.call($t, 'next',$(frmgr),npos[1][npos[0]]);
						if( nposret !== undefined && nposret === false ) {return false;}
					}
					if( $("#"+jqID(npos[1][npos[0]+1])).hasClass('ui-state-disabled')) {return false;}
					fillData(npos[1][npos[0]+1],frmgr);
					$self.jqGrid("setSelection",npos[1][npos[0]+1]);
					$self.triggerHandler("jqGridAddEditAfterClickPgButtons", ['next',$(frmgr),npos[1][npos[0]]]);
					if($.isFunction(o.afterclickPgButtons)) {
						o.afterclickPgButtons.call($t, 'next',$(frmgr),npos[1][npos[0]+1]);
					}
					updateNav(npos[0]+1,npos);
				}
				return false;
			});
			$("#pData", frmtb2).click(function(){
				if(!checkUpdates()) {return false;}
				$("#FormError",frmtb).hide();
				var ppos = getCurrPos();
				if(ppos[0] !== -1 && ppos[1][ppos[0]-1]) {
					$self.triggerHandler("jqGridAddEditClickPgButtons", ['prev',$(frmgr),ppos[1][ppos[0]]]);
					var pposret;
					if($.isFunction(o.onclickPgButtons)) {
						pposret = o.onclickPgButtons.call($t, 'prev',$(frmgr),ppos[1][ppos[0]]);
						if( pposret !== undefined && pposret === false ) {return false;}
					}
					if( $("#"+jqID(ppos[1][ppos[0]-1])).hasClass('ui-state-disabled')) {return false;}
					fillData(ppos[1][ppos[0]-1],frmgr);
					$self.jqGrid("setSelection",ppos[1][ppos[0]-1]);
					$self.triggerHandler("jqGridAddEditAfterClickPgButtons", ['prev',$(frmgr),ppos[1][ppos[0]]]);
					if($.isFunction(o.afterclickPgButtons)) {
						o.afterclickPgButtons.call($t, 'prev',$(frmgr),ppos[1][ppos[0]-1]);
					}
					updateNav(ppos[0]-1,ppos);
				}
				return false;
			});
			$self.triggerHandler("jqGridAddEditAfterShowForm", [$(frmgr), frmoper]);
			if(onAfterShow) { onAfterShow.call($t, $(frmgr), frmoper); }
			var posInit =getCurrPos();
			updateNav(posInit[0],posInit);
		});
	},
	viewGridRow : function(rowid, o){
		o = $.extend(true, {
			top : 0,
			left: 0,
			width: 0,
			datawidth: 'auto',
			height: 'auto',
			dataheight: 'auto',
			modal: false,
			overlay: 30,
			drag: true,
			resize: true,
			jqModal: true,
			closeOnEscape : false,
			labelswidth: '30%',
			closeicon: [],
			navkeys: [false,38,40],
			onClose: null,
			beforeShowForm : null,
			beforeInitData : null,
			viewPagerButtons : true,
			recreateForm : false,
			removemodal: true,
			form: 'view'
		}, $.jgrid.view, o || {});
		rp_ge[$(this)[0].p.id] = o;
		return this.each(function(){
			var $t = this, $self = $($t);
			if (!$t.grid || !rowid) {return;}
			var p = $t.p, gID = p.id, jgrid = $.jgrid, jqID = jgrid.jqID,
			frmgr = "#ViewGrid_"+jqID(gID), frmtb = "#ViewTbl_" + jqID(gID), frmtb2 = frmtb+"_2",
			frmgrID = "ViewGrid_"+gID, frmtbID = "ViewTbl_"+gID,
			ids = {themodal:'viewmod'+gID,modalhead:'viewhd'+gID,modalcontent:'viewcnt'+gID, scrollelm : frmgrID},
			themodalSelector = "#"+jqID(ids.themodal), gboxSelector = p.gBox,
			onBeforeInit = $.isFunction(rp_ge[gID].beforeInitData) ? rp_ge[gID].beforeInitData : false,
			showFrm = true,
			maxCols = 1, maxRows=0;
			if(!o.recreateForm) {
				if( $self.data("viewProp") ) {
					$.extend(rp_ge[gID], $self.data("viewProp"));
				}
			}
			function focusaref(){ //Sfari 3 issues
				if(rp_ge[gID].closeOnEscape===true || rp_ge[gID].navkeys[0]===true) {
					setTimeout(function(){$(".ui-jqdialog-titlebar-close","#"+jqID(ids.modalhead)).attr("tabindex", "-1").focus();},0);
				}
			}
			function createData(rowid,tb,maxcols){
				var nm, hc,trdata, cnt=0,tmp, dc, retpos=[], ind = $self.jqGrid("getInd",rowid), i,
				tdtmpl = "<td class='CaptionTD form-view-label ui-widget-content' width='"+o.labelswidth+"'></td><td class='DataTD form-view-data ui-helper-reset ui-widget-content'></td>", tmpl="",
				tdtmpl2 = "<td class='CaptionTD form-view-label ui-widget-content'></td><td class='DataTD form-view-data ui-widget-content'></td>",
				fmtnum = ['integer','number','currency'], max1=0, max2=0, maxw, setme, viewfld;
				for (i=1;i<=maxcols;i++) {
					tmpl += i === 1 ? tdtmpl : tdtmpl2;
				}
				// find max number align rigth with property formatter
				$(p.colModel).each( function() {
					if(this.editrules && this.editrules.edithidden === true) {
						hc = false;
					} else {
						hc = this.hidden === true ? true : false;
					}
					if(!hc && this.align==='right') {
						if(this.formatter && $.inArray(this.formatter,fmtnum) !== -1 ) {
							max1 = Math.max(max1,parseInt(this.width,10));
						} else {
							max2 = Math.max(max2,parseInt(this.width,10));
						}
					}
				});
				maxw  = max1 !==0 ? max1 : max2 !==0 ? max2 : 0;
				$(p.colModel).each( function(i) {
					var $td;
					nm = this.name;
					setme = false;
					// hidden fields are included in the form
					if(this.editrules && this.editrules.edithidden === true) {
						hc = false;
					} else {
						hc = this.hidden === true ? true : false;
					}
					dc = hc ? "style='display:none'" : "";
					viewfld = (typeof this.viewable !== 'boolean') ? true : this.viewable;
					if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && viewfld) {
						if(ind === false) {
							tmp = "";
						} else {
							$td = $("td:eq("+i+")",$t.rows[ind]);
							if(nm === p.ExpandColumn && p.treeGrid === true) {
								tmp = $td.text();
							} else {
								tmp = this.autoResizable && $td.length > 0 && $($td[0].firstChild).hasClass(p.autoResizableWrapperClassName) ?
									$($td[0].firstChild).html() :
									$td.html();
							}
						}
						setme = this.align === 'right' && maxw !==0 ? true : false;
						var frmopt = $.extend({},{rowabove:false,rowcontent:''}, this.formoptions || {}),
						rp = parseInt(frmopt.rowpos,10) || cnt+1,
						cp = parseInt((parseInt(frmopt.colpos,10) || 1)*2,10);
						if(frmopt.rowabove) {
							var newdata = $("<tr><td class='contentinfo' colspan='"+(maxcols*2)+"'>"+frmopt.rowcontent+"</td></tr>");
							$(tb).append(newdata);
							newdata[0].rp = rp;
						}
						trdata = $(tb).find("tr[rowpos="+rp+"]");
						if ( trdata.length===0 ) {
							trdata = $("<tr "+dc+" rowpos='"+rp+"'></tr>").addClass("FormData").attr("id","trv_"+nm);
							$(trdata).append(tmpl);
							$(tb).append(trdata);
							trdata[0].rp = rp;
						}
						$("td:eq("+(cp-2)+")",trdata[0]).html('<b>'+ ((frmopt.label === undefined ? p.colNames[i]: frmopt.label) || "&nbsp;")+'</b>');
						$("td:eq("+(cp-1)+")",trdata[0]).html("<span>"+(tmp || "&nbsp;")+"</span>").attr("id","v_"+nm);
						if(setme){
							$("td:eq("+(cp-1)+") span",trdata[0]).css({'text-align':'right',width:maxw+"px"});
						}
						retpos[cnt] = i;
						cnt++;
					}
				});
				if( cnt > 0) {
					var idrow = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+ (maxcols*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='"+rowid+"'/></td></tr>");
					idrow[0].rp = cnt+99;
					$(tb).append(idrow);
				}
				return retpos;
			}
			function fillData(rowid){
				var nm, hc,cnt=0,tmp,trv = $self.jqGrid("getInd",rowid,true), cm;
				if(!trv) {return;}
				$('td',trv).each( function(i) {
					cm = p.colModel[i];
					nm = cm.name;
					// hidden fields are included in the form
					if(cm.editrules && cm.editrules.edithidden === true) {
						hc = false;
					} else {
						hc = cm.hidden === true ? true : false;
					}
					if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn') {
						if(nm === p.ExpandColumn && p.treeGrid === true) {
							tmp = $(this).text();
						} else {
							tmp = cm.autoResizable && $(this.firstChild).hasClass(p.autoResizableWrapperClassName) ?
								$(this.firstChild).html() :
								$(this).html();
						}
						nm = jqID("v_"+nm);
						$("#"+nm+" span",frmtb).html(tmp);
						if (hc) {$("#"+nm,frmtb).parents("tr:first").hide();}
						cnt++;
					}
				});
				if(cnt>0) {$("#id_g",frmtb).val(rowid);}
			}
			function updateNav(cr,posarr){
				var totr = posarr[1].length-1;
				if (cr===0) {
					$("#pData",frmtb2).addClass('ui-state-disabled');
				} else if( posarr[1][cr-1] !== undefined && $("#"+jqID(posarr[1][cr-1])).hasClass('ui-state-disabled')) {
					$("#pData",frmtb2).addClass('ui-state-disabled');
				} else {
					$("#pData",frmtb2).removeClass('ui-state-disabled');
				}
				if (cr===totr) {
					$("#nData",frmtb2).addClass('ui-state-disabled');
				} else if( posarr[1][cr+1] !== undefined && $("#"+jqID(posarr[1][cr+1])).hasClass('ui-state-disabled')) {
					$("#nData",frmtb2).addClass('ui-state-disabled');
				} else {
					$("#nData",frmtb2).removeClass('ui-state-disabled');
				}
			}
			function getCurrPos() {
				var rowsInGrid = $self.jqGrid("getDataIDs"),
				selrow = $("#id_g",frmtb).val(),
				pos = $.inArray(selrow,rowsInGrid);
				return [pos,rowsInGrid];
			}

			var dh = isNaN(rp_ge[gID].dataheight) ? rp_ge[gID].dataheight : rp_ge[gID].dataheight+"px",
			dw = isNaN(rp_ge[gID].datawidth) ? rp_ge[gID].datawidth : rp_ge[gID].datawidth+"px",
			frm = $("<form name='FormPost' id='"+frmgrID+"' class='FormGrid' style='width:"+dw+";overflow:auto;position:relative;height:"+dh+";'></form>"),
			tbl =$("<table id='"+frmtbID+"' class='EditTable' cellspacing='1' cellpadding='2' border='0' style='table-layout:fixed'><tbody></tbody></table>");
			$(p.colModel).each( function() {
				var fmto = this.formoptions;
				maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0 );
				maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0 );
			});
			// set the id.
			$(frm).append(tbl);
			if(onBeforeInit) {
				showFrm = onBeforeInit.call($t, frm );
				if(showFrm === undefined) {
					showFrm = true;
				}
			}
			if(showFrm === false) {return;}
			createData(rowid, tbl, maxCols);
			var rtlb = p.direction === "rtl" ? true :false,
			bp = rtlb ? "nData" : "pData",
			bn = rtlb ? "pData" : "nData",
				// buttons at footer
			bP = "<a id='"+bp+"' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>",
			bN = "<a id='"+bn+"' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>",
			bC  ="<a id='cData' class='fm-button ui-state-default ui-corner-all'>"+o.bClose+"</a>";
			if(maxRows >  0) {
				var sd=[];
				$.each($(tbl)[0].rows,function(i,r){
					sd[i] = r;
				});
				sd.sort(function(a,b){
					if(a.rp > b.rp) {return 1;}
					if(a.rp < b.rp) {return -1;}
					return 0;
				});
				$.each(sd, function(index, row) {
					$('tbody',tbl).append(row);
				});
			}
			o.gbox = gboxSelector;
			var bt = $("<div></div>").append(frm).append("<table border='0' class='EditTable' id='"+frmtbID+"_2'><tbody><tr id='Act_Buttons'><td class='navButton' width='"+o.labelswidth+"'>"+(rtlb ? bN+bP : bP+bN)+"</td><td class='EditButton'>"+bC+"</td></tr></tbody></table>");
			jgrid.createModal(ids,bt,o,p.gView,$(p.gView)[0]);
			if(rtlb) {
				$("#pData, #nData",frmtb2).css("float","right");
				$(".EditButton",frmtb2).css("text-align","left");
			}
			if(!o.viewPagerButtons) {$("#pData, #nData",frmtb2).hide();}
			bt = null;
			$(themodalSelector).keydown( function( e ) {
				if(e.which === 27) {
					if(rp_ge[gID].closeOnEscape) {jgrid.hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: o.onClose, removemodal: rp_ge[gID].removemodal, formprop: !rp_ge[gID].recreateForm, form: rp_ge[gID].form});}
					return false;
				}
				if(o.navkeys[0]===true) {
					if(e.which === o.navkeys[1]){ //up
						$("#pData", frmtb2).trigger("click");
						return false;
					}
					if(e.which === o.navkeys[2]){ //down
						$("#nData", frmtb2).trigger("click");
						return false;
					}
				}
			});
			o.closeicon = $.extend([true,"left","ui-icon-close"],o.closeicon);
			if(o.closeicon[0]===true) {
				$("#cData",frmtb2).addClass(o.closeicon[1] === "right" ? 'fm-button-icon-right' : 'fm-button-icon-left')
				.append("<span class='ui-icon "+o.closeicon[2]+"'></span>");
			}
			if($.isFunction(o.beforeShowForm)) {o.beforeShowForm.call($t,$(frmgr));}
			jgrid.viewModal(themodalSelector,{
				gbox:gboxSelector,
				jqm:o.jqModal,
				overlay: o.overlay, 
				modal:o.modal,
				onHide :  function(h) {
					$self.data("viewProp", {
						top:parseFloat($(h.w).css("top")),
						left : parseFloat($(h.w).css("left")),
						width : $(h.w).width(),
						height : $(h.w).height(),
						dataheight : $(frmgr).height(),
						datawidth: $(frmgr).width()
					});
					h.w.remove();
					if(h.o) {h.o.remove();}
				}
			});
			$(".fm-button:not(.ui-state-disabled)",frmtb2).hover(
				function(){$(this).addClass('ui-state-hover');},
				function(){$(this).removeClass('ui-state-hover');}
			);
			focusaref();
			$("#cData", frmtb2).click(function(){
				jgrid.hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: o.onClose, removemodal: rp_ge[gID].removemodal, formprop: !rp_ge[gID].recreateForm, form: rp_ge[gID].form});
				return false;
			});
			$("#nData", frmtb2).click(function(){
				$("#FormError",frmtb).hide();
				var npos = getCurrPos();
				npos[0] = parseInt(npos[0],10);
				if(npos[0] !== -1 && npos[1][npos[0]+1]) {
					if($.isFunction(o.onclickPgButtons)) {
						o.onclickPgButtons.call($t,'next',$(frmgr),npos[1][npos[0]]);
					}
					fillData(npos[1][npos[0]+1]);
					$self.jqGrid("setSelection",npos[1][npos[0]+1]);
					if($.isFunction(o.afterclickPgButtons)) {
						o.afterclickPgButtons.call($t,'next',$(frmgr),npos[1][npos[0]+1]);
					}
					updateNav(npos[0]+1,npos);
				}
				focusaref();
				return false;
			});
			$("#pData", frmtb2).click(function(){
				$("#FormError",frmtb).hide();
				var ppos = getCurrPos();
				if(ppos[0] !== -1 && ppos[1][ppos[0]-1]) {
					if($.isFunction(o.onclickPgButtons)) {
						o.onclickPgButtons.call($t,'prev',$(frmgr),ppos[1][ppos[0]]);
					}
					fillData(ppos[1][ppos[0]-1]);
					$self.jqGrid("setSelection",ppos[1][ppos[0]-1]);
					if($.isFunction(o.afterclickPgButtons)) {
						o.afterclickPgButtons.call($t,'prev',$(frmgr),ppos[1][ppos[0]-1]);
					}
					updateNav(ppos[0]-1,ppos);
				}
				focusaref();
				return false;
			});
			var posInit =getCurrPos();
			updateNav(posInit[0],posInit);
		});
	},
	delGridRow : function(rowids,o) {
		o = $.extend(true, {
			top : 0,
			left: 0,
			width: 240,
			height: 'auto',
			dataheight : 'auto',
			modal: false,
			overlay: 30,
			drag: true,
			resize: true,
			url : '',
			mtype : "POST",
			reloadAfterSubmit: true,
			beforeShowForm: null,
			beforeInitData : null,
			afterShowForm: null,
			beforeSubmit: null,
			onclickSubmit: null,
			afterSubmit: null,
			jqModal : true,
			closeOnEscape : false,
			delData: {},
			delicon : [],
			cancelicon : [],
			onClose : null,
			ajaxDelOptions : {},
			processing : false,
			serializeDelData : null,
			useDataProxy : false
		}, $.jgrid.del, o ||{});
		rp_ge[$(this)[0].p.id] = o;
		return this.each(function(){
			var $t = this;
			if (!$t.grid ) {return;}
			if(!rowids) {return;}
			var p = $t.p, gID = p.id, onBeforeShow = $.isFunction(rp_ge[gID].beforeShowForm), jgrid = $.jgrid, jqID = jgrid.jqID,
			onAfterShow = $.isFunction(rp_ge[gID].afterShowForm), dtblID = "DelTbl_" + gID,
			onBeforeInit = $.isFunction(rp_ge[gID].beforeInitData) ? rp_ge[gID].beforeInitData : false,
			ids = {themodal:'delmod'+gID,modalhead:'delhd'+gID,modalcontent:'delcnt'+gID, scrollelm: dtblID},
		    themodalSelector = "#"+jqID(ids.themodal), gboxSelector = p.gBox,
			showFrm = true,
			dtbl = "#DelTbl_"+jqID(gID),postd, idname, opers, oper;

			if ($.isArray(rowids)) { rowids = rowids.join(); }
			if ( $(themodalSelector)[0] !== undefined ) {
				if(onBeforeInit) {
					showFrm = onBeforeInit.call($t,$(dtbl));
					if(showFrm === undefined) {
						showFrm = true;
					}
				}
				if(showFrm === false) {return;}
				$("#DelData>td",dtbl).text(rowids);
				$("#DelError",dtbl).hide();
				if( rp_ge[gID].processing === true) {
					rp_ge[gID].processing=false;
					$("#dData",dtbl).removeClass('ui-state-active');
				}
				if(onBeforeShow) {rp_ge[gID].beforeShowForm.call($t,$(dtbl));}
				jgrid.viewModal(themodalSelector,{gbox:gboxSelector,jqm:rp_ge[gID].jqModal,jqM: false, overlay: rp_ge[gID].overlay, modal:rp_ge[gID].modal});
				if(onAfterShow) {rp_ge[gID].afterShowForm.call($t,$(dtbl));}
			} else {
				var dh = isNaN(rp_ge[gID].dataheight) ? rp_ge[gID].dataheight : rp_ge[gID].dataheight+"px",
				dw = isNaN(o.datawidth) ? o.datawidth : o.datawidth+"px",
				tbl = "<div id='"+dtblID+"' class='formdata' style='width:"+dw+";overflow:auto;position:relative;height:"+dh+";'>";
				tbl += "<table class='DelTable'><tbody>";
				// error data
				tbl += "<tr id='DelError' style='display:none'><td class='ui-state-error'></td></tr>";
				tbl += "<tr id='DelData' style='display:none'><td >"+rowids+"</td></tr>";
				tbl += "<tr><td class=\"delmsg\" style=\"white-space:pre;\">"+rp_ge[gID].msg+"</td></tr><tr><td >&#160;</td></tr>";
				// buttons at footer
				tbl += "</tbody></table></div>";
				var bS  = "<a id='dData' class='fm-button ui-state-default ui-corner-all'>"+o.bSubmit+"</a>",
				bC  = "<a id='eData' class='fm-button ui-state-default ui-corner-all'>"+o.bCancel+"</a>";
				tbl += "<table"+(jgrid.msie && jgrid.msiever() < 8 ? " cellspacing='0'" : "")+" class='EditTable' id='"+dtblID+"_2'><tbody><tr><td><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='DelButton EditButton'>"+bS+"&#160;"+bC+"</td></tr></tbody></table>";
				o.gbox = gboxSelector;
				jgrid.createModal(ids,tbl,o,p.gView,$(p.gView)[0]);

				if(onBeforeInit) {
					showFrm = onBeforeInit.call($t,$(tbl));
					if(showFrm === undefined) {
						showFrm = true;
					}
				}
				if(showFrm === false) {return;}

				$(".fm-button",dtbl+"_2").hover(
					function(){$(this).addClass('ui-state-hover');},
					function(){$(this).removeClass('ui-state-hover');}
				);
				o.delicon = $.extend([true,"left","ui-icon-scissors"],rp_ge[gID].delicon);
				o.cancelicon = $.extend([true,"left","ui-icon-cancel"],rp_ge[gID].cancelicon);
				if(o.delicon[0]===true) {
					$("#dData",dtbl+"_2").addClass(o.delicon[1] === "right" ? 'fm-button-icon-right' : 'fm-button-icon-left')
					.append("<span class='ui-icon "+o.delicon[2]+"'></span>");
				}
				if(o.cancelicon[0]===true) {
					$("#eData",dtbl+"_2").addClass(o.cancelicon[1] === "right" ? 'fm-button-icon-right' : 'fm-button-icon-left')
					.append("<span class='ui-icon "+o.cancelicon[2]+"'></span>");
				}
				$("#dData",dtbl+"_2").click(function(){
					var ret=[true,""], pk,
					postdata = $("#DelData>td",dtbl).text(), //the pair is name=val1,val2,...
					cs = {};
					if( $.isFunction( rp_ge[gID].onclickSubmit ) ) {cs = rp_ge[gID].onclickSubmit.call($t,rp_ge[gID], postdata) || {};}
					if( $.isFunction( rp_ge[gID].beforeSubmit ) ) {ret = rp_ge[gID].beforeSubmit.call($t,postdata);}
					if(ret[0] && !rp_ge[gID].processing) {
						rp_ge[gID].processing = true;
						opers = p.prmNames;
						postd = $.extend({},rp_ge[gID].delData, cs);
						oper = opers.oper;
						postd[oper] = opers.deloper;
						idname = opers.id;
						postdata = String(postdata).split(",");
						if(!postdata.length) { return false; }
						for(pk in postdata) {
							if(postdata.hasOwnProperty(pk)) {
								postdata[pk] = jgrid.stripPref(p.idPrefix, postdata[pk]);
							}
						}
						postd[idname] = postdata.join();
						$(this).addClass('ui-state-active');
						var ajaxOptions = $.extend({
							url: rp_ge[gID].url || $($t).jqGrid('getGridParam','editurl'),
							type: rp_ge[gID].mtype,
							data: $.isFunction(rp_ge[gID].serializeDelData) ? rp_ge[gID].serializeDelData.call($t,postd) : postd,
							complete:function(data,status){
								var i;
								$("#dData",dtbl+"_2").removeClass('ui-state-active');
								if(data.status >= 300 && data.status !== 304) {
									ret[0] = false;
									if ($.isFunction(rp_ge[gID].errorTextFormat)) {
										ret[1] = rp_ge[gID].errorTextFormat.call($t,data);
									} else {
										ret[1] = status + " Status: '" + data.statusText + "'. Error code: " + data.status;
									}
								} else {
									// data is posted successful
									// execute aftersubmit with the returned data from server
									if( $.isFunction( rp_ge[gID].afterSubmit ) ) {
										ret = rp_ge[gID].afterSubmit.call($t,data,postd);
									}
								}
								if(ret[0] === false) {
									$("#DelError>td",dtbl).html(ret[1]);
									$("#DelError",dtbl).show();
								} else {
									if(rp_ge[gID].reloadAfterSubmit && p.datatype !== "local") {
										$($t).trigger("reloadGrid");
									} else {
										if(p.treeGrid===true){
												try {$($t).jqGrid("delTreeNode",p.idPrefix+postdata[0]);} catch(e){}
										} else {
											for(i=0;i<postdata.length;i++) {
												$($t).jqGrid("delRowData",p.idPrefix+ postdata[i]);
											}
										}
										p.selrow = null;
										p.selarrrow = [];
									}
									if($.isFunction(rp_ge[gID].afterComplete)) {
										setTimeout(function(){rp_ge[gID].afterComplete.call($t,data,postdata);},500);
									}
								}
								rp_ge[gID].processing=false;
								if(ret[0]) {jgrid.hideModal(themodalSelector,{gb:gboxSelector,jqm:rp_ge[gID].jqModal, onClose: rp_ge[gID].onClose});}
							}
						}, jgrid.ajaxOptions, rp_ge[gID].ajaxDelOptions);


						if (!ajaxOptions.url && !rp_ge[gID].useDataProxy) {
							if ($.isFunction(p.dataProxy)) {
								rp_ge[gID].useDataProxy = true;
							} else {
								ret[0]=false;ret[1] += " "+jgrid.errors.nourl;
							}
						}
						if (ret[0]) {
							if (rp_ge[gID].useDataProxy) {
								var dpret = p.dataProxy.call($t, ajaxOptions, "del_"+gID); 
								if(dpret === undefined) {
									dpret = [true, ""];
								}
								if(dpret[0] === false ) {
									ret[0] = false;
									ret[1] = dpret[1] || "Error deleting the selected row!" ;
								} else {
									jgrid.hideModal(themodalSelector,{gb:gboxSelector,jqm:rp_ge[gID].jqModal, onClose: rp_ge[gID].onClose});
								}
							}
							else {
								if(ajaxOptions.url === "clientArray") {
									postd = ajaxOptions.data;
									ajaxOptions.complete({status:200, statusText:''},'');
								} else {
									$.ajax(ajaxOptions); 
								}
							}
						}
					}

					if(ret[0] === false) {
						$("#DelError>td",dtbl).html(ret[1]);
						$("#DelError",dtbl).show();
					}
					return false;
				});
				$("#eData",dtbl+"_2").click(function(){
					jgrid.hideModal(themodalSelector,{gb:gboxSelector,jqm:rp_ge[gID].jqModal, onClose: rp_ge[gID].onClose});
					return false;
				});
				if(onBeforeShow) {rp_ge[gID].beforeShowForm.call($t,$(dtbl));}
				jgrid.viewModal(themodalSelector,{gbox:gboxSelector,jqm:rp_ge[gID].jqModal, overlay: rp_ge[gID].overlay, modal:rp_ge[gID].modal});
				if(onAfterShow) {rp_ge[gID].afterShowForm.call($t,$(dtbl));}
			}
			if(rp_ge[gID].closeOnEscape===true) {
				setTimeout(function(){$(".ui-jqdialog-titlebar-close","#"+jqID(ids.modalhead)).attr("tabindex","-1").focus();},0);
			}
		});
	},
	navGrid : function (elem, o, pEdit,pAdd,pDel,pSearch, pView) {
		o = $.extend({
			edit: true,
			editicon: "ui-icon-pencil",
			add: true,
			addicon:"ui-icon-plus",
			del: true,
			delicon:"ui-icon-trash",
			search: true,
			searchicon:"ui-icon-search",
			refresh: true,
			refreshicon:"ui-icon-refresh",
			refreshstate: 'firstpage',
			view: false,
			viewicon : "ui-icon-document",
			position : "left",
			closeOnEscape : true,
			beforeRefresh : null,
			afterRefresh : null,
			cloneToTop : false,
			alertwidth : 200,
			alertheight : 'auto',
			alerttop: null,
			alertleft: null,
			alertzIndex : null
		}, $.jgrid.nav, o ||{});
		return this.each(function() {
			if(this.nav) {return;}
			var p = this.p, gridId = p.id, alertIDs = {themodal: 'alertmod_' + gridId, modalhead: 'alerthd_' + gridId,modalcontent: 'alertcnt_' + gridId},
			$t = this, twd, tdw, jgrid = $.jgrid, jqID = jgrid.jqID, gridIdEscaped = p.idSel, gboxSelector = p.gBox,
			viewModalAlert = function () {
				jgrid.viewModal("#"+jqID(alertIDs.themodal),{gbox:gboxSelector,jqm:true});
				$("#jqg_alrt").focus();
			};
			if(!$t.grid || typeof elem !== 'string') {return;}
			if ($("#"+jqID(alertIDs.themodal))[0] === undefined) {
				if(!o.alerttop && !o.alertleft) {
					if (window.innerWidth !== undefined) {
						o.alertleft = window.innerWidth;
						o.alerttop = window.innerHeight;
					} else if (document.documentElement !== undefined && document.documentElement.clientWidth !== undefined && document.documentElement.clientWidth !== 0) {
						o.alertleft = document.documentElement.clientWidth;
						o.alerttop = document.documentElement.clientHeight;
					} else {
						o.alertleft=1024;
						o.alerttop=768;
					}
					o.alertleft = o.alertleft/2 - parseInt(o.alertwidth,10)/2;
					o.alerttop = o.alerttop/2-25;
				}
				jgrid.createModal(alertIDs,
					"<div>"+o.alerttext+"</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'></span></span>",
					{ 
						gbox:gboxSelector,
						jqModal:true,
						drag:true,
						resize:true,
						caption:o.alertcap,
						top:o.alerttop,
						left:o.alertleft,
						width:o.alertwidth,
						height: o.alertheight,
						closeOnEscape:o.closeOnEscape, 
						zIndex: o.alertzIndex
					},
					"#gview_"+gridIdEscaped,
					$(gboxSelector)[0],
					true
				);
			}
			var clone = 1, i,
			onHoverIn = function () {
				if (!$(this).hasClass('ui-state-disabled')) {
					$(this).addClass("ui-state-hover");
				}
			},
			onHoverOut = function () {
				$(this).removeClass("ui-state-hover");
			};
			if(o.cloneToTop && p.toppager) {clone = 2;}
			for(i = 0; i<clone; i++) {
				var tbd,
				navtbl = $("<table"+(jgrid.msie && jgrid.msiever() < 8 ? " cellspacing='0'" : "")+" class='ui-pg-table navtable' style='float:left;table-layout:auto;'><tbody><tr></tr></tbody></table>"),
				sep = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>",
				pgid, elemids;
				if(i===0) {
					pgid = elem;
					elemids = gridId;
					if(pgid === p.toppager) {
						elemids += "_top";
						clone = 1;
					}
				} else {
					pgid = p.toppager;
					elemids = gridId+"_top";
				}
				if(p.direction === "rtl") {$(navtbl).attr("dir","rtl").css("float","right");}
				if (o.add) {
					pAdd = pAdd || {};
					tbd = $("<td class='ui-pg-button ui-corner-all'></td>");
					$(tbd).append("<div class='ui-pg-div'><span class='ui-icon "+o.addicon+"'></span>"+o.addtext+"</div>");
					$("tr",navtbl).append(tbd);
					$(tbd,navtbl)
					.attr({"title":o.addtitle || "",id : pAdd.id || "add_"+elemids})
					.click(function(){
						if (!$(this).hasClass('ui-state-disabled')) {
							if ($.isFunction( o.addfunc )) {
								o.addfunc.call($t);
							} else {
								$($t).jqGrid("editGridRow","new",pAdd);
							}
						}
						return false;
					}).hover(onHoverIn, onHoverOut);
					tbd = null;
				}
				if (o.edit) {
					tbd = $("<td class='ui-pg-button ui-corner-all'></td>");
					pEdit = pEdit || {};
					$(tbd).append("<div class='ui-pg-div'><span class='ui-icon "+o.editicon+"'></span>"+o.edittext+"</div>");
					$("tr",navtbl).append(tbd);
					$(tbd,navtbl)
					.attr({"title":o.edittitle || "",id: pEdit.id || "edit_"+elemids})
					.click(function(){
						if (!$(this).hasClass('ui-state-disabled')) {
							var sr = p.selrow;
							if (sr) {
								if($.isFunction( o.editfunc ) ) {
									o.editfunc.call($t, sr);
								} else {
									$($t).jqGrid("editGridRow",sr,pEdit);
								}
							} else {
								viewModalAlert();
							}
						}
						return false;
					}).hover(onHoverIn, onHoverOut);
					tbd = null;
				}
				if (o.view) {
					tbd = $("<td class='ui-pg-button ui-corner-all'></td>");
					pView = pView || {};
					$(tbd).append("<div class='ui-pg-div'><span class='ui-icon "+o.viewicon+"'></span>"+o.viewtext+"</div>");
					$("tr",navtbl).append(tbd);
					$(tbd,navtbl)
					.attr({"title":o.viewtitle || "",id: pView.id || "view_"+elemids})
					.click(function(){
						if (!$(this).hasClass('ui-state-disabled')) {
							var sr = p.selrow;
							if (sr) {
								if($.isFunction( o.viewfunc ) ) {
									o.viewfunc.call($t, sr);
								} else {
									$($t).jqGrid("viewGridRow",sr,pView);
								}
							} else {
								viewModalAlert();
							}
						}
						return false;
					}).hover(onHoverIn, onHoverOut);
					tbd = null;
				}
				if (o.del) {
					tbd = $("<td class='ui-pg-button ui-corner-all'></td>");
					pDel = pDel || {};
					$(tbd).append("<div class='ui-pg-div'><span class='ui-icon "+o.delicon+"'></span>"+o.deltext+"</div>");
					$("tr",navtbl).append(tbd);
					$(tbd,navtbl)
					.attr({"title":o.deltitle || "",id: pDel.id || "del_"+elemids})
					.click(function(){
						if (!$(this).hasClass('ui-state-disabled')) {
							var dr;
							if(p.multiselect) {
								dr = p.selarrrow;
								if(dr.length===0) {dr = null;}
							} else {
								dr = p.selrow;
							}
							if(dr){
								if($.isFunction( o.delfunc )){
									o.delfunc.call($t, dr);
								}else{
									$($t).jqGrid("delGridRow",dr,pDel);
								}
							} else  {
								viewModalAlert();
							}
						}
						return false;
					}).hover(onHoverIn, onHoverOut);
					tbd = null;
				}
				if(o.add || o.edit || o.del || o.view) {$("tr",navtbl).append(sep);}
				if (o.search) {
					tbd = $("<td class='ui-pg-button ui-corner-all'></td>");
					pSearch = pSearch || {};
					$(tbd).append("<div class='ui-pg-div'><span class='ui-icon "+o.searchicon+"'></span>"+o.searchtext+"</div>");
					$("tr",navtbl).append(tbd);
					$(tbd,navtbl)
					.attr({"title":o.searchtitle  || "",id:pSearch.id || "search_"+elemids})
					.click(function(){
						if (!$(this).hasClass('ui-state-disabled')) {
							if($.isFunction( o.searchfunc )) {
								o.searchfunc.call($t, pSearch);
							} else {
								$($t).jqGrid("searchGrid",pSearch);
							}
						}
						return false;
					}).hover(onHoverIn, onHoverOut);
					if (pSearch.showOnLoad && pSearch.showOnLoad === true) {
						$(tbd,navtbl).click();
					}
					tbd = null;
				}
				if (o.refresh) {
					tbd = $("<td class='ui-pg-button ui-corner-all'></td>");
					$(tbd).append("<div class='ui-pg-div'><span class='ui-icon "+o.refreshicon+"'></span>"+o.refreshtext+"</div>");
					$("tr",navtbl).append(tbd);
					$(tbd,navtbl)
					.attr({"title":o.refreshtitle  || "",id: "refresh_"+elemids})
					.click(function(){
						if (!$(this).hasClass('ui-state-disabled')) {
							if($.isFunction(o.beforeRefresh)) {o.beforeRefresh.call($t);}
							p.search = false;
							p.resetsearch =  true;
							try {
								if( o.refreshstate !== 'currentfilter') {
									p.postData.filters ="";
									try {
										$("#fbox_"+gridIdEscaped).jqFilter('resetFilter');
									} catch(ef) {}
									if($.isFunction($t.clearToolbar)) {$t.clearToolbar.call($t,false);}
								}
							} catch (e) {}
							switch (o.refreshstate) {
								case 'firstpage':
									$($t).trigger("reloadGrid", [{page:1}]);
									break;
								case 'current':
								case 'currentfilter':
									$($t).trigger("reloadGrid", [{current:true}]);
									break;
							}
							if($.isFunction(o.afterRefresh)) {o.afterRefresh.call($t);}
						}
						return false;
					}).hover(onHoverIn, onHoverOut);
					tbd = null;
				}
				tdw = $(".ui-jqgrid").css("font-size") || "11px";
				$('body').append("<div id='testpg2' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:"+tdw+";visibility:hidden;' ></div>");
				twd = $(navtbl).clone().appendTo("#testpg2").width();
				$("#testpg2").remove();
				$(pgid+"_"+o.position,pgid).append(navtbl);
				if(p._nvtd) {
					if(twd > p._nvtd[0] ) {
						$(pgid+"_"+o.position,pgid).width(twd);
						p._nvtd[0] = twd;
					}
					p._nvtd[1] = twd;
				}
				tdw =null;twd=null;navtbl =null;
				this.nav = true;
			}
		});
	},
	navButtonAdd : function (elem, p) {
		p = $.extend({
			caption : "newButton",
			title: '',
			buttonicon : 'ui-icon-newwin',
			onClickButton: null,
			position : "last",
			cursor : 'pointer'
		}, p ||{});
		return this.each(function() {
			var jqID = $.jgrid.jqID;
			if( !this.grid)  {return;}
			if( typeof elem === "string" && elem.indexOf("#") !== 0) {elem = "#"+jqID(elem);}
			var findnav = $(".navtable",elem)[0], $t = this;
			if (findnav) {
				if( p.id && $(p.idSel, findnav)[0] !== undefined )  {return;}
				var tbd = $("<td></td>");
				if(p.buttonicon.toString().toUpperCase() === "NONE") {
                    $(tbd).addClass('ui-pg-button ui-corner-all').append("<div class='ui-pg-div'>"+p.caption+"</div>");
				} else	{
					$(tbd).addClass('ui-pg-button ui-corner-all').append("<div class='ui-pg-div'><span class='ui-icon "+p.buttonicon+"'></span>"+p.caption+"</div>");
				}
				if(p.id) {$(tbd).attr("id",p.id);}
				if(p.position==='first'){
					if(findnav.rows[0].cells.length ===0 ) {
						$("tr",findnav).append(tbd);
					} else {
						$("tr td:eq(0)",findnav).before(tbd);
					}
				} else {
					$("tr",findnav).append(tbd);
				}
				$(tbd,findnav)
				.attr("title",p.title  || "")
				.click(function(e){
					if (!$(this).hasClass('ui-state-disabled')) {
						if ($.isFunction(p.onClickButton) ) {p.onClickButton.call($t,e);}
					}
					return false;
				})
				.hover(
					function () {
						if (!$(this).hasClass('ui-state-disabled')) {
							$(this).addClass('ui-state-hover');
						}
					},
					function () {$(this).removeClass("ui-state-hover");}
				);
			}
		});
	},
	navSeparatorAdd:function (elem,p) {
		p = $.extend({
			sepclass : "ui-separator",
			sepcontent: '',
			position : "last"
		}, p ||{});
		return this.each(function() {
			if( !this.grid)  {return;}
			if( typeof elem === "string" && elem.indexOf("#") !== 0) {elem = "#"+$.jgrid.jqID(elem);}
			var findnav = $(".navtable",elem)[0];
			if(findnav) {
				var sep = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='"+p.sepclass+"'></span>"+p.sepcontent+"</td>";
				if (p.position === 'first') {
					if (findnav.rows[0].cells.length === 0) {
						$("tr", findnav).append(sep);
					} else {
						$("tr td:eq(0)", findnav).before(sep);
					}
				} else {
					$("tr", findnav).append(sep);
				}
			}
		});
	},
	GridToForm : function( rowid, formid ) {
		return this.each(function(){
			var $t = this, i, $field;
			if (!$t.grid) {return;}
			var rowdata = $($t).jqGrid("getRowData",rowid);
			if (rowdata) {
				for(i in rowdata) {
					if(rowdata.hasOwnProperty(i)) {
					$field = $("[name="+$.jgrid.jqID(i)+"]",formid);
					if ($field.is("input:radio") || $field.is("input:checkbox"))  {
						$field.each( function() {
							if( $(this).val() == rowdata[i] ) {
								$(this)[$t.p.useProp ? 'prop': 'attr']("checked",true);
							} else {
								$(this)[$t.p.useProp ? 'prop': 'attr']("checked", false);
							}
						});
					} else {
					// this is very slow on big table and form.
						$field.val(rowdata[i]);
					}
				}
			}
			}
		});
	},
	FormToGrid : function(rowid, formid, mode, position){
		return this.each(function() {
			var $t = this;
			if(!$t.grid) {return;}
			if(!mode) {mode = 'set';}
			if(!position) {position = 'first';}
			var fields = $(formid).serializeArray();
			var griddata = {};
			$.each(fields, function(i, field){
				griddata[field.name] = field.value;
			});
			if(mode==='add') {$($t).jqGrid("addRowData",rowid,griddata, position);}
			else if(mode==='set') {$($t).jqGrid("setRowData",rowid,griddata);}
		});
	}
});
})(jQuery);
/*jshint eqeqeq:false, eqnull:true */
/*global jQuery */
// Grouping module
(function($){
"use strict";
$.extend($.jgrid,{
	template : function(format){ //jqgformat
		var args = $.makeArray(arguments).slice(1), j, al = args.length;
		if(format==null) { format = ""; }
		return format.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(m,i){
			var nmarr, k;
			if(!isNaN(parseInt(i,10))) {
				return args[parseInt(i,10)];
			}
			for(j=0; j < al;j++) {
				if($.isArray(args[j])) {
					nmarr = args[j];
					k = nmarr.length;
					while(k--) {
						if(i===nmarr[k].nm) {
							return nmarr[k].v;
						}
					}
				}
			}
		});
	}
});
$.jgrid.extend({
	groupingSetup : function () {
		return this.each(function (){
			var $t = this, i, j, cml, cm = $t.p.colModel, grp = $t.p.groupingView, emptyFormatter = function(){return '';};
			if(grp !== null && ( (typeof grp === 'object') || $.isFunction(grp) ) ) {
				if(!grp.groupField.length) {
					$t.p.grouping = false;
				} else {
					if (grp.visibiltyOnNextGrouping === undefined) {
						grp.visibiltyOnNextGrouping = [];
					}

					grp.lastvalues=[];
					if(!grp._locgr) {
						grp.groups =[];
					}
					grp.counters =[];
					for(i=0;i<grp.groupField.length;i++) {
						if(!grp.groupOrder[i]) {
							grp.groupOrder[i] = 'asc';
						}
						if(!grp.groupText[i]) {
							grp.groupText[i] = '{0}';
						}
						if( typeof grp.groupColumnShow[i] !== 'boolean') {
							grp.groupColumnShow[i] = true;
						}
						if( typeof grp.groupSummary[i] !== 'boolean') {
							grp.groupSummary[i] = false;
						}
						if( !grp.groupSummaryPos[i]) {
							grp.groupSummaryPos[i] = 'footer';
						}
						if(grp.groupColumnShow[i] === true) {
							grp.visibiltyOnNextGrouping[i] = true;
							$($t).jqGrid('showCol',grp.groupField[i]);
						} else {
							grp.visibiltyOnNextGrouping[i] = $("#"+$.jgrid.jqID($t.p.id+"_"+grp.groupField[i])).is(":visible");
							$($t).jqGrid('hideCol',grp.groupField[i]);
						}
					}
					grp.summary =[];
					if(grp.hideFirstGroupCol) {
						grp.formatDisplayField[0] = function (v) { return v;};
					}
					for(j=0, cml = cm.length; j < cml; j++) {
						if(grp.hideFirstGroupCol) {
							if(!cm[j].hidden && grp.groupField[0] === cm[j].name) {
								cm[j].formatter = emptyFormatter;
							}
						}
						if(cm[j].summaryType ) {
							if(cm[j].summaryDivider) {
								grp.summary.push({nm:cm[j].name,st:cm[j].summaryType, v: '', sd:cm[j].summaryDivider, vd:'', sr: cm[j].summaryRound, srt: cm[j].summaryRoundType || 'round'});
							} else {
								grp.summary.push({nm:cm[j].name,st:cm[j].summaryType, v: '', sr: cm[j].summaryRound, srt: cm[j].summaryRoundType || 'round'});
							}
						}
					}
				}
			} else {
				$t.p.grouping = false;
			}
		});
	},
	groupingPrepare : function ( record, irow ) {
		this.each(function(){
			var grp = this.p.groupingView, $t= this, i,
			grlen = grp.groupField.length, 
			fieldName,
			v,
			displayName,
			displayValue,
			changed = 0,
			buildSummaryValue = function() {
				if ($.isFunction(this.st)) {
					this.v = this.st.call($t, this.v, this.nm, record);
				} else {
					this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
					if(this.st.toLowerCase() === 'avg' && this.sd) {
						this.vd = $($t).jqGrid('groupingCalculations.handler',this.st, this.vd, this.sd, this.sr, this.srt, record);
					}
				}
			};
			for(i=0;i<grlen;i++) {
				fieldName = grp.groupField[i];
				displayName = grp.displayField[i];
				v = record[fieldName];
				displayValue = displayName == null ? null : record[displayName];

				if( displayValue == null ) {
					displayValue = v;
				}
				if( v !== undefined ) {
					if(irow === 0 ) {
						// First record always starts a new group
						grp.groups.push({idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] } );
						grp.lastvalues[i] = v;
						grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
						$.each(grp.counters[i].summary, buildSummaryValue);
						grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
					} else {
						if (typeof v !== "object" && ($.isArray(grp.isInTheSameGroup) && $.isFunction(grp.isInTheSameGroup[i]) ? ! grp.isInTheSameGroup[i].call($t, grp.lastvalues[i], v, i, grp): grp.lastvalues[i] !== v)) {
							// This record is not in same group as previous one
							grp.groups.push({idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] } );
							grp.lastvalues[i] = v;
							changed = 1;
							grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
							$.each(grp.counters[i].summary, buildSummaryValue);
							grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
						} else {
							if (changed === 1) {
								// This group has changed because an earlier group changed.
								grp.groups.push({idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] } );
								grp.lastvalues[i] = v;
								grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
								$.each(grp.counters[i].summary, buildSummaryValue);
								grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
							} else {
								grp.counters[i].cnt += 1;
								grp.groups[grp.counters[i].pos].cnt = grp.counters[i].cnt;
								$.each(grp.counters[i].summary,buildSummaryValue);
								grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
							}
						}
					}
				}
			}
			//gdata.push( rData );
		});
		return this;
	},
	groupingToggle : function(hid){
		this.each(function(){
			var $t = this,
			grp = $t.p.groupingView,
			strpos = hid.split('_'),
			num = parseInt(strpos[strpos.length-2], 10);
			strpos.splice(strpos.length-2,2);
			var uid = strpos.join("_"),
			minus = grp.minusicon,
			plus = grp.plusicon,
			tar = $("#"+$.jgrid.jqID(hid)),
			r = tar.length ? tar[0].nextSibling : null,
			tarspan = $("#"+$.jgrid.jqID(hid)+" span."+"tree-wrap-"+$t.p.direction),
			getGroupingLevelFromClass = function (className) {
				var nums = $.map(className.split(" "), function (item) {
					if (item.substring(0, uid.length + 1) === uid + "_") {
						return parseInt(item.substring(uid.length + 1), 10);
					}
				});
				return nums.length > 0 ? nums[0] : undefined;
			},
			itemGroupingLevel,
			showData,
			collapsed = false,
			frz = $t.p.frozenColumns ? $t.p.id+"_frozen" : false,
			tar2 = frz ? $("#"+$.jgrid.jqID(hid), "#"+$.jgrid.jqID(frz) ) : false,
			r2 = (tar2 && tar2.length) ? tar2[0].nextSibling : null;
			if( tarspan.hasClass(minus) ) {
				if(grp.showSummaryOnHide) {
					if(r){
						while(r) {
							itemGroupingLevel = getGroupingLevelFromClass(r.className);
							if (itemGroupingLevel !== undefined && itemGroupingLevel <= num) {
								break;
							}
							$(r).hide();
							r = r.nextSibling;
							if(frz) {
								$(r2).hide();
								r2 = r2.nextSibling;
							}
						}
					}
				} else  {
					if(r){
						while(r) {
							itemGroupingLevel = getGroupingLevelFromClass(r.className);
							if (itemGroupingLevel !== undefined && itemGroupingLevel <= num) {
								break;
							}
							$(r).hide();
							r = r.nextSibling;
							if(frz) {
								$(r2).hide();
								r2 = r2.nextSibling;
							}
						}
					}
				}
				tarspan.removeClass(minus).addClass(plus);
				collapsed = true;
			} else {
				if(r){
					showData = undefined;
					while(r) {
						itemGroupingLevel = getGroupingLevelFromClass(r.className);
						if (showData === undefined) {
							showData = itemGroupingLevel === undefined; // if the first row after the opening group is data row then show the data rows
						}
						if (itemGroupingLevel !== undefined) {
							if (itemGroupingLevel <= num) {
								break;// next item of the same lever are found
							}
							if (itemGroupingLevel === num + 1) {
								$(r).show().find(">td>span."+"tree-wrap-"+$t.p.direction).removeClass(minus).addClass(plus);
								if(frz) {
									$(r2).show().find(">td>span."+"tree-wrap-"+$t.p.direction).removeClass(minus).addClass(plus);
								}
							}
						} else if (showData) {
							$(r).show();
							if(frz) {
								$(r2).show();
							}
						}
						r = r.nextSibling;
						if(frz) {
							r2 = r2.nextSibling;
						}
					}
				}
				tarspan.removeClass(plus).addClass(minus);
			}
			$($t).triggerHandler("jqGridGroupingClickGroup", [hid , collapsed]);
			if( $.isFunction($t.p.onClickGroup)) { $t.p.onClickGroup.call($t, hid , collapsed); }

		});
		return false;
	},
	groupingRender : function (grdata, colspans, page, rn ) {
		return this.each(function(){
			var $t = this,
			grp = $t.p.groupingView,
			str = "", icon = "", hid, clid, pmrtl = grp.groupCollapse ? grp.plusicon : grp.minusicon, gv, cp=[], len =grp.groupField.length;
			pmrtl += " tree-wrap-"+$t.p.direction; 
			$.each($t.p.colModel, function (i,n){
				var ii;
				for(ii=0;ii<len;ii++) {
					if(grp.groupField[ii] === n.name ) {
						cp[ii] = i;
						break;
					}
				}
			});
			var toEnd = 0;
			function findGroupIdx( ind , offset, grp) {
				var ret = false, i;
				if(offset===0) {
					ret = grp[ind];
				} else {
					var id = grp[ind].idx;
					if(id===0) { 
						ret = grp[ind]; 
					}  else {
						for(i=ind;i >= 0; i--) {
							if(grp[i].idx === id-offset) {
								ret = grp[i];
								break;
							}
						}
					}
				}
				return ret;
			}
			function buildSummaryTd(i, ik, grp, foffset) {
				var fdata = findGroupIdx(i, ik, grp),
				cm = $t.p.colModel,
				grlen = fdata.cnt, strTd="", k, tmpdata, tplfld;
				for(k=foffset; k<colspans;k++) {
					tmpdata = "<td "+$t.formatCol(k,1,'')+">&#160;</td>";
					tplfld = "{0}";
					$.each(fdata.summary,function(){
						var vv;
						if(this.nm === cm[k].name) {
							if(cm[k].summaryTpl)  {
								tplfld = cm[k].summaryTpl;
							}
							if(typeof this.st === 'string' && this.st.toLowerCase() === 'avg') {
								if(this.sd && this.vd) { 
									this.v = (this.v/this.vd);
								} else if(this.v && grlen > 0) {
									this.v = (this.v/grlen);
								}
							}
							try {
								this.groupCount = fdata.cnt;
								this.groupIndex = fdata.dataIndex;
								this.groupValue = fdata.value;
								vv = $t.formatter('', this.v, k, this);
							} catch (ef) {
								vv = this.v;
							}
							tmpdata= "<td "+$t.formatCol(k,1,'')+">"+$.jgrid.format(tplfld,vv)+ "</td>";
							return false;
						}
					});
					strTd += tmpdata;
				}
				return strTd;
			}
			var sumreverse = $.makeArray(grp.groupSummary);
			sumreverse.reverse();
			$.each(grp.groups,function(i,n){
				if(grp._locgr) {
					if( !(n.startRow +n.cnt > (page-1)*rn && n.startRow < page*rn)) {
						return true;
					}
				}
				toEnd++;
				clid = $t.p.id+"ghead_"+n.idx;
				hid = clid+"_"+i;
				icon = "<span style='cursor:pointer;' class='ui-icon "+pmrtl+"' onclick=\"jQuery('#"+$.jgrid.jqID($t.p.id).replace("\\", "\\\\")+"').jqGrid('groupingToggle','"+hid+"');return false;\"></span>";
				try {
					if ($.isArray(grp.formatDisplayField) && $.isFunction(grp.formatDisplayField[n.idx])) {
						n.displayValue = grp.formatDisplayField[n.idx].call($t, n.displayValue, n.value, $t.p.colModel[cp[n.idx]], n.idx, grp);
						gv = n.displayValue;
					} else {
						gv = $t.formatter(hid, n.displayValue, cp[n.idx], n.value );
					}
				} catch (egv) {
					gv = n.displayValue;
				}
				str += "<tr id=\""+hid+"\"" +(grp.groupCollapse && n.idx>0 ? " style=\"display:none;\" " : " ") + "role=\"row\" class=\"ui-widget-content jqgroup ui-row-"+$t.p.direction+" "+clid+"\"><td style=\"padding-left:"+(n.idx * 12) + "px;"+"\"";
				var grpTextStr = $.isFunction(grp.groupText[n.idx]) ?
						grp.groupText[n.idx].call($t, gv, n.cnt, n.summary) :
						$.jgrid.template(grp.groupText[n.idx], gv, n.cnt, n.summary);
				if(typeof grpTextStr !== "string" && typeof grpTextStr !== "number") {
					grpTextStr = gv;
				}
				if(grp.groupSummaryPos[n.idx] === 'header')  {
					var mul = $t.p.multiselect ? " colspan=\"2\"" : "";
					str += mul +">"+icon+grpTextStr+"</td>";
					str += buildSummaryTd(i, 0, grp.groups, grp.groupColumnShow[n.idx] === false ? (mul ==="" ? 2 : 3) : ((mul ==="") ? 1 : 2) );
				} else {
					str += " colspan=\""+(grp.groupColumnShow[n.idx] === false ? colspans-1 : colspans)+"\"" +
						">"+icon+grpTextStr+"</td>";
				}
				str += "</tr>";
				var leaf = len-1 === n.idx; 
				if( leaf ) {
					var gg = grp.groups[i+1], kk, ik, offset = 0, sgr = n.startRow,
					end = gg !== undefined ?  gg.startRow : grp.groups[i].startRow + grp.groups[i].cnt;
					if(grp._locgr) {
						offset = (page-1)*rn;
						if(offset > n.startRow) {
							sgr = offset;
						}
					}
					for(kk=sgr;kk<end;kk++) {
						if(!grdata[kk - offset]) { break; }
						str += grdata[kk - offset].join('');
					}
					if(grp.groupSummaryPos[n.idx] !== 'header') {
						var jj, hhdr;
						if (gg !== undefined) {
							for (jj = 0; jj < grp.groupField.length; jj++) {
								if (gg.dataIndex === grp.groupField[jj]) {
									break;
								}
							}
							toEnd = grp.groupField.length - jj;
						}
						for (ik = 0; ik < toEnd; ik++) {
							if(!sumreverse[ik]) { continue; }
							hhdr = "";
							if(grp.groupCollapse && !grp.showSummaryOnHide) {
								hhdr = " style=\"display:none;\"";
							}
							str += "<tr"+hhdr+" data-jqfootlevel=\""+(n.idx-ik)+"\" role=\"row\" class=\"ui-widget-content jqfoot ui-row-"+$t.p.direction+"\">";
							str += buildSummaryTd(i, ik, grp.groups, 0);
							str += "</tr>";
						}
						toEnd = jj;
					}
				}
			});
			$("#"+$.jgrid.jqID($t.p.id)+" tbody:first").append(str);
			// free up memory
			str = null;
		});
	},
	groupingGroupBy : function (name, options ) {
		return this.each(function(){
			var $t = this;
			if(typeof name === "string") {
				name = [name];
			}
			var grp = $t.p.groupingView;
			$t.p.grouping = true;
			grp._locgr = false;
			//Set default, in case visibilityOnNextGrouping is undefined 
			if (grp.visibiltyOnNextGrouping === undefined) {
				grp.visibiltyOnNextGrouping = [];
			}
			var i;
			// show previous hidden groups if they are hidden and weren't removed yet
			for(i=0;i<grp.groupField.length;i++) {
				if(!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
				$($t).jqGrid('showCol',grp.groupField[i]);
				}
			}
			// set visibility status of current group columns on next grouping
			for(i=0;i<name.length;i++) {
				grp.visibiltyOnNextGrouping[i] = $("#"+$.jgrid.jqID($t.p.id)+"_"+$.jgrid.jqID(name[i])).is(":visible");
			}
			$t.p.groupingView = $.extend($t.p.groupingView, options || {});
			grp.groupField = name;
			$($t).trigger("reloadGrid");
		});
	},
	groupingRemove : function (current) {
		return this.each(function(){
			var $t = this;
			if(current === undefined) {
				current = true;
			}
			$t.p.grouping = false;
			if(current===true) {
				var grp = $t.p.groupingView, i;
				// show previous hidden groups if they are hidden and weren't removed yet
				for(i=0;i<grp.groupField.length;i++) {
				if (!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
						$($t).jqGrid('showCol', grp.groupField);
					}
				}
				$("tr.jqgroup, tr.jqfoot","#"+$.jgrid.jqID($t.p.id)+" tbody:first").remove();
				$("tr.jqgrow:hidden","#"+$.jgrid.jqID($t.p.id)+" tbody:first").show();
			} else {
				$($t).trigger("reloadGrid");
			}
		});
	},
	groupingCalculations : {
		handler: function(fn, v, field, round, roundType, rc) {
			var funcs = {
				sum: function() {
					return parseFloat(v||0) + parseFloat((rc[field]||0));
				},

				min: function() {
					if(v==="") {
						return parseFloat(rc[field]||0);
					}
					return Math.min(parseFloat(v),parseFloat(rc[field]||0));
				},

				max: function() {
					if(v==="") {
						return parseFloat(rc[field]||0);
					}
					return Math.max(parseFloat(v),parseFloat(rc[field]||0));
				},

				count: function() {
					if(v==="") {v=0;}
					if(rc.hasOwnProperty(field)) {
						return v+1;
					}
					return 0;
				},

				avg: function() {
					// the same as sum, but at end we divide it
					// so use sum instead of duplicating the code (?)
					return funcs.sum();
				}
			};

			if(!funcs[fn]) {
				throw ("jqGrid Grouping No such method: " + fn);
			}
			var res = funcs[fn]();

			if (round != null) {
				if (roundType === 'fixed') {
					res = res.toFixed(round);
				} else {
					var mul = Math.pow(10, round);
					res = Math.round(res * mul) / mul;
				}
			}

			return res;
		}	
	}
});
}(jQuery));
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*global jQuery, xmlJsonClass */
(function($){
/*
 * jqGrid extension for constructing Grid Data from external file
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/ 

"use strict";
    $.jgrid.extend({
        jqGridImport : function(o) {
            o = $.extend({
                imptype : "xml", // xml, json, xmlstring, jsonstring
                impstring: "",
                impurl: "",
                mtype: "GET",
                impData : {},
                xmlGrid :{
                    config : "roots>grid",
                    data: "roots>rows"
                },
                jsonGrid :{
                    config : "grid",
                    data: "data"
                },
                ajaxOptions :{}
            }, o || {});
            return this.each(function(){
                var $t = this;
                var xmlConvert = function (xml,o) {
                    var cnfg = $(o.xmlGrid.config,xml)[0];
                    var xmldata = $(o.xmlGrid.data,xml)[0], jstr, jstr1, key;
                    if(xmlJsonClass.xml2json && $.jgrid.parse) {
                        jstr = xmlJsonClass.xml2json(cnfg," ");
                        jstr = $.jgrid.parse(jstr);
                        for(key in jstr) {
                            if(jstr.hasOwnProperty(key)) {
                                jstr1=jstr[key];
                            }
                        }
                        if(xmldata) {
                        // save the datatype
                            var svdatatype = jstr.grid.datatype;
                            jstr.grid.datatype = 'xmlstring';
                            jstr.grid.datastr = xml;
                            $($t).jqGrid( jstr1 ).jqGrid("setGridParam",{datatype:svdatatype});
                        } else {
                            $($t).jqGrid( jstr1 );
                        }
                        jstr = null;jstr1=null;
                    } else {
                        alert("xml2json or parse are not present");
                    }
                };
                var jsonConvert = function (jsonstr,o){
                    if (jsonstr && typeof jsonstr === 'string') {
						var _jsonparse = false;
						if($.jgrid.useJSON) {
							$.jgrid.useJSON = false;
							_jsonparse = true;
						}
                        var json = $.jgrid.parse(jsonstr);
						if(_jsonparse) { $.jgrid.useJSON = true; }
                        var gprm = json[o.jsonGrid.config];
                        var jdata = json[o.jsonGrid.data];
                        if(jdata) {
                            var svdatatype = gprm.datatype;
                            gprm.datatype = 'jsonstring';
                            gprm.datastr = jdata;
                            $($t).jqGrid( gprm ).jqGrid("setGridParam",{datatype:svdatatype});
                        } else {
                            $($t).jqGrid( gprm );
                        }
                    }
                };
                switch (o.imptype){
                    case 'xml':
                        $.ajax($.extend({
                            url:o.impurl,
                            type:o.mtype,
                            data: o.impData,
                            dataType:"xml",
                            complete: function(xml,stat) {
                                if(stat === 'success') {
                                    xmlConvert(xml.responseXML,o);
                                    $($t).triggerHandler("jqGridImportComplete", [xml, o]);
                                    if($.isFunction(o.importComplete)) {
                                        o.importComplete(xml);
                                    }
                                }
                                xml=null;
                            }
                        }, o.ajaxOptions));
                        break;
                    case 'xmlstring' :
                        // we need to make just the conversion and use the same code as xml
                        if(o.impstring && typeof o.impstring === 'string') {
                            var xmld = $.parseXML(o.impstring);
                            if(xmld) {
                                xmlConvert(xmld,o);
                                $($t).triggerHandler("jqGridImportComplete", [xmld, o]);
                                if($.isFunction(o.importComplete)) {
                                    o.importComplete(xmld);
                                }
                                o.impstring = null;
                            }
                            xmld = null;
                        }
                        break;
                    case 'json':
                        $.ajax($.extend({
                            url:o.impurl,
                            type:o.mtype,
                            data: o.impData,
                            dataType:"json",
                            complete: function(json) {
                                try {
                                    jsonConvert(json.responseText,o );
                                    $($t).triggerHandler("jqGridImportComplete", [json, o]);
                                    if($.isFunction(o.importComplete)) {
                                        o.importComplete(json);
                                    }
                                } catch (ee){}
                                json=null;
                            }
                        }, o.ajaxOptions ));
                        break;
                    case 'jsonstring' :
                        if(o.impstring && typeof o.impstring === 'string') {
                            jsonConvert(o.impstring,o );
                            $($t).triggerHandler("jqGridImportComplete", [o.impstring, o]);
                            if($.isFunction(o.importComplete)) {
                                o.importComplete(o.impstring);
                            }
                            o.impstring = null;
                        }
                        break;
                }
            });
        },
        jqGridExport : function(o) {
            o = $.extend({
                exptype : "xmlstring",
                root: "grid",
                ident: "\t"
            }, o || {});
            var ret = null;
            this.each(function () {
                if(!this.grid) { return;}
                var key, gprm = $.extend(true, {},$(this).jqGrid("getGridParam"));
                // we need to check for:
                // 1.multiselect, 2.subgrid  3. treegrid and remove the unneded columns from colNames
                if(gprm.rownumbers) {
                    gprm.colNames.splice(0,1);
                    gprm.colModel.splice(0,1);
                }
                if(gprm.multiselect) {
                    gprm.colNames.splice(0,1);
                    gprm.colModel.splice(0,1);
                }
                if(gprm.subGrid) {
                    gprm.colNames.splice(0,1);
                    gprm.colModel.splice(0,1);
                }
                gprm.knv = null;
                if(gprm.treeGrid) {
                    for (key in gprm.treeReader) {
                        if(gprm.treeReader.hasOwnProperty(key)) {
                            gprm.colNames.splice(gprm.colNames.length-1);
                            gprm.colModel.splice(gprm.colModel.length-1);
                        }
                    }
                }
                switch (o.exptype) {
                    case 'xmlstring' :
                        ret = "<"+o.root+">"+xmlJsonClass.json2xml(gprm,o.ident)+"</"+o.root+">";
                        break;
                    case 'jsonstring' :
                        ret = "{"+ xmlJsonClass.toJson(gprm,o.root,o.ident,false)+"}";
                        if(gprm.postData.filters !== undefined) {
                            ret=ret.replace(/filters":"/,'filters":');
                            ret=ret.replace(/}]}"/,'}]}');
                        }
                        break;
                }
            });
            return ret;
        },
        excelExport : function(o) {
            o = $.extend({
                exptype : "remote",
                url : null,
                oper: "oper",
                tag: "excel",
                exportOptions : {}
            }, o || {});
            return this.each(function(){
                if(!this.grid) { return;}
                var url;
                if(o.exptype === "remote") {
                    var pdata = $.extend({},this.p.postData);
                    pdata[o.oper] = o.tag;
                    var params = jQuery.param(pdata);
                    if(o.url.indexOf("?") !== -1) { url = o.url+"&"+params; }
                    else { url = o.url+"?"+params; }
                    window.location = url;
                }
            });
        }
    });
})(jQuery);
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*global jQuery */
(function($){
/**
 * jqGrid extension for manipulating Grid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/ 
"use strict";
$.jgrid.inlineEdit = $.jgrid.inlineEdit || {};
$.jgrid.extend({
//Editing
	editRow : function(rowid,keys,oneditfunc,successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc) {
		// Compatible mode old versions
		var o={}, args = $.makeArray(arguments).slice(1);

		if( $.type(args[0]) === "object" ) {
			o = args[0];
		} else {
			if (keys !== undefined) { o.keys = keys; }
			if ($.isFunction(oneditfunc)) { o.oneditfunc = oneditfunc; }
			if ($.isFunction(successfunc)) { o.successfunc = successfunc; }
			if (url !== undefined) { o.url = url; }
			if (extraparam !== undefined) { o.extraparam = extraparam; }
			if ($.isFunction(aftersavefunc)) { o.aftersavefunc = aftersavefunc; }
			if ($.isFunction(errorfunc)) { o.errorfunc = errorfunc; }
			if ($.isFunction(afterrestorefunc)) { o.afterrestorefunc = afterrestorefunc; }
			// last two not as param, but as object (sorry)
			//if (restoreAfterError !== undefined) { o.restoreAfterError = restoreAfterError; }
			//if (mtype !== undefined) { o.mtype = mtype || "POST"; }			
		}
		o = $.extend(true, {
			keys : false,
			oneditfunc: null,
			successfunc: null,
			url: null,
			extraparam: {},
			aftersavefunc: null,
			errorfunc: null,
			afterrestorefunc: null,
			restoreAfterError: true,
			mtype: "POST",
			focusField : true
		}, $.jgrid.inlineEdit, o );

		// End compatible
		return this.each(function(){
			var $t = this, nm, tmp, editable, cnt=0, focus=null, svr={}, ind,cm, bfer;
			if (!$t.grid ) { return; }
			ind = $($t).jqGrid("getInd",rowid,true);
			if( ind === false ) {return;}
			bfer = $.isFunction( o.beforeEditRow ) ? o.beforeEditRow.call($t,o, rowid) :  undefined;
			if( bfer === undefined ) {
				bfer = true;
			}
			if(!bfer) { return; }
			editable = $(ind).attr("editable") || "0";
			if (editable === "0" && !$(ind).hasClass("not-editable-row")) {
				cm = $t.p.colModel;
				$('td[role="gridcell"]',ind).each( function(i) {
					nm = cm[i].name;
					var treeg = $t.p.treeGrid===true && nm === $t.p.ExpandColumn;
					if(treeg) { tmp = $("span:first",this).html();}
					else {
						try {
							tmp = $.unformat.call($t,this,{rowId:rowid, colModel:cm[i]},i);
						} catch (_) {
							tmp =  ( cm[i].edittype && cm[i].edittype === 'textarea' ) ? $(this).text() : $(this).html();
						}
					}
					if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn') {
						if($t.p.autoencode) { tmp = $.jgrid.htmlDecode(tmp); }
						svr[nm]=tmp;
						if(cm[i].editable===true) {
							if(focus===null) { focus = i; }
							if (treeg) { $("span:first",this).html(""); }
							else { $(this).html(""); }
							var opt = $.extend({},cm[i].editoptions || {},{id:rowid+"_"+nm,name:nm,rowId:rowid});
							if(!cm[i].edittype) { cm[i].edittype = "text"; }
							if(tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length===1 && tmp.charCodeAt(0)===160) ) {tmp='';}
							var elc = $.jgrid.createEl.call($t,cm[i].edittype,opt,tmp,true,$.extend({},$.jgrid.ajaxOptions,$t.p.ajaxSelectOptions || {}));
							$(elc).addClass("editable");
							if(treeg) { $("span:first",this).append(elc); }
							else { $(this).append(elc); }
							$.jgrid.bindEv.call($t, elc, opt);
							//Again IE
							if(cm[i].edittype === "select" && cm[i].editoptions!==undefined && cm[i].editoptions.multiple===true  && cm[i].editoptions.dataUrl===undefined && $.jgrid.msie) {
								$(elc).width($(elc).width());
							}
							cnt++;
						}
					}
				});
				if(cnt > 0) {
					svr.id = rowid; $t.p.savedRow.push(svr);
					$(ind).attr("editable","1");
					if(o.focusField ) {
						if(typeof o.focusField === 'number' && parseInt(o.focusField,10) <= cm.length) {
							focus = o.focusField;
						}
						setTimeout(function(){ 
							var fe = $("td:eq("+focus+") :input:visible",ind).not(":disabled"); 
							if(fe.length > 0) {
								fe.focus();
							}
						},0);
					}
					if(o.keys===true) {
						$(ind).bind("keydown",function(e) {
							if (e.keyCode === 27) {
								$($t).jqGrid("restoreRow",rowid, o.afterrestorefunc);
								if($t.p._inlinenav) {
									try {
										$($t).jqGrid('showAddEditButtons');
									} catch (eer1) {}
								}
								return false;
							}
							if (e.keyCode === 13) {
								var ta = e.target;
								if(ta.tagName === 'TEXTAREA') { return true; }
								if( $($t).jqGrid("saveRow", rowid, o ) ) {
									if($t.p._inlinenav) {
										try {
											$($t).jqGrid('showAddEditButtons');
										} catch (eer2) {}
									}
								}
								return false;
							}
						});
					}
					$($t).triggerHandler("jqGridInlineEditRow", [rowid, o]);
					if( $.isFunction(o.oneditfunc)) { o.oneditfunc.call($t, rowid); }
				}
			}
		});
	},
	saveRow : function(rowid, successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc) {
		// Compatible mode old versions
		var args = $.makeArray(arguments).slice(1), o = {};

		if( $.type(args[0]) === "object" ) {
			o = args[0];
		} else {
			if ($.isFunction(successfunc)) { o.successfunc = successfunc; }
			if (url !== undefined) { o.url = url; }
			if (extraparam !== undefined) { o.extraparam = extraparam; }
			if ($.isFunction(aftersavefunc)) { o.aftersavefunc = aftersavefunc; }
			if ($.isFunction(errorfunc)) { o.errorfunc = errorfunc; }
			if ($.isFunction(afterrestorefunc)) { o.afterrestorefunc = afterrestorefunc; }
		}
		o = $.extend(true, {
			successfunc: null,
			url: null,
			extraparam: {},
			aftersavefunc: null,
			errorfunc: null,
			afterrestorefunc: null,
			restoreAfterError: true,
			mtype: "POST",
			saveui : "enable",
			savetext : $.jgrid.defaults.savetext || "Saving..."
		}, $.jgrid.inlineEdit, o );
		// End compatible

		var success = false;
		var $t = this[0], nm, tmp={}, tmp2={}, tmp3= {}, editable, fr, cv, ind;
		if (!$t.grid ) { return success; }
		ind = $($t).jqGrid("getInd",rowid,true);
		if(ind === false) {return success;}
		var bfsr = $.isFunction( o.beforeSaveRow ) ?	o.beforeSaveRow.call($t,o, rowid) :  undefined;
		if( bfsr === undefined ) {
			bfsr = true;
		}
		if(!bfsr) { return; }
		editable = $(ind).attr("editable");
		o.url = o.url || $t.p.editurl;
		if (editable==="1") {
			var cm;
			$('td[role="gridcell"]',ind).each(function(i) {
				cm = $t.p.colModel[i];
				nm = cm.name;
				if ( nm !== 'cb' && nm !== 'subgrid' && cm.editable===true && nm !== 'rn' && !$(this).hasClass('not-editable-cell')) {
					switch (cm.edittype) {
						case "checkbox":
							var cbv = ["Yes","No"];
							if(cm.editoptions ) {
								cbv = cm.editoptions.value.split(":");
							}
							tmp[nm]=  $("input",this).is(":checked") ? cbv[0] : cbv[1]; 
							break;
						case 'text':
						case 'password':
						case 'textarea':
						case "button" :
							tmp[nm]=$("input, textarea",this).val();
							break;
						case 'select':
							if(!cm.editoptions.multiple) {
								tmp[nm] = $("select option:selected",this).val();
								tmp2[nm] = $("select option:selected", this).text();
							} else {
								var sel = $("select",this), selectedText = [];
								tmp[nm] = $(sel).val();
								if(tmp[nm]) { tmp[nm]= tmp[nm].join(","); } else { tmp[nm] =""; }
								$("select option:selected",this).each(
									function(i,selected){
										selectedText[i] = $(selected).text();
									}
								);
								tmp2[nm] = selectedText.join(",");
							}
							if(cm.formatter && cm.formatter === 'select') { tmp2={}; }
							break;
						case 'custom' :
							try {
								if(cm.editoptions && $.isFunction(cm.editoptions.custom_value)) {
									tmp[nm] = cm.editoptions.custom_value.call($t, $(".customelement",this),'get');
									if (tmp[nm] === undefined) { throw "e2"; }
								} else { throw "e1"; }
							} catch (e) {
								if (e==="e1") { $.jgrid.info_dialog($.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.nodefined,$.jgrid.edit.bClose); }
								if (e==="e2") { $.jgrid.info_dialog($.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.novalue,$.jgrid.edit.bClose); }
								else { $.jgrid.info_dialog($.jgrid.errors.errcap,e.message,$.jgrid.edit.bClose); }
							}
							break;
					}
					cv = $.jgrid.checkValues.call($t,tmp[nm],i);
					if(cv[0] === false) {
						return false;
					}
					if($t.p.autoencode) { tmp[nm] = $.jgrid.htmlEncode(tmp[nm]); }
					if(o.url !== 'clientArray' && cm.editoptions && cm.editoptions.NullIfEmpty === true) {
						if(tmp[nm] === "") {
							tmp3[nm] = 'null';
						}
					}
				}
			});
			if (cv[0] === false){
				try {
					var tr = $($t).jqGrid('getGridRowById', rowid), positions = $.jgrid.findPos(tr);
					$.jgrid.info_dialog($.jgrid.errors.errcap,cv[1],$.jgrid.edit.bClose,{left:positions[0],top:positions[1]+$(tr).outerHeight()});
				} catch (e) {
					alert(cv[1]);
				}
				return success;
			}
			var idname, opers = $t.p.prmNames, oldRowId = rowid;
			if ($t.p.keyName === false) {
				idname = opers.id;
			} else {
				idname = $t.p.keyName;
			}
			if(tmp) {
				tmp[opers.oper] = opers.editoper;
				if (tmp[idname] === undefined || tmp[idname]==="") {
					tmp[idname] = rowid;
				} else if (ind.id !== $t.p.idPrefix + tmp[idname]) {
					// rename rowid
					var oldid = $.jgrid.stripPref($t.p.idPrefix, rowid);
					if ($t.p._index[oldid] !== undefined) {
						$t.p._index[tmp[idname]] = $t.p._index[oldid];
						delete $t.p._index[oldid];
					}
					rowid = $t.p.idPrefix + tmp[idname];
					$(ind).attr("id", rowid);
					if ($t.p.selrow === oldRowId) {
						$t.p.selrow = rowid;
					}
					if ($.isArray($t.p.selarrrow)) {
						var i = $.inArray(oldRowId, $t.p.selarrrow);
						if (i>=0) {
							$t.p.selarrrow[i] = rowid;
						}
					}
					if ($t.p.multiselect) {
						var newCboxId = "jqg_" + $t.p.id + "_" + rowid;
						$("input.cbox",ind)
							.attr("id", newCboxId)
							.attr("name", newCboxId);
					}
					// TODO: to test the case of frozen columns
				}
				if($t.p.inlineData === undefined) { $t.p.inlineData ={}; }
				tmp = $.extend({},tmp,$t.p.inlineData,o.extraparam);
			}
			if (o.url === 'clientArray') {
				tmp = $.extend({},tmp, tmp2);
				if($t.p.autoencode) {
					$.each(tmp,function(n,v){
						tmp[n] = $.jgrid.htmlDecode(v);
					});
				}
				var k, resp = $($t).jqGrid("setRowData",rowid,tmp);
				$(ind).attr("editable","0");
				for(k=0;k<$t.p.savedRow.length;k++) {
					if( String($t.p.savedRow[k].id) === String(oldRowId)) {fr = k; break;}
				}
				if(fr >= 0) { $t.p.savedRow.splice(fr,1); }
				$($t).triggerHandler("jqGridInlineAfterSaveRow", [rowid, resp, tmp, o]);
				if( $.isFunction(o.aftersavefunc) ) { o.aftersavefunc.call($t, rowid, resp, tmp, o); }
				success = true;
				$(ind).removeClass("jqgrid-new-row").unbind("keydown");
			} else {
				$($t).jqGrid("progressBar", {method:"show", loadtype : o.saveui, htmlcontent: o.savetext });
				tmp3 = $.extend({},tmp,tmp3);
				tmp3[idname] = $.jgrid.stripPref($t.p.idPrefix, tmp3[idname]);
				$.ajax($.extend({
					url:o.url,
					data: $.isFunction($t.p.serializeRowData) ? $t.p.serializeRowData.call($t, tmp3) : tmp3,
					type: o.mtype,
					async : false, //?!?
					complete: function(res,stat){
						$($t).jqGrid("progressBar", {method:"hide", loadtype : o.saveui, htmlcontent: o.savetext});
						if (stat === "success"){
							var ret = true, sucret, k;
							sucret = $($t).triggerHandler("jqGridInlineSuccessSaveRow", [res, rowid, o]);
							if (!$.isArray(sucret)) {sucret = [true, tmp];}
							if (sucret[0] && $.isFunction(o.successfunc)) {sucret = o.successfunc.call($t, res);}							
							if($.isArray(sucret)) {
								// expect array - status, data, rowid
								ret = sucret[0];
								tmp = sucret[1] || tmp;
							} else {
								ret = sucret;
							}
							if (ret===true) {
								if($t.p.autoencode) {
									$.each(tmp,function(n,v){
										tmp[n] = $.jgrid.htmlDecode(v);
									});
								}
								tmp = $.extend({},tmp, tmp2);
								$($t).jqGrid("setRowData",rowid,tmp);
								$(ind).attr("editable","0");
								for(k=0;k<$t.p.savedRow.length;k++) {
									if( String($t.p.savedRow[k].id) === String(rowid)) {fr = k; break;}
								}
								if(fr >= 0) { $t.p.savedRow.splice(fr,1); }
								$($t).triggerHandler("jqGridInlineAfterSaveRow", [rowid, res, tmp, o]);
								if( $.isFunction(o.aftersavefunc) ) { o.aftersavefunc.call($t, rowid, res, tmp, o); }
								success = true;
								$(ind).removeClass("jqgrid-new-row").unbind("keydown");
							} else {
								$($t).triggerHandler("jqGridInlineErrorSaveRow", [rowid, res, stat, null, o]);
								if($.isFunction(o.errorfunc) ) {
									o.errorfunc.call($t, rowid, res, stat, null);
								}
								if(o.restoreAfterError === true) {
									$($t).jqGrid("restoreRow",rowid, o.afterrestorefunc);
								}
							}
						}
					},
					error:function(res,stat,err){
						$("#lui_"+$.jgrid.jqID($t.p.id)).hide();
						$($t).triggerHandler("jqGridInlineErrorSaveRow", [rowid, res, stat, err, o]);
						if($.isFunction(o.errorfunc) ) {
							o.errorfunc.call($t, rowid, res, stat, err);
						} else {
							var rT = res.responseText || res.statusText;
							try {
								$.jgrid.info_dialog($.jgrid.errors.errcap,'<div class="ui-state-error">'+ rT +'</div>', $.jgrid.edit.bClose,{buttonalign:'right'});
							} catch(e) {
								alert(rT);
							}
						}
						if(o.restoreAfterError === true) {
							$($t).jqGrid("restoreRow",rowid, o.afterrestorefunc);
						}
					}
				}, $.jgrid.ajaxOptions, $t.p.ajaxRowOptions || {}));
			}
		}
		return success;
	},
	restoreRow : function(rowid, afterrestorefunc) {
		// Compatible mode old versions
		var args = $.makeArray(arguments).slice(1), o={};

		if( $.type(args[0]) === "object" ) {
			o = args[0];
		} else {
			if ($.isFunction(afterrestorefunc)) { o.afterrestorefunc = afterrestorefunc; }
		}
		o = $.extend(true, {}, $.jgrid.inlineEdit, o );

		// End compatible

		return this.each(function(){
			var $t= this, fr=-1, ind, ares={}, k;
			if (!$t.grid ) { return; }
			ind = $($t).jqGrid("getInd",rowid,true);
			if(ind === false) {return;}
			var bfcr = $.isFunction( o.beforeCancelRow ) ?	o.beforeCancelRow.call($t, o, rowid) :  undefined;
			if( bfcr === undefined ) {
				bfcr = true;
			}
			if(!bfcr) { return; }
			for(k=0;k<$t.p.savedRow.length;k++) {
				if( String($t.p.savedRow[k].id) === String(rowid)) {fr = k; break;}
			}
			if(fr >= 0) {
				if($.isFunction($.fn.datepicker)) {
					try {
						$("input.hasDatepicker","#"+$.jgrid.jqID(ind.id)).datepicker('hide');
					} catch (e) {}
				}
				$.each($t.p.colModel, function(){
					if(this.editable === true && $t.p.savedRow[fr].hasOwnProperty(this.name)) {
						ares[this.name] = $t.p.savedRow[fr][this.name];
					}
				});
				$($t).jqGrid("setRowData",rowid,ares);
				$(ind).attr("editable","0").unbind("keydown");
				$t.p.savedRow.splice(fr,1);
				if($("#"+$.jgrid.jqID(rowid), "#"+$.jgrid.jqID($t.p.id)).hasClass("jqgrid-new-row")){
					setTimeout(function(){
						$($t).jqGrid("delRowData",rowid);
						$($t).jqGrid('showAddEditButtons');
					},0);
				}
			}
			$($t).triggerHandler("jqGridInlineAfterRestoreRow", [rowid]);
			if ($.isFunction(o.afterrestorefunc))
			{
				o.afterrestorefunc.call($t, rowid);
			}
		});
	},
	addRow : function ( p ) {
		p = $.extend(true, {
			rowID : null,
			initdata : {},
			position :"first",
			useDefValues : true,
			useFormatter : false,
			addRowParams : {extraparam:{}}
		},p  || {});
		return this.each(function(){
			if (!this.grid ) { return; }
			var $t = this;
			var bfar = $.isFunction( p.beforeAddRow ) ?	p.beforeAddRow.call($t,p.addRowParams) :  undefined;
			if( bfar === undefined ) {
				bfar = true;
			}
			if(!bfar) { return; }
			p.rowID = $.isFunction(p.rowID) ? p.rowID.call($t, p) : ( (p.rowID != null) ? p.rowID : $.jgrid.randId());
			if(p.useDefValues === true) {
				$($t.p.colModel).each(function(){
					if( this.editoptions && this.editoptions.defaultValue ) {
						var opt = this.editoptions.defaultValue,
						tmp = $.isFunction(opt) ? opt.call($t) : opt;
						p.initdata[this.name] = tmp;
					}
				});
			}
			$($t).jqGrid('addRowData', p.rowID, p.initdata, p.position);
			p.rowID = $t.p.idPrefix + p.rowID;
			$("#"+$.jgrid.jqID(p.rowID), "#"+$.jgrid.jqID($t.p.id)).addClass("jqgrid-new-row");
			if(p.useFormatter) {
				$("#"+$.jgrid.jqID(p.rowID)+" .ui-inline-edit", "#"+$.jgrid.jqID($t.p.id)).click();
			} else {
				var opers = $t.p.prmNames,
				oper = opers.oper;
				p.addRowParams.extraparam[oper] = opers.addoper;
				$($t).jqGrid('editRow', p.rowID, p.addRowParams);
				$($t).jqGrid('setSelection', p.rowID);
			}
		});
	},
	inlineNav : function (elem, o) {
		o = $.extend(true,{
			edit: true,
			editicon: "ui-icon-pencil",
			add: true,
			addicon:"ui-icon-plus",
			save: true,
			saveicon:"ui-icon-disk",
			cancel: true,
			cancelicon:"ui-icon-cancel",
			addParams : {addRowParams: {extraparam: {}}},
			editParams : {},
			restoreAfterSelect : true
		}, $.jgrid.nav, o ||{});
		return this.each(function(){
			if (!this.grid ) { return; }
			var $t = this, onSelect, gID = $.jgrid.jqID($t.p.id);
			$t.p._inlinenav = true;
			// detect the formatactions column
			if(o.addParams.useFormatter === true) {
				var cm = $t.p.colModel,i;
				for (i = 0; i<cm.length; i++) {
					if(cm[i].formatter && cm[i].formatter === "actions" ) {
						if(cm[i].formatoptions) {
							var defaults =  {
								keys:false,
								onEdit : null,
								onSuccess: null,
								afterSave:null,
								onError: null,
								afterRestore: null,
								extraparam: {},
								url: null
							},
							ap = $.extend( defaults, cm[i].formatoptions );
							o.addParams.addRowParams = {
								"keys" : ap.keys,
								"oneditfunc" : ap.onEdit,
								"successfunc" : ap.onSuccess,
								"url" : ap.url,
								"extraparam" : ap.extraparam,
								"aftersavefunc" : ap.afterSave,
								"errorfunc": ap.onError,
								"afterrestorefunc" : ap.afterRestore
							};
						}
						break;
					}
				}
			}
			if(o.add) {
				$($t).jqGrid('navButtonAdd', elem,{
					caption : o.addtext,
					title : o.addtitle,
					buttonicon : o.addicon,
					id : $t.p.id+"_iladd",
					onClickButton : function () {
						$($t).jqGrid('addRow', o.addParams);
						if(!o.addParams.useFormatter) {
							$("#"+gID+"_ilsave").removeClass('ui-state-disabled');
							$("#"+gID+"_ilcancel").removeClass('ui-state-disabled');
							$("#"+gID+"_iladd").addClass('ui-state-disabled');
							$("#"+gID+"_iledit").addClass('ui-state-disabled');
						}
					}
				});
			}
			if(o.edit) {
				$($t).jqGrid('navButtonAdd', elem,{
					caption : o.edittext,
					title : o.edittitle,
					buttonicon : o.editicon,
					id : $t.p.id+"_iledit",
					onClickButton : function () {
						var sr = $($t).jqGrid('getGridParam','selrow');
						if(sr) {
							$($t).jqGrid('editRow', sr, o.editParams);
							$("#"+gID+"_ilsave").removeClass('ui-state-disabled');
							$("#"+gID+"_ilcancel").removeClass('ui-state-disabled');
							$("#"+gID+"_iladd").addClass('ui-state-disabled');
							$("#"+gID+"_iledit").addClass('ui-state-disabled');
						} else {
							$.jgrid.viewModal("#alertmod",{gbox:"#gbox_"+gID,jqm:true});$("#jqg_alrt").focus();							
						}
					}
				});
			}
			if(o.save) {
				$($t).jqGrid('navButtonAdd', elem,{
					caption : o.savetext || '',
					title : o.savetitle || 'Save row',
					buttonicon : o.saveicon,
					id : $t.p.id+"_ilsave",
					onClickButton : function () {
						var sr = $t.p.savedRow[0].id;
						if(sr) {
							var opers = $t.p.prmNames,
							oper = opers.oper, tmpParams = o.editParams;
							if($("#"+$.jgrid.jqID(sr), "#"+gID ).hasClass("jqgrid-new-row")) {
								o.addParams.addRowParams.extraparam[oper] = opers.addoper;
								tmpParams = o.addParams.addRowParams;
							} else {
								if(!o.editParams.extraparam) {
									o.editParams.extraparam = {};
								}
								o.editParams.extraparam[oper] = opers.editoper;
							}
							if( $($t).jqGrid('saveRow', sr, tmpParams) ) {
								$($t).jqGrid('showAddEditButtons');
							}
						} else {
							$.jgrid.viewModal("#alertmod",{gbox:"#gbox_"+gID,jqm:true});$("#jqg_alrt").focus();							
						}
					}
				});
				$("#"+gID+"_ilsave").addClass('ui-state-disabled');
			}
			if(o.cancel) {
				$($t).jqGrid('navButtonAdd', elem,{
					caption : o.canceltext || '',
					title : o.canceltitle || 'Cancel row editing',
					buttonicon : o.cancelicon,
					id : $t.p.id+"_ilcancel",
					onClickButton : function () {
						var sr = $t.p.savedRow[0].id, cancelPrm = o.editParams;
						if(sr) {
							if($("#"+$.jgrid.jqID(sr), "#"+gID ).hasClass("jqgrid-new-row")) {
								cancelPrm = o.addParams.addRowParams;
							}
							$($t).jqGrid('restoreRow', sr, cancelPrm);
							$($t).jqGrid('showAddEditButtons');
						} else {
							$.jgrid.viewModal("#alertmod",{gbox:"#gbox_"+gID,jqm:true});$("#jqg_alrt").focus();							
						}
					}
				});
				$("#"+gID+"_ilcancel").addClass('ui-state-disabled');
			}
			if(o.restoreAfterSelect === true) {
				if($.isFunction($t.p.beforeSelectRow)) {
					onSelect = $t.p.beforeSelectRow;
				} else {
					onSelect =  false;
				}
				$t.p.beforeSelectRow = function(id, stat) {
					var ret = true;
					if($t.p.savedRow.length > 0 && $t.p._inlinenav===true && ( id !== $t.p.selrow && $t.p.selrow !==null) ) {
						if($t.p.selrow === o.addParams.rowID ) {
							$($t).jqGrid('delRowData', $t.p.selrow);
						} else {
							$($t).jqGrid('restoreRow', $t.p.selrow, o.editParams);
						}
						$($t).jqGrid('showAddEditButtons');
					}
					if(onSelect) {
						ret = onSelect.call($t, id, stat);
					}
					return ret;
				};
			}

		});
	},
	showAddEditButtons : function()  {
		return this.each(function(){
			if (!this.grid ) { return; }
			var gID = $.jgrid.jqID(this.p.id);
			$("#"+gID+"_ilsave").addClass('ui-state-disabled');
			$("#"+gID+"_ilcancel").addClass('ui-state-disabled');
			$("#"+gID+"_iladd").removeClass('ui-state-disabled');
			$("#"+gID+"_iledit").removeClass('ui-state-disabled');
		});
	}
//end inline edit
});
})(jQuery);
/*jshint evil:true, eqeqeq:false, eqnull:true, devel:true */
/*global jQuery */
(function($){
/*
**
 * jqGrid addons using jQuery UI 
 * Author: Mark Williams
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * depends on jQuery UI 
**/
"use strict";
if ($.jgrid.msie && $.jgrid.msiever()===8) {
	$.expr[":"].hidden = function(elem) {
		return elem.offsetWidth === 0 || elem.offsetHeight === 0 ||
			elem.style.display === "none";
	};
}
// requiere load multiselect before grid
$.jgrid._multiselect = false;
if($.ui) {
	if ($.ui.multiselect ) {
		if($.ui.multiselect.prototype._setSelected) {
			var setSelected = $.ui.multiselect.prototype._setSelected;
			$.ui.multiselect.prototype._setSelected = function(item,selected) {
				var ret = setSelected.call(this,item,selected);
				if (selected && this.selectedList) {
					var elt = this.element;
					this.selectedList.find('li').each(function() {
						if ($(this).data('optionLink')) {
							$(this).data('optionLink').remove().appendTo(elt);
						}
					});
				}
				return ret;
			};
		}
		if($.ui.multiselect.prototype.destroy) {
			$.ui.multiselect.prototype.destroy = function() {
				this.element.show();
				this.container.remove();
				if ($.Widget === undefined) {
					$.widget.prototype.destroy.apply(this, arguments);
				} else {
					$.Widget.prototype.destroy.apply(this, arguments);
				}
			};
		}
		$.jgrid._multiselect = true;
	}
}
        
$.jgrid.extend({
	sortableColumns : function (tblrow)
	{
		return this.each(function (){
			var ts = this, tid= $.jgrid.jqID( ts.p.id );
			function start() {ts.p.disableClick = true;}
			var sortable_opts = {
				"tolerance" : "pointer",
				"axis" : "x",
				"scrollSensitivity": "1",
				"items": '>th:not(:has(#jqgh_'+tid+'_cb'+',#jqgh_'+tid+'_rn'+',#jqgh_'+tid+'_subgrid),:hidden)',
				"placeholder": {
					element: function(item) {
						var el = $(document.createElement(item[0].nodeName))
						.addClass(item[0].className+" ui-sortable-placeholder ui-state-highlight")
						.removeClass("ui-sortable-helper")[0];
						return el;
					},
					update: function(self, p) {
						p.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css('paddingTop')||0, 10) - parseInt(self.currentItem.css('paddingBottom')||0, 10));
						p.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css('paddingLeft')||0, 10) - parseInt(self.currentItem.css('paddingRight')||0, 10));
					}
				},
				"update": function(event, ui) {
					var p = $(ui.item).parent(),
					th = $(">th", p),
					colModel = ts.p.colModel,
					cmMap = {}, tid= ts.p.id+"_";
					$.each(colModel, function(i) { cmMap[this.name]=i; });
					var permutation = [];
					th.each(function() {
						var id = $(">div", this).get(0).id.replace(/^jqgh_/, "").replace(tid,"");
							if (cmMap.hasOwnProperty(id)) {
								permutation.push(cmMap[id]);
							}
					});
	
					$(ts).jqGrid("remapColumns",permutation, true, true);
					if ($.isFunction(ts.p.sortable.update)) {
						ts.p.sortable.update(permutation);
					}
					setTimeout(function(){ts.p.disableClick=false;}, 50);
				}
			};
			if (ts.p.sortable.options) {
				$.extend(sortable_opts, ts.p.sortable.options);
			} else if ($.isFunction(ts.p.sortable)) {
				ts.p.sortable = { "update" : ts.p.sortable };
			}
			if (sortable_opts.start) {
				var s = sortable_opts.start;
				sortable_opts.start = function(e,ui) {
					start();
					s.call(this,e,ui);
				};
			} else {
				sortable_opts.start = start;
			}
			if (ts.p.sortable.exclude) {
				sortable_opts.items += ":not("+ts.p.sortable.exclude+")";
			}
			var $e = tblrow.sortable(sortable_opts), dataObj = $e.data("sortable") || $e.data("uiSortable");
			if (dataObj != null) {
				dataObj.data("sortable").floating = true;
			}
		});
	},
    columnChooser : function(opts) {
		var self = this, selector, select, colMap = {}, fixedCols = [], dopts, mopts, $dialogContent, multiselectData, listHeight,
			colModel = self.jqGrid("getGridParam", "colModel"),
			colNames = self.jqGrid("getGridParam", "colNames"),
			getMultiselectWidgetData = function ($elem) {
				return ($.ui.multiselect.prototype && $elem.data($.ui.multiselect.prototype.widgetFullName || $.ui.multiselect.prototype.widgetName)) ||
					$elem.data("ui-multiselect") || $elem.data("multiselect");
			};

		if ($("#colchooser_" + $.jgrid.jqID(self[0].p.id)).length) { return; }
		selector = $('<div id="colchooser_'+self[0].p.id+'" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>');
		select = $('select', selector);

		function insert(perm,i,v) {
			var a, b;
			if(i>=0){
				a = perm.slice();
				b = a.splice(i,Math.max(perm.length-i,i));
				if(i>perm.length) { i = perm.length; }
				a[i] = v;
				return a.concat(b);
			}
			return perm;
		}
		function call(fn, obj) {
			if (!fn) { return; }
			if (typeof fn === 'string') {
				if ($.fn[fn]) {
					$.fn[fn].apply(obj, $.makeArray(arguments).slice(2));
				}
			} else if ($.isFunction(fn)) {
				fn.apply(obj, $.makeArray(arguments).slice(2));
			}
		}

		opts = $.extend({
			width : 400,
			height : 240,
			classname : null,
			done : function(perm) { if (perm) { self.jqGrid("remapColumns", perm, true); } },
			/* msel is either the name of a ui widget class that
			   extends a multiselect, or a function that supports
			   creating a multiselect object (with no argument,
			   or when passed an object), and destroying it (when
			   passed the string "destroy"). */
			msel : "multiselect",
			/* "msel_opts" : {}, */

			/* dlog is either the name of a ui widget class that 
			   behaves in a dialog-like way, or a function, that
			   supports creating a dialog (when passed dlog_opts)
			   or destroying a dialog (when passed the string
			   "destroy")
			   */
			dlog : "dialog",
			dialog_opts : {
				minWidth: 470,
				dialogClass: "ui-jqdialog"
			},
			/* dlog_opts is either an option object to be passed 
			   to "dlog", or (more likely) a function that creates
			   the options object.
			   The default produces a suitable options object for
			   ui.dialog */
			dlog_opts : function(options) {
				var buttons = {};
				buttons[options.bSubmit] = function() {
					options.apply_perm();
					options.cleanup(false);
				};
				buttons[options.bCancel] = function() {
					options.cleanup(true);
				};
				return $.extend(true, {
					buttons: buttons,
					close: function() {
						options.cleanup(true);
					},
					modal: options.modal || false,
					resizable: options.resizable || true,
					width: options.width + 70,
					resize: function () {
						var widgetData = getMultiselectWidgetData(select),
							$thisDialogContent = widgetData.container.closest(".ui-dialog-content");

						if ($thisDialogContent.length > 0 && typeof $thisDialogContent[0].style === "object") {
							$thisDialogContent[0].style.width = "";
						} else {
							$thisDialogContent.css("width", ""); // or just remove width style
						}

						widgetData.selectedList.height(Math.max(widgetData.selectedContainer.height() - widgetData.selectedActions.outerHeight() - 1, 1));
						widgetData.availableList.height(Math.max(widgetData.availableContainer.height() - widgetData.availableActions.outerHeight() - 1, 1));
					}
				}, options.dialog_opts || {});
			},
			/* Function to get the permutation array, and pass it to the
			   "done" function */
			apply_perm : function() {
				var perm = [];
				$('option',select).each(function() {
					if ($(this).is("[selected]")) {
						self.jqGrid("showCol", colModel[this.value].name);
					} else {
						self.jqGrid("hideCol", colModel[this.value].name);
					}
				});
				
				//fixedCols.slice(0);
				$('option[selected]',select).each(function() { perm.push(parseInt(this.value,10)); });
				$.each(perm, function() { delete colMap[colModel[parseInt(this,10)].name]; });
				$.each(colMap, function() {
					var ti = parseInt(this,10);
					perm = insert(perm,ti,ti);
				});
				if (opts.done) {
					opts.done.call(self, perm);
				}
				self.jqGrid("setGridWidth", self[0].p.tblwidth, self[0].p.shrinkToFit);
			},
			/* Function to cleanup the dialog, and select. Also calls the
			   done function with no permutation (to indicate that the
			   columnChooser was aborted */
			cleanup : function(calldone) {
				call(opts.dlog, selector, 'destroy');
				call(opts.msel, select, 'destroy');
				selector.remove();
				if (calldone && opts.done) {
					opts.done.call(self);
				}
			},
			msel_opts : {}
		}, $.jgrid.col, opts || {});
		if($.ui) {
			if ($.ui.multiselect && $.ui.multiselect.defaults) {
				if (!$.jgrid._multiselect) {
					// should be in language file
					alert("Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!");
					return;
				}
				// ??? the next line uses $.ui.multiselect.defaults which will be typically undefined
				opts.msel_opts = $.extend($.ui.multiselect.defaults, opts.msel_opts);
			}
		}
		if (opts.caption) {
			selector.attr("title", opts.caption);
		}
		if (opts.classname) {
			selector.addClass(opts.classname);
			select.addClass(opts.classname);
		}
		if (opts.width) {
			$(">div",selector).css({width: opts.width,margin:"0 auto"});
			select.css("width", opts.width);
		}
		if (opts.height) {
			$(">div",selector).css("height", opts.height);
			select.css("height", opts.height - 10);
		}

		select.empty();
		$.each(colModel, function(i) {
			colMap[this.name] = i;
			if (this.hidedlg) {
				if (!this.hidden) {
					fixedCols.push(i);
				}
				return;
			}

			select.append("<option value='"+i+"' "+
						  (this.hidden?"":"selected='selected'")+">"+$.jgrid.stripHtml(colNames[i])+"</option>");
		});

		dopts = $.isFunction(opts.dlog_opts) ? opts.dlog_opts.call(self, opts) : opts.dlog_opts;
		call(opts.dlog, selector, dopts);
		mopts = $.isFunction(opts.msel_opts) ? opts.msel_opts.call(self, opts) : opts.msel_opts;
		call(opts.msel, select, mopts);

		// fix height of elements of the multiselect widget
		$dialogContent = $("#colchooser_" + $.jgrid.jqID(self[0].p.id));

		$dialogContent.css({ margin: "auto" });
		$dialogContent.find(">div").css({ width: "100%", height: "100%", margin: "auto" });

		multiselectData = getMultiselectWidgetData(select);
		multiselectData.container.css({ width: "100%", height: "100%", margin: "auto" });

		multiselectData.selectedContainer.css({ width: multiselectData.options.dividerLocation * 100 + "%", height: "100%", margin: "auto", boxSizing: "border-box" });
		multiselectData.availableContainer.css({ width: (100 - multiselectData.options.dividerLocation * 100) + "%", height: "100%", margin: "auto", boxSizing: "border-box" });

		// set height for both selectedList and availableList
		multiselectData.selectedList.css("height", "auto");
		multiselectData.availableList.css("height", "auto");
		listHeight = Math.max(multiselectData.selectedList.height(), multiselectData.availableList.height());
		listHeight = Math.min(listHeight, $(window).height());
		multiselectData.selectedList.css("height", listHeight);
		multiselectData.availableList.css("height", listHeight);
	},
	sortableRows : function (opts) {
		// Can accept all sortable options and events
		return this.each(function(){
			var $t = this;
			if(!$t.grid) { return; }
			// Currently we disable a treeGrid sortable
			if($t.p.treeGrid) { return; }
			if($.fn.sortable) {
				opts = $.extend({
					"cursor":"move",
					"axis" : "y",
					"items": ">.jqgrow"
					},
				opts || {});
				if(opts.start && $.isFunction(opts.start)) {
					opts._start_ = opts.start;
					delete opts.start;
				} else {opts._start_=false;}
				if(opts.update && $.isFunction(opts.update)) {
					opts._update_ = opts.update;
					delete opts.update;
				} else {opts._update_ = false;}
				opts.start = function(ev,ui) {
					$(ui.item).css("border-width","0");
					$("td",ui.item).each(function(i){
						this.style.width = $t.grid.cols[i].style.width;
					});
					if($t.p.subGrid) {
						var subgid = $(ui.item).attr("id");
						try {
							$($t).jqGrid('collapseSubGridRow',subgid);
						} catch (e) {}
					}
					if(opts._start_) {
						opts._start_.apply(this,[ev,ui]);
					}
				};
				opts.update = function (ev,ui) {
					$(ui.item).css("border-width","");
					if($t.p.rownumbers === true) {
						$("td.jqgrid-rownum",$t.rows).each(function( i ){
							$(this).html( i+1+(parseInt($t.p.page,10)-1)*parseInt($t.p.rowNum,10) );
						});
					}
					if(opts._update_) {
						opts._update_.apply(this,[ev,ui]);
					}
				};
				$("tbody:first",$t).sortable(opts);
				if ($.isFunction($.fn.disableSelection)) {
					// The method disableSelection exists starting with jQuery UI 1.6,
					// but it's declared as deprecated since jQuery UI 1.9
					// see http://jqueryui.com/upgrade-guide/1.9/#deprecated-disableselection-and-enableselection
					// so we use disableSelection only if it exists
					$("tbody:first>.jqgrow",$t).disableSelection();
				}
			}
		});
	},
	gridDnD : function(opts) {
		return this.each(function(){
		var $t = this, i, cn;
		if(!$t.grid) { return; }
		// Currently we disable a treeGrid drag and drop
		if($t.p.treeGrid) { return; }
		if(!$.fn.draggable || !$.fn.droppable) { return; }
		function updateDnD ()
		{
			var datadnd = $.data($t,"dnd");
			$("tr.jqgrow:not(.ui-draggable)",$t).draggable($.isFunction(datadnd.drag) ? datadnd.drag.call($($t),datadnd) : datadnd.drag);
		}
		var appender = "<table id='jqgrid_dnd' class='ui-jqgrid-dnd'></table>";
		if($("#jqgrid_dnd")[0] === undefined) {
			$('body').append(appender);
		}

		if(typeof opts === 'string' && opts === 'updateDnD' && $t.p.jqgdnd===true) {
			updateDnD();
			return;
		}
		opts = $.extend({
			"drag" : function (opts) {
				return $.extend({
					start : function (ev, ui) {
						var i, subgid;
						// if we are in subgrid mode try to collapse the node
						if($t.p.subGrid) {
							subgid = $(ui.helper).attr("id");
							try {
								$($t).jqGrid('collapseSubGridRow',subgid);
							} catch (e) {}
						}
						// hack
						// drag and drop does not insert tr in table, when the table has no rows
						// we try to insert new empty row on the target(s)
						for (i=0;i<$.data($t,"dnd").connectWith.length;i++){
							if($($.data($t,"dnd").connectWith[i]).jqGrid('getGridParam','reccount') === 0 ){
								$($.data($t,"dnd").connectWith[i]).jqGrid('addRowData','jqg_empty_row',{});
							}
						}
						ui.helper.addClass("ui-state-highlight");
						$("td",ui.helper).each(function(i) {
							this.style.width = $t.grid.headers[i].width+"px";
						});
						if(opts.onstart && $.isFunction(opts.onstart) ) { opts.onstart.call($($t),ev,ui); }
					},
					stop :function(ev,ui) {
						var i, ids;
						if(ui.helper.dropped && !opts.dragcopy) {
							ids = $(ui.helper).attr("id");
							if(ids === undefined) { ids = $(this).attr("id"); }
							$($t).jqGrid('delRowData',ids );
						}
						// if we have a empty row inserted from start event try to delete it
						for (i=0;i<$.data($t,"dnd").connectWith.length;i++){
							$($.data($t,"dnd").connectWith[i]).jqGrid('delRowData','jqg_empty_row');
						}
						if(opts.onstop && $.isFunction(opts.onstop) ) { opts.onstop.call($($t),ev,ui); }
					}
				},opts.drag_opts || {});
			},
			"drop" : function (opts) {
				return $.extend({
					accept: function(d) {
						if (!$(d).hasClass('jqgrow')) { return d;}
						var tid = $(d).closest("table.ui-jqgrid-btable");
						if(tid.length > 0 && $.data(tid[0],"dnd") !== undefined) {
							var cn = $.data(tid[0],"dnd").connectWith;
							return $.inArray('#'+$.jgrid.jqID(this.id),cn) !== -1 ? true : false;
						}
						return false;
					},
					drop: function(ev, ui) {
						if (!$(ui.draggable).hasClass('jqgrow')) { return; }
						var accept = $(ui.draggable).attr("id");
						var getdata = ui.draggable.parent().parent().jqGrid('getRowData',accept);
						if(!opts.dropbyname) {
							var j =0, tmpdata = {}, nm, key;
							var dropmodel = $("#"+$.jgrid.jqID(this.id)).jqGrid('getGridParam','colModel');
							try {
								for (key in getdata) {
									if (getdata.hasOwnProperty(key)) {
									nm = dropmodel[j].name;
									if( !(nm === 'cb' || nm === 'rn' || nm === 'subgrid' )) {
										if(getdata.hasOwnProperty(key) && dropmodel[j]) {
											tmpdata[nm] = getdata[key];
										}
									}
									j++;
								}
								}
								getdata = tmpdata;
							} catch (e) {}
						}
						ui.helper.dropped = true;
						if(opts.beforedrop && $.isFunction(opts.beforedrop) ) {
							//parameters to this callback - event, element, data to be inserted, sender, reciever
							// should return object which will be inserted into the reciever
							var datatoinsert = opts.beforedrop.call(this,ev,ui,getdata,$('#'+$.jgrid.jqID($t.p.id)),$(this));
							if (datatoinsert !== undefined && datatoinsert !== null && typeof datatoinsert === "object") { getdata = datatoinsert; }
						}
						if(ui.helper.dropped) {
							var grid;
							if(opts.autoid) {
								if($.isFunction(opts.autoid)) {
									grid = opts.autoid.call(this,getdata);
								} else {
									grid = Math.ceil(Math.random()*1000);
									grid = opts.autoidprefix+grid;
								}
							}
							// NULL is interpreted as undefined while null as object
							$("#"+$.jgrid.jqID(this.id)).jqGrid('addRowData',grid,getdata,opts.droppos);
						}
						if(opts.ondrop && $.isFunction(opts.ondrop) ) { opts.ondrop.call(this,ev,ui, getdata); }
					}}, opts.drop_opts || {});
			},
			"onstart" : null,
			"onstop" : null,
			"beforedrop": null,
			"ondrop" : null,
			"drop_opts" : {
				"activeClass": "ui-state-active",
				"hoverClass": "ui-state-hover"
			},
			"drag_opts" : {
				"revert": "invalid",
				"helper": "clone",
				"cursor": "move",
				"appendTo" : "#jqgrid_dnd",
				"zIndex": 5000
			},
			"dragcopy": false,
			"dropbyname" : false,
			"droppos" : "first",
			"autoid" : true,
			"autoidprefix" : "dnd_"
		}, opts || {});
		
		if(!opts.connectWith) { return; }
		opts.connectWith = opts.connectWith.split(",");
		opts.connectWith = $.map(opts.connectWith,function(n){return $.trim(n);});
		$.data($t,"dnd",opts);
		
		if($t.p.reccount !== 0 && !$t.p.jqgdnd) {
			updateDnD();
		}
		$t.p.jqgdnd = true;
		for (i=0;i<opts.connectWith.length;i++){
			cn =opts.connectWith[i];
			$(cn).droppable($.isFunction(opts.drop) ? opts.drop.call($($t),opts) : opts.drop);
		}
		});
	},
	gridResize : function(opts) {
		return this.each(function(){
			var $t = this, gID = $.jgrid.jqID($t.p.id);
			if(!$t.grid || !$.fn.resizable) { return; }
			opts = $.extend({}, opts || {});
			if(opts.alsoResize ) {
				opts._alsoResize_ = opts.alsoResize;
				delete opts.alsoResize;
			} else {
				opts._alsoResize_ = false;
			}
			if(opts.stop && $.isFunction(opts.stop)) {
				opts._stop_ = opts.stop;
				delete opts.stop;
			} else {
				opts._stop_ = false;
			}
			opts.stop = function (ev, ui) {
				$($t).jqGrid('setGridParam',{height:$("#gview_"+gID+" .ui-jqgrid-bdiv").height()});
				$($t).jqGrid('setGridWidth',ui.size.width,opts.shrinkToFit);
				if(opts._stop_) { opts._stop_.call($t,ev,ui); }
			};
			if(opts._alsoResize_) {
				var optstest = "{\'#gview_"+gID+" .ui-jqgrid-bdiv\':true,'" +opts._alsoResize_+"':true}";
				opts.alsoResize = eval('('+optstest+')'); // the only way that I found to do this
			} else {
				opts.alsoResize = $(".ui-jqgrid-bdiv","#gview_"+gID);
			}
			delete opts._alsoResize_;
			$("#gbox_"+gID).resizable(opts);
		});
	}
});
})(jQuery);
/*jshint eqeqeq:false */
/*global jQuery */
(function($){
/**
 * jqGrid pivot functions
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
*/
"use strict";
// To optimize the search we need custom array filter
// This code is taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

function _pivotfilter (fn, context) {
	var i,
		value,
		result = [],
		length;

	if (!this || typeof fn !== 'function' || (fn instanceof RegExp)) {
		throw new TypeError();
	}

	length = this.length;

	for (i = 0; i < length; i++) {
		if (this.hasOwnProperty(i)) {
			value = this[i];
			if (fn.call(context, value, i, this)) {
				result.push(value);
				// We need break in order to cancel loop 
				// in case the row is found
				break;
			}
		}
	}
	return result;
}
$.assocArraySize = function(obj) {
    // http://stackoverflow.com/a/6700/11236
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
        	size++;
        }
    }
    return size;
};

$.jgrid.extend({
	pivotSetup : function( data, options ){
		// data should come in json format
		// The function return the new colModel and the transformed data
		// again with group setup options which then will be passed to the grid
		var columns =[],
		pivotrows =[],
		summaries = [],
		member=[],
		labels=[],
		groupOptions = {
			grouping : true,
			groupingView :  {
				groupField : [],
				groupSummary: [],
				groupSummaryPos:[]
			}
		},
		headers = [],
		o = $.extend ( {
			rowTotals : false,
			rowTotalsText : 'Total',
			// summary columns
			colTotals : false,
			groupSummary : true,
			groupSummaryPos :  'header',
			frozenStaticCols : false
		}, options || {});
		this.each(function(){

			var 
				row,
				rowindex,
				i,
				
				rowlen = data.length,
				xlen, ylen, aggrlen,
				tmp,
				newObj,
				r=0;
			// utility funcs
			/* 
			 * Filter the data to a given criteria. Return the firt occurance
			 */
			function find(ar, fun, extra) {
				var res;
				res = _pivotfilter.call(ar, fun, extra);
				return res.length > 0 ? res[0] : null;
			}
			/*
			 * Check if the grouped row column exist (See find)
			 * If the row is not find in pivot rows retun null,
			 * otherviese the column
			 */
			function findGroup(item, index) {
				var j = 0, ret = true, i;
				for(i in item) {
					if (item.hasOwnProperty(i)) {
						if(item[i] != this[j]) {
							ret =  false;
							break;
						}
						j++;
						if(j>=this.length) {
							break;
						}
					}
				}
				if(ret) {
					rowindex =  index;
				}
				return ret;
			}
			/*
			 * Perform calculations of the pivot values.
			 */
			function calculation(oper, v, field, rc)  {
				var ret;
				switch (oper) {
					case  "sum" : 
						ret = parseFloat(v||0) + parseFloat((rc[field]||0));
						break;
					case "count" :
						if(v==="" || v == null) {
							v=0;
						}
						if(rc.hasOwnProperty(field)) {
							ret = v+1;
						} else {
							ret = 0;
						}
						break;
					case "min" : 
						if(v==="" || v == null) {
							ret = parseFloat(rc[field]||0);
						} else {
							ret =Math.min(parseFloat(v),parseFloat(rc[field]||0));
						}
						break;
					case "max" : 
						if(v==="" || v == null) {
							ret = parseFloat(rc[field]||0);
						} else {
							ret = Math.max(parseFloat(v),parseFloat(rc[field]||0));
						}
						break;
				}
				return ret;
			}
			/*
			 * The function agragates the values of the pivot grid.
			 * Return the current row with pivot summary values
			 */
			function agregateFunc ( row, aggr, value, curr) {
				// default is sum
				var arrln = aggr.length, i, label, j, jv, mainval="",swapvals=[];
				if($.isArray(value)) {
					jv = value.length;
					swapvals = value;
				} else {
					jv = 1;
					swapvals[0]=value;
				}
				member = [];
				labels = [];
				member.root = 0;
				for(j=0;j<jv;j++) {
					var  tmpmember = [], vl;
					for(i=0; i < arrln; i++) {
						if(value == null) {
							label = $.trim(aggr[i].member)+"_"+aggr[i].aggregator;
							vl = label;
							swapvals[0]= vl;
						} else {
							vl = value[j].replace(/\s+/g, '');
							try {
								label = (arrln === 1 ? mainval + vl : mainval + vl+"_"+aggr[i].aggregator+"_" + String(i));
							} catch(e) {}
						}
						label = !isNaN(parseInt(label,10)) ? label + " " : label;
						curr[label] =  tmpmember[label] = calculation( aggr[i].aggregator, curr[label], aggr[i].member, row);
						if(j<=1 && vl !==  '_r_Totals' && mainval === "") { // this does not fix full the problem
							mainval = vl;
						}
					}
					//vl = !isNaN(parseInt(vl,10)) ? vl + " " : vl;
					member[label] = tmpmember;
					labels[label] = swapvals[j];
				}
				return curr;
			}
			// Making the row totals without to add in yDimension
			if(o.rowTotals && o.yDimension.length > 0) {
				var dn = o.yDimension[0].dataName;
				o.yDimension.splice(0,0,{dataName:dn});
				o.yDimension[0].converter =  function(){ return '_r_Totals'; };
			}
			// build initial columns (colModel) from xDimension
			xlen = $.isArray(o.xDimension) ? o.xDimension.length : 0;
			ylen = o.yDimension.length;
			aggrlen  = $.isArray(o.aggregates) ? o.aggregates.length : 0;
			if(xlen === 0 || aggrlen === 0) {
				throw("xDimension or aggregates optiona are not set!");
			}
			var colc;
			for(i = 0; i< xlen; i++) {
				colc = {name:o.xDimension[i].dataName, frozen: o.frozenStaticCols};
				if(o.xDimension[i].isGroupField == null) {
					o.xDimension[i].isGroupField =  true;
				}
				colc = $.extend(true, colc, o.xDimension[i]);
				columns.push( colc );
			}
			var groupfields = xlen - 1, tree={};
			//tree = { text: 'root', leaf: false, children: [] };
			//loop over alll the source data
			while( r < rowlen ) {
				row = data[r];
				var xValue = [];
				var yValue = []; 
				tmp = {};
				i = 0;
				// build the data from xDimension
				do {
					xValue[i]  = $.trim(row[o.xDimension[i].dataName]);
					tmp[o.xDimension[i].dataName] = xValue[i];
					i++;
				} while( i < xlen );
				
				var k = 0;
				rowindex = -1;
				// check to see if the row is in our new pivotrow set
				newObj = find(pivotrows, findGroup, xValue);
				if(!newObj) {
					// if the row is not in our set
					k = 0;
					// if yDimension is set
					if(ylen>=1) {
						// build the cols set in yDimension
						for(k=0;k<ylen;k++) {
							yValue[k] = $.trim(row[o.yDimension[k].dataName]);
							// Check to see if we have user defined conditions
							if(o.yDimension[k].converter && $.isFunction(o.yDimension[k].converter)) {
								yValue[k] = o.yDimension[k].converter.call(this, yValue[k], xValue, yValue);
							}
						}
						// make the colums based on aggregates definition 
						// and return the members for late calculation
						tmp = agregateFunc( row, o.aggregates, yValue, tmp );
					} else  if( ylen === 0 ) {
						// if not set use direct the aggregates 
						tmp = agregateFunc( row, o.aggregates, null, tmp );
					}
					// add the result in pivot rows
					pivotrows.push( tmp );
				} else {
					// the pivot exists
					if( rowindex >= 0) {
						k = 0;
						// make the recalculations 
						if(ylen>=1) {
							for(k=0;k<ylen;k++) {
								yValue[k] = $.trim(row[o.yDimension[k].dataName]);
								if(o.yDimension[k].converter && $.isFunction(o.yDimension[k].converter)) {
									yValue[k] = o.yDimension[k].converter.call(this, yValue[k], xValue, yValue);
								}
							}
							newObj = agregateFunc( row, o.aggregates, yValue, newObj );
						} else  if( ylen === 0 ) {
							newObj = agregateFunc( row, o.aggregates, null, newObj );
						}
						// update the row
						pivotrows[rowindex] = newObj;
					}
				}
				var kj=0, current = null,existing = null, kk;
				// Build a JSON tree from the member (see aggregateFunc) 
				// to make later the columns 
				// 
				for (kk in member) {
					if(member.hasOwnProperty( kk )) {
						if(kj === 0) {
							if (!tree.children||tree.children === undefined){
								tree = { text: kk, level : 0, children: [], label: kk  };
							}
							current = tree.children;
						} else {
							existing = null;
							for (i=0; i < current.length; i++) {
								if (current[i].text === kk) {
								//current[i].fields=member[kk];
									existing = current[i];
									break;
								}
							}
							if (existing) {
								current = existing.children;
							} else {
								current.push({ children: [], text: kk, level: kj,  fields: member[kk], label: labels[kk] });
								current = current[current.length - 1].children;
							}
						}
						kj++;
					}
				}
				r++;
			}
			var  lastval=[], initColLen = columns.length, swaplen = initColLen;
			if(ylen>0) {
				headers[ylen-1] = {	useColSpanStyle: false,	groupHeaders: []};
			}
			/*
			 * Recursive function which uses the tree to build the 
			 * columns from the pivot values and set the group Headers
			 */
			function list(items) {
				var l, j, key, k, col;
				for (key in items) { // iterate
					if (items.hasOwnProperty(key)) {
					// write amount of spaces according to level
					// and write name and newline
						if(typeof items[key] !== "object") {
							// If not a object build the header of the appropriate level
							if( key === 'level') {
								if(lastval[items.level] === undefined) {
									lastval[items.level] ='';
									if(items.level>0 && items.text !== '_r_Totals') {
										headers[items.level-1] = {
											useColSpanStyle: false,
											groupHeaders: []
										};
									}
								}
								if(lastval[items.level] !== items.text && items.children.length && items.text !== '_r_Totals') {
									if(items.level>0) {
										headers[items.level-1].groupHeaders.push({
											titleText: items.label,
											numberOfColumns : 0
										});
										var collen = headers[items.level-1].groupHeaders.length-1,
										colpos = collen === 0 ? swaplen : initColLen+aggrlen;
										if(items.level-1=== (o.rowTotals ? 1 : 0)) {
											if(collen>0) {
												var l1 = headers[items.level-1].groupHeaders[collen-1].numberOfColumns;
												if(l1) {
													colpos = l1 + 1 + o.aggregates.length;
												}
											}
										}
										headers[items.level-1].groupHeaders[collen].startColumnName = columns[colpos].name;
										headers[items.level-1].groupHeaders[collen].numberOfColumns = columns.length - colpos;
										initColLen = columns.length;
									}
								}
								lastval[items.level] = items.text;
							}
							// This is in case when the member contain more than one summary item
							if(items.level === ylen  && key==='level' && ylen >0) {
								if( aggrlen > 1){
									var ll=1;
									for( l in items.fields) {
										if (items.fields.hasOwnProperty(l)) {
											if(ll===1) {
												headers[ylen-1].groupHeaders.push({startColumnName: l, numberOfColumns: 1, titleText: items.text});
											}
											ll++;
										}
									}
									headers[ylen-1].groupHeaders[headers[ylen-1].groupHeaders.length-1].numberOfColumns = ll-1;
								} else {
									headers.splice(ylen-1,1);
								}
							}
						}
						// if object, call recursively
						if (items[key] != null && typeof items[key] === "object") {
							list(items[key]);
						}
						// Finally build the coulumns
						if( key === 'level') {
							if(items.level >0){
								j=0;
								for(l in items.fields) {
									if(items.fields.hasOwnProperty( l )) {
										col = {};
										for(k in o.aggregates[j]) {
											if(o.aggregates[j].hasOwnProperty(k)) {
												switch( k ) {
													case 'member':
													case 'label':
													case 'aggregator':
														break;
													default:
														col[k] = o.aggregates[j][k];
												}
											}
										}	
										if(aggrlen>1) {
											col.name = l;
											col.label = o.aggregates[j].label || items.label;
										} else {
											col.name = items.text;
											col.label = items.text==='_r_Totals' ? o.rowTotalsText : items.label;
										}
										columns.push (col);
										j++;
									}
								}
							}
						}
					}
				}
			}

			list( tree );
			var nm;
			// loop again trougth the pivot rows in order to build grand total 
			if(o.colTotals) {
				var plen = pivotrows.length;
				while(plen--) {
					for(i=xlen;i<columns.length;i++) {
						nm = columns[i].name;
						if(!summaries[nm]) {
							summaries[nm] = parseFloat(pivotrows[plen][nm] || 0);
						} else {
							summaries[nm] += parseFloat(pivotrows[plen][nm] || 0);
						}
					}
				}
			}
			// based on xDimension  levels build grouping 
			if( groupfields > 0) {
				for(i=0;i<groupfields;i++) {
					if(columns[i].isGroupField) {
						groupOptions.groupingView.groupField.push(columns[i].name);
						groupOptions.groupingView.groupSummary.push(o.groupSummary);
						groupOptions.groupingView.groupSummaryPos.push(o.groupSummaryPos);
					}
				}
			} else {
				// no grouping is needed
				groupOptions.grouping = false;
			}
			groupOptions.sortname = columns[groupfields].name;
			groupOptions.groupingView.hideFirstGroupCol = true;
		});
		// return the final result.
		return { "colModel" : columns, "rows": pivotrows, "groupOptions" : groupOptions, "groupHeaders" :  headers, summary : summaries };
	},
	jqPivot : function( data, pivotOpt, gridOpt, ajaxOpt) {
		return this.each(function(){
			var $t = this;

			function pivot( data) {
				var pivotGrid = jQuery($t).jqGrid('pivotSetup',data, pivotOpt),
				footerrow = $.assocArraySize(pivotGrid.summary) > 0 ? true : false,
				query= $.jgrid.from(pivotGrid.rows), i;
				for(i=0; i< pivotGrid.groupOptions.groupingView.groupField.length; i++) {
					query.orderBy(pivotGrid.groupOptions.groupingView.groupField[i], "a", 'text', '');
				}
				jQuery($t).jqGrid($.extend(true, {
					datastr: $.extend(query.select(),footerrow ? {userdata:pivotGrid.summary} : {}),
					datatype: "jsonstring",
					footerrow : footerrow,
					userDataOnFooter: footerrow,
					colModel: pivotGrid.colModel,
					viewrecords: true,
					sortname: pivotOpt.xDimension[0].dataName // ?????
				}, pivotGrid.groupOptions, gridOpt || {}));
				var gHead = pivotGrid.groupHeaders;
				if(gHead.length) {
					for( i = 0;i < gHead.length ; i++) {
						if(gHead[i] && gHead[i].groupHeaders.length) {
							jQuery($t).jqGrid('setGroupHeaders',gHead[i]);
						}
					}
				}
				if(pivotOpt.frozenStaticCols) {
					jQuery($t).jqGrid("setFrozenColumns");
				}
			}

			if(typeof data === "string") {
				$.ajax($.extend({
					url : data,
					dataType: 'json',
					success : function(response) {
						pivot($.jgrid.getAccessor(response, ajaxOpt && ajaxOpt.reader ? ajaxOpt.reader: 'rows') );
					}
				}, ajaxOpt || {}) );
			} else {
				pivot( data );
			}
		});
	}
});
})(jQuery);
/*jshint eqeqeq:false */
/*global jQuery */
(function($){
/**
 * jqGrid extension for SubGrid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
"use strict";
$.jgrid.extend({
setSubGrid : function () {
	return this.each(function (){
		var $t = this, cm, i,
		suboptions = {
			plusicon : "ui-icon-plus",
			minusicon : "ui-icon-minus",
			openicon: "ui-icon-carat-1-sw",
			expandOnLoad:  false,
			delayOnLoad : 50,
			selectOnExpand : false,
			selectOnCollapse : false,
			reloadOnExpand : true
		};
		$t.p.subGridOptions = $.extend(suboptions, $t.p.subGridOptions || {});
		$t.p.colNames.unshift("");
		$t.p.colModel.unshift({name:'subgrid',width: $.jgrid.cell_width ?  $t.p.subGridWidth+$t.p.cellLayout : $t.p.subGridWidth,sortable: false,resizable:false,hidedlg:true,search:false,fixed:true});
		cm = $t.p.subGridModel;
		if(cm[0]) {
			cm[0].align = $.extend([],cm[0].align || []);
			for(i=0;i<cm[0].name.length;i++) { cm[0].align[i] = cm[0].align[i] || 'left';}
		}
	});
},
addSubGridCell :function (pos,iRow) {
	var prp='',ic,sid;
	this.each(function(){
		prp = this.formatCol(pos,iRow);
		sid= this.p.id;
		ic = this.p.subGridOptions.plusicon;
	});
	return "<td role=\"gridcell\" aria-describedby=\""+sid+"_subgrid\" class=\"ui-sgcollapsed sgcollapsed\" "+prp+"><a style='cursor:pointer;'><span class='ui-icon "+ic+"'></span></a></td>";
},
addSubGrid : function( pos, sind ) {
	return this.each(function(){
		var ts = this;
		if (!ts.grid ) { return; }
		//-------------------------
		var subGridCell = function(trdiv,cell,pos)
		{
			var tddiv = $("<td align='"+ts.p.subGridModel[0].align[pos]+"'></td>").html(cell);
			$(trdiv).append(tddiv);
		};
		var subGridXml = function(sjxml, sbid){
			var tddiv, i,  sgmap,
			dummy = $("<table"+($.jgrid.msie && $.jgrid.msiever() < 8 ? " cellspacing='0'" : "")+"><tbody></tbody></table>"),
			trdiv = $("<tr></tr>");
			for (i = 0; i<ts.p.subGridModel[0].name.length; i++) {
				tddiv = $("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-"+ts.p.direction+"'></th>");
				$(tddiv).html(ts.p.subGridModel[0].name[i]);
				$(tddiv).width( ts.p.subGridModel[0].width[i]);
				$(trdiv).append(tddiv);
			}
			$(dummy).append(trdiv);
			if (sjxml){
				sgmap = ts.p.xmlReader.subgrid;
				$(sgmap.root+" "+sgmap.row, sjxml).each( function(){
					trdiv = $("<tr class='ui-widget-content ui-subtblcell'></tr>");
					if(sgmap.repeatitems === true) {
						$(sgmap.cell,this).each( function(i) {
							subGridCell(trdiv, $(this).text() || '&#160;',i);
						});
					} else {
						var f = ts.p.subGridModel[0].mapping || ts.p.subGridModel[0].name;
						if (f) {
							for (i=0;i<f.length;i++) {
								subGridCell(trdiv, $(f[i],this).text() || '&#160;',i);
							}
						}
					}
					$(dummy).append(trdiv);
				});
			}
			var pID = $("table:first",ts.grid.bDiv).attr("id")+"_";
			$("#"+$.jgrid.jqID(pID+sbid)).append(dummy);
			ts.grid.hDiv.loading = false;
			$("#load_"+$.jgrid.jqID(ts.p.id)).hide();
			return false;
		};
		var subGridJson = function(sjxml, sbid){
			var tddiv,result,i,cur, sgmap,j,
			dummy = $("<table"+($.jgrid.msie && $.jgrid.msiever() < 8 ? " cellspacing='0'" : "")+"><tbody></tbody></table>"),
			trdiv = $("<tr></tr>");
			for (i = 0; i<ts.p.subGridModel[0].name.length; i++) {
				tddiv = $("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-"+ts.p.direction+"'></th>");
				$(tddiv).html(ts.p.subGridModel[0].name[i]);
				$(tddiv).width( ts.p.subGridModel[0].width[i]);
				$(trdiv).append(tddiv);
			}
			$(dummy).append(trdiv);
			if (sjxml){
				sgmap = ts.p.jsonReader.subgrid;
				result = $.jgrid.getAccessor(sjxml, sgmap.root);
				if ( result !== undefined ) {
					for (i=0;i<result.length;i++) {
						cur = result[i];
						trdiv = $("<tr class='ui-widget-content ui-subtblcell'></tr>");
						if(sgmap.repeatitems === true) {
							if(sgmap.cell) { cur=cur[sgmap.cell]; }
							for (j=0;j<cur.length;j++) {
								subGridCell(trdiv, cur[j] || '&#160;',j);
							}
						} else {
							var f = ts.p.subGridModel[0].mapping || ts.p.subGridModel[0].name;
							if(f.length) {
								for (j=0;j<f.length;j++) {
									subGridCell(trdiv, cur[f[j]] || '&#160;',j);
								}
							}
						}
						$(dummy).append(trdiv);
					}
				}
			}
			var pID = $("table:first",ts.grid.bDiv).attr("id")+"_";
			$("#"+$.jgrid.jqID(pID+sbid)).append(dummy);
			ts.grid.hDiv.loading = false;
			$("#load_"+$.jgrid.jqID(ts.p.id)).hide();
			return false;
		};
		var populatesubgrid = function( rd )
		{
			var sid,dp, i, j;
			sid = $(rd).attr("id");
			dp = {nd_: (new Date().getTime())};
			dp[ts.p.prmNames.subgridid]=sid;
			if(!ts.p.subGridModel[0]) { return false; }
			if(ts.p.subGridModel[0].params) {
				for(j=0; j < ts.p.subGridModel[0].params.length; j++) {
					for(i=0; i<ts.p.colModel.length; i++) {
						if(ts.p.colModel[i].name === ts.p.subGridModel[0].params[j]) {
							dp[ts.p.colModel[i].name]= $("td:eq("+i+")",rd).text().replace(/\&#160\;/ig,'');
						}
					}
				}
			}
			if(!ts.grid.hDiv.loading) {
				ts.grid.hDiv.loading = true;
				$("#load_"+$.jgrid.jqID(ts.p.id)).show();
				if(!ts.p.subgridtype) { ts.p.subgridtype = ts.p.datatype; }
				if($.isFunction(ts.p.subgridtype)) {
					ts.p.subgridtype.call(ts, dp);
				} else {
					ts.p.subgridtype = ts.p.subgridtype.toLowerCase();
				}
				switch(ts.p.subgridtype) {
					case "xml":
					case "json":
					$.ajax($.extend({
						type:ts.p.mtype,
						url: $.isFunction(ts.p.subGridUrl) ? ts.p.subGridUrl.call(ts, dp) : ts.p.subGridUrl,
						dataType:ts.p.subgridtype,
						data: $.isFunction(ts.p.serializeSubGridData)? ts.p.serializeSubGridData.call(ts, dp) : dp,
						complete: function(sxml) {
							if(ts.p.subgridtype === "xml") {
								subGridXml(sxml.responseXML, sid);
							} else {
								subGridJson($.jgrid.parse(sxml.responseText),sid);
							}
							sxml=null;
						}
					}, $.jgrid.ajaxOptions, ts.p.ajaxSubgridOptions || {}));
					break;
				}
			}
			return false;
		};
		var _id, pID,atd, nhc=1, bfsc, r;
		$.each(ts.p.colModel,function(){
			if(this.hidden === true || this.name === 'rn' || this.name === 'cb') {
				nhc++;
			}
		});
		var len = ts.rows.length, i=1;
		if( sind !== undefined && sind > 0) {
			i = sind;
			len = sind+1;
		}
		while(i < len) {
			if($(ts.rows[i]).hasClass('jqgrow')) {
				if(ts.p.scroll) {
					$(ts.rows[i].cells[pos]).unbind('click');
				}
				$(ts.rows[i].cells[pos]).bind('click', function() {
					var tr = $(this).parent("tr")[0];
					r = tr.nextSibling;
					if($(this).hasClass("sgcollapsed")) {
						pID = ts.p.id;
						_id = tr.id;
						if(ts.p.subGridOptions.reloadOnExpand === true || ( ts.p.subGridOptions.reloadOnExpand === false && !$(r).hasClass('ui-subgrid') ) ) {
							atd = pos >=1 ? "<td colspan='"+pos+"'>&#160;</td>":"";
							bfsc = $(ts).triggerHandler("jqGridSubGridBeforeExpand", [pID + "_" + _id, _id]);
							bfsc = (bfsc === false || bfsc === 'stop') ? false : true;
							if(bfsc && $.isFunction(ts.p.subGridBeforeExpand)) {
								bfsc = ts.p.subGridBeforeExpand.call(ts, pID+"_"+_id,_id);
							}
							if(bfsc === false) {return false;}
							$(tr).after( "<tr role='row' class='ui-subgrid'>"+atd+"<td class='ui-widget-content subgrid-cell'><span class='ui-icon "+ts.p.subGridOptions.openicon+"'></span></td><td colspan='"+parseInt(ts.p.colNames.length-nhc,10)+"' class='ui-widget-content subgrid-data'><div id="+pID+"_"+_id+" class='tablediv'></div></td></tr>" );
							$(ts).triggerHandler("jqGridSubGridRowExpanded", [pID + "_" + _id, _id]);
							if( $.isFunction(ts.p.subGridRowExpanded)) {
								ts.p.subGridRowExpanded.call(ts, pID+"_"+ _id,_id);
							} else {
								populatesubgrid(tr);
							}
						} else {
							$(r).show();
						}
						$(this).html("<a style='cursor:pointer;'><span class='ui-icon "+ts.p.subGridOptions.minusicon+"'></span></a>").removeClass("sgcollapsed").addClass("sgexpanded");
						if(ts.p.subGridOptions.selectOnExpand) {
							$(ts).jqGrid('setSelection',_id);
						}
					} else if($(this).hasClass("sgexpanded")) {
						bfsc = $(ts).triggerHandler("jqGridSubGridRowColapsed", [pID + "_" + _id, _id]);
						bfsc = (bfsc === false || bfsc === 'stop') ? false : true;
						_id = tr.id;
						if( bfsc &&  $.isFunction(ts.p.subGridRowColapsed)) {
							bfsc = ts.p.subGridRowColapsed.call(ts, pID+"_"+_id,_id );
						}
						if(bfsc===false) {return false;}
						if(ts.p.subGridOptions.reloadOnExpand === true) {
							$(r).remove(".ui-subgrid");
						} else if($(r).hasClass('ui-subgrid')) { // incase of dynamic deleting
							$(r).hide();
						}
						$(this).html("<a style='cursor:pointer;'><span class='ui-icon "+ts.p.subGridOptions.plusicon+"'></span></a>").removeClass("sgexpanded").addClass("sgcollapsed");
						if(ts.p.subGridOptions.selectOnCollapse) {
							$(ts).jqGrid('setSelection',_id);
						}
					}
					return false;
				});
			}
			i++;
		}
		if(ts.p.subGridOptions.expandOnLoad === true) {
			$(ts.rows).filter('.jqgrow').each(function(index,row){
				$(row.cells[0]).click();
			});
		}
		ts.subGridXml = function(xml,sid) {subGridXml(xml,sid);};
		ts.subGridJson = function(json,sid) {subGridJson(json,sid);};
	});
},
expandSubGridRow : function(rowid) {
	return this.each(function () {
		var $t = this;
		if(!$t.grid && !rowid) {return;}
		if($t.p.subGrid===true) {
			var rc = $(this).jqGrid("getInd",rowid,true);
			if(rc) {
				var sgc = $("td.sgcollapsed",rc)[0];
				if(sgc) {
					$(sgc).trigger("click");
				}
			}
		}
	});
},
collapseSubGridRow : function(rowid) {
	return this.each(function () {
		var $t = this;
		if(!$t.grid && !rowid) {return;}
		if($t.p.subGrid===true) {
			var rc = $(this).jqGrid("getInd",rowid,true);
			if(rc) {
				var sgc = $("td.sgexpanded",rc)[0];
				if(sgc) {
					$(sgc).trigger("click");
				}
			}
		}
	});
},
toggleSubGridRow : function(rowid) {
	return this.each(function () {
		var $t = this;
		if(!$t.grid && !rowid) {return;}
		if($t.p.subGrid===true) {
			var rc = $(this).jqGrid("getInd",rowid,true);
			if(rc) {
				var sgc = $("td.sgcollapsed",rc)[0];
				if(sgc) {
					$(sgc).trigger("click");
				} else {
					sgc = $("td.sgexpanded",rc)[0];
					if(sgc) {
						$(sgc).trigger("click");
					}
				}
			}
		}
	});
}
});
})(jQuery);
/*
 Transform a table to a jqGrid.
 Peter Romianowski <peter.romianowski@optivo.de> 
 If the first column of the table contains checkboxes or
 radiobuttons then the jqGrid is made selectable.
*/
// Addition - selector can be a class or id
function tableToGrid(selector, options) {
jQuery(selector).each(function() {
	if(this.grid) {return;} //Adedd from Tony Tomov
	// This is a small "hack" to make the width of the jqGrid 100%
	jQuery(this).width("99%");
	var w = jQuery(this).width();

	// Text whether we have single or multi select
	var inputCheckbox = jQuery('tr td:first-child input[type=checkbox]:first', jQuery(this));
	var inputRadio = jQuery('tr td:first-child input[type=radio]:first', jQuery(this));
	var selectMultiple = inputCheckbox.length > 0;
	var selectSingle = !selectMultiple && inputRadio.length > 0;
	var selectable = selectMultiple || selectSingle;
	//var inputName = inputCheckbox.attr("name") || inputRadio.attr("name");

	// Build up the columnModel and the data
	var colModel = [];
	var colNames = [];
	jQuery('th', jQuery(this)).each(function() {
		if (colModel.length === 0 && selectable) {
			colModel.push({
				name: '__selection__',
				index: '__selection__',
				width: 0,
				hidden: true
			});
			colNames.push('__selection__');
		} else {
			colModel.push({
				name: jQuery(this).attr("id") || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(' ').join('_'),
				index: jQuery(this).attr("id") || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(' ').join('_'),
				width: jQuery(this).width() || 150
			});
			colNames.push(jQuery(this).html());
		}
	});
	var data = [];
	var rowIds = [];
	var rowChecked = [];
	jQuery('tbody > tr', jQuery(this)).each(function() {
		var row = {};
		var rowPos = 0;
		jQuery('td', jQuery(this)).each(function() {
			if (rowPos === 0 && selectable) {
				var input = jQuery('input', jQuery(this));
				var rowId = input.attr("value");
				rowIds.push(rowId || data.length);
				if (input.is(":checked")) {
					rowChecked.push(rowId);
				}
				row[colModel[rowPos].name] = input.attr("value");
			} else {
				row[colModel[rowPos].name] = jQuery(this).html();
			}
			rowPos++;
		});
		if(rowPos >0) { data.push(row); }
	});

	// Clear the original HTML table
	jQuery(this).empty();

	// Mark it as jqGrid
	jQuery(this).addClass("scroll");

	jQuery(this).jqGrid(jQuery.extend({
		datatype: "local",
		width: w,
		colNames: colNames,
		colModel: colModel,
		multiselect: selectMultiple
		//inputName: inputName,
		//inputValueCol: imputName != null ? "__selection__" : null
	}, options || {}));

	// Add data
	var a;
	for (a = 0; a < data.length; a++) {
		var id = null;
		if (rowIds.length > 0) {
			id = rowIds[a];
			if (id && id.replace) {
				// We have to do this since the value of a checkbox
				// or radio button can be anything 
				id = encodeURIComponent(id).replace(/[.\-%]/g, "_");
			}
		}
		if (id === null) {
			id = a + 1;
		}
		jQuery(this).jqGrid("addRowData",id, data[a]);
	}

	// Set the selection
	for (a = 0; a < rowChecked.length; a++) {
		jQuery(this).jqGrid("setSelection",rowChecked[a]);
	}
});
}
/**
 * jqGrid extension - Tree Grid
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/

/*jshint eqeqeq:false */
/*global jQuery */
(function($) {
"use strict";
$.jgrid.extend({
	setTreeNode : function(i, len){
		return this.each(function(){
			var $t = this;
			if( !$t.grid || !$t.p.treeGrid ) {return;}
			var expCol = $t.p.expColInd,
			expanded = $t.p.treeReader.expanded_field,
			isLeaf = $t.p.treeReader.leaf_field,
			level = $t.p.treeReader.level_field,
			icon = $t.p.treeReader.icon_field,
			loaded = $t.p.treeReader.loaded,  lft, rgt, curLevel, ident,lftpos, twrap,
			ldat, lf;
			while(i<len) {
				var ind = $.jgrid.stripPref($t.p.idPrefix, $t.rows[i].id), dind = $t.p._index[ind], expan;
				ldat = $t.p.data[dind];
				//$t.rows[i].level = ldat[level];
				if($t.p.treeGridModel === 'nested') {
					if(!ldat[isLeaf]) {
					lft = parseInt(ldat[$t.p.treeReader.left_field],10);
					rgt = parseInt(ldat[$t.p.treeReader.right_field],10);
					// NS Model
						ldat[isLeaf] = (rgt === lft+1) ? 'true' : 'false';
						$t.rows[i].cells[$t.p._treeleafpos].innerHTML = ldat[isLeaf];
					}
				}
				//else {
					//row.parent_id = rd[$t.p.treeReader.parent_id_field];
				//}
				curLevel = parseInt(ldat[level],10);
				if($t.p.tree_root_level === 0) {
					ident = curLevel+1;
					lftpos = curLevel;
				} else {
					ident = curLevel;
					lftpos = curLevel -1;
				}
				twrap = "<div class='tree-wrap tree-wrap-"+$t.p.direction+"' style='width:"+(ident*18)+"px;'>";
				twrap += "<div style='"+($t.p.direction==="rtl" ? "right:" : "left:")+(lftpos*18)+"px;' class='ui-icon ";


				if(ldat[loaded] !== undefined) {
					if(ldat[loaded]==="true" || ldat[loaded]===true) {
						ldat[loaded] = true;
					} else {
						ldat[loaded] = false;
					}
				}
				if(ldat[isLeaf] === "true" || ldat[isLeaf] === true) {
					twrap += ((ldat[icon] !== undefined && ldat[icon] !== "") ? ldat[icon] : $t.p.treeIcons.leaf)+" tree-leaf treeclick";
					ldat[isLeaf] = true;
					lf="leaf";
				} else {
					ldat[isLeaf] = false;
					lf="";
				}
				ldat[expanded] = ((ldat[expanded] === "true" || ldat[expanded] === true) ? true : false) && (ldat[loaded] || ldat[loaded] === undefined);
				if(ldat[expanded] === false) {
					twrap += ((ldat[isLeaf] === true) ? "'" : $t.p.treeIcons.plus+" tree-plus treeclick'");
				} else {
					twrap += ((ldat[isLeaf] === true) ? "'" : $t.p.treeIcons.minus+" tree-minus treeclick'");
				}
				
				twrap += "></div></div>";
				$($t.rows[i].cells[expCol]).wrapInner("<span class='cell-wrapper"+lf+"'></span>").prepend(twrap);

				if(curLevel !== parseInt($t.p.tree_root_level,10)) {
					var pn = $($t).jqGrid('getNodeParent',ldat);
					expan = pn && pn.hasOwnProperty(expanded) ? pn[expanded] : true;
					if( !expan ){
						$($t.rows[i]).css("display","none");
					}
				}
				$($t.rows[i].cells[expCol])
					.find("div.treeclick")
					.bind("click",function(e){
						var target = e.target || e.srcElement,
						ind2 =$.jgrid.stripPref($t.p.idPrefix,$(target,$t.rows).closest("tr.jqgrow")[0].id),
						pos = $t.p._index[ind2];
						if(!$t.p.data[pos][isLeaf]){
							if($t.p.data[pos][expanded]){
								$($t).jqGrid("collapseRow",$t.p.data[pos]);
								$($t).jqGrid("collapseNode",$t.p.data[pos]);
							} else {
								$($t).jqGrid("expandRow",$t.p.data[pos]);
								$($t).jqGrid("expandNode",$t.p.data[pos]);
							}
						}
						return false;
					});
				if($t.p.ExpandColClick === true) {
					$($t.rows[i].cells[expCol])
						.find("span.cell-wrapper")
						.css("cursor","pointer")
						.bind("click",function(e) {
							var target = e.target || e.srcElement,
							ind2 =$.jgrid.stripPref($t.p.idPrefix,$(target,$t.rows).closest("tr.jqgrow")[0].id),
							pos = $t.p._index[ind2];
							if(!$t.p.data[pos][isLeaf]){
								if($t.p.data[pos][expanded]){
									$($t).jqGrid("collapseRow",$t.p.data[pos]);
									$($t).jqGrid("collapseNode",$t.p.data[pos]);
								} else {
									$($t).jqGrid("expandRow",$t.p.data[pos]);
									$($t).jqGrid("expandNode",$t.p.data[pos]);
								}
							}
							$($t).jqGrid("setSelection",ind2);
							return false;
						});
				}
				i++;
			}

		});
	},
	setTreeGrid : function() {
		return this.each(function (){
			var $t = this, i=0, pico, ecol = false, nm, key, tkey, dupcols=[];
			if(!$t.p.treeGrid) {return;}
			if(!$t.p.treedatatype ) {$.extend($t.p,{treedatatype: $t.p.datatype});}
			$t.p.subGrid = false;$t.p.altRows =false;
			$t.p.pgbuttons = false;$t.p.pginput = false;
			$t.p.gridview =  true;
			if($t.p.rowTotal === null ) { $t.p.rowNum = $t.p.maxRowNum; }
			$t.p.multiselect = false;$t.p.rowList = [];
			$t.p.expColInd = 0;
			pico = 'ui-icon-triangle-1-' + ($t.p.direction==="rtl" ? 'w' : 'e');
			$t.p.treeIcons = $.extend({plus:pico,minus:'ui-icon-triangle-1-s',leaf:'ui-icon-radio-off'},$t.p.treeIcons || {});
			if($t.p.treeGridModel === 'nested') {
				$t.p.treeReader = $.extend({
					level_field: "level",
					left_field:"lft",
					right_field: "rgt",
					leaf_field: "isLeaf",
					expanded_field: "expanded",
					loaded: "loaded",
					icon_field: "icon"
				},$t.p.treeReader);
			} else if($t.p.treeGridModel === 'adjacency') {
				$t.p.treeReader = $.extend({
						level_field: "level",
						parent_id_field: "parent",
						leaf_field: "isLeaf",
						expanded_field: "expanded",
						loaded: "loaded",
						icon_field: "icon"
				},$t.p.treeReader );
			}
			for ( key in $t.p.colModel){
				if($t.p.colModel.hasOwnProperty(key)) {
					nm = $t.p.colModel[key].name;
					if( nm === $t.p.ExpandColumn && !ecol ) {
						ecol = true;
						$t.p.expColInd = i;
					}
					i++;
					//
					for(tkey in $t.p.treeReader) {
						if($t.p.treeReader.hasOwnProperty(tkey) && $t.p.treeReader[tkey] === nm) {
							dupcols.push(nm);
						}
					}
				}
			}
			$.each($t.p.treeReader,function(j,n){
				if(n && $.inArray(n, dupcols) === -1){
					if(j==='leaf_field') { $t.p._treeleafpos= i; }
				i++;
					$t.p.colNames.push(n);
					$t.p.colModel.push({name:n,width:1,hidden:true,sortable:false,resizable:false,hidedlg:true,editable:true,search:false});
				}
			});			
		});
	},
	expandRow: function (record){
		this.each(function(){
			var $t = this;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			var childern = $($t).jqGrid("getNodeChildren",record),
			//if ($($t).jqGrid("isVisibleNode",record)) {
			expanded = $t.p.treeReader.expanded_field;
			$(childern).each(function(){
				var id  = $t.p.idPrefix + $.jgrid.getAccessor(this,$t.p.localReader.id);
				$($($t).jqGrid('getGridRowById', id)).css("display","");
				if(this[expanded]) {
					$($t).jqGrid("expandRow",this);
				}
			});
			//}
		});
	},
	collapseRow : function (record) {
		this.each(function(){
			var $t = this;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			var childern = $($t).jqGrid("getNodeChildren",record),
			expanded = $t.p.treeReader.expanded_field;
			$(childern).each(function(){
				var id  = $t.p.idPrefix + $.jgrid.getAccessor(this,$t.p.localReader.id);
				$($($t).jqGrid('getGridRowById', id)).css("display","none");
				if(this[expanded]){
					$($t).jqGrid("collapseRow",this);
				}
			});
		});
	},
	// NS ,adjacency models
	getRootNodes : function() {
		var result = [];
		this.each(function(){
			var $t = this;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			switch ($t.p.treeGridModel) {
				case 'nested' :
					var level = $t.p.treeReader.level_field;
					$($t.p.data).each(function(){
						if(parseInt(this[level],10) === parseInt($t.p.tree_root_level,10)) {
							result.push(this);
						}
					});
					break;
				case 'adjacency' :
					var parent_id = $t.p.treeReader.parent_id_field;
					$($t.p.data).each(function(){
						if(this[parent_id] === null || String(this[parent_id]).toLowerCase() === "null") {
							result.push(this);
						}
					});
					break;
			}
		});
		return result;
	},
	getNodeDepth : function(rc) {
		var ret = null;
		this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			var $t = this;
			switch ($t.p.treeGridModel) {
				case 'nested' :
					var level = $t.p.treeReader.level_field;
					ret = parseInt(rc[level],10) - parseInt($t.p.tree_root_level,10);
					break;
				case 'adjacency' :
					ret = $($t).jqGrid("getNodeAncestors",rc).length;
					break;
			}
		});
		return ret;
	},
	getNodeParent : function(rc) {
		var result = null;
		this.each(function(){
			var $t = this;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			switch ($t.p.treeGridModel) {
				case 'nested' :
					var lftc = $t.p.treeReader.left_field,
					rgtc = $t.p.treeReader.right_field,
					levelc = $t.p.treeReader.level_field,
					lft = parseInt(rc[lftc],10), rgt = parseInt(rc[rgtc],10), level = parseInt(rc[levelc],10);
					$(this.p.data).each(function(){
						if(parseInt(this[levelc],10) === level-1 && parseInt(this[lftc],10) < lft && parseInt(this[rgtc],10) > rgt) {
							result = this;
							return false;
						}
					});
					break;
				case 'adjacency' :
					var parent_id = $t.p.treeReader.parent_id_field,
					dtid = $t.p.localReader.id,
					ind = rc[dtid], pos = $t.p._index[ind];
					while(pos--) {
						if($t.p.data[pos][dtid] === $.jgrid.stripPref($t.p.idPrefix, rc[parent_id])) {
							result = $t.p.data[pos];
							break;
						}
					}
					break;
			}
		});
		return result;
	},
	getNodeChildren : function(rc) {
		var result = [];
		this.each(function(){
			var $t = this;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			switch ($t.p.treeGridModel) {
				case 'nested' :
					var lftc = $t.p.treeReader.left_field,
					rgtc = $t.p.treeReader.right_field,
					levelc = $t.p.treeReader.level_field,
					lft = parseInt(rc[lftc],10), rgt = parseInt(rc[rgtc],10), level = parseInt(rc[levelc],10);
					$(this.p.data).each(function(){
						if(parseInt(this[levelc],10) === level+1 && parseInt(this[lftc],10) > lft && parseInt(this[rgtc],10) < rgt) {
							result.push(this);
						}
					});
					break;
				case 'adjacency' :
					var parent_id = $t.p.treeReader.parent_id_field,
					dtid = $t.p.localReader.id;
					$(this.p.data).each(function(){
						if(this[parent_id] == $.jgrid.stripPref($t.p.idPrefix, rc[dtid])) {
							result.push(this);
						}
					});
					break;
			}
		});
		return result;
	},
	getFullTreeNode : function(rc) {
		var result = [];
		this.each(function(){
			var $t = this, len;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			switch ($t.p.treeGridModel) {
				case 'nested' :
					var lftc = $t.p.treeReader.left_field,
					rgtc = $t.p.treeReader.right_field,
					levelc = $t.p.treeReader.level_field,
					lft = parseInt(rc[lftc],10), rgt = parseInt(rc[rgtc],10), level = parseInt(rc[levelc],10);
					$(this.p.data).each(function(){
						if(parseInt(this[levelc],10) >= level && parseInt(this[lftc],10) >= lft && parseInt(this[lftc],10) <= rgt) {
							result.push(this);
						}
					});
					break;
				case 'adjacency' :
					if(rc) {
					result.push(rc);
					var parent_id = $t.p.treeReader.parent_id_field,
					dtid = $t.p.localReader.id;
					$(this.p.data).each(function(i){
						len = result.length;
						for (i = 0; i < len; i++) {
							if ($.jgrid.stripPref($t.p.idPrefix, result[i][dtid]) === this[parent_id]) {
								result.push(this);
								break;
							}
						}
					});
					}
					break;
			}
		});
		return result;
	},	
	// End NS, adjacency Model
	getNodeAncestors : function(rc) {
		var ancestors = [];
		this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			var parent = $(this).jqGrid("getNodeParent",rc);
			while (parent) {
				ancestors.push(parent);
				parent = $(this).jqGrid("getNodeParent",parent);	
			}
		});
		return ancestors;
	},
	isVisibleNode : function(rc) {
		var result = true;
		this.each(function(){
			var $t = this;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			var ancestors = $($t).jqGrid("getNodeAncestors",rc),
			expanded = $t.p.treeReader.expanded_field;
			$(ancestors).each(function(){
				result = result && this[expanded];
				if(!result) {return false;}
			});
		});
		return result;
	},
	isNodeLoaded : function(rc) {
		var result;
		this.each(function(){
			var $t = this;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			var isLeaf = $t.p.treeReader.leaf_field,
			loaded = $t.p.treeReader.loaded;
			if(rc !== undefined ) {
				if(rc[loaded] !== undefined) {
					result = rc[loaded];
				} else if( rc[isLeaf] || $($t).jqGrid("getNodeChildren",rc).length > 0){
					result = true;
				} else {
					result = false;
				}
			} else {
				result = false;
			}
		});
		return result;
	},
	expandNode : function(rc) {
		return this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			var expanded = this.p.treeReader.expanded_field,
			parent = this.p.treeReader.parent_id_field,
			loaded = this.p.treeReader.loaded,
			level = this.p.treeReader.level_field,
			lft = this.p.treeReader.left_field,
			rgt = this.p.treeReader.right_field;

			if(!rc[expanded]) {
				var id = $.jgrid.getAccessor(rc,this.p.localReader.id);
				var rc1 = $("#" + this.p.idPrefix + $.jgrid.jqID(id),this.grid.bDiv)[0];
				var position = this.p._index[id];
				if( $(this).jqGrid("isNodeLoaded",this.p.data[position]) ) {
					rc[expanded] = true;
					$("div.treeclick",rc1).removeClass(this.p.treeIcons.plus+" tree-plus").addClass(this.p.treeIcons.minus+" tree-minus");
				} else if (!this.grid.hDiv.loading) {
					rc[expanded] = true;
					$("div.treeclick",rc1).removeClass(this.p.treeIcons.plus+" tree-plus").addClass(this.p.treeIcons.minus+" tree-minus");
					this.p.treeANode = rc1.rowIndex;
					this.p.datatype = this.p.treedatatype;
					if(this.p.treeGridModel === 'nested') {
						$(this).jqGrid("setGridParam",{postData:{nodeid:id,n_left:rc[lft],n_right:rc[rgt],n_level:rc[level]}});
					} else {
						$(this).jqGrid("setGridParam",{postData:{nodeid:id,parentid:rc[parent],n_level:rc[level]}} );
					}
					$(this).trigger("reloadGrid");
					rc[loaded] = true;
					if(this.p.treeGridModel === 'nested') {
						$(this).jqGrid("setGridParam",{postData:{nodeid:'',n_left:'',n_right:'',n_level:''}});
					} else {
						$(this).jqGrid("setGridParam",{postData:{nodeid:'',parentid:'',n_level:''}}); 
					}
				}
			}
		});
	},
	collapseNode : function(rc) {
		return this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			var expanded = this.p.treeReader.expanded_field;
			if(rc[expanded]) {
				rc[expanded] = false;
				var id = $.jgrid.getAccessor(rc,this.p.localReader.id);
				var rc1 = $("#" + this.p.idPrefix + $.jgrid.jqID(id),this.grid.bDiv)[0];
				$("div.treeclick",rc1).removeClass(this.p.treeIcons.minus+" tree-minus").addClass(this.p.treeIcons.plus+" tree-plus");
			}
		});
	},
	SortTree : function( sortname, newDir, st, datefmt) {
		return this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			var i, len,
			rec, records = [], $t = this, query, roots,
			rt = $(this).jqGrid("getRootNodes");
			// Sorting roots
			query = $.jgrid.from(rt);
			query.orderBy(sortname,newDir,st, datefmt);
			roots = query.select();

			// Sorting children
			for (i = 0, len = roots.length; i < len; i++) {
				rec = roots[i];
				records.push(rec);
				$(this).jqGrid("collectChildrenSortTree",records, rec, sortname, newDir,st, datefmt);
			}
			$.each(records, function(index) {
				var id  = $.jgrid.getAccessor(this,$t.p.localReader.id);
				$('#'+$.jgrid.jqID($t.p.id)+ ' tbody tr:eq('+index+')').after($('tr#'+$.jgrid.jqID(id),$t.grid.bDiv));
			});
			query = null;roots=null;records=null;
		});
	},
	collectChildrenSortTree : function(records, rec, sortname, newDir,st, datefmt) {
		return this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			var i, len,
			child, ch, query, children;
			ch = $(this).jqGrid("getNodeChildren",rec);
			query = $.jgrid.from(ch);
			query.orderBy(sortname, newDir, st, datefmt);
			children = query.select();
			for (i = 0, len = children.length; i < len; i++) {
				child = children[i];
				records.push(child);
				$(this).jqGrid("collectChildrenSortTree",records, child, sortname, newDir, st, datefmt); 
			}
		});
	},
	// experimental 
	setTreeRow : function(rowid, data) {
		var success=false;
		this.each(function(){
			var t = this;
			if(!t.grid || !t.p.treeGrid) {return;}
			success = $(t).jqGrid("setRowData",rowid,data);
		});
		return success;
	},
	delTreeNode : function (rowid) {
		return this.each(function () {
			var $t = this, rid = $t.p.localReader.id, i,
			left = $t.p.treeReader.left_field,
			right = $t.p.treeReader.right_field, myright, width, res, key;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			var rc = $t.p._index[rowid];
			if (rc !== undefined) {
				// nested
				myright = parseInt($t.p.data[rc][right],10);
				width = myright -  parseInt($t.p.data[rc][left],10) + 1;
				var dr = $($t).jqGrid("getFullTreeNode",$t.p.data[rc]);
				if(dr.length>0){
					for (i=0;i<dr.length;i++){
						$($t).jqGrid("delRowData",dr[i][rid]);
					}
				}
				if( $t.p.treeGridModel === "nested") {
					// ToDo - update grid data
					res = $.jgrid.from($t.p.data)
						.greater(left,myright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][left] = parseInt(res[key][left],10) - width ;
							}
						}
					}
					res = $.jgrid.from($t.p.data)
						.greater(right,myright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][right] = parseInt(res[key][right],10) - width ;
							}
						}
					}
				}
			}
		});
	},
	addChildNode : function( nodeid, parentid, data, expandData ) {
		//return this.each(function(){
		var $t = this[0];
		if(data) {
			// we suppose tha the id is autoincremet and
			var expanded = $t.p.treeReader.expanded_field,
			isLeaf = $t.p.treeReader.leaf_field,
			level = $t.p.treeReader.level_field,
			//icon = $t.p.treeReader.icon_field,
			parent = $t.p.treeReader.parent_id_field,
			left = $t.p.treeReader.left_field,
			right = $t.p.treeReader.right_field,
			loaded = $t.p.treeReader.loaded,
			method, parentindex, parentdata, parentlevel, i, len, max=0, rowind = parentid, leaf, maxright;
			if(expandData===undefined) {expandData = false;}
			if ( nodeid == null ) {
				i = $t.p.data.length-1;
				if(	i>= 0 ) {
					while(i>=0){max = Math.max(max, parseInt($t.p.data[i][$t.p.localReader.id],10)); i--;}
				}
				nodeid = max+1;
			}
			var prow = $($t).jqGrid('getInd', parentid);
			leaf = false;
			// if not a parent we assume root
			if ( parentid === undefined  || parentid === null || parentid==="") {
				parentid = null;
				rowind = null;
				method = 'last';
				parentlevel = $t.p.tree_root_level;
				i = $t.p.data.length+1;
			} else {
				method = 'after';
				parentindex = $t.p._index[parentid];
				parentdata = $t.p.data[parentindex];
				parentid = parentdata[$t.p.localReader.id];
				parentlevel = parseInt(parentdata[level],10)+1;
				var childs = $($t).jqGrid('getFullTreeNode', parentdata);
				// if there are child nodes get the last index of it
				if(childs.length) {
					i = childs[childs.length-1][$t.p.localReader.id];
					rowind = i;
					i = $($t).jqGrid('getInd',rowind)+1;
				} else {
					i = $($t).jqGrid('getInd', parentid)+1;
				}
				// if the node is leaf
				if(parentdata[isLeaf]) {
					leaf = true;
					parentdata[expanded] = true;
					//var prow = $($t).jqGrid('getInd', parentid);
					$($t.rows[prow])
						.find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper")
						.end()
						.find("div.tree-leaf").removeClass($t.p.treeIcons.leaf+" tree-leaf").addClass($t.p.treeIcons.minus+" tree-minus");
					$t.p.data[parentindex][isLeaf] = false;
					parentdata[loaded] = true;
				}
			}
			len = i+1;

			if( data[expanded]===undefined)  {data[expanded]= false;}
			if( data[loaded]===undefined )  { data[loaded] = false;}
			data[level] = parentlevel;
			if( data[isLeaf]===undefined) {data[isLeaf]= true;}
			if( $t.p.treeGridModel === "adjacency") {
				data[parent] = parentid;
			}
			if( $t.p.treeGridModel === "nested") {
				// this method requiere more attention
				var query, res, key;
				//maxright = parseInt(maxright,10);
				// ToDo - update grid data
				if(parentid !== null) {
					maxright = parseInt(parentdata[right],10);
					query = $.jgrid.from($t.p.data);
					query = query.greaterOrEquals(right,maxright,{stype:'integer'});
					res = query.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][left] = res[key][left] > maxright ? parseInt(res[key][left],10) +2 : res[key][left];
								res[key][right] = res[key][right] >= maxright ? parseInt(res[key][right],10) +2 : res[key][right];
							}
						}
					}
					data[left] = maxright;
					data[right]= maxright+1;
				} else {
					maxright = parseInt( $($t).jqGrid('getCol', right, false, 'max'), 10);
					res = $.jgrid.from($t.p.data)
						.greater(left,maxright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][left] = parseInt(res[key][left],10) +2 ;
							}
						}
					}
					res = $.jgrid.from($t.p.data)
						.greater(right,maxright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][right] = parseInt(res[key][right],10) +2 ;
							}
						}
					}
					data[left] = maxright+1;
					data[right] = maxright + 2;
				}
			}
			if( parentid === null || $($t).jqGrid("isNodeLoaded",parentdata) || leaf ) {
					$($t).jqGrid('addRowData', nodeid, data, method, rowind);
					$($t).jqGrid('setTreeNode', i, len);
			}
			if(parentdata && !parentdata[expanded] && expandData) {
				$($t.rows[prow])
					.find("div.treeclick")
					.click();
			}
		}
		//});
	}
});
})(jQuery);
/*
 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * $Version: 2007.08.19 +r2
 */

(function($){
$.fn.jqDrag=function(h){return i(this,h,'d');};
$.fn.jqResize=function(h,ar){return i(this,h,'r',ar);};
$.jqDnR={
	dnr:{},
	e:0,
	drag:function(v){
		if(M.k == 'd'){E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY});}
		else {
			E.css({width:Math.max(v.pageX-M.pX+M.W,0),height:Math.max(v.pageY-M.pY+M.H,0)});
			if(M1){E1.css({width:Math.max(v.pageX-M1.pX+M1.W,0),height:Math.max(v.pageY-M1.pY+M1.H,0)});}
		}
		return false;
	},
	stop:function(){
		//E.css('opacity',M.o);
		$(document).unbind('mousemove',J.drag).unbind('mouseup',J.stop);
	}
};
var J=$.jqDnR,M=J.dnr,E=J.e,E1,M1,
i=function(e,h,k,aR){
	return e.each(function(){
		h=(h)?$(h,e):e;
		h.bind('mousedown',{e:e,k:k},function(v){
			var d=v.data,p={};E=d.e;E1 = aR ? $(aR) : false;
			// attempt utilization of dimensions plugin to fix IE issues
			if(E.css('position') != 'relative'){try{E.position(p);}catch(e){}}
			M={
				X:p.left||f('left')||0,
				Y:p.top||f('top')||0,
				W:f('width')||E[0].scrollWidth||0,
				H:f('height')||E[0].scrollHeight||0,
				pX:v.pageX,
				pY:v.pageY,
				k:d.k
				//o:E.css('opacity')
			};
			// also resize
			if(E1 && d.k != 'd'){
				M1={
					X:p.left||f1('left')||0,
					Y:p.top||f1('top')||0,
					W:E1[0].offsetWidth||f1('width')||0,
					H:E1[0].offsetHeight||f1('height')||0,
					pX:v.pageX,
					pY:v.pageY,
					k:d.k
				};
			} else {M1 = false;}			
			//E.css({opacity:0.8});
			if($("input.hasDatepicker",E[0])[0]) {
			try {$("input.hasDatepicker",E[0]).datepicker('hide');}catch (dpe){}
			}
			$(document).mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);
			return false;
		});
	});
},
f=function(k){return parseInt(E.css(k),10)||false;},
f1=function(k){return parseInt(E1.css(k),10)||false;};
})(jQuery);/*
 * jqModal - Minimalist Modaling with jQuery
 *   (http://dev.iceburg.net/jquery/jqmodal/)
 *
 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * $Version: 07/06/2008 +r13
 */
(function($) {
$.fn.jqm=function(o){
var p={
overlay: 50,
closeoverlay : true,
overlayClass: 'jqmOverlay',
closeClass: 'jqmClose',
trigger: '.jqModal',
ajax: F,
ajaxText: '',
target: F,
modal: F,
toTop: F,
onShow: F,
onHide: F,
onLoad: F
};
return this.each(function(){if(this._jqm)return H[this._jqm].c=$.extend({},H[this._jqm].c,o);s++;this._jqm=s;
H[s]={c:$.extend(p,$.jqm.params,o),a:F,w:$(this).addClass('jqmID'+s),s:s};
if(p.trigger)$(this).jqmAddTrigger(p.trigger);
});};

$.fn.jqmAddClose=function(e){return hs(this,e,'jqmHide');};
$.fn.jqmAddTrigger=function(e){return hs(this,e,'jqmShow');};
$.fn.jqmShow=function(t){return this.each(function(){$.jqm.open(this._jqm,t);});};
$.fn.jqmHide=function(t){return this.each(function(){$.jqm.close(this._jqm,t)});};

$.jqm = {
hash:{},
open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(parseInt(h.w.css('z-index')));z=(z>0)?z:3000;var o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});if(h.a)return F;h.t=t;h.a=true;h.w.css('z-index',z);
 if(c.modal) {if(!A[0])setTimeout(function(){L('bind');},1);A.push(s);}
 else if(c.overlay > 0) {if(c.closeoverlay) h.w.jqmAddClose(o);}
 else o=F;

 h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):F;

 if(c.ajax) {var r=c.target||h.w,u=c.ajax;r=(typeof r == 'string')?$(r,h.w):$(r);u=(u.substr(0,1) == '@')?$(t).attr(u.substring(1)):u;
  r.html(c.ajaxText).load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h);});}
 else if(cc)h.w.jqmAddClose($(cc,h.w));

 if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);	
 (c.onShow)?c.onShow(h):h.w.show();e(h);return F;
},
close:function(s){var h=H[s];if(!h.a)return F;h.a=F;
 if(A[0]){A.pop();if(!A[0])L('unbind');}
 if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();
 if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove();} return F;
},
params:{}};
var s=0,H=$.jqm.hash,A=[],F=false,
e=function(h){f(h);},
f=function(h){try{$(':input:visible',h.w)[0].focus();}catch(_){}},
L=function(t){$(document)[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m);},
m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r){$('.jqmID'+h.s).each(function(){var $self=$(this),offset=$self.offset();if(offset.top<=e.pageY && e.pageY<=offset.top+$self.height() && offset.left<=e.pageX && e.pageX<=offset.left+$self.width()){r=false;return false;}});f(h);}return !r;},
hs=function(w,t,c){return w.each(function(){var s=this._jqm;$(t).each(function() {
 if(!this[c]){this[c]=[];$(this).click(function(){for(var i in {jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return F;});}this[c].push(s);});});};
})(jQuery);/*
**
 * formatter for values but most of the values if for jqGrid
 * Some of this was inspired and based on how YUI does the table datagrid but in jQuery fashion
 * we are trying to keep it as light as possible
 * Joshua Burnett josh@9ci.com	
 * http://www.greenbill.com
 *
 * Changes from Tony Tomov tony@trirand.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * 
**/
/*jshint eqeqeq:false */
/*global jQuery */

(function($) {
"use strict";	
	$.fmatter = {};
	//opts can be id:row id for the row, rowdata:the data for the row, colmodel:the column model for this column
	//example {id:1234,}
	$.extend($.fmatter,{
		isObject : function(o) {
			return (o && (typeof o === 'object' || $.isFunction(o))) || false;
		},
		isString : function(o) {
			return typeof o === 'string';
		},
		isNumber : function(o) {
			return typeof o === 'number' && isFinite(o);
		},
		isValue : function (o) {
			return (this.isObject(o) || this.isString(o) || this.isNumber(o) || typeof o === 'boolean');
		},
		isEmpty : function(o) {
			if(!this.isString(o) && this.isValue(o)) {
				return false;
			}
			if (!this.isValue(o)){
				return true;
			}
			o = $.trim(o).replace(/\&nbsp\;/ig,'').replace(/\&#160\;/ig,'');
			return o==="";	
		}
	});
	$.fn.fmatter = function(formatType, cellval, opts, rwd, act) {
		// build main options before element iteration
		var v=cellval;
		opts = $.extend({}, $.jgrid.formatter, opts);

		try {
			v = $.fn.fmatter[formatType].call(this, cellval, opts, rwd, act);
		} catch(fe){}
		return v;
	};
	$.fmatter.util = {
		// Taken from YAHOO utils
		NumberFormat : function(nData,opts) {
			var isNumber = $.fmatter.isNumber;
			if(!isNumber(nData)) {
				nData *= 1;
			}
			if(isNumber(nData)) {
				var bNegative = (nData < 0);
				var sOutput = String(nData);
				var sDecimalSeparator = opts.decimalSeparator || ".";
				var nDotIndex;
				if(isNumber(opts.decimalPlaces)) {
					// Round to the correct decimal place
					var nDecimalPlaces = opts.decimalPlaces;
					var nDecimal = Math.pow(10, nDecimalPlaces);
					sOutput = String(Math.round(nData*nDecimal)/nDecimal);
					nDotIndex = sOutput.lastIndexOf(".");
					if(nDecimalPlaces > 0) {
					// Add the decimal separator
						if(nDotIndex < 0) {
							sOutput += sDecimalSeparator;
							nDotIndex = sOutput.length-1;
						}
						// Replace the "."
						else if(sDecimalSeparator !== "."){
							sOutput = sOutput.replace(".",sDecimalSeparator);
						}
					// Add missing zeros
						while((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
							sOutput += "0";
						}
					}
				}
				if(opts.thousandsSeparator) {
					var sThousandsSeparator = opts.thousandsSeparator;
					nDotIndex = sOutput.lastIndexOf(sDecimalSeparator);
					nDotIndex = (nDotIndex > -1) ? nDotIndex : sOutput.length;
					var sNewOutput = sOutput.substring(nDotIndex);
					var nCount = -1, i;
					for (i=nDotIndex; i>0; i--) {
						nCount++;
						if ((nCount%3 === 0) && (i !== nDotIndex) && (!bNegative || (i > 1))) {
							sNewOutput = sThousandsSeparator + sNewOutput;
						}
						sNewOutput = sOutput.charAt(i-1) + sNewOutput;
					}
					sOutput = sNewOutput;
				}
				// Prepend prefix
				sOutput = (opts.prefix) ? opts.prefix + sOutput : sOutput;
				// Append suffix
				sOutput = (opts.suffix) ? sOutput + opts.suffix : sOutput;
				return sOutput;
				
			}
			return nData;
		}
	};
	$.fn.fmatter.defaultFormat = function(cellval, opts) {
		return ($.fmatter.isValue(cellval) && cellval!=="" ) ?  cellval : opts.defaultValue || "&#160;";
	};
	$.fn.fmatter.email = function(cellval, opts) {
		if(!$.fmatter.isEmpty(cellval)) {
			return "<a href=\"mailto:" + cellval + "\">" + cellval + "</a>";
		}
		return $.fn.fmatter.defaultFormat(cellval,opts );
	};
	$.fn.fmatter.checkbox =function(cval, opts) {
		var op = $.extend({},opts.checkbox), ds;
		if(opts.colModel !== undefined && opts.colModel.formatoptions !== undefined) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if(op.disabled===true) {ds = "disabled=\"disabled\"";} else {ds="";}
		if($.fmatter.isEmpty(cval) || cval === undefined ) {cval = $.fn.fmatter.defaultFormat(cval,op);}
		cval=String(cval);
		cval=(cval+"").toLowerCase();
		var bchk = cval.search(/(false|f|0|no|n|off|undefined)/i)<0 ? " checked='checked' " : "";
		return "<input type=\"checkbox\" " + bchk  + " value=\""+ cval+"\" offval=\"no\" "+ds+ "/>";
	};
	$.fn.fmatter.link = function(cellval, opts) {
		var op = {target:opts.target};
		var target = "";
		if(opts.colModel !== undefined && opts.colModel.formatoptions !== undefined) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if(op.target) {target = 'target=' + op.target;}
		if(!$.fmatter.isEmpty(cellval)) {
			return "<a "+target+" href=\"" + cellval + "\">" + cellval + "</a>";
		}
		return $.fn.fmatter.defaultFormat(cellval,opts);
	};
	$.fn.fmatter.showlink = function(cellval, opts) {
		var op = {baseLinkUrl: opts.baseLinkUrl,showAction:opts.showAction, addParam: opts.addParam || "", target: opts.target, idName: opts.idName},
		target = "", idUrl;
		if(opts.colModel !== undefined && opts.colModel.formatoptions !== undefined) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if(op.target) {target = 'target=' + op.target;}
		idUrl = op.baseLinkUrl+op.showAction + '?'+ op.idName+'='+opts.rowId+op.addParam;
		if($.fmatter.isString(cellval) || $.fmatter.isNumber(cellval)) {	//add this one even if its blank string
			return "<a "+target+" href=\"" + idUrl + "\">" + cellval + "</a>";
		}
		return $.fn.fmatter.defaultFormat(cellval,opts);
	};
	var numberHelper = function(cellval, opts, formatType) {
		var op = $.extend({},opts[formatType]);
		if(opts.colModel !== undefined && opts.colModel.formatoptions !== undefined) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if($.fmatter.isEmpty(cellval)) {
			return op.defaultValue;
		}
		return $.fmatter.util.NumberFormat(cellval,op);
	};
	$.fn.fmatter.integer = function(cellval, opts) {
		return numberHelper(cellval,opts,"integer");
	};
	$.fn.fmatter.number = function (cellval, opts) {
		return numberHelper(cellval,opts,"number");
	};
	$.fn.fmatter.currency = function (cellval, opts) {
		return numberHelper(cellval,opts,"currency");
	};
	$.fn.fmatter.date = function (cellval, opts, rwd, act) {
		var op = $.extend({},opts.date);
		if(opts.colModel !== undefined && opts.colModel.formatoptions !== undefined) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if(!op.reformatAfterEdit && act === 'edit'){
			return $.fn.fmatter.defaultFormat(cellval, opts);
		}
		if(!$.fmatter.isEmpty(cellval)) {
			return $.jgrid.parseDate(op.srcformat,cellval,op.newformat,op);
		}
		return $.fn.fmatter.defaultFormat(cellval, opts);
	};
	$.fn.fmatter.select = function (cellval,opts) {
		// jqGrid specific
		cellval = String(cellval);
		var oSelect = false, ret=[], sep, delim;
		if(opts.colModel.formatoptions !== undefined){
			oSelect= opts.colModel.formatoptions.value;
			sep = opts.colModel.formatoptions.separator === undefined ? ":" : opts.colModel.formatoptions.separator;
			delim = opts.colModel.formatoptions.delimiter === undefined ? ";" : opts.colModel.formatoptions.delimiter;
		} else if(opts.colModel.editoptions !== undefined){
			oSelect= opts.colModel.editoptions.value;
			sep = opts.colModel.editoptions.separator === undefined ? ":" : opts.colModel.editoptions.separator;
			delim = opts.colModel.editoptions.delimiter === undefined ? ";" : opts.colModel.editoptions.delimiter;
		}
		if (oSelect) {
			var	msl =  (opts.colModel.editoptions != null && opts.colModel.editoptions.multiple === true) === true ? true : false,
			scell = [], sv;
			if(msl) {scell = cellval.split(",");scell = $.map(scell,function(n){return $.trim(n);});}
			if ($.fmatter.isString(oSelect)) {
				// mybe here we can use some caching with care ????
				var so = oSelect.split(delim), j=0, i;
				for(i=0; i<so.length;i++){
					sv = so[i].split(sep);
					if(sv.length > 2 ) {
						sv[1] = $.map(sv,function(n,i){if(i>0) {return n;}}).join(sep);
					}
					if(msl) {
						if($.inArray(sv[0],scell)>-1) {
							ret[j] = sv[1];
							j++;
						}
					} else if($.trim(sv[0]) === $.trim(cellval)) {
						ret[0] = sv[1];
						break;
					}
				}
			} else if($.fmatter.isObject(oSelect)) {
				// this is quicker
				if(msl) {
					ret = $.map(scell, function(n){
						return oSelect[n];
					});
				} else {
					ret[0] = oSelect[cellval] || "";
				}
			}
		}
		cellval = ret.join(", ");
		return  cellval === "" ? $.fn.fmatter.defaultFormat(cellval,opts) : cellval;
	};
	$.fn.fmatter.rowactions = function(act) {
		var $tr = $(this).closest("tr.jqgrow"),
			rid = $tr.attr("id"),
			$id = $(this).closest("table.ui-jqgrid-btable").attr('id').replace(/_frozen([^_]*)$/,'$1'),
			$grid = $("#"+$.jgrid.jqID($id)),
			$t = $grid[0],
			p = $t.p,
			cm = p.colModel[$.jgrid.getCellIndex(this)],
			$actionsDiv = cm.frozen ? $("tr#"+$.jgrid.jqID(rid)+" td:eq("+$.jgrid.getCellIndex(this)+") > div",$grid) :$(this).parent(),
			op = {
				extraparam: {}
			},
			saverow = function(rowid, res) {
				if($.isFunction(op.afterSave)) { op.afterSave.call($t, rowid, res); }
				$actionsDiv.find("div.ui-inline-edit,div.ui-inline-del").show();
				$actionsDiv.find("div.ui-inline-save,div.ui-inline-cancel").hide();
			},
			restorerow = function(rowid) {
				if($.isFunction(op.afterRestore)) { op.afterRestore.call($t, rowid); }
				$actionsDiv.find("div.ui-inline-edit,div.ui-inline-del").show();
				$actionsDiv.find("div.ui-inline-save,div.ui-inline-cancel").hide();
			};

		if (cm.formatoptions !== undefined) {
			op = $.extend(op,cm.formatoptions);
		}
		if (p.editOptions !== undefined) {
			op.editOptions = p.editOptions;
		}
		if (p.delOptions !== undefined) {
			op.delOptions = p.delOptions;
		}
		if ($tr.hasClass("jqgrid-new-row")){
			op.extraparam[p.prmNames.oper] = p.prmNames.addoper;
		}
		var actop = {
			keys: op.keys,
			oneditfunc: op.onEdit,
			successfunc: op.onSuccess,
			url: op.url,
			extraparam: op.extraparam,
			aftersavefunc: saverow,
			errorfunc: op.onError,
			afterrestorefunc: restorerow,
			restoreAfterError: op.restoreAfterError,
			mtype: op.mtype
		};
		switch(act)
		{
			case 'edit':
				$grid.jqGrid('editRow', rid, actop);
				$actionsDiv.find("div.ui-inline-edit,div.ui-inline-del").hide();
				$actionsDiv.find("div.ui-inline-save,div.ui-inline-cancel").show();
				$grid.triggerHandler("jqGridAfterGridComplete");
				break;
			case 'save':
				if ($grid.jqGrid('saveRow', rid, actop)) {
					$actionsDiv.find("div.ui-inline-edit,div.ui-inline-del").show();
					$actionsDiv.find("div.ui-inline-save,div.ui-inline-cancel").hide();
					$grid.triggerHandler("jqGridAfterGridComplete");
				}
				break;
			case 'cancel' :
				$grid.jqGrid('restoreRow', rid, restorerow);
				$actionsDiv.find("div.ui-inline-edit,div.ui-inline-del").show();
				$actionsDiv.find("div.ui-inline-save,div.ui-inline-cancel").hide();
				$grid.triggerHandler("jqGridAfterGridComplete");
				break;
			case 'del':
				$grid.jqGrid('delGridRow', rid, op.delOptions);
				break;
			case 'formedit':
				$grid.jqGrid('setSelection', rid);
				$grid.jqGrid('editGridRow', rid, op.editOptions);
				break;
		}
	};
	$.fn.fmatter.actions = function(cellval,opts) {
		var op={keys:false, editbutton:true, delbutton:true, editformbutton: false}, nav = $.jgrid.nav, edit = $.jgrid.edit,
			rowid=opts.rowId, str="",ocl;
		if(opts.colModel.formatoptions !== undefined) {
			op = $.extend(op,opts.colModel.formatoptions);
		}
		if(rowid === undefined || $.fmatter.isEmpty(rowid)) {return "";}
		if(op.editformbutton){
			ocl = "id='jEditButton_"+rowid+"' onclick=jQuery.fn.fmatter.rowactions.call(this,'formedit'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";
			str += "<div title='"+nav.edittitle+"' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' "+ocl+"><span class='ui-icon ui-icon-pencil'></span></div>";
		} else if(op.editbutton){
			ocl = "id='jEditButton_"+rowid+"' onclick=jQuery.fn.fmatter.rowactions.call(this,'edit'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
			str += "<div title='"+nav.edittitle+"' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' "+ocl+"><span class='ui-icon ui-icon-pencil'></span></div>";
		}
		if(op.delbutton) {
			ocl = "id='jDeleteButton_"+rowid+"' onclick=jQuery.fn.fmatter.rowactions.call(this,'del'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";
			str += "<div title='"+nav.deltitle+"' style='float:left;margin-left:5px;' class='ui-pg-div ui-inline-del' "+ocl+"><span class='ui-icon ui-icon-trash'></span></div>";
		}
		ocl = "id='jSaveButton_"+rowid+"' onclick=jQuery.fn.fmatter.rowactions.call(this,'save'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";
		str += "<div title='"+edit.bSubmit+"' style='float:left;display:none' class='ui-pg-div ui-inline-save' "+ocl+"><span class='ui-icon ui-icon-disk'></span></div>";
		ocl = "id='jCancelButton_"+rowid+"' onclick=jQuery.fn.fmatter.rowactions.call(this,'cancel'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";
		str += "<div title='"+edit.bCancel+"' style='float:left;display:none;margin-left:5px;' class='ui-pg-div ui-inline-cancel' "+ocl+"><span class='ui-icon ui-icon-cancel'></span></div>";
		return "<div style='margin-left:8px;'>" + str + "</div>";
	};
	$.unformat = function (cellval,options,pos,cnt) {
		// specific for jqGrid only
		var ret, formatType = options.colModel.formatter,
		op =options.colModel.formatoptions || {}, sep,
		re = /([\.\*\_\'\(\)\{\}\+\?\\])/g,
		unformatFunc = options.colModel.unformat||($.fn.fmatter[formatType] && $.fn.fmatter[formatType].unformat);
		if (cellval instanceof jQuery && cellval.length > 0) {
			cellval = cellval[0];
		}
		if (options.colModel.autoResizable && cellval != null && $(cellval.firstChild).hasClass(this.p.autoResizing.wrapperClassName)) {
			cellval = cellval.firstChild;
		}
		if(unformatFunc !== undefined && $.isFunction(unformatFunc) ) {
			ret = unformatFunc.call(this, $(cellval).text(), options, cellval);
		} else if(formatType !== undefined && $.fmatter.isString(formatType) ) {
			var opts = $.jgrid.formatter || {}, stripTag;
			switch(formatType) {
				case 'integer' :
					op = $.extend({},opts.integer,op);
					sep = op.thousandsSeparator.replace(re,"\\$1");
					stripTag = new RegExp(sep, "g");
					ret = $(cellval).text().replace(stripTag,'');
					break;
				case 'number' :
					op = $.extend({},opts.number,op);
					sep = op.thousandsSeparator.replace(re,"\\$1");
					stripTag = new RegExp(sep, "g");
					ret = $(cellval).text().replace(stripTag,"").replace(op.decimalSeparator,'.');
					break;
				case 'currency':
					op = $.extend({},opts.currency,op);
					sep = op.thousandsSeparator.replace(re,"\\$1");
					stripTag = new RegExp(sep, "g");
					ret = $(cellval).text();
					if (op.prefix && op.prefix.length) {
						ret = ret.substr(op.prefix.length);
					}
					if (op.suffix && op.suffix.length) {
						ret = ret.substr(0, ret.length - op.suffix.length);
					}
					ret = ret.replace(stripTag,'').replace(op.decimalSeparator,'.');
					break;
				case 'checkbox':
					var cbv = (options.colModel.editoptions != null && typeof options.colModel.editoptions.value === "string") ?
							options.colModel.editoptions.value.split(":") :
							["Yes","No"];
					ret = $('input',cellval).is(":checked") ? cbv[0] : cbv[1];
					break;
				case 'select' :
					ret = $.unformat.select(cellval,options,pos,cnt);
					break;
				case 'actions':
					return "";
				default:
					ret= $(cellval).text();
			}
		}
		ret = ret !== undefined ? ret : cnt===true ? $(cellval).text() : $.jgrid.htmlDecode($(cellval).html());
		return ret;
	};
	$.unformat.select = function (cellval,options,pos,cnt) {
		// Spacial case when we have local data and perform a sort
		// cnt is set to true only in sortDataArray
		var ret = [];
		var cell = $(cellval).text();
		if(cnt===true) {return cell;}
		var op = $.extend({}, options.colModel.formatoptions !== undefined ? options.colModel.formatoptions: options.colModel.editoptions),
		sep = op.separator === undefined ? ":" : op.separator,
		delim = op.delimiter === undefined ? ";" : op.delimiter;
		
		if(op.value){
			var oSelect = op.value,
			msl =  op.multiple === true ? true : false,
			scell = [], sv;
			if(msl) {scell = cell.split(",");scell = $.map(scell,function(n){return $.trim(n);});}
			if ($.fmatter.isString(oSelect)) {
				var so = oSelect.split(delim), j=0, i;
				for(i=0; i<so.length;i++){
					sv = so[i].split(sep);
					if(sv.length > 2 ) {
						sv[1] = $.map(sv,function(n,i){if(i>0) {return n;}}).join(sep);
					}					
					if(msl) {
						if($.inArray(sv[1],scell)>-1) {
							ret[j] = sv[0];
							j++;
						}
					} else if($.trim(sv[1]) === $.trim(cell)) {
						ret[0] = sv[0];
						break;
					}
				}
			} else if($.fmatter.isObject(oSelect) || $.isArray(oSelect) ){
				if(!msl) {scell[0] =  cell;}
				ret = $.map(scell, function(n){
					var rv;
					$.each(oSelect, function(i,val){
						if (val === n) {
							rv = i;
							return false;
						}
					});
					if( rv !== undefined ) {return rv;}
				});
			}
			return ret.join(", ");
		}
		return cell || "";
	};
	$.unformat.date = function (cellval, opts) {
		var op = $.jgrid.formatter.date || {};
		if(opts.formatoptions !== undefined) {
			op = $.extend({},op,opts.formatoptions);
		}		
		if(!$.fmatter.isEmpty(cellval)) {
			return $.jgrid.parseDate(op.newformat,cellval,op.srcformat,op);
		}
		return $.fn.fmatter.defaultFormat(cellval, opts);
	};
})(jQuery);
/*
	The below work is licensed under Creative Commons GNU LGPL License.

	Original work:

	License:     http://creativecommons.org/licenses/LGPL/2.1/
	Author:      Stefan Goessner/2006
	Web:         http://goessner.net/ 

	Modifications made:

	Version:     0.9-p5
	Description: Restructured code, JSLint validated (no strict whitespaces),
	             added handling of empty arrays, empty strings, and int/floats values.
	Author:      Michael Schøler/2008-01-29
	Web:         http://michael.hinnerup.net/blog/2008/01/26/converting-json-to-xml-and-xml-to-json/
	
	Description: json2xml added support to convert functions as CDATA
	             so it will be easy to write characters that cause some problems when convert
	Author:      Tony Tomov
*/

/*global alert */
var xmlJsonClass = {
	// Param "xml": Element or document DOM node.
	// Param "tab": Tab or indent string for pretty output formatting omit or use empty string "" to supress.
	// Returns:     JSON string
	xml2json: function(xml, tab) {
		if (xml.nodeType === 9) {
			// document node
			xml = xml.documentElement;
		}
		var nws = this.removeWhite(xml);
		var obj = this.toObj(nws);
		var json = this.toJson(obj, xml.nodeName, "\t");
		return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
	},

	// Param "o":   JavaScript object
	// Param "tab": tab or indent string for pretty output formatting omit or use empty string "" to supress.
	// Returns:     XML string
	json2xml: function(o, tab) {
		var toXml = function(v, name, ind) {
			var xml = "";
			var i, n;
			if (v instanceof Array) {
				if (v.length === 0) {
					xml += ind + "<"+name+">__EMPTY_ARRAY_</"+name+">\n";
				}
				else {
					for (i = 0, n = v.length; i < n; i += 1) {
						var sXml = ind + toXml(v[i], name, ind+"\t") + "\n";
						xml += sXml;
					}
				}
			}
			else if (typeof(v) === "object") {
				var hasChild = false;
				xml += ind + "<" + name;
				var m;
				for (m in v) if (v.hasOwnProperty(m)) {
					if (m.charAt(0) === "@") {
						xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
					}
					else {
						hasChild = true;
					}
				}
				xml += hasChild ? ">" : "/>";
				if (hasChild) {
					for (m in v) if (v.hasOwnProperty(m)) {
						if (m === "#text") {
							xml += v[m];
						}
						else if (m === "#cdata") {
							xml += "<![CDATA[" + v[m] + "]]>";
						}
						else if (m.charAt(0) !== "@") {
							xml += toXml(v[m], m, ind+"\t");
						}
					}
					xml += (xml.charAt(xml.length - 1) === "\n" ? ind : "") + "</" + name + ">";
				}
			}
			else if (typeof(v) === "function") {
				xml += ind + "<" + name + ">" + "<![CDATA[" + v + "]]>" + "</" + name + ">";
			}
			else {
				if (v === undefined ) { v = ""; }
				if (v.toString() === "\"\"" || v.toString().length === 0) {
					xml += ind + "<" + name + ">__EMPTY_STRING_</" + name + ">";
				} 
				else {
					xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
				}
			}
			return xml;
		};
		var xml = "";
		var m;
		for (m in o) if (o.hasOwnProperty(m)) {
			xml += toXml(o[m], m, "");
		}
		return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
	},
	// Internal methods
	toObj: function(xml) {
		var o = {};
		var FuncTest = /function/i;
		if (xml.nodeType === 1) {
			// element node ..
			if (xml.attributes.length) {
				// element with attributes ..
				var i;
				for (i = 0; i < xml.attributes.length; i += 1) {
					o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
				}
			}
			if (xml.firstChild) {
				// element has child nodes ..
				var textChild = 0, cdataChild = 0, hasElementChild = false;
				var n;
				for (n = xml.firstChild; n; n = n.nextSibling) {
					if (n.nodeType === 1) {
						hasElementChild = true;
					}
					else if (n.nodeType === 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
						// non-whitespace text
						textChild += 1;
					}
					else if (n.nodeType === 4) {
						// cdata section node
						cdataChild += 1;
					}
				}
				if (hasElementChild) {
					if (textChild < 2 && cdataChild < 2) {
						// structured element with evtl. a single text or/and cdata node ..
						this.removeWhite(xml);
						for (n = xml.firstChild; n; n = n.nextSibling) {
							if (n.nodeType === 3) {
								// text node
								o["#text"] = this.escape(n.nodeValue);
							}
							else if (n.nodeType === 4) {
								// cdata node
								if (FuncTest.test(n.nodeValue)) {
									o[n.nodeName] = [o[n.nodeName], n.nodeValue];
								} else {
									o["#cdata"] = this.escape(n.nodeValue);
								}
							}
							else if (o[n.nodeName]) {
								// multiple occurence of element ..
								if (o[n.nodeName] instanceof Array) {
									o[n.nodeName][o[n.nodeName].length] = this.toObj(n);
								}
								else {
									o[n.nodeName] = [o[n.nodeName], this.toObj(n)];
								}
							}
							else {
								// first occurence of element ..
								o[n.nodeName] = this.toObj(n);
							}
						}
					}
					else {
						// mixed content
						if (!xml.attributes.length) {
							o = this.escape(this.innerXml(xml));
						}
						else {
							o["#text"] = this.escape(this.innerXml(xml));
						}
					}
				}
				else if (textChild) {
					// pure text
					if (!xml.attributes.length) {
						o = this.escape(this.innerXml(xml));
						if (o === "__EMPTY_ARRAY_") {
							o = "[]";
						} else if (o === "__EMPTY_STRING_") {
							o = "";
						}
					}
					else {
						o["#text"] = this.escape(this.innerXml(xml));
					}
				}
				else if (cdataChild) {
					// cdata
					if (cdataChild > 1) {
						o = this.escape(this.innerXml(xml));
					}
					else {
						for (n = xml.firstChild; n; n = n.nextSibling) {
							if(FuncTest.test(xml.firstChild.nodeValue)) {
								o = xml.firstChild.nodeValue;
								break;
							} else {
								o["#cdata"] = this.escape(n.nodeValue);
							}
						}
					}
				}
			}
			if (!xml.attributes.length && !xml.firstChild) {
				o = null;
			}
		}
		else if (xml.nodeType === 9) {
			// document.node
			o = this.toObj(xml.documentElement);
		}
		else {
			alert("unhandled node type: " + xml.nodeType);
		}
		return o;
	},
	toJson: function(o, name, ind, wellform) {
		if(wellform === undefined) wellform = true;
		var json = name ? ("\"" + name + "\"") : "", tab = "\t", newline = "\n";
		if(!wellform) {
			tab= ""; newline= "";
		}

		if (o === "[]") {
			json += (name ? ":[]" : "[]");
		}
		else if (o instanceof Array) {
			var n, i, ar=[];
			for (i = 0, n = o.length; i < n; i += 1) {
				ar[i] = this.toJson(o[i], "", ind + tab, wellform);
			}
			json += (name ? ":[" : "[") + (ar.length > 1 ? (newline + ind + tab + ar.join(","+newline + ind + tab) + newline + ind) : ar.join("")) + "]";
		}
		else if (o === null) {
			json += (name && ":") + "null";
		}
		else if (typeof(o) === "object") {
			var arr = [], m;
			for (m in o) {
				if (o.hasOwnProperty(m)) {
					arr[arr.length] = this.toJson(o[m], m, ind + tab, wellform);
			}
		}
			json += (name ? ":{" : "{") + (arr.length > 1 ? (newline + ind + tab + arr.join(","+newline + ind + tab) + newline + ind) : arr.join("")) + "}";
		}
		else if (typeof(o) === "string") {
			/*
			var objRegExp  = /(^-?\d+\.?\d*$)/;
			var FuncTest = /function/i;
			var os = o.toString();
			if (objRegExp.test(os) || FuncTest.test(os) || os==="false" || os==="true") {
				// int or float
				json += (name && ":")  + "\"" +os + "\"";
			} 
			else {
			*/
				json += (name && ":") + "\"" + o.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + "\"";
			//}
			}
		else {
			json += (name && ":") +  o.toString();
		}
		return json;
	},
	innerXml: function(node) {
		var s = "";
		if ("innerHTML" in node) {
			s = node.innerHTML;
		}
		else {
			var asXml = function(n) {
				var s = "", i;
				if (n.nodeType === 1) {
					s += "<" + n.nodeName;
					for (i = 0; i < n.attributes.length; i += 1) {
						s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
					}
					if (n.firstChild) {
						s += ">";
						for (var c = n.firstChild; c; c = c.nextSibling) {
							s += asXml(c);
						}
						s += "</" + n.nodeName + ">";
					}
					else {
						s += "/>";
					}
				}
				else if (n.nodeType === 3) {
					s += n.nodeValue;
				}
				else if (n.nodeType === 4) {
					s += "<![CDATA[" + n.nodeValue + "]]>";
				}
				return s;
			};
			for (var c = node.firstChild; c; c = c.nextSibling) {
				s += asXml(c);
			}
		}
		return s;
	},
	escape: function(txt) {
		return txt.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r');
	},
	removeWhite: function(e) {
		e.normalize();
		var n;
		for (n = e.firstChild; n; ) {
			if (n.nodeType === 3) {
				// text node
				if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
					// pure whitespace text node
					var nxt = n.nextSibling;
					e.removeChild(n);
					n = nxt;
				}
				else {
					n = n.nextSibling;
				}
			}
			else if (n.nodeType === 1) {
				// element node
				this.removeWhite(n);
				n = n.nextSibling;
			}
			else {
				// any other node
				n = n.nextSibling;
			}
		}
		return e;
	}
};