'use strict';
import { Api } from "./api";
import { BooksList } from "./books-list";
import { ToggleTheme } from "./toggle-theme";

new BooksList(new Api());
new ToggleTheme();
