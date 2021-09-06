/* ================================================================ 
This copyright notice must be kept untouched in this javascript file
 at all times.

The original version of this javascript and the associated stylesheet
is available at http://www.jlion.com/docs/jsThermometer.aspx
Copyright (c) 2005-2011 Joe Lynds. All rights reserved.
This javascript and the associated stylesheet may be modified in any 
way to fit your requirements.
=================================================================== */


function jlionThermometer(MIN, MAX, IS_CURRENCY, INCLUDE_DECIMAL) {
    var mMIN = MIN;
    var mMAX = MAX;
    var mIS_CURRENCY = IS_CURRENCY;
    var mINCLUDE_DECIMAL = INCLUDE_DECIMAL;
    var BARTOP = 90
    var BARHEIGHT = 230;

    Number.prototype.formatNumber = function (c, d, t) { var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0; return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ""); };

    this.Init = function () {
        var thermometer = jQuery('#thermometer');
        var thermobar = jQuery('#bar');

        if (thermobar.length == 0) {
            thermometer.height(300);
            thermometer.width(110);

            var oThermPosition = thermometer.position();

            jQuery('<img/>', {
                id: "background",
                src: "http://www.jlion.com/images/therm.gif"
            }).appendTo(thermometer);

            // jQuery('<div/>', {
            //     id: "label"
            // }).appendTo(thermometer);

            jQuery('<div/>', {
                id: "bar"
            }).appendTo(thermometer);

            thermobar = jQuery('#bar');

            var oBarPosition = thermobar.position();
            var iBarLeft = oThermPosition.left - 53;
            var iBarTop = oThermPosition.top + 100;

            //iBarLeft = 147;
            //iBarTop = 100;

            thermobar.css('position', "absolute");
            thermobar.css('left', iBarLeft + 'px');
            thermobar.css('top', iBarTop + 'px');
    thermobar.css('zIndex','1');

            _DrawMajorTicks(BARHEIGHT);
            _ShowTitle('Thermometer Chart');

            _Refresh(0);
        }
    }

    this.RefreshByID = function (varID) {
        var dValue = jQuery("#" + varID).attr('value');
        _Refresh(dValue);
    }

    this.RefreshByValue = function (dValue) {
        _Refresh(dValue);
    }

    function _Refresh(dValue) {
        var dBarValue;

        if (dValue < mMIN) dBarValue = mMIN
        else if (dValue > mMAX) dBarValue = mMAX
        else dBarValue = dValue;

        var dRange = mMAX - mMIN;

        var dPercent = dBarValue / dRange;

        var dNewHeight = (BARHEIGHT * dPercent);
        var iNewTop = BARTOP + (BARHEIGHT - dNewHeight);

        document.getElementById('bar').style.top = (iNewTop + 'px');
        document.getElementById('bar').style.height = (dNewHeight + 'px');

        _ShowCurrentValue(dValue);
    }

    function _FormattedNumber(dNumber) {
        var Symbol = '';
        var Decimal = 2;

        if (mIS_CURRENCY == true) Symbol = '$ ';
        if (mINCLUDE_DECIMAL == false) Decimal = 0;

        return Symbol + (parseFloat(dNumber)).formatNumber(Decimal, '.', ',');
    }

    function _DrawMajorTicks(BARHEIGHT) {
        var oPosition = jQuery("#label").position();
        var iLabelLeft = oPosition.left;
        var iLabelWidth = jQuery("#label").width();

        var iMajorTickCount = 10;
        var iMajorTickHeight = BARHEIGHT / iMajorTickCount;

        var dValueInc = (MAX - MIN) / iMajorTickCount;

        for (i = 0; i < iMajorTickCount; i++) {
            var vID1 = 'majortick' + i;

            jQuery('<div/>', {
                id: vID1
            }).appendTo('#label');

            jQuery('#' + vID1).css('border-top', 'solid 1px black');

            jQuery('#' + vID1).addClass('MajorTick');
            jQuery('#' + vID1).css('height', iMajorTickHeight);

            jQuery('#' + vID1).css('position', "absolute");
            jQuery('#' + vID1).css('left', (iLabelWidth - 40) + "px");
            jQuery('#' + vID1).css('top', (i * iMajorTickHeight) + 'px');

            //***************************************//

            var vIDLabel = 'ticklabel' + i;

            jQuery('<div/>', {
                id: vIDLabel
            }).appendTo('#label');

            jQuery('#' + vIDLabel).addClass('TickLabel');

            var sNumber = _FormattedNumber((iMajorTickCount - i) * dValueInc + MIN);
            jQuery('#' + vIDLabel).text(sNumber);

            jQuery('#' + vIDLabel).css('height', iMajorTickHeight + 'px');
            jQuery('#' + vIDLabel).css('width', '95');

            jQuery('#' + vIDLabel).css('position', "absolute");
            jQuery('#' + vIDLabel).css('left', (iLabelWidth - 120) + "px");
            jQuery('#' + vIDLabel).css('top', (i * iMajorTickHeight) + 'px');
        }
    }

    function _ShowTitle(sTitle) {
        var iThermWidth = jQuery("#thermometer").width();
        var vIDTitle = 'Title';

        jQuery('<div/>', {
            id: vIDTitle
        }).appendTo('#thermometer');

        jQuery('#' + vIDTitle).addClass('Title');
        jQuery('#' + vIDTitle).css('width', iThermWidth);
        jQuery('#' + vIDTitle).text(sTitle);

        jQuery('#' + vIDTitle).css('position', "absolute");
        jQuery('#' + vIDTitle).css('left', '0px');
        jQuery('#' + vIDTitle).css('top', '0px');
    }

    function _ShowCurrentValue(sValue) {
        var iTherheight = jQuery("#thermometer").height();
        var vIDValue = 'CValue';

        jQuery('<div/>', {
            id: vIDValue
        }).appendTo('#thermometer');

        jQuery('#' + vIDValue).addClass('CurrentValue');
        jQuery('#' + vIDValue).css('height', iTherheight);

        jQuery('#' + vIDValue).text(_FormattedNumber(sValue));

        jQuery('#' + vIDValue).css('position', "absolute");
        jQuery('#' + vIDValue).css('left', '20px');
        jQuery('#' + vIDValue).css('top', (iTherheight - 60) + 'px');
    }

    this.Init();
}
