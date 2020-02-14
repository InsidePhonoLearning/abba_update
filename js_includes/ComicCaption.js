/* This controller is designed to run AcceptabilityJudgment tasks with comics.*/

define_ibex_controller({
name: "ComicCaption",

jqueryWidget: {
    _init: function () {
        this.cssPrefix = this.options._cssPrefix;
        this.utils = this.options._utils;
        var fullhtml = "<img class=\"".concat(this.cssPrefix+"img").concat("\" src=\"").concat(this.options.html).concat("\">");//Build full html object from the url provided in items
        //console.log(fullhtml); //Make sure url is correct
        var opts = {
            options:     this.options,
            triggers:    [2],
            children:    [
                        "Message", 
                            {html : fullhtml,
                            transfer: null,
                            consentRequired: false,
                            cssPrefix: "ComicCaption"+this.options.cssPrefix,},
                        "FlashSentence",
                            {s: this.options.s,
                            timeout: null,
                            audio: this.options.audio,
                            audioMessage: this.options.audioMessage,
                            audioTrigger: this.options.audioTrigger},
                        "Question", 
                            {q:                   this.options.q,
                            as:                  this.options.as,
                            hasCorrect:          dget(this.options, "hasCorrect", false),
                            presentAsScale:      this.options.presentAsScale,
                            presentHorizontally: this.options.presentHorizontally,
                            autoFirstChar:       typeof(this.options.autoFirstChar) == "undefined" ? this.options.presentAsScale : this.options.autoFirstChar,
                            randomOrder:         this.options.randomOrder,
                            showNumbers:         this.options.showNumbers,
                            timeout:             this.options.timeout,
                            instructions:        this.options.instructions,
                            leftComment:         this.options.leftComment,
                            rightComment:        this.options.rightComment,
                            }
                            ]};
        this.element.VBox(opts);
    }
},

properties: {
    obligatory: ["s", "as", "q", "html"],
    htmlDescription:
        function (opts) {
            var m = ibex_controller_get_property("Message", "htmlDescription")(opts);
            var s = ibex_controller_get_property("FlashSentence", "htmlDescription")(opts);
            var q = ibex_controller_get_property("Question", "htmlDescription")(opts);
            var p =
                $(document.createElement("div"))
                .append(("M: ").append($(m)))
                .append($("<p>").append("Q: ").append($(q)))
                .append("<br>").append($("<b>").text("S:"))
                .append($(s));
             return p;
        }}
});