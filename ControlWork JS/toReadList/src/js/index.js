'use strict';

import { BookInfo } from "./book-info";
import { ButtonsController } from "./buttons-controller";
import { Data } from "./data";
import { MenuController } from "./menu-controller";
import { ScrollController } from "./scroll-controller";
import { SearchController } from "./search-controller";
import { Storage } from "./storage";
import { ToggleTheme } from "./toggle-theme";

let bookInfo = new BookInfo();

let data = new Data(bookInfo);
new SearchController(data);
new ScrollController(data);

let storage = new Storage();
new ToggleTheme(storage);
new ButtonsController(storage, bookInfo);

new MenuController();

