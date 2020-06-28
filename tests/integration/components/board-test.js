import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | board', function(hooks) {
  setupRenderingTest(hooks);

  test('it fires the correct update function when a block is clicked', async function(assert) {
    this.set('board', [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    this.set('activePlayerToken', 'x');
    this.set('updateBoard', (board) => {
      assert.deepEqual(board, [
        [null, null, null],
        ['x', null, null],
        [null, null, null],
      ])
    });

    await render(hbs`
      <Board
        @board={{this.board}}
        @activePlayerToken={{this.activePlayerToken}}
        @updateBoard={{this.updateBoard}}
      />
    `);
    let blocks = findAll('.board-block')
    await click(blocks[3]);
  });

  test('it does not allow filling an occupied block (shows an alert)', async function(assert) {
    this.set('board', [
      [null, null, null],
      [null, "o", null],
      [null, null, null],
    ]);
    this.set('activePlayerToken', 'o');
    this.set('updateBoard', (board) => {});

    window.alert = (text) => {
      assert.equal(text, 'This block is occupied');
    };

    await render(hbs`
      <Board
        @board={{this.board}}
        @activePlayerToken={{this.activePlayerToken}}
        @updateBoard={{this.updateBoard}}
      />
    `);

    let blocks = findAll('.board-block')
    await click(blocks[4]);
  });
});
