import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, findAll, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | game', function(hooks) {
  setupRenderingTest(hooks);

  test('it shows whose turn it is', async function(assert) {
    this.set('players', ['x', 'o']);

    await render(hbs`<Game @players={{this.players}} />`);
    assert.equal(this.element.querySelector('div.player-info').textContent.trim(), "It's your turn, x");

    await click('.board-block')
    assert.equal(this.element.querySelector('div.player-info').textContent.trim(), "It's your turn, o");
  });

  test('it fills the correct blocks', async function(assert) {
    this.set('players', ['x', 'o']);

    await render(hbs`<Game @players={{this.players}} />`);
    let blocks = findAll('.board-block')

    await click(blocks[0]);
    blocks = findAll('.board-block')
    assert.equal(blocks[0].textContent.trim(), "x");

    await click(blocks[4]);
    blocks = findAll('.board-block')
    assert.equal(blocks[4].textContent.trim(), "o");
  });

  test('fires onGameOver with player upon victory', async function(assert) {
    this.set('players', ['x', 'o']);
    this.set('onGameOver', (player) => {
      assert.equal(player, "x");
    });

    await render(hbs`<Game @players={{this.players}} @onGameOver={{this.onGameOver}} />`);
    let blocks = findAll('.board-block');

    click(blocks[0]); // x
    click(blocks[6]); // o
    click(blocks[1]); // x
    click(blocks[7]); // o
    click(blocks[2]); // x
  });

  test('fires onGameOver with null upon draw', async function(assert) {
    this.set('players', ['x', 'o']);
    this.set('onGameOver', (player) => {
      assert.equal(player, null);
    });

    await render(hbs`<Game @players={{this.players}} @onGameOver={{this.onGameOver}} />`);
    let blocks = findAll('.board-block');

    click(blocks[4]); // x
    click(blocks[0]); // o
    click(blocks[2]); // x
    click(blocks[6]); // o
    click(blocks[3]); // x
    click(blocks[1]); // o
    click(blocks[7]); // x
    click(blocks[5]); // o
    click(blocks[8]); // x
  });
});
