import Route from '@ember/routing/route';

export default class PlayRoute extends Route {
  model() {
    // TODO: Remove stub and replace with new game / game in progress
    return [
      ["x", "x", "x"],
      ["o", "o", "o"],
      ["x", "o", "x"],
    ];
  }
}
