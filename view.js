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
        rateSelector = document.getElementById("rate"),
        tCurrencySelector = document.getElementById("tcurrency"),

        selectedFrom = "EUR",
        selectedTo = "GBP",
        rateSelected = "0";

    this.int = function () {
        if(localStorage.getItem('from') !== null && localStorage.getItem('to') !== null && localStorage.getItem('rate') !== null){
            selectedFrom = JSON.parse(localStorage.getItem('from'));
            currency.innerText = selectedFrom;
            fCurrencySelector.value = selectedFrom;
            selectedTo = JSON.parse(localStorage.getItem('to'));
            tCurrencySelector.value = selectedTo;
            rateSelected = JSON.parse(localStorage.getItem('rate'));
            //rateSelected.value = rateSelected;
        }

        this.updateCurrencyInResult();
        this.offlineWarning();
        this.setClearButtonFunc();
        this.setNumberButtonFunc();
        this.setCloseButtonFunc();
        this.setMenuButtonFunc();
        this.setToCurrencyListener();
        this.setRateListener();

    };


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
        if(num === 0){
            alert("This amount is too small to exchange with the current rate");
        }
        result.innerText = num;
    };

    this.setClearButtonFunc = function () {
        clear.addEventListener("click", function () {
                result.innerText = "";
                currency.innerText = selectedFrom; //reset from curr for new calc
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
            localStorage.setItem('from', JSON.stringify(selectedFrom));
        });
    };

    this.setCurrency = function (curr) {
        currency.innerText = curr;
    };

    this.offlineWarning = function () {
        if(navigator.onLine === false){
            footer.innerText = "Warning! You are currently offline so this data may be out of date";
            footer.style.background = "firebrick";
            footer.style.transition = "0.5";
            footer.style.color = "white";
        }
    };

    this.setToCurrencyListener = function () {
        tCurrencySelector.addEventListener("change", function () {
            selectedTo = tCurrencySelector.options[tCurrencySelector.selectedIndex].value;
            localStorage.setItem('to', JSON.stringify(selectedTo));
            currency.innerText = selectedFrom;
        });
    };

    this.setRateListener = function () {
        rateSelector.addEventListener("change", function () {
            rateSelected = rateSelector.options[rateSelector.selectedIndex].value;
            localStorage.setItem('rate', JSON.stringify(rateSelected));
            currency.innerText = selectedFrom;
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