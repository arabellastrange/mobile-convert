"use strict"

var cview = new view(),
    cmodel = new model(),
    ccontroller = null;

function controller() {
    var from, to, rate, toRate, fromRate, amount;

    this.updateDisplay = function () {
        cmodel.init();
        cview.setClearButtonFunc();
        cview.setNumberButtonFunc();
        cview.setCloseButtonFunc();
        cview.setMenuButtonFunc();
        cview.setToCurrencyListener();
        cview.setRateListener();
        cview.updateCurrencyInResult();

        cview.setEqualClickCallback(function () {
            from = cview.getConvertingFrom();
            to = cview.getConvertingTo();
            fromRate  = cmodel.getRate(cview.getConvertingFrom());
            toRate  = cmodel.getRate(cview.getConvertingTo());
            rate = cview.getRate();
            amount = cview.getAmount();
            var newAmount;

            if(!(amount === "")){
                cview.setResult(convert(fromRate, toRate, amount));
                cview.setCurrency(to);
            }
        });
    };

    function convert(f, t, a) {
        console.log("i think im converting from " + f);
        console.log("i think im converting to "  + t);
        console.log("i think im converting " + a + " money");
        return round(((a*t)/f), 2);
    };

    function round(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    this.initial = function () {
        if(!navigator.onLine){
            cview.offlineWarning();
        };
        ccontroller.updateDisplay();
    };
}

ccontroller = new controller();
window.addEventListener("load", ccontroller.initial);