'use strict';
// import { Api } from "./api";
import { BooksList } from "./books-list";
import { LoadData } from "./loadData";
import { ScrollController } from "./scroll-controller";
import { Search } from "./search-controller";
import { ToggleTheme } from "./toggle-theme";

new LoadData();
new Search();
new ToggleTheme();
new ScrollController();
