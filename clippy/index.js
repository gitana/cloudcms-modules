define(function(require) {
    
    // sample override to document-properties
    require("./lib/clippy.js");

    require("./lib/clippy.css");

    clippy.load('Merlin', function(agent) {
        agent.show();
    });

});