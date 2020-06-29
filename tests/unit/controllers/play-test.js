import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | play', function(hooks) {
  setupTest(hooks);

  test('it fires a draw alert when onGameOver is called with no winner', function(assert) {
    let controller = this.owner.lookup('controller:play');
    window.alert = (text) => {
      assert.equal(text, 'Player x has won!');
    };
    controller.send('onGameOver', 'x');
  });

  test('it fires a victory alert when onGameOver is called with a winner', function(assert) {
    let controller = this.owner.lookup('controller:play');
    window.alert = (text) => {
      assert.equal(text, "It's a draw! Play again!");
    };
    controller.send('onGameOver', null);
  });

  test('renders the correct scores and updates them when onGameOver is called', function(assert) {
    let controller = this.owner.lookup('controller:play');
    assert.deepEqual(controller.scores, {x: 0, o: 0});
    window.alert = () => {};

    controller.send('onGameOver', 'x');
    assert.deepEqual(controller.scores, {x: 1, o: 0})
  });

  test('it increments the game number when onGameOver is called', function(assert) {
    let controller = this.owner.lookup('controller:play');
    assert.equal(controller.gameNumber, 1);
    window.alert = () => {};

    controller.send('onGameOver', 'x');
    assert.equal(controller.gameNumber, 2);
  });

  test('it switches the players around when onGameOver is called', function(assert) {
    let controller = this.owner.lookup('controller:play');
    assert.deepEqual(controller.players, ['x', 'o']);
    window.alert = () => {};

    controller.send('onGameOver', 'x');
    assert.deepEqual(controller.players, ['o', 'x']);
  });
});
