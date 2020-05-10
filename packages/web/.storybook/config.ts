import { configure, addDecorator } from "@storybook/react";
import themeDecorator from './themeDecorator';

const req = require.context("../src", true, /\.story\.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
addDecorator(themeDecorator);
