import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, findAll, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | game', function(hooks) {
  setupRenderingTest(hooks);

  test('it shows whose turn it is', async function(assert) {
    await render(hbs`<Game />`);
    assert.equal(this.element.querySelector('div.player-info').textContent.trim(), "It's your turn, x");

    await click('.board-block')
    assert.equal(this.element.querySelector('div.player-info').textContent.trim(), "It's your turn, o");
  });

  test('it fills the correct blocks', async function(assert) {
    await render(hbs`<Game />`);
    let blocks = findAll('.board-block')

    await click(blocks[0]);
    blocks = findAll('.board-block')
    assert.equal(blocks[0].textContent.trim(), "x");

    await click(blocks[4]);
    blocks = findAll('.board-block')
    assert.equal(blocks[4].textContent.trim(), "o");
  });

  test('it does not allow filling an occupied block', async function(assert) {
    await render(hbs`<Game />`);

    window.alert = (text) => {
      assert.equal(text, 'This block is occupied');
      assert.equal(blocks[2].textContent.trim(), "x");
    };

    let blocks = findAll('.board-block')
    await click(blocks[2]);

    blocks = findAll('.board-block')
    await click(blocks[2]);
  });

  // TODO: it detects a victory condition
});
