'use strict';
import { LoadData } from "./loadData";
import { ScrollController } from "./scroll-controller";
import { SearchController } from "./search-controller";
import { Storage } from "./storage";
import { ToggleTheme } from "./toggle-theme";

let loadData = new LoadData();
let storage = new Storage();

new SearchController(loadData);
new ScrollController(loadData);
new ToggleTheme(storage);

