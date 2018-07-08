var mongoose = require("mongoose"),
	  db_name  = "test1";

mongoose.connect(`mongodb://localhost/${db_name}`);