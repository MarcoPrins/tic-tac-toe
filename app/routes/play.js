import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class PlayRoute extends Route {
  model() {
    return [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }
};
