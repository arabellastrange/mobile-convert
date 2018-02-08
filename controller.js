"use strict"

var cview = new view(),
    cmodel = new model(),
    ccontroller = null;

function controller() {
    var from, to, rate, toRate, fromRate, amount;

    this.updateDisplay = function () {
        cmodel.init();
        cview.int();

        cview.setEqualClickCallback(function () {
            from = cview.getConvertingFrom();
            to = cview.getConvertingTo();
            fromRate  = cmodel.getRate(cview.getConvertingFrom());
            toRate  = cmodel.getRate(cview.getConvertingTo());
            rate = cview.getRate();
            amount = cview.getAmount();
            var newAmount;

            if(!(amount === "")){
                cview.setResult(convert(fromRate, toRate, amount, rate));
                cview.setCurrency(to);
            }
        });
    };

    function convert(f, t, a, r) {
        var newCurr;
        newCurr = (a*t)/f;
        newCurr = newCurr - ((r*a)/100);

        if(newCurr < 0){
            return 0;
        } else if(newCurr < 10){
            return round(newCurr, 3);
        } else{
            return Math.round(newCurr);
        }

    };

    function round(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    this.initial = function () {
       ccontroller.updateDisplay();
    };
}

ccontroller = new controller();
window.addEventListener("load", ccontroller.initial);