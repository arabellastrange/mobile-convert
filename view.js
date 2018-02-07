"use strict"

function view() {
    var result = document.getElementById("result"),
        numButton = document.getElementsByClassName("numberButton"),
        equal = document.getElementById("="),
        clear = document.getElementById("c"),
        menu = document.getElementById("menuIcon"),
        close = document.getElementById("closeIcon"),
        nav = document.getElementById("navigation"),
        footer = document.getElementsByTagName("footer")[0],
        currency = document.getElementById("currency"),
        fCurrencySelector = document.getElementById("fcurrency"), 
        selectedFrom = "EUR",
        selectedTo = "GBP",
        rateSelected = "0",
        rateSelector = document.getElementById("rate"),
        tCurrencySelector = document.getElementById("tcurrency");


    this.setNumberButtonFunc = function () {
        for(var i = 0; i < numButton.length; i++){
            numButton.item(i).addEventListener("click",
                function (e) {
                    var btnVal = this.innerText;
                    result.innerText = result.innerText + "" + btnVal;
                });
        };
    };

    this.setResult = function (num) {
        result.innerText = num;
    }

    this.setClearButtonFunc = function () {
        clear.addEventListener("click",
            function (e) {
                result.innerText = "";
            });
    };

    this.setEqualClickCallback = function (callback) {
        equal.addEventListener("click", callback);
    };

    this.setMenuButtonFunc = function () {
        menu.addEventListener("click", function () {
            nav.style.width = "85%";
            nav.style.padding = "3em";
            nav.style.textAlign = "right";
            menu.style.display = "none";
        });
    };

    this.setCloseButtonFunc = function () {
        close.addEventListener("click", function () {
            nav.style.width = "0";
            nav.style.padding = "0"
            menu.style.display = "initial";
        });
    };

    this.updateCurrencyInResult = function () {
        fCurrencySelector.addEventListener("change", function () {
            selectedFrom = fCurrencySelector.options[fCurrencySelector.selectedIndex].value;
            currency.innerText = selectedFrom;
        });
    };

    this.setCurrency = function (curr) {
        currency.innerText = curr;
    };

    this.offlineWarning = function () {
        footer.innerText = "Warning! You are currently offline so this data may be out of date";
        footer.style.background = "firebrick";
        footer.style.transition = "0.5";
        footer.style.color = "white";
    };

    this.setToCurrencyListener = function () {
        tCurrencySelector.addEventListener("change", function () {
            selectedTo = tCurrencySelector.options[tCurrencySelector.selectedIndex].value;
        });
    };

    this.setRateListener = function () {
        rateSelector.addEventListener("change", function () {
            rateSelected = rateSelector.options[rateSelector.selectedIndex].value;
        });
    };

    this.getConvertingTo = function () {
        return selectedTo;
    };

    this.getConvertingFrom = function () {
        return selectedFrom;
    };

    this.getRate = function () {
        return rateSelected;
    };

    this.getAmount = function () {
        return result.innerText;
    };
}