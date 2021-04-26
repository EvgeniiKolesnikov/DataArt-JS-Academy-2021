'use strict';
import { ButtonsController } from "./buttons-controller";
import { Data } from "./data";
import { ScrollController } from "./scroll-controller";
import { SearchController } from "./search-controller";
import { Storage } from "./storage";
import { ToggleTheme } from "./toggle-theme";

let data = new Data();
new SearchController(data);
new ScrollController(data);

let storage = new Storage();
new ToggleTheme(storage);
new ButtonsController(storage);

