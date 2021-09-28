define(function(require, exports, module) {

    var Ratchet = require("ratchet/web");
    var Actions = require("ratchet/actions");
    var $ = require("jquery");

    var OneTeam = require("oneteam");

    return Actions.register("resync-node", Ratchet.AbstractAction.extend({

        defaultConfiguration: function()
        {
            var config = this.base();

            config.title = "Resync node";
            config.iconClass = "glyphicon glyphicon-repeat";

            return config;
        },

        execute: function(config, actionContext, callback)
        {
            var self = this;
            var ratchet = actionContext.ratchet;

            var branch = actionContext.observable("branch").get();
            var document = actionContext.observable("document").get();
            actionContext.listOfAttachmentIds = [];

            // target live state
            var state = "live";
            var nodeIds = [document._doc];
            OneTeam.pleaseWait("Resyncing...");
            
            Chain(branch).then(function() {
                var body = {
                    "state": state,
                    "nodeIds": nodeIds,
                    "config": {
                        "contentIncludeRelators": false
                    }
                };

                this.chainPost(this, branch.getUri() + "/publishing/resync", {}, body).then(function () {
                    OneTeam.pleaseWaitDone();
                    OneTeam.showMessage("Started", "Started resync, job id: " + this._doc);
                    callback();
                });
            });
        }

    }));

});

