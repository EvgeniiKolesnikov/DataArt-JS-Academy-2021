'use strict';
import { LoadData } from "./loadData";
import { ScrollController } from "./scroll-controller";
import { SearchController } from "./search-controller";
import { ToggleTheme } from "./toggle-theme";

let loadData = new LoadData();
new SearchController(loadData);
new ScrollController(loadData);
new ToggleTheme();

