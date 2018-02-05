"use strict"

function model() {
    var parser = new DOMParser(),
    httpRequest = new XMLHttpRequest(),
    hash = new Object();

    this.init = function () {
        httpRequest.onreadystatechange = this.parse;
        httpRequest.open('GET', 'https://devweb2017.cis.strath.ac.uk/~aes02112/ecbxml.php', true);
        httpRequest.send();
    }

    this.parse = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var response = parser.parseFromString(httpRequest.responseText, 'text/xml');
                var list =  response.getElementsByTagName("Cube");
                for(var i = 2; i < list.length; i++){
                    hash[list[i].getAttribute('currency')] = list[i].getAttribute('rate');
                    //console.log(list[i]);
                }
                hash['EUR'] = 1; // euro not included in live data so add manually

            } else {
                alert('There was a problem with the request.');
            };
        };
    }

    this.getRate = function (curr) {
        return hash[curr];
    }
}