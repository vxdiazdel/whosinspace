"use strict";$(document).ready(function(){function t(){$.getJSON(a,function(t){return n(t)})}function n(t){var n=e(t);r.html(n)}var o=$("#astro-template").html(),e=Handlebars.compile(o),r=$(".info"),a=($("#count"),"http://api.open-notify.org/astros.json");t()});
//# sourceMappingURL=../maps/bundle.js.map
