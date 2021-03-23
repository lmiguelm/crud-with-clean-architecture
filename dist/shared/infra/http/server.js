"use strict";

var _environments = require("../../utils/environments");

var _app = require("./app");

_app.app.listen(_environments.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${_environments.PORT} 🚀`);
});