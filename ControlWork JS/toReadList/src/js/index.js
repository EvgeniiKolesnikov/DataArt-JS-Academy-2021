'use strict';
import { ButtonsController } from "./buttons-controller";
import { Data } from "./data";
import { ReadList } from "./read-list";
import { ScrollController } from "./scroll-controller";
import { SearchController } from "./search-controller";
import { Storage } from "./storage";
import { ToggleTheme } from "./toggle-theme";

let data = new Data();
let storage = new Storage();

new SearchController(data);
new ScrollController(data);

new ToggleTheme(storage);
// new ReadList(storage);
new ButtonsController(storage);

