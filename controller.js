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
                if(!(from === "EUR")){
                    console.log("not converting from euro boo")
                    newAmount = convert(fromRate, amount);
                    console.log("intermediate amount: " + newAmount)
                    cview.setResult(convert(toRate, newAmount));
                }
                else {
                    console.log("converting from euro yay")
                    cview.setResult(convert(toRate, amount));
                }
            }
        });
    };

    function convert(t, a) {
        //assumes you are always converting from Euro to another currency
        if(t < 1){
            console.log("converting to a smaller currency to multiply");
            console.log("i think im converting to " + t);
            console.log("i think im converting " + a + " money");
            return a*t;
        }else if(t >= 1){
            console.log("converting to larger so devide");
            console.log("i think im converting to " + t);
            console.log("i think im converting " + a + " money");
            return a/t;
        };
    };

    this.initial = function () {
        ccontroller.updateDisplay();
    };
}

ccontroller = new controller();
window.addEventListener("load", ccontroller.initial);